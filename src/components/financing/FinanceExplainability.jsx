import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Info as InfoIcon, AlertTriangle, TrendingUp, DollarSign, Info, RefreshCcw, Phone } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';

export default function FinanceExplainability({ financingData, onBack }) {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const [showAdvisors, setShowAdvisors] = useState(false);

    const bankLogos = [
        { id: 'hapoalim', name: 'בנק הפועלים', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/b8997d180_image.png' },
        { id: 'leumi', name: 'בנק לאומי', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695416b571bbbac7bcdb7ca0/9faccbfb2_image.png' },
        { id: 'private', name: 'יועץ משכנתאות חיצוני', logo: null },
    ];

    return (
        <div className="space-y-6">
            {/* א. מצב הבקשה */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className={`border-2 ${result.isApproved ? 'border-green-400 bg-green-50' : 'border-orange-300 bg-orange-50'}`}>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            {result.isApproved ? (
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            ) : (
                                <InfoIcon className="w-8 h-8 text-orange-600" />
                            )}
                            <div>
                                <CardTitle className={`text-2xl ${result.isApproved ? 'text-green-700' : 'text-orange-700'}`}>
                                    {result.isApproved ? 'מצוין! קיבלת הערכה ראשונית למשכנתא' : 'בתנאים הנוכחיים – יש דרכים אחרות להתקדם'}
                                </CardTitle>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className={`text-lg ${result.isApproved ? 'text-green-800' : 'text-orange-800'}`}>
                            {result.isApproved ? result.statusMessage : 'על פי הנתונים שמסרת, ההערכה האוטומטית לא אישרה משכנתא, אבל יש עדיין אפשרויות להתקדם.'}
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* ב. המספר המגביל */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Card className="border-slate-200">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <TrendingUp className="w-6 h-6 text-sky-600" />
                            <CardTitle className="text-xl">הגורם המרכזי</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <p className="text-lg text-slate-800 font-medium">
                                    {result.limitingFactorExplanation}
                                </p>
                            </div>
                            
                            {/* פירוט המספרים */}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="bg-white p-4 rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="w-5 h-5 text-slate-600" />
                                        <span className="text-sm text-slate-600">החזר חודשי משוער</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">
                                        ₪{result.calculatedData.monthlyPayment.toLocaleString()}
                                    </p>
                                </div>
                                
                                <div className="bg-white p-4 rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Info className="w-5 h-5 text-slate-600" />
                                        <span className="text-sm text-slate-600">יחס החזר (DTI)</span>
                                    </div>
                                    <p className="text-2xl font-bold text-slate-900">
                                        {result.calculatedData.dti}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* מה כן אפשר? - רק במקרה של דחייה */}
            {!result.isApproved && (
                <>
                    {/* המקסימום האפשרי בפועל - Key Insight */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className="border-sky-300 bg-sky-50">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="w-6 h-6 text-sky-600" />
                                    <CardTitle className="text-xl text-sky-900">המקסימום האפשרי בפועל</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-white p-6 rounded-lg border border-sky-200">
                                    <p className="text-lg text-slate-800 leading-relaxed mb-4">
                                        לפי כושר ההחזר שלך, תוכל לעמוד בהחזר חודשי של עד כ־<span className="font-bold text-sky-700">₪{result.calculatedData.monthlyPayment.toLocaleString()}</span>,
                                        המשקף משכנתא של עד כ־<span className="font-bold text-sky-700">₪{result.calculatedData.maxAffordableLoan?.toLocaleString() || '1,260,000'}</span>.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* כיוון פעולה - What next */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Card className="border-slate-200">
                            <CardHeader>
                                <CardTitle className="text-xl text-slate-900">כיוון פעולה</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3 text-slate-700">
                                    <p className="text-lg">
                                        <strong>זה לא סוף הדרך</strong> – אלא נקודת כיוון.
                                    </p>
                                    <p className="text-lg">
                                        <strong>שינוי קטן</strong> - יכול לפתוח אפשרויות חדשות.
                                    </p>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-6">
                                    <p className="text-slate-800 font-medium mb-4">
                                        תרצה להתייעץ עם יועץ משכנתאות על האפשרויות שלך?
                                    </p>
                                    
                                    {!showAdvisors ? (
                                        <Button 
                                            onClick={() => setShowAdvisors(true)}
                                            className="w-full bg-sky-600 hover:bg-sky-700"
                                        >
                                            כן, רוצה להתייעץ
                                        </Button>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 gap-3">
                                                {bankLogos.map((advisor) => (
                                                    <button
                                                        key={advisor.id}
                                                        className="flex items-center gap-4 p-4 border-2 border-slate-200 rounded-lg hover:border-sky-400 hover:bg-sky-50 transition-all"
                                                    >
                                                        {advisor.logo ? (
                                                            <img src={advisor.logo} alt={advisor.name} className="h-10" />
                                                        ) : (
                                                            <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center">
                                                                <Phone className="w-5 h-5 text-slate-600" />
                                                            </div>
                                                        )}
                                                        <div className="flex-1 text-right">
                                                            <span className="font-medium text-slate-800">{advisor.name}</span>
                                                            <p className="text-sm text-slate-600">לתיאום פגישה</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                            <Button 
                                                onClick={() => setShowAdvisors(false)}
                                                variant="ghost"
                                                className="w-full"
                                            >
                                                לא תודה
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </>
            )}

            {/* דיסקליימר משפטי - תמיד */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: result.isApproved ? 0.2 : 0.4 }}
            >
                <Card className="bg-slate-50 border-slate-200">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2 text-sm">❗ חשוב לדעת:</h4>
                                <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                                    <p>
                                        המידע המוצג מבוסס על אלגוריתם חישוב כללי, המבוסס על ריבית משכנתא משוערת של 4% וכללי בנקאות מקובלים, ואינו מהווה ואינו מחליף ייעוץ משכנתאות, ייעוץ פיננסי או המלצה רשמית.
                                    </p>
                                    <p>
                                        ARENA אינה יועצת מוסמכת ואינה מחזיקה ברישיון ייעוץ פיננסי או משכנתאות לפי חוק.
                                    </p>
                                    <p>
                                        קבלת משכנתא בפועל כפופה לבדיקת הבנקים, לרבות דירוג אשראי, הכנסות, התחייבויות ונתונים נוספים.
                                    </p>
                                    <p>
                                        אנו ממליצים להיוועץ בגורם מוסמך לפני קבלת החלטה פיננסית.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* כפתור חזרה - רק במקרה של אישור */}
            {result.isApproved && (
                <div className="flex justify-center">
                    <Button onClick={onBack} variant="outline" size="lg">
                        חזור לשינוי פרטים
                    </Button>
                </div>
            )}
        </div>
    );
}