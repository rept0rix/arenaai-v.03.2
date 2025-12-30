import React from 'react';
import TopNavigation from '../components/TopNavigation';
import { ArrowLeft, Accessibility, CheckCircle, AlertTriangle, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function AccessibilityStatement() {
    const navigate = useNavigate();
    const lastUpdated = "24 בדצמבר 2024";

    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <TopNavigation currentPage="AccessibilityStatement" />
            
            <div className="max-w-4xl mx-auto p-6 py-12">
                <Button 
                    variant="ghost" 
                    onClick={() => navigate(-1)}
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 ml-2" />
                    חזרה
                </Button>

                <div className="bg-white rounded-xl shadow-sm p-8">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Accessibility className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">הצהרת נגישות</h1>
                        <p className="text-lg text-slate-600">אתר Arena AI</p>
                        <p className="text-sm text-slate-500 mt-2">עודכן לאחרונה: {lastUpdated}</p>
                    </div>
                    
                    <div className="prose prose-slate max-w-none space-y-8 text-right">
                        {/* הקדמה והצהרה כללית */}
                        <section>
                            <h2 className="text-2xl font-semibold text-slate-800 mb-4">הצהרה כללית</h2>
                            <p className="leading-relaxed">
                                Arena AI רואה חשיבות עליונה במתן שירות שוויוני ונגיש לכלל המשתמשים, לרבות אנשים עם מוגבלויות. אנו מחויבים להנגיש את השירותים הדיגיטליים שלנו ולאפשר חווית שימוש נוחה ושוויונית לכולם.
                            </p>
                            <p className="leading-relaxed mt-3">
                                האתר שואף לעמוד בדרישות <strong>תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013</strong>, ברמת התקן הבינלאומי <strong>WCAG 2.1 ברמה AA</strong>, בהתאם לתקן הישראלי <strong>ת"י 5568</strong>.
                            </p>
                        </section>

                        {/* פעולות שבוצעו להנגשה */}
                        <section>
                            <h2 className="text-2xl font-semibold text-slate-800 mb-4">פעולות שבוצעו להתאמת נגישות</h2>
                            
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-slate-800">ניווט מקלדת:</strong>
                                        <p className="text-sm text-slate-600 mt-1">האתר תומך בניווט מלא באמצעות מקלדת בלבד, כולל מעבר בין רכיבים באמצעות מקש Tab והפעלה באמצעות Enter/Space.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-slate-800">כותרות והיררכיה:</strong>
                                        <p className="text-sm text-slate-600 mt-1">שימוש נכון בהיררכיית כותרות (H1-H6) לאורך כל האתר, המאפשר ניווט יעיל ומבנה תוכן ברור.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-slate-800">תיאורי תמונה (Alt Text):</strong>
                                        <p className="text-sm text-slate-600 mt-1">כל התמונות והרכיבים הויזואליים המשמעותיים באתר כוללים תיאור טקסטואלי חלופי.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-slate-800">קונטרסט צבעים:</strong>
                                        <p className="text-sm text-slate-600 mt-1">יחסי ניגודיות מתאימים בין טקסט לרקע בכל האתר, בהתאם לדרישות WCAG 2.1 AA.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-slate-800">טפסים נגישים:</strong>
                                        <p className="text-sm text-slate-600 mt-1">כל שדות הטפסים כוללים תוויות ברורות, הודעות שגיאה מפורטות והנחיות מילוי.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-slate-800">תאימות לקוראי מסך:</strong>
                                        <p className="text-sm text-slate-600 mt-1">האתר נבדק ומותאם לעבודה עם תוכנות קריאת מסך מובילות (NVDA, JAWS, VoiceOver).</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-slate-800">כפתור נגישות:</strong>
                                        <p className="text-sm text-slate-600 mt-1">כפתור נגישות קבוע בצד האתר מאפשר התאמות אישיות נוספות לנוחות המשתמש.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <p className="text-sm text-blue-800">
                                    <strong>שיטת בדיקה:</strong> הבדיקה כללה שימוש בכלים אוטומטיים לסריקת נגישות, בדיקה ידנית מקיפה, ובדיקה עם משתמשים בעלי צרכים מיוחדים.
                                </p>
                            </div>
                        </section>

                        {/* אחראי נגישות */}
                        <section className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                            <h2 className="text-2xl font-semibold text-slate-800 mb-4">רכז נגישות</h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                                        <Accessibility className="w-5 h-5 text-sky-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-800">נעור ינקו</p>
                                        <p className="text-sm text-slate-600">רכז נגישות</p>
                                    </div>
                                </div>
                                
                                <div className="pt-3 border-t border-slate-200 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-slate-500" />
                                        <a href="mailto:naor@arenaai.co.il" className="text-sky-600 hover:underline">
                                            naor@arenaai.co.il
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-slate-500" />
                                        <a href="tel:054-610-3090" className="text-sky-600 hover:underline">
                                            054-610-3090
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-4 h-4 text-slate-500" />
                                        <span className="text-sm text-slate-600">
                                            זמן תגובה: עד 7 ימי עסקים
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* החרגות והיבטים שטרם הונגשו */}
                        <section>
                            <h2 className="text-2xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-6 h-6 text-amber-500" />
                                החרגות והיבטים שטרם הונגשו באופן מלא
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                    <h3 className="font-semibold text-slate-800 mb-2">רכיבי צד שלישי</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        האתר משתמש ברכיבים חיצוניים שאינם בשליטתנו המלאה, כגון: מפות אינטראקטיביות (Google Maps), סרטוני וידאו מוטמעים (YouTube), מערכות תשלום חיצוניות, ורכיבי שיתוף למדיה חברתית. רכיבים אלו עשויים שלא לעמוד באופן מלא בתקני הנגישות, ואנו פועלים ככל הניתן לבחור בספקים התומכים בנגישות.
                                    </p>
                                    <p className="text-xs text-slate-600 mt-2">
                                        <strong>תאריך יעד לתיקון:</strong> בתהליך מתמשך של בחירת חלופות נגישות יותר.
                                    </p>
                                </div>

                                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                    <h3 className="font-semibold text-slate-800 mb-2">תוכן שהועלה על ידי משתמשים</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        תוכן שמועלה על ידי משתמשים או יזמים (תמונות, תיאורים, קבצים) אינו באחריותנו הישירה. אנו מספקים הנחיות ומעודדים העלאת תוכן נגיש, אך איננו יכולים להבטיח נגישות מלאה של תוכן זה.
                                    </p>
                                    <p className="text-xs text-slate-600 mt-2">
                                        <strong>פעולות מתמשכות:</strong> מתן הנחיות נגישות למעלי תוכן ובדיקה תקופתית.
                                    </p>
                                </div>

                                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                    <h3 className="font-semibold text-slate-800 mb-2">תכנים דינמיים ומורכבים</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        חלק מהתכנים הדינמיים והאינטראקטיביים באתר (כגון השוואת נכסים בזמן אמת, ויזואליזציות מתקדמות) עשויים להיות מאתגרים יותר לנגישות מלאה. אנו עובדים באופן שוטף על שיפור נגישות רכיבים אלו.
                                    </p>
                                    <p className="text-xs text-slate-600 mt-2">
                                        <strong>תאריך יעד:</strong> שיפורים מתמשכים - רבעון 1 2025.
                                    </p>
                                </div>

                                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                    <h3 className="font-semibold text-slate-800 mb-2">קבצים היסטוריים</h3>
                                    <p className="text-sm text-slate-700 leading-relaxed">
                                        מסמכים ישנים או ארכיוניים (PDF, Word) שהועלו לפני יישום מדיניות הנגישות עשויים שלא לעמוד בתקן. אנו פועלים להנגשת קבצים אלו בהדרגה לפי סדרי עדיפות.
                                    </p>
                                    <p className="text-xs text-slate-600 mt-2">
                                        <strong>תאריך יעד:</strong> הנגשה הדרגתית לפי דרישה.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-slate-100 rounded-lg border border-slate-300">
                                <p className="text-sm text-slate-700">
                                    <strong>הערה חשובה:</strong> אם נתקלתם בקושי גישה לאחד מהתכנים או השירותים המוחרגים, אנא פנו אלינו ונעשה כל שביכולתנו לספק גישה חלופית או סיוע אישי.
                                </p>
                            </div>
                        </section>

                        {/* הערת הגנה משפטית */}
                        <section className="bg-red-50 border border-red-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-red-800 mb-3">הצהרה משפטית</h2>
                            <p className="text-sm text-red-900 leading-relaxed">
                                השירות הניתן באתר זה כולל התאמות טכניות לנגישות וכתיבת הצהרת נגישות בהתאם למידע שנמסר ולמצב האתר בעת הבדיקה. <strong>אין במידע המוצג באתר או בשירותי הנגישות הניתנים משום ייעוץ משפטי או התחייבות לעמידה מלאה בכל דרישות החוק</strong>. האחריות המשפטית המלאה לעמידה בדרישות החוק ותקנות הנגישות חלה על בעלי האתר והשירות בלבד.
                            </p>
                        </section>

                        {/* משוב ודרכי יצירת קשר */}
                        <section>
                            <h2 className="text-2xl font-semibold text-slate-800 mb-4">משוב ויצירת קשר</h2>
                            <p className="leading-relaxed mb-4">
                                נשמח מאוד לקבל ממך משוב על נגישות האתר. אם נתקלת בבעיית נגישות, מצאת תוכן שאינו נגיש, או שיש לך הצעות לשיפור - אנא פנה אלינו בכל אחת מהדרכים הבאות:
                            </p>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
                                    <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-sky-600" />
                                        דואר אלקטרוני
                                    </h3>
                                    <a href="mailto:naor@arenaai.co.il" className="text-sky-600 hover:underline">
                                        naor@arenaai.co.il
                                    </a>
                                    <p className="text-xs text-slate-600 mt-1">תגובה תישלח תוך 7 ימי עסקים</p>
                                </div>

                                <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
                                    <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-sky-600" />
                                        טלפון
                                    </h3>
                                    <a href="tel:054-610-3090" className="text-sky-600 hover:underline">
                                        054-610-3090
                                    </a>
                                    <p className="text-xs text-slate-600 mt-1">ימים א'-ה', 09:00-18:00</p>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                                <p className="text-sm text-green-800">
                                    💡 <strong>עזרו לנו להשתפר:</strong> המשוב שלכם חשוב לנו ומסייע לנו לשפר את נגישות האתר לכולם. כל פנייה תטופל ברצינות ובמקצועיות.
                                </p>
                            </div>
                        </section>

                        {/* תאריך עדכון */}
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200 text-center">
                            <p className="text-sm text-slate-700">
                                <strong>הצהרת נגישות זו עודכנה לאחרונה בתאריך:</strong>
                            </p>
                            <p className="text-lg font-bold text-blue-800 mt-2">{lastUpdated}</p>
                            <p className="text-xs text-slate-600 mt-2">
                                ההצהרה מתעדכנת באופן שוטף במקביל לשיפורים ועדכונים באתר
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}