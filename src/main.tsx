import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error("Root element not found in index.html");

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error: any) {
  console.error("Critical Render Error:", error);
  document.body.innerHTML = `
    <div style="padding: 30px; background: #0f172a; color: #f87171; font-family: monospace; height: 100vh;">
      <h2 style="font-size: 20px; font-weight: bold;">Runtime Crash Detected:</h2>
      <pre style="margin-top: 15px; background: #1e293b; padding: 15px; border-radius: 8px; overflow: auto;">${error?.message || error}</pre>
    </div>
  `;
}
