import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Settings, ArrowUp, User as UserIcon, Compass, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/base44Client';
import TopNavigation from '../components/TopNavigation';
import { SessionManager } from '../components/utils/sessionManager';

const quickStartOptions = [
"פריסייל חדש בתל אביב - לפני כולם",
"דירת 3 חדרים בת\"א - קומה גבוהה ונוף פתוח",
"דירה עם גינה למשפחה עם ילדים קטנים",
"השקעה בנכס מניב עם תשואה גבוהה",
"דירה עם מטבח פתוח גדול ומרפסת לאירוח",
"דירות להשקעה עם תשואה גבוהה וביקוש קבוע",
"דירה שקטה עם ירוק מסביב וקהילה חמה"
];


export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [user, setUser] = useState(null);
  const [isReturningUser, setIsReturningUser] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const checkAuthAndPurpose = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }

      // Initialize session tracking FIRST
      SessionManager.getOrCreateSessionId();
      SessionManager.getOrCreateDeviceId();

      // Check if returning user (anonymous) - but don't show modal
      const sessionData = SessionManager.getSessionData();
      if (sessionData && sessionData.purpose) {
        setIsReturningUser(true);
        // Auto-restore their purpose without prompting
        setSelectedPurpose(sessionData.purpose);
      }

      // Check URL purpose
      const urlPurpose = searchParams.get('purpose');
      if (urlPurpose) {
        setSelectedPurpose(urlPurpose);
      }
    };
    checkAuthAndPurpose();
  }, [navigate, searchParams]);

  const handleSearch = (query) => {
    if (!selectedPurpose) {
      alert('אנא בחר מטרת חיפוש לפני תחילת השיחה');
      return;
    }
    if (!query.trim()) return;

    // Save session data
    SessionManager.saveSessionData({
      purpose: selectedPurpose,
      last_query: query
    });

    const chatUrl = createPageUrl(`Chat?purpose=${selectedPurpose}&q=${encodeURIComponent(query)}`);
    navigate(chatUrl);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const handleGuidedJourney = () => {
    if (!selectedPurpose) {
      alert('אנא בחר מטרת חיפוש לפני תחילת המסע המודרך');
      return;
    }

    // Save session data
    SessionManager.saveSessionData({
      purpose: selectedPurpose,
      is_guided: true
    });

    navigate(createPageUrl(`Chat?purpose=${selectedPurpose}&guided=true`));
  };

  const handleQuickOption = (option) => {
    if (!selectedPurpose) {
      alert('אנא בחר מטרת חיפוש לפני תחילת החיפוש');
      return;
    }

    // Allow anonymous users to search
    handleSearch(option);
  };



  return (
    <div className="min-h-screen flex flex-col">
      <TopNavigation currentPage="Home" />
      
      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col items-center justify-center p-4 bg-slate-50">
        <div className="max-w-3xl w-full flex flex-col items-center">
          
          {/* Returning User Badge - Subtle and Non-intrusive */}
          {isReturningUser && (
            <div className="w-full max-w-2xl mb-4">
              <div className="bg-sky-50 border border-sky-200 rounded-lg px-4 py-2 flex items-center justify-center gap-2">
                <span className="text-sky-700 text-sm font-medium">
                  חזרתם להמשך החיפוש שלכם
                </span>
              </div>
            </div>
          )}
          
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-slate-200/80 mb-8">
            {/* Chat Bubble with Logo - Replaced existing "Top part: Arena Chat" */}
            <div className="bg-white/90 backdrop-blur-sm rounded-t-2xl p-6 border-b border-slate-200/80 flex items-center gap-6">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c276074aac6e6711db72a6/fefa17145_logoarena3d.png"
                alt="Arena AI Logo" className="w-10 h-10 flex-shrink-0 animate-bounce" />


              <div className="text-right flex-1">
                <p className="text-lg font-semibold mb-2 text-slate-800">
                  {user ? `היי ${user.full_name?.split(' ')[0]}! אני ארנה, יועצת הנדל"ן החכמה שלך.` : 'היי, אני ארנה, יועצת הנדל"ן החכמה שלך.'}
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
                      variant={selectedPurpose === 'living' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedPurpose('living')}
                      className={selectedPurpose === 'living' ?
                      "bg-sky-500 hover:bg-sky-600 text-white" :
                      "bg-white hover:bg-slate-50"}>
                      נכס למגורים
                    </Button>
                    <Button
                      variant={selectedPurpose === 'investment' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedPurpose('investment')}
                      className={selectedPurpose === 'investment' ?
                      "bg-sky-500 hover:bg-sky-600 text-white" :
                      "bg-white hover:bg-slate-50"}>
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
                  placeholder="לדוגמה: אני מחפש דירת 4 חדרים מרווחת עם מרפסת שמש באזור שקט של תל אביב, קרוב לגינה ציבורית. התקציב שלי הוא עד 4.5 מיליון שקלים..." className="bg-white text-right px-4 py-4 pb-12 text-lg flex min-h-[80px] ring-offset-background focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-xl border-2 border-slate-200 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:border-sky-400 resize-none shadow-sm placeholder:text-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  rows={5} />

                  <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4">
                    <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleGuidedJourney}
                    className="text-slate-600 hover:text-slate-800 flex items-center gap-1 text-sm">
                      <Compass className="w-4 h-4" />
                      מסע מודרך
                    </Button>
                    <Button
                    type="submit"
                    size="icon"
                    className="bg-slate-900 hover:bg-black text-white rounded-lg"
                    disabled={!searchTerm.trim()}>
                      <ArrowUp className="w-5 h-5" />
                    </Button>
                  </div>
                </form>
            </div>
          </div>

          <div className="w-full max-w-2xl mb-8 overflow-hidden">
            <style>
              {`
                @keyframes scroll-rtl {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(100%);
                  }
                }
                .animate-scroll-rtl {
                  animation: scroll-rtl 30s linear infinite;
                }
              `}
            </style>
            <p className="text-slate-500 text-sm mb-3 text-center">נושאים חמים:</p>
            <div className="relative">
              <div className="flex gap-3 animate-scroll-rtl">
                {[...quickStartOptions, ...quickStartOptions].map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickOption(option)}
                    className="bg-white hover:bg-slate-50 text-slate-700 border-slate-200 px-4 py-2 rounded-full whitespace-nowrap flex-shrink-0"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {user &&
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
              <Button
              variant="outline"
              onClick={() => navigate(createPageUrl('PropertyComparisonInfo'))}
              className="flex flex-col items-center justify-center h-24 bg-white hover:bg-slate-50 border-slate-200">
                <ArrowUp className="w-6 h-6 mb-2 text-slate-600 rotate-90" />
                <span className="text-sm">השוואת נכסים</span>
              </Button>
              <Button
              variant="outline"
              onClick={() => navigate(createPageUrl('Financing'))}
              className="flex flex-col items-center justify-center h-24 bg-white hover:bg-slate-50 border-slate-200">
                <Settings className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm">אפשרויות מימון</span>
              </Button>
              <Button
              variant="outline"
              onClick={() => navigate(createPageUrl('SavedProperties'))}
              className="flex flex-col items-center justify-center h-24 bg-white hover:bg-slate-50 border-slate-200">
                <UserIcon className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm">האזור האישי שלי</span>
              </Button>
              <Button
              variant="outline"
              onClick={() => navigate(createPageUrl('History'))}
              className="flex flex-col items-center justify-center h-24 bg-white hover:bg-slate-50 border-slate-200">
                <History className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm">היסטוריית שיחות</span>
              </Button>
            </div>
          }
        </div>
      </div>
    </div>);

}