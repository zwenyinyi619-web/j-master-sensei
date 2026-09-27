import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Eye,
  Award,
  BookOpen,
  Filter,
  Search,
} from 'lucide-react';
import { JLPTFilter, Language } from '../types/common';
import { VerbItem } from '../types/verb';
import { verbsData } from '../data/verbsData';
import { translations } from '../i18n/translations';
import { playJapaneseAudio } from '../utils/audio';
import { conjugationRulesGuide } from '../utils/conjugator';

interface VerbPracticeProps {
  language: Language;
  levelFilter: JLPTFilter;
  soundEnabled: boolean;
}

interface FormConfig {
  key: string;
  name_jp: string;
  name_my: string;
  name_en: string;
  name_th: string;
  name_vi: string;
  expectedKey: keyof VerbItem['conjugations'] | 'dictionary';
}

const FORMS_13: FormConfig[] = [
  { key: 'dictionary', name_jp: '1. 辞書形 (Jisho-kei)', name_my: 'အဘိဓာန် / မူလပုံစံ', name_en: 'Dictionary / Plain', name_th: 'รูปพจนานุกรม', name_vi: 'Thể từ điển', expectedKey: 'dictionary' },
  { key: 'nai', name_jp: '2. ない形 (Nai-kei)', name_my: 'ငြင်းပယ် ပုံစံ', name_en: 'Negative (Nai)', name_th: 'รูปปฏิเสธ', name_vi: 'Thể phủ định', expectedKey: 'nai' },
  { key: 'te', name_jp: '3. て形 (Te-kei)', name_my: 'တဲ ပုံစံ (ဆက်စပ်/တောင်းဆို)', name_en: 'Te-form', name_th: 'รูปเตะ', name_vi: 'Thể Te', expectedKey: 'te' },
  { key: 'ta', name_jp: '4. た形 (Ta-kei)', name_my: 'အတိတ်ကာလ ပုံစံ', name_en: 'Past (Ta)', name_th: 'รูปอดีต', name_vi: 'Thể quá khứ', expectedKey: 'ta' },
  { key: 'nakatta', name_jp: '5. なかった形 (Nakatta)', name_my: 'အတိတ်ငြင်းပယ် ပုံစံ', name_en: 'Past Negative', name_th: 'รูปอดีตปฏิเสธ', name_vi: 'Thể quá khứ phủ định', expectedKey: 'nakatta' },
  { key: 'potential', name_jp: '6. 可能形 (Kanou-kei)', name_my: 'စွမ်းဆောင်နိုင်မှု ပုံစံ (လုပ်နိုင်သည်)', name_en: 'Potential (Can do)', name_th: 'รูปสามารถ', name_vi: 'Thể khả năng', expectedKey: 'potential' },
  { key: 'volitional', name_jp: '7. 意向形 (Ikou-kei)', name_my: 'ဆန္ဒပြု ပုံစံ (~ကြစို့)', name_en: 'Volitional (Let’s do)', name_th: 'รูปตั้งใจ', name_vi: 'Thể ý định', expectedKey: 'volitional' },
  { key: 'conditionalBa', name_jp: '8. 条件形・ば (Ba-kei)', name_my: 'အကယ်၍... လျှင် ပုံစံ (ဘားပုံစံ)', name_en: 'Conditional (Ba)', name_th: 'รูปเงื่อนไข บะ', name_vi: 'Thể điều kiện Ba', expectedKey: 'conditionalBa' },
  { key: 'conditionalTara', name_jp: '9. たら形 (Tara-kei)', name_my: 'ပြီးလျှင် / အကယ်၍ (တာရာပုံစံ)', name_en: 'Conditional (Tara)', name_th: 'รูปเงื่อนไข ทะระ', name_vi: 'Thể điều kiện Tara', expectedKey: 'conditionalTara' },
  { key: 'imperative', name_jp: '10. 命令形 (Meirei-kei)', name_my: 'အမိန့်ပေး ပုံစံ', name_en: 'Imperative (Command)', name_th: 'รูปคำสั่ง', name_vi: 'Thể mệnh lệnh', expectedKey: 'imperative' },
  { key: 'prohibitive', name_jp: '11. 禁止形 (Kinshi-kei)', name_my: 'တားမြစ် ပုံစံ (မလုပ်ရ)', name_en: 'Prohibitive (Must not)', name_th: 'รูปห้าม', name_vi: 'Thể cấm chỉ', expectedKey: 'prohibitive' },
  { key: 'passive', name_jp: '12. 受身形 (Ukemi-kei)', name_my: 'ခံရ ပုံစံ (အပြုခံရသည်)', name_en: 'Passive', name_th: 'รูปถูกกระทำ', name_vi: 'Thể bị động', expectedKey: 'passive' },
  { key: 'causative', name_jp: '13. 使役形 (Shieki-kei)', name_my: 'စေခိုင်း ပုံစံ (ခိုင်းစေသည်)', name_en: 'Causative (Make/Let)', name_th: 'รูปให้กระทำ', name_vi: 'Thể sai khiến', expectedKey: 'causative' },
];

