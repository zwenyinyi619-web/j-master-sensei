export type VerbGroup = 'Group 1' | 'Group 2' | 'Group 3';
export type JLPTLevel = 'N5' | 'N4' | 'N3';

export interface VerbConjugations {
  masu: string;
  masuRomaji: string;
  te: string;
  teRomaji: string;
  ta: string;
  taRomaji: string;
  nai: string;
  naiRomaji: string;
  nakatta?: string;
  nakattaRomaji?: string;
  potential: string;
  potentialRomaji: string;
  passive: string;
  passiveRomaji: string;
  causative: string;
  causativeRomaji: string;
  causativePassive?: string;
  causativePassiveRomaji?: string;
  imperative: string;
  imperativeRomaji: string;
  prohibitive?: string;
  prohibitiveRomaji?: string;
  volitional: string;
  volitionalRomaji: string;
  conditionalBa: string;
  conditionalBaRomaji: string;
  conditionalTara: string;
  conditionalTaraRomaji: string;
}

export interface VerbItem {
  id: string;
  dictionary: string;
  kanji: string;
  reading: string;
  romaji: string;
  group: VerbGroup;
  level: JLPTLevel;
  meaning_my: string;
  meaning_en: string;
  meaning_th?: string;
  meaning_vi?: string;
  example_jp: string;
  example_romaji: string;
  example_my: string;
  example_en: string;
  example_th?: string;
  example_vi?: string;
  conjugations: VerbConjugations;
}
