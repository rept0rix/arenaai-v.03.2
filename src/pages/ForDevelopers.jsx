import React from 'react';
import TopNavigation from '../components/TopNavigation';
import DeveloperSubscriptionForm from '../components/forms/DeveloperSubscriptionForm';
import { CheckCircle } from 'lucide-react';

export default function ForDevelopers() {
    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <TopNavigation currentPage="ForDevelopers" />

            <main className="py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Header Section with Arena Logo */}
                    <section className="text-center mb-16">
                        <div className="mb-8">
                            <img
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/053b1be56_arenaailogo-new.png"
                                alt="Arena AI"
                                className="h-20 mx-auto mb-6"
                            />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
                            ברוכים הבאים למחוללת העסקאות החדשה שלכם
                        </h1>
                        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            תגידו שלום להפניות לא ממוקדות וללידים לא איכותיים, אשר מייגעים וגוזלים זמן יקר מאנשי המכירות שלכם, והצטרפו עוד היום למחוללת העסקאות ARENA Ai, זו שעובדת בשבילכם, גם כשאתם עסוקים בפגישות אחרות, זו שיודעת להתכוונן להעדפות האישיות של כל לקוח שלכם.
                        </p>
                    </section>
                    
                    {/* How It Works Section */}
                    <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-800 mb-4">החוויה</h2>
                            <p className="text-slate-700 leading-relaxed mb-6">
                                ARENA Ai הינה חברת מדיה טכנולוגית, שמוכוונת מכירות ומתרכזת באחוזי המרה גבוהים של לידים לעסקאות.
                            </p>
                            <p className="text-slate-700 leading-relaxed mb-6">
                                ARENA Ai היא פלטפורמה המייצרת חוויה וירטואלית מהפכנית, אינטראקטיבית, עם בירור צרכים של הלקוחות הבאים שלכם, מיון הלקוחות לפי פרופילים מבוססי מחקרי התנהגות ומסעות לקוח, והתאמת נכסים בפרסונליזציה מלאה, מתוך זירת נכסים גדולה, עם מלאי מגוון של נכסים, במדינת ישראל ומחוצה לה. המערכת מייצרת תקשורת ישירה בין ARENA ללקוחות ובין ARENA לבינכם, וחיבור ישיר בינכם לבין הלקוחות הבאים שלכם לחתימה על עסקאות.
                            </p>
                            
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">חסכון בזמן יקר, כסף והמון כאב ראש עבורכם</h3>
                            <p className="text-slate-700 leading-relaxed">
                                ARENA Ai היא הפתרון לכל יזם נדל"ן שמעוניין להגדיל את המכירות שלו ולחסוך זמן וכסף.
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                                ARENA Ai היא מסננת הלידים ומתאמת הפגישות הכי טובה של כל איש מכירות, שמעדיף לעבוד במה שהוא טוב ולסגור עסקאות מול "גרגירי הזהב", במקום לבזבז זמן יקר והמון אנרגיות, במיון "ארגזי החול" ולרדוף אחר לידים, שלא עונים / אינם מתאימים.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-4">איך זה עובד?</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-slate-600">הלקוחות שלכם נרשמים עם שם, טלפון ומייל, ונכנסים, ללא תשלום, לזירת הנדל"ן, ונהנים מממשק ידידותי למשתמש ופשוט להפעלה, באמצעות המחשב, הטאבלט והטלפון הנייד.</span>
                                </div>
                                <div className="flex items-start">
                                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-slate-600">ואתם? מעבירים אלינו את חומרי השיווק הקיימים שלכם/קישורים לעמודי האתר הרלוונטיים, ברושורים, פרסומים, מודל אדריכלי של הפרויקט, תכניות דירה, נתוני מלאי הנכסים ונתונים מסחריים – וצוות ARENA Ai יקים את הפרויקט והנכסים למכירה – במערכת.</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Experience and Expertise */}
                    <section className="bg-white p-8 rounded-xl shadow-lg mb-16">
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">הנסיון והמומחיות שלנו – זה הביטחון שלכם</h3>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            לצוות המנהל של החברה נסיון רב בשיווק, פרסום ואונליין. את יריד האונליין הראשון הפקנו במהלך תקופת הקורונה (2021), במהלכו הוצגו עשרות רבות של פרויקטים ונכנסו עשרות אלפי מבקרים בשבועיים. אם כך היה אז – אין ספק שהיום העולם מוכן מתמיד ובוודאי שאתם והלקוחות שלכם תוכלו כעת להנות מתוצאות המחקר והפיתוח שהושקעו מאז ועד היום בחברה, והביאו את ARENA Ai לשיאים חדשים ולשינוי משמעותי בדרך בהן מבוצעות עסקאות נדל"ן בעידן החדש.
                        </p>
                    </section>

                    {/* Unprecedented Exposure */}
                    <section className="bg-gradient-to-r from-sky-50 to-blue-50 p-8 rounded-xl mb-16">
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">חשיפה חסרת תקדים – יתרון לגודל ולשת"פ האסטרטגים שלנו</h3>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            אנו נדאג לחשיפה אסטרטגית לפרויקטים שלך, במדיות המובילות, בהשקעה חסרת תקדים מידי שנה, עם טראפיק צפוי של מאות אלפי מבקרים בחודש, מהארץ ומחו"ל, ולהזרמת כמות גדולה של לקוחות מבושלים ישירות אליכם. הקמפיינים המאסיביים יפעלו בדיגיטל, באתרים, במגזינים נחשקים והן על מסכי הטלוויזיה, בארץ ובחו"ל.
                        </p>
                        <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm text-slate-600 mb-2">
                                <strong>*בתקופת פיילוט:</strong> השקה אזורית בלבד: ראש העין, פתח תקווה – שיווק דיגיטל מאסיבי ושלטי חוצות אזוריים
                            </p>
                            <p className="text-sm text-slate-600">
                                <strong>*השקה מסחרית:</strong> 2026, לרבות מדיה ארצית, TV, שלטי חוצות, דיגיטל, רדיו ועוד
                            </p>
                        </div>
                    </section>

                    {/* What's Included in the Offer */}
                    <section className="bg-white p-8 rounded-xl shadow-lg mb-16">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">תכולת ההצעה</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-700">חשיפה במאגר המידע הגדול בארץ לרוכשי דירות ונכסים להשקעה ומגורים</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-700">הקמת לקוח ופרויקט/ים במערכת</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-700">סיוע של סוכני נדל"ן AI לטיוב הלידים "ובישולם"</span>
                                </li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-700">SLA – מנהל/ת תיק לקוח: ניתוח סטטיסטיקה של נתונים במערכת, ובכלל כך ניתוח פירוט השיחות של הלידים עם סוכן ה AI, אחת לחודש</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border border-amber-200">
                            <h4 className="text-xl font-bold text-amber-800 mb-4">🎁 הטבות לנרשמים עד 15.12.2025:</h4>
                            <div className="space-y-2">
                                <p className="text-amber-700">✨ <strong>תוספת זירת חו"ל למשך 3 חודשים</strong> (הטבה בסך 3,000 ₪)</p>
                                <p className="text-amber-700">🏠 <strong>תוספת סיור 3D של הדירות בפרויקט</strong> (הטבה בסך 2,500 ₪)</p>
                            </div>
                        </div>
                    </section>

                    {/* Subscription Form Section */}
                    <section id="subscription-form">
                        <DeveloperSubscriptionForm />
                    </section>
                </div>
            </main>
        </div>
    );
}