import React from 'react';
import TopNavigation from '../components/TopNavigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function TermsOfService() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <TopNavigation currentPage="TermsOfService" />
            
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
                        <img
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/053b1be56_arenaailogo-new.png"
                            alt="Arena AI"
                            className="h-12 mx-auto mb-4"
                        />
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">תקנון המערכת</h1>
                        <p className="text-lg text-slate-600">תנאי שימוש ומדיניות פרטיות</p>
                    </div>
                    
                    <div className="prose prose-slate max-w-none space-y-6 text-right">
                        <div className="bg-slate-50 p-6 rounded-lg mb-8">
                            <p className="text-sm text-slate-700 leading-relaxed">
                                <strong>בין</strong> חברת ארנה אי איי זירת הנדל"ן של ישראל בע"מ, ח.פ. 517011227 ("החברה" או "אנחנו")
                                <br />
                                <strong>לבין</strong> המציג/ה/המפרסם/ת וכל משתמש/ת ("המשתמש", "המפרסם" או "אתה")
                            </p>
                        </div>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">תנאי השימוש במערכת ARENA Ai</h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">1. ברוכים הבאים ל-ARENA Ai</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        ברוכים הבאים ל-ARENA Ai – יועצת הנדל"ן החכמה. שירות מקוון זה ניתן באמצעות האתר הפועל בכתובת _______ ובכל כתובת נוספת לפי שיקול דעת החברה ("האתר"), וכן באמצעות יישומון (אפליקציה) למכשירי קצה חכמים ("האפליקציה"). האתר והאפליקציה, לרבות השירותים הניתנים באמצעותם, ייקראו יחדיו: "המערכת".
                                    </p>
                                    <p className="text-slate-600 leading-relaxed">
                                        החברה מעניקה לך רישיון שאינו בלעדי, מוגבל בזמן לתקופת ההתקשרות עם החברה, בלתי ניתן להעברה, וללא זכות למתן רישיונות-משנה, לשימוש במערכת שמטרתה לאפשר לחפש נכסים, להעלות, לשתף, ולייצא מידע ונתונים הנוגעים לפרויקט ו/או נכסים בחתך התואם לצרכייך וככל ויש לך הסכם מול החברה לשימוש מורחב בכל האפשרויות.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">2. אישור התקנון</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        אתה רשאי לעשות שימוש במערכת רק בהתאם ובכפוף להוראות תקנון זה, ולפיכך אתה מתבקש לקרוא אותו בקפידה, משום שהוא הסכם מחייב בינך לבין החברה. אם אינך מאשר את תנאי התקנון, כולם או חלקם, אינך מורשה לבצע כל שימוש במערכת.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">3. התוכן במערכת</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        המערכת מאפשרת למפרסמים הצגת נתונים על אודות פרויקט ו/או נכסים, וכוללת עדכוני מידע על אודות הפרויקט ו/או הנכסים, פירוט מחירים, דגמים ומיקום, אמצעי המחשה - כגון תמונות, צילומי וידאו או מידול, 3D, חדשות/כתבות, קטלוג מוצרים, פרטי יועצים, שאלות ותשובות ו/או כל תוכן נוסף שהוזן על ידי החברה ו/או על ידי המפרסם ("התוכן").
                                    </p>
                                    <div className="bg-yellow-50 border-r-4 border-yellow-400 p-4 my-4">
                                        <p className="text-sm text-yellow-800">
                                            <strong>חשוב לדעת:</strong> התכנים במערכת נועדו על-מנת לספק מידע כללי והכוונה בלבד. בכל מקרה של ספק ביחס לצורך לקבלת חוות דעת או הכוונה מקצועית, עלייך לפנות אל הגורמים המקצועיים הרלבנטיים.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">4. שינוי התקנון</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        החברה שומרת את הזכות לשנות מעת לעת את הוראות התקנון. במידת האפשר ואם יבוצעו בתקנון שינויים מהותיים, החברה תפרסם על-כך הודעה בעמוד הבית של המערכת. הקישור לתקנון במערכת יקשר תמיד לנוסח העדכני של התקנון.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">5. הגבלת גישה</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        החברה רשאית לצמצם ו/או להגביל את הגישה לאפליקציה ו/או לכל חלק בה ואף לחסום את השימוש במערכת ללא כל התראה.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">6. אחריות המפרסם</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        מובהר כי על המפרסם חלה החובה לנהוג על פי כל דין, לרבות חוק הגנת הצרכן, חוק המכר, חוק הגנת הפרטיות, חוק התקשורת, וכל דין רלבנטי אחר.
                                    </p>
                                    <div className="bg-blue-50 border-r-4 border-blue-400 p-4 my-4">
                                        <p className="text-sm text-blue-800">
                                            <strong>מפרסם שים לב:</strong> רק אתה אחראי לספק את הנכסים והשירותים שאתה מציע ללקוחותייך. החברה אינה מציעה או מספקת את הנכסים והשירותים הללו. המערכת משמשת כזירה מקוונת בלבד.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">7. דין וסמכות שיפוט</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        על השימוש במערכת יחולו אך ורק דיני מדינת ישראל. מקום השיפוט הבלעדי בגין כל דבר ועניין הנובע מההזמנה והתקנון, הינו בבתי המשפט המוסמכים במחוז תל-אביב, ישראל.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">8. משלוח מידע שיווקי</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        הרישום למערכת וכן אישורך את התקנון, מהווה הסכמה מפורשת מצידך לקבלת דברי פרסומת ודיוור ישיר מהחברה. בכל עת, תוכל לחזור בך מהסכמתך ולהודיע על סירובך לקבל דברי פרסומת.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">קניין רוחני</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">10. זכויות קניין רוחני</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        כל זכויות הקניין הרוחני במערכת ובכלל זה פטנטים, סימני מסחר וזכויות היוצרים, ובכל תוכן הכלול בה (למעט תכנים הנמסרים לפרסום על יד מפרסמים) הן של החברה בלבד, או של צדדים שלישיים אחרים, שהתירו לחברה להשתמש בהם.
                                    </p>
                                    <p className="text-slate-600 leading-relaxed">
                                        אין להעתיק, להפיץ, להציג בפומבי, לשדר, להעמיד לרשות הציבור, לשנות, לעבד, ליצור יצירות נגזרות, למכור או להשכיר כל חלק מן הנ"ל, בלא קבלת הסכמה בכתב ומראש מהחברה.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">הגישה למערכת</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">11. תנאי השימוש</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        השימוש במערכת הינו אישי, וחינמי עבור משתמשי הקצה, ובלבד שהמשתמשים הינם פרטיים ולא עושים שימוש עסקי. השימוש במערכת עבור מפרסמים ו/או מתווכי נדל"ן ו/או חברות/עסקים - כרוך בתשלום.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">12. רישום למערכת</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        השימוש בחלק מהפונקציות מתבצע באמצעות רישום, בהזנת שם, דוא"ל וטלפון (פרטי חובה). עליך למסור רק פרטים נכונים, מדויקים ומלאים. ברישומך למערכת אתה מאשר ומצהיר כי אתה בן 18 ומעלה.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">13. אבטחת החשבון</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        חל איסור להעביר את פרטי שם המשתמש והסיסמא לצד ג' כלשהוא. אתה נושא באחריות המלאה לכל שימוש שנעשה בחשבונך במערכת.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">מדיניות הפרטיות</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">15. כללי</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        החברה מכבדת את פרטיות המשתמשים ורואה בשמירה על הפרטיות כמטרה חשובה וערכית ראשונה במעלה. פרק זה בתקנון ילמד אותך מהי מדיניות הפרטיות הנוהגת במערכת.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">16. מסירת פרטים אישיים</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        בעת ההרשמה למערכת תידרש למסור פרטים אישיים: שם, טלפון וכתובת דוא"ל. עליך למסור רק פרטים נכונים, מדויקים ומלאים. הפרטים יישמרו במאגר המידע שבבעלות החברה.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">17. מידע שנאסף בעת השימוש</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        בעת שימוש במערכת, תאסוף החברה מידע על נוהגיך, לרבות תוכן שפרסמת, עמודים שצפית בהם, שאילתות חיפוש, מקום המחשב, כתובת IP ועוד.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">18. השימוש במידע האישי</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        המידע האישי ישמש לאפשר לך להשתמש במערכת, לשפר את השירותים, לגבות תמורה, לשלוח מידע ופרסומת, ליצירת קשר, ולמטרות נוספות המפורטות בתקנון.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">19. מסירת מידע לצדדים שלישיים</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        החברה לא תעביר מידע אישי לצדדים שלישיים ללא הסכמתך, למעט המקרים המפורטים בתקנון כגון דרישות חוק, צו שיפוטי, או כדי למנוע נזק.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">21. זכות עיון במידע</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        על-פי חוק הגנת הפרטיות, אתה זכאי לעיין במידע שעליך המוחזק במאגר, לבקש לתקנו או למחקו. פניות ניתן להגיש לפרטי הקשר המופיעים בתקנון.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">22. עוגיות (Cookies)</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        החברה עשויה להשתמש בעוגיות לצורך תפעול המערכת, איסוף נתונים סטטיסטיים ואבטחת מידע. ניתן לשנות את הגדרות הדפדפן כדי לחסום עוגיות.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">23. אבטחת מידע</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        החברה מפעילה מערכות לאבטחת המידע, אך אינה יכולה להבטיח הגנה מוחלטת. בשימוש במערכת, אתה מסכים למגבלות אלו.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">אחריות</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">27. הגבלת אחריות</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        השימוש במערכת ייעשה על אחריותך הבלעדית. החברה לא תישא באחריות לכל נזק ישיר או עקיף שייגרמו לך או לצד שלישי.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">30. אי מתן שירותי תיווך</h3>
                                    <div className="bg-red-50 border-r-4 border-red-400 p-4 my-4">
                                        <p className="text-sm text-red-800">
                                            <strong>חשוב לדעת:</strong> החברה אינה מעניקה שירותי תיווך במקרקעין ואתה פוטר את החברה מכל אחריות לתוכן או פעולות עסקיות. החברה אינה עוסקת בתיווך מקרקעין.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">32. שיפוי</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        אתה מתחייב לשפות את החברה בגין כל נזק שייגרם עקב הפרת התקנון או שימוש במערכת בניגוד לדין, וכן בגין טענות צד שלישי כתוצאה מתכנים שמסרת לפרסום.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">תחזוקה וזמינות</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">33. זמינות המערכת</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        שיבושים יזומים או בלתי יזומים עלולים לפגוע בזמינות המערכת. החברה אינה מתחייבת שהמערכת תפעל ללא הפסקות או תהיה חסינה מפני תקלות.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-800 mb-3">34. שינויים במערכת</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        החברה רשאית לבצע שינויים במערכת, במבנה ובעיצוב, בלא צורך להודיע מראש. לא תהיה כל טענה בגין שינויים אלו.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <div className="bg-slate-100 p-6 rounded-lg mt-12">
                            <h3 className="text-lg font-bold text-slate-800 mb-3">פנה אלינו</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                החברה מקפידה על קיום הוראות החוק ומכבדת את זכויותיהם של משתמשי השירות. במידה ויש לך כל שאלה, הצעה, תלונה ועוד, נא פנה אלינו:
                            </p>
                            <div className="space-y-2 text-slate-700">
                                <p><strong>דוא"ל:</strong> <a href="mailto:info@arena-ai.org" className="text-sky-600 hover:text-sky-700">info@arena-ai.org</a></p>
                                <p><strong>טלפון:</strong> <a href="tel:035255866" className="text-sky-600 hover:text-sky-700">03-5255866</a></p>
                                <p><strong>פקס:</strong> 03-6999180</p>
                            </div>
                        </div>

                        <div className="border-t pt-6 mt-8">
                            <p className="text-sm text-slate-500 text-center">
                                התקנון עודכן לאחרונה – אוגוסט 2025<br />
                                ARENA Ai זירת הנדל"ן החכמה שלך ב Online | כל הזכויות שמורות
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}