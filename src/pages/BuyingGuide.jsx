import React, { useState } from 'react';
import TopNavigation from '../components/TopNavigation';
import { ArrowLeft, CheckCircle, FileText, Calculator, Shield, Home, Users, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function BuyingGuide() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(1);

    const buyingSteps = [
        {
            id: 1,
            title: "הכנה ותכנון",
            icon: <Calculator className="w-6 h-6" />,
            duration: "2-4 שבועות",
            description: "קביעת תקציב, בירור זכאות למשכנתא ובחירת אזורי חיפוש",
            tasks: [
                "חישוב יכולת פיננסית וקביעת תקציב",
                "בדיקת דירוג אשראי בבנק ישראל",
                "איסוף מסמכים למשכנתא",
                "קביעת קריטריונים לחיפוש (אזור, גודל, סוג נכס)",
                "בחירת יועץ משכנתאות (אופציונלי)"
            ]
        },
        {
            id: 2,
            title: "חיפוש הנכס",
            icon: <Home className="w-6 h-6" />,
            duration: "4-12 שבועות",
            description: "חיפוש פעיל, צפיות, השוואה בין אפשרויות",
            tasks: [
                "חיפוש בפורטלים מקוונים ובשטח",
                "קביעת צפיות והכרת השכונות",
                "בדיקת תוכניות בנייה עתידיות באזור",
                "השוואה בין נכסים לפי קריטריונים",
                "בדיקת מחירי שוק ועסקאות דומות"
            ]
        },
        {
            id: 3,
            title: "בדיקות מקדימות",
            icon: <FileText className="w-6 h-6" />,
            duration: "1-2 שבועות",
            description: "בדיקות משפטיות, טכניות ופיננסיות לפני ההחלטה",
            tasks: [
                "בדיקת מקרקעין - בעלות, עיקולים, משכנתאות",
                "בדיקת רישיונות בנייה והיתרים",
                "בדיקה טכנית של הנכס (מבנה, מערכות)",
                "בדיקת חובות ועלויות בבניין (ועד בית)",
                "בדיקת תוכניות פינוי-בינוי או תמ\"א"
            ]
        },
        {
            id: 4,
            title: "משא ומתן וחוזה",
            icon: <Users className="w-6 h-6" />,
            duration: "1-3 שבועות",
            description: "משא ומתן על המחיר וחתימת חוזה מכר",
            tasks: [
                "הגשת הצעת רכישה",
                "משא ומתן על מחיר וטווח זמנים",
                "חתימת הסכם זכויות (אופציונלי)",
                "הכנת חוזה מכר על ידי עורך דין",
                "חתימה על חוזה מכר ותשלום מקדמה"
            ]
        },
        {
            id: 5,
            title: "אישור משכנתא",
            icon: <Shield className="w-6 h-6" />,
            duration: "3-6 שבועות",
            description: "הגשת בקשה לבנק וקבלת אישור סופי",
            tasks: [
                "הגשת בקשה למשכנתא בבנק",
                "הגשת מסמכי הנכס לבנק לבדיקה",
                "בדיקת שווי הנכס על ידי שמאי מטעם הבנק",
                "קבלת מכתב אישור משכנתא סופי",
                "חתימה על מסמכי המשכנתא"
            ]
        },
        {
            id: 6,
            title: "השלמת העסקה",
            icon: <CheckCircle className="w-6 h-6" />,
            duration: "1-2 שבועות",
            description: "העברת כספים, חתימה אצל עורך דין וקבלת המפתחות",
            tasks: [
                "הזמנת ביטוח מבנה (חובה למשכנתא)",
                "חתימה אצל עורך דין על מסמכי העברת בעלות",
                "העברת יתרת הכספים למוכר",
                "רישום הנכס בטאבו על שמך",
                "קבלת מפתחות והחזקה בנכס"
            ]
        }
    ];

    const documentsNeeded = [
        {
            category: "מסמכים אישיים",
            items: [
                "תעודת זehut + הוכחת כתובת",
                "3 תלושי שכר אחרונים",
                "אישור הכנסות מהמעסיק",
                "דוח הכנסות ממס הכנסה (טופס 106)",
                "צילום פנקס הצ'קים",
                "אישורי פיקדונות וחסכונות"
            ]
        },
        {
            category: "מסמכי הנכס",
            items: [
                "חוזה מכר חתום",
                "תעודת בעלות מהטאבו",
                "תכנית מדידה",
                "רישיון בנייה ואכלוס",
                "אישור ועד בית על חובות",
                "הצהרת מוכר לפי סעיף 8ב"
            ]
        }
    ];

    const costsBreakdown = [
        { type: "מס רכישה", amount: "0.5% - 10%", note: "תלוי בסוג דירה ומחיר" },
        { type: "עורך דין", amount: "5,000 - 15,000 ₪", note: "כולל בדיקות וטיפול בטאבו" },
        { type: "שמאי", amount: "2,500 - 4,000 ₪", note: "עבור הבנק (במקרים מסוימים)" },
        { type: "ביטוח מבנה", amount: "1,000 - 3,000 ₪", note: "תשלום שנתי" },
        { type: "בדק בית", amount: "2,000 - 5,000 ₪", note: "בדיקה טכנית (מומלץ)" },
        { type: "עמלת תיווך", amount: "2% + מע\"מ", note: "אם השתמשת במתווך" }
    ];

    const tips = [
        {
            category: "טיפים כלליים",
            icon: <TrendingUp className="w-5 h-5" />,
            items: [
                "אל תסתפק בצפייה אחת - חזור למקום בשעות שונות",
                "בדוק את השכונה: תחבורה ציבורית, שירותים, בתי ספר",
                "השווה מחירים של נכסים דומים באזור",
                "השאיר מרווח כספי לשיפוצים ועלויות נוספות",
                "אל תחתום על שום דבר בלי עורך דין"
            ]
        },
        {
            category: "זהירות מ...",
            icon: <AlertCircle className="w-5 h-5" />,
            items: [
                "לחץ ממוכרים - 'יש עוד מעוניינים'",
                "מחירים מנופחים באזורים 'חמים'",
                "בעיות מבניות שלא נבדקו על ידי מומחה",
                "חוזים עם סעיפים לא ברורים",
                "השקעה מבלי לבדוק את פוטנציאל האזור"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <TopNavigation currentPage="BuyingGuide" />
            
            <div className="max-w-7xl mx-auto p-6 py-12">
                <Button 
                    variant="ghost" 
                    onClick={() => navigate(-1)}
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 ml-2" />
                    חזרה
                </Button>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Home className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">מדריך רכישת דירה</h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        המדריך השלם לרכישת נכס - מהתכנון הראשוני ועד קבלת המפתחות
                    </p>
                </div>

                <Tabs defaultValue="process" className="space-y-8">
                    <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
                        <TabsTrigger value="process">התהליך</TabsTrigger>
                        <TabsTrigger value="documents">מסמכים</TabsTrigger>
                        <TabsTrigger value="costs">עלויות</TabsTrigger>
                        <TabsTrigger value="tips">טיפים</TabsTrigger>
                    </TabsList>

                    <TabsContent value="process" className="space-y-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">תהליך הרכישה - 6 שלבים</h2>
                            <p className="text-slate-600">לחץ על כל שלב כדי לראות פירוט מלא</p>
                        </div>

                        <div className="grid gap-6">
                            {buyingSteps.map((step, index) => (
                                <Card 
                                    key={step.id} 
                                    className={`cursor-pointer transition-all ${
                                        activeStep === step.id ? 'ring-2 ring-sky-500 shadow-lg' : 'hover:shadow-md'
                                    }`}
                                    onClick={() => setActiveStep(step.id)}
                                >
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                                    activeStep === step.id ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                    {step.icon}
                                                </div>
                                                <div>
                                                    <CardTitle className="text-xl">שלב {step.id}: {step.title}</CardTitle>
                                                    <p className="text-slate-600">{step.description}</p>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {step.duration}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    
                                    {activeStep === step.id && (
                                        <CardContent className="pt-0">
                                            <div className="bg-slate-50 rounded-lg p-4">
                                                <h4 className="font-semibold mb-3">משימות בשלב זה:</h4>
                                                <ul className="space-y-2">
                                                    {step.tasks.map((task, taskIndex) => (
                                                        <li key={taskIndex} className="flex items-start gap-2">
                                                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                            <span className="text-sm text-slate-700">{task}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </CardContent>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="documents" className="space-y-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">מסמכים נדרשים</h2>
                            <p className="text-slate-600">רשימת המסמכים שתצטרך בתהליך הרכישה</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {documentsNeeded.map((category, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3">
                                            <FileText className="w-6 h-6 text-sky-500" />
                                            {category.category}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            {category.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-slate-700">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <Card className="bg-blue-50 border-blue-200">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-blue-900 mb-2">💡 טיפ חשוב</h3>
                                <p className="text-blue-800">
                                    מומלץ להכין את כל המסמכים מראש ולשמור עותקים דיגיטליים. 
                                    זה יאיץ משמעותית את תהליך אישור המשכנתא.
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="costs" className="space-y-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">עלויות נלוות לרכישה</h2>
                            <p className="text-slate-600">חישוב העלויות הנוספות מעבר למחיר הדירה</p>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>פירוט עלויות</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {costsBreakdown.map((cost, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                            <div>
                                                <h4 className="font-semibold text-slate-900">{cost.type}</h4>
                                                <p className="text-sm text-slate-600">{cost.note}</p>
                                            </div>
                                            <div className="text-lg font-bold text-sky-600">
                                                {cost.amount}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-amber-50 border-amber-200">
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-amber-900 mb-2">⚠️ חשוב לזכור</h3>
                                <p className="text-amber-800">
                                    בממוצע, העלויות הנלוות מהוות 5-8% מערך הנכס. לדירה של 2 מיליון ₪, 
                                    צפו לעלויות נוספות של 100,000-160,000 ₪.
                                </p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="tips" className="space-y-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">טיפים והמלצות</h2>
                            <p className="text-slate-600">עצות מעשיות מהמומחים שלנו</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {tips.map((tipCategory, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-3">
                                            {tipCategory.icon}
                                            {tipCategory.category}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            {tipCategory.items.map((tip, tipIndex) => (
                                                <li key={tipIndex} className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-slate-700">{tip}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <Card className="bg-green-50 border-green-200">
                            <CardContent className="p-6 text-center">
                                <h3 className="font-semibold text-green-900 mb-4">🎯 מוכנים להתחיל?</h3>
                                <p className="text-green-800 mb-4">
                                    ארנה יכולה לעזור לכם לעבור את התהליך בצורה חכמה ומותאמת אישית
                                </p>
                                <Button 
                                    onClick={() => navigate(createPageUrl('Home'))}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    התחילו את החיפוש עם ארנה
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}