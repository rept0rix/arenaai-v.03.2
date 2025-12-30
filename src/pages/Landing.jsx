import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown, User, LogOut, UserCircle, Settings, Shield, Heart, History } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import FeatureCard from '../components/landing/FeatureCard';
import FaqItem from '../components/landing/FaqItem';
import ThreeBackground from '../components/effects/ThreeBackground';
import { User as UserEntity } from '@/entities/User';

export default function Landing() {
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
    // Navigate to custom login page instead of direct Google login
    navigate(createPageUrl('Login'));
  };

  const handleLogout = async () => {
    try {
      await UserEntity.logout();
      setUser(null);
      window.location.reload(); // Refresh the page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleGetStarted = (purpose = '') => {
    // Special handling for the 'financing' purpose: navigate directly to the Financing page.
    if (purpose === 'financing') {
      navigate(createPageUrl('Financing'));
      return; // Exit the function after navigating
    }

    // For all other purposes, continue with the existing flow (navigate to Home page)
    if (user) {
      // User is logged in, go to home with purpose
      navigate(createPageUrl(`Home?purpose=${purpose}`));
    } else {
      // User not logged in, save purpose and go to login
      if (purpose) {
        localStorage.setItem('selectedPurpose', purpose);
      }
      navigate(createPageUrl('Login'));
    }
  };

  const scrollToFAQ = () => {
    document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const mainFeatures = [
    {
      icon: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/b1953cd20_birur.png',
      title: "בירור צרכים אישי",
      description: "גלו את הדירה שבאמת מתאימה לכם. ארנה פותחת איתכם שיחה חכמה וזורמת כדי להבין מה באמת חשוב לכם.",
      long_description: "שלא כמו חיפוש רגיל ברשת, ארנה פותחת איתכם שיחה חכמה וזורמת – בשפה שלכם – כדי להבין מה באמת חשוב לכם: מהמטבח לאירוח ועד הקרבה לעבודה, מהחלומות והחששות, דרך מיסוי ומשכנתא, ועד סגנון העיצוב המועדף. אפשר לבחור ב\"שיחה פתוחה\" או \"במסע מודרך\".\nעם כל תשובה וכל התכתבות, אנחנו מתקרבים עוד צעד לדירה שהיא בדיוק אתם – גם אם עוד לא ידעתם להגדיר מה אתם מחפשים.\nארנה גם יודעת דברים \"אינטואיטיבית\", כן כן, גם עליך, ומכאן היא תעניק לך תובנות, הסברים והמלצות.",
      cta: {
        type: 'simple',
        text: 'שנתחיל?',
        purpose: 'living'
      }
    },
    {
      icon: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/dbc88ee6f_3d.png',
      title: "סיורי תלת-ממד",
      description: "תראו. תרגישו. תבחרו בביטחון. עוד לפני שהבנייה התחילה – תוכלו להסתובב בדירה העתידית שלכם.",
      long_description: "ההדמיות והסיורים הווירטואליים שלנו מאפשרים לכם לחוות את הדירה, לראות איך היא נראית בשעות שונות של היום, לבדוק את הנוף מהחלון ולתכנן את הפנים – הכל כדי שתרגישו בטוחים יותר בבחירה שלכם.",
       cta: {
        type: 'simple',
        text: 'רוצה לראות דוגמה?',
        purpose: 'living'
      },
      sectionId: 'feature-3d'
    },
    {
      icon: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/dc591b145_mimun.png',
      title: "אפשרויות המימון שלך",
      description: "לא רק למצוא דירה – לה verstehen איך מגיעים אליה. ארנה בודקת עבורכם אפשרויות פיננסיות ומציגה תמונה ברורה.",
      long_description: "המסע לדירה לא מתחיל רק בחיפוש – הוא מתחיל בתקציב. לכן, Arena עוזרת לך לבחון מה באמת אפשרי עבורך. במספר שאלות קצרות, נבין יחד מה ההון העצמי שלך, מהי ההכנסה החודשית, ומה חשוב לך בהחזר – ונציג לך סימולציה מותאמת אישית. כך תוכל לקבל הערכה ראשונית לגובה המשכנתא, למסלול המתאים עבורך – ולהחליט אם להתקדם צעד נוסף.",
      cta: {
        type: 'financing',
        pre_text: '🕓 זה תהליך דיסקרטי, לא מחייב, ולוקח פחות מ־2 דקות.',
        title: '🔍 רוצה שנראה מה האפשרויות שלך?',
        description: 'לא מדובר באישור מחייב – רק הערכה ראשונית שתעזור לך להבין את התמונה הכוללת. אנחנו כאן כדי לתת לך ביטחון והכוונה – בלי טפסים מסובכים או שיחות מלחיצות.',
        purpose: 'financing'
      },
      disclaimer: "המידע המוצג בעמודי המימון הינו לצרכי סימולציה בלבד. הוא אינו מהווה ייעוץ פיננסי, שיווקי או הצעה רשמית לאישור משכנתא. כל תוצאה מוצגת מבוססת על המידע שמסרת בלבד, ונתונה לשיקול דעתם של הגופים המלווים. מומלץ להיעזר ביועץ משכנתאות מוסמך לבחינת האפשרויות בפועל."
    },
    {
      icon: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6aa3171c5_model.png',
      title: "השוואת נכסים חכמה",
      description: "כדי שתוכלו להשוות – כמו שצריך. מערכת ההשוואה של ארנה מציגה את הנכסים המובילים זה לצד זה.",
      long_description: "מערכת ההשוואה החכמה של ארנה מציגה את הנכסים המובילים זה לצד זה, לפי מה שבאמת חשוב לכם. הדירוג מותאם אישית, שקלול פרמטרים שאתם בחרתם – והכל מוצג בצורה בהירה ומזמינה. כי דירה קונים בהבנה, לא בסתם תחושת בטן שעלולה להיות מוטה מאיזו \"פרסומת טובה\".",
       cta: {
        type: 'simple',
        text: 'רוצה להתחיל להשוות?',
        purpose: 'comparison'
      },
      sectionId: 'feature-comparison'
    }
  ];

  const testimonials = [
    {
      name: "יעל כהן",
      role: "קנתה דירת 4 חדרים בתל אביב",
      content: "ארנה עזרה לי למצוא בדיוק את מה שחיפשתי. התהליך היה פשוט ומהנה, והשירות היה מקצועי ואישי.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "דני רוזן",
      role: "השקיע בנכס להשקעה",
      content: "המערכת של ארנה הציגה לי אפשרויות השקעה שלא הכרתי. התשואה עלתה על הציפיות שלי.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "שירה לוי",
      role: "זוג צעיר, רכישה ראשונה",
      content: "התחלנו בלי שום מושג על איך קונים דירה. ארנה ליוותה אותנו לאורך כל הדרך עד החתימה.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  const faqs = [
    { 
        question: "מי זו ארנה?", 
        answer: "ארנה היא יועצת הנדל\"ן האישית שלך - אובייקטיבית, אמינה, ומותאמת בדיוק אליך.\nהיא לא עוד מוכרת או משווקת נדל\"ן מטעם קבלן, אלא מלווה אותך בצד שלך בלבד.\nבניגוד ללוחות נדל\"ן שהם לוח מודעות קר וסטטי, ארנה מבינה אותך. היא לומדת מה חשוב לך באמת - ומוצאת עבורך את הדירה שתהפוך לבית.",
        emphasis: "👉 עם ארנה, לא צריך לנחש, לא צריך להתפשר.",
        details: "ארנה נבנתה ע\"י מומחי נדל\"ן וטכנולוגיה, ומתעדכנת כל הזמן במידע רשמי ואמין ממקורות כמו רשות המיסים, מנהל התכנון, הלמ\"ס ומשרד התחבורה.\nהיא לא כפופה לאף יזם או קבלן, ולכן כל ההמלצות שלה נקיות משיקולים זרים.\nהמטרה שלה פשוטה: לעזור לך למצוא את הדירה שהכי מתאימה לך – לא פחות." 
    },
    { 
        question: "איך ארנה מתאימה לי דירות?",
        answer: "בזמן שלוחות מודעות רגילים מציעים לסנן לפי חדרים, מחיר או שכונה, ארנה פועלת אחרת: היא מתחילה משיחה איתך, מבינה מי אתה ומה באמת חשוב לך – לא רק מה שאתה חושב שאתה מחפש.",
        emphasis: "👉 לא פילטרים גנריים - אלא דיסקוורי אישי שמותאם לחיים שלך.",
        details: "המערכת לומדת אותך לעומק: החל ממטבח לאירוח חברים, דרך קרבה לבית ספר מסוים, ועד תחושת אור טבעי ונוף מהחלון.\nמעבר לזה, ארנה יודעת לחשוף צרכים חבויים – כמו תחבורה נוחה לעבודה עתידית, התאמה להגדלת משפחה, או חיבור לקהילה – ולגלות עבורך אפשרויות שלא בהכרח חשבת עליהן.\nמאחורי הקלעים פועל אלגוריתם חכם שמנתח פרופילים פסיכולוגיים, התנהגותיים, כלכליים ורגשיים, ומשווה אותם למאגר עצום של פרויקטים.\nהתוצאה: לא עוד רשימה ארוכה של מודעות, אלא גילוי אמיתי של דירות שמתאימות באמת לחיים שלך."
    },
    { 
        question: "איך מתחילים את תהליך בירור הצרכים?",
        answer: "התהליך פשוט ומתחיל מהרגע הראשון שבו אתם מתחילים שיחה עם ארנה. תוכלו לבחור בין שתי דרכים עיקריות לגילוי הנכס הבא שלכם.",
        emphasis: "👉 בחירה שלך: מסע מודרך או שיחה חופשית.",
        details: "ב**מסע המודרך**, ארנה תוביל אותך צעד אחר צעד עם שאלות מפתח על תקציב, אזור, גודל ומאפיינים חשובים. זהו מסלול מצוין למי שרוצה לוודא שלא שכח שום פרט חשוב.\nב**שיחה הפתוחה**, תוכלו פשוט לכתוב לארנה מה אתם מחפשים בשפה שלכם, והיא תבין אתכם, תשאל שאלות המשך, ותציג לכם נכסים בהתאם. זהו מסלול שמרגיש כמו שיחה עם יועץ אמיתי."
    },
    { 
        question: "האם השימוש בארנה כרוך בתשלום?",
        answer: "לא. השירות חינמי לחלוטין עבורך כרוכש פוטנציאלי.",
        emphasis: "👉 אתה מקבל יועצת אישית בלי לשלם שקל.",
        details: "המודל העסקי של ארנה מבוסס על שיתופי פעולה עם יזמים וקבלנים שמעוניינים להציג את הפרויקטים שלהם בפני הקונים המתאימים. בנוסף, קיימים שיתופי פעולה עם בנקים למשכנתאות, יועצי משכנתאות, עורכי דין וחברות נוספות שמציעות שירותים ומוצרים רלוונטיים לרוכשי דירות.\nבזכות זה אתה נהנה מכל השירותים - בירור צרכים, חיפוש מותאם אישית, צ'אט חכם, הדמיות תלת־ממד וייעוץ במימון - ללא עלות וללא התחייבות.\nולא פחות חשוב - לאחר חתימת עסקה, חברי מועדון ארנה מקבלים מתנת רכישה ייחודית שמתעדכנת מעת לעת." 
    },
    { 
        question: "מה לגבי הפרטיות שלי?", 
        answer: "הפרטיות שלך חשובה לנו מאוד.",
        emphasis: "👉 המידע שלך נשאר אצלך - ונמסר רק אם תרצה בכך.",
        details: "פרטיך יועברו ליזמים או נותני שירות רלוונטיים רק אם התעניינת בנכס מסוים או נמצא שהוא מתאים לך בבירור צרכים.\nאם לא נרשמת - פרטיך לא יועברו.\nיתכן שימוש במידע באופן אנונימי לשיפור המערכת, אך לעולם לא נמכור או נשתף פרטים מזהים אם לא הבעת הסכמה לכך."
    },
    { 
        question: "מאיפה מגיע המידע בארנה?", 
        answer: "ארנה משלבת בין נתונים רשמיים, מידע מסחרי מהיזמים ומחקרי עומק שבוצעו על ידי הצוות.",
        emphasis: "👉 מידע ממשי על השוק לצד פרטים עדכניים על נכסים.",
                details: "במערכת מופיעים:\n- נתונים רשמיים מגופים כמו רשות המיסים, מנהל התכנון, הלמ\"ס ומשרד התחבורה ועוד – שמאפשרים להבין עסקאות שבוצעו בפועל, תוכניות פיתוח עתידיות, תחבורה וחינוך.\n- מידע שמספקים היזמים עצמם – מפרטים טכניים, תוכניות דירה, הדמיות, מחירים ותנאי רכישה.\n- מחקרי עומק פנימיים של צוות ארנה – בשיתוף אנשי מקצוע, לצורך אפיון פרופילי רוכשים וקטגוריות נכסים.\nחשוב לדעת: ארנה עצמה אינה מוכרת דירות ואינה מתווכת – היא מציגה עבורך את המידע שנמסר מהגורמים השונים בצורה ברורה, מאורגנת ואובייקטיבית ככל האפשר."
    },
  ];

  const avatarImages = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  ];
  
  const partnerLogos = [
    { src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/1d307bb28_dimri_New_Logo_Final-1-copy-2.png", alt: "דימרי" },
    { src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/31c344390_ShikunBinuy-1.png", alt: "שיכון ובינוי" },
    { src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/0267d036f_-Asset-12x-1.png", alt: "אורה" },
    { src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/17a09f395_-----1024x250-1.png", alt: "אפריקה ישראל" },
    { src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/329bd4b78___svg-1.png", alt: "טרמה" },
    { src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2bc097bd0___2022svg-1.png", alt: "אורון" }
  ];


  return (
    <div className="min-h-screen relative" dir="rtl">
      <ThreeBackground />
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
      <nav className="relative z-20 bg-white/60 backdrop-blur-sm border-b border-slate-200/30 px-6 py-4">
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
      <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/77d5dcf6a_HEROBG.jpg')"}}>
        <div className="absolute inset-0 bg-contain bg-center bg-no-repeat mix-blend-screen opacity-70" style={{backgroundImage: "url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/3ce95eb98_bgbulding.png')"}}></div>
        
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

          {/* Trusted indicator */}
          <div className="flex items-center justify-center gap-3 mb-8 mt-12">
            <div className="flex -space-x-2">
              {avatarImages.map((img, i) => (
                <img 
                  key={i} 
                  src={img}
                  alt={`user ${i+1}`}
                  className="w-8 h-8 object-cover bg-white/40 rounded-full border-2 border-white/60"
                />
              ))}
            </div>
            <span className="text-sm text-slate-800 font-medium">מוביל לאלפי משפחות שמצאו את ביתם</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-8 h-8 text-slate-700/80 animate-bounce" />
        </div>
      </div>

      {/* Features Section */}
      <section id="feature-3d" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">איך ארנה עוזרת לך?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              ארבעה כלים מתקדמים שיובילו אותך לדירת החלומות
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 text-right md:items-start">
            {mainFeatures.map((feature, index) => (
              <div key={index}>
                <FeatureCard feature={feature} onCtaClick={handleGetStarted} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">מה הלקוחות שלנו אומרים?</h2>
            <p className="text-xl text-slate-600">
              סיפורי הצלחה של אנשים שמצאו את ביתם עם ארנה
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-8 text-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <p className="text-slate-700 mb-4 leading-relaxed">"{testimonial.content}"</p>
                <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                <p className="text-sm text-slate-600">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="py-20 bg-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">שאלות נפוצות</h2>
            <p className="text-xl text-slate-600">יש לך שאלה ל-Arena? אולי כבר שאלו אותה לפנייך 💬</p>
          </div>

          {/* Render individual FaqItem components */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Partners/Logos Section */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">השותפים שלנו</h2>
            <p className="text-xl text-slate-600">עובדים עם המובילים בתחום הנדל"ן בישראל</p>
          </div>
          
          <div className="relative">
            <div className="flex animate-scroll">
              <div className="flex items-center justify-around min-w-full">
                {partnerLogos.map((logo, index) => (
                  <div key={index} className="h-20 w-40 flex items-center justify-center p-2">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-12 w-auto object-contain transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
              
              {/* Duplicate for seamless loop */}
              <div className="flex items-center justify-around min-w-full">
                 {partnerLogos.map((logo, index) => (
                  <div key={`dup-${index}`} className="h-20 w-40 flex items-center justify-center p-2">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-12 w-auto object-contain transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}