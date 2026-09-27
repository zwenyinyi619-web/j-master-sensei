import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Volume2,
  ArrowRight,
  Sparkles,
  BookOpen,
  Filter,
  ListOrdered,
  Shuffle,
  ChevronRight,
  Award,
} from 'lucide-react';
import { JLPTFilter, Language } from '../types/common';
import { grammarExercisesData, ExerciseQuestion } from '../data/grammarExercisesData';
import { mixedGrammarN5, mixedGrammarN4, mixedGrammarN3 } from '../data/grammarMixedExercises';
import { grammarListN5, grammarListN4, grammarListN3 } from '../data/grammarMasterList';
import { GrammarItem, GrammarQuestion } from '../types/grammar';
import { translations } from '../i18n/translations';
import { playJapaneseAudio } from '../utils/audio';

interface PracticeProps {
  language: Language;
  levelFilter: JLPTFilter;
  soundEnabled: boolean;
}

export const GrammarPracticeView: React.FC<PracticeProps> = ({
  language,
  levelFilter,
  soundEnabled,
}) => {
  const t = translations[language];

  // Modes: 'mixed300' (300 mixed questions) | 'pattern5' (100 patterns x 5 questions)
  const [practiceMode, setPracticeMode] = useState<'mixed300' | 'pattern5'>('mixed300');
  const [activeLevel, setActiveLevel] = useState<JLPTFilter>(levelFilter === 'All' ? 'N5' : levelFilter);

  // Mode 1: 300 Mixed Questions State
  const [mixedLimit, setMixedLimit] = useState<number>(30);
  const [mixedIndex, setMixedIndex] = useState(0);
  const [mixedSelected, setMixedSelected] = useState<number | null>(null);
  const [mixedAnswered, setMixedAnswered] = useState(false);
  const [mixedScore, setMixedScore] = useState(0);
  const [mixedCompleted, setMixedCompleted] = useState(false);

  // Mode 2: 100 Patterns x 5 Questions State
  const [selectedPatternIndex, setSelectedPatternIndex] = useState(0);
  const [patternQIndex, setPatternQIndex] = useState(0);
  const [patternSelected, setPatternSelected] = useState<number | null>(null);
  const [patternAnswered, setPatternAnswered] = useState(false);
  const [patternScore, setPatternScore] = useState(0);
  const [patternCompleted, setPatternCompleted] = useState(false);

  React.useEffect(() => {
    if (levelFilter !== 'All') {
      setActiveLevel(levelFilter);
    }
  }, [levelFilter]);

  // Mixed Questions Pool
  const mixedPool = useMemo(() => {
    if (activeLevel === 'N5') return mixedGrammarN5;
    if (activeLevel === 'N4') return mixedGrammarN4;
    if (activeLevel === 'N3') return mixedGrammarN3;
    return grammarExercisesData;
  }, [activeLevel]);

  const activeMixedQuestions = useMemo(() => {
    return mixedPool.slice(0, mixedLimit);
  }, [mixedPool, mixedLimit]);

  const currentMixedQ = activeMixedQuestions[mixedIndex];

  // Pattern Pool
  const patternPool = useMemo(() => {
    if (activeLevel === 'N5') return grammarListN5;
    if (activeLevel === 'N4') return grammarListN4;
    if (activeLevel === 'N3') return grammarListN3;
    return grammarListN5;
  }, [activeLevel]);

  const currentPattern: GrammarItem = patternPool[selectedPatternIndex] || patternPool[0];
  const patternQuestions: GrammarQuestion[] = currentPattern?.practiceQuestions || [];
  const currentPatternQ = patternQuestions[patternQIndex];

  const handleAudio = (text: string) => {
    if (soundEnabled && text) {
      playJapaneseAudio(text);
    }
  };

  // Mixed handlers
  const handleSelectMixed = (idx: number) => {
    if (mixedAnswered) return;
    setMixedSelected(idx);
    setMixedAnswered(true);
    if (currentMixedQ && idx === currentMixedQ.correctIndex) {
      setMixedScore((prev) => prev + 1);
    }
  };

  const handleNextMixed = () => {
    if (mixedIndex + 1 < activeMixedQuestions.length) {
      setMixedIndex((prev) => prev + 1);
      setMixedSelected(null);
      setMixedAnswered(false);
    } else {
      setMixedCompleted(true);
    }
  };

  const handleRestartMixed = () => {
    setMixedIndex(0);
    setMixedSelected(null);
    setMixedAnswered(false);
    setMixedScore(0);
    setMixedCompleted(false);
  };

  // Pattern handlers
  const handleSelectPatternQ = (idx: number) => {
    if (patternAnswered) return;
    setPatternSelected(idx);
    setPatternAnswered(true);
    if (currentPatternQ && idx === currentPatternQ.correctIndex) {
      setPatternScore((prev) => prev + 1);
    }
  };

  const handleNextPatternQ = () => {
    if (patternQIndex + 1 < patternQuestions.length) {
      setPatternQIndex((prev) => prev + 1);
      setPatternSelected(null);
      setPatternAnswered(false);
    } else {
      setPatternCompleted(true);
    }
  };

  const handlePatternChange = (idx: number) => {
    setSelectedPatternIndex(idx);
    setPatternQIndex(0);
    setPatternSelected(null);
    setPatternAnswered(false);
    setPatternScore(0);
    setPatternCompleted(false);
  };

  const handleRestartPattern = () => {
    setPatternQIndex(0);
    setPatternSelected(null);
    setPatternAnswered(false);
    setPatternScore(0);
    setPatternCompleted(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header and Mode Selector */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs uppercase tracking-wider border border-indigo-500/30">
                သဒ္ဒါ လေ့ကျင့်ခန်း စင်တာ
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
                အရော မေးခွန်း ၃၀၀ | သဒ္ဒါ ၁၀၀ x ၅ မေးခွန်း
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {language === 'my'
                ? 'JLPT သဒ္ဒါ အဆင့်လိုက် လေ့ကျင့်ခန်း'
                : 'JLPT Grammar Practice Arena'}
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              {language === 'my'
                ? 'သဒ္ဒါအရော မေးခွန်း ၃၀၀ သို့မဟုတ် သဒ္ဒါ ၁ ခုစီအတွက် မေးခွန်း ၅ ခုစီ သီးသန့်လေ့ကျင့်ပါ'
                : 'Choose between 300 mixed exam questions or 100 grammar patterns x 5 specific questions.'}
            </p>
          </div>

          {/* Level Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            {(['N5', 'N4', 'N3'] as JLPTFilter[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setActiveLevel(lvl);
                  handleRestartMixed();
                  handleRestartPattern();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeLevel === lvl
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setPracticeMode('mixed300')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                practiceMode === 'mixed300'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>သဒ္ဒါ အရော မေးခွန်း ၃၀၀ (Mixed 300 Q)</span>
            </button>
            <button
              onClick={() => setPracticeMode('pattern5')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                practiceMode === 'pattern5'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>သဒ္ဒါ ၁၀၀ ခု (၁ ခုစီ ၅ မေးခွန်း)</span>
            </button>
          </div>

          {/* Sub Controls */}
          {practiceMode === 'mixed300' ? (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>အရေအတွက်:</span>
              {[15, 30, 50, 100, 300].map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setMixedLimit(n);
                    handleRestartMixed();
                  }}
                  className={`px-2 py-1 rounded font-semibold transition-all ${
                    mixedLimit === n
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {n === 300 ? '300 (အားလုံး)' : n}
                </button>
              ))}
            </div>
          ) : (
            <div className="w-full sm:w-64">
              <select
                value={selectedPatternIndex}
                onChange={(e) => handlePatternChange(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                {patternPool.map((p, idx) => (
                  <option key={p.id} value={idx}>
                    #{idx + 1} {p.pattern} ({p.title_my})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Mode 1: 300 Mixed Questions */}
      {practiceMode === 'mixed300' && (
        <>
          {!mixedCompleted && currentMixedQ ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {currentMixedQ.level} အရောမေးခွန်း
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    မေးခွန်း {mixedIndex + 1} / {activeMixedQuestions.length}
                  </span>
                </div>
                <div className="text-xs font-bold text-amber-400">
                  ရမှတ်: {mixedScore} / {mixedIndex + (mixedAnswered ? 1 : 0)}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-rose-500 to-indigo-500 h-full transition-all duration-300"
                  style={{
                    width: `${((mixedIndex + 1) / activeMixedQuestions.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Body */}
              <div className="space-y-2 py-2">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                    {currentMixedQ.question_jp}
                  </h3>
                  <button
                    onClick={() => handleAudio(currentMixedQ.question_jp)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-colors flex-shrink-0"
                    title="Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-400 font-mono">{currentMixedQ.romaji}</p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentMixedQ.options.map((opt, idx) => {
                  const isSelected = mixedSelected === idx;
                  const isCorrect = idx === currentMixedQ.correctIndex;

                  let btnStyle =
                    'bg-slate-950/80 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700';

                  if (mixedAnswered) {
                    if (isCorrect) {
                      btnStyle =
                        'bg-emerald-950/50 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/20';
                    } else if (isSelected && !isCorrect) {
                      btnStyle =
                        'bg-rose-950/50 border-rose-500 text-rose-200 shadow-md shadow-rose-900/20';
                    } else {
                      btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectMixed(idx)}
                      disabled={mixedAnswered}
                      className={`p-4 rounded-xl border text-left font-medium text-base transition-all flex items-center justify-between group ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center border border-slate-700">
                          {idx + 1}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {mixedAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      {mixedAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {mixedAnswered && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>{language === 'my' ? 'ရှင်းလင်းချက်-' : 'Explanation:'}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {language === 'my' ? currentMixedQ.explanation_my : currentMixedQ.explanation_en}
                  </p>
                  <p className="text-xs text-slate-400 pt-1">
                    ဘာသာပြန်: {language === 'my' ? currentMixedQ.translation_my : currentMixedQ.translation_en}
                  </p>
                </div>
              )}

              {/* Next Button */}
              {mixedAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextMixed}
                    className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center gap-2"
                  >
                    <span>
                      {mixedIndex + 1 < activeMixedQuestions.length
                        ? language === 'my'
                          ? 'နောက်မေးခွန်း'
                          : 'Next'
                        : language === 'my'
                        ? 'ရလဒ်ကြည့်မည်'
                        : 'Finish'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
              <Award className="w-16 h-16 mx-auto text-amber-400" />
              <h3 className="text-2xl font-bold text-white">
                သဒ္ဒါ အရော မေးခွန်းများ ဖြေဆိုပြီးပါပြီ
              </h3>
              <div className="text-3xl font-black text-rose-400">
                {mixedScore} / {activeMixedQuestions.length} ({Math.round((mixedScore / activeMixedQuestions.length) * 100)}%)
              </div>
              <button
                onClick={handleRestartMixed}
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-bold flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-4 h-4" />
                <span>ပြန်လည်စတင်မည်</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* Mode 2: 100 Patterns x 5 Practice Questions */}
      {practiceMode === 'pattern5' && (
        <div className="space-y-6">
          {/* Pattern Details Banner */}
          <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Pattern #{selectedPatternIndex + 1} of {patternPool.length}
              </span>
              <span className="text-xs text-slate-400">
                မေးခွန်း {patternQIndex + 1} / 5
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-indigo-200">
              {currentPattern.pattern}
            </h3>
            <p className="text-sm text-slate-300 font-medium mt-1">
              {language === 'my' ? currentPattern.meaning_my : currentPattern.meaning_en}
            </p>
            <div className="text-xs text-slate-400 font-mono mt-1 bg-slate-950 p-2 rounded-lg border border-slate-800">
              ဖွဲ့စည်းပုံ: {currentPattern.structure}
            </div>
          </div>

          {/* Current Question from the 5 */}
          {!patternCompleted && currentPatternQ ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400">
                  မေးခွန်း {patternQIndex + 1} ၏ ၅
                </span>
                <span className="text-xs text-amber-400 font-bold">
                  ရမှတ်: {patternScore} / {patternQIndex + (patternAnswered ? 1 : 0)}
                </span>
              </div>

              <div className="space-y-2 py-1">
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  {currentPatternQ.question_jp}
                </h4>
                <p className="text-xs text-slate-400 font-mono">{currentPatternQ.romaji}</p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentPatternQ.options.map((opt, idx) => {
                  const isSelected = patternSelected === idx;
                  const isCorrect = idx === currentPatternQ.correctIndex;

                  let btnStyle =
                    'bg-slate-950/80 border-slate-800 text-slate-200 hover:bg-slate-800';

                  if (patternAnswered) {
                    if (isCorrect) {
                      btnStyle =
                        'bg-emerald-950/50 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/20';
                    } else if (isSelected && !isCorrect) {
                      btnStyle =
                        'bg-rose-950/50 border-rose-500 text-rose-200 shadow-md shadow-rose-900/20';
                    } else {
                      btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectPatternQ(idx)}
                      disabled={patternAnswered}
                      className={`p-4 rounded-xl border text-left font-medium text-sm sm:text-base transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-md bg-slate-800 text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {patternAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      {patternAnswered && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {patternAnswered && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>ရှင်းလင်းချက်:</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {language === 'my' ? currentPatternQ.explanation_my : currentPatternQ.explanation_en}
                  </p>
                </div>
              )}

              {/* Next */}
              {patternAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextPatternQ}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
                  >
                    <span>
                      {patternQIndex + 1 < patternQuestions.length ? 'နောက်မေးခွန်း (Next)' : '၅ မေးခွန်း ပြီးဆုံး'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
              <Award className="w-12 h-12 mx-auto text-amber-400" />
              <h4 className="text-xl font-bold text-white">
                ဤသဒ္ဒါအတွက် မေးခွန်း ၅ ခုလုံး ပြီးမြောက်ပါပြီ!
              </h4>
              <div className="text-2xl font-black text-indigo-400">
                ရမှတ်: {patternScore} / 5
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleRestartPattern}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold"
                >
                  ထပ်မံဖြေဆိုမည်
                </button>
                <button
                  onClick={() => {
                    const nextPIdx = (selectedPatternIndex + 1) % patternPool.length;
                    handlePatternChange(nextPIdx);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  နောက်သဒ္ဒါပုံစံ (#{selectedPatternIndex + 2}) သို့
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
