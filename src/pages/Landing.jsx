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

  useEffect(() => {
    // Simplified - no auth check for now
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

      {/* Hero Section with Background Image */}
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{backgroundImage: "url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/77d5dcf6a_HEROBG.jpg')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/40"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          
          {/* Hero Text */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white" style={{textShadow: '0 2px 10px rgba(0,0,0,0.2)'}}>
            בית <span className="text-slate-800">החלומות</span> שלך
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed text-slate-800 font-medium">
            ארנה AI מאפשרת לך למצוא את הנכס המושלם באמצעות טכנולוגיה מתקדמת וייעוץ אישי
          </p>

          {/* Chat Bubble with Logo */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 max-w-xl mx-auto mb-8 border border-white/40 shadow-lg flex items-center gap-6">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/826138143_a1d576606_a-icon-shadow1.png"
              alt="Arena AI Logo"
              className="w-20 h-20 flex-shrink-0"
            />
            <div className="text-right flex-1">
              <p className="text-lg font-semibold mb-4 text-slate-800">
                היי, אני ארנה, יועצת הנדל"ן החכמה שלך.
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

          {/* Quick Options */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
            <span className="text-slate-800 text-sm font-medium">או התחילו עם:</span>
            {["דירת 4 חדרים", "בית פרטי", "נכס להשקעה", "דירה בתל אביב"].map((option, index) => (
              <button
                key={index}
                onClick={() => handleGetStarted('')}
                className="bg-white/20 hover:bg-white/30 text-slate-800 px-4 py-2 rounded-full text-sm border border-slate-400/30 transition-colors backdrop-blur-sm"
              >
                {option}
              </button>
            ))}
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-8 h-8 text-slate-700/80 animate-bounce" />
        </div>
      </div>

      {/* Simple Content Section */}
      <section className="relative z-10 py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-8">ארנה - יועצת הנדל"ן החכמה שלך</h2>
          <p className="text-xl text-slate-600 mb-12">
            מצא את הדירה המושלמת עם הכלים המתקדמים שלנו
          </p>
          <Button 
            onClick={() => handleGetStarted()}
            size="lg"
            className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-6 text-lg"
          >
            התחל עכשיו
          </Button>
        </div>
      </section>
    </div>
  );
}