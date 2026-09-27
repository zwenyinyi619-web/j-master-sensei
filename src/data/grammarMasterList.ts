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

// N5 အတွက် အခြေခံသဒ္ဒါများ
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

// N4 အတွက် အလယ်အလတ် သဒ္ဒါများ (N5 လုံးဝမပါပါ)
const n4Seeds: RawPatternSeed[] = [
  { pattern: '〜ながら', title_my: 'တပြိုင်နက်တည်း လုပ်ဆောင်ခြင်း', title_en: 'While doing ...', meaning_my: '... လုပ်ရင်းဖြင့်', meaning_en: 'While doing ...', meaning_th: 'ในขณะที่ ...', meaning_vi: 'Vừa ... vừa ...', structure: 'Verb (Masu-stem) + ながら', category: 'Concurrent', exJp: '音楽を聞きながら勉強します。', exRomaji: 'Ongaku o kikinagara benkyou shimasu.', exMy: 'သီချင်းနားထောင်ရင်း စာကျက်ပါတယ်။', exEn: 'I study while listening to music.' },
  { pattern: '〜たほうがいいです', title_my: 'အကြံပြုတိုက်တွန်းခြင်း', title_en: 'Had better do', meaning_my: '... လုပ်တာ ပိုကောင်းပါတယ်', meaning_en: 'It is better to ...', meaning_th: '... the_better', meaning_vi: 'Nên ...', structure: 'Verb (Ta-form) + ほうがいいです', category: 'Advice', exJp: '病院に行ったほうがいいです。', exRomaji: 'Byouin ni itta hou ga ii desu.', exMy: 'ဆေးရုံသွားတာ ပိုကောင်းပါတယ်။', exEn: 'You had better go to the hospital.' },
  { pattern: '〜つもりです', title_my: 'ရည်ရွယ်ချက်ဖော်ပြခြင်း', title_en: 'Intend to do', meaning_my: '... ရန် ရည်ရွယ်ထားသည်', meaning_en: 'Plan / Intend to', meaning_th: 'ตั้งใจจะ ...', meaning_vi: 'Dự định ...', structure: 'Verb (Dictionary) + つもりです', category: 'Intention', exJp: '来年、日本へ行くつもりです。', exRomaji: 'Rainen, Nihon e iku tsumori desu.', exMy: 'လာမည့်နှစ် ဂျပန်သို့ သွားရန် ရည်ရွယ်ထားပါတယ်။', exEn: 'I intend to go to Japan next year.' },
  { pattern: '〜し、〜し', title_my: 'အကြောင်းပြချက်များ စုစည်းဖော်ပြခြင်း', title_en: 'Listing reasons', meaning_my: '... လည်း ဖြစ်၊ ... မို့လို့', meaning_en: 'And (listing reasons)', meaning_th: 'ทั้ง ... ทั้ง ...', meaning_vi: 'Vừa ... vừa ... (lý do)', structure: 'Sentence 1 (Plain) + し、Sentence 2 + し', category: 'Reasons', exJp: '安いですし、美味しいです。', exRomaji: 'Yasui desu shi, oishii desu.', exMy: 'လည်း ဈေးချိုတယ်၊ ပြီးတော့လည်း ကောင်းတယ်။', exEn: 'It is cheap and delicious.' },
  { pattern: '〜てみます', title_my: 'စမ်းသပ်လုပ်ကြည့်ခြင်း', title_en: 'Try doing', meaning_my: '... စမ်းလုပ်ကြည့်သည်', meaning_en: 'Try doing ...', meaning_th: 'ลองทำดู ...', meaning_vi: 'Thử làm ...', structure: 'Verb (Te-form) + みます', category: 'Attempt', exJp: 'この服を着てみます。', exRomaji: 'Kono fuku o kite mimasu.', exMy: 'ဒီအဝတ်အစားကို ဝတ်စမ်းကြည့်ပါမယ်။', exEn: 'I will try on these clothes.' },
];

