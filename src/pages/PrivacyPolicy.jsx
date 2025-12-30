
import React from 'react';
import TopNavigation from '../components/TopNavigation';
import { ArrowLeft, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <TopNavigation currentPage="PrivacyPolicy" />
            
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
                            <Lock className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">מדיניות פרטיות</h1>
                        <p className="text-lg text-slate-600">הפרטיות שלך חשובה לנו</p>
                    </div>
                    
                    <div className="prose prose-slate max-w-none space-y-6 text-right">
                        <p>
                            ארנה אי איי זירת הנדל"ן של ישראל בע"מ (להלן: "החברה") מחויבת לשמור על פרטיותך. מדיניות פרטיות זו מתארת כיצד אנו אוספים, משתמשים, חושפים ומגנים על המידע האישי שלך בעת השימוש במערכת Arena AI ("המערכת").
                        </p>
                        
                        <section>
                            <h2 className="text-2xl font-semibold text-slate-800 mb-4">איזה מידע אנו אוספים?</h2>
                            <ul className="list-disc pr-5 space-y-2">
                                <li><strong>מידע אישי:</strong> שם, כתובת דוא"ל, מספר טלפון, ופרטים נוספים שתמסור במהלך הרישום או השימוש.</li>
                                <li><strong>מידע פיננסי:</strong> נתוני הכנסה, הון עצמי, והתחייבויות, כפי שתזין באשף המימון.</li>
                                <li><strong>העדפות נדל"ן:</strong> אזורי חיפוש, סוגי נכסים, טווחי מחירים וקריטריונים נוספים.</li>
                                <li><strong>מידע טכני:</strong> כתובת IP, סוג דפדפן, נתוני שימוש וקובצי Cookie.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-slate-800 mb-4">כיצד אנו משתמשים במידע?</h2>
                            <ul className="list-disc pr-5 space-y-2">
                                <li>כדי לספק ולהתאים לך את שירותי המערכת.</li>
                                <li>כדי ליצור קשר עם יזמים ונותני שירותים רלוונטיים, אך ורק לאחר קבלת הסכמתך.</li>
                                <li>כדי לשפר את השירותים שלנו ולבצע ניתוחים סטטיסטיים אנונימיים.</li>
                                <li>כדי לשלוח לך עדכונים, הצעות שיווקיות ודיוורים, מהם תוכל להסיר את עצמך בכל עת.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-slate-800 mb-4">עם מי אנו חולקים את המידע?</h2>
                             <p>
                                המידע שלך לא יימכר או יושכר לצדדים שלישיים. אנו עשויים לחלוק את המידע עם:
                            </p>
                            <ul className="list-disc pr-5 space-y-2">
                                <li>יזמים וקבלנים של פרויקטים בהם הבעת עניין.</li>
                                <li>בנקים ויועצי משכנתאות, אם השתמשת בשירותי המימון שלנו ואישרת את העברת המידע.</li>
                                <li>ספקי שירותים טכנולוגיים המסייעים לנו בתפעול המערכת.</li>
                                <li>רשויות אכיפת החוק, אם נידרש לכך על פי דין.</li>
                            </ul>
                        </section>
                        
                        <section>
                            <h2 className="text-2xl font-semibold text-slate-800 mb-4">אבטחת מידע</h2>
                            <p>
                                אנו נוקטים באמצעי אבטחה טכניים וארגוניים מתקדמים כדי להגן על המידע שלך. עם זאת, שום מערכת אינה מאובטחת במאה אחוז, ואיננו יכולים להבטיח חסינות מוחלטת מפני גישה בלתי מורשית.
                            </p>
                        </section>
                        
                        <section>
                            <h2 className="text-2xl font-semibold text-slate-800 mb-4">זכויותיך</h2>
                            <p>
                                הנך זכאי לעיין במידע שעליך המוחזק במאגרינו, ולבקש לתקן מידע שאינו נכון, שלם או מדויק. למימוש זכויותיך, אנא פנה אלינו בכתובת: info@arena-ai.org.
                            </p>
                        </section>
                        
                        <div className="bg-blue-50 p-6 rounded-lg mt-8 border border-blue-200">
                           <p className="text-sm text-blue-800">
                               מדיניות זו עודכנה לאחרונה בתאריך 28 באוגוסט 2024. אנו שומרים לעצמנו את הזכות לעדכן את מדיניות הפרטיות מעת לעת.
                           </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
