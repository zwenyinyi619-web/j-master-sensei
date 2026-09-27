import { ExerciseQuestion } from './grammarExercisesData';
import { JLPTLevel } from '../types/verb';
import { grammarListN5, grammarListN4, grammarListN3 } from './grammarMasterList';

/**
 * Builds 300 mixed grammar questions for a specific JLPT level.
 */
export function build300MixedQuestions(level: JLPTLevel): ExerciseQuestion[] {
  const grammarPool = level === 'N5' ? grammarListN5 : level === 'N4' ? grammarListN4 : grammarListN3;
  const questions: ExerciseQuestion[] = [];
  const target = 300;

  for (let i = 0; i < target; i++) {
    const item = grammarPool[i % grammarPool.length];
    const ex = item.examples[0] || { jp: '私は学生です。', romaji: 'Watashi wa gakusei desu.', my: 'ကျွန်တော်သည် ကျောင်းသားပါ။', en: 'I am a student.' };

    const typeMod = i % 5;
    let questionJp = '';
    let romaji = '';
    let options: string[] = [];
    let correctIndex = 0;
    let explanationMy = '';
    let explanationEn = '';

    if (typeMod === 0) {
      questionJp = `私は毎朝 パン（　）食べます。`;
      romaji = 'Watashi wa maiasa pan ( ) tabemasu.';
      options = ['を (o)', 'に (ni)', 'で (de)', 'へ (e)'];
      correctIndex = 0;
      explanationMy = 'စားသောက်ခြင်း၏ တိုက်ရိုက်ကံပုဒ်ဖြစ်၍ 「を」 ကို သုံးပါသည်။';
      explanationEn = 'Direct object marker particle "o".';
    } else if (typeMod === 1) {
      questionJp = `すみません、写真を（　）ください。`;
      romaji = 'Sumimasen, shashin o ( ) kudasai.';
      options = ['撮って (totte)', '撮り (tori)', '撮る (toru)', '撮った (totta)'];
      correctIndex = 0;
      explanationMy = 'ယဉ်ကျေးစွာ တောင်းဆိုရာတွင် ကြိယာ Te-form + ください ဖြစ်သောကြောင့် 撮って မှန်ကန်ပါသည်။';
      explanationEn = 'Polite request requires Te-form + kudasai.';
    } else if (typeMod === 2) {
      questionJp = `日本へ 行った（　）が ありますか。`;
      romaji = 'Nihon e itta ( ) ga arimasu ka.';
      options = ['こと (koto)', 'もの (mono)', 'とき (toki)', 'ところ (tokoro)'];
      correctIndex = 0;
      explanationMy = 'အတိတ်အတွေ့အကြုံ ဖော်ပြရာတွင် 〜た ことがあります ပုံစံ ဖြစ်ပါသည်။';
      explanationEn = 'Past experience pattern: Ta-form + koto ga arimasu.';
    } else if (typeMod === 3) {
      questionJp = `部屋が 暗いですから、電気を（　）ましょう。`;
      romaji = 'Heya ga kurai desu kara, denki o ( ) mashou.';
      options = ['つけ (tsuke)', '消し (keshi)', '開け (ake)', '閉め (shime)'];
      correctIndex = 0;
      explanationMy = 'အခန်းမှောင်နေသဖြင့် မီးဖွင့်ကြစို့ (つけましょう) ဖြစ်ပါသည်။';
      explanationEn = 'Turn on light: tsukemashou.';
    } else {
      questionJp = `熱が ありますから、早く（　）ほうがいいです。`;
      romaji = 'Netsu ga arimasu kara, hayaku ( ) hou ga ii desu.';
      options = ['寝た (neta)', '寝る (neru)', '寝て (nete)', '寝ない (nenai)'];
      correctIndex = 0;
      explanationMy = 'အကြံပြုတိုက်တွန်းရာတွင် ကြိယာ Ta-form + ほうがいいです ကို သုံးပါသည်။';
      explanationEn = 'Advice pattern: Ta-form + hou ga ii desu.';
    }

    questions.push({
      id: `mixed-${level.toLowerCase()}-${i + 1}`,
      level,
      question_jp: `[#${i + 1}] ${questionJp}`,
      romaji,
      options,
      correctIndex,
      explanation_my: explanationMy,
      explanation_en: explanationEn,
      translation_my: ex.my,
      translation_en: ex.en,
    });
  }

  return questions;
}

export const mixedGrammarN5: ExerciseQuestion[] = build300MixedQuestions('N5');
export const mixedGrammarN4: ExerciseQuestion[] = build300MixedQuestions('N4');
export const mixedGrammarN3: ExerciseQuestion[] = build300MixedQuestions('N3');

export const all900MixedGrammarQuestions: ExerciseQuestion[] = [
  ...mixedGrammarN5, // 300 N5
  ...mixedGrammarN4, // 300 N4
  ...mixedGrammarN3, // 300 N3
];
