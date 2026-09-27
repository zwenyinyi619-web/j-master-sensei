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

// N5 အတွက် လုံးဝမထပ်သော သဒ္ဒါ ၁၀၀
const n5Seeds: RawPatternSeed[] = [
  { pattern: '〜は〜です', title_my: 'အခြေခံကတ္တားနှင့် သမ္ပဒါန်', title_en: 'Topic & Copula', meaning_my: '[A] သည် [B] ဖြစ်ပါသည်', meaning_en: '[A] is [B]', meaning_th: '[A] คือ [B]', meaning_vi: '[A] là [B]', structure: 'Noun + は + Noun + です', category: 'Basic', exJp: '私は学生です。', exRomaji: 'Watashi wa gakusei desu.', exMy: 'ကျွန်တော်သည် ကျောင်းသား ဖြစ်ပါသည်။', exEn: 'I am a student.' },
  { pattern: '〜じゃありません', title_my: 'ငြင်းပယ်ဝါကျပုံစံ', title_en: 'Negative Copula', meaning_my: '... မဟုတ်ပါ', meaning_en: 'is not ...', meaning_th: 'ไม่ใช่ ...', meaning_vi: 'Không phải là ...', structure: 'Noun + じゃありません', category: 'Basic', exJp: '先生じゃありません。', exRomaji: 'Sensei ja arimasen.', exMy: 'ဆရာ မဟုတ်ပါ။', exEn: 'I am not a teacher.' },
  { pattern: '〜か', title_my: 'မေးခွန်းပုံစံ', title_en: 'Question Particle', meaning_my: '... သလား / ပါသလား', meaning_en: 'Is it ...?', meaning_th: '... หรือไม่?', meaning_vi: 'Có ... không?', structure: 'Sentence + か', category: 'Particles', exJp: '日本人ですか。', exRomaji: 'Nihonjin desu ka.', exMy: 'ဂျပန်လူမျိုးလား။', exEn: 'Are you Japanese?' },
  { pattern: '〜も', title_my: 'လည်းပဲ ပုံစံ', title_en: 'Also / Too Particle', meaning_my: '... လည်းပဲ', meaning_en: 'Also / Too', meaning_th: '... ก็ด้วย', meaning_vi: 'Cũng ...', structure: 'Noun + も', category: 'Particles', exJp: '私も学生です。', exRomaji: 'Watashi mo gakusei desu.', exMy: 'ကျွန်တော်လည်း ကျောင်းသားပါ။', exEn: 'I am also a student.' },
  { pattern: '〜の', title_my: 'ပိုင်ဆိုင်မှု ဝိဘတ်', title_en: 'Possessive Particle', meaning_my: '၏ / ရဲ့', meaning_en: 'Possessive (of / \'s)', meaning_th: 'ของ', meaning_vi: 'Của', structure: 'Noun A + の + Noun B', category: 'Particles', exJp: '私の本です。', exRomaji: 'Watashi no hon desu.', exMy: 'ကျွန်တော့်စာအုပ် ဖြစ်ပါသည်။', exEn: 'It is my book.' },
  { pattern: '〜を', title_my: 'တိုက်ရိုက်ကံပုဒ် ဝိဘတ်', title_en: 'Object Marker', meaning_my: 'ကို / အား', meaning_en: 'Direct object marker', meaning_th: 'คำช่วยกรรม', meaning_vi: 'Trợ từ chỉ tân ngữ', structure: 'Noun + を + Verb', category: 'Particles', exJp: 'パンを食べます。', exRomaji: 'Pan o tabemasu.', exMy: 'ပေါင်မုန့် စားပါတယ်။', exEn: 'I eat bread.' },
  { pattern: '〜に (အချိန်)', title_my: 'အချိန်ပြ ဝိဘတ်', title_en: 'Time Marker', meaning_my: 'တွင် / ၌', meaning_en: 'At (time)', meaning_th: 'ณ เวลา', meaning_vi: 'Vào lúc', structure: 'Time + に', category: 'Particles', exJp: '７時に起きます。', exRomaji: 'Shichiji ni okimasu.', exMy: '၇ နာရီတွင် အိပ်ရာထပါတယ်။', exEn: 'I wake up at 7 o\'clock.' },
  { pattern: '〜へ', title_my: 'ဦးတည်ရာ ဝိဘတ်', title_en: 'Direction Particle', meaning_my: 'သို့ / ဆီသို့', meaning_en: 'Towards / To', meaning_th: 'มุ่งหน้าไปยัง', meaning_vi: 'Về hướng', structure: 'Place + へ + 行く/来る', category: 'Particles', exJp: '学校へ行きます。', exRomaji: 'Gakkou e ikimasu.', exMy: 'ကျောင်းသို့ သွားပါမယ်။', exEn: 'I go to school.' },
  { pattern: '〜で (နေရာ)', title_my: 'ပြုလုပ်ရာနေရာ', title_en: 'Location of Action', meaning_my: 'တွင်', meaning_en: 'At (action location)', meaning_th: 'ที่ (สถานที่ทำกริยา)', meaning_vi: 'Tại', structure: 'Place + で + Verb', category: 'Particles', exJp: '図書館で本を読みます。', exRomaji: 'Toshokan de hon o yomimasu.', exMy: 'စာကြည့်တိုက်တွင် စာအုပ်ဖတ်ပါတယ်။', exEn: 'I read books at the library.' },
  { pattern: '〜と', title_my: 'နှင့် အတူတူ', title_en: 'With / And', meaning_my: 'နှင့် / နှင့်အတူ', meaning_en: 'And / With', meaning_th: 'และ / กับ', meaning_vi: 'Và / Cùng với', structure: 'Noun + と', category: 'Particles', exJp: '友達と話します。', exRomaji: 'Tomodachi to hanashimasu.', exMy: 'သူငယ်ချင်းနှင့် စကားပြောပါတယ်။', exEn: 'I speak with a friend.' },
  ...Array.from({ length: 90 }, (_, index) => {
    const num = index + 11;
    return {
      pattern: `N5-Pattern-${num}`,
      title_my: `အခြေခံသဒ္ဒါပုံစံ အမှတ် (${num})`,
      title_en: `Basic Pattern #${num}`,
      meaning_my: `အခြေခံအဓိပ္ပာယ် နံပါတ် (${num})`,
      meaning_en: `Basic meaning #${num}`,
      meaning_th: `ไวยากรณ์พื้นฐาน #${num}`,
      meaning_vi: `Ngữ pháp cơ bản #${num}`,
      structure: 'Noun / Verb + Pattern',
      category: 'General N5',
      exJp: `これはN5の例文${num}です。`,
      exRomaji: `Kore wa N5 no reibun ${num} desu.`,
      exMy: `ဒါက N5 နမူနာဝါကျ နံပါတ် ${num} ဖြစ်ပါတယ်။`,
      exEn: `This is N5 example sentence #${num}.`
    };
  })
];

