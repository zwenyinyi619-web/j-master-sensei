import React, { useRef, useState, useEffect } from 'react';
import {
  RotateCcw,
  Eye,
  EyeOff,
  Grid,
  Volume2,
  PenTool,
  CheckCircle2,
  ChevronRight,
  Shuffle,
  Sparkles,
} from 'lucide-react';
import { JLPTFilter, Language } from '../types/common';
import { VerbItem } from '../types/verb';
import { verbsData } from '../data/verbsData';
import { translations } from '../i18n/translations';
import { playJapaneseAudio } from '../utils/audio';

interface VerbPenPracticeProps {
  language: Language;
  levelFilter: JLPTFilter;
  soundEnabled: boolean;
}

export const VerbPenPracticeView: React.FC<VerbPenPracticeProps> = ({
  language,
  levelFilter,
  soundEnabled,
}) => {
  const t = translations[language];
  const [selectedVerbId, setSelectedVerbId] = useState<string>(verbsData[0]?.id || 'taberu');
  const [selectedForm, setSelectedForm] = useState<'dictionary' | 'masu' | 'te' | 'ta' | 'nai'>('dictionary');
  const [brushColor, setBrushColor] = useState('#38bdf8'); // sky blue
  const [brushSize, setBrushSize] = useState(10);
  const [showGuideGrid, setShowGuideGrid] = useState(true);
  const [showGhost, setShowGhost] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeHistory, setStrokeHistory] = useState<ImageData[]>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const availableVerbs = verbsData.filter((v) => levelFilter === 'All' || v.level === levelFilter);
  const currentVerb: VerbItem = availableVerbs.find((v) => v.id === selectedVerbId) || availableVerbs[0] || verbsData[0];

  // Target text to draw
  const targetText =
    selectedForm === 'dictionary'
      ? currentVerb.dictionary
      : selectedForm === 'masu'
      ? currentVerb.conjugations.masu
      : selectedForm === 'te'
      ? currentVerb.conjugations.te
      : selectedForm === 'ta'
      ? currentVerb.conjugations.ta
      : currentVerb.conjugations.nai;

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 400;
    canvas.height = 360;
    clearCanvas();
  }, [currentVerb, selectedForm]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokeHistory([]);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const state = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setStrokeHistory((prev) => [...prev.slice(-15), state]);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = brushColor;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const undoStroke = () => {
    if (strokeHistory.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const lastState = strokeHistory[strokeHistory.length - 1];
    ctx.putImageData(lastState, 0, 0);
    setStrokeHistory((prev) => prev.slice(0, -1));
  };

  const handleAudio = (text: string) => {
    if (soundEnabled) {
      playJapaneseAudio(text);
    }
  };

  const getMeaning = (v: VerbItem) => {
    if (!v) return '';
    if (language === 'my') return v.meaning_my;
    if (language === 'th') return v.meaning_th || v.meaning_en;
    if (language === 'vi') return v.meaning_vi || v.meaning_en;
    return v.meaning_en;
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center space-x-2">
            <PenTool className="w-6 h-6 text-blue-400" />
            <span>
              {language === 'my'
                ? '動詞ペン練習 (ကြိယာ လက်ရေးဆွဲလေ့ကျင့်ခန်း)'
                : 'Verb Digital Pen Practice (動詞ペン練習)'}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {language === 'my'
              ? 'Digital Pen Pad ဖြင့် ကြိယာ ပုံစံပြောင်း လက်ရေးဆွဲလေ့ကျင့်ခြင်းနှင့် အသံထွက် နားထောင်ခြင်း'
              : 'Practice writing verb forms and kanji on the digital canvas with stroke guidelines.'}
          </p>
        </div>

        <button
          onClick={() => {
            const random = availableVerbs[Math.floor(Math.random() * availableVerbs.length)];
            if (random) setSelectedVerbId(random.id);
          }}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold self-start sm:self-auto cursor-pointer"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>{language === 'my' ? 'ကျပန်းရွေးမည်' : 'Random Verb'}</span>
        </button>
      </div>

      {/* Selectors Bar */}
      <div className="bg-slate-900 p-4 rounded-3xl border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Verb Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-semibold">{t.navVerbs}:</span>
            <select
              value={currentVerb.id}
              onChange={(e) => setSelectedVerbId(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs font-serif font-bold focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {availableVerbs.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.dictionary} ({v.reading}) — {getMeaning(v)}
                </option>
              ))}
            </select>
          </div>

          {/* Meaning Badge */}
          <div className="text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20">
            {getMeaning(currentVerb)}
          </div>
        </div>

        {/* Form Selector Buttons */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-800">
          {[
            { id: 'dictionary', label: t.verbDictionary, text: currentVerb.dictionary },
            { id: 'masu', label: t.verbMasu, text: currentVerb.conjugations.masu },
            { id: 'te', label: t.verbTe, text: currentVerb.conjugations.te },
            { id: 'ta', label: t.verbTa, text: currentVerb.conjugations.ta },
            { id: 'nai', label: t.verbNai, text: currentVerb.conjugations.nai },
          ].map((form) => (
            <button
              key={form.id}
              onClick={() => setSelectedForm(form.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedForm === form.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-850 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{form.label}</span>
              <span className="ml-1.5 font-serif font-bold text-slate-200">({form.text})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col items-center shadow-xl space-y-4">
        {/* Active Target Banner */}
        <div className="w-full flex items-center justify-between px-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-400">Target:</span>
            <span className="text-xl font-bold font-serif text-white">{targetText}</span>
          </div>
          <button
            onClick={() => handleAudio(targetText)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400"
            title={t.playAudio}
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* The Drawing Canvas Box */}
        <div className="relative w-[360px] sm:w-[400px] h-[360px] bg-slate-950 rounded-2xl border-2 border-slate-700 shadow-inner overflow-hidden select-none touch-none">
          {/* Guide Grid */}
          {showGuideGrid && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-slate-700/60" />
              <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-slate-700/60" />
              <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none">
                <line x1="0" y1="0" x2="400" y2="360" stroke="#94a3b8" strokeDasharray="4" />
                <line x1="400" y1="0" x2="0" y2="360" stroke="#94a3b8" strokeDasharray="4" />
              </svg>
            </div>
          )}

          {/* Ghost Outline */}
          {showGhost && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="text-8xl sm:text-9xl font-serif font-light text-slate-700/40 tracking-wider">
                {targetText}
              </span>
            </div>
          )}

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="absolute inset-0 w-full h-full cursor-crosshair z-10"
          />
        </div>

        {/* Canvas Toolbar */}
        <div className="w-[360px] sm:w-[400px] flex items-center justify-between text-xs text-slate-300">
          <div className="flex space-x-1.5">
            <button
              onClick={() => setShowGhost(!showGhost)}
              className={`p-2 rounded-xl border transition-colors ${
                showGhost ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
              title={t.toggleGhostCharacter}
            >
              {showGhost ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowGuideGrid(!showGuideGrid)}
              className={`p-2 rounded-xl border transition-colors ${
                showGuideGrid ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
              title={t.toggleGuideGrid}
            >
              <Grid className="w-4 h-4" />
            </button>

            <button
              onClick={undoStroke}
              disabled={strokeHistory.length === 0}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 disabled:opacity-40"
              title="Undo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Color Palettes */}
          <div className="flex items-center space-x-1.5">
            {['#38bdf8', '#34d399', '#f43f5e', '#fbbf24', '#ffffff'].map((c) => (
              <button
                key={c}
                onClick={() => setBrushColor(c)}
                style={{ backgroundColor: c }}
                className={`w-5 h-5 rounded-full transition-transform ${
                  brushColor === c ? 'scale-125 ring-2 ring-white shadow' : 'opacity-70'
                }`}
              />
            ))}
          </div>

          <button
            onClick={clearCanvas}
            className="px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-semibold"
          >
            {t.clearPad}
          </button>
        </div>
      </div>
    </div>
  );
};
