import { ExerciseQuestion } from './grammarExercisesData';
import { JLPTLevel } from '../types/verb';
import { grammarListN5, grammarListN4, grammarListN3 } from './grammarMasterList';

/**
 * Builds mixed grammar questions dynamically from the actual grammar list.
 */
function buildDynamicMixedQuestions(level: JLPTLevel): ExerciseQuestion[] {
  const grammarPool = level === 'N5' ? grammarListN5 : level === 'N4' ? grammarListN4 : grammarListN3;
  const questions: ExerciseQuestion[] = [];

  // grammarPool ထဲမှာရှိတဲ့ သဒ္ဒါတစ်ခုချင်းစီအတွက် မေးခွန်း ၁ ခုစီ (သို့မဟုတ် လိုသလောက်) ထုတ်ပေးခြင်း
  grammarPool.forEach((item, index) => {
    // ဥပမာဝါကျ ရှိရင် ယူမယ်၊ မရှိရင် Default သုံးမယ်
    const ex = item.examples[0] || { 
      jp: '私は学生です。', 
      romaji: 'Watashi wa gakusei desu.', 
      my: 'ကျွန်တော်သည် ကျောင်းသားပါ။', 
      en: 'I am a student.' 
    };

    // ဂျပန်စာ ဥပမာဝါကျထဲက သဒ္ဒါပုံစံ (pattern) နေရာကို (　) နဲ့ အစားထိုးခြင်း (သို့မဟုတ် ဖြည့်စွက်ခြင်း)
    // ဤနေရာတွင် သဒ္ဒါ pattern ကို အခြေခံ၍ မေးခွန်းတည်ဆောက်နိုင်ပါသည်
    const targetPattern = item.pattern;
    const questionJp = ex.jp.includes(targetPattern) 
      ? ex.jp.replace(targetPattern, '（　）') 
      : `${targetPattern} を使う文： ${ex.jp}（　）`;

    const romaji = ex.romaji;
    
    // မှန်ကန်သော ဖြေဆိုရမည့် options များကို ဖန်တီးခြင်း
    // (တကယ်တမ်းတွင် Distractors များ ထည့်ရန် လိုအပ်ပါမည်)
    const options = [
      `${targetPattern}`, 
      '違う文法A', 
      '違う文法B', 
      '違う文法C'
    ];
    // options များကို ရောနှောခြင်း သို့မဟုတ် correctIndex ကို သတ်မှတ်ခြင်း
    const correctIndex = 0; 

    questions.push({
      id: `mixed-${level.toLowerCase()}-${index + 1}`,
      level,
      question_jp: `[#${index + 1}] ${questionJp}`,
      romaji,
      options,
      correctIndex,
      explanation_my: `「${targetPattern}」၏ အသုံးပြုပုံ: ${item.meaning}`,
      explanation_en: `Usage of "${targetPattern}": ${item.meaning}`,
      translation_my: ex.my,
      translation_en: ex.en,
    });
  });

  return questions;
}

export const mixedGrammarN5: ExerciseQuestion[] = buildDynamicMixedQuestions('N5');
export const mixedGrammarN4: ExerciseQuestion[] = buildDynamicMixedQuestions('N4');
export const mixedGrammarN3: ExerciseQuestion[] = buildDynamicMixedQuestions('N3');

export const all900MixedGrammarQuestions: ExerciseQuestion[] = [
  ...mixedGrammarN5,
  ...mixedGrammarN4,
  ...mixedGrammarN3,
];
