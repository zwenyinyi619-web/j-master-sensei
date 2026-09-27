import React from 'react';
import { BookOpen, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';
import { Language } from '../types/common';
import { translations } from '../i18n/translations';

interface GuideProps {
  language: Language;
}

export const KanjiOnyomiKunyomiGuide: React.FC<GuideProps> = ({ language }) => {
  const t = translations[language];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {t.kanjiGuideTitle}
          </h2>
          <p className="text-xs text-slate-400">
            {language === 'my'
              ? 'ခန်ဂျီ အသံထွက် အမျိုးအစား ၂ မျိုးကို အခြေခံမှ စတင်နားလည်သဘောပေါက်စေရန် လမ်းညွှန်'
              : 'Understanding the distinction between Chinese-derived and Native Japanese readings'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Onyomi Card */}
        <div className="bg-slate-850 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-rose-400 font-serif">
              音読み (Onyomi)
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">
              {language === 'my' ? 'တရုတ်သံ' : 'Chinese Reading'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {language === 'my'
              ? 'ရှေးခေတ် တရုတ်ပြည်မှ ဂျပန်နိုင်ငံသို့ ခန်ဂျီစာလုံးများ စတင်တင်သွင်းချိန်က ပါလာသော မူရင်း တရုတ်အသံထွက်များ ဖြစ်သည်။ အဘိဓာန်များတွင် Katakana (ကာတာခါနာ) ဖြင့် ရေးပြလေ့ရှိပါသည်။'
              : 'The Chinese-derived readings imported when Kanji arrived in Japan centuries ago. In dictionaries, Onyomi is traditionally written in Katakana.'}
          </p>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/80 space-y-1.5 text-xs">
            <div className="font-semibold text-amber-300">
              {language === 'my' ? 'ဘယ်အချိန်မှာ သုံးသလဲ?' : 'When is it used?'}
            </div>
            <p className="text-slate-400">
              {language === 'my'
                ? 'ခန်ဂျီ စာလုံး ၂ လုံး သို့မဟုတ် ထို့ထက်ပို၍ တွဲစပ်ထားသော စကားလုံးများ (Jukugo - 熟語) တွင် အဓိက သုံးသည်။'
                : 'Mostly used in compound words combining two or more Kanji (Jukugo).'}
            </p>
            <div className="pt-1 text-slate-200 font-serif">
              ဥပမာ - <span className="font-bold text-white">日本</span> (Nihon / Nichi),{' '}
              <span className="font-bold text-white">電話</span> (Denwa),{' '}
              <span className="font-bold text-white">学生</span> (Gakusei)
            </div>
          </div>
        </div>

        {/* Kunyomi Card */}
        <div className="bg-slate-850 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-amber-400 font-serif">
              訓読み (Kunyomi)
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
              {language === 'my' ? 'ဂျပန်မူရင်းသံ' : 'Native Japanese'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {language === 'my'
              ? 'ခန်ဂျီစာလုံးများ မရောက်ရှိမီကတည်းက ဂျပန်လူမျိုးများ အသုံးပြုခဲ့သော မူရင်း ဂျပန်ဘာသာ စကားလုံးများ၏ အသံထွက် ဖြစ်သည်။ အဘိဓာန်များတွင် Hiragana (ဟီရာဂါနာ) ဖြင့် ရေးသားဖော်ပြသည်။'
              : 'The native Japanese words that existed before Chinese characters arrived, matched to corresponding Kanji by meaning. Represented in Hiragana.'}
          </p>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/80 space-y-1.5 text-xs">
            <div className="font-semibold text-amber-300">
              {language === 'my' ? 'ဘယ်အချိန်မှာ သုံးသလဲ?' : 'When is it used?'}
            </div>
            <p className="text-slate-400">
              {language === 'my'
                ? 'ခန်ဂျီစာလုံး တစ်လုံးတည်း သီးသန့်ရပ်တည်နေချိန် သို့မဟုတ် နောက်တွင် ဟီရာဂါနာ အမြီး (Okurigana) ကပ်ပါလာချိန်တွင် သုံးသည်။'
                : 'Used when a Kanji stands alone, or is accompanied by Hiragana endings (Okurigana) such as in verbs.'}
            </p>
            <div className="pt-1 text-slate-200 font-serif">
              ဥပမာ - <span className="font-bold text-white">水</span> (Mizu - ရေ),{' '}
              <span className="font-bold text-white">木</span> (Ki - သစ်ပင်),{' '}
              <span className="font-bold text-white">食べる</span> (Taberu - စားသည်)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