export const VerbThirteenFormsPractice: React.FC<VerbPracticeProps> = ({
  language,
  levelFilter,
  soundEnabled,
}) => {
  const t = translations[language];
  const [search, setSearch] = useState('');
  const [selectedVerbId, setSelectedVerbId] = useState<string>(verbsData[0]?.id || 'v-taberu');
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [activeHintKey, setActiveHintKey] = useState<string | null>(null);

  // Available verbs based on filter
  const filteredVerbs = useMemo(() => {
    return verbsData.filter((v) => {
      if (levelFilter !== 'All' && v.level !== levelFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          v.dictionary.toLowerCase().includes(q) ||
          v.reading.toLowerCase().includes(q) ||
          v.romaji.toLowerCase().includes(q) ||
          v.meaning_my.toLowerCase().includes(q) ||
          v.meaning_en.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [levelFilter, search]);

  const currentVerb = useMemo(() => {
    return filteredVerbs.find((v) => v.id === selectedVerbId) || filteredVerbs[0] || verbsData[0];
  }, [selectedVerbId, filteredVerbs]);

  const currentIndex = filteredVerbs.findIndex((v) => v.id === currentVerb?.id);

  const handleVerbChange = (verbId: string) => {
    setSelectedVerbId(verbId);
    setUserInputs({});
    setChecked(false);
    setRevealed(false);
    setActiveHintKey(null);
  };

  const handleNext = () => {
    if (filteredVerbs.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredVerbs.length;
    handleVerbChange(filteredVerbs[nextIdx].id);
  };

  const handlePrev = () => {
    if (filteredVerbs.length === 0) return;
    const prevIdx = (currentIndex - 1 + filteredVerbs.length) % filteredVerbs.length;
    handleVerbChange(filteredVerbs[prevIdx].id);
  };

  const handleRandom = () => {
    if (filteredVerbs.length <= 1) return;
    let rand = Math.floor(Math.random() * filteredVerbs.length);
    if (filteredVerbs[rand].id === currentVerb.id) {
      rand = (rand + 1) % filteredVerbs.length;
    }
    handleVerbChange(filteredVerbs[rand].id);
  };

  const handleAudio = (text: string) => {
    if (soundEnabled && text) {
      playJapaneseAudio(text);
    }
  };

  const getFormLabel = (form: FormConfig) => {
    if (language === 'my') return form.name_my;
    if (language === 'th') return form.name_th;
    if (language === 'vi') return form.name_vi;
    return form.name_en;
  };

  const getExpectedAnswer = (form: FormConfig): string => {
    if (!currentVerb) return '';
    if (form.expectedKey === 'dictionary') return currentVerb.dictionary;
    const val = currentVerb.conjugations[form.expectedKey as keyof typeof currentVerb.conjugations];
    return typeof val === 'string' ? val : '';
  };

  const cleanText = (str: string) => {
    return (str || '').trim().toLowerCase().replace(/[\s\-_~・]/g, '');
  };

  const isFormCorrect = (form: FormConfig): boolean => {
    const user = cleanText(userInputs[form.key] || '');
    if (!user) return false;
    const expected = cleanText(getExpectedAnswer(form));

    // Also match romaji if student typed romaji
    const romajiKey = `${form.expectedKey}Romaji` as keyof typeof currentVerb.conjugations;
    const expectedRomaji = cleanText((currentVerb.conjugations[romajiKey] as string) || '');

    return user === expected || (!!expectedRomaji && user === expectedRomaji);
  };

  const correctCount = useMemo(() => {
    return FORMS_13.filter((f) => isFormCorrect(f)).length;
  }, [userInputs, currentVerb]);

  const handleCheck = () => {
    setChecked(true);
  };

  const handleReset = () => {
    setUserInputs({});
    setChecked(false);
    setRevealed(false);
    setActiveHintKey(null);
  };

  const handleReveal = () => {
    const allAnswers: Record<string, string> = {};
    FORMS_13.forEach((f) => {
      allAnswers[f.key] = getExpectedAnswer(f);
    });
    setUserInputs(allAnswers);
    setRevealed(true);
    setChecked(true);
  };

  const verbMeaning =
    language === 'my'
      ? currentVerb.meaning_my
      : language === 'th'
      ? currentVerb.meaning_th || currentVerb.meaning_en
      : language === 'vi'
      ? currentVerb.meaning_vi || currentVerb.meaning_en
      : currentVerb.meaning_en;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Banner & Title */}
      <div className="bg-gradient-to-r from-rose-950/60 via-slate-900 to-indigo-950/60 border border-rose-500/20 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 font-bold text-xs uppercase tracking-wider border border-rose-500/30">
                けい ပုံစံ ၁၃ မျိုး လေ့ကျင့်ခန်း
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
                700 Verbs Database
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {language === 'my'
                ? 'ます ဖောင် ပေးထားပြီး けい ၁၃ မျိုး ကိုယ်တိုင်ဖြည့်စိန်ခေါ်မှု'
                : language === 'th'
                ? 'แบบฝึกหัดเติมรูปกริยา 13 รูปแบบจาก Masu-form'
                : language === 'vi'
                ? 'Thử thách tự điền 13 thể động từ từ thể Masu'
                : '13 Japanese Verb Forms Conjugation Drill'}
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              {language === 'my'
                ? 'ပေးထားသော ます ပုံစံကို ကြည့်၍ ကျန် けい ပုံစံ ၁၃ မျိုးကို ကိုယ်တိုင်ရေးသွင်းပြီး အဖြေစစ်ဆေးပါ (Kanji သို့မဟုတ် Hiragana/Romaji ဖြင့် ရေးနိုင်ပါသည်)'
                : 'Look at the provided Masu form and fill in the 13 forms yourself. Instant answer check & audio feedback!'}
            </p>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handlePrev}
              disabled={currentIndex <= 0}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-xl text-slate-200 border border-slate-700 transition-all flex items-center gap-1 text-sm"
              title="Previous Verb"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">ရှေ့သို့</span>
            </button>
            <button
              onClick={handleRandom}
              className="px-3 py-2.5 bg-rose-600 hover:bg-rose-500 rounded-xl text-white font-medium text-sm transition-all flex items-center gap-1.5 shadow-md shadow-rose-900/40"
              title="Random Verb"
            >
              <Shuffle className="w-4 h-4" />
              <span>ကျပန်း (Random)</span>
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= filteredVerbs.length - 1}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-xl text-slate-200 border border-slate-700 transition-all flex items-center gap-1 text-sm"
              title="Next Verb"
            >
              <span className="hidden sm:inline">နောက်သို့</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Verb selector and search */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                language === 'my'
                  ? 'ကြိယာ ၇၀၀ ထဲမှ ရှာဖွေပါ (ဥပမာ: 食べる, nomu, စားသည်)...'
                  : 'Search among 700 verbs...'
              }
              className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          <div className="w-full sm:w-72">
            <select
              value={selectedVerbId}
              onChange={(e) => handleVerbChange(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-rose-500"
            >
              {filteredVerbs.map((v) => (
                <option key={v.id} value={v.id}>
                  [{v.level}] {v.conjugations.masu} ({v.dictionary}) - {v.meaning_my}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Primary Prompt: GIVEN MASU FORM */}
      {currentVerb && (
        <div className="bg-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {language === 'my' ? 'ပေးထားသော ます ပုံစံ (Given Masu Form)' : 'Given Base: Masu Form'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {currentVerb.level}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {currentVerb.group}
                </span>
                <span className="text-xs text-slate-400">
                  #{currentIndex + 1} of {filteredVerbs.length} verbs
                </span>
              </div>

              {/* Huge Masu Form Display */}
              <div className="flex items-baseline gap-4 pt-1">
                <h1 className="text-4xl sm:text-5xl font-black text-amber-200 tracking-wide font-serif">
                  {currentVerb.conjugations.masu}
                </h1>
                <button
                  onClick={() => handleAudio(currentVerb.conjugations.masu)}
                  className="p-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-full transition-transform active:scale-95"
                  title="Listen Masu Audio"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-3 text-slate-300 text-base sm:text-lg">
                <span className="font-semibold text-rose-300">{verbMeaning}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 font-mono text-sm">{currentVerb.conjugations.masuRomaji}</span>
              </div>
            </div>

            {/* Instruction Tip */}
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl max-w-sm text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <BookOpen className="w-3.5 h-3.5" />
                <span>လေ့ကျင့်ရန် ညွှန်ကြားချက်-</span>
              </div>
              <p>
                ဤကြိယာအတွက် အောက်ပါ けい ၁၃ မျိုးကို စဉ်းစား၍ အကွက်များထဲတွင် ရိုက်ထည့်ပါ။ စာလုံးပေါင်းမှန်ပါက အစိမ်းရောင် အမှတ်ရရှိမည် ဖြစ်ပါသည်။
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Score and Stats Banner */}
      {checked && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
            correctCount === FORMS_13.length
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : correctCount >= 10
              ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 flex-shrink-0" />
            <div>
              <div className="font-bold text-base">
                {language === 'my'
                  ? `ရမှတ်: ${correctCount} / ${FORMS_13.length} မှန်ကန်ပါသည် (${Math.round(
                      (correctCount / FORMS_13.length) * 100
                    )}%)`
                  : `Score: ${correctCount} / ${FORMS_13.length} Correct (${Math.round(
                      (correctCount / FORMS_13.length) * 100
                    )}%)`}
              </div>
              <p className="text-xs opacity-90">
                {correctCount === FORMS_13.length
                  ? 'ဂုဏ်ယူပါသည်! ပုံစံ ၁၃ မျိုးလုံး တိကျမှန်ကန်စွာ ဖြည့်စွက်နိုင်ခဲ့ပါသည်။'
                  : 'မှားယွင်းနေသော သို့မဟုတ် မဖြည့်ရသေးသော ပုံစံများကို အနီရောင်ဖြင့် အဖြေမှန် ပြသထားပါသည်။'}
              </p>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
          >
            <span>နောက်ကြိယာ စမ်းမည်</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 13 Forms Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FORMS_13.map((form, idx) => {
          const expected = getExpectedAnswer(form);
          const isCorrect = checked && isFormCorrect(form);
          const isWrong = checked && !isFormCorrect(form);
          const showHint = activeHintKey === form.key;
          const rule = conjugationRulesGuide[form.key];

          return (
            <div
              key={form.key}
              className={`p-4 rounded-xl border transition-all relative ${
                isCorrect
                  ? 'bg-emerald-950/20 border-emerald-500/50 shadow-sm shadow-emerald-900/20'
                  : isWrong
                  ? 'bg-rose-950/20 border-rose-500/50 shadow-sm shadow-rose-900/20'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Form Title & Subtitle */}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-bold text-slate-100 text-sm">{form.name_jp}</span>
                  <span className="text-xs text-rose-300 ml-2 font-medium">({getFormLabel(form)})</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleAudio(expected)}
                    className="p-1 text-slate-400 hover:text-amber-300 transition-colors"
                    title="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveHintKey(showHint ? null : form.key)}
                    className="p-1 text-slate-400 hover:text-sky-300 transition-colors"
                    title="Hint"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Input Box */}
              <div className="relative">
                <input
                  type="text"
                  value={userInputs[form.key] || ''}
                  onChange={(e) => {
                    setUserInputs((prev) => ({ ...prev, [form.key]: e.target.value }));
                    if (checked) setChecked(false);
                  }}
                  placeholder={
                    checked
                      ? ''
                      : language === 'my'
                      ? `ဥပမာ- ${expected}`
                      : `Enter ${form.name_en}`
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl text-base font-medium transition-all ${
                    isCorrect
                      ? 'bg-emerald-950/40 border-2 border-emerald-500 text-emerald-200'
                      : isWrong
                      ? 'bg-rose-950/40 border-2 border-rose-500 text-rose-200'
                      : 'bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-rose-500'
                  }`}
                />

                {/* Status Indicator Icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {isWrong && <XCircle className="w-5 h-5 text-rose-400" />}
                </div>
              </div>

              {/* Display Correct Answer when Checked & Wrong */}
              {isWrong && (
                <div className="mt-2 text-xs bg-rose-950/40 border border-rose-900/50 p-2 rounded-lg flex items-center justify-between">
                  <span className="text-slate-300">
                    အဖြေမှန်:{' '}
                    <strong className="text-rose-300 font-serif text-sm tracking-wide">{expected}</strong>
                  </span>
                  <button
                    onClick={() => {
                      setUserInputs((prev) => ({ ...prev, [form.key]: expected }));
                    }}
                    className="text-[11px] px-2 py-0.5 bg-rose-900/50 hover:bg-rose-800 text-rose-200 rounded font-semibold transition-colors"
                  >
                    ထည့်သွင်းမည်
                  </button>
                </div>
              )}

              {/* Display Hint Modal / Drawer */}
              {showHint && rule && (
                <div className="mt-2 p-2.5 bg-sky-950/50 border border-sky-800/60 rounded-lg text-xs text-sky-200 space-y-1">
                  <div className="font-bold flex items-center gap-1 text-sky-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>ဖွဲ့စည်းပုံနည်းဥပဒေသ ({currentVerb.group}):</span>
                  </div>
                  <p>
                    {currentVerb.group === 'Group 1'
                      ? rule.rule_group1_my
                      : currentVerb.group === 'Group 2'
                      ? rule.rule_group2_my
                      : rule.rule_group3_my}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 sticky bottom-4 shadow-2xl z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{language === 'my' ? 'အားလုံးရှင်းမည်' : 'Reset'}</span>
          </button>
          <button
            onClick={handleReveal}
            className="px-4 py-2.5 bg-indigo-900/40 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-700/40 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>{language === 'my' ? 'အဖြေများအားလုံးကြည့်မည်' : 'Reveal All'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCheck}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/40 transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{language === 'my' ? 'အဖြေစစ်မည် (Check Answers)' : 'Check Answers'}</span>
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-rose-900/40 transition-all flex items-center gap-1.5"
          >
            <span>{language === 'my' ? 'နောက်ကြိယာ' : 'Next Verb'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
