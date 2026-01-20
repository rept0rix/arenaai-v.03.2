import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Settings, ArrowUp, User as UserIcon, Compass, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/base44Client';
import TopNavigation from '../components/TopNavigation';

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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Added useSearchParams

  useEffect(() => {
    const checkAuthAndPurpose = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);

        // Check if there's a pending chat redirect after login
        const pendingRedirect = localStorage.getItem('pendingChatRedirect');
        if (currentUser && pendingRedirect) {
          localStorage.removeItem('pendingChatRedirect');
          const { purpose, query, isGuided } = JSON.parse(pendingRedirect);
          let chatUrl = `Chat?purpose=${purpose}`;
          if (query) {
            chatUrl += `&q=${encodeURIComponent(query)}`;
          }
          if (isGuided) {
            chatUrl += `&guided=true`;
          }
          navigate(createPageUrl(chatUrl));
          return; // Stop further execution in this effect
        }

        // If coming from Landing page or another source with purpose in URL
        const urlPurpose = searchParams.get('purpose');
        if (urlPurpose) {
          setSelectedPurpose(urlPurpose);
        }

      } catch (error) {
        setUser(null);
        // Even if logged out, check if a purpose was passed in URL
        const urlPurpose = searchParams.get('purpose');
        if (urlPurpose) {
          setSelectedPurpose(urlPurpose);
        }
      }
    };
    checkAuthAndPurpose();
  }, [navigate, searchParams]); // Added searchParams to dependencies

  const handleSearch = (query) => {
    if (!selectedPurpose) {
      alert('אנא בחר מטרת חיפוש לפני תחילת השיחה');
      return;
    }
    if (!query.trim()) return;

    // If user is not logged in, save intent and redirect to login
    if (!user) {
      localStorage.setItem('pendingChatRedirect', JSON.stringify({ purpose: selectedPurpose, query: query, isGuided: false }));
      navigate(createPageUrl('login')); // Assuming 'login' is your login page route
      return;
    }

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

    // If user is not logged in, save intent and redirect to login
    if (!user) {
      localStorage.setItem('pendingChatRedirect', JSON.stringify({ purpose: selectedPurpose, query: null, isGuided: true }));
      navigate(createPageUrl('login')); // Assuming 'login' is your login page route
      return;
    }

    navigate(createPageUrl(`Chat?purpose=${selectedPurpose}&guided=true`));
  };

  const handleQuickOption = (option) => {
    if (!selectedPurpose) {
      alert('אנא בחר מטרת חיפוש לפני תחילת החיפוש');
      return;
    }

    // If user is not logged in, save intent and redirect to login
    if (!user) {
      localStorage.setItem('pendingChatRedirect', JSON.stringify({ purpose: selectedPurpose, query: option, isGuided: false }));
      navigate(createPageUrl('login')); // Assuming 'login' is your login page route
      return;
    }

    handleSearch(option);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <TopNavigation currentPage="Home" />
      
      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col items-center justify-center p-4 bg-slate-50">
        <div className="max-w-3xl w-full flex flex-col items-center">
          
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-slate-200/80 mb-8">
            {/* Chat Bubble with Logo - Replaced existing "Top part: Arena Chat" */}
            <div className="bg-white/90 backdrop-blur-sm rounded-t-2xl p-6 border-b border-slate-200/80 flex items-center gap-6">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c276074aac6e6711db72a6/fefa17145_logoarena3d.png"
                alt="Arena AI Logo" className="w-10 h-10 flex-shrink-0" />


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
                  placeholder="לדוגמה: אני מחפש דירת 4 חדרים מרווחת עם מרפסת שמש באזור שקט של תל אביב, קרוב לגינה ציבורית. התקציב שלי הוא עד 4.5 מיליון שקלים..." className="bg-white text-right px-4 py-4 text-lg flex min-h-[80px] ring-offset-background focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-xl border-2 border-slate-200 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:border-sky-400 resize-none shadow-sm placeholder:text-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  rows={5} />

                  <Button
                  type="submit"
                  size="icon"
                  className="absolute left-4 top-4 bg-slate-900 hover:bg-black text-white rounded-lg"
                  disabled={!searchTerm.trim()}>
                    <ArrowUp className="w-5 h-5" />
                  </Button>
                  <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleGuidedJourney}
                  className="absolute bottom-4 right-4 text-slate-600 hover:text-slate-800 flex items-center gap-1 text-sm">
                    <Compass className="w-4 h-4" />
                    מסע מודרך
                  </Button>
                </form>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className="text-slate-500 text-sm mb-2 w-full text-center">או התחל עם משהו ממה שמחפשים הכי הרבה:</span>
            {quickStartOptions.map((option, index) =>
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickOption(option)}
              className="bg-white hover:bg-slate-50 text-slate-700 border-slate-200 px-4 py-2 rounded-full">
                {option}
              </Button>
            )}
          </div>

          {/* Action Buttons */}
          {user &&
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
              <Button
              variant="outline"
              onClick={() => navigate(createPageUrl('Filters'))}
              className="flex flex-col items-center justify-center h-20 bg-white hover:bg-slate-50 border-slate-200">

                <Settings className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm">סינון מתקדם</span>
              </Button>
              
              <Button
              variant="outline"
              onClick={() => navigate(createPageUrl('Chat'))}
              className="flex flex-col items-center justify-center h-20 bg-white hover:bg-slate-50 border-slate-200">

                <Compass className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm">חיפוש חכם</span>
              </Button>
              
              <Button
              variant="outline"
              onClick={() => navigate(createPageUrl('History'))}
              className="flex flex-col items-center justify-center h-20 bg-white hover:bg-slate-50 border-slate-200">

                <History className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm">היסטוריה</span>
              </Button>
              
              <Button
              variant="outline"
              onClick={() => navigate(createPageUrl('PropertyComparison'))}
              className="flex flex-col items-center justify-center h-20 bg-white hover:bg-slate-50 border-slate-200">

                <ArrowUp className="w-6 h-6 mb-2 text-slate-600" />
                <span className="text-sm">השוואת נכסים</span>
              </Button>
            </div>
          }
        </div>
      </div>
    </div>);

}