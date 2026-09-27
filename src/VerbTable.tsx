import React, { useState, useMemo } from 'react';
import {
  Search,
  Volume2,
  Filter,
  Info,
  ChevronDown,
  ChevronUp,
  BookOpen,
  X,
  CheckCircle2,
} from 'lucide-react';
import { JLPTFilter, Language } from '../types/common';
import { VerbGroup, VerbItem } from '../types/verb';
import { verbsData } from '../data/verbsData';
import { translations } from '../i18n/translations';
import { playJapaneseAudio } from '../utils/audio';
import { conjugationRulesGuide } from '../utils/conjugator';

interface VerbTableProps {
  language: Language;
  levelFilter: JLPTFilter;
  soundEnabled: boolean;
}

export const VerbTable: React.FC<VerbTableProps> = ({
  language,
  levelFilter,
  soundEnabled,
}) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [selectedVerb, setSelectedVerb] = useState<VerbItem | null>(null);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [activeRuleTab, setActiveRuleTab] = useState('masu');

  const getVerbMeaning = (v: VerbItem) => {
    if (!v) return '';
    if (language === 'my') return v.meaning_my;
    if (language === 'th') return v.meaning_th || v.meaning_en;
    if (language === 'vi') return v.meaning_vi || v.meaning_en;
    return v.meaning_en;
  };

  const getVerbExample = (v: VerbItem) => {
    if (!v) return '';
    if (language === 'my') return v.example_my;
    if (language === 'th') return v.example_th || v.example_en;
    if (language === 'vi') return v.example_vi || v.example_en;
    return v.example_en;
  };

  // Filter verbs
  const filteredVerbs = useMemo(() => {
    return verbsData.filter((v) => {
      // Level filter
      if (levelFilter !== 'All' && v.level !== levelFilter) return false;
      // Group filter
      if (selectedGroup !== 'All' && v.group !== selectedGroup) return false;
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesJp = v.dictionary.toLowerCase().includes(q) || v.reading.toLowerCase().includes(q);
        const matchesRomaji = v.romaji.toLowerCase().includes(q);
        const matchesMy = v.meaning_my.toLowerCase().includes(q);
        const matchesEn = v.meaning_en.toLowerCase().includes(q);
        return matchesJp || matchesRomaji || matchesMy || matchesEn;
      }
      return true;
    });
  }, [levelFilter, selectedGroup, searchQuery]);

  const handleAudio = (text: string) => {
    if (soundEnabled) {
      playJapaneseAudio(text);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
            <span>{t.navVerbs}</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
              {filteredVerbs.length} {language === 'my' ? 'လုံး' : 'Verbs'}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {language === 'my'
              ? 'ဂျပန်ကြိယာများ၏ အဘိဓာန်ပုံစံ၊ ယဉ်ကျေးသောပုံစံ၊ တဲပုံစံ၊ ငြင်းပယ်ပုံစံနှင့် စွမ်းဆောင်နိုင်မှု ပုံစံများကို တစ်နေရာတည်းတွင် လေ့လာပါ'
              : 'Explore Japanese verbs, groups, and forms with audio pronunciation and conjugation matrices.'}
          </p>
        </div>

        <button
          onClick={() => setShowRulesModal(true)}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <BookOpen className="w-4 h-4 text-rose-400" />
          <span>{t.conjugationRuleTitle}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-rose-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Group Selector */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {['All', 'Group 1', 'Group 2', 'Group 3'].map((grp) => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedGroup === grp
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-750 border border-slate-700'
              }`}
            >
              {grp === 'All'
                ? language === 'my'
                  ? 'အုပ်စုအားလုံး'
                  : 'All Groups'
                : grp === 'Group 1'
                ? t.verbGroup1
                : grp === 'Group 2'
                ? t.verbGroup2
                : t.verbGroup3}
            </button>
          ))}
        </div>
      </div>

      {/* Verbs Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
        <table className="w-full text-left text-xs sm:text-sm text-slate-300">
          <thead className="bg-slate-850 text-slate-400 text-xs uppercase font-semibold border-b border-slate-800">
            <tr>
              <th className="py-3.5 px-4">{t.verbDictionary}</th>
              <th className="py-3.5 px-4">{t.level} / {t.group}</th>
              <th className="py-3.5 px-4 text-amber-400 font-bold">{t.meaning}</th>
              <th className="py-3.5 px-4">{t.verbMasu}</th>
              <th className="py-3.5 px-4">{t.verbTe}</th>
              <th className="py-3.5 px-4">{t.verbNai}</th>
              <th className="py-3.5 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filteredVerbs.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500">
                  {language === 'my'
                    ? 'ရှာဖွေမှုနှင့် ကိုက်ညီသော ကြိယာ မတွေ့ရှိပါ'
                    : 'No verbs matched your filter criteria.'}
                </td>
              </tr>
            ) : (
              filteredVerbs.map((verb) => (
                <tr
                  key={verb.id}
                  className="hover:bg-slate-800/50 transition-colors group cursor-pointer"
                  onClick={() => setSelectedVerb(verb)}
                >
                  {/* Dictionary Form */}
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAudio(verb.dictionary);
                        }}
                        className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                        title={t.playAudio}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <div>
                        <div className="font-bold text-white text-base font-serif">
                          {verb.dictionary}
                        </div>
                        <div className="text-xs text-slate-400 font-sans">
                          {verb.reading} • <span className="font-mono text-slate-500">{verb.romaji}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Level & Group */}
                  <td className="py-3 px-4">
                    <div className="flex flex-col space-y-1">
                      <span className="inline-block w-max text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {verb.level}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {verb.group === 'Group 1' ? 'Godan (1)' : verb.group === 'Group 2' ? 'Ichidan (2)' : 'Irreg (3)'}
                      </span>
                    </div>
                  </td>

                  {/* Meaning - Reactive to Language */}
                  <td className="py-3 px-4">
                    <span className="font-semibold text-amber-300">
                      {getVerbMeaning(verb)}
                    </span>
                  </td>

                  {/* Masu Form */}
                  <td className="py-3 px-4 font-mono font-medium text-slate-200">
                    <div>{verb.conjugations.masu}</div>
                    <div className="text-[10px] text-slate-500">{verb.conjugations.masuRomaji}</div>
                  </td>

                  {/* Te Form */}
                  <td className="py-3 px-4 font-mono font-medium text-emerald-300">
                    <div>{verb.conjugations.te}</div>
                    <div className="text-[10px] text-emerald-500/70">{verb.conjugations.teRomaji}</div>
                  </td>

                  {/* Nai Form */}
                  <td className="py-3 px-4 font-mono font-medium text-rose-300">
                    <div>{verb.conjugations.nai}</div>
                    <div className="text-[10px] text-rose-500/70">{verb.conjugations.naiRomaji}</div>
                  </td>

                  {/* Detail trigger */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVerb(verb);
                      }}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    >
                      {language === 'my' ? 'ပုံစံအားလုံး' : 'All Forms'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Verb Detail Modal: All 10+ Conjugation Matrix */}
      {selectedVerb && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Close Button */}
            <button
              onClick={() => setSelectedVerb(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start justify-between pr-10">
              <div>
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-extrabold text-white font-serif tracking-wide">
                    {selectedVerb.dictionary}
                  </span>
                  <button
                    onClick={() => handleAudio(selectedVerb.dictionary)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400"
                    title={t.playAudio}
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                    {selectedVerb.level}
                  </span>
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  {selectedVerb.reading} • <span className="font-mono">{selectedVerb.romaji}</span> •{' '}
                  <span className="text-slate-300">
                    {selectedVerb.group === 'Group 1' ? t.verbGroup1 : selectedVerb.group === 'Group 2' ? t.verbGroup2 : t.verbGroup3}
                  </span>
                </div>
                <div className="text-base font-bold text-amber-300 mt-2">
                  {t.meaning}: {getVerbMeaning(selectedVerb)}
                </div>
              </div>
            </div>

            {/* Full Conjugation Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {language === 'my' ? 'ကြိယာ ပုံစံပြောင်း ဇယားအပြည့်အစုံ' : 'Complete Conjugation Matrix'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-80 overflow-y-auto pr-1">
                {[
                  { title: t.verbMasu, val: selectedVerb.conjugations.masu, romaji: selectedVerb.conjugations.masuRomaji, color: 'text-slate-100' },
                  { title: t.verbTe, val: selectedVerb.conjugations.te, romaji: selectedVerb.conjugations.teRomaji, color: 'text-emerald-300' },
                  { title: t.verbTa, val: selectedVerb.conjugations.ta, romaji: selectedVerb.conjugations.taRomaji, color: 'text-blue-300' },
                  { title: t.verbNai, val: selectedVerb.conjugations.nai, romaji: selectedVerb.conjugations.naiRomaji, color: 'text-rose-300' },
                  { title: t.verbPotential, val: selectedVerb.conjugations.potential, romaji: selectedVerb.conjugations.potentialRomaji, color: 'text-purple-300' },
                  { title: t.verbPassive, val: selectedVerb.conjugations.passive, romaji: selectedVerb.conjugations.passiveRomaji, color: 'text-amber-300' },
                  { title: t.verbCausative, val: selectedVerb.conjugations.causative, romaji: selectedVerb.conjugations.causativeRomaji, color: 'text-teal-300' },
                  { title: t.verbImperative, val: selectedVerb.conjugations.imperative, romaji: selectedVerb.conjugations.imperativeRomaji, color: 'text-red-400' },
                  { title: t.verbVolitional, val: selectedVerb.conjugations.volitional, romaji: selectedVerb.conjugations.volitionalRomaji, color: 'text-indigo-300' },
                  { title: t.verbConditionalBa, val: selectedVerb.conjugations.conditionalBa, romaji: selectedVerb.conjugations.conditionalBaRomaji, color: 'text-cyan-300' },
                  { title: t.verbConditionalTara, val: selectedVerb.conjugations.conditionalTara, romaji: selectedVerb.conjugations.conditionalTaraRomaji, color: 'text-emerald-400' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[11px] text-slate-400">{item.title}</div>
                      <div className={`text-sm font-bold font-mono ${item.color}`}>
                        {item.val}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">{item.romaji}</div>
                    </div>
                    <button
                      onClick={() => handleAudio(item.val)}
                      className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                      title={t.playAudio}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Example Sentence */}
            <div className="bg-slate-850 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  {t.example}
                </span>
                <button
                  onClick={() => handleAudio(selectedVerb.example_jp)}
                  className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-rose-300"
                  title={t.playAudio}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm font-bold text-white font-serif">
                {selectedVerb.example_jp}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {selectedVerb.example_romaji}
              </div>
              <div className="text-xs font-medium text-amber-300 pt-1 border-t border-slate-800">
                {getVerbExample(selectedVerb)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conjugation Rules Guide Modal */}
      {showRulesModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative my-8">
            <button
              onClick={() => setShowRulesModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-rose-400" />
                <span>{t.conjugationRuleTitle}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'my'
                  ? 'ဂျပန်ကြိယာ အုပ်စု ၁၊ အုပ်စု ၂၊ အုပ်စု ၃ ပုံစံပြောင်း စည်းမျဉ်းများကို လွယ်ကူစွာ လေ့လာပါ'
                  : 'Master regular and irregular Japanese verb transformation rules.'}
              </p>
            </div>

            {/* Rule Tabs */}
            <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-800">
              {Object.keys(conjugationRulesGuide).map((key) => {
                const guide = conjugationRulesGuide[key];
                return (
                  <button
                    key={key}
                    onClick={() => setActiveRuleTab(key)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                      activeRuleTab === key
                        ? 'bg-rose-600 text-white font-bold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {language === 'my' ? guide.name_my : guide.name_en}
                  </button>
                );
              })}
            </div>

            {/* Active Rule Details */}
            {conjugationRulesGuide[activeRuleTab] && (
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="bg-slate-850 p-4 rounded-xl border border-slate-800">
                  <div className="font-bold text-white text-base mb-1 font-serif">
                    {conjugationRulesGuide[activeRuleTab].name_jp}
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {language === 'my'
                      ? conjugationRulesGuide[activeRuleTab].usage_my
                      : conjugationRulesGuide[activeRuleTab].usage_en}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-800">
                    <span className="font-bold text-rose-400">{t.verbGroup1}: </span>
                    <span className="text-slate-200">
                      {language === 'my'
                        ? conjugationRulesGuide[activeRuleTab].rule_group1_my
                        : conjugationRulesGuide[activeRuleTab].rule_group1_en}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-800">
                    <span className="font-bold text-amber-400">{t.verbGroup2}: </span>
                    <span className="text-slate-200">
                      {language === 'my'
                        ? conjugationRulesGuide[activeRuleTab].rule_group2_my
                        : conjugationRulesGuide[activeRuleTab].rule_group2_en}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-850/80 border border-slate-800">
                    <span className="font-bold text-blue-400">{t.verbGroup3}: </span>
                    <span className="text-slate-200">
                      {language === 'my'
                        ? conjugationRulesGuide[activeRuleTab].rule_group3_my
                        : conjugationRulesGuide[activeRuleTab].rule_group3_en}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
