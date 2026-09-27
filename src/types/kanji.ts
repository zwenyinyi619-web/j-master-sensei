import { JLPTLevel } from './verb';

export interface KanjiCompound {
  word: string;
  reading: string;
  romaji: string;
  meaning_my: string;
  meaning_en: string;
  meaning_th?: string;
  meaning_vi?: string;
}

export interface KanjiItem {
  id: string;
  kanji: string;
  strokes: number;
  jlpt: JLPTLevel;
  onyomi: string[];
  kunyomi: string[];
  meaning_my: string;
  meaning_en: string;
  meaning_th?: string;
  meaning_vi?: string;
  explanation_my: string;
  explanation_en: string;
  explanation_th?: string;
  explanation_vi?: string;
  compounds: KanjiCompound[];
  radicals?: string;
  mnemonics_my?: string;
  mnemonics_en?: string;
  mnemonics_th?: string;
  mnemonics_vi?: string;
}
