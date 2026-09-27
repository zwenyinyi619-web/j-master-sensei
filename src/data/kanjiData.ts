import { KanjiItem } from '../types/kanji';
import { kanjiListN5 } from './kanjiListN5';
import { kanjiListN4 } from './kanjiListN4';
import { kanjiListN3 } from './kanjiListN3';

// Complete 919 Kanji Database: N5 (370), N4 (179), N3 (370)
export const kanjiData: KanjiItem[] = [
  ...kanjiListN5, // 370 N5
  ...kanjiListN4, // 179 N4
  ...kanjiListN3, // 370 N3
];
