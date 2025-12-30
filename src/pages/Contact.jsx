
import React, { useState } from 'react';
import TopNavigation from '../components/TopNavigation';
import { ArrowLeft, Mail, MapPin, Phone, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

export default function Contact() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSending, setIsSending] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        // Simulate sending form
        setTimeout(() => {
            toast.success('ההודעה נשלחה בהצלחה! נחזור אליך בקרוב.');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setIsSending(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <TopNavigation currentPage="Contact" />
            
            <div className="max-w-6xl mx-auto p-6 py-12">
                <Button 
                    variant="ghost" 
                    onClick={() => navigate(-1)}
                    className="mb-6"
                >
                    <ArrowLeft className="w-4 h-4 ml-2" />
                    חזרה
                </Button>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">צור קשר</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        יש לך שאלה? רוצה לשמוע עוד על השירותים שלנו? אנחנו כאן בשבילך!
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                                        <MessageCircle className="w-5 h-5 text-sky-600" />
                                    </div>
                                    בואו נתחיל לדבר
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-slate-400" />
                                    <div>
                                        <p className="font-medium">דואר אלקטרוני</p>
                                        <a href="mailto:info@arena-ai.org" className="text-sky-600 hover:text-sky-700">
                                            info@arena-ai.org
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-slate-400" />
                                    <div>
                                        <p className="font-medium">טלפון</p>
                                        <a href="tel:031234567" className="text-sky-600 hover:text-sky-700">
                                            03-1234567
                                        </a>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-slate-400" />
                                    <div>
                                        <p className="font-medium">כתובת</p>
                                        <p className="text-slate-600">תל אביב, ישראל</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="text-center">
                                    <img
                                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/826138143_a1d576606_a-icon-shadow1.png"
                                        alt="Arena AI"
                                        className="w-16 h-16 mx-auto mb-4"
                                    />
                                    <h3 className="font-bold text-lg mb-2">Arena AI</h3>
                                    <p className="text-slate-600 text-sm">
                                        יועצת הנדל"ן החכמה שלך - מוצאת את הבית המושלם עבורך
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>שלח הודעה</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                שם מלא *
                                            </label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                placeholder="הזן את שמך המלא"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                דואר אלקטרוני *
                                            </label>
                                            <Input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                טלפון
                                            </label>
                                            <Input
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                placeholder="050-1234567"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                נושא *
                                            </label>
                                            <Input
                                                value={formData.subject}
                                                onChange={(e) => handleInputChange('subject', e.target.value)}
                                                placeholder="במה אוכל לעזור?"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            הודעה *
                                        </label>
                                        <Textarea
                                            value={formData.message}
                                            onChange={(e) => handleInputChange('message', e.target.value)}
                                            placeholder="כתוב כאן את ההודעה שלך..."
                                            rows={6}
                                            required
                                        />
                                    </div>

                                    <Button 
                                        type="submit" 
                                        disabled={isSending}
                                        className="w-full sm:w-auto px-8 py-3"
                                    >
                                        {isSending ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                                                שולח הודעה...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 ml-2" />
                                                שלח הודעה
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* FAQ Section */}
                        <Card className="mt-8">
                            <CardHeader>
                                <CardTitle>שאלות נפוצות</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-slate-900 mb-1">איך Arena עוזרת לי למצוא דירה?</h4>
                                        <p className="text-sm text-slate-600">
                                            Arena משתמשת בבינה מלאכותית כדי להבין את הצרכים שלך ולהמליץ על נכסים מתאימים בהתאם להעדפות שלך.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900 mb-1">השירות חינמי?</h4>
                                        <p className="text-sm text-slate-600">
                                            כן, השימוש במערכת Arena הוא חינמי לחלוטין עבור חיפוש נכסים והמלצות.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900 mb-1">איך אני יכול לקבל עזרה נוספת?</h4>
                                        <p className="text-sm text-slate-600">
                                            אתה יכול ליצור איתנו קשר דרך הטופס למעלה או לשלוח מייל ל-info@arena-ai.org
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
