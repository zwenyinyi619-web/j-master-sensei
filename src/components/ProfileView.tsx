import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { LogOut, Award, BookOpen, User as UserIcon, Mail } from 'lucide-react';
import { Language } from '../types/common';
import { getUserProgress } from '../userService';

interface ProfileViewProps {
  user: User;
  language: Language;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  language,
  onLogout,
}) => {
  const [progressData, setProgressData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        if (user && user.uid) {
          const data = await getUserProgress(user.uid);
          setProgressData(data || []);
        }
      } catch (err) {
        console.error("Failed to fetch user progress:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user]);

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      {/* User Profile Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-rose-500 shadow-md object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-rose-500 flex items-center justify-center text-rose-400">
              <UserIcon className="w-10 h-10" />
            </div>
          )}
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {user?.displayName || (language === 'my' ? 'အမည်မရှိ အသုံးပြုသူ' : 'User')}
            </h2>
            <p className="text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-4 h-4 text-slate-500" />
              {user?.email || 'No email'}
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-5 py-2.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>{language === 'my' ? 'အကောင့်ထွက်မည် (Log Out)' : 'Log Out'}</span>
        </button>
      </div>

      {/* Scores & Progress Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <Award className="w-6 h-6 text-amber-400" />
          <h3 className="text-xl font-bold text-white">
            {language === 'my' ? 'လေ့လာမှု မှတ်တမ်းနှင့် ရမှတ်များ (Kanji, Verb, စသည်ဖြင့်)' : 'Study Progress & Scores'}
          </h3>
        </div>

        {loading ? (
          <div className="text-center py-10 text-slate-400">
            {language === 'my' ? 'ဒေတာများကို ရယူနေပါသည်...' : 'Loading progress...'}
          </div>
        ) : progressData.length === 0 ? (
          <div className="text-center py-10 text-slate-500 space-y-2">
            <BookOpen className="w-12 h-12 mx-auto opacity-40" />
            <p>
              {language === 'my'
                ? 'ယခုထိ ဖြေဆိုထားသော မှတ်တမ်း မရှိသေးပါ။'
                : 'No practice records found yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {progressData.map((item, index) => (
              <div
                key={index}
                className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {item.level || 'JLPT'}
                    </span>
                    <span className="text-xs text-slate-400">
                      {item.lastStudied
                        ? new Date(item.lastStudied).toLocaleDateString()
                        : ''}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-slate-200">
                    {item.quizType || (language === 'my' ? 'လေ့ကျင့်ခန်း (Practice)' : 'Practice')}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-black text-amber-400">
                    {item.quizScore} / {item.totalQuestions}
                  </div>
                  <div className="text-xs text-slate-500">
                    {item.totalQuestions ? Math.round((item.quizScore / item.totalQuestions) * 100) : 0}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
