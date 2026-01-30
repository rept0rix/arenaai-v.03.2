import React from "react";
import { User } from '@/entities/User';
import { createPageUrl } from '@/utils';
import { Facebook, Instagram, Linkedin, ArrowUp, Accessibility, X } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = React.useState(null);
  const [showAccessibilityButton, setShowAccessibilityButton] = React.useState(true);
  const [showCookieBanner, setShowCookieBanner] = React.useState(false);
  const [showCookieCustomization, setShowCookieCustomization] = React.useState(false);
  const [cookiePreferences, setCookiePreferences] = React.useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false
  });

  React.useEffect(() => {
    checkUser();
    
    // Check if cookie banner should be shown
    const cookieConsent = localStorage.getItem('arena_cookie_consent');
    if (!cookieConsent) {
      setShowCookieBanner(true);
    }
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
  };

  const getFooterType = () => {
    if (currentPageName === 'Chat' || currentPageName === 'PropertyDetails') return 'none';
    if (user && (currentPageName === 'Admin' || currentPageName === 'DeveloperCRM')) {
        return 'app-logged-in'
    }
    return 'landing';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleProductClick = async (purpose = '') => {
    try {
      const currentUser = await User.me();
      if (currentUser) {
        window.location.href = createPageUrl(`Home?purpose=${purpose}`);
      }
    } catch (error) {
      const callbackUrl = `${window.location.origin}${createPageUrl('Home')}`;
      User.loginWithRedirect(callbackUrl);
    }
  };

  const scrollToSection = (sectionId) => {
    if (currentPageName !== 'Landing') {
      window.location.href = `/Landing#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const Footer = () => {
    const footerType = getFooterType();

    if (footerType === 'none') return null;

    const commonFooterContent = (
      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <a href="/Landing" className="inline-block transition-opacity hover:opacity-80 mb-4">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d4f4dd75d87c3bfdbcb02f/491ea62ed_logo-white.png"
                  alt="Arena AI"
                  className="h-9"
                />
              </a>
              <p className="text-slate-400">
                יועצת הנדל"ן החכמה שלך - מוצאת את הבית המושלם עבורך
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">המוצר</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <button 
                    onClick={() => handleProductClick('living')} 
                    className="hover:text-white transition-colors text-right"
                  >
                    בירור צרכים והתאמת נכסים
                  </button>
                </li>
                <li>
                  <a href={createPageUrl('Financing')} className="hover:text-white transition-colors">
                    יעוץ ומימון
                  </a>
                </li>
                <li>
                  <a href={createPageUrl('ArenaClub')} className="hover:text-white transition-colors">
                    ARENA CLUB
                  </a>
                </li>
                <li>
                  <a href={createPageUrl('VirtualTours')} className="hover:text-white transition-colors">
                    סיורים 3D
                  </a>
                </li>
                <li>
                  <a href={createPageUrl('PropertyComparisonInfo')} className="hover:text-white transition-colors">
                    השוואת נכסים
                  </a>
                </li>
                <li>
                  <a href={createPageUrl('PetahTikvaLanding')} className="hover:text-white transition-colors text-cyan-400">
                    פתח תקוה - מהדורה מיוחדת
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">מידע ותמיכה</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href={createPageUrl('About')} className="hover:text-white transition-colors">
                    מי אנחנו
                  </a>
                </li>
                <li>
                  <a href="/Landing#faq-section" className="hover:text-white transition-colors">
                    שאלות נפוצות
                  </a>
                </li>
                <li>
                  <a href={createPageUrl('BuyingGuide')} className="hover:text-white transition-colors">
                    מדריך רכישה
                  </a>
                </li>
                <li>
                  <a href={createPageUrl('Blog')} className="hover:text-white transition-colors">
                    בלוג
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">יצירת קשר</h4>
              <ul className="space-y-2 text-slate-400 mb-6">
                <li>
                  <a href={createPageUrl('Contact')} className="hover:text-white transition-colors">
                    טופס שליחת פנייה
                  </a>
                </li>
                <li>
                  <a href="mailto:info@arena-ai.org" className="hover:text-white transition-colors">
                    info@arena-ai.org
                  </a>
                </li>
                <li>דרך בגין 146, תל אביב, ישראל</li>
              </ul>

              <h4 className="font-bold mb-4">עקבו אחרינו</h4>
              <div className="flex gap-4">
                  <a href="https://www.facebook.com/share/1BLmtoo32d/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Facebook /></a>
                  <a href="https://www.linkedin.com/company/arena-ai-global/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Linkedin /></a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="flex gap-4 mb-4 sm:mb-0">
                    <a href={createPageUrl('PrivacyPolicy')} className="text-sm hover:text-white transition-colors">מדיניות פרטיות</a>
                    <span className="text-slate-600">|</span>
                    <a href={createPageUrl('AccessibilityStatement')} className="text-sm hover:text-white transition-colors">הצהרת נגישות</a>
                    <span className="text-slate-600">|</span>
                    <a href={createPageUrl('TermsOfService')} className="text-sm hover:text-white transition-colors">תקנון שימוש</a>
                    <span className="text-slate-600">|</span>
                    <a href={createPageUrl('ForDevelopers')} className="text-sm hover:text-white transition-colors">אזור יזמים</a>
                </div>
                <p className="text-sm">&copy; 2024 Arena AI. כל הזכויות שמורות.</p>
                <button onClick={scrollToTop} className="flex items-center gap-2 text-sm hover:text-white transition-colors mt-4 sm:mt-0">
                    חזרה לראש העמוד
                    <ArrowUp className="w-4 h-4" />
                </button>
            </div>
          </div>
        </div>
      </footer>
    );

    return commonFooterContent;
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col" dir="rtl">
      <style>
        {`
          :root {
            --background: 0 0% 100%;
            --foreground: 222.2 84% 4.9%;
            --card: 0 0% 100%;
            --card-foreground: 222.2 84% 4.9%;
            --popover: 0 0% 100%;
            --popover-foreground: 222.2 84% 4.9%;
            --primary: 205, 90%, 45%;
            --primary-foreground: 210 40% 98%;
            --secondary: 210, 40%, 96.1%;
            --secondary-foreground: 222.2 47.4% 11.2%;
            --muted: 210 40% 96.1%;
            --muted-foreground: 215.4 16.3% 46.9%;
            --accent: 210 40% 96.1%;
            --accent-foreground: 222.2 47.4% 11.2%;
            --destructive: 0 84.2% 60.2%;
            --destructive-foreground: 210 40% 98%;
            --border: 214.3 31.8% 91.4%;
            --input: 214.3 31.8% 91.4%;
            --ring: 205, 90%, 45%;
            --radius: 0.75rem;
          }

          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .animate-scroll {
            animation: scroll 30s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      
      <div className="flex-1 relative">
        {children}
      </div>

      {showAccessibilityButton && currentPageName !== 'PropertyDetails' && currentPageName !== 'Chat' && (
        <div className="fixed bottom-6 left-6 z-50">
          <button
            onClick={() => setShowAccessibilityButton(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
            aria-label="סגור כפתור נגישות"
          >
            <X className="w-4 h-4" />
          </button>
          <button className="w-14 h-14 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors">
            <Accessibility className="w-7 h-7" />
          </button>
        </div>
      )}

      {showCookieCustomization && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">הגדרות קוקיס</h3>
              <button
                onClick={() => setShowCookieCustomization(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-600 mb-6">
              בחר איזה סוגי קוקיס תרצה לאפשר. קוקיס חיוניים תמיד מופעלים כדי להבטיח את תקינות האתר.
            </p>

            <div className="space-y-4 mb-6">
              {/* Necessary Cookies - Always enabled */}
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="mt-1 w-4 h-4 cursor-not-allowed opacity-50"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">קוקיס חיוניים</h4>
                  <p className="text-sm text-slate-600">
                    נדרשים לתפקוד בסיסי של האתר. לא ניתן לכבות.
                  </p>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200 hover:border-sky-300 transition-colors">
                <input
                  type="checkbox"
                  checked={cookiePreferences.analytics}
                  onChange={(e) => setCookiePreferences({...cookiePreferences, analytics: e.target.checked})}
                  className="mt-1 w-4 h-4 cursor-pointer accent-sky-600"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">קוקיס אנליטיים</h4>
                  <p className="text-sm text-slate-600">
                    עוזרים לנו להבין כיצד המשתמשים משתמשים באתר ולשפר את חווית המשתמש.
                  </p>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200 hover:border-sky-300 transition-colors">
                <input
                  type="checkbox"
                  checked={cookiePreferences.marketing}
                  onChange={(e) => setCookiePreferences({...cookiePreferences, marketing: e.target.checked})}
                  className="mt-1 w-4 h-4 cursor-pointer accent-sky-600"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">קוקיס שיווקיים</h4>
                  <p className="text-sm text-slate-600">
                    משמשים להצגת פרסומות רלוונטיות ולמעקב אחר יעילות מסעות פרסום.
                  </p>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200 hover:border-sky-300 transition-colors">
                <input
                  type="checkbox"
                  checked={cookiePreferences.functional}
                  onChange={(e) => setCookiePreferences({...cookiePreferences, functional: e.target.checked})}
                  className="mt-1 w-4 h-4 cursor-pointer accent-sky-600"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">קוקיס פונקציונליים</h4>
                  <p className="text-sm text-slate-600">
                    מאפשרים תכונות משופרות כמו שמירת העדפות והתאמה אישית.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  localStorage.setItem('arena_cookie_consent', JSON.stringify({
                    type: 'custom',
                    preferences: cookiePreferences
                  }));
                  setShowCookieCustomization(false);
                  setShowCookieBanner(false);
                }}
                className="flex-1 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                שמור העדפות
              </button>
              <button
                onClick={() => {
                  setCookiePreferences({
                    necessary: true,
                    analytics: false,
                    marketing: false,
                    functional: false
                  });
                  localStorage.setItem('arena_cookie_consent', 'rejected');
                  setShowCookieCustomization(false);
                  setShowCookieBanner(false);
                }}
                className="flex-1 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"
              >
                דחה הכל
              </button>
            </div>
          </div>
        </div>
      )}

      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-40">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-[250px]">
                <p className="text-sm text-slate-700 leading-relaxed mb-1">
                  בלחיצה על "אפשר הכל", אתה מסכים לאחסון קוקיס במכשירך כדי לשפר את ניווט האתר, לנתח שימוש באתר ולסייע במאמצי השיווק שלנו.
                </p>
                <p className="text-sm text-slate-600">
                  למידע נוסף, בקר ב
                  <a href={createPageUrl('PrivacyPolicy')} className="text-sky-600 hover:text-sky-700 underline mx-1">
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
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap shadow-sm"
                >
                  אפשר הכל
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem('arena_cookie_consent', 'rejected');
                    setShowCookieBanner(false);
                  }}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
                >
                  דחה הכל
                </button>
                <button
                  onClick={() => setShowCookieCustomization(true)}
                  className="px-5 py-2.5 text-sky-600 hover:text-sky-700 text-sm font-medium whitespace-nowrap underline"
                >
                  התאמה אישית
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}