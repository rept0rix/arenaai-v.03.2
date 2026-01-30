import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Info as InfoIcon, AlertTriangle, TrendingUp, Calculator, Info, RefreshCcw, Phone, Home, Calendar } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';

export default function FinanceExplainability({ financingData, onBack }) {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAdvisors, setShowAdvisors] = useState(false);

    useEffect(() => {
        calculateExplainability();
    }, [financingData]);

    const calculateExplainability = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await base44.functions.invoke('calculateFinanceExplainability', {
                monthlyIncome: financingData.monthlyIncome,
                monthlyExpenses: financingData.monthlyExpenses,
                propertyPrice: financingData.propertyPrice,
                downPayment: financingData.downPayment
            });

            setResult(response.data);
        } catch (err) {
            setError('שגיאה בחישוב המימון. אנא נסה שוב.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500" />
            </div>
        );
    }

    if (error) {
        return (
            <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                    <p className="text-red-600">{error}</p>
                    <Button onClick={onBack} variant="outline" className="mt-4">
                        חזור
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (!result) return null;

    const bankLogos = [
        { id: 'hapoalim', name: 'בנק הפועלים', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/b8997d180_image.png' },
        { id: 'leumi', name: 'בנק לאומי', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/9faccbfb2_image.png' },
        { id: 'private', name: 'יועץ משכנתאות חיצוני', logo: null },
    ];

    // If approved - show approved view
    if (result.isApproved) {
        return (
            <div className="space-y-6">
                {/* הערכה ראשונית */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle className="text-2xl text-slate-900">הערכה ראשונית למשכנתא</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-700">
                                על פי הנתונים שמסרת, אלו האפשרויות המשוערות שלך:
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* סיכום הנתונים שהוזנו */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle className="text-xl text-slate-900">הנתונים שהוזנו</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-slate-50 rounded-lg">
                                    <Home className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                                    <p className="text-sm text-slate-600 mb-1">מחיר הנכס</p>
                                    <p className="text-lg font-bold text-slate-900">
                                        ₪{financingData.propertyPrice.toLocaleString()}
                                    </p>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-lg">
                                    <Calculator className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                                    <p className="text-sm text-slate-600 mb-1">מקדמה</p>
                                    <p className="text-lg font-bold text-slate-900">
                                        ₪{financingData.downPayment.toLocaleString()}
                                    </p>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                                    <p className="text-sm text-slate-600 mb-1">הכנסה חודשית</p>
                                    <p className="text-lg font-bold text-slate-900">
                                        ₪{financingData.monthlyIncome.toLocaleString()}
                                    </p>
                                </div>
                                <div className="text-center p-4 bg-slate-50 rounded-lg">
                                    <Calendar className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                                    <p className="text-sm text-slate-600 mb-1">תקופת פירעון</p>
                                    <p className="text-lg font-bold text-slate-900">
                                        25 שנים
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* הגורם המרכזי - למה אושרה */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="border-slate-200 bg-white">
                        <CardHeader>
                            <CardTitle className="text-xl text-slate-900">למה זה עובד?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                                <p className="text-lg text-slate-800 leading-relaxed mb-4">
                                    {result.limitingFactorExplanation}
                                </p>
                                
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                                        <p className="text-sm text-slate-600 mb-1">החזר חודשי משוער</p>
                                        <p className="text-2xl font-bold text-slate-900">
                                            ₪{result.calculatedData.monthlyPayment.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                                        <p className="text-sm text-slate-600 mb-1">יחס החזר (DTI)</p>
                                        <p className="text-2xl font-bold text-slate-900">
                                            {result.calculatedData.dti}%
                                        </p>
                                        <p className="text-xs text-sky-600 mt-1">בטווח התקין</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* דיסקליימר */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card className="bg-slate-50 border-slate-200">
                        <CardContent className="p-4">
                            <div className="flex items-start gap-2">
                                <AlertTriangle className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-slate-800 mb-2 text-sm">❗ חשוב לדעת:</h4>
                                    <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                                        <p>המידע המוצג מבוסס על אלגוריתם חישוב כללי, המבוסס על ריבית משכנתא משוערת של 4% וכללי בנקאות מקובלים, ואינו מהווה ואינו מחליף ייעוץ משכנתאות, ייעוץ פיננסי או המלצה רשמית.</p>
                                        <p>ARENA אינה יועצת מוסמכת ואינה מחזיקה ברישיון ייעוץ פיננסי או משכנתאות לפי חוק.</p>
                                        <p>קבלת משכנתא בפועל כפופה לבדיקת הבנקים, לרבות דירוג אשראי, הכנסות, התחייבויות ונתונים נוספים.</p>
                                        <p>אנו ממליצים להיוועץ בגורם מוסמך לפני קבלת החלטה פיננסית.</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        );
    }

    // If NOT approved - show rejection view
    return (
        <div className="space-y-6">
            {/* הערכה ראשונית */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-2xl text-slate-900">הערכה ראשונית למשכנתא</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-slate-700">
                            על פי הנתונים שמסרת, ההערכה האוטומטית לא אישרה משכנתא, אבל יש עדיין אפשרויות להתקדם.
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* סיכום הנתונים שהוזנו */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Card className="border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-xl text-slate-900">הנתונים שהוזנו</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-slate-50 rounded-lg">
                                <Home className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                                <p className="text-sm text-slate-600 mb-1">מחיר הנכס</p>
                                <p className="text-lg font-bold text-slate-900">
                                    ₪{financingData.propertyPrice.toLocaleString()}
                                </p>
                            </div>
                            <div className="text-center p-4 bg-slate-50 rounded-lg">
                                <Calculator className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                                <p className="text-sm text-slate-600 mb-1">מקדמה</p>
                                <p className="text-lg font-bold text-slate-900">
                                    ₪{financingData.downPayment.toLocaleString()}
                                </p>
                            </div>
                            <div className="text-center p-4 bg-slate-50 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                                <p className="text-sm text-slate-600 mb-1">הכנסה חודשית</p>
                                <p className="text-lg font-bold text-slate-900">
                                    ₪{financingData.monthlyIncome.toLocaleString()}
                                </p>
                            </div>
                            <div className="text-center p-4 bg-slate-50 rounded-lg">
                                <Calendar className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                                <p className="text-sm text-slate-600 mb-1">תקופת פירעון</p>
                                <p className="text-lg font-bold text-slate-900">
                                    25 שנים
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* הגורם המגביל */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="border-slate-200 bg-white">
                    <CardHeader>
                        <CardTitle className="text-xl text-slate-900">למה לא אושרה?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                            <p className="text-lg text-slate-800 leading-relaxed mb-4">
                                {result.limitingFactorExplanation}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                                    <p className="text-sm text-slate-600 mb-1">החזר חודשי משוער</p>
                                    <p className="text-2xl font-bold text-slate-900">
                                        ₪{result.calculatedData.monthlyPayment.toLocaleString()}
                                    </p>
                                </div>
                                <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
                                    <p className="text-sm text-slate-600 mb-1">יחס החזר (DTI)</p>
                                    <p className="text-2xl font-bold text-slate-900">
                                        {result.calculatedData.dti}%
                                    </p>
                                    <p className="text-xs text-slate-600 mt-1">מעל התקן המקובל</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* המקסימום האפשרי */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Card className="border-sky-300 bg-sky-50">
                    <CardHeader>
                        <CardTitle className="text-xl text-sky-900">המקסימום האפשרי בפועל</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-white p-6 rounded-lg border border-sky-200">
                            <p className="text-lg text-slate-800 leading-relaxed">
                                לפי כושר ההחזר שלך, תוכל לעמוד בהחזר חודשי של עד כ־<span className="font-bold text-sky-700 text-xl">₪{result.calculatedData.monthlyPayment.toLocaleString()}</span>,
                                המשקף משכנתא של עד כ־<span className="font-bold text-sky-700 text-xl">₪{result.calculatedData.maxAffordableLoan?.toLocaleString() || '1,260,000'}</span>.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* כיוון פעולה */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Card className="border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-xl text-center text-slate-900">
                            תרצה להתייעץ עם ייעוץ משכנתאות על האפשרויות שלך?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!showAdvisors ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-3">
                                    {bankLogos.map((advisor) => (
                                        <button
                                            key={advisor.id}
                                            onClick={() => setShowAdvisors(true)}
                                            className="flex items-center justify-between gap-4 p-5 border-2 border-slate-200 rounded-xl hover:border-sky-400 hover:bg-sky-50 transition-all"
                                        >
                                            <div className="flex items-center gap-4">
                                                {advisor.logo ? (
                                                    <img src={advisor.logo} alt={advisor.name} className="h-12" />
                                                ) : (
                                                    <div className="h-12 w-12 bg-slate-200 rounded-full flex items-center justify-center">
                                                        <Phone className="w-6 h-6 text-slate-600" />
                                                    </div>
                                                )}
                                                <div className="text-right">
                                                    <span className="font-medium text-slate-800 text-lg block">{advisor.name}</span>
                                                    <p className="text-sm text-slate-600">לתיאום פגישה</p>
                                                </div>
                                            </div>
                                                            {advisor.id === 'leumi' && (
                                                <Badge className="bg-sky-500 text-white">בחירה מומלצת</Badge>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <Button 
                                    variant="ghost"
                                    className="w-full text-slate-600"
                                    onClick={onBack}
                                >
                                    לא תודה
                                </Button>
                            </div>
                        ) : null}
                    </CardContent>
                </Card>
            </motion.div>

            {/* הודעת אזהרה */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <Card className="border-sky-200 bg-sky-50/50">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-2">
                            <InfoIcon className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-1 text-sm">בתנאים הנוכחיים – יש דרכים אחרות להתקדם</h4>
                                <p className="text-xs text-slate-700">
                                    על פי הנתונים שמסרת, ההערכה האוטומטית לא אישרה משכנתא, אבל יש עדיין אפשרויות להתקדם.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* דיסקליימר משפטי */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <Card className="bg-slate-50 border-slate-200">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2 text-sm">❗ חשוב לדעת:</h4>
                                <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                                    <p>המידע המוצג מבוסס על אלגוריתם חישוב כללי, המבוסס על ריבית משכנתא משוערת של 4% וכללי בנקאות מקובלים, ואינו מהווה ואינו מחליף ייעוץ משכנתאות, ייעוץ פיננסי או המלצה רשמית.</p>
                                    <p>ARENA אינה יועצת מוסמכת ואינה מחזיקה ברישיון ייעוץ פיננסי או משכנתאות לפי חוק.</p>
                                    <p>קבלת משכנתא בפועל כפופה לבדיקת הבנקים, לרבות דירוג אשראי, הכנסות, התחייבויות ונתונים נוספים.</p>
                                    <p>אנו ממליצים להיוועץ בגורם מוסמך לפני קבלת החלטה פיננסית.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}