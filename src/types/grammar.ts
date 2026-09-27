import { JLPTLevel } from './verb';

export interface GrammarExample {
  jp: string;
  romaji: string;
  my: string;
  en: string;
  th?: string;
  vi?: string;
}

export interface GrammarQuestion {
  id: string;
  level: JLPTLevel;
  patternId?: string;
  question_jp: string;
  romaji: string;
  options: string[];
  correctIndex: number;
  explanation_my: string;
  explanation_en: string;
  explanation_th?: string;
  explanation_vi?: string;
  translation_my: string;
  translation_en: string;
}

export interface GrammarItem {
  id: string;
  pattern: string;
  jlpt: JLPTLevel;
  title_my: string;
  title_en: string;
  title_th?: string;
  title_vi?: string;
  meaning_my: string;
  meaning_en: string;
  meaning_th?: string;
  meaning_vi?: string;
  explanation_my: string;
  explanation_en: string;
  explanation_th?: string;
  explanation_vi?: string;
  structure: string;
  formation: string;
  category: string;
  examples: GrammarExample[];
  practiceQuestions?: GrammarQuestion[];
}
