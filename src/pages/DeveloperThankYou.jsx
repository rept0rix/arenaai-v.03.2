import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowLeft, Building, Eye } from 'lucide-react';
import { createPageUrl } from '@/utils';
import TopNavigation from '../components/TopNavigation';

export default function DeveloperThankYou() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-slate-50 to-blue-50" dir="rtl">
            <TopNavigation currentPage="DeveloperThankYou" />
            <div className="flex items-center justify-center py-20 px-4">
                <Card className="w-full max-w-2xl text-center p-8 md:p-12 shadow-xl">
                    <CardContent>
                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                        <h1 className="text-3xl font-bold text-slate-900 mb-4">תודה על ההצטרפות ל-ARENA!</h1>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            ההסכם נשלח בהצלחה! אנו נבדוק את הפרטים וניצור איתך קשר בהקדם לאישור וההפעלה.
                        </p>
                        
                        <div className="space-y-4 mb-8">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-800 mb-2">השלבים הבאים:</h3>
                                <ul className="text-sm text-blue-700 text-right space-y-1">
                                    <li>✓ קיבלנו את הטופס שלך</li>
                                    <li>• נציג ARENA ייצור איתך קשר בתוך 24 שעות</li>
                                    <li>• לאחר אישור ההסכם - תקבל גישה לפאנל הניהול</li>
                                    <li>• נתחיל להקים את הפרויקטים שלך במערכת</li>
                                </ul>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <Button 
                                size="lg" 
                                onClick={() => navigate(createPageUrl('DeveloperDashboard'))}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <Building className="w-5 h-5 ml-2" />
                                הרשמה מלאה - פאנל יזם
                            </Button>
                            <Button 
                                size="lg" 
                                variant="outline" 
                                onClick={() => navigate(createPageUrl('Chat'))}
                            >
                                <Eye className="w-5 h-5 ml-2" />
                                צפה בפרויקטים קיימים במערכת
                            </Button>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button 
                                variant="ghost" 
                                onClick={() => navigate(createPageUrl('ArenaClub'))}
                            >
                                מועדון ארנה
                            </Button>
                            <Button 
                                variant="ghost" 
                                onClick={() => navigate(createPageUrl('Home'))}
                            >
                                <ArrowLeft className="w-4 h-4 ml-2" />
                                חזרה לדף הבית
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}