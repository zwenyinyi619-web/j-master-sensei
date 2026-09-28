import React, { useState, useEffect } from 'react';
import { AppTab, JLPTFilter, Language } from './types/common';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { VerbTable } from './components/VerbTable';
import { GrammarGuideView } from './components/GrammarGuideView';
import { KanjiView } from './components/KanjiView';
import { QuizView } from './components/QuizView';
import { AIConversation } from './components/AIConversation';
import { ProfileView } from './components/ProfileView';
import { Footer } from './components/Footer';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('home');
  const [language, setLanguage] = useState<Language>('my');
  const [levelFilter, setLevelFilter] = useState<JLPTFilter>('All');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        language={language}
        onSelectLanguage={setLanguage}
        levelFilter={levelFilter}
        onChangeLevel={setLevelFilter}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        user={user || { displayName: 'Guest User' }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12">
        {currentTab === 'home' && (
          <HomeView
            language={language}
            levelFilter={levelFilter}
            onNavigate={setCurrentTab}
            soundEnabled={soundEnabled}
          />
        )}
        {currentTab === 'verbs' && <VerbTable language={language} levelFilter={levelFilter} soundEnabled={soundEnabled} />}
        {currentTab === 'grammar' && <GrammarGuideView language={language} levelFilter={levelFilter} soundEnabled={soundEnabled} />}
        {currentTab === 'kanji' && <KanjiView language={language} levelFilter={levelFilter} soundEnabled={soundEnabled} />}
        {currentTab === 'quiz' && <QuizView language={language} levelFilter={levelFilter} soundEnabled={soundEnabled} />}
        {currentTab === 'chat' && <AIConversation language={language} user={user} />}
        {currentTab === 'settings' && <ProfileView language={language} user={user} />}
      </main>

      <Footer language={language} onCycleLanguage={() => setLanguage(language === 'my' ? 'en' : 'my')} />
    </div>
  );
}
