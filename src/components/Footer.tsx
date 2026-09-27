import React from 'react';
import { Languages, Heart, ShieldCheck } from 'lucide-react';
import { Language } from '../types/common';
import { translations } from '../i18n/translations';

interface FooterProps {
  language: Language;
  onCycleLanguage: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onCycleLanguage }) => {
  const t = translations[language];

  const langLabels: Record<Language, string> = {
    my: '🇲🇲 မြန်မာ',
    en: '🇬🇧 English',
    th: '🇹🇭 ไทย',
    vi: '🇻🇳 Tiếng Việt',
  };

  const copyrightText: Record<Language, string> = {
    my: 'မူပိုင်ခွင့် © ၂၀၂၆ Zwe Nyi Nyi Naing။ မူပိုင်ခွင့်များ အားလုံး ရယူထားပြီး ဖြစ်ပါသည်။',
    en: 'Copyright © 2026 Zwe Nyi Nyi Naing. All Rights Reserved.',
    th: 'สงวนลิขสิทธิ์ © 2026 Zwe Nyi Nyi Naing. สงวนลิขสิทธิ์ทุกประการ',
    vi: 'Bản quyền © 2026 Zwe Nyi Nyi Naing. Tất cả các quyền được bảo lưu.',
  };

  return (
    <footer className="border-t border-slate-800 bg-[#070b14] text-slate-400 mt-16 print:hidden">
      {/* Top Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-900/80">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-bold text-base font-serif shadow-lg shadow-rose-900/30">
            日
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-tight flex items-center space-x-2">
              <span>{t.appName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">
                JLPT N5-N3
              </span>
            </div>
            <div className="text-xs text-slate-500">{t.appSubtitle}</div>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <span className="flex items-center space-x-1.5 text-slate-400">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Multilingual JLPT Learners</span>
          </span>

          <button
            onClick={onCycleLanguage}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer text-xs font-semibold"
            title={t.switchLanguage}
          >
            <Languages className="w-3.5 h-3.5 text-amber-400" />
            <span>{langLabels[language]}</span>
          </button>
        </div>
      </div>

      {/* Main Bottom Copyright Section */}
      <div className="max-w-4xl mx-auto px-4 py-8 text-center space-y-3">
        <div className="text-sm sm:text-base font-semibold text-slate-200 tracking-wide">
          Japanese Verb & Grammar Practice — JLPT N5, N4, N3 Suite
        </div>

        <div className="text-xs text-slate-400 flex flex-wrap items-center justify-center gap-3 font-medium">
          <span>動詞 550+ 語</span>
          <span className="text-slate-700">•</span>
          <span>N5-N3 漢字 Flashcards</span>
          <span className="text-slate-700">•</span>
          <span>N5-N3 文法練習</span>
          <span className="text-slate-700">•</span>
          <span>AI Kaiwa Sensei</span>
        </div>

        {/* Explicit Copyright Notice Requested by User */}
        <div className="pt-3 border-t border-slate-900/60 flex flex-col items-center justify-center space-y-1">
          <div className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-800/80 shadow-inner">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Copyright © 2026 Zwe Nyi Nyi Naing. All Rights Reserved.</span>
          </div>
          <div className="text-[11px] text-slate-500 italic pt-1">
            {copyrightText[language]}
          </div>
        </div>
      </div>
    </footer>
  );
};
