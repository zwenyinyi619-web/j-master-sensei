import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Volume2,
  RotateCw,
  CheckCircle,
  Clock,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Filter,
  Layers,
  BookOpen,
} from 'lucide-react';
import { JLPTFilter, Language } from '../types/common';
import { verbsData } from '../data/verbsData';
import { kanjiData } from '../data/kanjiData';
import { translations } from '../i18n/translations';
import { playJapaneseAudio } from '../utils/audio';

interface FlashcardViewProps {
  language: Language;
  levelFilter: JLPTFilter;
  soundEnabled: boolean;
}

type CardType = 'kanji' | 'verbs';

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  language,
  levelFilter,
  soundEnabled,
}) => {
  const [cardType, setCardType] = useState<CardType>('kanji');
  const [localLevel, setLocalLevel] = useState<JLPTFilter>(levelFilter);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [reviewIds, setReviewIds] = useState<Set<string>>(new Set());
  const t = translations[language];

  // Sync if parent levelFilter changes
  React.useEffect(() => {
    setLocalLevel(levelFilter);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [levelFilter]);

  // Filtered Cards data (N5, N4, N3 Kanji and Verbs)
  const cards = useMemo(() => {
    if (cardType === 'kanji') {
      return kanjiData.filter((k) => localLevel === 'All' || k.jlpt === localLevel);
    } else {
      return verbsData.filter((v) => localLevel === 'All' || v.level === localLevel);
    }
  }, [cardType, localLevel]);

  const currentItem = cards[currentIndex] || cards[0];

  const handleNext = () => {
    setIsFlipped(false);
    if (cards.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (cards.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    if (cards.length > 0) {
      setCurrentIndex(Math.floor(Math.random() * cards.length));
    }
  };

  const markMastered = () => {
    if (!currentItem) return;
    setMasteredIds((prev) => new Set(prev).add(currentItem.id));
    setReviewIds((prev) => {
      const next = new Set(prev);
      next.delete(currentItem.id);
      return next;
    });
    handleNext();
  };

  const markReview = () => {
    if (!currentItem) return;
    setReviewIds((prev) => new Set(prev).add(currentItem.id));
    handleNext();
  };

  const handleAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    if (soundEnabled) {
      playJapaneseAudio(text);
    }
  };

  const getFlashcardSubtitle = () => {
    if (language === 'my') return 'N5 မှ N3 အထိ ခန်ဂျီများနှင့် ကြိယာများကို အလွတ်ကျက်မှတ်နိုင်သော ကတ်ပြားများ';
    if (language === 'th') return 'แฟลชการ์ดสำหรับท่องจำคันจิและคำกริยา JLPT N5 ถึง N3 พร้อมระบบฝึกฝน';
    if (language === 'vi') return 'Thẻ ghi nhớ flashcard học toàn bộ Kanji và Động từ từ JLPT N5 đến N3';
    return 'Master all N5 to N3 Kanji and Verbs with interactive spaced-repetition flashcards.';
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cards.length]);
  const getItemMeaning = (item: any) => {
    if (!item) return '';
    if (language === 'my') return item.meaning_my;
    if (language === 'th') return item.meaning_th || item.meaning_en;
    if (language === 'vi') return item.meaning_vi || item.meaning_en;
    return item.meaning_en;
  };

  const getItemExplanation = (item: any) => {
    if (!item) return '';
    if (language === 'my') return item.explanation_my;
    if (language === 'th') return item.explanation_th || item.explanation_en;
    if (language === 'vi') return item.explanation_vi || item.explanation_en;
    return item.explanation_en;
  };

  if (!currentItem || cards.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500 bg-slate-900 rounded-3xl border border-slate-800">
        No cards available for this level.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-12">
      {/* Title & Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <span>{t.navFlashcards}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              {cards.length} Cards ({localLevel})
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {getFlashcardSubtitle()}
          </p>
        </div>

        {/* Mastered Progress Counters */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-semibold">
            ✓ {masteredIds.size}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-400 font-semibold">
            ↺ {reviewIds.size}
          </span>
        </div>
      </div>

      {/* Selectors Bar: Card Type & JLPT Level */}
      <div className="bg-slate-900 p-2.5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-2">
        {/* Type Toggle */}
        <div className="flex space-x-1 bg-slate-850 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              setCardType('kanji');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1.5 ${
              cardType === 'kanji' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>{t.navKanji} (N5-N3)</span>
          </button>
          <button
            onClick={() => {
              setCardType('verbs');
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1.5 ${
              cardType === 'verbs' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>{t.navVerbs}</span>
          </button>
        </div>

        {/* Level Selector */}
        <div className="flex space-x-1 bg-slate-850 p-1 rounded-xl border border-slate-800">
          {(['All', 'N5', 'N4', 'N3'] as JLPTFilter[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setLocalLevel(lvl);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                localLevel === lvl ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Shuffle Button */}
        <button
          onClick={handleShuffle}
          className="p-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-750 transition-colors"
          title="Shuffle cards"
        >
          <Shuffle className="w-4 h-4" />
        </button>
      </div>

      {/* 3D Flip Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full min-h-[350px] rounded-3xl bg-slate-900 border-2 border-slate-800 hover:border-amber-500/40 p-7 sm:p-9 flex flex-col justify-between cursor-pointer select-none shadow-2xl transition-all hover:scale-[1.01] active:scale-[0.99] relative overflow-hidden group"
      >
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {'level' in currentItem ? currentItem.level : currentItem.jlpt}
            </span>
            {'strokes' in currentItem && (
              <span className="text-xs text-slate-500 font-mono">
                {currentItem.strokes} strokes
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={(e) =>
                handleAudio(
                  e,
                  'dictionary' in currentItem
                    ? currentItem.dictionary
                    : currentItem.onyomi[0] || currentItem.kanji
                )
              }
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-rose-300 transition-colors"
              title={t.playAudio}
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <div className="text-[11px] text-slate-500 flex items-center space-x-1">
              <RotateCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
              <span>{t.flipCard}</span>
            </div>
          </div>
        </div>

        {/* Center Content: Front (Japanese) vs Back (Meaning & Details) */}
        <div className="text-center py-4">
          {!isFlipped ? (
            /* Front of Card */
            <div className="space-y-4">
              <div className="text-7xl sm:text-8xl font-black font-serif text-white tracking-wide text-amber-200">
                {'dictionary' in currentItem ? currentItem.dictionary : currentItem.kanji}
              </div>
              <div className="text-sm font-mono text-slate-400">
                {'reading' in currentItem
                  ? `${currentItem.reading} (${currentItem.romaji})`
                  : currentItem.onyomi.length > 0
                  ? `音: ${currentItem.onyomi.join(', ')}`
                  : ''}
              </div>
              <div className="text-xs text-slate-500 italic">
                {t.flipCard}
              </div>
            </div>
          ) : (
            /* Back of Card */
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="text-2xl sm:text-3xl font-bold text-amber-300">
                {getItemMeaning(currentItem)}
              </div>

              {'conjugations' in currentItem ? (
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-850 p-3.5 rounded-2xl border border-slate-800 max-w-sm mx-auto text-left">
                  <div>
                    <span className="text-slate-400">Masu: </span>
                    <span className="font-mono text-white font-bold">{currentItem.conjugations.masu}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Te: </span>
                    <span className="font-mono text-emerald-400 font-bold">{currentItem.conjugations.te}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Ta: </span>
                    <span className="font-mono text-blue-400 font-bold">{currentItem.conjugations.ta}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Nai: </span>
                    <span className="font-mono text-rose-400 font-bold">{currentItem.conjugations.nai}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 max-w-sm mx-auto text-left">
                  <div className="text-xs bg-slate-850 p-3 rounded-2xl border border-slate-800 space-y-1">
                    <div>
                      <span className="text-rose-400 font-semibold font-mono">音 (Onyomi): </span>
                      <span className="text-slate-200">{currentItem.onyomi.join(', ') || '-'}</span>
                    </div>
                    <div>
                      <span className="text-amber-400 font-semibold font-mono">訓 (Kunyomi): </span>
                      <span className="text-slate-200">{currentItem.kunyomi.join(', ') || '-'}</span>
                    </div>
                  </div>

                  {currentItem.compounds && currentItem.compounds.length > 0 && (
                    <div className="text-xs bg-slate-850 p-3 rounded-2xl border border-slate-800 space-y-1">
                      <div className="font-bold text-slate-400 text-[10px] uppercase">
                        {t.compounds}:
                      </div>
                      {currentItem.compounds.slice(0, 2).map((c: any, i: number) => (
                        <div key={i} className="flex justify-between text-slate-300">
                          <span className="font-serif font-bold text-white">
                            {c.word} ({c.reading})
                          </span>
                          <span className="text-amber-300/90">{getItemMeaning(c)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-xs text-slate-300 leading-relaxed italic">
                    {getItemExplanation(currentItem)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Card Status Indicators */}
        <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/80 pt-3">
          <span>
            {masteredIds.has(currentItem.id) ? (
              <span className="text-emerald-400 font-semibold">✓ {t.markKnown}</span>
            ) : reviewIds.has(currentItem.id) ? (
              <span className="text-amber-400 font-semibold">↺ {t.markReview}</span>
            ) : (
              'Card ' + (currentIndex + 1) + ' of ' + cards.length
            )}
          </span>
          <span className="font-mono text-[11px]">
            {currentIndex + 1} / {cards.length}
          </span>
        </div>
      </div>

      {/* Action Buttons: Prev, Next, Mastered, Review */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shadow-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 flex gap-2.5">
          <button
            onClick={markReview}
            className="flex-1 py-3.5 rounded-2xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Clock className="w-4 h-4" />
            <span>{t.markReview}</span>
          </button>

          <button
            onClick={markMastered}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 shadow-md transition-colors cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{t.markKnown}</span>
          </button>
        </div>

        <button
          onClick={handleNext}
          className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shadow-md"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
