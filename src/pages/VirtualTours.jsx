
import React from 'react';
import TopNavigation from '../components/TopNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Eye, Home, Compass, Clock, CheckCircle, Sparkles, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VirtualTours() {
    const navigate = useNavigate();

    const benefits = [
        {
            icon: <Eye className="w-6 h-6" />,
            title: "חוויה ויזואלית מלאה",
            description: "הסתובבו בדירה כאילו אתם שם - ראו כל פינה, כל חדר, מכל זווית"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "חסכון בזמן",
            description: "בקרו במספר נכסים בו זמנית מהבית, בלי נסיעות מיותרות"
        },
        {
            icon: <Compass className="w-6 h-6" />,
            title: "החלטות מושכלות יותר",
            description: "הבינו את החלל האמיתי ותכננו את הריהוט עוד לפני הרכישה"
        },
        {
            icon: <Home className="w-6 h-6" />,
            title: "נגיש תמיד",
            description: "צפו בסיורים בכל שעה, מכל מקום, כמה פעמים שתרצו"
        }
    ];

    const features = [
        {
            title: "סיור וירטואלי בתוך הדירה",
            description: "טכנולוגיית 3D מתקדמת מאפשרת לכם להסתובב בדירה בחופשיות מוחלטת. ראו כל חדר מכל זווית, התקרבו לפרטים, בדקו את חלוקת החללים ותכננו את הריהוט והעיצוב שלכם. חוו את הדירה בשעות שונות של היום - ראו איך אור השמש נכנס דרך החלונות בבוקר, בצהריים ובערב. הבינו את תחושת המרחב האמיתית והרגישו כאילו אתם כבר גרים שם.",
            image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            imagePosition: "right"
        },
        {
            title: "מבט על הבניין והשכונה",
            description: "ראו את הבניין מבחוץ ואת הסביבה המלאה. המודלים התלת ממדיים שלנו כוללים את כל השכונה - הרחובות, הבניינים מסביב, הפארקים, המתקנים הציבוריים והשירותים הקרובים. הבינו את המיקום האמיתי של הנכס, בדקו את הנוף מהחלונות ומהמרפסת, וקבלו תחושה מלאה של החיים באזור. זהו אחד היתרונות הגדולים של הסיור הווירטואלי - יכולת לראות את התמונה המלאה לפני שאתם מגיעים לביקור.",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            imagePosition: "left"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" dir="rtl">
            <div className="bg-white border-b border-slate-200 px-6 py-4">
                <div className="max-w-7xl mx-auto">
                    <TopNavigation currentPage="VirtualTours" />
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-blue-50 to-purple-50 opacity-50"></div>
                <div className="max-w-7xl mx-auto px-6 relative">
                    <Button 
                        variant="ghost" 
                        onClick={() => navigate(-1)}
                        className="mb-6"
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
                        <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                            <Sparkles className="w-10 h-10 text-white" />
                        </div>
                        
                        <h1 className="text-5xl font-bold text-slate-900 mb-6">
                            סיורים וירטואליים תלת ממדיים
                        </h1>
                        
                        <p className="text-xl text-slate-600 leading-relaxed mb-8">
                            חוו את הדירה העתידית שלכם עוד לפני שהבנייה הושלמה. טכנולוגיית 3D מתקדמת מאפשרת לכם לבקר, לחקור ולהחליט - הכל מהנוחות של הבית שלכם.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <div className="bg-white rounded-full px-6 py-3 shadow-md">
                                <span className="text-slate-700 font-medium">⏱️ חיסכון בזמן</span>
                            </div>
                            <div className="bg-white rounded-full px-6 py-3 shadow-md">
                                <span className="text-slate-700 font-medium">🏡 חוויה אמיתית</span>
                            </div>
                            <div className="bg-white rounded-full px-6 py-3 shadow-md">
                                <span className="text-slate-700 font-medium">✨ החלטות חכמות</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
                        למה סיורים וירטואליים?
                    </h2>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full hover:shadow-xl transition-shadow">
                                    <CardContent className="p-6 text-center">
                                        <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4 text-sky-600">
                                            {benefit.icon}
                                        </div>
                                        <h3 className="font-bold text-lg text-slate-900 mb-3">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            {benefit.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features with Images */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
                        איך זה עובד?
                    </h2>
                    <p className="text-xl text-slate-600 text-center mb-16 max-w-3xl mx-auto">
                        הטכנולוגיה המתקדמת שלנו הופכת את חיפוש הדירה לחוויה אינטראקטיבית ומרתקת
                    </p>

                    <div className="space-y-24">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className={`flex flex-col ${feature.imagePosition === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
                            >
                                <div className="lg:w-1/2">
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
                                    />
                                </div>
                                <div className="lg:w-1/2">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold">
                                            {index + 1}
                                        </div>
                                        <h3 className="text-3xl font-bold text-slate-900">
                                            {feature.title}
                                        </h3>
                                    </div>
                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-gradient-to-br from-sky-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
                        תהליך הסיור הוירטואלי
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: 1, title: "בחרו נכס", description: "מצאו נכס שמעניין אתכם דרך המערכת של ARENA" },
                            { step: 2, title: "הפעילו את הסיור", description: "לחצו על כפתור הסיור הווירטואלי והיכנסו לחוויה תלת ממדית" },
                            { step: 3, title: "חקרו והחליטו", description: "הסתובבו בחופשיות, צפו מזוויות שונות, וקבלו החלטה מושכלת" }
                        ].map((item, index) => (
                            <Card key={index} className="text-center hover:shadow-xl transition-shadow">
                                <CardContent className="p-8">
                                    <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                    <p className="text-slate-600">{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-sky-600 to-blue-700 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-6">
                            מוכנים לחוות את הדירה החדשה שלכם?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            התחילו את המסע שלכם עם ARENA ומצאו את הנכס המושלם עם טכנולוגיית הסיורים הוירטואליים המתקדמת ביותר
                        </p>
                        <Button 
                            size="lg"
                            onClick={() => navigate(createPageUrl('Home'))}
                            className="bg-white text-sky-600 hover:bg-slate-100 text-lg px-8 py-6 h-auto font-bold shadow-xl"
                        >
                            חפשו את הנכס המתאים לכם
                            <Home className="w-5 h-5 mr-3" />
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
