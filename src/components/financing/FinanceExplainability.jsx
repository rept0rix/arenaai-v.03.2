import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, DollarSign, Info } from 'lucide-react';
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

    return (
        <div className="space-y-6">
            {/* א. מצב הבקשה */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className={`border-2 ${result.isApproved ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'}`}>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            {result.isApproved ? (
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            ) : (
                                <XCircle className="w-8 h-8 text-red-600" />
                            )}
                            <div>
                                <CardTitle className={`text-2xl ${result.isApproved ? 'text-green-700' : 'text-red-700'}`}>
                                    {result.isApproved ? '✔️ מאושר' : '❌ לא מאושר'}
                                </CardTitle>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className={`text-lg ${result.isApproved ? 'text-green-800' : 'text-red-800'}`}>
                            {result.statusMessage}
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

            {/* כפתור חזרה */}
            <div className="flex justify-center">
                <Button onClick={onBack} variant="outline" size="lg">
                    חזור לשינוי פרטים
                </Button>
            </div>
        </div>
    );
}