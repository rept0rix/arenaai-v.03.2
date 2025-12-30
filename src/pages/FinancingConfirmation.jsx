import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, MessageSquare, ArrowLeft } from 'lucide-react';
import { createPageUrl } from '@/utils';
import TopNavigation from '../components/TopNavigation';

export default function FinancingConfirmation() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const date = searchParams.get('date');
    const time = searchParams.get('time');
    const advisors = searchParams.get('advisors');

    const formattedDate = date ? new Date(date).toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' }) : 'היום המבוקש';

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-slate-50 to-blue-50" dir="rtl">
            <TopNavigation currentPage="FinancingConfirmation" />
            <div className="flex items-center justify-center py-20 px-4">
                <Card className="w-full max-w-2xl text-center p-8 md:p-12 shadow-xl">
                    <CardContent>
                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                        <h1 className="text-3xl font-bold text-slate-900 mb-4">הפגישה נקבעה בהצלחה!</h1>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            יועצי המשכנתאות מהגורמים שבחרת
                            {advisors && <span className="font-semibold"> ({decodeURIComponent(advisors)})</span>}
                            יצרו איתך קשר סביב <span className="font-semibold">{formattedDate}</span> בשעה <span className="font-semibold">{time}</span>.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" onClick={() => navigate(createPageUrl('Chat'))}>
                                <MessageSquare className="w-5 h-5 ml-2" />
                                המשך שיחה עם ארנה
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => navigate(createPageUrl('Financing'))}>
                                <ArrowLeft className="w-5 h-5 ml-2" />
                                חזרה לדף המימון
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}