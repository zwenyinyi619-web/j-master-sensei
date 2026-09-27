import { JLPTLevel } from '../types/verb';
import { all900MixedGrammarQuestions } from './grammarMixedExercises';

export interface ExerciseQuestion {
  id: string;
  level: JLPTLevel;
  question_jp: string;
  romaji: string;
  options: string[];
  correctIndex: number;
  explanation_my: string;
  explanation_en: string;
  translation_my: string;
  translation_en: string;
}

// 900 Mixed Grammar Questions: N5 (300), N4 (300), N3 (300)
export const grammarExercisesData: ExerciseQuestion[] = all900MixedGrammarQuestions;
