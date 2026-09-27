import { Language } from '../types/common';
import { VerbConjugations, VerbGroup } from '../types/verb';

export interface FormRuleExplanation {
  name_jp: string;
  name_my: string;
  name_en: string;
  name_th?: string;
  name_vi?: string;
  rule_group1_my: string;
  rule_group1_en: string;
  rule_group2_my: string;
  rule_group2_en: string;
  rule_group3_my: string;
  rule_group3_en: string;
  usage_my: string;
  usage_en: string;
}

export const conjugationRulesGuide: Record<string, FormRuleExplanation> = {
  masu: {
    name_jp: 'ます形 (Masu-kei)',
    name_my: 'ယဉ်ကျေးသော ပုံစံ',
    name_en: 'Polite Present Form',
    name_th: 'รูปสุภาพ (Masu-form)',
    name_vi: 'Thể lịch sự (Thể Masu)',
    rule_group1_my: 'နောက်ဆုံး "u" အသံကို "i" အသံပြောင်းပြီး "ます" ပေါင်းပါ (ဥပမာ- 書く -> 書きます၊ 飲む -> 飲みます)',
    rule_group1_en: 'Change the final "u" row sound to "i" row and add "masu" (e.g. kaku -> kakimasu, nomu -> nomimasu)',
    rule_group2_my: 'နောက်ဆုံး "る" ဖြုတ်ပြီး "ます" ပေါင်းပါ (ဥပမာ- 食べる -> 食べます)',
    rule_group2_en: 'Drop the final "ru" and add "masu" (e.g. taberu -> tabemasu)',
    rule_group3_my: 'する -> します, 来る (くる) -> 来ます (きます)',
    rule_group3_en: 'suru -> shimasu, kuru -> kimasu',
    usage_my: 'နေ့စဉ် ယဉ်ကျေးစွာ ပြောဆိုရာတွင် အသုံးအများဆုံး အခြေခံ ပုံစံဖြစ်ပါသည်။',
    usage_en: 'Standard polite form used in daily conversation and business.',
  },
  dictionary: {
    name_jp: '辞書形 / 原形 (Jisho-kei)',
    name_my: 'အဘိဓာန် ပုံစံ / မူလပုံစံ',
    name_en: 'Dictionary / Plain Form',
    name_th: 'รูปพจนานุกรม (Dictionary form)',
    name_vi: 'Thể từ điển (Thể nguyên mẫu)',
    rule_group1_my: 'အခြေခံ "u" အသံဖြင့် အဆုံးသတ်သည် (書く, 飲む, 行く, 話す)',
    rule_group1_en: 'Ends with "u" row sound (kaku, nomu, iku, hanasu)',
    rule_group2_my: 'နောက်ဆုံး "る" ဖြင့် အမြဲ အဆုံးသတ်သည် (食べる, 見る, 起きる)',
    rule_group2_en: 'Always ends with "ru" preceded by "i" or "e" vowel (taberu, miru)',
    rule_group3_my: 'する, 来る (くる)',
    rule_group3_en: 'suru, kuru',
    usage_my: 'အဘိဓာန်များတွင် ရှာဖွေနိုင်ပြီး ရင်းနှီးသူအချင်းချင်း အသုံးများပါသည်။',
    usage_en: 'Base form found in dictionaries; informal speech.',
  },
  te: {
    name_jp: 'て形 (Te-kei)',
    name_my: 'တဲ ပုံစံ (ဆက်စပ်/တောင်းဆို)',
    name_en: 'Te Form (Connecting/Request)',
    name_th: 'รูปเตะ (Te-form)',
    name_vi: 'Thể Te (Nối câu / Yêu cầu)',
    rule_group1_my: 'う/つ/る -> って, む/ぶ/ぬ -> んで, く -> いて (行く->行って), ぐ -> いде, す -> して',
    rule_group1_en: 'u/tsu/ru -> tte, mu/bu/nu -> nde, ku -> ite (iku->itte), gu -> ide, su -> shite',
    rule_group2_my: 'နောက်ဆုံး "る" ဖြုတ်ပြီး "て" ပေါင်းပါ (ဥပမာ- 食べる -> 食べて)',
    rule_group2_en: 'Drop "ru" and add "te" (e.g. taberu -> tabete)',
    rule_group3_my: 'する -> して, 来る (くる) -> 来て (きて)',
    rule_group3_en: 'suru -> shite, kuru -> kite',
    usage_my: 'တောင်းဆိုခြင်း (~てください)၊ ဆက်စပ်ခြင်း၊ ပြုလုပ်နေဆဲကာလ (~ています) တို့တွင် အဓိက သုံးပါသည်။',
    usage_en: 'Used for connecting sentences, making requests (~te kudasai), and ongoing actions (~te imasu).',
  },
  ta: {
    name_jp: 'た形 (Ta-kei)',
    name_my: 'အတိတ်ကာလ မူလပုံစံ',
    name_en: 'Plain Past Form',
    name_th: 'รูปอดีตธรรมดา (Ta-form)',
    name_vi: 'Thể quá khứ ngắn (Thể Ta)',
    rule_group1_my: 'Te-form အတိုင်းဖြစ်ပြီး て နေရာတွင် た၊ で နေရာတွင် だ ပြောင်းပါ (飲んで -> 飲んだ)',
    rule_group1_en: 'Same rule as Te-form, replace "te" with "ta" and "de" with "da" (e.g. nonde -> nonda)',
    rule_group2_my: 'နောက်ဆုံး "る" ဖြုတ်ပြီး "た" ပေါင်းပါ (食べる -> 食べた)',
    rule_group2_en: 'Drop "ru" and add "ta" (e.g. taberu -> tabeta)',
    rule_group3_my: 'する -> した, 来る -> 来た (きた)',
    rule_group3_en: 'suru -> shita, kuru -> kita',
    usage_my: 'ပြီးဆုံးသွားသော အတိတ်ကာလ (Past tense) သို့မဟုတ် အတွေ့အကြုံ (~たことがある) တွင် သုံးပါသည်။',
    usage_en: 'Expresses completed past actions or experiences (~ta koto ga aru).',
  },
  nai: {
    name_jp: 'ない形 (Nai-kei)',
    name_my: 'ငြင်းပယ် ပုံစံ',
    name_en: 'Plain Negative Form',
    name_th: 'รูปปฏิเสธ (Nai-form)',
    name_vi: 'Thể phủ định ngắn (Thể Nai)',
    rule_group1_my: 'နောက်ဆုံး "u" အသံကို "a" အသံပြောင်းပြီး "ない" ပေါင်းပါ (う အဆုံးသတ်လျှင် "わ" ပြောင်းပါ - 買う -> 買わない)',
    rule_group1_en: 'Change "u" row to "a" row and add "nai" (verbs ending in "u" change to "wa" - kau -> kawanai)',
    rule_group2_my: 'နောက်ဆုံး "る" ဖြုတ်ပြီး "ない" ပေါင်းပါ (食べる -> 食べない)',
    rule_group2_en: 'Drop "ru" and add "nai" (taberu -> tabenai)',
    rule_group3_my: 'する -> しない, 来る (くる) -> 来ない (こない)',
    rule_group3_en: 'suru -> shinai, kuru -> konai',
    usage_my: 'မလုပ်ပါ (Negative)၊ မလုပ်ပါနှင့် (~ないでください)၊ မဖြစ်မနေလုပ်ရမည် (~なければならない) တွင် သုံးပါသည်။',
    usage_en: 'Used for negative statements, prohibitions (~naide kudasai), and obligations (~nakereba naranai).',
  },
  nakatta: {
    name_jp: 'なかった形 (Nakatta-kei)',
    name_my: 'အတိတ်ငြင်းပယ် ပုံစံ',
    name_en: 'Past Negative Form',
    name_th: 'รูปอดีตปฏิเสธ (Nakatta-form)',
    name_vi: 'Thể quá khứ phủ định (Thể Nakatta)',
    rule_group1_my: 'ない形 ၏ "ない" ကို "なかった" ပြောင်းပါ (書かない -> 書かなかった)',
    rule_group1_en: 'Replace "nai" of the negative form with "nakatta" (kakanai -> kakanakatta)',
    rule_group2_my: 'ない形 ၏ "ない" ကို "なかった" ပြောင်းပါ (食べない -> 食べなかった)',
    rule_group2_en: 'Replace "nai" with "nakatta" (tabenai -> tabenakatta)',
    rule_group3_my: 'しなかった, 来なかった (こなかった)',
    rule_group3_en: 'shinakatta, konakatta',
    usage_my: 'အတိတ်ကာလတွင် မပြုလုပ်ခဲ့ကြောင်း ရိုးရိုးပြောဆိုရာတွင် သုံးပါသည်။',
    usage_en: 'Informal past negative statement ("did not do").',
  },
  potential: {
    name_jp: '可能形 (Kanou-kei)',
    name_my: 'စွမ်းဆောင်နိုင်မှု ပုံစံ',
    name_en: 'Potential Form (Can do)',
    name_th: 'รูปสามารถ (Potential form)',
    name_vi: 'Thể khả năng (Có thể làm)',
    rule_group1_my: 'နောက်ဆုံး "u" အသံကို "e" အသံပြောင်းပြီး "る" ပေါင်းပါ (飲む -> 飲める, 書く -> 書ける)',
    rule_group1_en: 'Change "u" row to "e" row and add "ru" (nomu -> nomeru, kaku -> kakeru)',
    rule_group2_my: 'နောက်ဆုံး "る" ဖြုတ်ပြီး "られる" ပေါင်းပါ (食べる -> 食べられる)',
    rule_group2_en: 'Drop "ru" and add "rareru" (taberu -> taberareru)',
    rule_group3_my: 'する -> できる, 来る (くる) -> 来られる (こられる)',
    rule_group3_en: 'suru -> dekiru, kuru -> korareru',
    usage_my: 'လုပ်ဆောင်နိုင်စွမ်းရှိခြင်း (Can do / Able to) ကို ဖော်ပြရာတွင် ကံပုဒ်တွင် を အစား が တွဲသုံးလေ့ရှိပါသည်။',
    usage_en: 'Expresses ability or possibility. Usually marks the direct object with "ga" instead of "o".',
  },
  volitional: {
    name_jp: '意向形 (Ikou-kei)',
    name_my: 'ဆန္ဒပြု ပုံစံ (~ကြရအောင်)',
    name_en: 'Volitional Form (Let’s do)',
    name_th: 'รูปตั้งใจ (Volitional form)',
    name_vi: 'Thể ý định (Cùng làm nào)',
    rule_group1_my: 'နောက်ဆုံး "u" အသံကို "o" အသံရှည် (おう) ပြောင်းပါ (行く -> 行こう, 飲む -> 飲もう)',
    rule_group1_en: 'Change "u" row to "o" row and add "u" (iku -> ikou, nomu -> nomou)',
    rule_group2_my: 'နောက်ဆုံး "る" ဖြုတ်ပြီး "よう" ပေါင်းပါ (食べる -> 食べよう, 見る -> 見よう)',
    rule_group2_en: 'Drop "ru" and add "you" (taberu -> tabeyou, miru -> miyou)',
    rule_group3_my: 'する -> しよう, 来る (くる) -> 来よう (こよう)',
    rule_group3_en: 'suru -> shiyou, kuru -> koyou',
    usage_my: 'လုပ်ကြစို့ (Casual "Let’s") သို့မဟုတ် လုပ်မည်ဟု စိတ်ကူးထားခြင်း (~と思っています) တွင် သုံးပါသည်။',
    usage_en: 'Casual equivalent of ~mashou (Let’s), or expressing intention (~to omotte imasu).',
  },
  conditionalBa: {
    name_jp: '条件形・ば形 (Ba-kei)',
    name_my: 'အကယ်၍... လျှင် ပုံစံ (အခြေအနေ)',
    name_en: 'Conditional Ba Form (If...)',
    name_th: 'รูปเงื่อนไข บะ (Ba-form)',
    name_vi: 'Thể điều kiện Ba (Nếu...)',
    rule_group1_my: 'နောက်ဆုံး "u" အသံကို "e" အသံပြောင်းပြီး "ば" ပေါင်းပါ (飲む -> 飲めば, 書く -> 書けば)',
    rule_group1_en: 'Change "u" row to "e" row and add "ba" (nomu -> nomeba, kaku -> kakeba)',
    rule_group2_my: 'နောက်ဆုံး "る" ဖြုတ်ပြီး "れば" ပေါင်းပါ (食べる -> 食べれば)',
    rule_group2_en: 'Drop "ru" and add "reba" (taberu -> tabereba)',
    rule_group3_my: 'する -> すれば, 来る (くる) -> 来れば (くれば)',
    rule_group3_en: 'suru -> sureba, kuru -> kureba',
    usage_my: 'အခြေအနေတစ်ခု ပြည့်စုံလျှင် ဖြစ်ပေါ်လာမည့် အကျိုးဆက်ကို ဖော်ပြသည်။',
    usage_en: 'Hypothetical or conditional "if".',
  },
  conditionalTara: {
    name_jp: 'たら形 (Tara-kei)',
    name_my: 'ပြီးလျှင် / အကယ်၍ ပုံစံ',
    name_en: 'Tara Conditional (When/If)',
    name_th: 'รูปเงื่อนไข ทะระ (Tara-form)',
    name_vi: 'Thể điều kiện Tara (Sau khi / Nếu)',
    rule_group1_my: 'た形 နောက်တွင် "ら" ပေါင်းပါ (飲んだ -> 飲んだら, 行った -> 行ったら)',
    rule_group1_en: 'Add "ra" to the Ta-form (nonda -> nondara, itta -> ittara)',
    rule_group2_my: 'た形 နောက်တွင် "ら" ပေါင်းပါ (食べた -> 食べたら)',
    rule_group2_en: 'Add "ra" to the Ta-form (tabeta -> tabetara)',
    rule_group3_my: 'したら, 来たら (きたら)',
    rule_group3_en: 'shitara, kitara',
    usage_my: 'လုပ်ဆောင်ချက်တစ်ခု ပြီးဆုံးပြီးနောက် ဆက်လက်ဖြစ်ပေါ်မည့်အရာ သို့မဟုတ် အကယ်၍ ဖြစ်လျှင်။',
    usage_en: 'Conditionals and sequential temporal triggers ("once/when").',
  },
  imperative: {
    name_jp: '命令形 (Meirei-kei)',
    name_my: 'အမိန့်ပေး ပုံစံ',
    name_en: 'Imperative Form (Command)',
    name_th: 'รูปคำสั่ง (Imperative form)',
    name_vi: 'Thể mệnh lệnh (Ra lệnh)',
    rule_group1_my: 'နောက်ဆုံး "u" အသံကို "e" အသံပြောင်းပါ (行く -> 行け, 飲む -> 飲め, 待つ -> 待て)',
    rule_group1_en: 'Change "u" row to "e" row directly (iku -> ike, nomu -> nome, matsu -> mate)',
    rule_group2_my: 'နောက်ဆုံး "る" ဖြုတ်ပြီး "ろ" ပေါင်းပါ (食べる -> 食べろ, 見る -> 見ろ)',
    rule_group2_en: 'Drop "ru" and add "ro" (taberu -> tabero, miru -> miro)',
    rule_group3_my: 'する -> しろ, 来る (くる) -> 来い (こい)',
    rule_group3_en: 'suru -> shiro, kuru -> koi',
    usage_my: 'အရေးပေါ်အခြေအနေ၊ အားကစားအားပေးချိန် သို့မဟုတ် ပြင်းထန်သော အမိန့်ပေးခြင်းများတွင် သုံးပါသည်။',
    usage_en: 'Used for strong, direct commands, traffic instructions, or emergency cheering.',
  },
  prohibitive: {
    name_jp: '禁止形 (Kinshi-kei)',
    name_my: 'တားမြစ် ပုံစံ (မလုပ်ရ)',
    name_en: 'Prohibitive Form (Must not)',
    name_th: 'รูปห้าม (Prohibitive form)',
    name_vi: 'Thể cấm chỉ (Cấm làm)',
    rule_group1_my: '辞書形 နောက်တွင် "な" ပေါင်းပါ (行く -> 行くな, 飲む -> 飲むな)',
    rule_group1_en: 'Add "na" directly after the dictionary form (iku -> ikuna, nomu -> nomuna)',
    rule_group2_my: '辞書形 နောက်တွင် "な" ပေါင်းပါ (食べる -> 食べるな)',
    rule_group2_en: 'Add "na" directly after the dictionary form (taberu -> taberuna)',
    rule_group3_my: 'する -> するな, 来る (くる) -> 来るな (くるな)',
    rule_group3_en: 'suru -> suruna, kuru -> kuruna',
    usage_my: 'လုံးဝ မပြုလုပ်ရန် ပြင်းပြင်းထန်ထန် တားမြစ်ရာတွင် သုံးပါသည်။',
    usage_en: 'Direct strict prohibition (Stop / Do not do!).',
  },
  passive: {
    name_jp: '受身形 (Ukemi-kei)',
    name_my: 'ခံရ ပုံစံ',
    name_en: 'Passive Form',
    name_th: 'รูปถูกกระทำ (Passive form)',
    name_vi: 'Thể bị động (Bị / Được)',
    rule_group1_my: 'နောက်ဆုံး "u" အသံကို "a" အသံပြောင်းပြီး "れる" ပေါင်းပါ (褒める -> 褒められる, 叱る -> 叱られる)',
    rule_group1_en: 'Change "u" row to "a" row and add "reru" (verbs ending in "u" change to "wa" - tsukau -> tsukawareru)',
    rule_group2_my: 'နောက်ဆုံး "る" ဖြုတ်ပြီး "られる" ပေါင်းပါ (食べる -> 食べられる)',
    rule_group2_en: 'Drop "ru" and add "rareru" (taberu -> taberareru)',
    rule_group3_my: 'する -> される, 来る (くる) -> 来られる (こられる)',
    rule_group3_en: 'suru -> sareru, kuru -> korareru',
    usage_my: 'သူတစ်ပါး၏ ပြုမူခြင်းကို ခံရခြင်း (Passive voice) သို့မဟုတ် ဒုက္ခရောက်သော ခံရခြင်းကို ဖော်ပြသည်။',
    usage_en: 'Expresses being affected by someone else’s action, or suffering passive.',
  },
  causative: {
    name_jp: '使役形 (Shieki-kei)',
    name_my: 'စေခိုင်း ပုံစံ',
    name_en: 'Causative Form (Make/Let do)',
    name_th: 'รูปให้กระทำ (Causative form)',
    name_vi: 'Thể sai khiến (Bắt / Cho phép)',
    rule_group1_my: 'နောက်ဆုံး "u" အသံကို "a" အသံပြောင်းပြီး "せる" ပေါင်းပါ (飲む -> 飲ませる, 書く -> 書かせる)',
    rule_group1_en: 'Change "u" row to "a" row and add "seru" (verbs ending in "u" use "wa" - kawanai -> kawaseru)',
    rule_group2_my: 'နောက်ဆုံး "る" ဖြုတ်ပြီး "させる" ပေါင်းပါ (食べる -> 食べさせる)',
    rule_group2_en: 'Drop "ru" and add "saseru" (taberu -> tabesaseru)',
    rule_group3_my: 'する -> させる, 来る (くる) -> 来させる (こさせる)',
    rule_group3_en: 'suru -> saseru, kuru -> kosaseru',
    usage_my: 'သူတစ်ပါးကို တစ်ခုခု ပြုလုပ်စေခိုင်းခြင်း သို့မဟုတ် ခွင့်ပြုပေးခြင်း (Make/Let someone do) တွင် သုံးပါသည်။',
    usage_en: 'Expresses making someone do something or permitting/letting them do it.',
  },
  causativePassive: {
    name_jp: '使役受身形 (Shieki-Ukemi)',
    name_my: 'မလွှဲမရှောင်သာ ပြုလုပ်ရ ပုံစံ',
    name_en: 'Causative-Passive (Made to do)',
    name_th: 'รูปถูกบังคับให้ทำ (Causative-Passive)',
    name_vi: 'Thể bị sai khiến (Bị bắt buộc làm)',
    rule_group1_my: 'နောက်ဆုံး "u" အသံကို "a" အသံပြောင်းပြီး "せられる" သို့မဟုတ် "される" (書かされる, 飲まされる)',
    rule_group1_en: 'Group 1: a-row + serareru or contracted sareru (e.g. kakasareru, nomasareru)',
    rule_group2_my: 'နောက်ဆုံး "る" ဖြုတ်ပြီး "させられる" ပေါင်းပါ (食べさせられる)',
    rule_group2_en: 'Drop "ru" and add "saserareru" (tabesaserareru)',
    rule_group3_my: 'する -> させられる, 来る -> 来させられる (こさせられる)',
    rule_group3_en: 'suru -> saserareru, kuru -> kosaserareru',
    usage_my: 'မိမိဆန္ဒမပါဘဲ သူတစ်ပါးစေခိုင်းသဖြင့် မလွှဲသာဘဲ ပြုလုပ်ရခြင်းကို ဖော်ပြသည်။',
    usage_en: 'Expresses being compelled or forced into an action against one’s will.',
  },
};