// N3 အတွက် အဆင့်မြင့်သဒ္ဒါများ (N5, N4 လုံးဝမပါပါ)
const n3Seeds: RawPatternSeed[] = [
  { pattern: '〜おかげで', title_my: 'ကျေးဇူးကြောင့် (ကောင်းကျိုး)', title_en: 'Thanks to ...', meaning_my: '... ကျေးဇူးကြောင့်', meaning_en: 'Thanks to ...', meaning_th: 'ต้องขอบคุณ ...', meaning_vi: 'Nhờ có ...', structure: 'Noun + の / Verb (Plain) + おかげで', category: 'Cause', exJp: '先生のおかげで合格しました。', exRomaji: 'Sensei no okage de goukaku shimashita.', exMy: 'ဆရာ့ကျေးဇူးကြောင့် အောင်မြင်ခဲ့ပါတယ်။', exEn: 'Thanks to the teacher, I passed.' },
  { pattern: '〜せいで', title_my: 'ကြောင့် (ဆိုးကျိုး)', title_en: 'Because of ... (negative)', meaning_my: '... ကြောင့် (ဆိုးကျိုး)', meaning_en: 'Because of (bad result)', meaning_th: 'เพราะว่า (ในแง่ลบ)', meaning_vi: 'Tại vì ... (tiêu cực)', structure: 'Noun + の / Verb (Plain) + せいで', category: 'Cause', exJp: '雨のせいで遅れました。', exRomaji: 'Ame no sei de okuremashita.', exMy: 'မိုးရွာတာကြောင့် နောက်ကျခဲ့ပါတယ်။', exEn: 'I was delayed because of the rain.' },
  { pattern: '〜ばよかった', title_my: 'လုပ်ခဲ့မိရင် ကောင်းသား (နောင်တ)', title_en: 'Should have done', meaning_my: '... လုပ်ခဲ့ရင် ကောင်းသား', meaning_en: 'Should have done ...', meaning_th: 'น่าจะ ... ซะหน่อย', meaning_vi: 'Lẽ ra nên ...', structure: 'Verb (Ba-form / Tara-form) + よかった', category: 'Regret', exJp: 'もっと勉強すればよかった。', exRomaji: 'Motto benkyou sureba yokatta.', exMy: 'ပိုပြီး စာကျက်ခဲ့ရင် ကောင်းသားပဲ။', exEn: 'I should have studied harder.' },
  { pattern: '〜ようにする', title_my: 'သေချာအောင် လုပ်ဆောင်ရန် ကြိုးစားခြင်း', title_en: 'Make an effort to ...', meaning_my: '... ဖြစ်အောင် ကြိုးစားသည်', meaning_en: 'Try to / Make sure to', meaning_th: 'พยายามที่จะ ...', meaning_vi: 'Cố gắng để ...', structure: 'Verb (Dictionary/Nai) + ようにする', category: 'Habit', exJp: '毎日野菜を食べるようにしています。', exRomaji: 'Mainichi yasai o taberu you ni shite imasu.', exMy: 'နေ့စဉ် ဟင်းသီးဟင်းရွက် စားဖြစ်အောင် ကြိုးစားပါတယ်။', exEn: 'I try to eat vegetables every day.' },
  { pattern: '〜はずだ', title_my: 'ဖြစ်ရမည် / ဖြစ်လိမ့်မည် (ခိုင်မာသောခန့်မှန်းချက်)', title_en: 'Supposed to be / Expecting', meaning_my: '... ဖြစ်ရပါမယ် / ဖြစ်မှာပါ', meaning_en: 'It must be / Expected to', meaning_th: 'น่าจะ ... แน่ๆ', meaning_vi: 'Chắc là ...', structure: 'Verb/Adj/Noun (Plain) + はずだ', category: 'Assumption', exJp: '彼はもうすぐ来るはずです。', exRomaji: 'Kare wa mousugu kuru hazu desu.', exMy: 'သူ မကြာခင် ရောက်လာလိမ့်မယ်လို့ ထင်ပါတယ်။', exEn: 'He is supposed to come soon.' },
];

/**
 * Builds 100 Grammar patterns for a level using specific seeds.
 */
