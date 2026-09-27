import React, { useState, useMemo } from 'react';
import {
  Search,
  Volume2,
  PenTool,
  BookOpen,
  X,
  Info,
  Layers,
} from 'lucide-react';
import { KanjiItem } from '../types/kanji';
import { JLPTFilter, Language } from '../types/common';
import { kanjiData } from '../data/kanjiData';
import { translations } from '../i18n/translations';
import { playJapaneseAudio } from '../utils/audio';
import { KanjiWritingStudio } from './KanjiWritingStudio';
import { KanjiOnyomiKunyomiGuide } from './KanjiOnyomiKunyomiGuide';

interface KanjiViewProps {
  language: Language;
  levelFilter: JLPTFilter;
  soundEnabled: boolean;
}

export const KanjiView: React.FC<KanjiViewProps> = ({
  language,
  levelFilter,
  soundEnabled,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKanji, setSelectedKanji] = useState<KanjiItem | null>(null);
  const [practiceKanji, setPracticeKanji] = useState<KanjiItem | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const t = translations[language];

  const getKanjiMeaning = (k: KanjiItem) => {
    if (!k) return '';
    if (language === 'my') return k.meaning_my;
    if (language === 'th') return k.meaning_th || k.meaning_en;
    if (language === 'vi') return k.meaning_vi || k.meaning_en;
    return k.meaning_en;
  };

  const getKanjiExplanation = (k: KanjiItem) => {
    if (!k) return '';
    if (language === 'my') return k.explanation_my;
    if (language === 'th') return k.explanation_th || k.explanation_en;
    if (language === 'vi') return k.explanation_vi || k.explanation_en;
    return k.explanation_en;
  };

  const getCompoundMeaning = (c: any) => {
    if (!c) return '';
    if (language === 'my') return c.meaning_my;
    if (language === 'th') return c.meaning_th || c.meaning_en;
    if (language === 'vi') return c.meaning_vi || c.meaning_en;
    return c.meaning_en;
  };

  const filteredKanji = useMemo(() => {
    return kanjiData.filter((k) => {
      if (levelFilter !== 'All' && k.jlpt !== levelFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesKanji = k.kanji.toLowerCase().includes(q);
        const matchesOn = k.onyomi.some((o) => o.toLowerCase().includes(q));
        const matchesKun = k.kunyomi.some((u) => u.toLowerCase().includes(q));
        const matchesMy = k.meaning_my.toLowerCase().includes(q);
        const matchesEn = k.meaning_en.toLowerCase().includes(q);
        const matchesTh = k.meaning_th?.toLowerCase().includes(q);
        const matchesVi = k.meaning_vi?.toLowerCase().includes(q);
        return matchesKanji || matchesOn || matchesKun || matchesMy || matchesEn || matchesTh || matchesVi;
      }
      return true;
    });
  }, [levelFilter, searchQuery]);

  const handleAudio = (text: string) => {
    if (soundEnabled) {
      playJapaneseAudio(text);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
            <span>{t.navKanji}</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              {filteredKanji.length} {language === 'my' ? 'လုံး' : 'Kanji'}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {language === 'my'
              ? 'ခန်ဂျီ ဆွဲချက်၊ အသံထွက်၊ တွဲစပ်စကားလုံးများနှင့် လက်ရေးဆွဲလေ့ကျင့်ရန် Canvas စတူဒီယို'
              : 'Explore stroke counts, Onyomi, Kunyomi, compound words, and practice writing on Canvas.'}
          </p>
        </div>

        <button
          onClick={() => setShowGuide(!showGuide)}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>{t.kanjiGuideTitle}</span>
        </button>
      </div>

      {/* Guide Banner */}
      {showGuide && <KanjiOnyomiKunyomiGuide language={language} />}

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-200 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* Kanji Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredKanji.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedKanji(item)}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850/80 transition-all cursor-pointer group flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {item.jlpt}
                </span>
                <span className="text-[10px] text-slate-500">
                  {item.strokes} strokes
                </span>
              </div>

              {/* Character Box */}
              <div className="py-2 flex items-center justify-center">
                <span className="text-5xl font-serif text-white font-bold group-hover:scale-110 transition-transform text-amber-200/95">
                  {item.kanji}
                </span>
              </div>

              {/* Meaning - Reactive to Language */}
              <div className="text-center mt-2">
                <div className="text-xs font-bold text-amber-300 truncate">
                  {getKanjiMeaning(item)}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1 text-[11px]">
              {item.onyomi.length > 0 && (
                <div className="text-slate-400 truncate">
                  <span className="text-rose-400 font-semibold font-mono">音:</span> {item.onyomi[0]}
                </div>
              )}
              {item.kunyomi.length > 0 && (
                <div className="text-slate-400 truncate">
                  <span className="text-amber-400 font-semibold font-mono">訓:</span> {item.kunyomi[0]}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Kanji Detail Modal */}
      {selectedKanji && !practiceKanji && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative my-8">
            <button
              onClick={() => setSelectedKanji(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Kanji Character Header */}
            <div className="flex items-center space-x-5">
              <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center text-5xl font-serif font-black text-amber-300 shadow-inner">
                {selectedKanji.kanji}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {getKanjiMeaning(selectedKanji)}
                  </h3>
                  <button
                    onClick={() => handleAudio(selectedKanji.onyomi[0] || selectedKanji.kanji)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300"
                    title={t.playAudio}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center space-x-3">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                    {selectedKanji.jlpt}
                  </span>
                  <span>
                    {t.strokes}: <strong className="text-white">{selectedKanji.strokes}</strong>
                  </span>
                  {selectedKanji.radicals && (
                    <span>
                      Radical: <strong className="text-slate-300">{selectedKanji.radicals}</strong>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Readings */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-850 p-3 rounded-xl border border-slate-800">
                <div className="font-semibold text-rose-400 mb-1">{t.onyomi}</div>
                <div className="font-mono text-slate-200">
                  {selectedKanji.onyomi.join(', ') || '-'}
                </div>
              </div>

              <div className="bg-slate-850 p-3 rounded-xl border border-slate-800">
                <div className="font-semibold text-amber-400 mb-1">{t.kunyomi}</div>
                <div className="font-mono text-slate-200">
                  {selectedKanji.kunyomi.join(', ') || '-'}
                </div>
              </div>
            </div>

            {/* Explanation - Reactive to Language */}
            <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {t.explanation}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {getKanjiExplanation(selectedKanji)}
              </p>
            </div>

            {/* Compounds List */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {t.compounds}
              </div>
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {selectedKanji.compounds.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAudio(c.word)}
                        className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                        title={t.playAudio}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-bold text-white font-serif">{c.word}</span>
                      <span className="text-slate-400">({c.reading})</span>
                    </div>
                    <span className="text-amber-300 font-medium">
                      {getCompoundMeaning(c)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice Drawing Button */}
            <button
              onClick={() => {
                setPracticeKanji(selectedKanji);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <PenTool className="w-4 h-4" />
              <span>{t.practiceKanji}</span>
            </button>
          </div>
        </div>
      )}

      {/* Writing Studio Canvas Modal */}
      {practiceKanji && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <KanjiWritingStudio
            kanji={practiceKanji}
            language={language}
            onClose={() => setPracticeKanji(null)}
            soundEnabled={soundEnabled}
          />
        </div>
      )}
    </div>
  );
};
