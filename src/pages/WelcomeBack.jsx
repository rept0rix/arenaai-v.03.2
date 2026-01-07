import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Settings, History, Compass, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import TopNavigation from '../components/TopNavigation';

export default function WelcomeBackPage() {
  const [user, setUser] = useState(null);
  const [lastSession, setLastSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
        
        // Try to load last session
        const sessions = await base44.entities.ChatSession.filter({ created_by: currentUser.email }, '-created_date', 1);
        if (sessions.length > 0) {
          setLastSession(sessions[0]);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        navigate(createPageUrl('Landing'));
      }
    };
    loadUserData();
  }, [navigate]);

  const handleContinueSession = () => {
    if (lastSession) {
      navigate(createPageUrl(`Chat?session_id=${lastSession.id}`));
    } else {
      navigate(createPageUrl('Chat'));
    }
  };

  const handleNewSearch = () => {
    navigate(createPageUrl('Home'));
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <TopNavigation currentPage="WelcomeBack" />
      
      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col items-center justify-center p-4 bg-slate-50">
        <div className="max-w-3xl w-full flex flex-col items-center">
          
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-slate-200/80 mb-8">
            {/* Chat Bubble with Logo */}
            <div className="bg-white/90 backdrop-blur-sm rounded-t-2xl p-6 border-b border-slate-200/80 flex items-center gap-6">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c276074aac6e6711db72a6/fefa17145_logoarena3d.png"
                alt="Arena AI Logo"
                className="w-10 h-10 flex-shrink-0"
              />

              <div className="text-right flex-1">
                <p className="text-lg font-semibold mb-2 text-slate-800">
                  היי {user.full_name?.split(' ')[0]}! אני ארנה, יועצת הנדל"ן החכמה שלך.
                </p>
                <p className="text-slate-700 mb-3">
                  בוא נמצא את הבית הבא עבורך.
                </p>
                
                <div className="space-y-3">
                  <p className="text-slate-800 font-medium">
                    לאיזה מסלול את/ה מחפש/ת נכס?
                  </p>
                </div>
              </div>
            </div>
            
            {/* Bottom part: Actions */}
            <div className="bg-slate-50/70 p-6 rounded-b-2xl border-t border-slate-200/80">
              <div className="space-y-4">
                {lastSession && (
                  <Button
                    onClick={handleContinueSession}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
                  >
                    נכס להשקעה 🔑
                  </Button>
                )}
                <Button
                  onClick={handleNewSearch}
                  variant="outline"
                  className="w-full border-2 border-sky-500 text-sky-600 hover:bg-sky-50 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  נכס למגורים 🏡
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="w-full max-w-2xl mb-8">
            <div className="bg-white rounded-xl shadow-md border border-slate-200/80 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <Compass className="w-5 h-5 text-slate-600" />
                </div>
                <p className="text-slate-700">
                  לדוגמה: אני מחפש דירת 4 חדרים מרווחת עם מרפסת שמש באזור שקט של תל אביב, קרוב לגינה ציבורית. התקציב שלי הוא עד 4.5 מיליון שקלים...
                </p>
              </div>
              <Button
                variant="ghost"
                className="text-sky-600 hover:text-sky-700 text-sm"
              >
                🔍 מסע מודרך
              </Button>
            </div>
          </div>

          {/* Quick Action Suggestions */}
          <div className="w-full max-w-2xl mb-8">
            <p className="text-center text-slate-600 mb-4">או התחל עם משהו ממה שמחפשים הכי הרבה:</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="bg-white hover:bg-slate-50 text-slate-700 border-slate-200 px-4 py-2 rounded-full"
                onClick={() => navigate(createPageUrl('Chat?q=דירת 4 חדרים עם מרפסת בגבעתיים'))}
              >
                דירת 4 חדרים עם מרפסת בגבעתיים
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white hover:bg-slate-50 text-slate-700 border-slate-200 px-4 py-2 rounded-full"
                onClick={() => navigate(createPageUrl('Chat?q=נדל״ן מסחרי להשקעה בתל אביב'))}
              >
                נדל"ן מסחרי להשקעה בתל אביב
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white hover:bg-slate-50 text-slate-700 border-slate-200 px-4 py-2 rounded-full"
                onClick={() => navigate(createPageUrl('Chat?q=בית פרטי עם גישה לים'))}
              >
                בית פרטי עם גישה לים
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white hover:bg-slate-50 text-slate-700 border-slate-200 px-4 py-2 rounded-full"
                onClick={() => navigate(createPageUrl('Chat?q=דירה בחולון קומה גבוהה'))}
              >
                דירה בחולון קומה גבוהה
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
            <Button
              variant="outline"
              onClick={() => navigate(createPageUrl('Filters'))}
              className="flex flex-col items-center justify-center h-20 bg-white hover:bg-slate-50 border-slate-200"
            >
              <Settings className="w-6 h-6 mb-2 text-slate-600" />
              <span className="text-sm">סינון מתקדם</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate(createPageUrl('Chat'))}
              className="flex flex-col items-center justify-center h-20 bg-white hover:bg-slate-50 border-slate-200"
            >
              <Compass className="w-6 h-6 mb-2 text-slate-600" />
              <span className="text-sm">חיפוש חכם</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate(createPageUrl('History'))}
              className="flex flex-col items-center justify-center h-20 bg-white hover:bg-slate-50 border-slate-200"
            >
              <History className="w-6 h-6 mb-2 text-slate-600" />
              <span className="text-sm">היסטוריה</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate(createPageUrl('PropertyComparison'))}
              className="flex flex-col items-center justify-center h-20 bg-white hover:bg-slate-50 border-slate-200"
            >
              <ArrowLeftRight className="w-6 h-6 mb-2 text-slate-600" />
              <span className="text-sm">השוואת נכסים</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}