import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown, User, LogOut, UserCircle, Settings, Shield, Heart, History } from 'lucide-react';
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
      {/* Custom CSS for logo animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* Moves by half its own width, effectively one full set of logos */
        }
        .animate-scroll {
          animation: scroll 30s linear infinite; /* Adjust duration as needed */
          will-change: transform; /* Optimize for animation performance */
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

      {/* Hero Section with Skyline */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-cyan-100 to-purple-200"></div>
        
        {/* Skyline SVG */}
        <svg className="absolute bottom-0 left-0 right-0 w-full h-48 md:h-64" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <g stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none">
            <rect x="50" y="180" width="60" height="140" />
            <rect x="120" y="140" width="50" height="180" />
            <rect x="180" y="160" width="70" height="160" />
            <rect x="260" y="100" width="60" height="220" />
            <rect x="330" y="130" width="55" height="190" />
            <rect x="395" y="150" width="65" height="170" />
            <rect x="470" y="120" width="50" height="200" />
            <rect x="530" y="90" width="70" height="230" />
            <rect x="610" y="140" width="60" height="180" />
            <rect x="680" y="110" width="55" height="210" />
            <rect x="745" y="130" width="65" height="190" />
            <rect x="820" y="100" width="60" height="220" />
            <rect x="890" y="150" width="50" height="170" />
            <rect x="950" y="120" width="70" height="200" />
            <rect x="1030" y="140" width="60" height="180" />
            <rect x="1100" y="110" width="55" height="210" />
            <rect x="1165" y="160" width="65" height="160" />
            <rect x="1240" y="130" width="60" height="190" />
            <rect x="1310" y="100" width="70" height="220" />
          </g>
        </svg>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-slate-800">
            בית <span className="text-sky-600">החלומות</span> שלך
          </h1>
          
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-slate-700 font-medium">
            ארנה AI מאפשרת לך למצוא את הנכס המושלם באמצעות טכנולוגיה מתקדמת וייעוץ אישי
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20">
          <span className="text-slate-700 text-sm font-medium">גלול למטה</span>
          <ChevronDown className="w-8 h-8 text-slate-700 animate-bounce" />
        </div>
      </div>

      {/* איך עובדים עם ARENA - Onboarding */}
      <section className="relative py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">איך עובדים עם ARENA?</h2>
            <p className="text-lg text-slate-600">
              שלושה דרכים פשוטות להתחיל את המסע שלך
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* מסע מודרך */}
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 bg-cyan-500 rounded-full flex items-center justify-center text-4xl">
                🌀
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">מסע מודרך</h3>
              <p className="text-slate-700 leading-relaxed">
                ARENA שואלת שאלות קצרות, בונה פרופיל ומציגה נכסים מתאימים בדיוק עבורך
              </p>
            </div>

            {/* שיחה פתוחה */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 bg-purple-500 rounded-full flex items-center justify-center text-4xl">
                💬
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">שיחה פתוחה</h3>
              <p className="text-slate-700 leading-relaxed">
                דברו עם ARENA בצ'אט, בקשו נכסים, שאלו שאלות וקבלו הצעות מותאמות אישית
              </p>
            </div>

            {/* ציון התאמה */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 bg-orange-500 rounded-full flex items-center justify-center text-4xl">
                🔍
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">ציון התאמה והסבר</h3>
              <p className="text-slate-700 leading-relaxed">
                לכל נכס יש ציון התאמה. לחצו על סימן השאלה לקבלת הסבר אישי למה הוא מתאים לכם
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-l from-sky-400 via-cyan-300 to-purple-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">שנתחיל?</h2>
            
            {/* Purpose Selection */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 max-w-xl mx-auto">
              <Button 
                onClick={() => handleGetStarted('living')}
                size="lg"
                className="bg-white text-slate-900 hover:bg-white/90 rounded-2xl h-16 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <span className="text-2xl ml-3">🏡</span>
                מגורים
              </Button>
              <Button 
                onClick={() => handleGetStarted('investment')}
                size="lg"
                className="bg-white text-slate-900 hover:bg-white/90 rounded-2xl h-16 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <span className="text-2xl ml-3">💸</span>
                השקעה
              </Button>
            </div>

            {/* Chat Start Options */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/826138143_a1d576606_a-icon-shadow1.png"
                  alt="Arena AI"
                  className="w-16 h-16"
                />
                <p className="text-lg font-semibold text-slate-800 text-right">
                  היי, אני ארנה. איך תרצו להתחיל?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <Button 
                  onClick={() => handleGetStarted('living')}
                  variant="outline"
                  className="h-auto py-4 px-6 text-right justify-start hover:bg-cyan-50 border-2"
                >
                  <div>
                    <div className="font-bold text-slate-900 mb-1">מסע מודרך</div>
                    <div className="text-sm text-slate-600">שאלות קצרות והתאמה אישית</div>
                  </div>
                </Button>
                <Button 
                  onClick={() => handleGetStarted('investment')}
                  variant="outline"
                  className="h-auto py-4 px-6 text-right justify-start hover:bg-purple-50 border-2"
                >
                  <div>
                    <div className="font-bold text-slate-900 mb-1">שיחה פתוחה</div>
                    <div className="text-sm text-slate-600">צ'אט חופשי עם ארנה</div>
                  </div>
                </Button>
              </div>

              {/* Quick Start Options */}
              <div className="text-sm text-slate-600 mb-3 text-center">או התחילו עם:</div>
              <div className="flex flex-wrap justify-center gap-2">
                {["דירת 4 חדרים", "בית פרטי", "נכס להשקעה", "דירה בתל אביב"].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleGetStarted('')}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* איך ארנה עוזרת לך */}
      <section id="features-section" className="relative z-10 py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">איך ארנה עוזרת לך?</h2>
            <p className="text-xl text-slate-600">
              אנרגינה כלים מתקדמים שיובילו אותך לידיעת החלטות
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* בירור צרכים אישי */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-6 mb-4">
                <div className="text-5xl">🏘️</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">בירור צרכים אישי</h3>
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
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-6 mb-4">
                <div className="text-5xl">🏠</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">סיור תלת-ממד</h3>
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
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-6 mb-4">
                <div className="text-5xl">📊</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">אפשרויות מימון שלך</h3>
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
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-6 mb-4">
                <div className="text-5xl">💰</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">השוואת נכסים חכמה</h3>
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
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">מה הלקוחות שלנו אומרים?</h2>
            <p className="text-xl text-slate-600">
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
      <section id="faq-section" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">שאלות נפוצות</h2>
            <p className="text-xl text-slate-600">
              יש לך שאלה? אולי כבר עברו לפניך 💬
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <details className="bg-slate-50 rounded-2xl p-6 group">
              <summary className="text-xl font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                <span>מי זו ארנה?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-slate-600 leading-relaxed">
                <p className="mb-4">
                  ארנה היא יועצת הנדל"ן האישית שלך – אוכיקדיבת, אמינה, ומתקדמת בזיגה אליף.
                  היא לא עוד מוכרת או משווקת נדל"ן מסם קבלן, אלא מלווה אותך בצד שלך בצבד.
                </p>
                <p className="mb-4">
                  במעגד לזהות נדל"ן שנמק קורקוסט פר וטסטט, ארנה מניבה לך באמת – ומצאלת
                  עבוור את הדירה שתתפוקר לבית.
                </p>
                <p className="text-sky-600 font-medium">
                  👉 עם ארנה, לא צריך לנמש, לא צריך להתפשר:
                </p>
              </div>
            </details>

            {/* FAQ 2 */}
            <details className="bg-slate-50 rounded-2xl p-6 group">
              <summary className="text-xl font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                <span>איך ארנה מתאימה לי דירה?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-slate-600 leading-relaxed">
                <p>
                  בזמן שלהקיות מידעות ודיליםים מציעים לסכן פר חדרים, מחיר או טקנה, ארנה פועלת אחרת: היא מתהילה משיחה
                  איזה, מניבה מי אתה ומה, באמת הנוב לך – לא רק מה הוא, מה שאאתה הוומש המפש.
                </p>
                <p className="mt-4 text-sky-600 font-medium">
                  👉 לא פילפרים גנריים – אלא דיסקווי! אישי שמתאומה לחיים שלו:
                </p>
              </div>
            </details>

            {/* FAQ 3 */}
            <details className="bg-slate-50 rounded-2xl p-6 group">
              <summary className="text-xl font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                <span>איך מתחילים את התהליך ברארנה?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-slate-600 leading-relaxed">
                <p>
                  ההתהליק פשווט ומתחיל מהרגאל שווססן שזב אזמן מתחיליםם שיאתה עם ארנה. תוכלו לבחאור בין שווש דרכים עדיריות
                  לעליי: הנפןב חבא שלכם.
                </p>
                <p className="mt-4 text-sky-600 font-medium">
                  👉 בחרtaה שלף: מטס מווdri או שיחה חופשית:
                </p>
              </div>
            </details>

            {/* FAQ 4 */}
            <details className="bg-slate-50 rounded-2xl p-6 group">
              <summary className="text-xl font-bold text-slate-900 cursor-pointer list-none flex justify-between items-center">
                <span>האם השימוש בארנה כרוך בתשלום?</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 text-slate-600 leading-relaxed">
                <p>
                  לא. השירות חוויתי ללהווחתי וערבי הרומיםים הווהיווואליי.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* השותפים שלנו */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">השותפים שלנו</h2>
            <p className="text-xl text-slate-600">
              עובדים עם המובילים בתחום הנדל"ן בישראל
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d4f4dd75d87c3bfdbcb02f/dd1a9b15a_dimrilogo.png" alt="דמרי" className="h-16 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d4f4dd75d87c3bfdbcb02f/6c8ded50f_africaisraellogo.png" alt="אפריקה ישראל" className="h-16 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d4f4dd75d87c3bfdbcb02f/491b94b0d_auralogo.png" alt="אאורה" className="h-16 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d4f4dd75d87c3bfdbcb02f/0c9d8e70c_straomlogo.png" alt="סטרום" className="h-16 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
          </div>
        </div>
      </section>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-300 shadow-2xl z-[100]">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-[250px]">
                <p className="text-base text-slate-800 leading-relaxed mb-2 font-medium">
                  אנחנו משתמשים בקוקיס כדי לשפר את חווית הגלישה שלך
                </p>
                <p className="text-sm text-slate-600">
                  למידע נוסף, בקר ב
                  <a href={createPageUrl('PrivacyPolicy')} className="text-sky-600 hover:text-sky-700 underline mx-1 font-medium">
                    מדיניות הפרטיות
                  </a>
                  שלנו.
                </p>
              </div>
              <div className="flex gap-3 items-center flex-wrap">
                <button
                  onClick={() => {
                    localStorage.setItem('arena_cookie_consent', 'all');
                    setShowCookieBanner(false);
                  }}
                  className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white text-base font-bold rounded-xl transition-colors whitespace-nowrap shadow-md hover:shadow-lg"
                >
                  הבנתי
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('arena_cookie_consent', 'rejected');
                    setShowCookieBanner(false);
                  }}
                  className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 text-base font-medium rounded-xl transition-colors whitespace-nowrap"
                >
                  דחה
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}