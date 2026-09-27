import React from 'react';
import {
  Sparkles,
  Layers,
  PenTool,
  BookOpen,
  MessageSquare,
  Volume2,
  ArrowRight,
  CheckCircle2,
  FileText,
  Award,
} from 'lucide-react';
import { AppTab, JLPTFilter, Language } from '../types/common';
import { translations } from '../i18n/translations';
import { verbsData } from '../data/verbsData';
import { kanjiData } from '../data/kanjiData';
import { grammarData } from '../data/grammarData';
import { playJapaneseAudio } from '../utils/audio';

interface HomeViewProps {
  language: Language;
  levelFilter: JLPTFilter;
  onNavigate: (tab: AppTab) => void;
  soundEnabled: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({
  language,
  levelFilter,
  onNavigate,
  soundEnabled,
}) => {
  const t = translations[language];

  // Daily featured items
  const featuredVerb = verbsData[0]; // 食べる
  const featuredKanji = kanjiData[0]; // 日
  const featuredGrammar = grammarData[1]; // 〜てください

  const getVerbMeaning = (v: any) => {
    if (!v) return '';
    if (language === 'my') return v.meaning_my;
    if (language === 'th') return v.meaning_th || v.meaning_en;
    if (language === 'vi') return v.meaning_vi || v.meaning_en;
    return v.meaning_en;
  };

  const getVerbExample = (v: any) => {
    if (!v) return '';
    if (language === 'my') return v.example_my;
    if (language === 'th') return v.example_th || v.example_en;
    if (language === 'vi') return v.example_vi || v.example_en;
    return v.example_en;
  };

  const getKanjiMeaning = (k: any) => {
    if (!k) return '';
    if (language === 'my') return k.meaning_my;
    if (language === 'th') return k.meaning_th || k.meaning_en;
    if (language === 'vi') return k.meaning_vi || k.meaning_en;
    return k.meaning_en;
  };

  const getKanjiExplanation = (k: any) => {
    if (!k) return '';
    if (language === 'my') return k.explanation_my;
    if (language === 'th') return k.explanation_th || k.explanation_en;
    if (language === 'vi') return k.explanation_vi || k.explanation_en;
    return k.explanation_en;
  };

  const getGrammarMeaning = (g: any) => {
    if (!g) return '';
    if (language === 'my') return g.meaning_my;
    if (language === 'th') return g.meaning_th || g.meaning_en;
    if (language === 'vi') return g.meaning_vi || g.meaning_en;
    return g.meaning_en;
  };

  const getGrammarExplanation = (g: any) => {
    if (!g) return '';
    if (language === 'my') return g.explanation_my;
    if (language === 'th') return g.explanation_th || g.explanation_en;
    if (language === 'vi') return g.explanation_vi || g.explanation_en;
    return g.explanation_en;
  };

  const handleAudio = (text: string) => {
    if (soundEnabled) {
      playJapaneseAudio(text);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-900 border border-rose-900/30 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>
              {language === 'my'
                ? 'မြန်မာ-ဂျပန် ဘာသာစကား အဆင့်မြင့် လေ့လာရေး'
                : 'Myanmar-Japanese Comprehensive Learning'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t.heroTitle}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.heroDesc}
          </p>

          <div className="pt-2 flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('verb-forms')}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-900/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{language === 'my' ? '၁၃ မျိုး ဖြည့်စွက်လေ့ကျင့်ခန်း' : '13 Verb Forms Drill'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onNavigate('verbs')}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-rose-400" />
              <span>{t.exploreVerbs} (700 Verbs)</span>
            </button>

            <button
              onClick={() => onNavigate('kanji')}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <PenTool className="w-4 h-4 text-amber-400" />
              <span>{t.practiceKanji} (919 Kanji)</span>
            </button>

            <button
              onClick={() => onNavigate('practice')}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>{language === 'my' ? 'သဒ္ဒါ အရော ၉၀၀ & ၁၀၀x၅' : 'Grammar Arena'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigate('verbs')}
          className="bg-slate-850 p-4 sm:p-5 rounded-2xl border border-slate-800 flex items-center space-x-4 cursor-pointer hover:border-rose-500/40 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white">700</div>
            <div className="text-xs text-slate-400">
              {language === 'my' ? 'ကြိယာ (၁၃ မျိုးစုံ)' : 'Verbs (13 Forms)'}
            </div>
          </div>
        </div>

        <div
          onClick={() => onNavigate('kanji')}
          className="bg-slate-850 p-4 sm:p-5 rounded-2xl border border-slate-800 flex items-center space-x-4 cursor-pointer hover:border-amber-500/40 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <PenTool className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white">919</div>
            <div className="text-xs text-slate-400">
              {language === 'my' ? 'ခန်ဂျီ (N5-N3)' : 'Kanji (N5-N3)'}
            </div>
          </div>
        </div>

        <div
          onClick={() => onNavigate('grammar')}
          className="bg-slate-850 p-4 sm:p-5 rounded-2xl border border-slate-800 flex items-center space-x-4 cursor-pointer hover:border-blue-500/40 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white">300</div>
            <div className="text-xs text-slate-400">
              {language === 'my' ? 'သဒ္ဒါ (၁,၅၀၀ မေးခွန်း)' : 'Grammar (1.5k Qs)'}
            </div>
          </div>
        </div>

        <div
          onClick={() => onNavigate('practice')}
          className="bg-slate-850 p-4 sm:p-5 rounded-2xl border border-slate-800 flex items-center space-x-4 cursor-pointer hover:border-emerald-500/40 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-white">1,500+</div>
            <div className="text-xs text-slate-400">
              {language === 'my' ? 'အရော လေ့ကျင့်ခန်းမေးခွန်း' : 'Quiz & Practice Qs'}
            </div>
          </div>
        </div>
      </div>

      {/* Today's Featured Highlights */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">{t.dailyFeatured}</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            {levelFilter === 'All' ? 'JLPT N5-N3' : levelFilter}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Daily Verb Card */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 hover:border-rose-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {t.dailyVerb} ({featuredVerb.level})
                </span>
                <button
                  onClick={() => handleAudio(featuredVerb.dictionary)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                  title="Play audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-2xl font-black text-white font-serif tracking-wide mb-1">
                {featuredVerb.dictionary}
                <span className="text-xs text-slate-400 ml-2 font-normal font-sans">
                  ({featuredVerb.reading} / {featuredVerb.romaji})
                </span>
              </div>

              <div className="text-sm font-semibold text-amber-300 mb-3">
                {getVerbMeaning(featuredVerb)}
              </div>

              {/* Quick Conjugations Pill */}
              <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-800/80 text-xs space-y-1.5 mb-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.verbMasu}:</span>
                  <span className="text-slate-200 font-mono font-medium">{featuredVerb.conjugations.masu}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.verbTe}:</span>
                  <span className="text-slate-200 font-mono font-medium">{featuredVerb.conjugations.te}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.verbNai}:</span>
                  <span className="text-slate-200 font-mono font-medium">{featuredVerb.conjugations.nai}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 italic">
                "{featuredVerb.example_jp}" —{' '}
                {getVerbExample(featuredVerb)}
              </p>
            </div>

            <button
              onClick={() => onNavigate('verbs')}
              className="mt-4 w-full py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 flex items-center justify-center space-x-1"
            >
              <span>{t.showDetails}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Daily Kanji Card */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {t.dailyKanji} ({featuredKanji.jlpt})
                </span>
                <button
                  onClick={() => handleAudio(featuredKanji.onyomi[0] || featuredKanji.kanji)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                  title="Play audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-3">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-4xl font-serif text-amber-300 font-bold shadow-inner">
                  {featuredKanji.kanji}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    {getKanjiMeaning(featuredKanji)}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {t.strokes}: {featuredKanji.strokes}
                  </div>
                  <div className="text-xs text-amber-400/90 mt-1 font-mono">
                    音: {featuredKanji.onyomi.join(', ')}
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-300 bg-slate-850 p-2.5 rounded-xl border border-slate-800/80 mb-3">
                <span className="text-slate-400 font-medium">{t.explanation}: </span>
                {getKanjiExplanation(featuredKanji)}
              </div>

              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-400">{t.compounds}:</div>
                {featuredKanji.compounds.slice(0, 2).map((c, i) => (
                  <div key={i} className="text-xs flex justify-between text-slate-300">
                    <span className="font-serif">{c.word} ({c.reading})</span>
                    <span className="text-slate-400">{getKanjiMeaning(c)}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate('kanji')}
              className="mt-4 w-full py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 flex items-center justify-center space-x-1"
            >
              <span>{t.practiceKanji}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Daily Grammar Card */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 hover:border-blue-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {t.dailyGrammar} ({featuredGrammar.jlpt})
                </span>
                <button
                  onClick={() => handleAudio(featuredGrammar.pattern)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                  title="Play audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xl font-bold text-white font-mono tracking-wide mb-1">
                {featuredGrammar.pattern}
              </div>

              <div className="text-sm font-semibold text-blue-300 mb-2">
                {getGrammarMeaning(featuredGrammar)}
              </div>

              <div className="text-xs bg-slate-850 p-2.5 rounded-xl border border-slate-800/80 text-slate-300 mb-3 space-y-1">
                <div className="font-mono text-emerald-400 text-xs">
                  {featuredGrammar.structure}
                </div>
                <div className="text-slate-300 text-xs leading-relaxed">
                  {getGrammarExplanation(featuredGrammar)}
                </div>
              </div>

              {featuredGrammar.examples[0] && (
                <div className="text-xs text-slate-400 italic">
                  "{featuredGrammar.examples[0].jp}"
                  <div className="text-slate-300 not-italic mt-0.5">
                    → {getGrammarMeaning(featuredGrammar.examples[0]) || featuredGrammar.examples[0].my || featuredGrammar.examples[0].en}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('grammar')}
              className="mt-4 w-full py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700 flex items-center justify-center space-x-1"
            >
              <span>{t.showDetails}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Feature Exploration Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">
          {language === 'my' ? 'အဓိက ကဏ္ဍများ' : 'Key Learning Modules'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Kaiwa AI */}
          <div
            onClick={() => onNavigate('kaiwa')}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1">
              {language === 'my' ? 'AI Kaiwa စကားပြော' : 'AI Kaiwa Chat'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              {language === 'my'
                ? 'မြန်မာလို မေးမြန်းနိုင်ပြီး ဂျပန်လို အမှားပြင်ဆင်ပေးသော AI ဆရာနှင့် စကားပြောလေ့ကျင့်ပါ'
                : 'Chat naturally with AI Sensei in Japanese, Myanmar, or English with instant corrections.'}
            </p>
            <div className="flex items-center text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>{language === 'my' ? 'စတင်ပြောဆိုမည်' : 'Start Chat'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 2: Verb Conjugations */}
          <div
            onClick={() => onNavigate('verbs')}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-800 hover:border-rose-500/50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1">
              {language === 'my' ? 'ကြိယာ ပုံစံပြောင်းနည်း' : 'Verb Conjugations'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              {language === 'my'
                ? 'Group 1, 2, 3 ကြိယာများ၏ Masu, Te, Ta, Nai, Potential ပုံစံများကို အသေးစိတ် ဇယားဖြင့် လေ့လာပါ'
                : 'Master Masu, Te, Ta, Nai, Potential, Passive & Causative forms with interactive matrices.'}
            </p>
            <div className="flex items-center text-xs font-semibold text-rose-400 group-hover:translate-x-1 transition-transform">
              <span>{language === 'my' ? 'ဇယားကြည့်မည်' : 'View Table'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 3: Kanji Writing Studio */}
          <div
            onClick={() => onNavigate('kanji')}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <PenTool className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1">
              {language === 'my' ? 'ခန်ဂျီ စတူဒီယို' : 'Kanji Writing Studio'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              {language === 'my'
                ? 'Canvas ပေါ်တွင် လက်ရေးဆွဲလေ့ကျင့်နိုင်ပြီး Onyomi, Kunyomi အသံထွက်များကို လေ့လာနိုင်သည်'
                : 'Practice stroke order on interactive rice-paper canvas with Onyomi and Kunyomi guides.'}
            </p>
            <div className="flex items-center text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>{language === 'my' ? 'လက်ရေးဆွဲမည်' : 'Open Canvas'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Card 4: Grammar Guide */}
          <div
            onClick={() => onNavigate('grammar')}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base mb-1">
              {language === 'my' ? 'သဒ္ဒါ လမ်းညွှန်' : 'Grammar Guide'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              {language === 'my'
                ? 'JLPT N5-N3 သဒ္ဒါ စည်းမျဉ်းများကို မြန်မာ-အင်္ဂလိပ် အဓိပ္ပာယ် ရှင်းလင်းချက်များနှင့် လေ့လာပါ'
                : 'Clear explanations and real-world examples in Myanmar & English with audio playback.'}
            </p>
            <div className="flex items-center text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
              <span>{language === 'my' ? 'သဒ္ဒါဖတ်မည်' : 'Browse Grammar'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