export function getRuleForLanguage(formKey: string, lang: Language) {
  const guide = conjugationRulesGuide[formKey];
  if (!guide) return null;

  return {
    name: lang === 'my' ? guide.name_my : lang === 'th' ? (guide.name_th || guide.name_en) : lang === 'vi' ? (guide.name_vi || guide.name_en) : guide.name_en,
    jpName: guide.name_jp,
    group1: lang === 'my' ? guide.rule_group1_my : guide.rule_group1_en,
    group2: lang === 'my' ? guide.rule_group2_my : guide.rule_group2_en,
    group3: lang === 'my' ? guide.rule_group3_my : guide.rule_group3_en,
    usage: lang === 'my' ? guide.usage_my : guide.usage_en,
  };
}

/**
 * Normalizes input text for comparison (hiragana, katakana, romaji, kanji).
 */
export function normalizeAnswer(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .toLowerCase()
    .replace(/[\s\-_~・]/g, '')
    .replace(/[！!？?。]/g, '');
}

/**
 * Universal conjugator that computes all 13-15 forms for a verb.
 */
export function generateConjugations(
  dict: string,
  reading: string,
  romaji: string,
  group: VerbGroup,
  customMasu?: string
): VerbConjugations {
  let masu = customMasu || '';
  let masuRomaji = '';
  let te = '';
  let teRomaji = '';
  let ta = '';
  let taRomaji = '';
  let nai = '';
  let naiRomaji = '';
  let nakatta = '';
  let nakattaRomaji = '';
  let potential = '';
  let potentialRomaji = '';
  let passive = '';
  let passiveRomaji = '';
  let causative = '';
  let causativeRomaji = '';
  let causativePassive = '';
  let causativePassiveRomaji = '';
  let imperative = '';
  let imperativeRomaji = '';
  let prohibitive = dict + 'な';
  let prohibitiveRomaji = romaji + ' na';
  let volitional = '';
  let volitionalRomaji = '';
  let conditionalBa = '';
  let conditionalBaRomaji = '';
  let conditionalTara = '';
  let conditionalTaraRomaji = '';

  const isKuru = dict === '来る' || reading === 'くる' || romaji === 'kuru';
  const isSuru = dict === 'する' || reading === 'する' || romaji === 'suru' || dict.endsWith('する');

  if (isKuru) {
    masu = '来ます';
    masuRomaji = 'kimasu';
    te = '来て';
    teRomaji = 'kite';
    ta = '来た';
    taRomaji = 'kita';
    nai = '来ない';
    naiRomaji = 'konai';
    nakatta = '来なかった';
    nakattaRomaji = 'konakatta';
    potential = '来られる';
    potentialRomaji = 'korareru';
    passive = '来られる';
    passiveRomaji = 'korareru';
    causative = '来させる';
    causativeRomaji = 'kosaseru';
    causativePassive = '来させられる';
    causativePassiveRomaji = 'kosaserareru';
    imperative = '来い';
    imperativeRomaji = 'koi';
    prohibitive = '来るな';
    prohibitiveRomaji = 'kuru na';
    volitional = '来よう';
    volitionalRomaji = 'koyou';
    conditionalBa = '来れば';
    conditionalBaRomaji = 'kureba';
    conditionalTara = '来たら';
    conditionalTaraRomaji = 'kitara';
  } else if (isSuru) {
    const prefixDict = dict === 'する' ? '' : dict.slice(0, -2);
    const prefixRomaji = romaji === 'suru' ? '' : romaji.slice(0, -4);

    masu = prefixDict + 'します';
    masuRomaji = prefixRomaji ? prefixRomaji + 'shimasu' : 'shimasu';
    te = prefixDict + 'して';
    teRomaji = prefixRomaji ? prefixRomaji + 'shite' : 'shite';
    ta = prefixDict + 'した';
    taRomaji = prefixRomaji ? prefixRomaji + 'shita' : 'shita';
    nai = prefixDict + 'しない';
    naiRomaji = prefixRomaji ? prefixRomaji + 'shinai' : 'shinai';
    nakatta = prefixDict + 'しなかった';
    nakattaRomaji = prefixRomaji ? prefixRomaji + 'shinakatta' : 'shinakatta';
    potential = prefixDict + (prefixDict ? 'できる' : 'できる');
    potentialRomaji = prefixRomaji ? prefixRomaji + 'dekiru' : 'dekiru';
    passive = prefixDict + 'される';
    passiveRomaji = prefixRomaji ? prefixRomaji + 'sareru' : 'sareru';
    causative = prefixDict + 'させる';
    causativeRomaji = prefixRomaji ? prefixRomaji + 'saseru' : 'saseru';
    causativePassive = prefixDict + 'させられる';
    causativePassiveRomaji = prefixRomaji ? prefixRomaji + 'saserareru' : 'saserareru';
    imperative = prefixDict + 'しろ';
    imperativeRomaji = prefixRomaji ? prefixRomaji + 'shiro' : 'shiro';
    prohibitive = dict + 'な';
    prohibitiveRomaji = romaji + ' na';
    volitional = prefixDict + 'しよう';
    volitionalRomaji = prefixRomaji ? prefixRomaji + 'shiyou' : 'shiyou';
    conditionalBa = prefixDict + 'すれば';
    conditionalBaRomaji = prefixRomaji ? prefixRomaji + 'sureba' : 'sureba';
    conditionalTara = prefixDict + 'したら';
    conditionalTaraRomaji = prefixRomaji ? prefixRomaji + 'shitara' : 'shitara';
  } else if (group === 'Group 2') {
    // Ichidan
    const stem = dict.slice(0, -1);
    const rStem = romaji.endsWith('ru') ? romaji.slice(0, -2) : romaji;

    masu = stem + 'ます';
    masuRomaji = rStem + 'masu';
    te = stem + 'て';
    teRomaji = rStem + 'te';
    ta = stem + 'た';
    taRomaji = rStem + 'ta';
    nai = stem + 'ない';
    naiRomaji = rStem + 'nai';
    nakatta = stem + 'なかった';
    nakattaRomaji = rStem + 'nakatta';
    potential = stem + 'られる';
    potentialRomaji = rStem + 'rareru';
    passive = stem + 'られる';
    passiveRomaji = rStem + 'rareru';
    causative = stem + 'させる';
    causativeRomaji = rStem + 'saseru';
    causativePassive = stem + 'させられる';
    causativePassiveRomaji = rStem + 'saserareru';
    imperative = stem + 'ろ';
    imperativeRomaji = rStem + 'ro';
    volitional = stem + 'よう';
    volitionalRomaji = rStem + 'you';
    conditionalBa = stem + 'れば';
    conditionalBaRomaji = rStem + 'reba';
    conditionalTara = stem + 'たら';
    conditionalTaraRomaji = rStem + 'tara';
  } else {
    // Group 1 (Godan)
    const base = dict.slice(0, -1);
    const lastChar = dict.slice(-1);
    const rBase = romaji.slice(0, -1);
    const lastR = romaji.slice(-1);

    // Map last kana:
    const kanaMap: Record<string, { i: string; a: string; e: string; o: string; te: string; ta: string }> = {
      う: { i: 'い', a: 'わ', e: 'え', o: 'お', te: 'って', ta: 'った' },
      く: { i: 'き', a: 'か', e: 'け', o: 'こ', te: dict === '行く' ? 'って' : 'いて', ta: dict === '行く' ? 'った' : 'いた' },
      ぐ: { i: 'ぎ', a: 'が', e: 'げ', o: 'ご', te: 'いで', ta: 'いだ' },
      す: { i: 'し', a: 'さ', e: 'せ', o: 'そ', te: 'して', ta: 'した' },
      つ: { i: 'ち', a: 'た', e: 'て', o: 'と', te: 'って', ta: 'った' },
      ぬ: { i: 'に', a: 'な', e: 'ね', o: 'の', te: 'んで', ta: 'んだ' },
      ぶ: { i: 'び', a: 'ば', e: 'べ', o: 'ぼ', te: 'んで', ta: 'んだ' },
      む: { i: 'み', a: 'ま', e: 'め', o: 'も', te: 'んで', ta: 'んだ' },
      る: { i: 'り', a: 'ら', e: 'れ', o: 'ろ', te: 'って', ta: 'った' },
    };

    const map = kanaMap[lastChar] || { i: 'い', a: 'あ', e: 'え', o: 'お', te: 'て', ta: 'た' };

    masu = base + map.i + 'ます';
    te = base + map.te;
    ta = base + map.ta;
    nai = dict === 'ある' ? 'ない' : base + map.a + 'ない';
    nakatta = dict === 'ある' ? 'なかった' : base + map.a + 'なかった';
    potential = base + map.e + 'る';
    passive = base + map.a + 'れる';
    causative = base + map.a + 'せる';
    causativePassive = base + map.a + 'せられる';
    imperative = base + map.e;
    volitional = base + map.o + 'う';
    conditionalBa = base + map.e + 'ば';
    conditionalTara = base + map.ta + 'ら';

    // Simple romaji mappings
    masuRomaji = romaji.replace(/[u]$/, '') + 'imasu';
    teRomaji = te;
    taRomaji = ta;
    naiRomaji = nai;
    nakattaRomaji = nakatta;
    potentialRomaji = potential;
    passiveRomaji = passive;
    causativeRomaji = causative;
    causativePassiveRomaji = causativePassive;
    imperativeRomaji = imperative;
    volitionalRomaji = volitional;
    conditionalBaRomaji = conditionalBa;
    conditionalTaraRomaji = conditionalTara;
  }

  return {
    masu,
    masuRomaji,
    te,
    teRomaji,
    ta,
    taRomaji,
    nai,
    naiRomaji,
    nakatta,
    nakattaRomaji,
    potential,
    potentialRomaji,
    passive,
    passiveRomaji,
    causative,
    causativeRomaji,
    causativePassive,
    causativePassiveRomaji,
    imperative,
    imperativeRomaji,
    prohibitive,
    prohibitiveRomaji,
    volitional,
    volitionalRomaji,
    conditionalBa,
    conditionalBaRomaji,
    conditionalTara,
    conditionalTaraRomaji,
  };
}
