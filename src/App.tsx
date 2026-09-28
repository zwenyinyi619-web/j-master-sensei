import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Header } from './components/Header';
import { AppTab, JLPTFilter, Language } from './types/common';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('home');
  const [language, setLanguage] = useState<Language>('my');
  const [levelFilter, setLevelFilter] = useState<JLPTFilter>('All');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (err: any) {
      setErrorMsg(err.message);
      setLoading(false);
    }
  }, []);

  if (errorMsg) {
    return (
      <div style={{ padding: '40px', color: '#f87171', background: '#0f172a', minHeight: '100vh', fontFamily: 'monospace' }}>
        <h2>Auth Error Caught:</h2>
        <p>{errorMsg}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        language={language}
        onSelectLanguage={setLanguage}
        levelFilter={levelFilter}
        onChangeLevel={setLevelFilter}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        user={user || { displayName: 'Guest User', email: 'guest@app.com' }}
      />
      <main className="p-8 text-center">
        <h1 className="text-2xl font-bold text-rose-400">App is successfully running with Header!</h1>
      </main>
    </div>
  );
}
