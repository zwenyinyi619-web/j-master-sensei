import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  Languages,
  Sparkles,
  PenTool,
  HelpCircle,
  Menu,
  X,
  Volume2,
  VolumeX,
  Layers,
  GraduationCap,
  MessageSquare,
  FileText,
  ChevronDown,
  Check,
  User,
} from 'lucide-react';
import { AppTab, JLPTFilter, Language } from '../types/common';
import { translations } from '../i18n/translations';

interface HeaderProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  levelFilter: JLPTFilter;
  onChangeLevel: (level: JLPTFilter) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  user?: any;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  language,
  onSelectLanguage,
  levelFilter,
  onChangeLevel,
  soundEnabled,
  onToggleSound,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);
  const t = translations[language];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageOptions: { id: Language; label: string; flag: string }[] = [
    { id: 'my', label: 'မြန်မာ', flag: '🇲🇲' },
    { id: 'en', label: 'English', flag: '🇬🇧' },
    { id: 'th', label: 'ไทย', flag: '🇹🇭' },
    { id: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  ];

  const currentLangObj = languageOptions.find((l) => l.id === language) || languageOptions[0];

  const navItems: { id: AppTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t.navHome, icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'verbs', label: t.navVerbs, icon: <Layers className="w-4 h-4" /> },
    { id: 'verb-forms', label: (t as any).navVerbForms || '၁၃ မျိုး လေ့ကျင့်ခန်း', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
    { id: 'kanji', label: t.navKanji, icon: <PenTool className="w-4 h-4" /> },
    { id: 'grammar', label: t.navGrammar, icon: <BookOpen className="w-4 h-4" /> },
    { id: 'kaiwa', label: t.navKaiwa, icon: <MessageSquare className="w-4 h-4 text-emerald-400" /> },
    { id: 'flashcards', label: t.navFlashcards, icon: <Sparkles className="w-4 h-4" /> },
    { id: 'practice', label: t.navPractice, icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'quiz', label: t.navQuiz, icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'worksheet', label: t.navWorksheet, icon: <FileText className="w-4 h-4" /> },
    { id: 'profile', label: language === 'my' ? 'ကိုယ်ရေးအချက်အလက်' : 'Profile', icon: <User className="w-4 h-4 text-rose-400" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-1">
          <div
            className="flex items-center space-x-2 cursor-pointer select-none group min-w-0"
            onClick={() => onSelectTab('home')}
          >
            <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-900/30 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-base font-serif">日</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-sm sm:text-base tracking-tight truncate bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-amber-200">
                  {t.appName}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 truncate">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-3">
            {/* Level Filter - Responsive (Always visible now with compact sizing) */}
            <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
              {(['All', 'N5', 'N4', 'N3'] as JLPTFilter[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => onChangeLevel(lvl)}
                  className={`px-2 py-1 text-[11px] sm:text-xs font-semibold rounded transition-all ${
                    levelFilter === lvl
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                  }`}
                >
                  {lvl === 'All' ? t.levelAll : lvl}
                </button>
              ))}
            </div>

            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1 px-2 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all shadow-sm cursor-pointer"
              >
                <Languages className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentLangObj.flag}</span>
                <ChevronDown className="w-3 h-3 text-amber-400/80" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl py-1.5 z-50">
                  {languageOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        onSelectLanguage(opt.id);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                        language === opt.id
                          ? 'bg-amber-500/15 text-amber-300 font-bold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <span>{opt.flag}</span>
                        <span>{opt.label}</span>
                      </span>
                      {language === opt.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={onToggleSound}
              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                soundEnabled
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-red-950/40 border-red-800/50 text-red-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:block border-t border-slate-800/80 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 overflow-x-auto py-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                currentTab === item.id
                  ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-md shadow-rose-900/20 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-5 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg text-xs text-left font-medium transition-colors ${
                  currentTab === item.id
                    ? 'bg-rose-600 text-white font-semibold'
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
