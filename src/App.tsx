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
import { Footer } from './components/Footer';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from "./firebase";
import { LogIn, Sparkles } from 'lucide-react';

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
      setUser(currentUser);
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
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-rose-500/10 blur-2xl pointer-events-none" />
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white tracking-tight">JLPT Master Sensei</h1>
            <p className="text-slate-400 text-sm">
              {language === 'my' 
                ? 'ဂျပန်စာလေ့လာရန်နှင့် သင်၏ တိုးတက်မှုမှတ်တမ်းများကို သိမ်းဆည်းရန် Google ဖြင့် အကောင့်ဝင်ပါ။'
                : 'Sign in with Google to access all study materials and save your learning progress.'}
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <LogIn className="w-4 h-4 text-rose-600" />
            <span>{language === 'my' ? 'Google ဖြင့် ဝင်မည်' : 'Sign in with Google'}</span>
          </button>
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
      </main>

      {/* Footer */}
      <Footer language={language} onCycleLanguage={cycleLanguage} />
    </div>
  );
}
