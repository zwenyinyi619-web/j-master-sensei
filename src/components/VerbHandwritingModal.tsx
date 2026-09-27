import React, { useRef, useState, useEffect } from 'react';
import {
  X,
  RotateCcw,
  Eye,
  EyeOff,
  Grid,
  Volume2,
  PenTool,
  Check,
  Sparkles,
  Palette,
  BookOpen,
} from 'lucide-react';
import { Language } from '../types/common';
import { VerbGroup } from '../types/verb';
import { playJapaneseAudio } from '../utils/audio';

interface VerbHandwritingModalProps {
  isOpen: boolean;
  onClose: () => void;
  formName: string;
  formMeaning: string;
  targetWord: string;
  targetRomaji: string;
  baseMasu: string;
  group: VerbGroup;
  ruleExplanation?: string;
  soundEnabled: boolean;
  onApplyAnswer: (text: string) => void;
  language: Language;
}

const BRUSH_COLORS = [
  { name: 'Sky', hex: '#38bdf8' },
  { name: 'Emerald', hex: '#34d399' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Amber', hex: '#fbbf24' },
  { name: 'Violet', hex: '#a855f7' },
  { name: 'White', hex: '#ffffff' },
];

const BRUSH_SIZES = [
  { label: 'သေး', size: 6 },
  { label: 'လတ်', size: 10 },
  { label: 'ကြီး', size: 16 },
  { label: 'အထူ', size: 22 },
];

export const VerbHandwritingModal: React.FC<VerbHandwritingModalProps> = ({
  isOpen,
  onClose,
  formName,
  formMeaning,
  targetWord,
  targetRomaji,
  baseMasu,
  group,
  ruleExplanation,
  soundEnabled,
  onApplyAnswer,
  language,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#38bdf8');
  const [brushSize, setBrushSize] = useState(10);
  const [showGhost, setShowGhost] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [strokeHistory, setStrokeHistory] = useState<ImageData[]>([]);

  // Initialize and clear canvas when opened or target changes
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions
    canvas.width = 420;
    canvas.height = 320;
    clearCanvas();
  }, [isOpen, targetWord]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokeHistory([]);
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
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

    // Save history for undo
    const state = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setStrokeHistory((prev) => [...prev.slice(-20), state]);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = brushColor;
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
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
    if (soundEnabled && targetWord) {
      playJapaneseAudio(targetWord);
    }
  };

  const handleApply = () => {
    onApplyAnswer(targetWord);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-500/30">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {formName}
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-rose-300 font-semibold border border-slate-700">
                  {formMeaning}
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span>ပေးထားသောဖောင်: <strong className="text-amber-300">{baseMasu}</strong></span>
                <span>•</span>
                <span className="text-slate-400">{group}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Canvas Area */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {/* Target Word Information & Audio */}
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">လေ့ကျင့်ရမည့် စာလုံး (Target Form):</div>
              <div className="flex items-baseline gap-2.5 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-rose-300 font-serif">
                  {targetWord}
                </span>
                <span className="text-xs text-slate-400 font-mono">({targetRomaji})</span>
              </div>
            </div>

            <button
              onClick={handleAudio}
              className="p-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-xl transition-all active:scale-95 flex items-center gap-1.5 text-xs font-semibold"
            >
              <Volume2 className="w-4 h-4" />
              <span>အသံဖွင့်မည်</span>
            </button>
          </div>

          {/* Interactive Drawing Canvas Container */}
          <div className="relative mx-auto w-full max-w-[420px] aspect-[4/3] bg-slate-950 rounded-2xl border-2 border-slate-800 shadow-inner overflow-hidden select-none touch-none">
            {/* 4 Quadrants Guide Grid */}
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-px border-b border-dashed border-slate-800/80" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-px border-r border-dashed border-slate-800/80" />
                </div>
                <div className="absolute inset-4 rounded-xl border border-slate-850/60 pointer-events-none" />
              </div>
            )}

            {/* Ghost Character Outline */}
            {showGhost && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <span
                  className="font-serif text-slate-700/50 tracking-wider select-none font-bold"
                  style={{
                    fontSize:
                      targetWord.length <= 2
                        ? '110px'
                        : targetWord.length <= 4
                        ? '64px'
                        : '48px',
                  }}
                >
                  {targetWord}
                </span>
              </div>
            )}

            {/* Main Interactive Drawing Canvas */}
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="absolute inset-0 z-20 w-full h-full cursor-crosshair"
            />
          </div>

          {/* Toolbar: Color picker & Size & Toggles */}
          <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Color palette */}
            <div className="flex items-center gap-1.5">
              {BRUSH_COLORS.map((col) => (
                <button
                  key={col.hex}
                  onClick={() => setBrushColor(col.hex)}
                  className={`w-6 h-6 rounded-full transition-transform ${
                    brushColor === col.hex
                      ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900'
                      : 'hover:scale-110 opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
            </div>

            {/* Brush sizes */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              {BRUSH_SIZES.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setBrushSize(s.size)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-all ${
                    brushSize === s.size
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Toggles and Undo/Clear */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowGhost(!showGhost)}
                className={`p-1.5 rounded-lg transition-colors ${
                  showGhost
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                title="မူရင်းစာလုံးရိပ်"
              >
                {showGhost ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`p-1.5 rounded-lg transition-colors ${
                  showGrid
                    ? 'bg-sky-500/20 text-sky-300'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                title="ဇယားကွက်"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={undoStroke}
                disabled={strokeHistory.length === 0}
                className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-slate-800 transition-colors"
                title="နောက်ပြန်ဆုတ်"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={clearCanvas}
                className="px-2.5 py-1 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg font-medium transition-colors"
              >
                ဘုတ်ရှင်းမည်
              </button>
            </div>
          </div>

          {/* Grammar Rule Hint */}
          {ruleExplanation && (
            <div className="bg-sky-950/30 border border-sky-800/40 p-3 rounded-xl text-xs text-sky-200 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-sky-300 flex-shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-bold text-sky-300">ဖွဲ့စည်းပုံစည်းမျဉ်း: </span>
                {ruleExplanation}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
          >
            ပိတ်မည် (Close)
          </button>

          <button
            onClick={handleApply}
            className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>ဤပုံစံကို အဖြေစာရွက်ထဲ ထည့်သွင်းမည်</span>
          </button>
        </div>
      </div>
    </div>
  );
};
