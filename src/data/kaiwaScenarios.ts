export interface KaiwaScenario {
  id: string;
  title_my: string;
  title_en: string;
  title_th: string;
  title_vi: string;
  description_my: string;
  description_en: string;
  description_th: string;
  description_vi: string;
  initialMessage_jp: string;
  initialMessage_romaji: string;
  initialMessage_my: string;
  initialMessage_en: string;
  initialMessage_th: string;
  initialMessage_vi: string;
  suggestedUserStarters: {
    jp: string;
    my: string;
    en: string;
    th?: string;
    vi?: string;
  }[];
}

export const kaiwaScenarios: KaiwaScenario[] = [
  {
    id: 'restaurant',
    title_my: 'စားသောက်ဆိုင်တွင် မှာယူခြင်း',
    title_en: 'Ordering at a Restaurant',
    title_th: 'สั่งอาหารในร้านอาหาร',
    title_vi: 'Gọi món tại nhà hàng',
    description_my: 'စားပွဲထိုးနှင့် မီနူးကြည့်ကာ မှာယူခြင်း၊ အကြံဉာဏ်တောင်းခြင်း၊ ငွေရှင်းခြင်း',
    description_en: 'Practice ordering dishes, asking recommendations, and paying the bill',
    description_th: 'ฝึกสั่งอาหาร สอบถามเมนูแนะนำ และคิดเงินกับพนักงาน',
    description_vi: 'Luyện tập gọi món, hỏi món gợi ý và thanh toán với nhân viên',
    initialMessage_jp: 'いらっしゃいませ！何名様でしょうか？こちらへどうぞ。ご注文はお決まりですか？',
    initialMessage_romaji: 'Irasshaimase! Nanmei-sama deshoushou ka? Kochira e douzo. Gochuumon wa okimari desu ka?',
    initialMessage_my: 'ကြိုဆိုပါတယ်ခင်ဗျာ! လူဘယ်နှစ်ယောက်ပါလဲခင်ဗျာ။ ဒီဘက်ကို ကြွပါ။ ဘာမှာမလဲ ရွေးချယ်ပြီးပြီလားခင်ဗျာ။',
    initialMessage_en: 'Welcome! How many people? Please step this way. Have you decided on your order?',
    initialMessage_th: 'ยินดีต้อนรับครับ! มากี่ท่านครับ เชิญทางนี้ครับ สั่งอาหารได้เลยไหมครับ?',
    initialMessage_vi: 'Kính chào quý khách! Quý khách đi mấy người ạ? Mời đi lối này. Quý khách đã chọn được món chưa ạ?',
    suggestedUserStarters: [
      { jp: 'メニューを見せてください。', my: 'မီနူး ပြပေးပါခင်ဗျာ။', en: 'Please show me the menu.', th: 'ขอดูเมนูหน่อยครับ', vi: 'Làm ơn cho tôi xem thực đơn.' },
      { jp: 'おすすめは何ですか？', my: 'အကြံပြုချက် (Recommendation) က ဘာရှိပါသလဲ။', en: 'What do you recommend?', th: 'มีอะไรแนะนำบ้างครับ?', vi: 'Có món gì ngon gợi ý không ạ?' },
      { jp: 'ラーメンを一つとお水をください。', my: 'ရာမင်ခေါက်ဆွဲတစ်ပွဲနဲ့ ရေတစ်ခွက် ပေးပါ။', en: 'One ramen and water, please.', th: 'ขอราเมนหนึ่งที่และน้ำเปล่าครับ', vi: 'Cho tôi một bát ramen và một ly nước lọc.' },
    ],
  },
  {
    id: 'directions',
    title_my: 'လမ်းမေးခြင်း (Asking Directions)',
    title_en: 'Asking for Directions',
    title_th: 'การถามทาง',
    title_vi: 'Hỏi đường đi',
    description_my: 'ရထားဘူတာ၊ ဟိုတယ်၊ ဈေးဝယ်စင်တာများသို့ သွားရန် လမ်းမေးမြန်းခြင်း',
    description_en: 'Asking locals how to get to train stations, landmarks, or hotels',
    description_th: 'ถามทางไปสถานีรถไฟ สถานที่สำคัญ หรือโรงแรม',
    description_vi: 'Hỏi đường đến ga tàu, khách sạn hoặc địa điểm tham quan',
    initialMessage_jp: 'こんにちは！何かお困りですか？道をお探しでしょうか？',
    initialMessage_romaji: 'Konnichiwa! Nanika okomari desu ka? Michi o osagashi deshoushou ka?',
    initialMessage_my: 'မင်္ဂလာပါ! တစ်ခုခု အခက်အခဲရှိနေပါသလားခင်ဗျာ။ လမ်းရှာနေတာပါသလား။',
    initialMessage_en: 'Hello! Are you having trouble? Are you looking for directions?',
    initialMessage_th: 'สวัสดีครับ มีอะไรให้ช่วยไหมครับ กำลังหาทางอยู่หรือเปล่าครับ?',
    initialMessage_vi: 'Xin chào! Bạn có cần giúp đỡ không? Bạn đang tìm đường phải không?',
    suggestedUserStarters: [
      { jp: 'すみません、駅はどこですか？', my: 'ခွင့်လွှတ်ပါခင်ဗျာ၊ ဘူတာက ဘယ်နားမှာလဲခင်ဗျာ။', en: 'Excuse me, where is the station?', th: 'ขอโทษนะครับ สถานีรถไฟไปทางไหนครับ?', vi: 'Xin lỗi, ga tàu ở đâu ạ?' },
      { jp: 'ここから歩いて行けますか？', my: 'ဒီနေရာကနေ လမ်းလျှောက်သွားလို့ ရပါသလား။', en: 'Can I walk there from here?', th: 'เดินจากที่นี่ไปได้ไหมครับ?', vi: 'Từ đây có đi bộ đến đó được không?' },
      { jp: '地下鉄の乗り場を教えてください。', my: 'မြေအောက်ရထား စီးရမည့်နေရာကို ပြပေးပါခင်ဗျာ။', en: 'Please tell me where the subway is.', th: 'ช่วยบอกทางไปรถไฟใต้ดินหน่อยครับ', vi: 'Làm ơn chỉ cho tôi lối vào tàu điện ngầm.' },
    ],
  },
  {
    id: 'self-intro',
    title_my: 'မိတ်ဆက်ခြင်း (Jikoshoukai)',
    title_en: 'Self Introduction',
    title_th: 'การแนะนำตัวเอง',
    title_vi: 'Tự giới thiệu bản thân',
    description_my: 'မိမိနာမည်၊ နိုင်ငံ၊ ဝါသနာနှင့် အလုပ်အကိုင်များကို မိတ်ဖွဲ့ပြောဆိုခြင်း',
    description_en: 'Introducing your name, background, hobbies, and goals in Japanese',
    description_th: 'แนะนำชื่อ ประเทศ งานอดิเรก และความตั้งใจในการเรียนภาษาญี่ปุ่น',
    description_vi: 'Giới thiệu tên, xuất thân, sở thích và mục tiêu học tiếng Nhật',
    initialMessage_jp: '初めまして！私は佐藤です。日本語の練習相手をしますね。自己紹介をお願いできますか？',
    initialMessage_romaji: 'Hajimemashite! Watashi wa Satou desu. Nihongo no renshuu aite o shimasu ne. Jikoshoukai o onegai dekimasu ka?',
    initialMessage_my: 'တွေ့ရတာ ဝမ်းသာပါတယ်။ ကျွန်တော်က ဆာတိုး ဖြစ်ပါတယ်။ ဂျပန်စာလေ့ကျင့်ဖော် လုပ်ပေးပါ့မယ်။ မိတ်ဆက်ပေးနိုင်မလားခင်ဗျာ။',
    initialMessage_en: 'Nice to meet you! I am Sato. I will be your Japanese practice partner. Could you introduce yourself?',
    initialMessage_th: 'ยินดีที่ได้รู้จักครับ ผมชื่อซาโต้ จะเป็นคู่ฝึกภาษาญี่ปุ่นให้นะครับ ช่วยแนะนำตัวหน่อยได้ไหมครับ?',
    initialMessage_vi: 'Rất vui được gặp bạn! Tôi là Sato. Tôi sẽ đồng hành luyện tiếng Nhật cùng bạn. Bạn có thể tự giới thiệu không?',
    suggestedUserStarters: [
      { jp: '初めまして。ミャンマーから来ました。', my: 'တွေ့ရတာ ဝမ်းသာပါတယ်။ မြန်မာနိုင်ငံက လာခဲ့တာပါ။', en: 'Nice to meet you. I came from Myanmar.', th: 'ยินดีที่ได้รู้จักครับ มาจากพม่าครับ', vi: 'Rất vui được gặp bạn. Tôi đến từ Myanmar.' },
      { jp: '趣味は日本のアニメと音楽です。', my: 'ဝါသနာကတော့ ဂျပန်အန်နီမေးနဲ့ သီချင်းနားထောင်ခြင်း ဖြစ်ပါတယ်။', en: 'My hobbies are Japanese anime and music.', th: 'งานอดิเรกคือดูอนิเมะและฟังเพลงญี่ปุ่นครับ', vi: 'Sở thích của tôi là anime và âm nhạc Nhật Bản.' },
      { jp: 'どうぞよろしくお願いします！', my: 'ခင်မင်ရင်းနှီးစွာ စောင့်ရှောက်ပေးပါခင်ဗျာ!', en: 'Pleased to meet you!', th: 'ฝากเนื้อฝากตัวด้วยนะครับ!', vi: 'Rất mong nhận được sự giúp đỡ của bạn!' },
    ],
  },
  {
    id: 'konbini',
    title_my: 'Convenience Store (Konbini)',
    title_en: 'Convenience Store (Konbini)',
    title_th: 'ร้านสะดวกซื้อ (Konbini)',
    title_vi: 'Cửa hàng tiện lợi (Konbini)',
    description_my: 'ဂျပန်ရှိ 7-Eleven, Lawson, FamilyMart တို့တွင် ပစ္စည်းဝယ်ယူခြင်း၊ အပူပေးခိုင်းခြင်း',
    description_en: 'Buying snacks, warming bento, requesting bags or receipts at Konbini',
    description_th: 'ซื้อของ เวฟข้าวกล่อง ปฏิเสธหรือขอถุงที่ร้านสะดวกซื้อ',
    description_vi: 'Mua đồ ăn, hâm nóng cơm hộp, xin túi hoặc hóa đơn tại Konbini',
    initialMessage_jp: 'いらっしゃいませ！温めますか？ポイントカードはお持ちですか？',
    initialMessage_romaji: 'Irasshaimase! Atatamemasu ka? Pointo kaado wa omochi desu ka?',
    initialMessage_my: 'ကြိုဆိုပါတယ်ခင်ဗျာ! ထမင်းဘူး အပူပေးရမလားခင်ဗျာ။ Point Card ပါပါသလား။',
    initialMessage_en: 'Welcome! Would you like this heated up? Do you have a point card?',
    initialMessage_th: 'ยินดีต้อนรับครับ อุ่นอาหารไหมครับ? มีบัตรสะสมแต้มไหมครับ?',
    initialMessage_vi: 'Kính chào quý khách! Cần hâm nóng không ạ? Quý khách có thẻ tích điểm không?',
    suggestedUserStarters: [
      { jp: 'はい、温めてください。', my: 'ဟုတ်ကဲ့၊ အပူပေးပါခင်ဗျာ။', en: 'Yes, please heat it up.', th: 'ครับ ช่วยอุ่นให้หน่อยครับ', vi: 'Vâng, làm ơn hâm nóng giúp tôi.' },
      { jp: '袋はいりません。', my: 'အိတ် မလိုပါဘူးခင်ဗျာ။', en: "I don't need a bag.", th: 'ไม่รับถุงครับ', vi: 'Tôi không cần túi nilon.' },
      { jp: 'レシートをください。', my: 'ပြေစာ (Receipt) ပေးပါခင်ဗျာ။', en: 'Please give me the receipt.', th: 'ขอใบเสร็จด้วยครับ', vi: 'Làm ơn cho tôi xin hóa đơn.' },
    ],
  },
  {
    id: 'interview',
    title_my: 'အလုပ် အင်တာဗျူး (Job Interview)',
    title_en: 'Job Interview Practice',
    title_th: 'การสัมภาษณ์งาน',
    title_vi: 'Phỏng vấn xin việc',
    description_my: 'ဂျပန်ကုမ္ပဏီ အင်တာဗျူးတွင် ယဉ်ကျေးသော စကားလုံး Keigo ဖြင့် ဖြေဆိုလေ့ကျင့်ခြင်း',
    description_en: 'Practice formal Keigo Japanese for job interviews and company settings',
    description_th: 'ฝึกฝนภาษาญี่ปุ่นระดับสุภาพ (Keigo) สำหรับสัมภาษณ์งาน',
    description_vi: 'Luyện tập kính ngữ (Keigo) cho phỏng vấn xin việc công ty Nhật',
    initialMessage_jp: '本日は面接にお越しいただきありがとうございます。まず志望動機を教えていただけますでしょうか？',
    initialMessage_romaji: 'Honjitsu wa mensetsu ni okoshi itadaki arigatou gozaimasu. Mazu shibou douki o oshiete itadakemasu deshoushou ka?',
    initialMessage_my: 'ဒီနေ့ အင်တာဗျူးသို့ လာရောက်ပေးသည့်အတွက် ကျေးဇူးတင်ပါတယ်။ ဦးစွာ အလုပ်လျှောက်ထားရသည့် ရည်ရွယ်ချက်ကို ပြောပြပေးနိုင်မလားခင်ဗျာ။',
    initialMessage_en: 'Thank you for coming to the interview today. Could you first tell us your motivation for applying?',
    initialMessage_th: 'ขอบคุณที่สละเวลามาสัมภาษณ์ในวันนี้ครับ รบกวนช่วยเล่าเหตุผลที่สนใจสมัครงานตำแหน่งนี้ได้ไหมครับ?',
    initialMessage_vi: 'Cảm ơn bạn đã đến tham gia buổi phỏng vấn hôm nay. Trước tiên, bạn có thể chia sẻ lý do ứng tuyển không?',
    suggestedUserStarters: [
      { jp: '貴社の理念に強く共感いたしました。', my: 'လူကြီးမင်းတို့ ကုမ္ပဏီ၏ မူဝါဒကို အလွန် သဘောကျ နှစ်သက်မိလို့ ဖြစ်ပါတယ်။', en: 'I strongly resonated with your company philosophy.', th: 'ผมมีความประทับใจในปรัชญาของบริษัทท่านเป็นอย่างมากครับ', vi: 'Tôi rất đồng cảm với triết lý kinh doanh của quý công ty.' },
      { jp: 'これまでの経験を活かして貢献したいです。', my: 'ယခင် အတွေ့အကြုံများကို အသုံးချပြီး အကျိုးပြုလိုပါတယ်။', en: 'I want to contribute using my past experience.', th: 'ต้องการนำประสบการณ์ที่ผ่านมามาสร้างคุณประโยชน์ให้กับบริษัทครับ', vi: 'Tôi mong muốn phát huy kinh nghiệm để cống hiến cho công ty.' },
    ],
  },
];
