import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
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

// Error Boundary to catch render crashes and display the exact error on screen
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '30px', background: '#0f172a', color: '#f87171', fontFamily: 'monospace', minHeight: '100vh' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>⚠️ Component Crash Detected:</h2>
          <pre style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', overflow: 'auto', fontSize: '14px' }}>
            {this.state.error && this.state.error.toString()}
          </pre>
          <pre style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', overflow: 'auto', fontSize: '12px', marginTop: '10px', color: '#cbd5e1' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
        </div>
      );
    }

    return this.renderChildren();
  }

  private renderChildren() {
    return this.props.children;
  }
}

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
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}
