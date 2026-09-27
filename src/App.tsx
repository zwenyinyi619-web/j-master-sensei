import React, { useState } from 'react';
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

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('home');
  const [language, setLanguage] = useState<Language>('my');
  const [levelFilter, setLevelFilter] = useState<JLPTFilter>('All');
  const [soundEnabled, setSoundEnabled] = useState(true);

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
