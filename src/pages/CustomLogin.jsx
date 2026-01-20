import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import { Sparkles, Shield, Heart, TrendingUp } from 'lucide-react';

export default function CustomLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const callbackUrl = `${window.location.origin}${createPageUrl('Home')}`;
      await base44.auth.redirectToLogin(callbackUrl);
    } catch (err) {
      setError('שגיאה בהתחברות עם Google');
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');
      const callbackUrl = `${window.location.origin}${createPageUrl('Home')}`;
      await base44.auth.redirectToLogin(callbackUrl);
    } catch (err) {
      setError('שגיאה בהתחברות');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" dir="rtl">
      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c276074aac6e6711db72a6/fefa17145_logoarena3d.png"
              alt="Arena AI"
              className="h-20 mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold text-slate-900 mb-2">ברוכים השבים ל-Arena AI</h1>
            <p className="text-slate-600">התחברו כדי להמשיך למצוא את הבית שלכם</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Google Login */}
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            variant="outline"
            className="w-full mb-4 h-12 text-base border-2 hover:bg-slate-50"
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="w-5 h-5 ml-2"
            />
            המשך עם Google
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 border-t border-slate-200"></div>
            <span className="text-slate-500 text-sm">או</span>
            <div className="flex-1 border-t border-slate-200"></div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">אימייל</label>
              <Input
                type="email"
                placeholder="your@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">סיסמה</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-base"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base bg-slate-900 hover:bg-black"
            >
              {isLoading ? 'מתחבר...' : 'התחבר'}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-2">
            <button className="text-sky-600 hover:text-sky-700 text-sm">
              שכחת סיסמה?
            </button>
            <div className="text-slate-600 text-sm">
              עדיין אין לך חשבון?{' '}
              <button 
                onClick={handleGoogleLogin}
                className="text-sky-600 hover:text-sky-700 font-medium"
              >
                הירשם עכשיו
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Left Side - Benefits with Blue Background */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 items-center justify-center p-12">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30" 
          style={{backgroundImage: "url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/77d5dcf6a_HEROBG.jpg')"}}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30"></div>

        {/* Content */}
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">
            למה ארנה?
          </h2>

          <div className="space-y-6">
            {/* Benefit 1 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">AI מתקדם</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    טכנולוגיה חכמה שמבינה את הצרכים שלך ומוצאת את הנכס המושלם עבורך
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">שקיפות מלאה</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    מידע מלא ומפורט על כל נכס, ללא עמלות או עלויות נסתרות
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">התאמה אישית</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    חיפוש מותאם אישית לפי הצרכים, התקציב והחלומות שלך
                  </p>
                </div>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">תובנות שוק</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    ניתוח מעמיק של מחירים, מגמות ופוטנציאל השקעה בכל אזור
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}