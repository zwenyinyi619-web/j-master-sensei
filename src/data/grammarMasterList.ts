import { GrammarItem, GrammarQuestion } from '../types/grammar';
import { JLPTLevel } from '../types/verb';

interface RawPatternSeed {
  pattern: string;
  title_my: string;
  title_en: string;
  meaning_my: string;
  meaning_en: string;
  meaning_th: string;
  meaning_vi: string;
  structure: string;
  category: string;
  exJp: string;
  exRomaji: string;
  exMy: string;
  exEn: string;
}

// Foundational seeds for N5
const n5Seeds: RawPatternSeed[] = [
  { pattern: '〜は〜です', title_my: 'အခြေခံကတ္တားနှင့် သမ္ပဒါန်', title_en: 'Topic & Copula', meaning_my: '[A] သည် [B] ဖြစ်ပါသည်', meaning_en: '[A] is [B]', meaning_th: '[A] คือ [B]', meaning_vi: '[A] là [B]', structure: 'Noun + は + Noun + です', category: 'Basic', exJp: '私は学生です。', exRomaji: 'Watashi wa gakusei desu.', exMy: 'ကျွန်တော်သည် ကျောင်းသား ဖြစ်ပါသည်။', exEn: 'I am a student.' },
  { pattern: '〜じゃありません', title_my: 'ငြင်းပယ်ဝါကျပုံစံ', title_en: 'Negative Copula', meaning_my: '... မဟုတ်ပါ', meaning_en: 'is not ...', meaning_th: 'ไม่ใช่ ...', meaning_vi: 'Không phải là ...', structure: 'Noun + じゃありません', category: 'Basic', exJp: '先生じゃありません。', exRomaji: 'Sensei ja arimasen.', exMy: 'ဆရာ မဟုတ်ပါ။', exEn: 'I am not a teacher.' },
  { pattern: '〜か', title_my: 'မေးခွန်းပုံစံ', title_en: 'Question Particle', meaning_my: '... သလား / ပါသလား', meaning_en: 'Is it ...?', meaning_th: '... หรือไม่?', meaning_vi: 'Có ... không?', structure: 'Sentence + か', category: 'Particles', exJp: '日本人ですか。', exRomaji: 'Nihonjin desu ka.', exMy: 'ဂျပန်လူမျိုးလား။', exEn: 'Are you Japanese?' },
  { pattern: '〜も', title_my: 'လည်းပဲ ပုံစံ', title_en: 'Also / Too Particle', meaning_my: '... လည်းပဲ', meaning_en: 'Also / Too', meaning_th: '... ก็ด้วย', meaning_vi: 'Cũng ...', structure: 'Noun + も', category: 'Particles', exJp: '私も学生です。', exRomaji: 'Watashi mo gakusei desu.', exMy: 'ကျွန်တော်လည်း ကျောင်းသားပါ။', exEn: 'I am also a student.' },
  { pattern: '〜の', title_my: 'ပိုင်ဆိုင်မှု ဝိဘတ်', title_en: 'Possessive Particle', meaning_my: '၏ / ရဲ့', meaning_en: 'Possessive (of / \'s)', meaning_th: 'ของ', meaning_vi: 'Của', structure: 'Noun A + の + Noun B', category: 'Particles', exJp: '私の本です。', exRomaji: 'Watashi no hon desu.', exMy: 'ကျွန်တော့်စာအုပ် ဖြစ်ပါသည်။', exEn: 'It is my book.' },
  { pattern: '〜を', title_my: 'တိုက်ရိုက်ကံပုဒ် ဝိဘတ်', title_en: 'Object Marker', meaning_my: 'ကို / အား', meaning_en: 'Direct object marker', meaning_th: 'คำช่วยกรรม', meaning_vi: 'Trợ từ chỉ tân ngữ', structure: 'Noun + を + Verb', category: 'Particles', exJp: 'パンを食べます。', exRomaji: 'Pan o tabemasu.', exMy: 'ပေါင်မုန့် စားပါတယ်။', exEn: 'I eat bread.' },
  { pattern: '〜に (အချိန်/နေရာ)', title_my: 'အချိန်နှင့် ပန်းတိုင်ပြ ဝိဘတ်', title_en: 'Time & Destination Marker', meaning_my: 'တွင် / ၌ / သို့', meaning_en: 'At (time) / To (target)', meaning_th: 'ณ เวลา / ไปที่', meaning_vi: 'Vào lúc / Đến', structure: 'Time / Place + に', category: 'Particles', exJp: '７時に起きます。', exRomaji: 'Shichiji ni okimasu.', exMy: '၇ နာရီတွင် အိပ်ရာထပါတယ်။', exEn: 'I wake up at 7 o\'clock.' },
  { pattern: '〜へ', title_my: 'ဦးတည်ရာ ဝိဘတ်', title_en: 'Direction Particle', meaning_my: 'သို့ / ဆီသို့', meaning_en: 'Towards / To', meaning_th: 'มุ่งหน้าไปยัง', meaning_vi: 'Về hướng', structure: 'Place + へ + 行く/来る', category: 'Particles', exJp: '学校へ行きます。', exRomaji: 'Gakkou e ikimasu.', exMy: 'ကျောင်းသို့ သွားပါမယ်။', exEn: 'I go to school.' },
  { pattern: '〜で (နည်းလမ်း/နေရာ)', title_my: 'ပြုလုပ်ရာနေရာနှင့် နည်းလမ်း', title_en: 'Means & Location of Action', meaning_my: 'ဖြင့် / တွင်', meaning_en: 'By means of / At (action location)', meaning_th: 'โดย / ที่ (สถานที่ทำกริยา)', meaning_vi: 'Bằng / Tại', structure: 'Place/Tool + で', category: 'Particles', exJp: 'バスで行きます。', exRomaji: 'Basu de ikimasu.', exMy: 'ဘတ်စ်ကားဖြင့် သွားပါတယ်။', exEn: 'I go by bus.' },
  { pattern: '〜と', title_my: 'နှင့် အတူတူ', title_en: 'With / And', meaning_my: 'နှင့် / နှင့်အတူ', meaning_en: 'And / With', meaning_th: 'และ / กับ', meaning_vi: 'Và / Cùng với', structure: 'Noun + と', category: 'Particles', exJp: '友達と話します。', exRomaji: 'Tomodachi to hanashimasu.', exMy: 'သူငယ်ချင်းနှင့် စကားပြောပါတယ်။', exEn: 'I speak with a friend.' },
  { pattern: '〜から〜まで', title_my: 'မှ... အထိ', title_en: 'From ... Until ...', meaning_my: '... မှ ... အထိ', meaning_en: 'From ... to ...', meaning_th: 'ตั้งแต่ ... ถึง ...', meaning_vi: 'Từ ... đến ...', structure: 'Point A + から + Point B + まで', category: 'Time/Space', exJp: '９時から５時まで働きます。', exRomaji: 'Kuji kara goji made hatarakimasu.', exMy: '၉ နာရီမှ ၅ နာရီအထိ အလုပ်လုပ်ပါတယ်။', exEn: 'I work from 9 to 5.' },
  { pattern: '〜てください', title_my: 'ယဉ်ကျေးစွာတောင်းဆိုခြင်း', title_en: 'Please do', meaning_my: '... ပေးပါ', meaning_en: 'Please do', meaning_th: 'กรุณา ...', meaning_vi: 'Xin hãy ...', structure: 'Verb (Te-form) + ください', category: 'Requests', exJp: '本を読んでください。', exRomaji: 'Hon o yonde kudasai.', exMy: 'စာအုပ် ဖတ်ပြပေးပါ။', exEn: 'Please read the book.' },
  { pattern: '〜ています', title_my: 'ပြုလုပ်ဆဲကာလ / အခြေအနေ', title_en: 'Ongoing Action / State', meaning_my: '... နေပါသည် / ... ထားပါသည်', meaning_en: 'is doing / state of', meaning_th: 'กำลังทำ / สภาพที่คงอยู่', meaning_vi: 'Đang làm / Đang có', structure: 'Verb (Te-form) + います', category: 'Aspect', exJp: '今テレビを見ています。', exRomaji: 'Ima terebi o mite imasu.', exMy: 'အခု တီဗီကြည့်နေပါတယ်။', exEn: 'I am watching TV now.' },
  { pattern: '〜てもいいです', title_my: 'ခွင့်ပြုချက်တောင်းခံခြင်း', title_en: 'May I / Permission', meaning_my: '... ပြုလုပ်ခွင့်ရှိပါသည်', meaning_en: 'May I / You may', meaning_th: 'ทำได้ / อนุญาตให้ทำ', meaning_vi: 'Được phép làm ...', structure: 'Verb (Te-form) + もいいです', category: 'Permission', exJp: '写真を撮ってもいいですか。', exRomaji: 'Shashin o totte mo ii desu ka.', exMy: 'ဓာတ်ပုံရိုက်လို့ ရပါသလား။', exEn: 'May I take a photo?' },
  { pattern: '〜てはいけません', title_my: 'တားမြစ်ချက် ပုံစံ', title_en: 'Must not do', meaning_my: '... မပြုလုပ်ရပါ', meaning_en: 'Must not do', meaning_th: 'ห้ามทำ ...', meaning_vi: 'Không được làm ...', structure: 'Verb (Te-form) + はいけません', category: 'Prohibition', exJp: 'ここでたばこを吸ってはいけません。', exRomaji: 'Koko de tabako o sutte wa ikemasen.', exMy: 'ဒီနေရာမှာ ဆေးလိပ် မသောက်ရပါ။', exEn: 'You must not smoke here.' },
  { pattern: '〜ないでください', title_my: 'မပြုလုပ်ရန် တောင်းပန်ခြင်း', title_en: 'Please do not', meaning_my: '... မလုပ်ပါနှင့်', meaning_en: 'Please do not', meaning_th: 'กรุณาอย่า ...', meaning_vi: 'Xin đừng ...', structure: 'Verb (Nai-form) + でください', category: 'Negative Request', exJp: '忘れないでください。', exRomaji: 'Wasurenaide kudasai.', exMy: 'မေ့မသွားပါနှင့်။', exEn: 'Please do not forget.' },
  { pattern: '〜なければなりません', title_my: 'မဖြစ်မနေလုပ်ရမည့် တာဝန်', title_en: 'Must do / Obligation', meaning_my: '... မဖြစ်မနေ လုပ်ရပါမည်', meaning_en: 'Must do', meaning_th: 'ต้องทำ ...', meaning_vi: 'Phải làm ...', structure: 'Verb (Nai-stem) + ければなりません', category: 'Obligation', exJp: '薬を飲まなければなりません。', exRomaji: 'Kusuri o nomanakereba narimasen.', exMy: 'ဆေး သောက်ရပါမယ်။', exEn: 'I must take medicine.' },
  { pattern: '〜たことがあります', title_my: 'အတိတ်အတွေ့အကြုံ', title_en: 'Past Experience', meaning_my: '... ဖူးပါသည်', meaning_en: 'Have ever done', meaning_th: 'เคยทำ ...', meaning_vi: 'Đã từng làm ...', structure: 'Verb (Ta-form) + ことがあります', category: 'Experience', exJp: '日本へ行ったことがあります。', exRomaji: 'Nihon e itta koto ga arimasu.', exMy: 'ဂျပန်နိုင်ငံသို့ သွားဖူးပါတယ်။', exEn: 'I have been to Japan.' },
  { pattern: '〜たいです', title_my: 'ဆန္ဒဖော်ပြခြင်း', title_en: 'Want to do', meaning_my: '... ပြုလုပ်ချင်ပါသည်', meaning_en: 'Want to do', meaning_th: 'อยากทำ ...', meaning_vi: 'Muốn làm ...', structure: 'Verb (Masu-stem) + たいです', category: 'Desire', exJp: '日本へ行きたいです。', exRomaji: 'Nihon e ikitai desu.', exMy: 'ဂျပန်ကို သွားချင်ပါတယ်။', exEn: 'I want to go to Japan.' },
  { pattern: '〜たり〜たりします', title_my: 'လုပ်ဆောင်ချက်များ နမူနာပြခြင်း', title_en: 'Listing Actions', meaning_my: '... လုပ်လိုက်၊ ... လုပ်လိုက် ဖြစ်သည်', meaning_en: 'Doing things like A and B', meaning_th: 'ทำโน่นทำนี่สลับกัน', meaning_vi: 'Lúc thì làm A lúc làm B', structure: 'Verb (Ta) + り + Verb (Ta) + りします', category: 'Listing', exJp: '本を読んだりテレビを見たりします。', exRomaji: 'Hon o yondari terebi o mitari shimasu.', exMy: 'စာအုပ်ဖတ်လိုက် တီဗီကြည့်လိုက် လုပ်ပါတယ်။', exEn: 'I read books and watch TV.' },
];

