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

    const bankLogos = [
        { id: 'leumi', name: 'בנק לאומי', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/45ac49117_leumi.png' },
        { id: 'hapoalim', name: 'בנק הפועלים', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/d32f7a086_hapoalim.png' },
        { id: 'private', name: 'יועץ משכנתאות', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/134407b46_private-advisor-icon.png' },
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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="border-sky-300 bg-sky-50">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <RefreshCcw className="w-6 h-6 text-sky-600" />
                                <CardTitle className="text-xl text-sky-900">מה כן אפשר?</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-slate-700">
                                בשלב זה אין לנו הצעה מאושרת אוטומטית בתנאים אחרים. השלב הבא המומלץ הוא בדיקה אישית מול גורם פיננסי.
                            </p>
                            
                            <div className="bg-white p-4 rounded-lg border border-sky-200">
                                <p className="text-sm text-slate-600 mb-3 font-medium">יועצים שיכולים לעזור:</p>
                                <div className="flex flex-wrap gap-4 items-center">
                                    {bankLogos.map((bank) => (
                                        <div key={bank.id} className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                            <img src={bank.logo} alt={bank.name} className="h-10" />
                                            <span className="text-xs text-slate-600">{bank.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                                <p className="text-sm text-amber-800">
                                    <strong>💡 טיפ:</strong> ייעוץ אישי עם יועץ משכנתאות או גוף בנקאי יכול לפתוח אפשרויות נוספות – כמו שינוי אחוז מימון, פריסת תקופה אחרת, או הלוואה משלימה.
                                </p>
                            </div>
                            
                            <Button 
                                onClick={onBack} 
                                variant="outline" 
                                size="lg"
                                className="w-full"
                            >
                                <RefreshCcw className="w-4 h-4 ml-2" />
                                נסה שוב עם נתונים אחרים
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {/* אפשרויות מימון נוספות - בקרוב */}
            {!result.isApproved && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Card className="border-slate-200 bg-slate-50 opacity-60">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Phone className="w-6 h-6 text-slate-500" />
                                    <CardTitle className="text-xl text-slate-700">אפשרויות מימון נוספות</CardTitle>
                                </div>
                                <Badge variant="outline" className="bg-white border-slate-300 text-slate-600">
                                    בקרוב
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600">
                                בקרוב נציע לך חלופות מימון נוספות, כולל הלוואות משלימות, הון פרטי, ועוד.
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

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