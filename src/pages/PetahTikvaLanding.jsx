import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { User as UserEntity } from '@/entities/User';
import { ChevronDown, User, LogOut, UserCircle, Settings, Shield, Heart, History, ArrowUp } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import PtPromotions from '../components/petah-tikva/PtPromotions';
import PtAnimatedSearch from '../components/petah-tikva/PtAnimatedSearch';
import PtOnboardingCards from '../components/petah-tikva/PtOnboardingCards';
import PtContactSection from '../components/petah-tikva/PtContactSection';
import PtKeyMessage from '../components/petah-tikva/PtKeyMessage';

export default function PetahTikvaLanding() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      const currentUser = await UserEntity.me();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
    setIsLoading(false);
  };

  const handleLogin = async () => {
    navigate(createPageUrl('Login'));
  };

  const handleLogout = async () => {
    try {
      await UserEntity.logout();
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleGetStarted = (purpose = '') => {
    if (purpose === 'financing') {
      navigate(createPageUrl('Financing'));
      return;
    }

    if (user) {
      navigate(createPageUrl(`Home?purpose=${purpose}`));
    } else {
      if (purpose) {
        localStorage.setItem('selectedPurpose', purpose);
      }
      navigate(createPageUrl('Login'));
    }
  };

  const handleQuickSearch = (query) => {
    if (user) {
      navigate(createPageUrl(`Chat?purpose=living&q=${encodeURIComponent(query)}`));
    } else {
      localStorage.setItem('pendingChatRedirect', JSON.stringify({ purpose: 'living', query, isGuided: false }));
      navigate(createPageUrl('Login'));
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800" dir="rtl">
      {/* Navigation */}
      <nav className="relative z-20 bg-white border-b border-slate-100 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/053b1be56_arenaailogo-new.png"
              alt="Arena AI"
              className="h-10"
            />
            <div className="hidden md:flex items-center gap-3 border-r border-slate-200 pr-4 mr-2">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d4f4dd75d87c3bfdbcb02f/d951b32ed_Coat_of_arms_of_Petah-Tiquasvg.png" 
                alt="סמל פתח תקוה" 
                className="h-10 w-auto opacity-90 grayscale-[0.2] hover:grayscale-0 transition-all"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-[#174C6B] text-sm">Arena for Petah Tikva</span>
                <span className="text-[10px] text-[#A67C52] font-bold uppercase tracking-wider">Smart City Edition</span>
              </div>
            </div>
          </div>
          
          {/* User Section */}
          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="w-8 h-8 animate-spin rounded-full border-2 border-slate-300 border-t-cyan-600"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 text-slate-700 hover:text-[#174C6B]">
                    <ChevronDown className="w-3 h-3" />
                    <span className="font-medium">
                      שלום, {user.full_name?.split(' ')[0] || 'משתמש'}
                    </span>
                    <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-[#174C6B]" />
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
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 ml-2" />
                    התנתקות
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={handleLogin}
                className="bg-[#174C6B] text-white hover:bg-[#123a52] rounded-full px-6 shadow-sm"
              >
                התחברות
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image - Matching Home Page Structure */}
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-blue-50 to-sky-100">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{backgroundImage: "url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d4f4dd75d87c3bfdbcb02f/7f67df95a_WhatsAppImage2025-12-05at072148.jpg')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/40"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-10">
          
          {/* Hero Text */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white" style={{textShadow: '0 2px 10px rgba(0,0,0,0.2)'}}>
            בית החלומות שלך <span className="text-[#174C6B]">בפתח תקוה</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-slate-800 font-medium bg-white/30 backdrop-blur-sm rounded-full py-2 px-6 inline-block border border-white/40">
            כאן צומחות שכונות העתיד – המהדורה המיוחדת של Arena לפתח תקוה
          </p>

          {/* Chat Bubble with Logo - Exact Home Page Style */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 max-w-xl mx-auto mb-8 border border-white/40 shadow-lg flex items-center gap-6">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/826138143_a1d576606_a-icon-shadow1.png"
              alt="Arena AI Logo"
              className="w-20 h-20 flex-shrink-0"
            />
            <div className="text-right flex-1">
              <p className="text-lg font-semibold mb-4 text-slate-800">
                היי, אני ארנה, המומחית לנדל"ן בפתח תקוה.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => handleGetStarted('living')}
                  variant="outline"
                  className="border-[#5F3A93] text-[#5F3A93] hover:bg-[#5F3A93] hover:text-white flex-1 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300"
                >
                  <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/185d11183_key.png" alt="למגורים" className="w-5 h-5" />
                  למגורים
                </Button>
                <Button 
                  onClick={() => handleGetStarted('investment')}
                   variant="outline"
                  className="border-[#5F3A93] text-[#5F3A93] hover:bg-[#5F3A93] hover:text-white flex-1 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300"
                >
                  <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/61b166f5c_Layer_2.png" alt="להשקעה" className="w-5 h-5" />
                  להשקעה
                </Button>
              </div>
            </div>
          </div>

          {/* Animated Search - replacing Quick Options */}
          <div className="max-w-xl mx-auto mb-8">
             <PtAnimatedSearch onSearch={handleQuickSearch} />
          </div>

          {/* Promotions - Clean Style */}
          <div className="mb-12">
             <PtPromotions />
          </div>

          {/* Key Messages - Interactive Tooltips */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 mt-2 mb-8 relative z-30">
             <PtKeyMessage 
                icon="🏢"
                title="מרכז החדשנות של ישראל"
                shortText="עיר מובילה בטכנולוגיה, מחקר ויזמות – לב האקוסיסטם החדש של גוש דן."
                highlightText="יותר מ־1,000 חברות הייטק פועלות בעיר."
                longText="פתח תקוה מדורגת בין ערי התעסוקה החזקות בישראל עם מאות חברות הייטק, סייבר ורפואה דיגיטלית. בעיר פועלות יותר מ־1,000 חברות טכנולוגיה - כולל מרכזי פיתוח של אינטל, אופטיבייס, אלקטריאון ועוד. העיר מובילה יוזמות חדשנות, חממות טכנולוגיות, תשתית עיר חכמה ושיתופי פעולה עם האקדמיה."
             />
             <PtKeyMessage 
                icon="🎓"
                title="חינוך מעולה וקהילות חזקות"
                shortText="מערכת חינוך מצוינת וקהילות חמות שמותאמות במיוחד למשפחות צעירות."
                highlightText="יותר מ־300 מוסדות חינוך פעילים בעיר."
                longText="פתח תקוה מפעילה יותר מ־300 מוסדות חינוך, תוכניות מצוינות ומערך עירוני המתקדם מעל הממוצע הארצי בזכאות לבגרות. שכונות כמו נווה גן והדר המושבות מאופיינות בקהילות איכותיות, פעילות ומגוונות. בעיר פועלים מרכזי תרבות, קאנטרי, ספורטק, מתנ״סים ורשת חוגים ענפה למשפחות."
             />
             <PtKeyMessage 
                icon="🚆"
                title="נגישות תחבורתית מצוינת"
                shortText="גישה מהירה ומרכזית לכל גוש דן בזכות רכבת קלה, מחלפים ושירותי תחבורה מתקדמים."
                highlightText="הקו האדום פעיל – מטרו M2 בדרך."
                longText="פתח תקוה מציעה נגישות תחבורתית יוצאת דופן: תחנות רכבת הקלה, קווי מטרו עתידיים, קרבה ל־471, 4, 5 ו־6, ושירותי תחבורה ציבורית מתקדמים. חיבורי התחבורה מגדילים את הביקוש למגורים ומעלים את ערכי הנכסים."
             />
             <PtKeyMessage 
                icon="🏗️"
                title="פרויקטים חדשים וצומחים"
                shortText="שכונות חדשות, פיתוח עירוני והתחדשות בקנה מידה ארצי."
                highlightText="השקעות נדל״ן בעיר מציגות צמיחה יציבה בביקוש ובערך."
                longText="פתח תקוה עוברת תנופת בנייה עצומה: פרויקטי התחדשות עירונית, שכונות חדשות (אם המושבות החדשה, סירקין, נווה עוז), פיתוח אזורי תעסוקה ומיזמי עיר חכמה. נתוני רמ/י ויד2 מצביעים על ביקוש גבוה ועל מגמת עלייה מתמשכת בערכי הנדל״ן."
             />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-8 h-8 text-slate-700/80 animate-bounce" />
        </div>
      </div>

      {/* Onboarding Cards Section */}
      <section className="bg-white relative z-10">
        <PtOnboardingCards />
      </section>

      {/* Contact Section */}
      <section>
        <PtContactSection />
      </section>
    </div>
  );
}