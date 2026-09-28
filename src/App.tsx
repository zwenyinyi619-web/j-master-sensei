import { useState, useEffect } from 'react';
import { auth } from './firebase';

export default function App() {
  const [status, setStatus] = useState('Checking Firebase...');

  useEffect(() => {
    try {
      if (auth) {
        setStatus('Firebase Auth is loaded successfully!');
      } else {
        setStatus('Firebase Auth is missing!');
      }
    } catch (e: any) {
      setStatus('Error: ' + e.message);
    }
  }, []);

  return (
    <div style={{ padding: '50px', background: '#0f172a', color: 'white', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Firebase Status Check</h1>
      <p style={{ fontSize: '18px', color: '#38bdf8' }}>{status}</p>
    </div>
  );
}
