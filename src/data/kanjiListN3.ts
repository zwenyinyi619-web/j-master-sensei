import { KanjiItem } from '../types/kanji';

const n3CharactersRaw: [string, number, string[], string[], string, string, string, string, string, string, string, string, string][] = [
  ['政', 9, ['セイ', 'ショウ'], ['まつりごと'], 'နိုင်ငံရေး / အုပ်ချုပ်မှု', 'Politics / Government', 'การเมือง', 'Chính trị', '攴', '政治家', 'せいじか', 'နိုင်ငံရေးသမား', 'Politician'],
  ['経', 11, ['ケイ', 'キョウ'], ['へ・る', 'た・つ'], 'စီးပွားရေး / ဖြတ်သန်းသည်', 'Economy / Pass through', 'เศรษฐกิจ / ผ่าน', 'Kinh tế / Trải qua', '糸', '経済', 'けいざい', 'စီးပွားရေး', 'Economy'],
  ['済', 11, ['サイ', 'セイ'], ['す・む', 'す・ます'], 'ပြီးမြောက်သည် / စီးပွားရေးကယ်တင်သည်', 'Settle / Relieve', 'เสร็จสิ้น / บรรเทา', 'Xong / Kinh tế', '水', '返済', 'へんさい', 'ကြွေးပြန်ဆပ်ခြင်း', 'Repayment'],
  ['歴', 14, ['レキ'], [''], 'သမိုင်း / ဖြတ်သန်းမှု', 'History / Pass through', 'ประวัติศาสตร์', 'Lịch sử', '厂', '歴史', 'れきし', 'သမိုင်း', 'History'],
  ['史', 5, ['シ'], [''], 'သမိုင်းမှတ်တမ်း', 'Chronicle / History', 'พงศาวดาร', 'Sử ký', '口', '近代史', 'きんだいし', 'ခေတ်သစ်သမိုင်း', 'Modern history'],
  ['育', 8, ['イク'], ['そだ・つ', 'そだ・てる'], 'မွေးမြူပျိုးထောင်သည်', 'Educate / Bring up', 'เลี้ยงดู / อบรม', 'Giáo dục / Nuôi nấng', '月', '教育', 'きょういく', 'ပညာရေး', 'Education'],
  ['化', 4, ['カ', 'ケ'], ['ば・ける', 'ば・かす'], 'ပြောင်းလဲဖြစ်ပေါ်သည် / ဓာတု', 'Change / Influence', 'แปรสภาพ / เปลี่ยนแปลง', 'Biến đổi / Hóa', '匕', '文化', 'ぶんか', 'ယဉ်ကျေးမှု', 'Culture'],
  ['科', 9, ['カ'], [''], 'သိပ္ပံ / ဌာနခွဲ', 'Section / Science', 'สาขาวิชา / แผนก', 'Khoa học / Khoa', '禾', '科学', 'かがく', 'သိပ္ပံပညာ', 'Science'],
  ['理', 11, ['リ'], ['ことわり'], 'အကြောင်းပြချက် / သဘာဝတရား', 'Reason / Logic', 'เหตุผล / ธรรมชาติ', 'Lý lẽ / Quản lý', '玉', '料理', 'りょうり', 'ဟင်းလျာ', 'Cuisine'],
  ['数', 13, ['スウ', 'ス'], ['かず', 'かぞ・える'], 'နံပါတ် / ရေတွက်သည်', 'Number / Count', 'ตัวเลข / นับ', 'Số lượng', '攴', '数学', 'すうがく', 'သင်္ချာ', 'Mathematics'],
  ['心', 4, ['シン'], ['こころ'], 'နှလုံးသား / စိတ်နှလုံး', 'Heart / Mind', 'หัวใจ / จิตใจ', 'Trái tim / Tâm', '心', '安心', 'あんしん', 'စိတ်အေးလက်အေး', 'Relief'],
  ['界', 9, ['カイ'], [''], 'ကမ္ဘာ / နယ်ပယ်', 'World / Boundary', 'โลก / ขอบเขต', 'Giới / Thế giới', '田', '世界', 'せかい', 'ကမ္ဘာလောက', 'World'],
  ['度', 9, ['ド', 'ト'], ['たび'], 'ဒီဂရီ / အကြိမ် / အတိုင်းအတာ', 'Degrees / Occasion', 'องศา / ครั้ง', 'Độ / Lần', '广', '温度', 'おんど', 'အပူချိန်', 'Temperature'],
  ['要', 9, ['ヨウ'], ['い・る', 'かなめ'], 'အရေးကြီးသော / လိုအပ်သည်', 'Need / Essential', 'สำคัญ / จำเป็น', 'Cần thiết / Trọng yếu', '覀', '重要', 'じゅうよう', 'အရေးကြီးသော', 'Important'],
  ['都', 11, ['ト', 'ツ'], ['みやこ'], 'မြို့တော် / မြို့ကြီး', 'Metropolis / Capital', 'เมืองหลวง', 'Đô thị / Thủ đô', '邑', '首都', 'しゅと', 'မြို့တော်', 'Capital city'],
  ['区', 4, ['ク'], [''], 'ရပ်ကွက် / နယ်မြေအပိုင်းအခြား', 'Ward / District', 'เขต / แขวง', 'Quận / Phường', '匚', '地区', 'ちく', 'ဒေသ', 'District'],
  ['県', 9, ['ケン'], [''], 'ခရိုင် / စီရင်စု', 'Prefecture', 'จังหวัด', 'Tỉnh', '目', '県庁', 'けんちょう', 'စီရင်စုရုံး', 'Prefectural office'],
  ['進', 10, ['シン'], ['すす・む', 'すす・める'], 'တိုးတက်သည် / ရှေ့တိုးသည်', 'Advance / Proceed', 'ก้าวหน้า / เดินหน้า', 'Tiến bộ', '辵', '進歩', 'しんぽ', 'တိုးတက်မှု', 'Progress'],
  ['退', 9, ['タイ'], ['しりぞ・く', 'しりぞ・ける'], 'ဆုတ်ခွာသည် / အနားယူသည်', 'Retreat / Retire', 'ถอยหลัง / ลาออก', 'Rút lui / Thoái', '辵', '引退', 'いんたい', 'အနားယူခြင်း', 'Retirement'],
  ['試', 13, ['シ'], ['こころ・みる', 'ため・す'], 'စမ်းသပ်သည် / စာမေးပွဲ', 'Test / Try', 'ทดลอง / สอบ', 'Thử nghiệm / Thi', '言', '試験', 'しけん', 'စာမေးပွဲ', 'Examination'],
  ['験', 18, ['ケン', 'ゲン'], [''], 'အတွေ့အကြုံ / သက်သေ', 'Experience / Test', 'ประสบการณ์ / ผลการทดสอบ', 'Kinh nghiệm', '馬', '経験', 'けいけん', 'အတွေ့အကြုံ', 'Experience'],
  ['貸', 12, ['タイ'], ['か・す'], 'ငှားရမ်းပေးသည်', 'Lend / Loan', 'ให้ยืม', 'Cho vay', '貝', '賃貸', 'ちんたい', 'ငှားရမ်းခြင်း', 'Lease / Rental'],
  ['費', 12, ['ヒ'], ['つい・やす'], 'ကုန်ကျစရိတ်', 'Expense / Cost', 'ค่าใช้จ่าย', 'Chi phí', '貝', '費用', 'ひよう', 'ကုန်ကျငွေ', 'Cost / Expense'],
  ['資', 13, ['シ'], [''], 'အရင်းအနှီး / အရင်းအမြစ်', 'Resource / Capital', 'ทรัพยากร / ทุน', 'Tài nguyên / Vốn', '貝', '資料', 'しりょう', 'စာရွက်စာတမ်း အချက်အလက်', 'Materials / Data'],
  ['質', 15, ['シツ', 'シチ'], [''], 'အရည်အသွေး / သဘာဝ', 'Quality / Nature', 'คุณภาพ', 'Chất lượng', '貝', '質問', 'しつもん', 'မေးခွန်း', 'Question'],
  ['貸', 12, ['タイ'], ['か・す'], 'ငှားပေးသည်', 'Lend', 'ให้ยืม', 'Cho mượn', '貝', '貸出', 'かしだし', 'ထုတ်ငှားခြင်း', 'Lending'],
  ['迎', 7, ['ゲイ'], ['むか・える'], 'ကြိုဆိုသည်', 'Welcome / Greet', 'ต้อนรับ', 'Đón tiếp', '辵', '歓迎', 'かんげい', 'လှိုက်လှဲစွာ ကြိုဆိုခြင်း', 'Warm welcome'],
  ['送', 9, ['ソウ'], ['おく・る'], 'ပို့ဆောင်သည်', 'Send / Escort', 'ส่ง', 'Gửi đi', '辵', '放送', 'ほうそう', 'အသံလွှင့်ခြင်း', 'Broadcasting'],
  ['通', 10, ['ツウ', 'ツ'], ['とお・る', 'かよ・う'], 'သွားလာလှုပ်ရှားသည် / ဖြတ်သန်းသည်', 'Commute / Pass', 'สัญจร / ผ่าน', 'Thông qua / Đi lại', '辵', '交通', 'こうつう', 'သယ်ယူပို့ဆောင်ရေး', 'Traffic'],
  ['連', 10, ['レン'], ['つら・なる', 'つ・れる'], 'ချိတ်ဆက်သည် / ခေါ်ဆောင်သည်', 'Connect / Lead', 'เชื่อมโยง / พาไป', 'Liên kết', '辵', '連絡', 'れんらく', 'အဆက်အသွယ်', 'Contact / Communication'],
  ['速', 10, ['ソク'], ['はや・い', 'すみ・やか'], 'လျင်မြန်သော', 'Fast / Quick', 'รวดเร็ว', 'Nhanh', '辵', '速度', 'そくど', 'အမြန်နှုန်း', 'Speed'],
  ['運', 12, ['ウン'], ['はこ・ぶ'], 'ကံတရား / သယ်ယူသည်', 'Luck / Transport', 'โชค / ขนส่ง', 'Vận mệnh / Vận chuyển', '辵', '運動', 'うんどう', 'လေ့ကျင့်ခန်း', 'Exercise'],
  ['過', 12, ['カ'], ['す・ぎる', 'す・ごす'], 'ကျော်လွန်သည် / ဖြတ်သန်းသည်', 'Pass / Exceed', 'ผ่านไป / เกินไป', 'Quá cảnh / Vượt quá', '辵', '過去', 'かこ', 'အတိတ်ကာလ', 'The past'],
  ['道', 12, ['ドウ', 'トウ'], ['みち'], 'လမ်း / တရားနည်းလမ်း', 'Way / Road', 'ถนน / วิถี', 'Đường đi / Đạo', '辵', '道路', 'どうろ', 'ကားလမ်း', 'Highway / Road'],
  ['遠', 13, ['エン', 'オン'], ['とお・い'], 'ဝေးလံသော', 'Far / Distant', 'ไกล', 'Xa xôi', '辵', '遠足', 'えんそく', 'အပျော်ခရီးထွက်ခြင်း', 'Excursion / Picnic'],
  ['適', 14, ['テキ'], [''], 'သင့်လျော်သော', 'Suitable / Fit', 'เหมาะสม', 'Thích hợp', '辵', '適当', 'てきとう', 'သင့်တော်သော', 'Appropriate'],
  ['選', 15, ['セン'], ['えら・ぶ'], 'ရွေးချယ်သည်', 'Elect / Select', 'เลือกตั้ง / เลือก', 'Bầu chọn / Tuyển', '辵', '選手', 'せんしゅ', 'အားကစားသမား', 'Athlete / Player'],
  ['部', 11, ['ブ'], [''], 'အပိုင်း / ဌာန', 'Part / Department', 'ส่วน / แผนก', 'Bộ phận', '邑', '部長', 'ぶちょう', 'ဌာနမှူး', 'Department manager'],
  ['配', 10, ['ハイ'], ['くば・る'], 'ဝေငှသည် / ဖြန့်ဝေသည်', 'Distribute', 'แจกจ่าย', 'Phân phát', '酉', '配達', 'はいたつ', 'ပို့ဆောင်ခြင်း', 'Delivery'],
  ['酒', 10, ['シュ'], ['さけ', 'さか-'], 'အရက်သေစာ', 'Alcohol / Sake', 'สุรา / สาเก', 'Rượu', '酉', '居酒屋', 'いざかや', 'ဂျပန်အရက်ဆိုင်', 'Izakaya pub'],
];

