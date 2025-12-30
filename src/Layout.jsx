import React from "react";
import { User } from '@/entities/User';
import { createPageUrl } from '@/utils';
import { Facebook, Linkedin, ArrowUp, Accessibility, X } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = React.useState(null);
  const [showAccessibilityButton, setShowAccessibilityButton] = React.useState(true);

  React.useEffect(() => {
    checkUser();
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
    if (currentPageName === 'Chat') return 'none';
    if (user && (currentPageName === 'Admin' || currentPageName === 'DeveloperAdmin')) {
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

      {showAccessibilityButton && (
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

      <Footer />
    </div>
  );
}