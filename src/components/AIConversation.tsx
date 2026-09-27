import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  MessageSquare,
  Sparkles,
  Volume2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Trash2,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { JLPTFilter, Language } from '../types/common';
import { translations } from '../i18n/translations';
import { kaiwaScenarios, KaiwaScenario } from '../data/kaiwaScenarios';
import { playJapaneseAudio } from '../utils/audio';

interface AIConversationProps {
  language: Language;
  levelFilter: JLPTFilter;
  soundEnabled: boolean;
}

interface MessageItem {
  id: string;
  role: 'user' | 'assistant';
  content: string; // for user
  // For assistant:
  japaneseResponse?: string;
  romaji?: string;
  translation?: string;
  explanation?: string;
  correction?: string;
  suggestedReplies?: string[];
  timestamp: string;
}

export const AIConversation: React.FC<AIConversationProps> = ({
  language,
  levelFilter,
  soundEnabled,
}) => {
  const t = translations[language];
  const [selectedTopic, setSelectedTopic] = useState<string>('restaurant');
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Helpers for multilingual scenario content
  const getScenarioTitle = (sc: KaiwaScenario) => {
    if (language === 'my') return sc.title_my;
    if (language === 'th') return sc.title_th || sc.title_en;
    if (language === 'vi') return sc.title_vi || sc.title_en;
    return sc.title_en;
  };

  const getScenarioInitialTranslation = (sc: KaiwaScenario) => {
    if (language === 'my') return sc.initialMessage_my;
    if (language === 'th') return sc.initialMessage_th || sc.initialMessage_en;
    if (language === 'vi') return sc.initialMessage_vi || sc.initialMessage_en;
    return sc.initialMessage_en;
  };

  const getGreetingExplanation = (sc: KaiwaScenario) => {
    const title = getScenarioTitle(sc);
    if (language === 'my') {
      return `မင်္ဂလာပါ! ကျွန်တော်သည် သင်၏ AI ဂျပန်စာဆရာ (J-Master Sensei) ဖြစ်ပါသည်။ "${title}" ခေါင်းစဉ်ဖြင့် စကားပြောလေ့ကျင့်ကြပါစို့။ ဂျပန်လိုဖြစ်စေ၊ မြန်မာလိုဖြစ်စေ မေးမြန်းနိုင်ပါသည်။`;
    }
    if (language === 'th') {
      return `สวัสดีครับ! ผมคืออาจารย์ภาษาญี่ปุ่น AI (J-Master Sensei) มาฝึกสนทนาในหัวข้อ "${title}" กันครับ คุณสามารถพิมพ์ถามเป็นภาษาไทย ภาษาญี่ปุ่น หรือภาษาอังกฤษได้เลยครับ`;
    }
    if (language === 'vi') {
      return `Xin chào! Tôi là giáo viên tiếng Nhật AI (J-Master Sensei). Hãy cùng luyện hội thoại theo chủ đề "${title}". Bạn có thể hỏi bằng tiếng Việt, tiếng Nhật hoặc tiếng Anh!`;
    }
    return `Hello! I am your AI Japanese Sensei. Let's practice "${title}". You can respond in Japanese, English, or ask questions in your native language!`;
  };

  // Load initial greeting when topic or language changes
  useEffect(() => {
    const scenario = kaiwaScenarios.find((s) => s.id === selectedTopic) || kaiwaScenarios[0];
    const initialMsg: MessageItem = {
      id: 'init-1',
      role: 'assistant',
      content: '',
      japaneseResponse: scenario.initialMessage_jp,
      romaji: scenario.initialMessage_romaji,
      translation: getScenarioInitialTranslation(scenario),
      explanation: getGreetingExplanation(scenario),
      suggestedReplies: scenario.suggestedUserStarters.map((s) => s.jp),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([initialMsg]);
  }, [selectedTopic, language]);

  // Scroll to bottom on new message
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleAudio = (text: string) => {
    if (soundEnabled) {
      playJapaneseAudio(text);
    }
  };

  const handleSend = async (overrideText?: string) => {
    const textToSend = (overrideText || inputText).trim();
    if (!textToSend || isLoading) return;

    const userMsg: MessageItem = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      // Prepare message history for backend
      const apiMessages = newHistory.map((m) => ({
        role: m.role,
        content: m.role === 'user' ? m.content : m.japaneseResponse || m.explanation || '',
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          userLanguage: language,
          context: selectedTopic,
          jlptLevel: levelFilter,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();

      const assistantMsg: MessageItem = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: '',
        japaneseResponse: data.japaneseResponse || '',
        romaji: data.romaji || '',
        translation: data.translation || '',
        explanation: data.explanation || '',
        correction: data.correction || '',
        suggestedReplies: Array.isArray(data.suggestedReplies) ? data.suggestedReplies : [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Automatically speak Japanese response if sound is on
      if (soundEnabled && data.japaneseResponse) {
        playJapaneseAudio(data.japaneseResponse);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: MessageItem = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: '',
        japaneseResponse: '申し訳ありません。エラーが発生しました。',
        romaji: 'Moushiwake arimasen. Eraa ga hassei shimashita.',
        translation:
          language === 'my'
            ? 'တောင်းပန်ပါသည်။ အင်တာနက် အချိတ်အဆက် အနည်းငယ် အဆင်မပြေဖြစ်သွားပါသဖြင့် ပြန်လည်မေးမြန်းပေးပါခင်ဗျာ။'
            : 'Sorry, an error occurred while connecting. Please try asking again.',
        explanation:
          language === 'my'
            ? 'ဆာဗာနှင့် ချိတ်ဆက်ရာတွင် အခက်အခဲရှိနေပါသည်။ ပြန်လည် ကြိုးစားကြည့်ပေးပါ။'
            : 'Trouble connecting to the AI Sensei server. Please retry.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    const scenario = kaiwaScenarios.find((s) => s.id === selectedTopic) || kaiwaScenarios[0];
    setMessages([
      {
        id: 'reset-1',
        role: 'assistant',
        content: '',
        japaneseResponse: scenario.initialMessage_jp,
        romaji: scenario.initialMessage_romaji,
        translation: language === 'my' ? scenario.initialMessage_my : scenario.initialMessage_en,
        explanation:
          language === 'my'
            ? `စကားဝိုင်း အသစ် ပြန်စပါပြီ။ ဘာမေးလိုပါသလဲခင်ဗျာ။`
            : `Conversation refreshed. How may I help you?`,
        suggestedReplies: scenario.suggestedUserStarters.map((s) => s.jp),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto pb-12">
      {/* Title & Info Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.aiSenseiTitle}
            </h1>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gemini 3.8 Flash</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.aiSenseiSubtitle}
          </p>
        </div>

        <button
          onClick={handleClearChat}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-rose-300 border border-slate-700 text-xs transition-colors self-start sm:self-auto"
          title="Reset conversation"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{language === 'my' ? 'စကားဝိုင်း ပြန်စမည်' : 'Clear Chat'}</span>
        </button>
      </div>

      {/* Scenario / Topic Selector */}
      <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-2">
        <div className="text-xs font-semibold text-slate-400 flex items-center space-x-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.aiSuggestedTopic}</span>
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {kaiwaScenarios.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setSelectedTopic(sc.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTopic === sc.id
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/20 font-bold'
                  : 'bg-slate-850 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700'
              }`}
            >
              {getScenarioTitle(sc)}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 min-h-[440px] max-h-[580px] overflow-y-auto space-y-5 shadow-2xl">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            {msg.role === 'user' ? (
              /* User Bubble */
              <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-br-sm bg-gradient-to-r from-rose-600 to-rose-700 text-white p-3.5 shadow-md space-y-1">
                <div className="text-xs sm:text-sm font-medium whitespace-pre-wrap">
                  {msg.content}
                </div>
                <div className="text-[10px] text-rose-200/80 text-right">{msg.timestamp}</div>
              </div>
            ) : (
              /* Sensei Assistant Bubble */
              <div className="max-w-[92%] sm:max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-850 border border-slate-800 p-4 sm:p-5 shadow-lg space-y-3">
                {/* Sensei Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center font-serif">
                      師
                    </div>
                    <span className="text-xs font-bold text-slate-200">J-Master Sensei</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {msg.japaneseResponse && (
                      <button
                        onClick={() => handleAudio(msg.japaneseResponse!)}
                        className="p-1 rounded-md bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white transition-colors"
                        title={t.playAudio}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                  </div>
                </div>

                {/* Japanese Response & Romaji */}
                {msg.japaneseResponse && (
                  <div className="space-y-1">
                    <div className="text-base sm:text-lg font-bold text-white font-serif tracking-wide leading-relaxed">
                      {msg.japaneseResponse}
                    </div>
                    {msg.romaji && (
                      <div className="text-xs text-slate-400 font-mono">
                        {msg.romaji}
                      </div>
                    )}
                  </div>
                )}

                {/* Translation Badge */}
                {msg.translation && (
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-xs">
                    <span className="font-semibold text-emerald-400">
                      {t.aiTranslationBadge}{' '}
                    </span>
                    <span className="text-slate-200 font-medium">
                      {msg.translation}
                    </span>
                  </div>
                )}

                {/* Grammar Correction Card (if any) */}
                {msg.correction && (
                  <div className="bg-rose-950/30 p-2.5 rounded-xl border border-rose-800/40 text-xs space-y-1">
                    <div className="flex items-center space-x-1.5 font-bold text-rose-300">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{t.aiCorrectionBadge}</span>
                    </div>
                    <div className="text-rose-200 pl-5 leading-relaxed">
                      {msg.correction}
                    </div>
                  </div>
                )}

                {/* Sensei Detailed Explanation */}
                {msg.explanation && (
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
                    <div className="font-semibold text-amber-300 flex items-center space-x-1">
                      <Lightbulb className="w-3 h-3 text-amber-400" />
                      <span>{t.aiExplanationBadge}</span>
                    </div>
                    <p className="text-slate-300 whitespace-pre-wrap">{msg.explanation}</p>
                  </div>
                )}

                {/* Suggested Quick Replies */}
                {msg.suggestedReplies && msg.suggestedReplies.length > 0 && (
                  <div className="pt-1 space-y-1.5">
                    <div className="text-[11px] font-semibold text-slate-400">
                      {language === 'my' ? 'အကြံပြု အဖြေများ (နှိပ်၍ ပြန်ပြောနိုင်ပါသည်):' : 'Suggested Replies:'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedReplies.map((reply, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(reply)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono transition-colors text-left"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Loading Sensei Indicator */}
        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-850 p-3 rounded-2xl w-max border border-slate-800">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
            <span>{t.aiThinking}</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="relative"
      >
        <div className="flex items-center bg-slate-900 border border-slate-800 focus-within:border-emerald-500 rounded-2xl p-2 shadow-xl transition-colors">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.aiPlaceholder}
            className="flex-1 bg-transparent px-3 py-2 text-slate-200 placeholder-slate-500 text-xs sm:text-sm focus:outline-none"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 text-white font-semibold text-xs sm:text-sm flex items-center space-x-1.5 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:cursor-not-allowed"
          >
            <span>{t.aiSend}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
