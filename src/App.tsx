import React, { useState, useEffect } from 'react';
import { AppTab, JLPTFilter, Language } from './types/common';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { VerbTable } from './components/VerbTable';
import { VerbThirteenFormsPractice } from './components/VerbThirteenFormsPractice';
import { KanjiView } from './components/KanjiView';
import { GrammarGuideView } from './components/GrammarGuideView';
import { AIConversation } from './components/AIConversation';
import { FlashcardView } from './components/FlashcardView';
import { GrammarPracticeView } from './components/GrammarPracticeView';
import { QuizView } from './components/QuizView';
import { WorksheetPrintView } from './components/WorksheetPrintView';
import { ProfileView } from './components/ProfileView';
import { Footer } from './components/Footer';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from "./firebase";
import { LogIn, Sparkles, UserCheck } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('home');
  const [language, setLanguage] = useState<Language>('my');
  const [levelFilter, setLevelFilter] = useState<JLPTFilter>('All');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // User Authentication State
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser((prev: any) => prev?.isGuest ? prev : currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Guest Mode ဖြင့် ဝင်ရောက်ခြင်း function
  const handleGuestLogin = () => {
    setUser({
      uid: 'guest_user',
      displayName: language === 'my' ? 'ဧည့်သည် (Guest)' : 'Guest User',
      email: 'guest@jlptmaster.app',
      photoURL: null,
      isGuest: true,
    });
  };

  const languages: Language[] = ['my', 'en', 'th', 'vi'];

  const cycleLanguage = () => {
    setLanguage((prev) => {
      const nextIdx = (languages.indexOf(prev) + 1) % languages.length;
      return languages[nextIdx];
    });
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  // Loading state ချိန်ခါပြသရန်
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  // အကယ်၍ Log in မဝင်ရသေးပါက ပြသရန် Login Wall
  if (!user) {
    const languageOptions: { id: Language; label: string; flag: string }[] = [
      { id: 'my', label: 'မြန်မာ', flag: '🇲🇲' },
      { id: 'en', label: 'English', flag: '🇬🇧' },
      { id: 'th', label: 'ไทย', flag: '🇹🇭' },
      { id: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    ];

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background Decorative Glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* Top-Right Language Switcher */}
        <div className="absolute top-6 right-6 z-20 flex items-center bg-slate-900/90 border border-slate-800 p-1 rounded-2xl shadow-xl backdrop-blur-md">
          {languageOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setLanguage(opt.id)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                language === opt.id
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>{opt.flag}</span>
              <span className="hidden sm:inline">{opt.label}</span>
            </button>
          ))}
        </div>

        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 text-center space-y-8 shadow-2xl relative z-10">
          
          {/* Logo & Brand */}
          <div className="space-y-3">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-950/50 mx-auto transform hover:scale-105 transition-transform duration-300">
              <span className="text-white font-black text-3xl font-serif">日</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">JLPT Master Sensei</h1>
              <p className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 inline-block mt-2 border border-rose-500/20">
                JLPT N5-N3 Japanese Learning
              </p>
            </div>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed">
            {language === 'my' 
              ? 'ဂျပန်စာလေ့လာရန်နှင့် သင်၏ တိုးတက်မှုမှတ်တမ်းများကို လုံခြုံစွာ သိမ်းဆည်းရန် အကောင့်ဝင်ပါ။'
              : language === 'th'
              ? 'เข้าสู่ระบบเพื่อเข้าถึงสื่อการเรียนรู้ทั้งหมดและบันทึกความคืบหน้าของคุณ'
              : language === 'vi'
              ? 'Đăng nhập để truy cập tất cả tài liệu học tập và lưu tiến trình của bạn.'
              : 'Sign in to access all study materials and save your learning progress securely.'}
          </p>

          {/* Login Buttons */}
          <div className="space-y-3.5 w-full">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center space-x-3 py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-xl transition-all hover:scale-[1.02] active:scale-95 cursor-pointer border border-slate-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.1.74-2.5 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.18v3.15C3.17 21.32 7.23 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.74-.38-1.54-.38-2.37s.13-1.63.38-2.37V6.38H1.18C.43 7.88 0 9.58 0 11.4s.43 3.52 1.18 5.02l4.1-2.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.18 6.38l4.1 3.15c.95-2.83 3.6-4.78 6.72-4.78z"/>
              </svg>
              <span>
                {language === 'my' 
                  ? 'Google ဖြင့် ဆက်လုပ်မည်' 
                  : language === 'th' 
                  ? 'ดำเนินการต่อด้วย Google' 
                  : language === 'vi' 
                  ? 'Tiếp tục với Google' 
                  : 'Continue with Google'}
              </span>
            </button>

            {/* Guest Mode Button */}
            <button
              onClick={handleGuestLogin}
              className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer border border-slate-700"
            >
              <UserCheck className="w-4 h-4 text-rose-400" />
              <span>
                {language === 'my' ? 'ဧည့်သည် (Guest) အနေဖြင့် ဝင်မည်' : 'Continue as Guest'}
              </span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 pt-2">
            Secure authentication powered by Firebase
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* App Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        language={language}
        onSelectLanguage={setLanguage}
        levelFilter={levelFilter}
        onChangeLevel={setLevelFilter}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        user={user}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentTab === 'home' && (
          <HomeView
            language={language}
            levelFilter={levelFilter}
            onNavigate={setCurrentTab}
            soundEnabled={soundEnabled}
          />
        )}

        {currentTab === 'verbs' && (
          <VerbTable
            language={language}
            levelFilter={levelFilter}
            soundEnabled={soundEnabled}
          />
        )}

        {currentTab === 'verb-forms' && (
          <VerbThirteenFormsPractice
            language={language}
            levelFilter={levelFilter}
            soundEnabled={soundEnabled}
          />
        )}

        {currentTab === 'kanji' && (
          <KanjiView
            language={language}
            levelFilter={levelFilter}
            soundEnabled={soundEnabled}
          />
        )}

        {currentTab === 'grammar' && (
          <GrammarGuideView
            language={language}
            levelFilter={levelFilter}
            soundEnabled={soundEnabled}
          />
        )}

        {currentTab === 'kaiwa' && (
          <AIConversation
            language={language}
            levelFilter={levelFilter}
            soundEnabled={soundEnabled}
          />
        )}

        {currentTab === 'flashcards' && (
          <FlashcardView
            language={language}
            levelFilter={levelFilter}
            soundEnabled={soundEnabled}
          />
        )}

        {currentTab === 'practice' && (
          <GrammarPracticeView
            language={language}
            levelFilter={levelFilter}
            soundEnabled={soundEnabled}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizView
            language={language}
            levelFilter={levelFilter}
            soundEnabled={soundEnabled}
          />
        )}

        {currentTab === 'worksheet' && (
          <WorksheetPrintView
            language={language}
            levelFilter={levelFilter}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            user={user}
            language={language}
            onLogout={() => setUser(null)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer language={language} onCycleLanguage={cycleLanguage} />
    </div>
  );
}