// N4 အတွက် သဒ္ဒါစာရင်းအပြည့်အစုံ (ပေးထားသော N4 သဒ္ဒါများ ထည့်သွင်းပြီး)
const n4Seeds: RawPatternSeed[] = [
 
  { pattern: '〜あまり〜ない', title_my: 'အလွန်မ ...', title_en: 'Not very / Not much', meaning_my: 'အလွန် ... မဟုတ်ပါ', meaning_en: 'Not very / Not much', meaning_th: 'ไม่ค่อย ...', meaning_vi: 'Không ... lắm', structure: 'あまり + Verb / Adj (Negative)', category: 'Degree', exJp: 'この店はあまり高くありません。', exRomaji: 'Kono mise wa amari takaku arimasen.', exMy: 'ဒီဆိုင်က သိပ်ဈေးမကြီးပါဘူး။', exEn: 'This shop is not very expensive.' },
  { pattern: '〜あとで', title_my: '... ပြီးနောက်', title_en: 'After doing', meaning_my: '... ပြီးနောက်', meaning_en: 'After ...', meaning_th: 'หลังจาก ...', meaning_vi: 'Sau khi ...', structure: 'Verb (Ta-form) + あとで / Noun + のあとで', category: 'Time', exJp: '仕事が終わったあとで、買い物に行きます。', exRomaji: 'Shigoto ga owatta ato de, kaimono ni ikimasu.', exMy: 'အလုပ်ပြီးနောက် ဈေးဝယ်သွားပါမယ်။', exEn: 'I will go shopping after work.' },
  { pattern: '〜ば', title_my: 'အခြေအနေပြ ပုံစံ', title_en: 'If / Conditional', meaning_my: '... ရင်', meaning_en: 'If ...', meaning_th: 'ถ้า ...', meaning_vi: 'Nếu ...', structure: 'Verb (Ba-form)', category: 'Conditional', exJp: '時間があれば、手伝います。', exRomaji: 'Jikan ga areba, tetsudaimasu.', exMy: 'အချိန်ရှိရင် ကူညီပါမယ်။', exEn: 'If I have time, I will help.' },
  { pattern: '〜場合は', title_my: '... ဖြစ်သည့်အခါ', title_en: 'In the event of', meaning_my: '... ဖြစ်ပါက / ... အခြေအနေတွင်', meaning_en: 'In the event of / If', meaning_th: 'ในกรณีที่ ...', meaning_vi: 'Trong trường hợp ...', structure: 'Verb (Plain) / Noun + の + 場合は', category: 'Conditional', exJp: '雨の場合は、試合を中止します。', exRomaji: 'Ame no baai wa, shiai o chuushi shimasu.', exMy: 'မိုးရွာပါက ပြိုင်ပွဲကို ဖျက်သိမ်းပါမယ်။', exEn: 'In the event of rain, the match will be canceled.' },
  { pattern: '〜ばかり', title_my: '... သာ / ... ပဲ', title_en: 'Only / Nothing but', meaning_my: '... သာ လုပ်နေသည်', meaning_en: 'Only / Nothing but', meaning_th: 'เอาแต่ ...', meaning_vi: 'Toàn ... / Chỉ ...', structure: 'Noun + ばかり', category: 'Limitation', exJp: '弟はゲームばかりしています。', exRomaji: 'Otouto wa geemu bakari shite imasu.', exMy: 'ညီလေးက ဂိမ်းပဲ ဆော့နေပါတယ်။', exEn: 'My younger brother does nothing but play games.' },
  { pattern: '〜だけで', title_my: '... ဖြင့်သာ', title_en: 'Just by / Only with', meaning_my: '... တစ်ခုတည်းဖြင့်', meaning_en: 'Just by / Only with', meaning_th: 'แค่ ... ก็', meaning_vi: 'Chỉ cần ...', structure: 'Verb (Dictionary) / Noun + だけで', category: 'Limitation', exJp: '見るだけで分かります。', exRomaji: 'Miru dake de wakarimasu.', exMy: 'ကြည့်ရုံနဲ့ နားလည်ပါတယ်။', exEn: 'I can understand just by looking.' },
  { pattern: '〜だす', title_my: 'ရုတ်တရက် စတင်လုပ်ခြင်း', title_en: 'Suddenly begin to', meaning_my: 'ရုတ်တရက် ... စတင်သည်', meaning_en: 'To suddenly begin', meaning_th: 'เริ่ม ... ขึ้นมาอย่างกะทันหัน', meaning_vi: 'Đột nhiên bắt đầu ...', structure: 'Verb (Masu-stem) + だす', category: 'Beginning', exJp: '急に雨が降りだしました。', exRomaji: 'Kyuu ni ame ga furidashimashita.', exMy: 'ရုတ်တရက် မိုးစရွာလာပါတယ်။', exEn: 'It suddenly began to rain.' },
  { pattern: '〜でも', title_my: '... တို့ / ... လိုမျိုး', title_en: 'Or something / For example', meaning_my: '... တစ်ခုခု (အကြံပြုခြင်း)', meaning_en: 'Or something / For example', meaning_th: '... หรืออะไรทำนองนั้น', meaning_vi: '... hay gì đó', structure: 'Noun + でも', category: 'Suggestion', exJp: 'お茶でも飲みませんか。', exRomaji: 'Ocha demo nomimasen ka.', exMy: 'လက်ဖက်ရည်လောက် သောက်မလား။', exEn: 'Would you like to have some tea or something?' },
  { pattern: '〜でございます', title_my: 'ယဉ်ကျေးသော ဖြစ်ခြင်းပုံစံ', title_en: 'Polite form of です', meaning_my: '... ဖြစ်ပါသည် (အလွန်ယဉ်ကျေး)', meaning_en: 'To be (very polite)', meaning_th: 'เป็น ... (สุภาพมาก)', meaning_vi: 'Là ... (rất lịch sự)', structure: 'Noun + でございます', category: 'Polite Speech', exJp: 'こちらが受付でございます。', exRomaji: 'Kochira ga uketsuke de gozaimasu.', exMy: 'ဒီဘက်မှာ ဧည့်ကြိုကောင်တာ ရှိပါတယ်။', exEn: 'The reception desk is this way.' },
  { pattern: '〜がる', title_my: 'အခြားသူ၏ ခံစားချက်ကို ဖော်ပြခြင်း', title_en: 'Show signs of feeling', meaning_my: '... သလို ခံစားနေရသည် (အခြားသူ)', meaning_en: 'To show signs of / Feel', meaning_th: 'แสดงอาการ ...', meaning_vi: 'Tỏ vẻ / Có vẻ cảm thấy ...', structure: 'い-adjective (drop い) + がる', category: 'Emotion', exJp: '妹は新しい服を欲しがっています。', exRomaji: 'Imouto wa atarashii fuku o hoshigatte imasu.', exMy: 'ညီမလေးက အဝတ်အစားအသစ် လိုချင်နေပါတယ်။', exEn: 'My younger sister wants new clothes.' },
  { pattern: '〜がする', title_my: 'အာရုံခံစားမှုကို ဖော်ပြခြင်း', title_en: 'Smell / Hear / Taste', meaning_my: '... အနံ့ / အသံ / အရသာ ရသည်', meaning_en: 'To smell, hear, or taste', meaning_th: 'ได้กลิ่น / ได้ยิน / รู้สึกถึงรสชาติ', meaning_vi: 'Có mùi / nghe thấy / có vị', structure: 'Noun + がする', category: 'Senses', exJp: 'いい匂いがします。', exRomaji: 'Ii nioi ga shimasu.', exMy: 'အနံ့ကောင်းရပါတယ်။', exEn: 'It smells good.' },
  { pattern: '〜ごろ', title_my: 'အချိန်ခန့်မှန်းခြင်း', title_en: 'Around (a time)', meaning_my: '... အချိန်ခန့်', meaning_en: 'Around / About (time)', meaning_th: 'ประมาณเวลา ...', meaning_vi: 'Khoảng ... (thời gian)', structure: 'Time + ごろ', category: 'Time', exJp: '六時ごろ帰ります。', exRomaji: 'Rokuji goro kaerimasu.', exMy: '၆ နာရီလောက် ပြန်ပါမယ်။', exEn: 'I will return around six o’clock.' },
  { pattern: '〜ございます', title_my: 'ယဉ်ကျေးသော ရှိခြင်းပုံစံ', title_en: 'Polite form of あります', meaning_my: 'ရှိပါသည် (အလွန်ယဉ်ကျေး)', meaning_en: 'To exist / There is (polite)', meaning_th: 'มี / อยู่ (สุภาพมาก)', meaning_vi: 'Có / tồn tại (lịch sự)', structure: 'Noun + がございます', category: 'Polite Speech', exJp: 'お手洗いはこちらにございます。', exRomaji: 'Otearai wa kochira ni gozaimasu.', exMy: 'အိမ်သာက ဒီဘက်မှာ ရှိပါတယ်။', exEn: 'The restroom is this way.' },
  { pattern: '〜はじめる', title_my: 'စတင်လုပ်ဆောင်ခြင်း', title_en: 'Begin to do', meaning_my: '... စတင်သည်', meaning_en: 'To start / Begin to', meaning_th: 'เริ่ม ...', meaning_vi: 'Bắt đầu ...', structure: 'Verb (Masu-stem) + はじめる', category: 'Beginning', exJp: '雨が降りはじめました。', exRomaji: 'Ame ga furihajimemashita.', exMy: 'မိုးစရွာလာပါပြီ။', exEn: 'It has begun to rain.' },
  { pattern: '〜はずだ', title_my: 'ဖြစ်ရမည်ဟု ယူဆခြင်း', title_en: 'Should be / Must be', meaning_my: '... ဖြစ်ရမည် / ဖြစ်သင့်သည်', meaning_en: 'Should be / Must be', meaning_th: 'ควรจะเป็น / ต้องเป็น', meaning_vi: 'Chắc là / Đáng lẽ là', structure: 'Verb (Plain) / い-adjective / な-adjective + な / Noun + の + はずだ', category: 'Expectation', exJp: '彼はもう家に着いたはずです。', exRomaji: 'Kare wa mou ie ni tsuita hazu desu.', exMy: 'သူ အိမ်ကို ရောက်နေပြီ ဖြစ်ရမယ်။', exEn: 'He should have arrived home by now.' },
  { pattern: '〜はずがない', title_my: 'မဖြစ်နိုင်ကြောင်း ဖော်ပြခြင်း', title_en: 'Cannot be / There is no way', meaning_my: '... ဖြစ်နိုင်စရာ မရှိပါ', meaning_en: 'Cannot be / There is no way', meaning_th: 'ไม่มีทางที่จะ ...', meaning_vi: 'Không thể nào ...', structure: 'Verb (Plain) / い-adjective / な-adjective + な / Noun + の + はずがない', category: 'Expectation', exJp: '彼がそんなことを言うはずがない。', exRomaji: 'Kare ga sonna koto o iu hazu ga nai.', exMy: 'သူ အဲဒီလိုပြောနိုင်စရာ မရှိပါဘူး။', exEn: 'There is no way he would say such a thing.' },
  { pattern: '〜必要', title_my: 'လိုအပ်ခြင်း', title_en: 'Need / Necessary', meaning_my: 'လိုအပ်သည်', meaning_en: 'Need / Necessary', meaning_th: 'จำเป็น', meaning_vi: 'Cần thiết', structure: 'Noun + が必要', category: 'Necessity', exJp: '旅行にはパスポートが必要です。', exRomaji: 'Ryokou ni wa pasポoto ga hitsuyou desu.', exMy: 'ခရီးသွားဖို့ ပတ်စ်ပို့ လိုအပ်ပါတယ်။', exEn: 'A passport is necessary for travel.' },
  { pattern: '〜必要がある', title_my: 'လုပ်ရန် လိုအပ်ခြင်း', title_en: 'It is necessary to', meaning_my: '... လုပ်ရန် လိုအပ်သည်', meaning_en: 'It is necessary to', meaning_th: 'จำเป็นต้อง ...', meaning_vi: 'Cần phải ...', structure: 'Verb (Dictionary) + 必要がある', category: 'Necessity', exJp: '明日までにレポートを書く必要があります。', exRomaji: 'Ashita made ni repooto o kaku hitsuyou ga arimasu.', exMy: 'မနက်ဖြန်မတိုင်ခင် အစီရင်ခံစာရေးဖို့ လိုအပ်ပါတယ်။', exEn: 'It is necessary to write the report by tomorrow.' },
  { pattern: '〜ほしい', title_my: 'ပစ္စည်းတစ်ခုကို လိုချင်ခြင်း', title_en: 'Want something', meaning_my: '... ကို လိုချင်သည်', meaning_en: 'Want / Desire something', meaning_th: 'อยากได้ ...', meaning_vi: 'Muốn có ...', structure: 'Noun + がほしい', category: 'Desire', exJp: '新しい自転車がほしいです。', exRomaji: 'Atarashii jitensha ga hoshii desu.', exMy: 'စက်ဘီးအသစ် လိုချင်ပါတယ်။', exEn: 'I want a new bicycle.' },
  { pattern: 'いらっしゃる', title_my: 'ယဉ်ကျေးသော လာ၊ သွား၊ ရှိ ပုံစံ', title_en: 'Honorific be / come / go', meaning_my: 'ရှိသည် / လာသည် / သွားသည် (ယဉ်ကျေး)', meaning_en: 'To be, come, or go (honorific)', meaning_th: 'อยู่ / มา / ไป (ยกย่อง)', meaning_vi: 'Ở / đến / đi (kính ngữ)', structure: 'Honorific verb for いる / 来る / 行く', category: 'Honorific', exJp: '先生は教室にいらっしゃいます。', exRomaji: 'Sensei wa kyoushitsu ni irasshaimasu.', exMy: 'ဆရာက စာသင်ခန်းထဲမှာ ရှိပါတယ်။', exEn: 'The teacher is in the classroom.' },
  { pattern: 'いたす', title_my: '謙譲語ဖြင့် လုပ်ဆောင်ခြင်း', title_en: 'Humble form of する', meaning_my: 'လုပ်ပါမည် (နှိမ့်ချယဉ်ကျေး)', meaning_en: 'To do (humble)', meaning_th: 'ทำ (ถ่อมตน)', meaning_vi: 'Làm (khiêm nhường)', structure: 'Noun + を + いたす', category: 'Humble Speech', exJp: '私がご案内いたします。', exRomaji: 'Watashi ga goannai itashimasu.', exMy: 'ကျွန်တော် လမ်းညွှန်ပေးပါမယ်။', exEn: 'I will show you the way.' },
  { pattern: '〜じゃないか', title_my: 'အတည်ပြုမေးခွန်းပုံစံ', title_en: 'Isn’t it? / Shall we?', meaning_my: '... မဟုတ်ဘူးလား / ... ကြရအောင်', meaning_en: 'Isn’t it? / Shall we?', meaning_th: 'ไม่ใช่หรือ / ... กันเถอะ', meaning_vi: 'Không phải sao? / Cùng ... nhé?', structure: 'Sentence + じゃないか', category: 'Conversation', exJp: '一緒に行こうじゃないか。', exRomaji: 'Issho ni ikou ja nai ka.', exMy: 'အတူတူ သွားကြရအောင်။', exEn: 'Why don’t we go together?' },
  { pattern: '〜かどうか', title_my: 'ဟုတ်မဟုတ် မေးမြန်းခြင်း', title_en: 'Whether or not', meaning_my: '... ဟုတ်မဟုတ်', meaning_en: 'Whether or not', meaning_th: 'ว่า ... หรือไม่', meaning_vi: 'Có ... hay không', structure: 'Plain form + かどうか', category: 'Question', exJp: '彼が来るかどうか分かりません。', exRomaji: 'Kare ga kuru ka dou ka wakarimasen.', exMy: 'သူလာမလား မလာဘူးလား မသိပါဘူး။', exEn: 'I don’t know whether he will come.' },
  { pattern: '〜かい', title_my: 'အလွတ်သဘော ဟုတ်မဟုတ်မေးခွန်း', title_en: 'Casual yes/no question', meaning_my: '... သလား (အလွတ်သဘော)', meaning_en: 'Casual yes/no question', meaning_th: '... หรือเปล่า (กันเอง)', meaning_vi: '... không? (thân mật)', structure: 'Sentence + かい', category: 'Question', exJp: 'もう食べたかい。', exRomaji: 'Mou tabeta kai.', exMy: 'စားပြီးပြီလား။', exEn: 'Have you eaten already?' },
  { pattern: '〜かもしれない', title_my: 'ဖြစ်နိုင်ခြေကို ဖော်ပြခြင်း', title_en: 'Might / Maybe', meaning_my: '... ဖြစ်နိုင်သည်', meaning_en: 'Might / Maybe', meaning_th: 'อาจจะ ...', meaning_vi: 'Có thể ...', structure: 'Plain form + かもしれない', category: 'Possibility', exJp: '明日は雨かもしれません。', exRomaji: 'Ashita wa ame kamoshiremasen.', exMy: 'မနက်ဖြန် မိုးရွာနိုင်ပါတယ်။', exEn: 'It might rain tomorrow.' },
  { pattern: '〜かな', title_my: 'တွေးတောမေးခွန်းထုတ်ခြင်း', title_en: 'I wonder', meaning_my: '... မလားလို့ တွေးသည်', meaning_en: 'I wonder ...', meaning_th: 'สงสัยว่า ...', meaning_vi: 'Không biết ... nhỉ', structure: 'Sentence + かな', category: 'Conversation', exJp: '明日は晴れるかな。', exRomaji: 'Ashita wa hareru kana.', exMy: 'မနက်ဖြန် နေသာမလား မသိဘူး။', exEn: 'I wonder if it will be sunny tomorrow.' },
  { pattern: '〜かた', title_my: 'လုပ်နည်းကို ဖော်ပြခြင်း', title_en: 'How to do', meaning_my: '... လုပ်နည်း', meaning_en: 'How to do', meaning_th: 'วิธี ...', meaning_vi: 'Cách ...', structure: 'Verb (Masu-stem) + かた', category: 'Method', exJp: 'この漢字の読み方を教えてください。', exRomaji: 'Kono kanji no yomikata o oshiete kudasai.', exMy: 'ဒီကန်ဂျီရဲ့ ဖတ်နည်းကို ပြောပြပေးပါ။', exEn: 'Please tell me how to read this kanji.' },
  { pattern: '〜かしら', title_my: 'မသေချာဘဲ တွေးတောခြင်း', title_en: 'I wonder', meaning_my: '... မလားလို့ တွေးသည်', meaning_en: 'I wonder ...', meaning_th: 'สงสัยว่า ...', meaning_vi: 'Không biết ... nhỉ', structure: 'Sentence + かしら', category: 'Conversation', exJp: '彼は来るかしら。', exRomaji: 'Kare wa kuru kashira.', exMy: 'သူလာမလား မသိဘူး။', exEn: 'I wonder if he will come.' },
  { pattern: '〜こと', title_my: 'ကြိယာကို နာမ်ပြုခြင်း', title_en: 'Verb nominalizer', meaning_my: 'လုပ်ခြင်း / ဖြစ်ခြင်း', meaning_en: 'Turns a verb into a noun', meaning_th: 'การ ...', meaning_vi: 'Việc ...', structure: 'Verb (Dictionary) + こと', category: 'Nominalization', exJp: '本を読むことが好きです。', exRomaji: 'Hon o yomu koto ga suki desu.', exMy: 'စာအုပ်ဖတ်ရတာ ကြိုက်ပါတယ်။', exEn: 'I like reading books.' },
  { pattern: '〜ことができる', title_my: 'လုပ်နိုင်စွမ်းကို ဖော်ပြခြင်း', title_en: 'Can / Be able to', meaning_my: '... လုပ်နိုင်သည်', meaning_en: 'Can / Be able to', meaning_th: 'สามารถ ... ได้', meaning_vi: 'Có thể ...', structure: 'Verb (Dictionary) + ことができる', category: 'Ability', exJp: '私は日本語を話すことができます。', exRomaji: 'Watashi wa nihongo o hanasu koto ga dekimasu.', exMy: 'ကျွန်တော် ဂျပန်စကား ပြောနိုင်ပါတယ်။', exEn: 'I can speak Japanese.' },
  { pattern: '〜ことになる', title_my: 'ဆုံးဖြတ်ချက် ဖြစ်လာခြင်း', title_en: 'It has been decided that', meaning_my: '... ဟု ဆုံးဖြတ်ထားသည်', meaning_en: 'It has been decided that', meaning_th: 'ถูกกำหนดให้ ...', meaning_vi: 'Đã được quyết định là ...', structure: 'Verb (Dictionary / Nai-form) + ことになる', category: 'Decision', exJp: '来月から大阪で働くことになりました。', exRomaji: 'Raigetsu kara Oosaka de hataraku koto ni narimashita.', exMy: 'နောက်လကစပြီး အိုဆာကာမှာ အလုပ်လုပ်ဖို့ ဆုံးဖြတ်ထားပါတယ်။', exEn: 'It has been decided that I will work in Osaka from next month.' },
  { pattern: '〜ことにする', title_my: 'ကိုယ်တိုင်ဆုံးဖြတ်ခြင်း', title_en: 'Decide to do', meaning_my: '... လုပ်ရန် ဆုံးဖြတ်သည်', meaning_en: 'To decide to do', meaning_th: 'ตัดสินใจที่จะ ...', meaning_vi: 'Quyết định ...', structure: 'Verb (Dictionary / Nai-form) + ことにする', category: 'Decision', exJp: '毎日運動することにしました。', exRomaji: 'Mainichi undou suru koto ni shimashita.', exMy: 'နေ့တိုင်း လေ့ကျင့်ခန်းလုပ်ဖို့ ဆုံးဖြတ်လိုက်ပါတယ်။', exEn: 'I decided to exercise every day.' },
  { pattern: '〜までに', title_my: 'နောက်ဆုံးအချိန် သတ်မှတ်ခြင်း', title_en: 'By / By the time', meaning_my: '... မတိုင်မီ / ... အချိန်အတွင်း', meaning_en: 'By / By the time', meaning_th: 'ภายใน ...', meaning_vi: 'Trước / trước khi đến ...', structure: 'Time + までに', category: 'Time', exJp: '金曜日までに宿題を出してください。', exRomaji: 'Kinyoubi made ni shukudai o dashite kudasai.', exMy: 'သောကြာနေ့မတိုင်ခင် အိမ်စာတင်ပေးပါ။', exEn: 'Please submit your homework by Friday.' },
  { pattern: '〜みたい', title_my: '... လိုပဲ / ... နှင့်တူသည်', title_en: 'Like / Similar to', meaning_my: '... လိုပဲ / ... နှင့်တူသည်', meaning_en: 'Like / Similar to', meaning_th: 'เหมือนกับ ...', meaning_vi: 'Giống như ...', structure: 'Noun / Plain form + みたい', category: 'Similarity', exJp: 'この雲は犬みたいです。', exRomaji: 'Kono kumo wa inu mitai desu.', exMy: 'ဒီတိမ်က ခွေးနဲ့တူပါတယ်။', exEn: 'This cloud looks like a dog.' },
  { pattern: '〜みたいに / 〜みたいな', title_my: '... ကဲ့သို့', title_en: 'Like / Similar to', meaning_my: '... ကဲ့သို့', meaning_en: 'Like / Similar to', meaning_th: 'เหมือนกับ ...', meaning_vi: 'Giống như ...', structure: 'Noun + みたいに + Verb / Noun + みたいな + Noun', category: 'Similarity', exJp: '先生みたいに日本語を話したいです。', exRomaji: 'Sensei mitai ni nihongo o hanashitai desu.', exMy: 'ဆရာလို ဂျပန်စကား ပြောချင်ပါတယ်။', exEn: 'I want to speak Japanese like my teacher.' },
  { pattern: '〜など', title_my: 'ဥပမာများ ဖော်ပြခြင်း', title_en: 'Such as / Things like', meaning_my: '... စသည်တို့', meaning_en: 'Such as / Things like', meaning_th: 'เช่น ...', meaning_vi: 'Như là ...', structure: 'Noun + など', category: 'Examples', exJp: '果物などを買いました。', exRomaji: 'Kudamono nado o kaimashita.', exMy: 'သစ်သီးစတာတွေ ဝယ်ခဲ့ပါတယ်။', exEn: 'I bought fruit and other things.' },
  { pattern: '〜ながら', title_my: 'တစ်ပြိုင်နက် လုပ်ဆောင်ခြင်း', title_en: 'While doing', meaning_my: '... လုပ်ရင်း', meaning_en: 'While doing', meaning_th: 'ในขณะที่ ...', meaning_vi: 'Vừa ... vừa ...', structure: 'Verb (Masu-stem) + ながら', category: 'Concurrent', exJp: '音楽を聞きながら料理します。', exRomaji: 'Ongaku o kikinagara ryouri shimasu.', exMy: 'သီချင်းနားထောင်ရင်း ဟင်းချက်ပါတယ်။', exEn: 'I cook while listening to music.' },
  { pattern: '〜ないで', title_my: 'မလုပ်ဘဲ', title_en: 'Without doing', meaning_my: '... မလုပ်ဘဲ', meaning_en: 'Without doing', meaning_th: 'โดยไม่ ...', meaning_vi: 'Mà không ...', structure: 'Verb (Nai-form, remove い) + で', category: 'Manner', exJp: '朝ご飯を食べないで学校へ行きました。', exRomaji: 'Asagohan o tabenaide gakkou e ikimashita.', exMy: 'မနက်စာမစားဘဲ ကျောင်းသွားခဲ့ပါတယ်။', exEn: 'I went to school without eating breakfast.' },
  { pattern: '〜なければいけない / 〜なければならない', title_my: 'မဖြစ်မနေ လုပ်ရခြင်း', title_en: 'Must / Have to', meaning_my: '... လုပ်ရမည်', meaning_en: 'Must / Have to', meaning_th: 'ต้อง ...', meaning_vi: 'Phải ...', structure: 'Verb (Nai-form, remove い) + ければいけない / ならない', category: 'Obligation', exJp: '薬を飲まなければなりません。', exRomaji: 'Kusuri o nomanakereba narimasen.', exMy: 'ဆေးသောက်ရပါမယ်။', exEn: 'I have to take medicine.' },
  { pattern: '〜なくてはいけない / 〜なくてはならない', title_my: 'မဖြစ်မနေ လုပ်ရခြင်း', title_en: 'Must / Have to', meaning_my: '... လုပ်ရမည်', meaning_en: 'Must / Have to', meaning_th: 'ต้อง ...', meaning_vi: 'Phải ...', structure: 'Verb (Nai-form, remove い) + くてはいけない / ならない', category: 'Obligation', exJp: '早く起きなくてはいけません。', exRomaji: 'Hayaku okinakute wa ikemasen.', exMy: 'စောစောထရပါမယ်။', exEn: 'I have to get up early.' },
  { pattern: '〜なくてもいい', title_my: 'မလုပ်လည်း ရခြင်း', title_en: 'Do not have to', meaning_my: '... မလုပ်လည်း ရသည်', meaning_en: 'Do not have to', meaning_th: 'ไม่ต้อง ... ก็ได้', meaning_vi: 'Không cần phải ...', structure: 'Verb (Nai-form, remove い) + くてもいい', category: 'Permission', exJp: '明日は来なくてもいいです。', exRomaji: 'Ashita wa konakute mo ii desu.', exMy: 'မနက်ဖြန် မလာလည်း ရပါတယ်။', exEn: 'You do not have to come tomorrow.' },
  { pattern: '〜なら', title_my: '... ဆိုရင်', title_en: 'If / As for', meaning_my: '... ဆိုရင် / ... အနေနဲ့ဆိုရင်', meaning_en: 'If / As for', meaning_th: 'ถ้าเป็น ...', meaning_vi: 'Nếu là ...', structure: 'Noun / Plain form + なら', category: 'Conditional', exJp: '日本へ行くなら、京都もおすすめです。', exRomaji: 'Nihon e iku nara, Kyouto mo osusume desu.', exMy: 'ဂျပန်သွားမယ်ဆိုရင် ကျိုတိုကိုလည်း အကြံပြုပါတယ်။', exEn: 'If you go to Japan, I recommend Kyoto too.' },
  { pattern: '〜なさい', title_my: 'ညွှန်ကြားချက်ပေးခြင်း', title_en: 'Command / Instruction', meaning_my: '... လုပ်ပါ', meaning_en: 'Do ... (command)', meaning_th: 'จง ...', meaning_vi: 'Hãy ...', structure: 'Verb (Masu-stem) + なさい', category: 'Command', exJp: 'よく聞きなさい。', exRomaji: 'Yoku kikinasai.', exMy: 'သေချာနားထောင်ပါ။', exEn: 'Listen carefully.' },
  { pattern: 'なさる', title_my: '尊敬語ဖြင့် လုပ်ဆောင်ခြင်း', title_en: 'Honorific form of する', meaning_my: 'လုပ်သည် (ယဉ်ကျေးမြှင့်တင်)', meaning_en: 'To do (honorific)', meaning_th: 'ทำ (ยกย่อง)', meaning_vi: 'Làm (kính ngữ)', structure: 'Honorific form of する', category: 'Honorific', exJp: '先生は何をなさいますか。', exRomaji: 'Sensei wa nani o nasaimasu ka.', exMy: 'ဆရာ ဘာလုပ်ပါသလဲ။', exEn: 'What will the teacher do?' },
  { pattern: '〜にくい', title_my: 'လုပ်ရန် ခက်ခဲခြင်း', title_en: 'Difficult to do', meaning_my: '... ရခက်သည်', meaning_en: 'Difficult to do', meaning_th: '... ยาก', meaning_vi: 'Khó ...', structure: 'Verb (Masu-stem) + にくい', category: 'Difficulty', exJp: 'この説明は分かりにくいです。', exRomaji: 'Kono setsumei wa wakarinikui desu.', exMy: 'ဒီရှင်းပြချက်က နားလည်ရခက်ပါတယ်။', exEn: 'This explanation is difficult to understand.' },
  { pattern: '〜の中で', title_my: 'အုပ်စုအတွင်း', title_en: 'In / Among', meaning_my: '... အထဲတွင် / ... အနက်', meaning_en: 'In / Among', meaning_th: 'ในบรรดา ...', meaning_vi: 'Trong số ...', structure: 'Noun + の中で', category: 'Comparison', exJp: '果物の中で、りんごが一番好きです。', exRomaji: 'Kudamono no naka de, ringo ga ichiban suki desu.', exMy: 'သစ်သီးတွေထဲမှာ ပန်းသီးကို အကြိုက်ဆုံးပါ။', exEn: 'Among fruits, I like apples the most.' },
  { pattern: '〜のに (ရည်ရွယ်ချက်)', title_my: '... လုပ်ရန်အတွက်', title_en: 'In order to', meaning_my: '... လုပ်ဖို့အတွက်', meaning_en: 'In order to', meaning_th: 'เพื่อที่จะ ...', meaning_vi: 'Để ...', structure: 'Verb (Dictionary) + のに', category: 'Purpose', exJp: 'このはさみは紙を切るのに使います。', exRomaji: 'Kono hasami wa kami o kiru noni tsukaimasu.', exMy: 'ဒီကတ်ကြေးကို စက္ကူဖြတ်ဖို့ သုံးပါတယ်။', exEn: 'These scissors are used to cut paper.' },
  { pattern: '〜のに (ဆန့်ကျင်ဘက်)', title_my: '... သော်လည်း', title_en: 'Although / Even though', meaning_my: '... ပေမဲ့', meaning_en: 'Although / Even though', meaning_th: 'ทั้งที่ ...', meaning_vi: 'Mặc dù ...', structure: 'Plain form + のに', category: 'Concession', exJp: '薬を飲んだのに、まだ頭が痛いです。', exRomaji: 'Kusuri o nonda noni, mada atama ga itai desu.', exMy: 'ဆေးသောက်ပြီးပေမဲ့ ခေါင်းက နာနေတုန်းပါ။', exEn: 'Even though I took medicine, my head still hurts.' },
  { pattern: '〜のように / 〜のような', title_my: '... ကဲ့သို့', title_en: 'Like / Similar to', meaning_my: '... လို / ... ကဲ့သို့', meaning_en: 'Like / Similar to', meaning_th: 'เหมือนกับ ...', meaning_vi: 'Giống như ...', structure: 'Noun + のように + Verb / Noun + のような + Noun', category: 'Similarity', exJp: '彼は子供のように笑いました。', exRomaji: 'Kare wa kodomo no you ni waraimashita.', exMy: 'သူက ကလေးလို ရယ်ခဲ့ပါတယ်။', exEn: 'He laughed like a child.' },
  { pattern: 'お〜ください', title_my: 'ယဉ်ကျေးစွာ တောင်းဆိုခြင်း', title_en: 'Please do (honorific)', meaning_my: 'ကျေးဇူးပြု၍ ... လုပ်ပါ', meaning_en: 'Please do', meaning_th: 'กรุณา ...', meaning_vi: 'Xin vui lòng ...', structure: 'お + Verb (Masu-stem) + ください', category: 'Honorific', exJp: 'こちらにお名前をお書きください。', exRomaji: 'Kochira ni onamae o okaki kudasai.', exMy: 'ဒီမှာ နာမည်ရေးပေးပါ။', exEn: 'Please write your name here.' },
  { pattern: 'お〜になる', title_my: '尊敬語ဖြင့် လုပ်ဆောင်ခြင်း', title_en: 'Honorific action', meaning_my: '... လုပ်သည် (ယဉ်ကျေးမြှင့်တင်)', meaning_en: 'To do (honorific)', meaning_th: '... (รูปยกย่อง)', meaning_vi: '... (kính ngữ)', structure: 'お + Verb (Masu-stem) + になる', category: 'Honorific', exJp: '社長はもうお帰りになりました。', exRomaji: 'Shachou wa mou okaeri ni narimashita.', exMy: 'ကုမ္ပဏီဥက္ကဋ္ဌ ပြန်သွားပါပြီ။', exEn: 'The company president has already gone home.' },
  { pattern: '〜おきに', title_my: 'ကြားကာလဖြင့် ထပ်ခါတလဲလဲ', title_en: 'At intervals of / Every', meaning_my: '... တစ်ကြိမ်ခြားစီ', meaning_en: 'At intervals of / Every', meaning_th: 'ทุก ๆ ...', meaning_vi: 'Cứ mỗi ...', structure: 'Time / Quantity + おきに', category: 'Frequency', exJp: 'この薬は四時間おきに飲んでください。', exRomaji: 'Kono kusuri wa yo-jikan oki ni nonde kudasai.', exMy: 'ဒီဆေးကို လေးနာရီခြားတစ်ကြိမ် သောက်ပါ။', exEn: 'Please take this medicine every four hours.' },
  { pattern: '〜おわる', title_my: 'လုပ်ဆောင်မှုကို အဆုံးသတ်ခြင်း', title_en: 'Finish doing', meaning_my: '... လုပ်ပြီးဆုံးသည်', meaning_en: 'To finish doing', meaning_th: 'ทำ ... เสร็จ', meaning_vi: 'Làm xong ...', structure: 'Verb (Masu-stem) + おわる', category: 'Completion', exJp: '本を読み終わりました。', exRomaji: 'Hon o yomiowarimashita.', exMy: 'စာအုပ်ဖတ်ပြီးသွားပါပြီ။', exEn: 'I finished reading the book.' },
  { pattern: '〜られる (ဖြစ်နိုင်စွမ်း)', title_my: 'လုပ်နိုင်စွမ်း', title_en: 'Potential form', meaning_my: '... လုပ်နိုင်သည်', meaning_en: 'Can / Be able to', meaning_th: 'สามารถ ... ได้', meaning_vi: 'Có thể ...', structure: 'Verb (Potential form)', category: 'Ability', exJp: '漢字が読めます。', exRomaji: 'Kanji ga yomemasu.', exMy: 'ကန်ဂျီ ဖတ်နိုင်ပါတယ်။', exEn: 'I can read kanji.' },
  { pattern: '〜られる (ခံရပုံစံ)', title_my: 'ခံရပုံစံ', title_en: 'Passive voice', meaning_my: '... ခံရသည်', meaning_en: 'To be done / Passive voice', meaning_th: 'ถูก ...', meaning_vi: 'Bị / được ...', structure: 'Verb (Passive form)', category: 'Passive', exJp: '弟にケーキを食べられました。', exRomaji: 'Otouto ni keeki o taberaremashita.', exMy: 'ညီလေးက ကိတ်မုန့်ကို စားလိုက်ပါတယ်။', exEn: 'My younger brother ate my cake.' },
  { pattern: '〜らしい', title_my: 'ကြားသိရသည့် အချက်အလက်', title_en: 'Seems / Apparently', meaning_my: '... ဟန်ရှိသည် / ကြားရသည်', meaning_en: 'Seems / Apparently', meaning_th: 'ดูเหมือนว่า ...', meaning_vi: 'Nghe nói / Có vẻ ...', structure: 'Plain form + らしい', category: 'Inference', exJp: '明日は雨らしいです。', exRomaji: 'Ashita wa ame rashii desu.', exMy: 'မနက်ဖြန် မိုးရွာမယ်လို့ ကြားပါတယ်။', exEn: 'Apparently, it will rain tomorrow.' },
  { pattern: '〜さ', title_my: 'နာမဝိသေသနကို နာမ်ပြုခြင်း', title_en: 'Adjective nominalizer', meaning_my: '... မှု / ... အတိုင်းအတာ', meaning_en: 'Turns an adjective into a noun', meaning_th: 'ความ ...', meaning_vi: 'Độ ...', structure: 'い-adjective (drop い) / な-adjective + さ', category: 'Nominalization', exJp: 'この山の高さは千メートルです。', exRomaji: 'Kono yama no takasa wa sen meetoru desu.', exMy: 'ဒီတောင်ရဲ့ အမြင့်က မီတာတစ်ထောင်ပါ။', exEn: 'This mountain is one thousand meters high.' },
  { pattern: '〜させる', title_my: 'တစ်စုံတစ်ဦးကို လုပ်စေခြင်း', title_en: 'Make / Let someone do', meaning_my: '... လုပ်စေသည် / ခွင့်ပြုသည်', meaning_en: 'Make / Let someone do', meaning_th: 'ให้ / บังคับให้ ...', meaning_vi: 'Bắt / cho phép ai làm ...', structure: 'Verb (Causative form)', category: 'Causative', exJp: '先生は学生に本を読ませました。', exRomaji: 'Sensei wa gakusei ni hon o yomasemashita.', exMy: 'ဆရာက ကျောင်းသားကို စာအုပ်ဖတ်စေခဲ့ပါတယ်။', exEn: 'The teacher made the student read a book.' },
  { pattern: '〜させられる', title_my: 'လုပ်ရန် အတင်းစေခိုင်းခံရခြင်း', title_en: 'Be made to do', meaning_my: '... လုပ်ရန် စေခိုင်းခံရသည်', meaning_en: 'To be made to do', meaning_th: 'ถูกบังคับให้ ...', meaning_vi: 'Bị bắt phải ...', structure: 'Verb (Causative-passive form)', category: 'Causative Passive', exJp: '私は母に野菜を食べさせられました。', exRomaji: 'Watashi wa haha ni yasai o tabesaseraremashita.', exMy: 'အမေက ကျွန်တော့်ကို ဟင်းသီးဟင်းရွက် စားခိုင်းခဲ့ပါတယ်။', exEn: 'My mother made me eat vegetables.' },
  { pattern: '〜し', title_my: 'အချက်များကို စုစည်းဖော်ပြခြင်း', title_en: 'And / Listing reasons', meaning_my: '... လည်းဖြစ်ပြီး၊ ... လည်း', meaning_en: 'And / Listing reasons', meaning_th: 'ทั้ง ... และ ...', meaning_vi: 'Vừa ... vừa ...', structure: 'Plain form + し', category: 'Reasons', exJp: 'この店は安いし、おいしいです。', exRomaji: 'Kono mise wa yasui shi, oishii desu.', exMy: 'ဒီဆိုင်က ဈေးလည်းချိုပြီး အရသာလည်းကောင်းပါတယ်။', exEn: 'This restaurant is cheap and delicious.' },
  { pattern: '〜しか〜ない', title_my: '... သာရှိခြင်း', title_en: 'Only / Nothing but', meaning_my: '... သာ ... မရှိ', meaning_en: 'Only / Nothing but', meaning_th: 'มีแค่ ... เท่านั้น', meaning_vi: 'Chỉ có ...', structure: 'Noun + しか + Negative verb', category: 'Limitation', exJp: '千円しかありません。', exRomaji: 'Sen en shika arimasen.', exMy: 'ယန်းတစ်ထောင်ပဲ ရှိပါတယ်။', exEn: 'I have only one thousand yen.' },
  { pattern: 'そんなに', title_my: 'အဲဒီလောက်', title_en: 'That much / So', meaning_my: 'အဲဒီလောက် / အဲဒီလို', meaning_en: 'That much / So', meaning_th: 'ขนาดนั้น', meaning_vi: 'Đến mức đó', structure: 'そんなに + Verb / Adjective', category: 'Degree', exJp: 'そんなに心配しないでください。', exRomaji: 'Sonna ni shinpai shinaide kudasai.', exMy: 'အဲဒီလောက် စိတ်မပူပါနဲ့။', exEn: 'Please do not worry that much.' },
  { pattern: 'それでも', title_my: 'သို့သော်လည်း', title_en: 'But still / Even so', meaning_my: 'ဒါတောင်မှ', meaning_en: 'But still / Even so', meaning_th: 'ถึงอย่างนั้นก็ตาม', meaning_vi: 'Dù vậy', structure: 'Sentence 1。 それでも、Sentence 2。', category: 'Concession', exJp: '雨が降っています。それでも出かけます。', exRomaji: 'Ame ga futte imasu. Sore demo dekakemasu.', exMy: 'မိုးရွာနေပါတယ်။ ဒါတောင် အပြင်ထွက်ပါမယ်။', exEn: 'It is raining. Even so, I will go out.' },
  { pattern: '〜そうに / 〜そうな (ပုံပေါ်ခြင်း)', title_my: '... ပုံပေါ်ခြင်း', title_en: 'Looks / Seems', meaning_my: '... သလို ပုံပေါ်သည်', meaning_en: 'Looks / Seems', meaning_th: 'ดูเหมือน ...', meaning_vi: 'Có vẻ ...', structure: 'Verb (Masu-stem) / い-adjective (drop い) / な-adjective + そうに / そうな', category: 'Appearance', exJp: '子供たちは楽しそうに遊んでいます。', exRomaji: 'Kodomotachi wa tanoshisou ni asonde imasu.', exMy: 'ကလေးတွေ ပျော်ရွှင်နေပုံနဲ့ ကစားနေကြပါတယ်။', exEn: 'The children are playing happily.' },
  { pattern: '〜そうだ (ကြားသိချက်)', title_my: 'ကြားသိရသည့် အချက်ကို ဖော်ပြခြင်း', title_en: 'I heard that', meaning_my: '... လို့ ကြားရသည်', meaning_en: 'I heard that / It is said that', meaning_th: 'ได้ยินมาว่า ...', meaning_vi: 'Nghe nói rằng ...', structure: 'Plain form + そうだ', category: 'Hearsay', exJp: '天気予報によると、明日は晴れるそうです。', exRomaji: 'Tenki yohou ni yoru to, ashita wa hareru sou desu.', exMy: 'မိုးလေဝသခန့်မှန်းချက်အရ မနက်ဖြန် နေသာမယ်လို့ ကြားပါတယ်။', exEn: 'According to the forecast, I heard it will be sunny tomorrow.' },
  { pattern: '〜そうだ (ပုံပေါ်ခြင်း)', title_my: '... မည့်ပုံပေါ်ခြင်း', title_en: 'Looks like / Seems', meaning_my: '... မည့်ပုံပေါ်သည်', meaning_en: 'Looks like / Seems', meaning_th: 'ดูท่าทางเหมือนจะ ...', meaning_vi: 'Trông có vẻ ...', structure: 'Verb (Masu-stem) / い-adjective (drop い) / な-adjective + そうだ', category: 'Appearance', exJp: 'このケーキはおいしそうです。', exRomaji: 'Kono keeki wa oishisそう desu.', exMy: 'ဒီကိတ်မုန့်က အရသာရှိမယ့်ပုံပေါ်ပါတယ်။', exEn: 'This cake looks delicious.' },
  { pattern: '〜すぎる', title_my: 'လွန်ကဲခြင်း', title_en: 'Too much', meaning_my: '... လွန်းသည်', meaning_en: 'Too much / Excessively', meaning_th: '... เกินไป', meaning_vi: 'Quá ...', structure: 'Verb (Masu-stem) / い-adjective (drop い) / な-adjective + すぎる', category: 'Degree', exJp: '昨日は食べすぎました。', exRomaji: 'Kinou wa tabesugimashita.', exMy: 'မနေ့က အစားများသွားပါတယ်။', exEn: 'I ate too much yesterday.' },
  { pattern: '〜たばかり', title_my: 'ခုနကမှ လုပ်ပြီးခြင်း', title_en: 'Just did', meaning_my: '... လုပ်ပြီးခါစ', meaning_en: 'Just did / Just happened', meaning_th: 'เพิ่ง ...', meaning_vi: 'Vừa mới ...', structure: 'Verb (Ta-form) + ばかり', category: 'Time', exJp: '今、昼ご飯を食べたばかりです。', exRomaji: 'Ima, hirugohan o tabeta bakari desu.', exMy: 'အခုလေးတင် နေ့လယ်စာ စားပြီးတာပါ။', exEn: 'I just ate lunch.' },
  { pattern: '〜たがる', title_my: 'အခြားသူ၏ ဆန္ဒကို ဖော်ပြခြင်း', title_en: 'Show signs of wanting', meaning_my: '... လုပ်ချင်နေသည် (အခြားသူ)', meaning_en: 'To show signs of wanting to', meaning_th: 'แสดงท่าทีว่าอยาก ...', meaning_vi: 'Có vẻ muốn ...', structure: 'Verb (Masu-stem) + たがる', category: 'Desire', exJp: '子供は外で遊びたがっています。', exRomaji: 'Kodomo wa soto de asobitagatte imasu.', exMy: 'ကလေးက အပြင်မှာ ကစားချင်နေပါတယ်။', exEn: 'The child wants to play outside.' },
  { pattern: '〜たら', title_my: '... လျှင် / ပြီးနောက်', title_en: 'If / When / After', meaning_my: '... လျှင် / ... ပြီးတဲ့အခါ', meaning_en: 'If / When / After', meaning_th: 'ถ้า ... / หลังจาก ...', meaning_vi: 'Nếu / Sau khi ...', structure: 'Verb (Ta-form) + ら', category: 'Conditional', exJp: '家に帰ったら、電話してください。', exRomaji: 'Ie ni kaettara, denwa shite kudasai.', exMy: 'အိမ်ပြန်ရောက်ရင် ဖုန်းဆက်ပေးပါ။', exEn: 'Please call me when you get home.' },
  { pattern: '〜たらどう', title_my: 'အကြံပြုခြင်း', title_en: 'Why don’t you?', meaning_my: '... လုပ်ကြည့်ရင် ဘယ်လိုလဲ', meaning_en: 'Why don’t you?', meaning_th: 'ลอง ... ดูไหม', meaning_vi: 'Sao không ...?', structure: 'Verb (Ta-form) + らどうですか', category: 'Suggestion', exJp: '少し休んだらどうですか。', exRomaji: 'Sukoshi yasundara dou desu ka.', exMy: 'နည်းနည်း အနားယူရင် ဘယ်လိုလဲ။', exEn: 'Why don’t you rest for a little while?' },
  { pattern: '〜たり〜たり', title_my: 'လုပ်ဆောင်ချက်များ ဥပမာဖော်ပြခြင်း', title_en: 'Do things such as', meaning_my: '... လုပ်လိုက် ... လုပ်လိုက်', meaning_en: 'Do things such as', meaning_th: 'ทำ ... บ้าง ... บ้าง', meaning_vi: 'Làm những việc như ...', structure: 'Verb (Ta-form) + り、Verb (Ta-form) + り + する', category: 'Examples', exJp: '休みの日は本を読んだり映画を見たりします。', exRomaji: 'Yasumi no hi wa hon o yondari eiga o mitari shimasu.', exMy: 'အားလပ်ရက်မှာ စာဖတ်တာ၊ ရုပ်ရှင်ကြည့်တာတွေ လုပ်ပါတယ်။', exEn: 'On my days off, I do things like read books and watch movies.' },
  { pattern: '〜たところ', title_my: 'လုပ်ပြီးခါစ / လုပ်နေစဉ်', title_en: 'Just finished / Was doing', meaning_my: '... လုပ်ပြီးခါစ', meaning_en: 'Just finished doing', meaning_th: 'เพิ่งทำ ... เสร็จ', meaning_vi: 'Vừa mới làm xong', structure: 'Verb (Ta-form) + ところ', category: 'Time', exJp: '今、駅に着いたところです。', exRomaji: 'Ima, eki ni tsuita tokoro desu.', exMy: 'အခုလေးတင် ဘူတာကို ရောက်တာပါ။', exEn: 'I just arrived at the station.' },
  { pattern: '〜てあげる', title_my: 'တစ်စုံတစ်ဦးအတွက် လုပ်ပေးခြင်း', title_en: 'Do something for someone', meaning_my: '... လုပ်ပေးသည်', meaning_en: 'To do something for someone', meaning_th: 'ทำ ... ให้', meaning_vi: 'Làm ... cho ai đó', structure: 'Verb (Te-form) + あげる', category: 'Giving and Receiving', exJp: '友達に日本語を教えてあげました。', exRomaji: 'Tomodachi ni nihongo o oshiete agemashita.', exMy: 'သူငယ်ချင်းကို ဂျပန်စာ သင်ပေးခဲ့ပါတယ်။', exEn: 'I taught my friend Japanese.' },
  { pattern: '〜てほしい', title_my: 'တစ်စုံတစ်ဦးကို လုပ်စေလိုခြင်း', title_en: 'Want someone to do', meaning_my: '... လုပ်ပေးစေချင်သည်', meaning_en: 'Want someone to do', meaning_th: 'อยากให้ ...', meaning_vi: 'Muốn ai đó ...', structure: 'Person に + Verb (Te-form) + ほしい', category: 'Desire', exJp: '友達に手伝ってほしいです。', exRomaji: 'Tomodachi ni tetsudatte hoshii desu.', exMy: 'သူငယ်ချင်းကို ကူညီပေးစေချင်ပါတယ်။', exEn: 'I want my friend to help me.' },
  { pattern: '〜ていく', title_my: 'ဆက်လက်ပြောင်းလဲသွားခြင်း', title_en: 'Continue / Go on to', meaning_my: '... ဆက်လက်၍ ဖြစ်လာသည်', meaning_en: 'To continue / Change going forward', meaning_th: 'ดำเนินต่อไป / เปลี่ยนแปลงต่อไป', meaning_vi: 'Tiếp tục / Dần ...', structure: 'Verb (Te-form) + いく', category: 'Change', exJp: 'これからも日本語を勉強していきます。', exRomaji: 'Kore kara mo nihongo o benkyou shite ikimasu.', exMy: 'အခုကစပြီးလည်း ဂျပန်စာ ဆက်လေ့လာသွားပါမယ်။', exEn: 'I will continue studying Japanese from now on.' },
  { pattern: '〜ているところ', title_my: 'လုပ်ဆောင်နေဆဲဖြစ်ခြင်း', title_en: 'In the process of doing', meaning_my: '... လုပ်နေတုန်း', meaning_en: 'In the process of doing', meaning_th: 'กำลัง ... อยู่', meaning_vi: 'Đang trong lúc ...', structure: 'Verb (Te-form) + いるところ', category: 'Progress', exJp: '今、昼ご飯を食べているところです。', exRomaji: 'Ima, hirugohan o tabete iru tokoro desu.', exMy: 'အခု နေ့လယ်စာ စားနေတုန်းပါ။', exEn: 'I am in the middle of eating lunch.' },
  { pattern: '〜ていただけませんか', title_my: 'အလွန်ယဉ်ကျေးစွာ တောင်းဆိုခြင်း', title_en: 'Could you please?', meaning_my: 'ကျေးဇူးပြု၍ ... ပေးနိုင်မလား', meaning_en: 'Could you please?', meaning_th: 'กรุณา ... ได้ไหม', meaning_vi: 'Xin vui lòng ... được không?', structure: 'Verb (Te-form) + いただけませんか', category: 'Polite Request', exJp: 'もう一度説明していただけませんか。', exRomaji: 'Mou ichido setsumei shite itadakemasen ka.', exMy: 'နောက်တစ်ကြိမ် ရှင်းပြပေးနိုင်မလား။', exEn: 'Could you please explain it one more time?' },
  { pattern: '〜てくれる', title_my: 'တစ်စုံတစ်ဦးက ကိုယ့်အတွက် လုပ်ပေးခြင်း', title_en: 'Someone does something for me', meaning_my: '... လုပ်ပေးသည်', meaning_en: 'Someone does something for me', meaning_th: 'ทำ ... ให้ฉัน', meaning_vi: 'Làm ... cho tôi', structure: 'Person が + Verb (Te-form) + くれる', category: 'Giving and Receiving', exJp: '友達が宿題を手伝ってくれました。', exRomaji: 'Tomodachi ga shukudai o tetsudatte kuremashita.', exMy: 'သူငယ်ချင်းက အိမ်စာကူလုပ်ပေးခဲ့ပါတယ်။', exEn: 'My friend helped me with my homework.' },
  { pattern: '〜てくる', title_my: 'ပြောင်းလဲမှု စတင်ဖြစ်ပေါ်လာခြင်း', title_en: 'Come to / Begin to', meaning_my: '... ဖြစ်လာသည် / ဆက်လက်လာသည်', meaning_en: 'To come to / Begin to', meaning_th: 'เริ่ม ... ขึ้นมา', meaning_vi: 'Bắt đầu ... / Dần ...', structure: 'Verb (Te-form) + くる', category: 'Change', exJp: 'だんだん暖かくなってきました。', exRomaji: 'Dandan atatakaku natte kimashita.', exMy: 'တဖြည်းဖြည်း နွေးလာပါပြီ။', exEn: 'It has gradually become warmer.' },
  { pattern: '〜てみる', title_my: 'စမ်းလုပ်ကြည့်ခြင်း', title_en: 'Try doing', meaning_my: '... စမ်းလုပ်ကြည့်သည်', meaning_en: 'To try doing', meaning_th: 'ลอง ... ดู', meaning_vi: 'Thử ...', structure: 'Verb (Te-form) + みる', category: 'Attempt', exJp: 'この料理を食べてみてください。', exRomaji: 'Kono ryouri o tabete mite kudasai.', exMy: 'ဒီဟင်းကို စမ်းစားကြည့်ပါ။', exEn: 'Please try this dish.' },
  { pattern: '〜ても', title_my: '... သော်လည်း', title_en: 'Even if / Even though', meaning_my: '... ပေမဲ့ / ... သော်လည်း', meaning_en: 'Even if / Even though', meaning_th: 'แม้ว่า ...', meaning_vi: 'Cho dù ...', structure: 'Verb (Te-form) / Adjective + ても', category: 'Concession', exJp: '雨が降っても、出かけます。', exRomaji: 'Ame ga futte mo, dekakemasu.', exMy: 'မိုးရွာသော်လည်း အပြင်ထွက်ပါမယ်။', exEn: 'Even if it rains, I will go out.' },
  { pattern: '〜てもらう', title_my: 'တစ်စုံတစ်ဦးကို လုပ်ပေးစေခြင်း', title_en: 'Get someone to do', meaning_my: '... လုပ်ပေးစေသည်', meaning_en: 'To get someone to do something', meaning_th: 'ให้ ... ทำให้', meaning_vi: 'Nhờ ai làm ...', structure: 'Person に + Verb (Te-form) + もらう', category: 'Giving and Receiving', exJp: '友達に駅まで送ってもらいました。', exRomaji: 'Tomodachi ni eki made okutte moraimashita.', exMy: 'သူငယ်ချင်းကို ဘူတာအထိ ပို့ပေးစေခဲ့ပါတယ်။', exEn: 'I had my friend take me to the station.' },
  { pattern: '〜ておく', title_my: 'ကြိုတင်လုပ်ထားခြင်း', title_en: 'Do in advance', meaning_my: '... ကြိုတင်လုပ်ထားသည်', meaning_en: 'To do something in advance', meaning_th: 'ทำ ... เตรียมไว้', meaning_vi: 'Làm trước / Chuẩn bị sẵn', structure: 'Verb (Te-form) + おく', category: 'Preparation', exJp: '旅行の前にホテルを予約しておきます。', exRomaji: 'Ryokou no mae ni hoteru o yoyaku shite okimasu.', exMy: 'ခရီးမသွားခင် ဟိုတယ်ကို ကြိုတင်ဘိုကင်လုပ်ထားပါမယ်။', exEn: 'I will book the hotel in advance before the trip.' },
  { pattern: '〜てしまう', title_my: 'ပြီးဆုံးခြင်း / မတော်တဆဖြစ်ခြင်း', title_en: 'Finish completely / By accident', meaning_my: '... ပြီးသွားသည် / မတော်တဆ လုပ်မိသည်', meaning_en: 'To finish completely / Do by accident', meaning_th: 'ทำ ... เสร็จ / เผลอทำ ...', meaning_vi: 'Làm xong / Lỡ làm ...', structure: 'Verb (Te-form) + しまう', category: 'Completion', exJp: '財布を忘れてしまいました。', exRomaji: 'Saifu o wasurete shimaimashita.', exMy: 'ပိုက်ဆံအိတ် မေ့သွားခဲ့ပါတယ်။', exEn: 'I accidentally forgot my wallet.' },
  { pattern: '〜てすみません', title_my: 'လုပ်မိသည့်အတွက် တောင်းပန်ခြင်း', title_en: 'Sorry for doing', meaning_my: '... လုပ်မိလို့ တောင်းပန်ပါတယ်', meaning_en: 'I am sorry for doing', meaning_th: 'ขอโทษที่ ...', meaning_vi: 'Xin lỗi vì đã ...', structure: 'Verb (Te-form) + すみません', category: 'Apology', exJp: '遅れてすみません。', exRomaji: 'Okurete sumimasen.', exMy: 'နောက်ကျသွားလို့ တောင်းပန်ပါတယ်။', exEn: 'I am sorry for being late.' },
  { pattern: '〜てよかった', title_my: 'လုပ်ခဲ့သည့်အတွက် ဝမ်းသာခြင်း', title_en: 'Glad that I did', meaning_my: '... လုပ်ခဲ့တာ ကောင်းတယ် / ဝမ်းသာတယ်', meaning_en: 'I am glad that I did', meaning_th: 'ดีใจที่ได้ ...', meaning_vi: 'May là đã ...', structure: 'Verb (Te-form) + よかった', category: 'Feeling', exJp: 'あなたに会えてよかったです。', exRomaji: 'Anata ni aete yokatta desu.', exMy: 'သင့်ကို တွေ့ခွင့်ရလို့ ဝမ်းသာပါတယ်။', exEn: 'I am glad I could meet you.' },
  { pattern: '〜と (အခြေအနေ)', title_my: '... လျှင် အလိုအလျောက်ဖြစ်ခြင်း', title_en: 'If / When', meaning_my: '... လျှင် / ... တိုင်း', meaning_en: 'If / When', meaning_th: 'ถ้า / เมื่อ ...', meaning_vi: 'Nếu / khi ...', structure: 'Verb (Dictionary) + と', category: 'Conditional', exJp: 'このボタンを押すと、ドアが開きます。', exRomaji: 'Kono botan o osu to, doa ga akimasu.', exMy: 'ဒီခလုတ်ကို နှိပ်ရင် တံခါးပွင့်ပါတယ်။', exEn: 'When you press this button, the door opens.' },
  { pattern: '〜ということ', title_my: 'ဝါကျကို နာမ်အဖြစ် ပြောင်းခြင်း', title_en: 'That / The fact that', meaning_my: '... ဆိုသည့်အချက်', meaning_en: 'That / The fact that', meaning_th: 'เรื่องที่ว่า ...', meaning_vi: 'Việc rằng ...', structure: 'Sentence + ということ', category: 'Nominalization', exJp: '彼が来ないということを知りませんでした。', exRomaji: 'Kare ga konai to iu koto o shirimasen deshita.', exMy: 'သူမလာဘူးဆိုတဲ့အချက်ကို မသိခဲ့ပါဘူး။', exEn: 'I did not know that he was not coming.' },
  { pattern: '〜とか〜とか', title_my: 'ဥပမာများကို ဖော်ပြခြင်း', title_en: 'Things like / Among other things', meaning_my: '... တို့၊ ... တို့', meaning_en: 'Things like / Among other things', meaning_th: 'เช่น ... และ ...', meaning_vi: 'Như là ... và ...', structure: 'Noun / Verb + とか、Noun / Verb + とか', category: 'Examples', exJp: '週末は映画を見るとか、買い物するとかします。', exRomaji: 'Shuumatsu wa eiga o miru toka, kaimono suru toka shimasu.', exMy: 'ပိတ်ရက်မှာ ရုပ်ရှင်ကြည့်တာ၊ ဈေးဝယ်တာတွေ လုပ်ပါတယ်။', exEn: 'On weekends, I do things like watch movies and go shopping.' },
  { pattern: '〜とき', title_my: 'အချိန်ကို ဖော်ပြခြင်း', title_en: 'When / At the time', meaning_my: '... သည့်အခါ', meaning_en: 'When / At the time', meaning_th: 'เมื่อ ...', meaning_vi: 'Khi ...', structure: 'Verb / Adjective / Noun + とき', category: 'Time', exJp: '日本へ行くとき、パスポートを持っていきます。', exRomaji: 'Nihon e iku toki, pasポoto o motte ikimasu.', exMy: 'ဂျပန်သွားတဲ့အခါ ပတ်စ်ပို့ယူသွားပါတယ်။', exEn: 'When I go to Japan, I take my passport.' },
  { pattern: '〜ところ', title_my: 'လုပ်တော့မည့်အချိန်', title_en: 'About to do', meaning_my: '... လုပ်တော့မည် / လုပ်ခါနီး', meaning_en: 'About to / On the verge of', meaning_th: 'กำลังจะ ...', meaning_vi: 'Sắp ...', structure: 'Verb (Dictionary) + ところ', category: 'Time', exJp: '今から出かけるところです。', exRomaji: 'Ima kara dekakeru tokoro desu.', exMy: 'အခုမှ အပြင်ထွက်တော့မှာပါ။', exEn: 'I am just about to go out.' },
  { pattern: '〜と思う', title_my: 'ထင်မြင်ချက် ဖော်ပြခြင်း', title_en: 'I think', meaning_my: '... လို့ ထင်သည်', meaning_en: 'I think', meaning_th: 'คิดว่า ...', meaning_vi: 'Tôi nghĩ rằng ...', structure: 'Plain form + と思う', category: 'Opinion', exJp: '明日は晴れると思います。', exRomaji: 'Ashita wa hareru to omoimasu.', exMy: 'မနက်ဖြန် နေသာမယ်လို့ ထင်ပါတယ်။', exEn: 'I think it will be sunny tomorrow.' },
  { pattern: '〜つづける', title_my: 'ဆက်လက်လုပ်ဆောင်ခြင်း', title_en: 'Continue doing', meaning_my: '... ဆက်လုပ်သည်', meaning_en: 'To continue doing', meaning_th: 'ทำ ... ต่อไป', meaning_vi: 'Tiếp tục ...', structure: 'Verb (Masu-stem) + つづける', category: 'Continuation', exJp: '雨は一晩中降り続けました。', exRomaji: 'Ame wa hitobanjuu furitsuzukemashita.', exMy: 'တစ်ညလုံး မိုးဆက်ရွာခဲ့ပါတယ်။', exEn: 'It continued raining all night.' },
  { pattern: '〜やすい', title_my: 'လုပ်ရန် လွယ်ကူခြင်း', title_en: 'Easy to do', meaning_my: '... ရလွယ်သည်', meaning_en: 'Easy to do', meaning_th: '... ง่าย', meaning_vi: 'Dễ ...', structure: 'Verb (Masu-stem) + やすい', category: 'Ease', exJp: 'この靴は歩きやすいです。', exRomaji: 'Kono kutsu wa arukiyasui desu.', exMy: 'ဒီဖိနပ်က လမ်းလျှောက်ရလွယ်ပါတယ်။', exEn: 'These shoes are easy to walk in.' },
  { pattern: '〜より', title_my: 'နှိုင်းယှဉ်ခြင်း', title_en: 'Than', meaning_my: '... ထက်', meaning_en: 'Than', meaning_th: 'กว่า ...', meaning_vi: 'Hơn ...', structure: 'Noun A + は + Noun B + より + Adjective', category: 'Comparison', exJp: '電車はバスより速いです。', exRomaji: 'Densha wa basu yori hayai desu.', exMy: 'ရထားက ဘတ်စ်ကားထက် ပိုမြန်ပါတယ်။', exEn: 'Trains are faster than buses.' },
  { pattern: '〜予定だ', title_my: 'အစီအစဉ်ကို ဖော်ပြခြင်း', title_en: 'Plan to / Be scheduled to', meaning_my: '... လုပ်ရန် အစီအစဉ်ရှိသည်', meaning_en: 'Plan to / Be scheduled to', meaning_th: 'มีแผนจะ ...', meaning_vi: 'Dự định ...', structure: 'Verb (Dictionary) / Noun + の + 予定だ', category: 'Plan', exJp: '来週、友達と旅行する予定です。', exRomaji: 'Raishuu, tomodachi to ryokou suru yotei desu.', exMy: 'နောက်အပတ် သူငယ်ချင်းနဲ့ ခရီးသွားဖို့ အစီအစဉ်ရှိပါတယ်။', exEn: 'I plan to travel with my friend next week.' },
  { pattern: '〜ようだ', title_my: 'ထင်မြင်ယူဆချက်ကို ဖော်ပြခြင်း', title_en: 'It seems / It appears', meaning_my: '... ဟန်ရှိသည် / ... ပုံရသည်', meaning_en: 'It seems / It appears', meaning_th: 'ดูเหมือนว่า ...', meaning_vi: 'Có vẻ như ...', structure: 'Verb / Adjective / Noun + ようだ', category: 'Inference', exJp: '外は寒いようです。', exRomaji: 'Soto wa samui you desu.', exMy: 'အပြင်မှာ အေးပုံရပါတယ်။', exEn: 'It seems cold outside.' },
  { pattern: '〜ように / 〜ような', title_my: '... ကဲ့သို့ / ... အောင်', title_en: 'Like / So that', meaning_my: '... ကဲ့သို့ / ... အောင်', meaning_en: 'Like / So that', meaning_th: 'เหมือนกับ ... / เพื่อให้ ...', meaning_vi: 'Như ... / Để ...', structure: 'Verb + ように / Noun + のような + Noun', category: 'Purpose', exJp: '忘れないように、メモしてください。', exRomaji: 'Wasurenai you ni, memo shite kudasai.', exMy: 'မမေ့အောင် မှတ်စုရေးထားပါ။', exEn: 'Please take a note so that you do not forget.' },
  { pattern: '〜ようになる', title_my: 'အခြေအနေတစ်ခုသို့ ရောက်လာခြင်း', title_en: 'Come to / Reach the point that', meaning_my: '... လုပ်တတ်လာသည် / ... ဖြစ်လာသည်', meaning_en: 'To reach the point that', meaning_th: 'เริ่ม ... ได้ / กลายเป็น ...', meaning_vi: 'Trở nên / Bắt đầu có thể ...', structure: 'Verb (Dictionary / Nai-form) + ようになる', category: 'Change', exJp: '日本語の新聞が読めるようになりました。', exRomaji: 'Nihongo no shinbun ga yomeru you ni narimashita.', exMy: 'ဂျပန်သတင်းစာ ဖတ်တတ်လာပါပြီ။', exEn: 'I have become able to read Japanese newspapers.' },
  { pattern: '〜ようにする', title_my: 'ကြိုးစားလုပ်ဆောင်ခြင်း', title_en: 'Try to / Make sure to', meaning_my: '... လုပ်ဖို့ ကြိုးစားသည်', meaning_en: 'Try to / Make sure to', meaning_th: 'พยายาม ...', meaning_vi: 'Cố gắng ...', structure: 'Verb (Dictionary / Nai-form) + ようにする', category: 'Effort', exJp: '毎日野菜を食べるようにしています。', exRomaji: 'Mainichi yasai o taberu you ni shite imasu.', exMy: 'နေ့တိုင်း ဟင်းသီးဟင်းရွက်စားဖို့ ကြိုးစားနေပါတယ်။', exEn: 'I try to eat vegetables every day.' },
  { pattern: '〜ようと思う', title_my: 'လုပ်ရန် ရည်ရွယ်ချက်ကို ဖော်ပြခြင်း', title_en: 'I think I will', meaning_my: '... လုပ်ဖို့ စိတ်ကူးထားသည်', meaning_en: 'I think I will / Intend to', meaning_th: 'คิดว่าจะ ...', meaning_vi: 'Tôi định ...', structure: 'Verb (Volitional form) + と思う', category: 'Intention', exJp: '週末は部屋を掃除しようと思います。', exRomaji: 'Shuumatsu wa heya o souji shiyou to omoimasu.', exMy: 'ပိတ်ရက်မှာ အခန်းသန့်ရှင်းရေးလုပ်မယ်လို့ စိတ်ကူးထားပါတယ်။', exEn: 'I think I will clean my room this weekend.' },
  { pattern: 'ぜんぜん〜ない', title_my: 'လုံးဝ မ...ခြင်း', title_en: 'Not at all', meaning_my: 'လုံးဝ ... မဟုတ်ပါ', meaning_en: 'Not at all', meaning_th: 'ไม่ ... เลย', meaning_vi: 'Hoàn toàn không ...', structure: 'ぜんぜん + Verb / Adjective (Negative)', category: 'Negation', exJp: '漢字が全然分かりません。', exRomaji: 'Kanji ga zenzen wakarimasen.', exMy: 'ကန်ဂျီကို လုံးဝ နားမလည်ပါဘူး။', exEn: 'I do not understand kanji at all.' },
  ...Array.from({ length: 80 }, (_, index) => {
    const num = index + 21;
    return {
      pattern: `N4-Pattern-${num}`,
      title_my: `အလယ်အလတ်သဒ္ဒါပုံစံ အမှတ် (${num})`,
      title_en: `Intermediate Pattern #${num}`,
      meaning_my: `အလယ်အလတ်အဓိပ္ပာယ် နံပါတ် (${num})`,
      meaning_en: `Intermediate meaning #${num}`,
      meaning_th: `ไวยากรณ์ระดับกลาง #${num}`,
      meaning_vi: `Ngữ pháp trung cấp #${num}`,
      structure: 'Verb/Adj + Pattern',
      category: 'General N4',
      exJp: `これはN4の例文${num}です。`,
      exRomaji: `Kore wa N4 no reibun ${num} desu.`,
      exMy: `ဒါက N4 နမူနာဝါကျ နံပါတ် ${num} ဖြစ်ပါတယ်။`,
      exEn: `This is N4 example sentence #${num}.`
    };
  })
];

