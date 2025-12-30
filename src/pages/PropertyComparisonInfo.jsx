import React from 'react';
import TopNavigation from '../components/TopNavigation';
import ComparisonCard from '../components/properties/ComparisonCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Target, TrendingUp, Clock, Brain, CheckCircle, Sparkles, ArrowLeft, Scale, Users, Rocket, Search, Home, Lightbulb, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PropertyComparisonInfo() {
    const navigate = useNavigate();
    const [showChatHelp, setShowChatHelp] = React.useState(false);

    const benefits = [
        {
            icon: <Brain className="w-6 h-6" />,
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            title: "החלטה חכמה בלי בלבול",
            description: "השוו בין נכסים בצורה מובנית וקבלו תמונה ברורה של היתרונות והחסרונות של כל אחד"
        },
        {
            icon: <Target className="w-6 h-6" />,
            iconBg: "bg-pink-100",
            iconColor: "text-pink-600",
            title: "ניתוח שמתאים רק לך",
            description: "המערכת מנתחת את הנכסים מול ההעדפות האישיות שלכם ונותנת ציון התאמה מותאם אישית"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            iconBg: "bg-teal-100",
            iconColor: "text-teal-600",
            title: "חסכון בזמן",
            description: "ראו את כל המידע החשוב על כל הנכסים במקום אחד, בלי לדפדף בין עשרות כרטיסיות"
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            title: "ניתוח חכם",
            description: "קבלו הסבר מפורט למה כל נכס מתאים או לא מתאים לכם, עם ציון פירוט של הגורמים"
        }
    ];

    const steps = [
        { 
            step: 1, 
            icon: <Home className="w-6 h-6" />,
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            title: "בחרו נכסים", 
            description: "בחרו 2-3 נכסים שמעניינים אתכם מתוך תוצאות החיפוש או מהמועדפים שלכם"
        },
        { 
            step: 2, 
            icon: <Lightbulb className="w-6 h-6" />,
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-600",
            title: "ניתוח אישי", 
            description: "המערכת מנתחת כל נכס מול ההעדפות שלכם ומחשבת ציון התאמה מדויק"
        },
        { 
            step: 3, 
            icon: <Scale className="w-6 h-6" />,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            title: "קבלו תוצאות", 
            description: "ראו השוואה מפורטת עם ציונים, גורמים חיוביים ושליליים, והמלצות"
        }
    ];

    // Demo properties for the live example
    const demoProperties = [
        {
            id: '1',
            title: 'דירת 4 חדרים בגבעתיים',
            location: 'רח\' המגשימים 12, גבעתיים',
            price: 3200000,
            image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
            rooms: 4,
            size: 95,
            property_type: 'דירה',
            floor: 3,
            developer: 'שיכון ובינוי',
            features: ['מעלית', 'חניה', 'מרפסת שמש']
        },
        {
            id: '2', 
            title: 'דירת 3 חדרים בתל אביב',
            location: 'רח\' אבן גבירול 45, תל אביב',
            price: 4100000,
            image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
            rooms: 3,
            size: 78,
            property_type: 'דירה',
            floor: 8,
            developer: 'אפריקה ישראל',
            features: ['מעלית', 'חניה תת קרקעית', 'נוף לים']
        },
        {
            id: '3',
            title: 'פנטהאוז 5 חדרים ברמת השרון',
            location: 'רח\' התמרים 8, רמת השרון',
            price: 5800000,
            image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
            rooms: 5,
            size: 130,
            property_type: 'פנטהאוז',
            floor: 12,
            developer: 'דימרי',
            features: ['מרפסת גג', 'חניה כפולה', 'מעלית פרטית']
        }
    ];

    const generateMatchDetails = (property) => {
        let score = 70;
        let positiveFactors = [];
        let negativeFactors = [];

        if (property.price < 4000000) {
            const contribution = 10.4;
            score += contribution;
            positiveFactors.push({ name: 'תקציב', value: 'מתאים', contribution, description: "המחיר נמצא בטווח התקציב שלך" });
        }
        if (property.rooms >= 4) {
            const contribution = 8.3;
            score += contribution;
            positiveFactors.push({ name: 'מספר חדרים', value: property.rooms, contribution, description: "מספר החדרים מתאים לצרכים שלך" });
        }
        if (property.features?.includes('חניה')) {
            const contribution = 8.3;
            score += contribution;
            positiveFactors.push({ name: 'חניה', value: 'קיימת', contribution, description: "יש חניה כמו שביקשת" });
        }
        if (property.features?.includes('מעלית')) {
            const contribution = 8.3;
            score += contribution;
            positiveFactors.push({ name: 'מעלית', value: 'קיימת', contribution, description: "יש מעלית בבניין" });
        }

        if (property.property_type !== 'פנטהאוז') {
            const contribution = 6.0;
            score -= contribution;
            negativeFactors.push({ name: 'סוג נכס', value: property.property_type, contribution, description: "סוג הנכס שונה מההעדפה שלך" });
        }

        return {
            score: Math.min(Math.max(score, 0), 99),
            positiveFactors,
            negativeFactors,
        };
    };

    const handleToggleFavorite = (propertyId) => {
        console.log('Toggle favorite:', propertyId);
    };

    const handleReplace = (propertyId) => {
        console.log('Replace property:', propertyId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
            <div className="bg-white border-b border-slate-200 px-6 py-4">
                <div className="max-w-7xl mx-auto">
                    <TopNavigation currentPage="PropertyComparisonInfo" />
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative py-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-50 to-sky-50 opacity-50"></div>
                <div className="max-w-7xl mx-auto px-6 relative">
                    <Button 
                        variant="ghost" 
                        onClick={() => navigate(-1)}
                        className="mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 ml-2" />
                        חזרה
                    </Button>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                            <Scale className="w-10 h-10 text-white" />
                        </div>
                        
                        <h1 className="text-5xl font-bold text-slate-900 mb-4">
                            השוואת נכסים חכמה – מותאמת בדיוק בשבילך
                        </h1>
                        
                        <p className="text-xl text-slate-600 leading-relaxed mb-6">
                            ARENA משווה בשבילך את כל הפרטים – כדי שתוכל/י לבחור בביטחון
                        </p>

                        <div className="flex flex-wrap gap-3 justify-center">
                            <div className="bg-white rounded-full px-5 py-2 shadow-md">
                                <span className="text-slate-700 font-medium">🎯 התאמה אישית</span>
                            </div>
                            <div className="bg-white rounded-full px-5 py-2 shadow-md">
                                <span className="text-slate-700 font-medium">⚡ החלטות מהירות</span>
                            </div>
                            <div className="bg-white rounded-full px-5 py-2 shadow-md">
                                <span className="text-slate-700 font-medium">🧠 ניתוח חכם</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">
                            למה השוואת נכסים חשובה?
                        </h2>
                        <p className="text-lg text-slate-600">
                            כי קנייה טובה מתחילה בהשוואה חכמה
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105">
                                    <CardContent className="p-5 text-center">
                                        <div className={`w-14 h-14 ${benefit.iconBg} rounded-full flex items-center justify-center mx-auto mb-3 ${benefit.iconColor}`}>
                                            {benefit.icon}
                                        </div>
                                        <h3 className="font-bold text-lg text-slate-900 mb-2">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed text-sm">
                                            {benefit.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-3">
                        איך זה עובד?
                    </h2>
                    <p className="text-xl text-slate-600 text-center mb-12 max-w-3xl mx-auto">
                        תהליך פשוט ומהיר שמוביל אתכם להחלטה הנכונה
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {steps.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.15 }}
                                viewport={{ once: true }}
                            >
                                <Card className="text-center hover:shadow-xl transition-all duration-300">
                                    <CardContent className="p-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3 shadow-lg">
                                            {item.step}
                                        </div>
                                        <div className={`w-12 h-12 ${item.iconBg} rounded-full flex items-center justify-center mx-auto mb-3 ${item.iconColor}`}>
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                        <p className="text-slate-600 text-sm">{item.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Live Demo Section */}
            <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-3">
                            <Sparkles className="w-4 h-4" />
                            <span className="font-medium">דוגמה חיה</span>
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-3">
                            ראו את ההשוואה בפעולה
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            להלן דוגמה אמיתית של השוואת נכסים. שימו לב לציוני ההתאמה, הגורמים החיוביים והשליליים, והפירוט המלא שמקבלים על כל נכס. לחצו על הכרטיסים כדי לראות פרטים נוספים!
                        </p>
                    </motion.div>

                    <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory">
                        {demoProperties.map((property, index) => {
                            const matchDetails = generateMatchDetails(property);
                            return (
                                <motion.div
                                    key={property.id}
                                    initial={{ opacity: 0, x: 100 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2, duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <ComparisonCard 
                                        property={property}
                                        matchDetails={matchDetails}
                                        isFavorite={false}
                                        onToggleFavorite={handleToggleFavorite}
                                        onReplace={handleReplace}
                                    />
                                </motion.div>
                            );
                        })}
                        <div className="w-8 flex-shrink-0"></div>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-sm text-slate-500 italic">
                            💡 זו רק דוגמה - כשתשתמשו במערכת, תקבלו ציוני התאמה מותאמים אישית לפי ההעדפות שלכם
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-700 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-4">
                            מוכנים למצוא את הדירה המושלמת?
                        </h2>
                        <p className="text-xl mb-6 opacity-90">
                            התחילו את המסע שלכם עם ARENA. חפשו נכסים, השוו ביניהם, וקבלו את ההמלצות החכמות שיובילו אתכם להחלטה הנכונה
                        </p>
                        <Button 
                            size="lg"
                            onClick={() => navigate(createPageUrl('Home'))}
                            className="bg-white text-purple-600 hover:bg-slate-100 text-lg px-8 py-6 h-auto font-bold shadow-xl"
                        >
                            חפשו את הנכס המתאים לכם
                            <Target className="w-5 h-5 mr-3" />
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Floating Chat Help Button */}
            {showChatHelp && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-24 right-6 z-40 bg-white rounded-2xl shadow-2xl p-4 max-w-xs border border-purple-200"
                >
                    <button
                        onClick={() => setShowChatHelp(false)}
                        className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                    >
                        ✕
                    </button>
                    <h4 className="font-bold text-slate-900 mb-2">💡 איך זה עובד?</h4>
                    <p className="text-sm text-slate-600 mb-3">
                        המערכת שלנו משווה נכסים לפי ההעדפות האישיות שלך ונותנת ציון התאמה לכל נכס.
                    </p>
                    <Button
                        size="sm"
                        onClick={() => navigate(createPageUrl('Chat'))}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                        דברו עם ארנה
                    </Button>
                </motion.div>
            )}

            <button
                onClick={() => setShowChatHelp(!showChatHelp)}
                className="fixed bottom-6 right-6 z-50 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110"
            >
                <MessageCircle className="w-6 h-6" />
            </button>
        </div>
    );
}