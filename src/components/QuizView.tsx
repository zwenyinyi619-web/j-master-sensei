import React, { useState, useMemo } from 'react';
import {
  Award,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Volume2,
  Sparkles,
  ListFilter,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { JLPTFilter, Language } from '../types/common';
import { kanjiQuizN5, kanjiQuizN4, kanjiQuizN3, allKanjiQuizData, KanjiQuizQuestion } from '../data/kanjiQuizData';
import { translations } from '../i18n/translations';
import { playJapaneseAudio } from '../utils/audio';
import { saveUserProgress } from '../userService';
import { auth } from '../firebase';

interface QuizViewProps {
  language: Language;
  levelFilter: JLPTFilter;
  soundEnabled: boolean;
}

export const QuizView: React.FC<QuizViewProps> = ({
  language,
  levelFilter,
  soundEnabled,
}) => {
  const t = translations[language];

  const [activeLevel, setActiveLevel] = useState<JLPTFilter>(levelFilter === 'All' ? 'N5' : levelFilter);
  const [questionCountLimit, setQuestionCountLimit] = useState<number>(20);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Sync activeLevel when header levelFilter changes and isn't 'All'
  React.useEffect(() => {
    if (levelFilter !== 'All') {
      setActiveLevel(levelFilter);
    }
  }, [levelFilter]);

  // Full pool for chosen level
  const fullLevelPool = useMemo(() => {
    if (activeLevel === 'N5') return kanjiQuizN5;
    if (activeLevel === 'N4') return kanjiQuizN4;
    if (activeLevel === 'N3') return kanjiQuizN3;
    return allKanjiQuizData;
  }, [activeLevel]);

  // Sliced pool based on questionCountLimit
  const currentQuestions = useMemo(() => {
    return fullLevelPool.slice(0, questionCountLimit);
  }, [fullLevelPool, questionCountLimit]);

  const currentQ: KanjiQuizQuestion | undefined = currentQuestions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (currentQ && idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
      
      // Calculate final score including current question if correct
      const finalScore = score + (currentQ && selectedOption === currentQ.correctIndex ? 1 : 0);

      // Save progress to Firebase Firestore
      if (auth.currentUser) {
        saveUserProgress(auth.currentUser.uid, {
          quizScore: finalScore,
          totalQuestions: currentQuestions.length,
          level: activeLevel,
          lastStudied: new Date().toISOString(),
        }).catch((err) => console.error("Failed to save progress:", err));
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCompleted(false);
  };

  const handleAudio = (text: string) => {
    if (soundEnabled && text) {
      playJapaneseAudio(text);
    }
  };

  const getExplanation = (q: KanjiQuizQuestion | undefined) => {
    if (!q) return '';
    if (language === 'my') return q.explanation_my;
    if (language === 'th') return q.explanation_th || q.explanation_en;
    if (language === 'vi') return q.explanation_vi || q.explanation_en;
    return q.explanation_en;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Title & Level selector */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 font-bold text-xs uppercase tracking-wider border border-rose-500/30">
                Kanji လေ့ကျင့်ခန်း မေးခွန်းများ
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
                N5: 200 မေးခွန်း | N4: 200 မေးခွန်း | N3: 200 မေးခွန်း
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {language === 'my'
                ? 'ခန်ဂျီ အရည်အချင်းစစ် မေးခွန်းလေ့ကျင့်ခန်း'
                : 'JLPT Kanji Practice Quiz Engine'}
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              {language === 'my'
                ? 'အသံထွက်၊ ခန်ဂျီစာလုံး၊ အဓိပ္ပာယ် နှင့် စကားလုံးပေါင်းစပ်မှုများကို အဆင့်လိုက် လေ့ကျင့်ပါ'
                : 'Practice readings, kanji selection, meanings, and contextual compound words.'}
            </p>
          </div>

          {/* Level Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            {(['N5', 'N4', 'N3'] as JLPTFilter[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setActiveLevel(lvl);
                  handleRestart();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeLevel === lvl
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {lvl} (200 Q)
              </button>
            ))}
          </div>
        </div>

        {/* Question Count Limit Selector */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ListFilter className="w-4 h-4 text-rose-400" />
            <span>မေးခွန်းအရေအတွက် ရွေးချယ်ရန်:</span>
            {[10, 20, 50, 100, 200].map((num) => (
              <button
                key={num}
                onClick={() => {
                  setQuestionCountLimit(num);
                  handleRestart();
                }}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                  questionCountLimit === num
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {num === 200 ? '200 (အပြည့်)' : num}
              </button>
            ))}
          </div>

          <span className="font-mono text-slate-400">
            ရွေးချယ်ထားမှု: {activeLevel} • မေးခွန်း {questionCountLimit} ခု
          </span>
        </div>
      </div>

      {/* Main Quiz Flow */}
      {!completed && currentQ ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {currentQ?.level || activeLevel}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                မေးခွန်း {currentIndex + 1} / {currentQuestions.length}
              </span>
            </div>

            <div className="text-xs font-bold text-amber-400">
              ရမှတ်: {score} / {currentIndex + (isAnswered ? 1 : 0)}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-rose-500 to-amber-500 h-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / currentQuestions.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Prompt */}
          <div className="space-y-2 py-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                {currentQ?.question_jp || ''}
              </h3>
              <button
                onClick={() => currentQ?.question_jp && handleAudio(currentQ.question_jp)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-colors flex-shrink-0"
                title="Pronounce"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400 font-mono">{currentQ?.romaji || ''}</p>
          </div>

          {/* 4 Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ?.options?.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle =
                'bg-slate-950/80 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/20';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-950/50 border-rose-500 text-rose-200 shadow-md shadow-rose-900/20';
                } else {
                  btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-xl border text-left font-medium text-base sm:text-lg transition-all flex items-center justify-between group ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-800/80 text-slate-300 text-xs font-bold flex items-center justify-center border border-slate-700">
                      {idx + 1}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-sm text-slate-200">
                  {language === 'my' ? 'ရှင်းလင်းချက်-' : 'Explanation:'}
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {getExplanation(currentQ)}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-rose-900/40 flex items-center gap-2"
              >
                <span>
                  {currentIndex + 1 < currentQuestions.length
                    ? language === 'my'
                      ? 'နောက်မေးခွန်းသို့'
                      : 'Next Question'
                    : language === 'my'
                    ? 'ရလဒ်ကြည့်မည်'
                    : 'View Results'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-lg shadow-rose-900/40">
            <Award className="w-10 h-10 text-white" />
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-extrabold text-white">
              {language === 'my' ? 'ခန်ဂျီ စစ်ဆေးမှု ပြီးဆုံးပါပြီ' : 'Kanji Practice Complete!'}
            </h3>
            <p className="text-slate-400 text-sm">
              {language === 'my'
                ? `အဆင့် ${activeLevel} မေးခွန်း ${currentQuestions.length} ခုတွင် အောင်မြင်စွာ ဖြေဆိုခဲ့ပါသည်`
                : `You completed ${currentQuestions.length} questions for ${activeLevel}.`}
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-w-sm mx-auto">
            <div className="text-4xl font-black text-rose-400">
              {score} / {currentQuestions.length}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              ရမှတ်ရာခိုင်နှုန်း: {currentQuestions.length > 0 ? Math.round((score / currentQuestions.length) * 100) : 0}%
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-rose-900/30 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'my' ? 'ပြန်လည်ဖြေဆိုမည်' : 'Restart Quiz'}</span>
            </button>
            <button
              onClick={() => {
                const nextLvl: JLPTFilter = activeLevel === 'N5' ? 'N4' : activeLevel === 'N4' ? 'N3' : 'N5';
                setActiveLevel(nextLvl);
                handleRestart();
              }}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm rounded-xl transition-all border border-slate-700 flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>{language === 'my' ? 'နောက်အဆင့်သို့ ပြောင်းမည်' : 'Next Level'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
