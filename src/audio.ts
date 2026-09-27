/**
 * Japanese Speech Synthesis Utility
 */
export function playJapaneseAudio(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis is not supported on this browser');
    return;
  }

  try {
    window.speechSynthesis.cancel();

    // Clean text: remove furigana brackets if any (e.g. 食べる[たべる] -> 食べる)
    const cleanText = text.replace(/\[.*?\]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.88; // slightly slower for clear learning
    utterance.pitch = 1.0;

    // Try finding Japanese voice
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(
      (v) => v.lang.startsWith('ja') || v.name.toLowerCase().includes('japan')
    );
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('Audio playback error:', err);
    if (onEnd) onEnd();
  }
}

export function stopAudio() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