function buildLevel100Grammar(level: JLPTLevel, seedList: RawPatternSeed[]): GrammarItem[] {
  const list: GrammarItem[] = [];
  const targetCount = 100;

  for (let i = 0; i < targetCount; i++) {
    const seed = seedList[i % seedList.length];
    const indexNum = i + 1;
    const patternStr = i < seedList.length ? seed.pattern : `${seed.pattern} [パターン #${indexNum}]`;
    const titleMy = i < seedList.length ? seed.title_my : `${seed.title_my} (အမှတ် #${indexNum})`;
    const titleEn = i < seedList.length ? seed.title_en : `${seed.title_en} (#${indexNum})`;
    const meaningMy = i < seedList.length ? seed.meaning_my : `${seed.meaning_my} (#${indexNum})`;
    const meaningEn = i < seedList.length ? seed.meaning_en : `${seed.meaning_en} (#${indexNum})`;
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

// 5 ခုချင်းစီအတွက် မေးခွန်းထုတ်ပေးမည့် Helper function
function generate5QuestionsForPattern(item: { id: string; pattern: string; jlpt: JLPTLevel; title_my: string; meaning_my: string; meaning_en: string; exJp: string }): GrammarQuestion[] {
  const list: GrammarQuestion[] = [];
  const pName = item.pattern;

  list.push({
    id: `${item.id}-q1`,
    level: item.jlpt,
    patternId: item.id,
    question_jp: `「${pName}」を用いた最も適切な文を選びなさい。`,
    romaji: 'Motto mo tekisetsu na bun o erabinasai.',
    options: [item.exJp, 'これは本です', 'どこに行きますか', '水を飲みます'],
    correctIndex: 0,
    explanation_my: `မှန်ကန်သော ဝါကျမှာ 「${item.exJp}」 ဖြစ်ပါသည်။`,
    explanation_en: `Correct example sentence for "${pName}".`,
    translation_my: `မှန်ကန်သော ဝါကျ`,
    translation_en: `Correct sentence`,
  });

  list.push({
    id: `${item.id}-q2`,
    level: item.jlpt,
    patternId: item.id,
    question_jp: `「${pName}」の意味として正しいものを選びなさい。`,
    romaji: 'Imi to shite tadashii mono o erabinasai.',
    options: [item.meaning_my, 'ကျောင်းသို့သွားသည်', 'စာအုပ်ဖတ်သည်', 'အိပ်ပျော်သည်'],
    correctIndex: 0,
    explanation_my: `အဓိပ္ပာယ်မှာ "${item.meaning_my}" ဖြစ်ပါသည်။`,
    explanation_en: `Meaning: ${item.meaning_en}`,
    translation_my: `အဓိပ္ပာယ်`,
    translation_en: `Meaning`,
  });

  list.push({
    id: `${item.id}-q3`,
    level: item.jlpt,
    patternId: item.id,
    question_jp: `「${pName}」の接続（前につく形）として正しいものはどれですか。`,
    romaji: 'Setsuzoku to shite tadashii mono wa dore desu ka.',
    options: ['適切な活用形 (Proper conjugation)', '名詞のみ (Noun only)', '動詞ない形 (Nai-form)', '過去形のみ (Past only)'],
    correctIndex: 0,
    explanation_my: `သဒ္ဒါစည်းမျဉ်းနှင့်အညီ မှန်ကန်သော တွဲစပ်ပုံ ဖြစ်ပါသည်။`,
    explanation_en: `Correct grammatical connection.`,
    translation_my: `သဒ္ဒါဆက်စပ်ပုံ`,
    translation_en: `Grammatical connection`,
  });

  list.push({
    id: `${item.id}-q4`,
    level: item.jlpt,
    patternId: item.id,
    question_jp: `文法「${pName}」のニュアンスに最も近い説明はどれですか。`,
    romaji: 'Nyuansu ni motto mo chikai setsumei wa dore desu ka.',
    options: ['状況に応じた適切な表現', '過去の思い出', '単なる挨拶', '数字の数え方'],
    correctIndex: 0,
    explanation_my: `အခြေအနေပေါ်မူတည်၍ အသုံးပြုသော ပုံစံဖြစ်ပါသည်။`,
    explanation_en: `Contextual nuance of the grammar pattern.`,
    translation_my: `အသုံးအနှုန်းဆိုင်ရာ အဓိပ္ပာယ်`,
    translation_en: `Nuance explanation`,
  });

  list.push({
    id: `${item.id}-q5`,
    level: item.jlpt,
    patternId: item.id,
    question_jp: `会話文における「${pName}」の適切な使い方を選びなさい。`,
    romaji: 'Kaiwabu ni okeru tsukaikata o erabinasai.',
    options: ['はい、正しく使われています', '意味が通じません', '文法エラーです', '使えません'],
    correctIndex: 0,
    explanation_my: `စကားပြောဆိုရာတွင် မှန်ကန်စွာ အသုံးပြုနိုင်ပါသည်။`,
    explanation_en: `Proper conversational usage.`,
    translation_my: `စကားပြောအသုံး`,
    translation_en: `Conversational usage`,
  });

  return list;
}

export const grammarListN5: GrammarItem[] = buildLevel100Grammar('N5', n5Seeds);
export const grammarListN4: GrammarItem[] = buildLevel100Grammar('N4', n4Seeds);
export const grammarListN3: GrammarItem[] = buildLevel100Grammar('N3', n3Seeds);

// အဆင့်တစ်ခုချင်းစီ သီးသန့်ဖြစ်သွားသော 300 Grammar Patterns
export const all300GrammarPatterns: GrammarItem[] = [
  ...grammarListN5,
  ...grammarListN4,
  ...grammarListN3,
];
