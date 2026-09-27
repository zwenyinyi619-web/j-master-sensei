import React, { useRef, useState, useEffect } from 'react';
import {
  RotateCcw,
  Eye,
  EyeOff,
  Grid,
  Volume2,
  X,
  Palette,
  Check,
} from 'lucide-react';
import { KanjiItem } from '../types/kanji';
import { Language } from '../types/common';
import { translations } from '../i18n/translations';
import { playJapaneseAudio } from '../utils/audio';

interface KanjiWritingStudioProps {
  kanji: KanjiItem;
  language: Language;
  onClose?: () => void;
  soundEnabled: boolean;
}

export const KanjiWritingStudio: React.FC<KanjiWritingStudioProps> = ({
  kanji,
  language,
  onClose,
  soundEnabled,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuideGrid, setShowGuideGrid] = useState(true);
  const [showGhost, setShowGhost] = useState(true);
  const [brushSize, setBrushSize] = useState(10);
  const [brushColor, setBrushColor] = useState('#f43f5e'); // rose
  const [strokeHistory, setStrokeHistory] = useState<ImageData[]>([]);
  const t = translations[language];

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 360;
    canvas.height = 360;

    clearCanvas();
  }, [kanji]);

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

    // Save current canvas state to history
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

  const handleAudio = () => {
    if (soundEnabled) {
      playJapaneseAudio(kanji.onyomi[0] || kanji.kanji);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 max-w-xl mx-auto space-y-6 shadow-2xl relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header Info */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-4xl font-serif font-black text-amber-300">
          {kanji.kanji}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white tracking-tight">
              {language === 'my' ? kanji.meaning_my : kanji.meaning_en}
            </span>
            <button
              onClick={handleAudio}
              className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-rose-300"
              title={t.playAudio}
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {t.strokes}: <span className="text-amber-400 font-semibold">{kanji.strokes}</span> •{' '}
            <span className="font-mono text-slate-300">
              音: {kanji.onyomi.join(', ') || '-'} | 訓: {kanji.kunyomi.join(', ') || '-'}
            </span>
          </div>
        </div>
      </div>

      {/* Canvas Drawing Area with Grid & Ghost Overlay */}
      <div className="flex flex-col items-center">
        <div className="relative w-[360px] h-[360px] bg-slate-950 rounded-2xl border-2 border-slate-700 shadow-inner overflow-hidden select-none touch-none">
          {/* Guide Grid Cross Lines */}
          {showGuideGrid && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Horizontal center */}
              <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-slate-700/60" />
              {/* Vertical center */}
              <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-slate-700/60" />
              {/* Diagonals */}
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                <line x1="0" y1="0" x2="360" y2="360" stroke="#94a3b8" strokeDasharray="4" />
                <line x1="360" y1="0" x2="0" y2="360" stroke="#94a3b8" strokeDasharray="4" />
              </svg>
            </div>
          )}

          {/* Ghost Character Template */}
          {showGhost && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="text-[230px] font-serif font-light text-slate-700/50 leading-none">
                {kanji.kanji}
              </span>
            </div>
          )}

          {/* Interactive HTML5 Canvas */}
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

        {/* Canvas Controls */}
        <div className="w-[360px] mt-4 flex items-center justify-between text-xs text-slate-300">
          <div className="flex space-x-1.5">
            <button
              onClick={() => setShowGhost(!showGhost)}
              className={`p-2 rounded-xl border transition-colors flex items-center space-x-1 ${
                showGhost
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
              title={t.toggleGhostCharacter}
            >
              {showGhost ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowGuideGrid(!showGuideGrid)}
              className={`p-2 rounded-xl border transition-colors ${
                showGuideGrid
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
              title={t.toggleGuideGrid}
            >
              <Grid className="w-4 h-4" />
            </button>

            <button
              onClick={undoStroke}
              disabled={strokeHistory.length === 0}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 disabled:opacity-40 transition-colors"
              title="Undo stroke"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Color Presets */}
          <div className="flex items-center space-x-1.5">
            {['#f43f5e', '#38bdf8', '#34d399', '#f59e0b', '#ffffff'].map((color) => (
              <button
                key={color}
                onClick={() => setBrushColor(color)}
                style={{ backgroundColor: color }}
                className={`w-6 h-6 rounded-full transition-transform ${
                  brushColor === color ? 'scale-125 ring-2 ring-white shadow-md' : 'opacity-70 hover:opacity-100'
                }`}
              />
            ))}
          </div>

          <button
            onClick={clearCanvas}
            className="px-3 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-semibold transition-colors"
          >
            {t.clearPad}
          </button>
        </div>
      </div>
    </div>
  );
};
