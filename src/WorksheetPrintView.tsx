import React, { useState } from 'react';
import { Printer, FileText, Download, CheckCircle2 } from 'lucide-react';
import { Language, JLPTFilter } from '../types/common';
import { kanjiData } from '../data/kanjiData';
import { verbsData } from '../data/verbsData';
import { translations } from '../i18n/translations';

interface WorksheetProps {
  language: Language;
  levelFilter: JLPTFilter;
}

export const WorksheetPrintView: React.FC<WorksheetProps> = ({
  language,
  levelFilter,
}) => {
  const [worksheetMode, setWorksheetMode] = useState<'kanji-grid' | 'verb-sheet'>('kanji-grid');
  const t = translations[language];

  const handlePrint = () => {
    window.print();
  };

  const currentKanji = kanjiData.filter(
    (k) => levelFilter === 'All' || k.jlpt === levelFilter
  );

  const currentVerbs = verbsData.filter(
    (v) => levelFilter === 'All' || v.level === levelFilter
  );

  const getMeaning = (item: any) => {
    if (!item) return '';
    if (language === 'my') return item.meaning_my;
    if (language === 'th') return item.meaning_th || item.meaning_en;
    if (language === 'vi') return item.meaning_vi || item.meaning_en;
    return item.meaning_en;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Controls (Hidden during Print) */}
      <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center space-x-2">
            <FileText className="w-5 h-5 text-rose-400" />
            <span>{t.navWorksheet}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {language === 'my'
              ? 'စာမေးပွဲအတွက် လေ့ကျင့်ရန် A4 စာရွက်ဖြင့် Print ထုတ်ယူနိုင်သော ခန်ဂျီလက်ရေးဇယားနှင့် ကြိယာအကျဉ်းချုပ်'
              : 'Printable Genkouyoushi Kanji practice sheets and verb conjugation cheat sheets.'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setWorksheetMode('kanji-grid')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                worksheetMode === 'kanji-grid' ? 'bg-rose-600 text-white' : 'text-slate-400'
              }`}
            >
              {language === 'my' ? 'ခန်ဂျီ လက်ရေးကွက်' : 'Kanji Practice Grid'}
            </button>
            <button
              onClick={() => setWorksheetMode('verb-sheet')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                worksheetMode === 'verb-sheet' ? 'bg-rose-600 text-white' : 'text-slate-400'
              }`}
            >
              {language === 'my' ? 'ကြိယာ ပုံစံဇယား' : 'Verb Cheat Sheet'}
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 text-white font-semibold text-xs shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{language === 'my' ? 'Print ထုတ်မည်' : 'Print Worksheet'}</span>
          </button>
        </div>
      </div>

      {/* Printable Area */}
      <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl print:p-0 print:shadow-none print:bg-transparent print:text-black">
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-black font-serif tracking-tight">
              J-Master Japanese JLPT {levelFilter} Study Sheet
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              {language === 'my'
                ? 'မြန်မာ-ဂျပန် ဘာသာစကား လေ့လာရေး စာရွက်စာတမ်း'
                : 'Myanmar-Japanese Language Learning Resource'}
            </p>
          </div>
          <div className="text-xs font-mono text-slate-500">
            Name: ____________________ Date: ___________
          </div>
        </div>

        {worksheetMode === 'kanji-grid' ? (
          /* Mode 1: Kanji Grid Sheets */
          <div className="space-y-6">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-700">
              Kanji Stroke Writing Practice (漢字練習帳)
            </h3>

            <div className="space-y-4">
              {currentKanji.map((k) => (
                <div key={k.id} className="border border-slate-300 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-700">
                    <div>
                      <span className="font-bold text-sm mr-2">{k.kanji}</span>
                      <span>({getMeaning(k)})</span>
                    </div>
                    <div className="font-mono text-[11px]">
                      音: {k.onyomi.join(', ') || '-'} | 訓: {k.kunyomi.join(', ') || '-'}
                    </div>
                  </div>

                  {/* 10 Cells Writing Practice Row */}
                  <div className="grid grid-cols-10 gap-1">
                    {/* First cell: Ghost/Sample character */}
                    <div className="aspect-square border border-slate-400 bg-slate-100 flex items-center justify-center font-serif text-2xl font-bold relative">
                      <div className="absolute inset-0 border-t border-l border-dashed border-slate-300 pointer-events-none" />
                      {k.kanji}
                    </div>

                    {/* Second cell: Faint trace character */}
                    <div className="aspect-square border border-slate-400 flex items-center justify-center font-serif text-2xl text-slate-300 relative">
                      <div className="absolute inset-0 border-t border-l border-dashed border-slate-200 pointer-events-none" />
                      {k.kanji}
                    </div>

                    {/* 8 Empty cells for practice */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square border border-slate-400 relative flex items-center justify-center"
                      >
                        <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-slate-200" />
                        <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-slate-200" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Mode 2: Verb Cheat Sheet */
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-700">
              Essential Verb Conjugations Quick Reference
            </h3>

            <table className="w-full text-left text-xs border border-slate-300">
              <thead className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold">
                <tr>
                  <th className="p-2 border-r border-slate-300">Dictionary</th>
                  <th className="p-2 border-r border-slate-300">{t.meaning}</th>
                  <th className="p-2 border-r border-slate-300">Group</th>
                  <th className="p-2 border-r border-slate-300">Masu</th>
                  <th className="p-2 border-r border-slate-300">Te</th>
                  <th className="p-2 border-r border-slate-300">Ta</th>
                  <th className="p-2">Nai</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {currentVerbs.map((v) => (
                  <tr key={v.id}>
                    <td className="p-2 font-bold font-serif border-r border-slate-200">
                      {v.dictionary} ({v.reading})
                    </td>
                    <td className="p-2 font-medium border-r border-slate-200">
                      {getMeaning(v)}
                    </td>
                    <td className="p-2 border-r border-slate-200">{v.group}</td>
                    <td className="p-2 font-mono border-r border-slate-200">{v.conjugations.masu}</td>
                    <td className="p-2 font-mono border-r border-slate-200">{v.conjugations.te}</td>
                    <td className="p-2 font-mono border-r border-slate-200">{v.conjugations.ta}</td>
                    <td className="p-2 font-mono">{v.conjugations.nai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