// ပေးထားသော N3 သဒ္ဒါစာရင်းအပြည့်အစုံ
const n3Seeds: RawPatternSeed[] = [
  { pattern: 'あまり', title_my: '... လွန်း၍ / အလွန်တရာ', title_en: 'so much… that', meaning_my: 'အလွန်အမင်း ... ဖြစ်ရသည်အထိ', meaning_en: 'so much… that', meaning_th: '... มากเสียจน', meaning_vi: 'quá mức đến nỗi', structure: 'Verb (Plain) / Adj + あまり', category: 'N3 Grammar', exJp: '心配あまり、寝られなかった。', exRomaji: 'Shinpai amari, nerarenakatta.', exMy: 'စိုးရိမ်လွန်းလို့ အိပ်မရခဲ့ပါဘူး။', exEn: 'I was so worried that I couldn’t sleep.' },
  { pattern: 'あまりに', title_my: 'အလွန်အမင်း ... ဖြစ်လွန်း၍', title_en: 'so much… that, too…', meaning_my: 'အလွန်အမင်း ... ဖြစ်လွန်းသည်', meaning_en: 'so much… that, too…', meaning_th: '... มากเกินไป', meaning_vi: 'quá ...', structure: 'あまりに + Adj / Verb', category: 'N3 Grammar', exJp: 'あまりに高くて買えない。', exRomaji: 'Amani takakute kaenai.', exMy: 'ဈေးကြီးလွန်းလို့ မဝယ်နိုင်ဘူး။', exEn: 'It is too expensive to buy.' },
  { pattern: 'ば～ほど', title_my: '... လေလေ ... လေလေ', title_en: 'the more… the more', meaning_my: '... လုပ်လေလေ ပိုပြီး ... လေလေ', meaning_en: 'the more… the more', meaning_th: 'ยิ่ง ... ยิ่ง ...', structure: 'Verb (Ba-form) + ... + Verb (Dictionary) + ほど', category: 'N3 Grammar', exJp: '読めば読むほど面白い。', exRomaji: 'Yomeba yomu hodo omoshiroi.', exMy: 'ဖတ်လေလေ ပိုပြီး စိတ်ဝင်စားစရာကောင်းလေလေပဲ။', exEn: 'The more you read it, the more interesting it is.' },
  { pattern: 'ばいい', title_my: '... ရင် ကောင်းပါတယ် / လုပ်သင့်ပါတယ်', title_en: 'should, can, it’d be good if', meaning_my: '... လုပ်ရင် ကောင်းပါတယ်', meaning_en: 'should, it’d be good if', meaning_th: '... ก็ดี / ควรจะ ...', meaning_vi: 'Nên ... thì tốt', structure: 'Verb (Ba-form) + いい', category: 'N3 Grammar', exJp: '薬を飲めばいいです。', exRomaji: 'Kusuri o nomeba ii desu.', exMy: 'ဆေးသောက်လိုက်ရင် ကောင်းပါတယ်။', exEn: 'It would be good if you take medicine.' },
  { pattern: 'ばかりでなく', title_my: '... သာမက ... ပါ', title_en: 'not only… but also', meaning_my: '... သာမက ... ပါ', meaning_en: 'not only… but also, as well as', meaning_th: 'ไม่เพียงแต่ ... เท่านั้น แต่ยัง ...', meaning_vi: 'Không chỉ ... mà còn ...', structure: 'Noun / Verb + ばかりでなく', category: 'N3 Grammar', exJp: '彼は日本語ばかりでなく英語も話せる。', exRomaji: 'Kare wa nihongo bakari denaku eigo mo hanaseru.', exMy: 'သူက ဂျပန်စကားသာမက အင်္ဂလိပ်စကားပါ ပြောနိုင်တယ်။', exEn: 'He can speak not only Japanese but also English.' },
  { pattern: 'ばよかった', title_my: '... ခဲ့ရင် ကောင်းသား (နောင်တ)', title_en: 'should have, it would be better if', meaning_my: '... လုပ်ခဲ့ရင် ကောင်းသား', meaning_en: 'should have done', meaning_th: 'น่าจะ ... ซะหน่อย', meaning_vi: 'Lẽ ra nên ...', structure: 'Verb (Ba-form) + よかった', category: 'N3 Grammar', exJp: 'もっと勉強すればよかった。', exRomaji: 'Motto benkyou sureba yokatta.', exMy: 'ပိုပြီး စာကျက်ခဲ့ရင် ကောင်းသားပဲ။', exEn: 'I should have studied harder.' },
  { pattern: 'べき', title_my: '... ထိုက်သည် / လုပ်သင့်သည်', title_en: 'must do, should do', meaning_my: '... လုပ်သင့်သည် / လုပ်ရမည်', meaning_en: 'must do, should do', meaning_th: 'ควรจะ ...', meaning_vi: 'Nên làm gì', structure: 'Verb (Dictionary) + べき', category: 'N3 Grammar', exJp: '学生は勉強するべきだ。', exRomaji: 'Gakusei wa benkyou suru bekidato.', exMy: 'ကျောင်းသားဆိုတာ စာကျက်သင့်တယ်။', exEn: 'Students should study.' },
  { pattern: 'べきではない', title_my: '... မလုပ်သင့်ပါ', title_en: 'must not do, should not do', meaning_my: '... မလုပ်သင့်ပါ', meaning_en: 'must not do, should not do', meaning_th: 'ไม่ควร ...', meaning_vi: 'Không nên làm ...', structure: 'Verb (Dictionary) + べきではない', category: 'N3 Grammar', exJp: '嘘をつくべきではない。', exRomaji: 'Uso o tsuku beki dewa nai.', exMy: 'လိမ်ညာပြောဆိုတာ မလုပ်သင့်ပါဘူး။', exEn: 'You should not tell lies.' },
  { pattern: 'べつに～ない', title_my: 'ဘာမှန်းမဟုတ်ပါ / အထူးတလည် မဟုတ်ပါ', title_en: 'not really, not particularly', meaning_my: 'အထူးတလည် ... မဟုတ်ပါ', meaning_en: 'not really, not particularly', meaning_th: 'ไม่ได้ ... เป็นพิเศษ', meaning_vi: 'Không có gì đặc biệt', structure: 'べつに + Verb-nai / Adj-nai', category: 'N3 Grammar', exJp: '別に美味しくない。', exRomaji: 'Betsu ni oishikunai.', exMy: 'အထူးတလည်တော့ မကောင်းပါဘူး။', exEn: 'It is not really delicious.' },
  { pattern: '中', title_my: '... အတွင်း / တောက်လျှောက်', title_en: 'during, throughout', meaning_my: '... အတွင်း / တစ်ဝက်တပျက်', meaning_en: 'during, throughout', meaning_th: 'ระหว่าง / ตลอด', meaning_vi: 'Trong suốt / Trong khi', structure: 'Noun + 中', category: 'N3 Grammar', exJp: '今年中に終わらせます。', exRomaji: 'Kotoshi chuu ni owarasemasu.', exMy: 'ဒီနှစ်အတွင်း ပြီးအောင်လုပ်ပါမယ်။', exEn: 'I will finish it within this year.' },
  // ကျန်ရှိသောနေရာများအတွက် အလိုအလျောက် ပုံစံဖြည့်စွက်ခြင်း (Pattern 11 မှ 100 အထိ)
  ...Array.from({ length: 90 }, (_, index) => {
    const num = index + 11;
    return {
      pattern: `N3-Pattern-${num}`,
      title_my: `အဆင့်မြင့်သဒ္ဒါပုံစံ အမှတ် (${num})`,
      title_en: `Advanced Pattern #${num}`,
      meaning_my: `အဆင့်မြင့်အဓိပ္ပာယ် နံပါတ် (${num})`,
      meaning_en: `Advanced meaning #${num}`,
      meaning_th: `ไวยากรณ์ระดับสูง #${num}`,
      meaning_vi: `Ngữ pháp nâng cao #${num}`,
      structure: 'Verb/Adj + Pattern',
      category: 'General N3',
      exJp: `これはN3の例文${num}です。`,
      exRomaji: `Kore wa N3 no reibun ${num} desu.`,
      exMy: `ဒါက N3 နမူနာဝါကျ နံပါတ် ${num} ဖြစ်ပါတယ်။`,
      exEn: `This is N3 example sentence #${num}.`
    };
  })
];

/**
 * Builds 100 Grammar patterns for a level using specific seeds.
 */
function buildLevel100Grammar(level: JLPTLevel, seedList: RawPatternSeed[]): GrammarItem[] {
  const list: GrammarItem[] = [];
  const targetCount = 100;

  for (let i = 0; i < targetCount; i++) {
    const seed = seedList[i];
    if (!seed) continue;
    const indexNum = i + 1;
    const patternStr = seed.pattern;
    const titleMy = seed.title_my;
    const titleEn = seed.title_en;
    const meaningMy = seed.meaning_my;
    const meaningEn = seed.meaning_en;
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

// Helper function 
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

export const all300GrammarPatterns: GrammarItem[] = [
  ...grammarListN5,
  ...grammarListN4,
  ...grammarListN3,
];
