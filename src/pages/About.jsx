
import React from 'react';
import TopNavigation from '../components/TopNavigation';
import { CheckCircle, TrendingUp, FileText, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TeamMemberCard from '../components/about/TeamMemberCard';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';

export default function About() {
    const navigate = useNavigate();
    const teamMembers = [
        {
            name: "יוסי ירקוני",
            role: "מייסד שותף, יו״ר",
            description: "יזם סדרתי עם ניסיון של מעל 20 שנה בהובלת חברות חדשנות וטכנולוגיה. הקים פלטפורמות AI בתחומי הפיננסים והמסחר המקוון, שימש כמנכ״ל פובליסיס וכיהן בתפקידי ניהול בכירים בבנקים הגדולים בישראל. יוצא יחידת 8200, בעל רקע עשיר בשיווק גלובלי ובפיתוח עסקי.",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d4f4dd75d87c3bfdbcb02f/5372da9b0_yosi.jpg",
            linkedin: "https://www.linkedin.com/in/yossi-yarkoni-7b0a7a28"
        },
        {
            name: "אסתי שיוביץ",
            role: "מייסדת שותפה, מנכ״לית",
            description: "עורכת דין מנוסה עם רקע עשיר בעסקאות נדל״ן והייטק בארץ ובעולם. לשעבר מנהלת בכירה בתעשייה האווירית ומרצה בכירה במשרד הביטחון. אסתי מביאה שילוב נדיר של ידע משפטי, ניסיון עסקי בינלאומי ותחושת שליחות חברתית.",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d4f4dd75d87c3bfdbcb02f/1ac6b4531_esty.jpg",
            linkedin: "https://www.linkedin.com/in/esty-shayovich-8a1375107"
        },
        {
            name: "ד״ר רפי יואל",
            role: "סמנכ״ל ארכיטקטורה ראשי",
            description: "יזם, חוקר, יועץ ומרצה. לשעבר יזם ומייסד אורבאן ארונאוטיקס, וכיום מרצה בכיר בתחום ה AI בביה״ס ללימודי המשך של הטכניון ויועץ בכיר לארנה בארכיטקטורת המערכת ויישומי AI.",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d4f4dd75d87c3bfdbcb02f/ffeded141_rafi.jpg",
            linkedin: "https://www.linkedin.com/in/rafi-yoeli"
        },
        {
            name: "משה למפרט",
            role: "CTO",
            description: "מפתח Full-Stack בכיר עם ניסיון של יותר מעשור בבניית מערכות מורכבות ומבוזרות. מומחה לאופטימיזציית ביצועים, אינטגרציה של מערכות בקנה מידה גדול, ובניית תשתיות טכנולוגיות אמינות ויעילות, כמו הקמה וניהול טכנולוגי של אתרי פרסום ותוכן גדולים.",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d4f4dd75d87c3bfdbcb02f/d5513774a_moshe.png",
            linkedin: "https://www.linkedin.com/in/moshe-lampert-42879062"
        },
        {
            name: "נאור ינקו",
            role: "מומחה UX/UI",
            description: "מומחה בעיצוב חוויית משתמש ומוצר, עם רקע בגרפיקה, יזמות ופיתוח. משלב חשיבה יצירתית, עיצוב עדכני וראייה עסקית, כדי להפוך רעיונות לממשק ידידותי וחדשני.",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d4f4dd75d87c3bfdbcb02f/b370e898f_naor.jpg", // Updated image URL
            linkedin: "https://www.linkedin.com/in/naoryanko"
        },
        {
            name: "איתי וקנין",
            role: "מנהל מחקר ופיתוח, מומחה AI",
            description: "חוקר אבטחת מידע ומפתח Embedded לשעבר ביחידה הטכנולוגית של חיל האוויר, 108. מתמחה בארכיטקטורת סוכני AI, הנדסה הפוכה וזיהוי חולשות תוכנה.",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d4f4dd75d87c3bfdbcb02f/9309bfec0_itay.png",
            linkedin: "https://www.linkedin.com/in/itay-vaknin-a1a386178"
        },
        {
            name: "רינת נחום",
            role: "אסטרטגיית שיווק",
            description: "מומחית לנויו-מרקטינג עם ניסיון בבניית קמפיינים מותגיים גדולים. מובילה פרויקטים עבור חברות ומשרדי ממשלה, עם התמחות בחקר התנהגות צרכנים והפיכת תובנות לסיפורים שיווקיים אפקטיביים.",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d4f4dd75d87c3bfdbcb02f/51fc1d0b3_rinat.jpg",
            linkedin: "https://www.linkedin.com/in/rinat-nahum-l-רינת-נחום-93730251"
        },
        {
            name: "אביאל",
            role: "שיווק ומכירות",
            description: "יוצא יחידת 8200, יזם סדרתי ובעל ניסיון רחב בטכנולוגיה ונדל״ן. הקים מספר מיזמים, שימש יועץ עצמאי במשך שש שנים, וכיום מחזק את הובלת השיווק והמכירות של Arena.",
            image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d4f4dd75d87c3bfdbcb02f/b1e216b79_aviel.jpg",
            linkedin: "https://www.linkedin.com/in/aviel-komemi-827176164"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <TopNavigation currentPage="About" />

            <div className="max-w-6xl mx-auto p-4 sm:p-8">
                {/* Header with Logo */}
                <div className="mb-20 text-center">
                    <div className="mb-8">
                        <a href="/Landing" className="inline-block hover:opacity-80 transition-opacity">
                            <img
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/053b1be56_arenaailogo-new.png"
                                alt="Arena AI"
                                className="h-20 mx-auto"
                            />
                        </a>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        הכירו את ARENA AI
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        מערכת המלצות נדל"ן חכמה שמבינה אותך ומביאה את המידע שאתה צריך בצורה פשוטה ומדויקת.
                    </p>
                </div>

                {/* First Text Section with Icon */}
                <div className="max-w-5xl mx-auto mb-20">
                    <div className="flex items-center gap-8">
                        <div className="w-[30%] flex justify-center">
                            <img
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68d4f4dd75d87c3bfdbcb02f/a4bc6dd2a_logoarena3d.png"
                                alt="Arena AI Icon"
                                className="w-24 h-24"
                            />
                        </div>
                        <div className="w-[70%] text-right leading-normal">
                            <p className="text-lg text-slate-700 mb-4">
                                ARENA AI היא מערכת המלצות נדל"ן חכמה שנולדה מתוך שאלה אחת פשוטה:
                                למה, בעידן של דאטה, AI וחוויית משתמש מותאמת אישית – שוק הנדל"ן עדיין מרגיש כאילו נתקע בשנות ה־90?
                            </p>
                            <p className="text-lg text-slate-700 mb-4">
                                בעוד שקונים מתמודדים עם אחת ההחלטות הגדולות בחייהם, הם נחשפים לדאטה לא מהימן, לידים לא רלוונטיים ותחושת בלבול כללית. מהצד השני, יזמים משקיעים תקציבי עתק בלי לדעת באמת מי עומד מולם.
                            </p>
                            <p className="text-lg text-slate-700 font-medium">
                                הפתרון? ARENA. מערכת שמחברת בין הקצוות ומפשטת את כל התהליך, כדי שגם קונים וגם יזמים יקבלו את המידע החשוב ביותר – בצורה מדויקת, פשוטה, אנושית וחכמה.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Second Section - With Background */}
                <div className="bg-white rounded-xl shadow-sm p-10 sm:p-12 mb-20 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">איך אנחנו עושים את זה?</h2>
                    <div className="text-right leading-normal space-y-6 mb-10">
                        <p className="text-lg text-slate-700">
                            ARENA משתמשת באלגוריתמים מתקדמים ומבוססת על שיחה אישית ורגשית – כדי להבין בדיוק מה הצרכים שלך ולתת לך המלצות מבוססות דאטה (ולא תחושת בטן).
                        </p>
                        <p className="text-lg text-slate-700">
                            היא לא שואלת רק "איפה אתה רוצה לגור?" אלא – מה חשוב לך באמת: יציבות? תשואה? איכות חיים? שקט בראש?
                        </p>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-800 mb-8 text-center">בין אם אתה קונה דירה או יזם, ARENA תספק לך:</h3>
                    
                    {/* 2x2 Grid with Blue Icons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-6 h-6 text-sky-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-800 mb-2">המלצות מוסברות מבוססות דאטה</h4>
                                <p className="text-slate-600">לא תחושת בטן.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                                <TrendingUp className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-800 mb-2">תחזיות ערך עתידי</h4>
                                <p className="text-slate-600">כך תוכל לקבל החלטות מושכלות.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0">
                                <FileText className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-800 mb-2">הסברים ברורים לחוזים ותנאים מסחריים</h4>
                                <p className="text-slate-600">להבין כל פרט.</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-cyan-50 rounded-full flex items-center justify-center flex-shrink-0">
                                <BarChart3 className="w-6 h-6 text-cyan-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-800 mb-2">דאשבורד אנליטי</h4>
                                <p className="text-slate-600">למדוד כל צעד בתהליך, בשפה פשוטה ומובנת.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="bg-slate-50 py-16 sm:py-24">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                      <h2 className="text-base font-semibold text-sky-600 tracking-wide uppercase">הצוות שלנו</h2>
                      <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        האנשים שמאחורי הקסם
                      </p>
                      <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
                        שילוב של מומחי נדל"ן, טכנולוגיה ובינה מלאכותית שמטרתם היא אחת - למצוא עבורכם את בית החלומות.
                      </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16">
                      {teamMembers.map((member, index) => (
                        <TeamMemberCard key={index} member={member} />
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Advisors Section */}
                <div className="py-16 sm:py-24">
                </div>

                {/* Vision Section */}
                <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-10 sm:p-12 mb-20 max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">החזון שלנו</h2>
                    <p className="text-xl text-slate-700 leading-relaxed mb-4">
                        ליצור חוויית נדל"ן חדשה – חוויית קנייה מבוססת הבנה, הקשבה, והמלצות מותאמות אישית.
                    </p>
                    <p className="text-lg text-slate-600 font-medium">
                        אנחנו לא מחפשים עבורך דירה – אנחנו עוזרים לך להבין למה זאת הדירה.
                    </p>
                </div>

                {/* Call to Action */}
                <div className="bg-white rounded-xl shadow-lg p-10 sm:p-12 max-w-4xl mx-auto text-center">
                    <p className="text-xl text-slate-700 leading-relaxed mb-8">
                        זה הזמן להתחיל איתנו את המסע שלך ולגלות איך מערכת ARENA יכולה לשנות את הדרך שבה קונים דירה.
                    </p>
                    <Button 
                        onClick={() => navigate(createPageUrl('Home'))}
                        size="lg"
                        className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        רוצה להתחיל עכשיו
                    </Button>
                </div>
            </div>
        </div>
    );
}
