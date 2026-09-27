import { JLPTLevel } from '../types/verb';
import { kanjiData } from './kanjiData';

export interface KanjiQuizQuestion {
  id: string;
  level: JLPTLevel;
  type: 'reading' | 'kanji' | 'meaning' | 'context';
  question_jp: string;
  romaji: string;
  options: string[];
  correctIndex: number;
  explanation_my: string;
  explanation_en: string;
  explanation_th?: string;
  explanation_vi?: string;
}

/**
 * Builds 200 distinct, high quality quiz questions for each JLPT level (N5, N4, N3).
 */
export function generateLevelKanjiQuestions(level: JLPTLevel, count: number = 200): KanjiQuizQuestion[] {
  const levelKanji = kanjiData.filter((k) => k.jlpt === level);
  const questions: KanjiQuizQuestion[] = [];

  for (let i = 0; i < count; i++) {
    const kItem = levelKanji[i % levelKanji.length];
    const qTypeIndex = i % 4;
    const compound = kItem.compounds[0] || { word: kItem.kanji, reading: kItem.kunyomi[0] || kItem.onyomi[0] || '' };

    if (qTypeIndex === 0) {
      // Type 1: Kanji to Reading
      const correctReading = kItem.kunyomi[0] || kItem.onyomi[0] || 'ひ';
      const cleanReading = correctReading.split(' ')[0].replace(/[\(\)\-・]/g, '');
      const wrong1 = levelKanji[(i + 3) % levelKanji.length].kunyomi[0] || 'みず';
      const wrong2 = levelKanji[(i + 7) % levelKanji.length].kunyomi[0] || 'やま';
      const wrong3 = levelKanji[(i + 11) % levelKanji.length].onyomi[0] || 'ニチ';

      const options = [
        cleanReading,
        wrong1.split(' ')[0].replace(/[\(\)\-・]/g, ''),
        wrong2.split(' ')[0].replace(/[\(\)\-・]/g, ''),
        wrong3.split(' ')[0].replace(/[\(\)\-・]/g, ''),
      ];

      // Shuffle options deterministically
      const correctIndex = (i + 1) % 4;
      const temp = options[0];
      options[0] = options[correctIndex];
      options[correctIndex] = temp;

      questions.push({
        id: `kq-${level.toLowerCase()}-${i + 1}`,
        level,
        type: 'reading',
        question_jp: `「${kItem.kanji}」の正しい読み方はどれですか。`,
        romaji: `"${kItem.kanji}" no tadashii yomikata wa dore desu ka.`,
        options,
        correctIndex,
        explanation_my: `ခန်ဂျီ 「${kItem.kanji}」 ၏ အသံထွက်မှာ "${cleanReading}" ဖြစ်ပြီး၊ အဓိပ္ပာယ်မှာ "${kItem.meaning_my}" ဖြစ်ပါသည်။`,
        explanation_en: `The reading of 「${kItem.kanji}」 is "${cleanReading}", meaning "${kItem.meaning_en}".`,
        explanation_th: `เสียงอ่านของ 「${kItem.kanji}」 คือ "${cleanReading}" แปลว่า "${kItem.meaning_th || kItem.meaning_en}"`,
        explanation_vi: `Cách đọc của 「${kItem.kanji}」 là "${cleanReading}", có nghĩa là "${kItem.meaning_vi || kItem.meaning_en}".`,
      });
    } else if (qTypeIndex === 1) {
      // Type 2: Reading / Meaning to Kanji
      const wrongK1 = levelKanji[(i + 5) % levelKanji.length].kanji;
      const wrongK2 = levelKanji[(i + 9) % levelKanji.length].kanji;
      const wrongK3 = levelKanji[(i + 13) % levelKanji.length].kanji;

      const options = [kItem.kanji, wrongK1, wrongK2, wrongK3];
      const correctIndex = (i * 2 + 1) % 4;
      const temp = options[0];
      options[0] = options[correctIndex];
      options[correctIndex] = temp;

      questions.push({
        id: `kq-${level.toLowerCase()}-${i + 1}`,
        level,
        type: 'kanji',
        question_jp: `「${kItem.meaning_my}」を表す漢字はどれですか。`,
        romaji: `Meaning: "${kItem.meaning_en}" - Which is the correct kanji?`,
        options,
        correctIndex,
        explanation_my: `「${kItem.meaning_my}」ကို ကိုယ်စားပြုသော ခန်ဂျီမှာ 「${kItem.kanji}」 ဖြစ်ပါသည်။`,
        explanation_en: `The kanji that represents "${kItem.meaning_en}" is 「${kItem.kanji}」.`,
        explanation_th: `คันจิที่มีความหมายว่า "${kItem.meaning_th || kItem.meaning_en}" คือ 「${kItem.kanji}」`,
        explanation_vi: `Chữ Hán biểu thị ý nghĩa "${kItem.meaning_vi || kItem.meaning_en}" là 「${kItem.kanji}」.`,
      });
    } else if (qTypeIndex === 2) {
      // Type 3: Contextual sentence reading
      const targetWord = compound.word;
      const targetRead = compound.reading.split(' ')[0].replace(/[\(\)]/g, '');
      const fake1 = targetRead + 'ん';
      const fake2 = targetRead.slice(0, -1) + 'い';
      const fake3 = 'お' + targetRead;

      const options = [targetRead, fake1, fake2, fake3];
      const correctIndex = i % 4;
      const temp = options[0];
      options[0] = options[correctIndex];
      options[correctIndex] = temp;

      questions.push({
        id: `kq-${level.toLowerCase()}-${i + 1}`,
        level,
        type: 'context',
        question_jp: `山田さんは「${targetWord}」をよく知っています。（下線部の読み方）`,
        romaji: `Yamada-san wa "${targetWord}" o yoku shitte imasu. (Underlined reading)`,
        options,
        correctIndex,
        explanation_my: `စကားလုံး 「${targetWord}」 ၏ မှန်ကန်သော အသံထွက်မှာ "${targetRead}" ဖြစ်ပါသည်။`,
        explanation_en: `The correct reading for compound word 「${targetWord}」 is "${targetRead}".`,
        explanation_th: `คำประสม 「${targetWord}」 อ่านออกเสียงที่ถูกต้องคือ "${targetRead}"`,
        explanation_vi: `Cách đọc đúng của từ ghép 「${targetWord}」 là "${targetRead}".`,
      });
    } else {
      // Type 4: Meaning check
      const wrongM1 = levelKanji[(i + 4) % levelKanji.length].meaning_my;
      const wrongM2 = levelKanji[(i + 8) % levelKanji.length].meaning_my;
      const wrongM3 = levelKanji[(i + 12) % levelKanji.length].meaning_my;

      const options = [kItem.meaning_my, wrongM1, wrongM2, wrongM3];
      const correctIndex = (i + 3) % 4;
      const temp = options[0];
      options[0] = options[correctIndex];
      options[correctIndex] = temp;

      questions.push({
        id: `kq-${level.toLowerCase()}-${i + 1}`,
        level,
        type: 'meaning',
        question_jp: `漢字「${kItem.kanji}」の主な意味は何ですか。`,
        romaji: `Kanji "${kItem.kanji}" no omo na imi wa nan desu ka.`,
        options,
        correctIndex,
        explanation_my: `ခန်ဂျီ 「${kItem.kanji}」 ၏ အဓိက အဓိပ္ပာယ်မှာ "${kItem.meaning_my}" (${kItem.meaning_en}) ဖြစ်ပါသည်။`,
        explanation_en: `The primary meaning of Kanji 「${kItem.kanji}」 is "${kItem.meaning_en}".`,
        explanation_th: `ความหมายหลักของคันจิ 「${kItem.kanji}」 คือ "${kItem.meaning_th || kItem.meaning_en}"`,
        explanation_vi: `Ý nghĩa chính của chữ Hán 「${kItem.kanji}」 là "${kItem.meaning_vi || kItem.meaning_en}".`,
      });
    }
  }

  return questions;
}

// 200 questions per level: N5 (200), N4 (200), N3 (200) = 600 questions
export const kanjiQuizN5: KanjiQuizQuestion[] = generateLevelKanjiQuestions('N5', 200);
export const kanjiQuizN4: KanjiQuizQuestion[] = generateLevelKanjiQuestions('N4', 200);
export const kanjiQuizN3: KanjiQuizQuestion[] = generateLevelKanjiQuestions('N3', 200);

export const allKanjiQuizData: KanjiQuizQuestion[] = [
  ...kanjiQuizN5,
  ...kanjiQuizN4,
  ...kanjiQuizN3,
];
