import React from 'react';
import TopNavigation from '../components/TopNavigation';
import { ArrowLeft, Gift, Sparkles, Users, CreditCard, Phone, Mail, Star, TrendingUp, CheckCircle, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ArenaClub() {
    const navigate = useNavigate();

    const membershipBenefits = [
        {
            club: "חברי מועדון הייטקזון",
            benefit: "הנחה קבועה של 2%",
            description: "על דירות בפרויקטים משתתפים"
        },
        {
            club: "חברי מועדון חבר", 
            benefit: "הנחה קבועה של 3%",
            description: "על דירות בפרויקטים משתתפים"
        },
        {
            club: "מחזיקי כרטיס MAX",
            benefit: "מתנה מיידית עם שליח",
            description: "לאחר שריון דירה דרך הכרטיס"
        },
        {
            club: "חברי מועדון הנוסע המתמיד עם FLY CARD",
            benefit: "פי 3 נקודות + שליש נקודות",
            description: "על דמי רצינות ועל רכישות לבית בטווח של 6 חודשים"
        }
    ];

    const currentBenefits = [
        {
            partner: "פיטארו הכט",
            benefit: "שוברים לרכישת ריהוט",
            value: "עד ₪20,000",
            color: "bg-blue-100 text-blue-800"
        },
        {
            partner: "IKEA / IDdesign",
            benefit: "ליווי עיצוב אישי או חבילת מוצרים",
            value: "₪10,000",
            color: "bg-yellow-100 text-yellow-800"
        },
        {
            partner: "מגדל",
            benefit: "ביטוח משכנתא לשנה בחינם",
            value: "₪3,000–₪5,000",
            color: "bg-green-100 text-green-800"
        },
        {
            partner: "סמסונג",
            benefit: "טלפון Galaxy AI מתנה",
            value: "₪4,500",
            color: "bg-purple-100 text-purple-800"
        },
        {
            partner: "שופרסל",
            benefit: "סל התארגנות לבית החדש",
            value: "₪1,200",
            color: "bg-orange-100 text-orange-800"
        },
        {
            partner: "WeShoes / GOLF",
            benefit: "שוברי לייףסטייל לבית ומשפחה",
            value: "₪1,000–₪2,500",
            color: "bg-pink-100 text-pink-800"
        },
        {
            partner: "הגרלות חודשיות",
            benefit: "מוצרי חשמל / פינוקים לבית",
            value: "עד ₪50,000",
            color: "bg-red-100 text-red-800"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50" dir="rtl">
            <TopNavigation currentPage="ArenaClub" />
            
            <div className="max-w-6xl mx-auto p-6 py-12">
                <Button 
                    variant="ghost" 
                    onClick={() => navigate(-1)}
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 ml-2" />
                    חזרה
                </Button>

                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                                <Gift className="w-12 h-12 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        🎁 מועדון ההטבות של ARENA
                    </h1>
                    <h2 className="text-2xl text-purple-600 font-medium mb-6">
                        מצאת דירה? מגיע לך הרבה יותר.
                    </h2>
                    <p className="text-lg text-slate-700 max-w-4xl mx-auto leading-relaxed">
                        ARENA מעניקה לרוכשים הטבות ייחודיות, מותאמות אישית – בשיתוף עם החברות המובילות בישראל.
                        <br />
                        <strong>כי כשסוף סוף מצאת את הבית שלך, אנחנו דואגים גם למה שיבוא איתו.</strong>
                    </p>
                </div>

                {/* How it Works */}
                <Card className="mb-12 shadow-lg border-purple-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <TrendingUp className="w-7 h-7 text-purple-600" />
                            💡 איך זה עובד?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                <p className="text-slate-700">
                                    ההטבות ניתנות באופן מיידי לאחר אישור זכאות – חלקן כקוד אונליין, חלקן כשובר פיזי עם שליח.
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                <p className="text-slate-700">
                                    כל ההטבות מתעדכנות ומתחדשות כל הזמן – שווה לחזור לבדוק מה חדש.
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg">
                            <h4 className="font-bold text-slate-800 mb-3">הזכאות להטבות מבוססת על:</h4>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <TrendingUp className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <span className="text-sm font-medium">שווי הרכישה</span>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Users className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <span className="text-sm font-medium">עומק השימוש במערכת</span>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Award className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <span className="text-sm font-medium">סוג היזם/הפרויקט</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Membership Benefits */}
                <Card className="mb-12 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <CreditCard className="w-7 h-7 text-indigo-600" />
                            🎯 מבצעים קבועים לחברי מועדונים
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            {membershipBenefits.map((membership, index) => (
                                <div key={index} className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                    <h4 className="font-bold text-slate-800 mb-2">{membership.club}</h4>
                                    <div className="mb-2">
                                        <Badge className="bg-indigo-100 text-indigo-800">{membership.benefit}</Badge>
                                    </div>
                                    <p className="text-slate-600 text-sm">{membership.description}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Current Benefits */}
                <Card className="mb-12 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Star className="w-7 h-7 text-yellow-500" />
                            ✨ דוגמאות להטבות נוכחיות
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentBenefits.map((benefit, index) => (
                                <div key={index} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-bold text-slate-800">{benefit.partner}</h4>
                                        <Badge className={benefit.color}>{benefit.value}</Badge>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed">{benefit.benefit}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Section */}
                <Card className="shadow-lg border-purple-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <Phone className="w-7 h-7 text-purple-600" />
                            📞 שירות לקוחות ARENA
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg">
                            <p className="text-slate-700 mb-6 text-center text-lg">
                                לכל שאלה או בקשה – אנחנו כאן בשבילך:
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-3 mb-3">
                                        <Phone className="w-5 h-5 text-purple-600" />
                                        <span className="text-xl font-bold text-slate-800">03-5255866</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-3 mb-3">
                                        <Mail className="w-5 h-5 text-purple-600" />
                                        <a href="mailto:Info@arena-ai.org" className="text-xl font-bold text-slate-800 hover:text-purple-600">
                                            Info@arena-ai.org
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Bottom Message */}
                <div className="text-center mt-12 bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold mb-4">
                        ARENA. יותר מדירה. זו התחלה של חיים חדשים.
                    </h3>
                    <p className="text-xl opacity-90">
                        ובינינו – גם לך מגיע לחגוג את זה כמו שצריך 🎈
                    </p>
                    
                    <Button 
                        onClick={() => navigate(createPageUrl('Home'))}
                        className="mt-6 bg-white text-purple-600 hover:bg-slate-100 px-8 py-3 text-lg"
                    >
                        בואו נתחיל לחפש דירה
                    </Button>
                </div>
            </div>
        </div>
    );
}