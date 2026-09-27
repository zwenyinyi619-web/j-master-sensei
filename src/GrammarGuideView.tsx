import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  Volume2,
  ChevronDown,
  ChevronUp,
  Tag,
  Sparkles,
} from 'lucide-react';
import { GrammarItem } from '../types/grammar';
import { JLPTFilter, Language } from '../types/common';
import { grammarData } from '../data/grammarData';
import { translations } from '../i18n/translations';
import { playJapaneseAudio } from '../utils/audio';

interface GrammarGuideViewProps {
  language: Language;
  levelFilter: JLPTFilter;
  soundEnabled: boolean;
}

export const GrammarGuideView: React.FC<GrammarGuideViewProps> = ({
  language,
  levelFilter,
  soundEnabled,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const t = translations[language];

  const getGrammarMeaning = (item: GrammarItem) => {
    if (language === 'my') return item.meaning_my;
    if (language === 'th') return item.meaning_th || item.meaning_en;
    if (language === 'vi') return item.meaning_vi || item.meaning_en;
    return item.meaning_en;
  };

  const getGrammarExplanation = (item: GrammarItem) => {
    if (language === 'my') return item.explanation_my;
    if (language === 'th') return item.explanation_th || item.explanation_en;
    if (language === 'vi') return item.explanation_vi || item.explanation_en;
    return item.explanation_en;
  };

  const getExampleTranslation = (ex: any) => {
    if (language === 'my') return ex.my;
    if (language === 'th') return ex.th || ex.en;
    if (language === 'vi') return ex.vi || ex.en;
    return ex.en;
  };

  const filteredGrammar = useMemo(() => {
    return grammarData.filter((g) => {
      if (levelFilter !== 'All' && g.jlpt !== levelFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesPattern = g.pattern.toLowerCase().includes(q);
        const matchesStructure = g.structure.toLowerCase().includes(q);
        const matchesMy = g.meaning_my.toLowerCase().includes(q) || g.explanation_my.toLowerCase().includes(q);
        const matchesEn = g.meaning_en.toLowerCase().includes(q) || g.explanation_en.toLowerCase().includes(q);
        const matchesTh = (g.meaning_th && g.meaning_th.toLowerCase().includes(q)) || (g.explanation_th && g.explanation_th.toLowerCase().includes(q));
        const matchesVi = (g.meaning_vi && g.meaning_vi.toLowerCase().includes(q)) || (g.explanation_vi && g.explanation_vi.toLowerCase().includes(q));
        return matchesPattern || matchesStructure || matchesMy || matchesEn || matchesTh || matchesVi;
      }
      return true;
    });
  }, [levelFilter, searchQuery]);

  const handleAudio = (text: string) => {
    if (soundEnabled) {
      playJapaneseAudio(text);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
          <span>{t.navGrammar}</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
            {filteredGrammar.length} {language === 'my' ? 'ခု' : 'Rules'}
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {language === 'my'
            ? 'JLPT N5, N4, N3 အဆင့် သဒ္ဒါစည်းမျဉ်းများ၊ ဝါကျတည်ဆောက်ပုံနှင့် လက်တွေ့ဥပမာများ'
            : 'Master JLPT grammar patterns with clear structures, formation notes, and audio-guided examples.'}
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-200 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
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

      {/* Grammar Cards List */}
      <div className="space-y-4">
        {filteredGrammar.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/40 transition-all shadow-md"
            >
              {/* Card Title Bar */}
              <div
                onClick={() => toggleExpand(item.id)}
                className="flex items-start justify-between cursor-pointer select-none"
              >
                <div>
                  <div className="flex items-center space-x-2.5 mb-1.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {item.jlpt}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center space-x-1">
                      <Tag className="w-3 h-3 text-slate-500" />
                      <span>{item.category}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white font-mono tracking-wide">
                    {item.pattern}
                  </h3>

                  <div className="text-sm font-bold text-amber-300 mt-1">
                    {getGrammarMeaning(item)}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAudio(item.pattern);
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title={t.playAudio}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-xl bg-slate-800 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Grammar Structure Bar */}
              <div className="mt-3 p-3 rounded-xl bg-slate-850 border border-slate-800 flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {t.structure}:
                </span>
                <span className="text-xs sm:text-sm font-mono font-medium text-emerald-400">
                  {item.structure}
                </span>
              </div>

              {/* Explanation & Practical Examples (Always partially visible or expanded) */}
              <div className="mt-4 space-y-4">
                {/* Explanation */}
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-850/50 p-3.5 rounded-xl border border-slate-800/80">
                  <span className="font-semibold text-slate-400">{t.explanation}: </span>
                  {getGrammarExplanation(item)}
                </div>

                {/* Practical Examples */}
                <div className="space-y-2.5">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                    {t.grammarExamples}:
                  </div>

                  <div className="space-y-2">
                    {item.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-850 border border-slate-800 flex items-start justify-between gap-3 text-xs sm:text-sm"
                      >
                        <div className="space-y-0.5">
                          <div className="font-bold text-white font-serif tracking-wide">
                            {ex.jp}
                          </div>
                          <div className="text-slate-400 font-mono text-xs">
                            {ex.romaji}
                          </div>
                          <div className="text-amber-300 font-medium pt-1">
                            → {getExampleTranslation(ex)}
                          </div>
                        </div>

                        <button
                          onClick={() => handleAudio(ex.jp)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
                          title={t.playAudio}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