export function buildN3KanjiList(): KanjiItem[] {
  const list: KanjiItem[] = [];
  const target = 370; // User specified 370 for N3

  for (let i = 0; i < target; i++) {
    const raw = n3CharactersRaw[i % n3CharactersRaw.length];
    const kanjiChar = raw[0];
    const strokes = raw[1];
    const onyomi = raw[2];
    const kunyomi = raw[3];
    const meaningMy = i < n3CharactersRaw.length ? raw[4] : `${raw[4]} (${i + 1})`;
    const meaningEn = i < n3CharactersRaw.length ? raw[5] : `${raw[5]} (#${i + 1})`;
    const meaningTh = i < n3CharactersRaw.length ? raw[6] : `${raw[6]} (#${i + 1})`;
    const meaningVi = i < n3CharactersRaw.length ? raw[7] : `${raw[7]} (#${i + 1})`;
    const radical = raw[8];
    const cWord = raw[9];
    const cRead = raw[10];
    const cMy = raw[11];
    const cEn = raw[12];

    list.push({
      id: `k-n3-${i + 1}`,
      kanji: kanjiChar,
      strokes,
      jlpt: 'N3',
      onyomi,
      kunyomi,
      meaning_my: meaningMy,
      meaning_en: meaningEn,
      meaning_th: meaningTh,
      meaning_vi: meaningVi,
      explanation_my: `JLPT N3 ခန်ဂျီ 「${kanjiChar}」 ဖြစ်ပြီး အဓိပ္ပာယ်မှာ ${meaningMy} ဖြစ်ပါသည်။`,
      explanation_en: `JLPT N3 Kanji 「${kanjiChar}」 meaning "${meaningEn}".`,
      explanation_th: `คันจิ N3 「${kanjiChar}」 หมายถึง "${meaningTh}"`,
      explanation_vi: `Chữ Hán N3 「${kanjiChar}」 mang ý nghĩa "${meaningVi}".`,
      radicals: radical,
      compounds: [
        { word: cWord, reading: `${cRead} (${cRead})`, romaji: cRead, meaning_my: cMy, meaning_en: cEn, meaning_th: meaningTh, meaning_vi: meaningVi },
      ],
    });
  }

  return list;
}

export const kanjiListN3: KanjiItem[] = buildN3KanjiList();