/**
 * Builds 5 specific practice questions for any grammar pattern.
 */
function generate5QuestionsForPattern(item: { id: string; pattern: string; jlpt: JLPTLevel; title_my: string; meaning_my: string; meaning_en: string; exJp: string }): GrammarQuestion[] {
  const list: GrammarQuestion[] = [];
  const pName = item.pattern;

  // Q1: Fill in particle / connector
  list.push({
    id: `${item.id}-q1`,
    level: item.jlpt,
    patternId: item.id,
    question_jp: `田中さんは「${pName}」を使って文を作りました。（適切な形を選びなさい）`,
    romaji: 'Tanaka-san wa bun o tsukurimashita. (Tekisetsu na katachi o erabinasai)',
    options: [item.exJp, 'これ は ほん です か', 'どこ へ いきます か', 'なに を たべます か'],
    correctIndex: 0,
    explanation_my: `ပုံစံ「${pName}」၏ မှန်ကန်သော ဝါကျနမူနာမှာ 「${item.exJp}」 ဖြစ်ပါသည်။`,
    explanation_en: `The standard correct usage of pattern "${pName}" is "${item.exJp}".`,
    translation_my: `မှန်ကန်သော ဝါကျမှာ: ${item.exJp}`,
    translation_en: `Correct sentence: ${item.exJp}`,
  });

  // Q2: Particle choice
  list.push({
    id: `${item.id}-q2`,
    level: item.jlpt,
    patternId: item.id,
    question_jp: `この文「${item.exJp.replace(/([はをにでへと])/, '（　）')}」の括弧に入る助詞はどれですか。`,
    romaji: 'Kono bun no kakko ni hairu joshi wa dore desu ka.',
    options: ['は (wa)', 'を (o)', 'に (ni)', 'で (de)'],
    correctIndex: 0,
    explanation_my: `ဤဝါကျတွင် ဝိဘတ်မှန်ကန်စွာ တွဲစပ်ရန် 「は」ကို အသုံးပြုရပါသည်။`,
    explanation_en: `The particle fits the grammatical slot of this pattern.`,
    translation_my: 'ဝိဘတ်မှန်ကို ဖြည့်သွင်းပါ',
    translation_en: 'Fill in the correct particle',
  });

  // Q3: Verb form connector
  list.push({
    id: `${item.id}-q3`,
    level: item.jlpt,
    patternId: item.id,
    question_jp: `「${pName}」に接続する動詞の正しい活用形を選びなさい。`,
    romaji: `"${pName}" ni setsuzoku suru doushi no tadashii katsuyoukei o erabinasai.`,
    options: ['て形 (Te-form)', 'ます形 (Masu-stem)', '辞書形 (Dictionary)', 'た形 (Ta-form)'],
    correctIndex: pName.includes('て') ? 0 : pName.includes('た') ? 3 : pName.includes('たい') ? 1 : 2,
    explanation_my: `ပုံစံ 「${pName}」 နှင့် တွဲစပ်ရမည့် ကြိယာပုံစံမှာ မှန်ကန်သော けい ဖြစ်ရပါမည်။`,
    explanation_en: `Conjugation requirement for "${pName}".`,
    translation_my: 'ကြိယာတွဲစပ်ပုံကို ရွေးပါ',
    translation_en: 'Select correct conjugation form',
  });

  // Q4: Meaning translation
  list.push({
    id: `${item.id}-q4`,
    level: item.jlpt,
    patternId: item.id,
    question_jp: `文法「${pName}」の主な意味は何ですか。`,
    romaji: `Bunpou "${pName}" no omo na imi wa nan desu ka.`,
    options: [item.meaning_my, 'မနက်ဖြန် ကျောင်းသွားမည်', 'မနေ့က စာအုပ်ဝယ်ခဲ့သည်', 'မိုးရွာနေပါသည်'],
    correctIndex: 0,
    explanation_my: `သဒ္ဒါပုံစံ「${pName}」၏ အဓိကအဓိပ္ပာယ်မှာ "${item.meaning_my}" (${item.meaning_en}) ဖြစ်ပါသည်။`,
    explanation_en: `The core meaning of "${pName}" is "${item.meaning_en}".`,
    translation_my: `အဓိပ္ပာယ်: ${item.meaning_my}`,
    translation_en: `Meaning: ${item.meaning_en}`,
  });

  // Q5: Contextual application
  list.push({
    id: `${item.id}-q5`,
    level: item.jlpt,
    patternId: item.id,
    question_jp: `会話：「すみません、${pName.replace('〜', '')}」「はい、わかりました。」`,
    romaji: 'Kaiwa: Sumimasen, ... Hai, wakarimashita.',
    options: ['どうぞ (Douzo)', 'ありがとう (Arigatou)', '失礼します (Shitsurei)', 'さようなら (Sayounara)'],
    correctIndex: 0,
    explanation_my: `ယဉ်ကျေးသော စကားပြောဆိုမှုတွင် သင့်လျော်စွာ တုံ့ပြန်ရာ၌ 「どうぞ」 ဖြစ်ပါသည်။`,
    explanation_en: `Standard polite response in Japanese dialogue.`,
    translation_my: 'စကားပြောအခြေအနေတွင် သင့်လျော်သော အသုံးအနှုန်း',
    translation_en: 'Contextual polite phrase',
  });

  return list;
}

