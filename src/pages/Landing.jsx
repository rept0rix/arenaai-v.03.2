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
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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
    if (purpose) {
      setSelectedPurpose(purpose);
    }
    if (searchTerm.trim()) {
      const chatUrl = createPageUrl(`Chat?purpose=${purpose || selectedPurpose}&q=${encodeURIComponent(searchTerm)}`);
      navigate(chatUrl);
    } else {
      navigate(createPageUrl('Home'));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedPurpose) {
      alert('אנא בחר מטרת חיפוש לפני תחילת השיחה');
      return;
    }
    if (searchTerm.trim()) {
      const chatUrl = createPageUrl(`Chat?purpose=${selectedPurpose}&q=${encodeURIComponent(searchTerm)}`);
      navigate(chatUrl);
    }
  };

  const handleLogout = async () => {
    // Logout functionality if needed
    setUser(null);
    navigate(createPageUrl('Landing'));
  };




  return (
    <div className="min-h-screen relative bg-white" dir="rtl" data-page="landing">
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

        @keyframes skylineDraw {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 0.12; transform: translateY(0); }
        }

        .skyline-animation {
          animation: skylineDraw 1.5s ease-out forwards;
        }
      `}</style>

      {/* Hero Section - Compact & Branded */}
      <div className="relative h-[60vh] md:h-[55vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-l from-sky-400 via-sky-500 to-purple-400"></div>

        {/* Skyline - Line art, thin, low opacity, only in hero */}
        <div className="absolute bottom-0 left-0 right-0 h-48 skyline-animation">
          <svg 
            viewBox="0 0 1200 200" 
            className="w-full h-full" 
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke="white" strokeWidth="1.5" fill="none" opacity="0.15">
              {/* Building 1 */}
              <rect x="50" y="80" width="60" height="120" />
              <line x1="65" y1="90" x2="65" y2="100" />
              <line x1="80" y1="90" x2="80" y2="100" />
              <line x1="95" y1="90" x2="95" y2="100" />
              <line x1="65" y1="120" x2="65" y2="130" />
              <line x1="80" y1="120" x2="80" y2="130" />
              <line x1="95" y1="120" x2="95" y2="130" />

              {/* Building 2 */}
              <rect x="150" y="50" width="80" height="150" />
              <line x1="170" y1="65" x2="170" y2="75" />
              <line x1="190" y1="65" x2="190" y2="75" />
              <line x1="210" y1="65" x2="210" y2="75" />
              <line x1="170" y1="100" x2="170" y2="110" />
              <line x1="190" y1="100" x2="190" y2="110" />
              <line x1="210" y1="100" x2="210" y2="110" />

              {/* Building 3 */}
              <rect x="270" y="100" width="50" height="100" />
              <line x1="285" y1="115" x2="285" y2="125" />
              <line x1="305" y1="115" x2="305" y2="125" />

              {/* Building 4 - Tall */}
              <rect x="360" y="20" width="70" height="180" />
              <line x1="380" y1="40" x2="380" y2="50" />
              <line x1="400" y1="40" x2="400" y2="50" />
              <line x1="410" y1="40" x2="410" y2="50" />

              {/* Building 5 */}
              <rect x="470" y="70" width="65" height="130" />
              <line x1="490" y1="85" x2="490" y2="95" />
              <line x1="510" y1="85" x2="510" y2="95" />

              {/* Building 6 */}
              <rect x="580" y="90" width="55" height="110" />

              {/* Building 7 - Tall */}
              <rect x="680" y="30" width="75" height="170" />
              <line x1="700" y1="50" x2="700" y2="60" />
              <line x1="720" y1="50" x2="720" y2="60" />
              <line x1="740" y1="50" x2="740" y2="60" />

              {/* Building 8 */}
              <rect x="800" y="85" width="60" height="115" />

              {/* Building 9 */}
              <rect x="900" y="60" width="70" height="140" />
              <line x1="920" y1="75" x2="920" y2="85" />
              <line x1="940" y1="75" x2="940" y2="85" />
              <line x1="960" y1="75" x2="960" y2="85" />

              {/* Building 10 */}
              <rect x="1010" y="95" width="50" height="105" />

              {/* Building 11 */}
              <rect x="1100" y="75" width="65" height="125" />
            </g>
          </svg>
        </div>

        {/* Logo and Login - inside hero */}
        <div className="absolute top-6 left-0 right-0 z-20 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/Landing" className="inline-block transition-opacity hover:opacity-80">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d4f4dd75d87c3bfdbcb02f/491ea62ed_logo-white.png"
                alt="Arena AI"
                className="h-10"
              />
            </a>

            {/* User Section */}
            <div className="flex items-center gap-3">
              {isLoading ? (
                <div className="w-8 h-8 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-white hover:text-white/90 hover:bg-white/10">
                      <ChevronDown className="w-3 h-3" />
                      <span className="font-medium">
                        שלום, {user.full_name?.split(' ')[0] || 'משתמש'}
                      </span>
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
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
                <Button 
                  onClick={handleLogin}
                  className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 rounded-full px-6"
                >
                  התחברות
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Hero Content - Title and Subtitle only */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-2xl">
            בית <span className="text-white/90">החלומות</span> שלך
          </h1>

          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-white/95 drop-shadow-lg font-medium">
            ארנה AI מאפשרת לך למצוא את הנכס המושלם באמצעות טכנולוגיה מתקדמת וייעוץ אישי
          </p>
        </div>
      </div>

      {/* Onboarding Interactive Section - Appears right below hero on desktop */}
      <section className="relative py-12 bg-gradient-to-b from-sky-400/10 via-purple-400/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
            {/* Chat Component - Same as Home page */}
            <div className="w-full bg-white rounded-2xl shadow-2xl border border-slate-200/80">
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
                        onClick={() => setSelectedPurpose('living')}
                        className={selectedPurpose === 'living' ? "bg-sky-500 hover:bg-sky-600 text-white" : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"}
                        size="sm"
                      >
                        נכס למגורים
                      </Button>
                      <Button
                        onClick={() => setSelectedPurpose('investment')}
                        className={selectedPurpose === 'investment' ? "bg-sky-500 hover:bg-sky-600 text-white" : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"}
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
                <form onSubmit={handleFormSubmit} className="relative">
                  <Textarea
                    placeholder="לדוגמה: אני מחפש דירת 4 חדרים מרווחת עם מרפסת שמש באזור שקט של תל אביב, קרוב לגינה ציבורית. התקציב שלי הוא עד 4.5 מיליון שקלים..."
                    className="bg-white text-right px-4 py-4 pb-12 text-lg flex min-h-[80px] ring-offset-background focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-xl border-2 border-slate-200 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:border-sky-400 resize-none shadow-sm placeholder:text-slate-400"
                    rows={5}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (!selectedPurpose) {
                          alert('אנא בחר מטרת חיפוש לפני תחילת המסע המודרך');
                          return;
                        }
                        navigate(createPageUrl(`Chat?purpose=${selectedPurpose}&guided=true`));
                      }}
                      className="text-slate-600 hover:text-slate-800 flex items-center gap-1 text-sm"
                    >
                      <Compass className="w-4 h-4" />
                      מסע מודרך
                    </Button>
                    <Button
                      type="submit"
                      size="icon"
                      className="bg-slate-900 hover:bg-black text-white rounded-lg"
                      disabled={!searchTerm.trim()}
                    >
                      <ArrowUp className="w-5 h-5" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Three Cubes - Supporting the chat on the right */}
            <div className="space-y-4">
              {/* מסע מודרך */}
              <div className="bg-gradient-to-br from-cyan-50 to-white border-2 border-cyan-200 rounded-2xl p-6 hover:shadow-xl hover:border-cyan-400 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                    🌀
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">מסע מודרך</h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      ARENA שואלת שאלות קצרות, בונה פרופיל ומציגה נכסים מתאימים.
                    </p>
                  </div>
                </div>
              </div>

              {/* שיחה פתוחה */}
              <div className="bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 rounded-2xl p-6 hover:shadow-xl hover:border-purple-400 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                    💬
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">שיחה פתוחה</h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      דברו עם ARENA בצ'אט, בקשו נכסים, שאלו שאלות וקבלו הצעות מותאמות.
                    </p>
                  </div>
                </div>
              </div>

              {/* ציון התאמה */}
              <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 rounded-2xl p-6 hover:shadow-xl hover:border-orange-400 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                    🔍
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">ציון התאמה והסבר</h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      לכל נכס ציון התאמה. לחצו על סימן השאלה להסבר אישי למה זה מתאים לכם.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* איך ארנה עוזרת לך */}
      <section id="features-section" className="relative z-10 py-12 bg-white" style={{ marginTop: '-2rem' }}>
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
      <section className="py-12 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">השותפים שלנו</h2>
            <p className="text-xl text-slate-600">
              עובדים עם המובילים בתחום הנדל"ן בישראל
            </p>
          </div>

          <div className="relative">
            <div className="flex gap-12 md:gap-16 animate-scroll">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/d929f767a_image.png" alt="אורה" className="h-16 hover:scale-110 transition-transform flex-shrink-0" />
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/b980046be_image.png" alt="אפריקה ישראל" className="h-16 hover:scale-110 transition-transform flex-shrink-0" />
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/aa4c91ca1_image.png" alt="דמרי" className="h-16 hover:scale-110 transition-transform flex-shrink-0" />
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/b1480d5dd_image.png" alt="סטרום" className="h-16 hover:scale-110 transition-transform flex-shrink-0" />
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/82a1e3cda_image.png" alt="הדהד" className="h-16 hover:scale-110 transition-transform flex-shrink-0" />
              {/* Duplicate for seamless loop */}
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/d929f767a_image.png" alt="אורה" className="h-16 hover:scale-110 transition-transform flex-shrink-0" />
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/b980046be_image.png" alt="אפריקה ישראל" className="h-16 hover:scale-110 transition-transform flex-shrink-0" />
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/aa4c91ca1_image.png" alt="דמרי" className="h-16 hover:scale-110 transition-transform flex-shrink-0" />
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/b1480d5dd_image.png" alt="סטרום" className="h-16 hover:scale-110 transition-transform flex-shrink-0" />
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/82a1e3cda_image.png" alt="הדהד" className="h-16 hover:scale-110 transition-transform flex-shrink-0" />
            </div>
          </div>
        </div>
      </section>
{/* Cookie Banner */}
{showCookieBanner && (
  <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-t border-slate-700 shadow-2xl">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between gap-6 flex-wrap md:flex-nowrap">
        <div className="flex-1 min-w-[250px]">
          <p className="text-sm text-white leading-relaxed">
            אנחנו משתמשים בעוגיות כדי לשפר את חווית הגלישה שלך ולהבין כיצד המשתמשים משתמשים באתר.
            <a href={createPageUrl('PrivacyPolicy')} className="text-sky-300 hover:text-sky-200 underline mr-1">
              מדיניות פרטיות
            </a>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              localStorage.setItem('arena_cookie_consent', 'accepted');
              setShowCookieBanner(false);
            }}
            className="bg-white hover:bg-slate-100 text-slate-900 text-sm font-medium rounded-lg px-6 py-2 whitespace-nowrap shadow-lg"
          >
            הבנתי
          </Button>
        </div>
      </div>
    </div>
  </div>
)}

</div>
);
}