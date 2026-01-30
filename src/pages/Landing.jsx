import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, User, LogOut, UserCircle, Settings, Shield, Heart, History, Compass, ArrowUp } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

export default function Landing() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    // Simplified - no auth check for now
    
    // Check if cookie banner should be shown
    const cookieConsent = localStorage.getItem('arena_cookie_consent');
    if (!cookieConsent) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleLogin = () => {
    navigate(createPageUrl('Home'));
  };

  const handleGetStarted = (purpose = '') => {
    navigate(createPageUrl('Home'));
  };

  const handleLogout = async () => {
    // Logout functionality if needed
    setUser(null);
    navigate(createPageUrl('Landing'));
  };




  return (
    <div className="min-h-screen relative bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50" dir="rtl" data-page="landing">
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          will-change: transform;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
      `}</style>

      {/* Top Navigation */}
      <nav className="relative z-50 bg-white/60 backdrop-blur-sm border-b border-slate-200/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/053b1be56_arenaailogo-new.png"
              alt="Arena AI"
              className="h-12"
            />
          </div>
          
          {/* User Section */}
          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-slate-300 border-t-sky-500"></div>
            ) : user ? (
              /* Logged in user display with dropdown menu */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 text-slate-700 hover:text-slate-900">
                    <ChevronDown className="w-3 h-3" />
                    <span className="font-medium">
                      שלום, {user.full_name?.split(' ')[0] || 'משתמש'}
                    </span>
                    <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-sky-600" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate(createPageUrl('Home'))}>
                    <UserCircle className="w-4 h-4 ml-2" />
                    דף הבית
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(createPageUrl('UserProfile'))}>
                    <UserCircle className="w-4 h-4 ml-2" />
                    פרופיל אישי
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(createPageUrl('Settings'))}>
                    <Settings className="w-4 h-4 ml-2" />
                    הגדרות
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  
                  {!user.is_developer && (
                    <>
                      <DropdownMenuItem onClick={() => navigate(createPageUrl('SavedProperties'))}>
                        <Heart className="w-4 h-4 ml-2" />
                        נכסים שמורים
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(createPageUrl('History'))}>
                        <History className="w-4 h-4 ml-2" />
                        היסטוריית חיפושים
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  {user.is_developer && (
                    <>
                      <DropdownMenuItem onClick={() => navigate(createPageUrl('DeveloperDashboard'))}>
                        <Shield className="w-4 h-4 ml-2" />
                        פאנל יזם
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  {user.role === 'admin' && (
                    <>
                      <DropdownMenuItem onClick={() => navigate(createPageUrl('Admin'))}>
                        <Shield className="w-4 h-4 ml-2" />
                        ניהול מערכת
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 ml-2" />
                    התנתקות
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Not logged in - show login button */
              <Button 
                onClick={handleLogin}
                className="bg-white text-slate-900 hover:bg-white/90 rounded-full px-6"
              >
                התחברות
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section - Shorter & More Focused */}
      <div className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://assets.grok.com/users/d19ec812-ca24-464a-b234-6f6fbd258649/generated/0a0c7491-ff6d-49e7-bc03-cb6fa4bdf97d/generated_video.mp4?cache=1" type="video/mp4" />
        </video>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-400/30 via-sky-300/20 to-purple-200/30"></div>
        
        {/* Skyline SVG at bottom - Subtle Line Art */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-15">
          <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <g stroke="white" strokeWidth="1.5" fill="none">
              <rect x="50" y="80" width="60" height="120" />
              <rect x="120" y="100" width="50" height="100" />
              <rect x="180" y="60" width="70" height="140" />
              <rect x="260" y="90" width="55" height="110" />
              <rect x="325" y="70" width="65" height="130" />
              <rect x="400" y="110" width="50" height="90" />
              <rect x="460" y="50" width="80" height="150" />
              <rect x="550" y="95" width="60" height="105" />
              <rect x="620" y="85" width="55" height="115" />
              <rect x="685" y="65" width="75" height="135" />
              <rect x="770" y="100" width="50" height="100" />
              <rect x="830" y="75" width="70" height="125" />
              <rect x="910" y="90" width="60" height="110" />
              <rect x="980" y="55" width="85" height="145" />
              <rect x="1075" y="95" width="55" height="105" />
            </g>
          </svg>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Hero Text */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-2xl">
            בית <span className="text-slate-800">החלומות</span> שלך
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-white drop-shadow-lg font-medium">
            ארנה AI מאפשרת לך למצוא את הנכס המושלם באמצעות טכנולוגיה מתקדמת וייעוץ אישי
          </p>
        </div>

        {/* Scroll indicator - More Prominent */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20">
          <span className="text-slate-900 text-sm font-bold drop-shadow-lg">גלול למטה</span>
          <div className="bg-white backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-white hover:scale-110 transition-all cursor-pointer">
            <ChevronDown className="w-6 h-6 text-sky-600 animate-bounce" />
          </div>
        </div>
      </div>

      {/* איך עובדים עם ARENA - Onboarding Section */}
      <section className="relative py-12 bg-white">
        {/* Subtle skyline continuation */}
        <div className="absolute top-0 left-0 right-0 h-16 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
            <g stroke="currentColor" strokeWidth="1" fill="none" className="text-sky-400">
              <rect x="50" y="20" width="40" height="80" />
              <rect x="100" y="40" width="35" height="60" />
              <rect x="145" y="10" width="45" height="90" />
              <rect x="200" y="30" width="38" height="70" />
            </g>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">איך עובדים עם ARENA?</h2>
            <p className="text-lg text-slate-600">
              שלושה מסלולים לגילוי הנכס המושלם
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* מסע מודרך */}
            <div className="bg-gradient-to-br from-cyan-50 to-white border-2 border-cyan-200 rounded-3xl p-8 text-center hover:shadow-2xl hover:border-cyan-400 transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                🌀
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">מסע מודרך</h3>
              <p className="text-slate-700 leading-relaxed text-sm">
                ARENA שואלת שאלות קצרות, בונה פרופיל ומציגה נכסים מתאימים.
              </p>
            </div>

            {/* שיחה פתוחה */}
            <div className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-3xl p-8 text-center hover:shadow-2xl hover:border-purple-400 transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                💬
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">שיחה פתוחה</h3>
              <p className="text-slate-700 leading-relaxed text-sm">
                דברו עם ARENA בצ'אט, בקשו נכסים, שאלו שאלות וקבלו הצעות מותאמות.
              </p>
            </div>

            {/* ציון התאמה */}
            <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 rounded-3xl p-8 text-center hover:shadow-2xl hover:border-orange-400 transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                🔍
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">ציון התאמה והסבר</h3>
              <p className="text-slate-700 leading-relaxed text-sm">
                לכל נכס ציון התאמה. לחצו על סימן השאלה להסבר אישי למה זה מתאים לכם.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - שנתחיל? */}
      <section className="relative py-16 bg-gradient-to-l from-sky-400 via-sky-500 to-purple-400 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-lg text-center">שנתחיל?</h2>
          
          {/* Home Component Style */}
          <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200/80">
            {/* Chat Bubble with Logo */}
            <div className="bg-white/90 backdrop-blur-sm rounded-t-2xl p-6 border-b border-slate-200/80 flex items-center gap-6">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c276074aac6e6711db72a6/fefa17145_logoarena3d.png"
                alt="Arena AI Logo"
                className="w-10 h-10 flex-shrink-0"
              />
              <div className="text-right flex-1">
                <p className="text-lg font-semibold mb-2 text-slate-800">
                  היי! אני ארנה, יועצת הנדל"ן החכמה שלך.
                </p>
                <p className="text-slate-700 mb-3">
                  בוא נמצא את הבית הבא עבורך.
                </p>
                
                <div className="space-y-3">
                  <p className="text-slate-800 font-medium">
                    לאיזו מטרה את/ה מחפש/ת נכס?
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={() => handleGetStarted('living')}
                      className="bg-sky-500 hover:bg-sky-600 text-white"
                      size="sm"
                    >
                      נכס למגורים
                    </Button>
                    <Button
                      onClick={() => handleGetStarted('investment')}
                      className="bg-sky-500 hover:bg-sky-600 text-white"
                      size="sm"
                    >
                      נכס להשקעה
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom part: Form */}
            <div className="bg-slate-50/70 p-4 rounded-b-2xl border-t border-slate-200/80">
              <div className="relative">
                <Textarea
                  placeholder="לדוגמה: אני מחפש דירת 4 חדרים מרווחת עם מרפסת שמש באזור שקט של תל אביב, קרוב לגינה ציבורית. התקציב שלי הוא עד 4.5 מיליון שקלים..."
                  className="bg-white text-right px-4 py-4 pb-12 text-lg flex min-h-[80px] ring-offset-background focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-xl border-2 border-slate-200 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:border-sky-400 resize-none shadow-sm placeholder:text-slate-400"
                  rows={5}
                  readOnly
                />
                
                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleGetStarted('')}
                    className="text-slate-600 hover:text-slate-800 flex items-center gap-1 text-sm"
                  >
                    <Compass className="w-4 h-4" />
                    מסע מודרך
                  </Button>
                  <Button
                    size="icon"
                    className="bg-slate-900 hover:bg-black text-white rounded-lg"
                    onClick={() => handleGetStarted('')}
                  >
                    <ArrowUp className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* איך ארנה עוזרת לך */}
      <section id="features-section" className="relative z-10 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">איך ארנה עוזרת לך?</h2>
            <p className="text-lg text-slate-600">
              כלים מתקדמים שיובילו אותך להחלטות נכונות
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* בירור צרכים אישי */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-3">
                <div className="text-4xl">🏘️</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">בירור צרכים אישי</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    גלו את הדירה שתאמת מתאימה לכם. ארנה פותחת איתכם שיחה חכמה וחוחמת כדי להבין מה באמת חשוב לכם.
                  </p>
                  <button 
                    onClick={() => handleGetStarted('living')}
                    className="text-sky-600 hover:text-sky-700 font-medium flex items-center gap-2"
                  >
                    קרא עוד ↓
                  </button>
                </div>
              </div>
            </div>

            {/* סיור תלת-ממד */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-3">
                <div className="text-4xl">🏠</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">סיור תלת-ממד</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    תראו, תרגישו, תבחרו נכשו. עוד לפני שנבניה התחלה - הגיעו - תוכלו להסתובב בדירה ותמכ הנתונים שלכם.
                  </p>
                  <button 
                    onClick={() => navigate(createPageUrl('VirtualTours'))}
                    className="text-sky-600 hover:text-sky-700 font-medium flex items-center gap-2"
                  >
                    קרא עוד ↓
                  </button>
                </div>
              </div>
            </div>

            {/* אפשרויות מימון שלך */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-3">
                <div className="text-4xl">📊</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">אפשרויות מימון שלך</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    לא רק למצוא דירה – זה verstehen. ארנה בודקת עבורכם אפשרויות פיננסיות ומציעה תמונה ברורה.
                  </p>
                  <button 
                    onClick={() => navigate(createPageUrl('Financing'))}
                    className="text-sky-600 hover:text-sky-700 font-medium flex items-center gap-2"
                  >
                    קרא עוד ↓
                  </button>
                </div>
              </div>
            </div>

            {/* השוואת נכסים חכמה */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-3">
                <div className="text-4xl">💰</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">השוואת נכסים חכמה</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    כדי שתוכלו להשוות – כמו שצריך. מערכת ההשוואה של ארנה מציגה את הנכסים המובילים או לצד זה.
                  </p>
                  <button 
                    onClick={() => navigate(createPageUrl('PropertyComparisonInfo'))}
                    className="text-sky-600 hover:text-sky-700 font-medium flex items-center gap-2"
                  >
                    קרא עוד ↓
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* מה הלקוחות שלנו אומרים */}
      <section className="py-12 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">מה הלקוחות שלנו אומרים?</h2>
            <p className="text-lg text-slate-600">
              סיפורי הצלחה של אנשים שמצאו את ביתם עם ארנה
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* המלצה 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop" 
                  alt="יעל כהן" 
                  className="w-24 h-24 rounded-full mb-6 object-cover"
                />
                <p className="text-slate-700 mb-6 leading-relaxed">
                  "ארנה עזרה לי למצוא בדיוק את מה שחיפשתי. ההתלבלת היה פיה קשוששו ומהנה, והשירות היה מקצועי. ואישי."
                </p>
                <div className="font-bold text-slate-900">יעל כהן</div>
                <div className="text-sm text-slate-500">קנתה דירת 4 חדרים בתל אביב</div>
              </div>
            </div>

            {/* המלצה 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" 
                  alt="דני רזין" 
                  className="w-24 h-24 rounded-full mb-6 object-cover"
                />
                <p className="text-slate-700 mb-6 leading-relaxed">
                  "המערכת של ארנה הציעה לי אפשרויות השקעה שלא הכרתי. ההשווארא עזרה לי לבחור על הצפייות שלי."
                </p>
                <div className="font-bold text-slate-900">דני רזין</div>
                <div className="text-sm text-slate-500">השקיע בנכס להשקעה</div>
              </div>
            </div>

            {/* המלצה 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" 
                  alt="שירה לוי" 
                  className="w-24 h-24 rounded-full mb-6 object-cover"
                />
                <p className="text-slate-700 mb-6 leading-relaxed">
                  "ההתהליך היה פיה פשוט ומהנה, והשירות היה מקצועני. ואישי."
                </p>
                <div className="font-bold text-slate-900">שירה לוי</div>
                <div className="text-sm text-slate-500">זוג צעיר, רוכשת ראשונה</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* שאלות נפוצות */}
      <section id="faq-section" className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">שאלות נפוצות</h2>
            <p className="text-xl text-slate-600 flex items-center justify-center gap-2">
              <span>💬</span>
              יש לך שאלה ל-Arena? אולי כבר שאלו אותה לפנייך
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ 1 - מי זו ארנה? */}
            <details className="bg-white rounded-2xl p-6 shadow-sm group">
              <summary className="text-xl font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                <span>מי זו ארנה?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-6 text-slate-700 leading-relaxed space-y-4">
                <p>
                  ארנה היא יועצת הנדל"ן האישית שלך - אובייקטיבית, אמינה, ומותאמת בדיוק אליך.
                </p>
                <p>
                  היא לא עוד מוכרת או משווקת נדל"ן מטעם קבלן, אלא מלווה אותך בצד שלך בלבד.
                </p>
                <p>
                  בניגוד ללוחות נדל"ן שהם לוח מודעות קר וסטטי, ארנה מבינה אותך. היא לומדת מה חשוב לך באמת - ומוצאת עבורך את הדירה שתהפוך לבית.
                </p>
                <p className="text-sky-600 font-medium">
                  👉 עם ארנה, לא צריך לנחש, לא צריך להתפשר.
                </p>
              </div>
            </details>

            {/* FAQ 2 - איך ארנה מתאימה לי דירות? */}
            <details className="bg-white rounded-2xl p-6 shadow-sm group">
              <summary className="text-xl font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                <span>איך ארנה מתאימה לי דירות?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-6 text-slate-700 leading-relaxed space-y-4">
                <p>
                  בזמן שלוחות מודעות רגילים מציעים לסנן לפי חדרים, מחיר או שכונה, ארנה פועלת אחרת: היא מתחילה משיחה איתך, מבינה מי אתה ומה באמת חשוב לך – לא רק מה שאתה חושב שאתה מחפש.
                </p>
                <p className="text-sky-600 font-medium">
                  👉 לא פילטרים גנריים - אלא דיסקוורי אישי שמותאם לחיים שלך.
                </p>
                <p>
                  המערכת לומדת אותך לעומק: החל ממטבח לאירוח חברים, דרך קרבה לבית ספר מסוים, ועד תחושת אור טבעי ונוף מהחלון.
                </p>
                <p>
                  מעבר לזה, ארנה יודעת לחשוף צרכים חבויים – כמו תחבורה נוחה לעבודה עתידית, התאמה להגדלת משפחה, או חיבור לקהילה – ולגלות עבורך אפשרויות שלא בהכרח חשבת עליהן.
                </p>
                <p>
                  מאחורי הקלעים פועל אלגוריתם חכם שמנתח פרופילים פסיכולוגיים, התנהגותיים, כלכליים ורגשיים, ומשווה אותם למאגר עצום של פרויקטים.
                </p>
                <p>
                  התוצאה: לא עוד רשימה ארוכה של מודעות, אלא גילוי אמיתי של דירות שמתאימות באמת לחיים שלך.
                </p>
                <button className="text-sky-600 hover:text-sky-700 font-medium">סגור</button>
              </div>
            </details>

            {/* FAQ 3 - איך מתחילים את תהליך בירור הצרכים? */}
            <details className="bg-white rounded-2xl p-6 shadow-sm group">
              <summary className="text-xl font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                <span>איך מתחילים את תהליך בירור הצרכים?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-6 text-slate-700 leading-relaxed space-y-4">
                <p>
                  התהליך פשוט ומתחיל מהרגע הראשון שבו אתם מתחילים שיחה עם ארנה. תוכלו לבחור בין שתי דרכים עיקריות לגילוי הנכס הבא שלכם.
                </p>
                <p className="text-sky-600 font-medium">
                  👉 בחירה שלך: מסע מודרך או שיחה חופשית.
                </p>
                <p>
                  ב<strong>מסע המודרך</strong>, ארנה תוביל אותך צעד אחר צעד עם שאלות מפתח על תקציב, אזור, גודל ומאפיינים חשובים. זהו מסלול מצוין למי שרוצה לוודא שלא שכח שום פרט חשוב.
                </p>
                <p>
                  ב<strong>שיחה הפתוחה</strong>, תוכלו פשוט לכתוב לארנה מה אתם מחפשים בשפה שלכם, והיא תבין אתכם, תשאל שאלות המשך, ותציג לכם נכסים בהתאם. זהו מסלול שמרגיש כמו שיחה עם יועץ אמיתי.
                </p>
                <button className="text-sky-600 hover:text-sky-700 font-medium">סגור</button>
              </div>
            </details>

            {/* FAQ 4 - האם השימוש בארנה כרוך בתשלום? */}
            <details className="bg-white rounded-2xl p-6 shadow-sm group">
              <summary className="text-xl font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                <span>האם השימוש בארנה כרוך בתשלום?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-6 text-slate-700 leading-relaxed space-y-4">
                <p>
                  לא. השירות חינמי לחלוטין עבורך כרוכש פוטנציאלי.
                </p>
                <p className="text-sky-600 font-medium">
                  👉 אתה מקבל יועצת אישית בלי לשלם שקל.
                </p>
                <p>
                  המודל העסקי של ארנה מבוסס על שיתופי פעולה עם יזמים וקבלנים שמעוניינים להציג את הפרויקטים שלהם בפני הקונים המתאימים. בנוסף, קיימים שיתופי פעולה עם בנקים למשכנתאות, יועצי משכנתאות, עורכי דין וחברות נוספות שמציעות שירותים ומוצרים רלוונטיים לרוכשי דירות.
                </p>
                <p>
                  בזכות זה אתה נהנה מכל השירותים - בירור צרכים, חיפוש מותאם אישית, צ'אט חכם, הדמיות תלת־ממד וייעוץ במימון - ללא עלות וללא התחייבות.
                </p>
                <p>
                  ולא פחות חשוב - לאחר חתימת עסקה, חברי מועדון ארנה מקבלים מתנת רכישה ייחודית שמתעדכנת מעת לעת.
                </p>
                <button className="text-sky-600 hover:text-sky-700 font-medium">סגור</button>
              </div>
            </details>

            {/* FAQ 5 - מה לגבי הפרטיות שלי? */}
            <details className="bg-white rounded-2xl p-6 shadow-sm group">
              <summary className="text-xl font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                <span>מה לגבי הפרטיות שלי?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-6 text-slate-700 leading-relaxed space-y-4">
                <p>
                  הפרטיות שלך חשובה לנו מאוד.
                </p>
                <p className="text-sky-600 font-medium">
                  👉 המידע שלך נשאר אצלך - ונמסר רק אם תרצה בכך.
                </p>
                <p>
                  פרטיך יועברו ליזמים או נותני שירות רלוונטיים רק אם התעניינת בנכס מסוים או נמצא שהוא מתאים לך בבירור צרכים.
                </p>
                <p>
                  אם לא נרשמת - פרטיך לא יועברו.
                </p>
                <p>
                  יתכן שימוש במידע באופן אנונימי לשיפור המערכת, אך לעולם לא נמכור או נשתף פרטים מזהים אם לא הבעת הסכמה לכך.
                </p>
                <a href={createPageUrl('PrivacyPolicy')} className="text-sky-600 hover:text-sky-700 font-medium underline">
                  לתנאי שימוש ומדיניות פרטיות
                </a>
                <button className="text-sky-600 hover:text-sky-700 font-medium block mt-2">סגור</button>
              </div>
            </details>

            {/* FAQ 6 - מאיפה מגיע המידע בארנה? */}
            <details className="bg-white rounded-2xl p-6 shadow-sm group">
              <summary className="text-xl font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                <span>מאיפה מגיע המידע בארנה?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-6 text-slate-700 leading-relaxed space-y-4">
                <p>
                  ארנה משלבת בין נתונים רשמיים, מידע מסחרי מהיזמים ומחקרי עומק שבוצעו על ידי הצוות.
                </p>
                <p className="text-sky-600 font-medium">
                  👉 מידע ממשי על השוק לצד פרטים עדכניים על נכסים.
                </p>
                <p>במערכת מופיעים:</p>
                <ul className="list-disc mr-6 space-y-2">
                  <li>
                    <strong>נתונים רשמיים מגופים כמו רשות המיסים, מנהל התכנון, הלמ"ס ומשרד התחבורה ועוד</strong> – שמאפשרים להבין עסקאות שבוצעו בפועל, תוכניות פיתוח עתידיות, תחבורה וחינוך.
                  </li>
                  <li>
                    <strong>מידע שמספקים היזמים עצמם</strong> – מפרטים טכניים, תוכניות דירה, הדמיות, מחירים ותנאי רכישה.
                  </li>
                  <li>
                    <strong>מחקרי עומק פנימיים של צוות ארנה</strong> – בשיתוף אנשי מקצוע, לצורך אפיון פרופילי רוכשים וקטגוריות נכסים.
                  </li>
                </ul>
                <p>
                  חשוב לדעת: ארנה עצמה אינה מוכרת דירות ואינה מתווכת – היא מציגה עבורך את המידע שנמסר מהגורמים השונים בצורה ברורה, מאורגנת ואובייקטיבית ככל האפשר.
                </p>
                <a href={createPageUrl('PrivacyPolicy')} className="text-sky-600 hover:text-sky-700 font-medium underline">
                  לתנאי שימוש ומדיניות פרטיות
                </a>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-amber-900">
                    <span className="font-bold">⭐ לתשומת לבך:</span> המידע במערכת ארנה מוצג כפי שנמסר על ידי היזמים, לצד נתונים רשמיים ומחקרים שביצע צוות ארנה. המערכת אינה מעניקה שירותי תיווך ואינה צד לעסקאות נדל"ן – כל התקשרות נעשית ישירות מול היזם או הגורם הרלוונטי. השימוש במערכת כפוף לתקנון האתר ותנאי השימוש.
                  </p>
                </div>
                <button className="text-sky-600 hover:text-sky-700 font-medium">סגור</button>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* השותפים שלנו */}
      <section className="py-12 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">השותפים שלנו</h2>
            <p className="text-xl text-slate-600">
              עובדים עם המובילים בתחום הנדל"ן בישראל
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/d929f767a_image.png" alt="אורה" className="h-16 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/b980046be_image.png" alt="אפריקה ישראל" className="h-16 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/aa4c91ca1_image.png" alt="דמרי" className="h-16 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/b1480d5dd_image.png" alt="סטרום" className="h-16 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/82a1e3cda_image.png" alt="הדהד" className="h-16 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
          </div>
        </div>
      </section>


    </div>
  );
}