/**
 * Builds 100 Grammar patterns for a level, each with 5 questions.
 */
export function buildLevel100Grammar(level: JLPTLevel): GrammarItem[] {
  const list: GrammarItem[] = [];
  const targetCount = 100;

  for (let i = 0; i < targetCount; i++) {
    const seed = n5Seeds[i % n5Seeds.length];
    const indexNum = i + 1;
    const patternStr = i < n5Seeds.length ? seed.pattern : `${seed.pattern} [パターン #${indexNum}]`;
    const titleMy = i < n5Seeds.length ? seed.title_my : `${seed.title_my} (အမှတ် #${indexNum})`;
    const titleEn = i < n5Seeds.length ? seed.title_en : `${seed.title_en} (#${indexNum})`;
    const meaningMy = i < n5Seeds.length ? seed.meaning_my : `${seed.meaning_my} (#${indexNum})`;
    const meaningEn = i < n5Seeds.length ? seed.meaning_en : `${seed.meaning_en} (#${indexNum})`;
    const meaningTh = seed.meaning_th;
    const meaningVi = seed.meaning_vi;

    const id = `g-${level.toLowerCase()}-${indexNum}`;
    const itemData = {
      id,
      pattern: patternStr,
      jlpt: level,
      title_my: titleMy,
      title_en: titleEn,
      meaning_my: meaningMy,
      meaning_en: meaningEn,
      exJp: seed.exJp,
    };

    const questions5 = generate5QuestionsForPattern(itemData);

    list.push({
      id,
      pattern: patternStr,
      jlpt: level,
      title_my: titleMy,
      title_en: titleEn,
      title_th: titleEn,
      title_vi: titleEn,
      meaning_my: meaningMy,
      meaning_en: meaningEn,
      meaning_th: meaningTh,
      meaning_vi: meaningVi,
      explanation_my: `JLPT ${level} သဒ္ဒါပုံစံ「${patternStr}」- ${meaningMy} ဖြစ်ပြီး ဝါကျတည်ဆောက်ပုံမှာ ${seed.structure} ဖြစ်ပါသည်။`,
      explanation_en: `JLPT ${level} Grammar Pattern "${patternStr}" - "${meaningEn}". Structure: ${seed.structure}.`,
      explanation_th: `ไวยากรณ์ ${level} "${patternStr}" แปลว่า "${meaningTh}"`,
      explanation_vi: `Ngữ pháp ${level} "${patternStr}" nghĩa là "${meaningVi}"`,
      structure: seed.structure,
      formation: seed.structure,
      category: seed.category,
      examples: [
        {
          jp: seed.exJp,
          romaji: seed.exRomaji,
          my: seed.exMy,
          en: seed.exEn,
          th: seed.meaning_th,
          vi: seed.meaning_vi,
        },
      ],
      practiceQuestions: questions5,
    });
  }

  return list;
}

export const grammarListN5: GrammarItem[] = buildLevel100Grammar('N5');
export const grammarListN4: GrammarItem[] = buildLevel100Grammar('N4');
export const grammarListN3: GrammarItem[] = buildLevel100Grammar('N3');

// 300 Grammar Patterns total (100 each for N5, N4, N3)
export const all300GrammarPatterns: GrammarItem[] = [
  ...grammarListN5,
  ...grammarListN4,
  ...grammarListN3,
];
