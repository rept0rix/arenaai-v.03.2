
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Banknote, CheckCircle, Lightbulb, TrendingUp, Calculator, Shield, ArrowLeft } from 'lucide-react';
import FinancingWizard from '../components/financing/FinancingWizard';
import FinancingResults from '../components/financing/FinancingResults';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import TopNavigation from '../components/TopNavigation';

export default function Financing() {
    const [currentStep, setCurrentStep] = useState('intro'); // intro, wizard, results
    const [financingData, setFinancingData] = useState(null);
    const navigate = useNavigate();

    const handleWizardStart = (startType) => {
        if (startType === 'direct') {
            setCurrentStep('wizard');
        } else {
            // Show intro dialog first
            setCurrentStep('intro-dialog');
        }
    };

    const handleWizardComplete = (formData) => {
        setFinancingData(formData);
        setCurrentStep('results');
    };

    const handleBackToChat = () => {
        const { netIncome, availableFunds, propertyPrice } = financingData;
        
        const income = parseInt(netIncome, 10) || 0;
        const funds = parseInt(availableFunds, 10) || 0;
        const price = parseInt(propertyPrice, 10) || 0;

        // Enhanced calculation logic
        const monthlyPayment = Math.min(income * 0.35, (price - funds) / 250);
        const estimatedMortgage = monthlyPayment * 250;
        const totalBudget = estimatedMortgage + funds;

        const message = `סיימנו את בירור המימון! 🏦 עם הכנסה של ${income.toLocaleString()} ₪ והון עצמי של ${funds.toLocaleString()} ₪, יש לך אפשרות למשכנתא של כ-${Math.round(estimatedMortgage / 1000) * 1000 .toLocaleString()} ₪. התקציב הכולל שלך לדירה: ${Math.round(totalBudget/1000)*1000 .toLocaleString()} ₪. בואי נמצא את הדירה המושלמת! ✨`;
        
        const filters = {
            budget: { 
                answer: totalBudget, 
                filter_field: 'budget', 
                question_text: 'תקציב מימון',
                question_type: 'range'
            }
        };

        const chatUrl = createPageUrl(`Chat?purpose=living&q=${encodeURIComponent(message)}&filters=${encodeURIComponent(JSON.stringify(filters))}`);
        navigate(chatUrl);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-slate-50 to-blue-50" dir="rtl">
            <TopNavigation currentPage="Financing" />
            
            <div className="max-w-7xl mx-auto p-4 sm:p-8">
                <Button 
                    variant="ghost" 
                    onClick={() => navigate(-1)}
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 ml-2" />
                    חזרה
                </Button>

                {currentStep === 'intro' && (
                    <>
                        {/* Header Section */}
                        <div className="text-center mb-12">
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <div className="w-24 h-24 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                        <Banknote className="w-12 h-12 text-white" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                        <TrendingUp className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                                יש לכם תקציב בראש?
                            </h1>
                            <h2 className="text-xl md:text-2xl text-sky-600 font-medium mb-6">
                                בואו תגלו מה באמת אפשרי עבורכם.
                            </h2>
                            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                                המסע לדירה מתחיל בהבנה ברורה של התקציב – ואנחנו כאן בדיוק בשביל זה.
                            </p>
                        </div>

                        {/* Arena Chat Bubble */}
                        <div className="max-w-4xl mx-auto mb-12">
                            <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0 shadow-xl">
                                <CardContent className="p-8">
                                    <div className="flex items-start gap-6">
                                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                            <img
                                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/a1d576606_a-icon-shadow1.png"
                                                alt="Arena AI"
                                                className="w-10 h-10"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold mb-3">
                                                ארנה מאפשרת לכם לקבל אישור עקרוני למשכנתא תוך דקות
                                            </h3>
                                            <p className="text-white/90 leading-relaxed mb-4">
                                                בשיתוף בנק הפועלים ובנק לאומי. בניגוד לטפסים מסורבלים או שיחות לא נגמרות – אצלנו זה פשוט, דיסקרטי ומיידי.
                                                התשובות שתיתנו ישמשו רק לצורך סימולציה, בלי התחייבות מצדכם.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Services Grid */}
                        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
                            <Card className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Calculator className="w-8 h-8 text-sky-500" />
                                        <h3 className="font-semibold">סימולציה מיידית</h3>
                                    </div>
                                    <p className="text-slate-600">חישוב משכנתא חכמה המותאם לפרופיל הפיננסי שלך</p>
                                </CardContent>
                            </Card>
                            
                            <Card className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <CheckCircle className="w-8 h-8 text-green-500" />
                                        <h3 className="font-semibold">אישור עקרוני מהבנק</h3>
                                    </div>
                                    <p className="text-slate-600">ישירות מהמערכת עם הבנקים המובילים</p>
                                </CardContent>
                            </Card>
                            
                            <Card className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <TrendingUp className="w-8 h-8 text-purple-500" />
                                        <h3 className="font-semibold">הצעות מותאמות</h3>
                                    </div>
                                    <p className="text-slate-600">מימון מותאם לפרופיל (כולל זכאות להטבות)</p>
                                </CardContent>
                            </Card>
                            
                            <Card className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <Shield className="w-8 h-8 text-blue-500" />
                                        <h3 className="font-semibold">ליווי צמוד</h3>
                                    </div>
                                    <p className="text-slate-600">מהשלב הפיננסי ועד החתימה</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* CTA Button */}
                        <div className="text-center">
                            <Button 
                                onClick={() => handleWizardStart('direct')}
                                size="lg"
                                className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                            >
                                בדקו את אפשרויות המימון שלכם עכשיו
                            </Button>
                            <p className="text-sm text-slate-500 mt-3">אין התחייבות. זה ייקח פחות מ־2 דקות.</p>
                        </div>

                        {/* Disclaimer */}
                        <div className="mt-12 max-w-3xl mx-auto">
                            <Card className="bg-amber-50 border-amber-200">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-amber-600 text-sm font-bold">!</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-amber-800 mb-2">דיסקליימר</h4>
                                            <p className="text-sm text-amber-700 leading-relaxed">
                                                המידע בעמוד זה נועד להכוונה בלבד ואינו מהווה ייעוץ פיננסי, שיווקי או הצעה מחייבת.
                                                האישור העקרוני ניתן על־ידי הבנקים ונתון לשיקול דעתם בלבד. אין לראות במידע תחליף לייעוץ משכנתאות מקצועי.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </>
                )}

                {currentStep === 'wizard' && (
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">בירור מימון אישי</h2>
                            <p className="text-slate-600">כמה שאלות קצרות כדי להתאים לך את האפשרויות הטובות ביותר</p>
                        </div>
                        <FinancingWizard onComplete={handleWizardComplete} />
                    </div>
                )}

                {currentStep === 'results' && financingData && (
                    <div className="max-w-6xl mx-auto">
                        <FinancingResults 
                            data={financingData} 
                            onBackToChat={handleBackToChat}
                            onStartOver={() => setCurrentStep('intro')}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
