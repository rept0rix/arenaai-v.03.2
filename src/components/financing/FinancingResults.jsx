
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, TrendingUp, Calculator, Phone, AlertTriangle, Calendar, User, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { User as UserEntity } from '@/entities/User';
import { SearchHistory } from '@/entities/SearchHistory';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function FinancingResults({ data, onBackToChat, onStartOver }) {
    const [showSchedulingDialog, setShowSchedulingDialog] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        day: '',
        time: '',
        agreed_to_terms: false,
        agreed_to_privacy: false
    });
    const [user, setUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedAdvisors, setSelectedAdvisors] = useState([]);
    const navigate = useNavigate();

    const advisors = [
        { id: 'hapoalim', name: 'בנק הפועלים', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/45ac49117_leumi.png' },
        { id: 'leumi', name: 'בנק לאומי', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/d32f7a086_hapoalim.png' },
        { id: 'private', name: 'יועץ פרטי', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/134407b46_private-advisor-icon.png' },
    ];

    React.useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const currentUser = await UserEntity.me();
            setUser(currentUser);
            setFormData(prev => ({
                ...prev,
                name: currentUser.full_name || '',
                email: currentUser.email || ''
            }));
        } catch (error) {
            setUser(null);
        }
    };

    // Calculate mortgage details
    const propertyPrice = parseInt(data.propertyPrice) || 0;
    const availableFunds = parseInt(data.availableFunds) || 0;
    const netIncome = parseInt(data.netIncome) || 0;
    
    // Basic calculations
    const loanAmount = propertyPrice - availableFunds;
    const monthlyPayment = Math.min(netIncome * 0.35, loanAmount / 250);
    const loanPercentage = Math.min(75, (loanAmount / propertyPrice) * 100);
    
    // Determine property type benefits
    const isFirstProperty = data.propertyType === 'first';
    const taxBenefit = isFirstProperty ? 'פטור ממס רכישה עד 1.8 מיליון ₪' : 'מס רכישה רגיל';

    const handleAdvisorSelection = (advisorId) => {
        setSelectedAdvisors(prev =>
            prev.includes(advisorId)
                ? prev.filter(id => id !== advisorId)
                : [...prev, advisorId]
        );
    };

    const handleSelectAll = () => {
        if (selectedAdvisors.length === advisors.length) {
            setSelectedAdvisors([]);
        } else {
            setSelectedAdvisors(advisors.map(a => a.id));
        }
    };

    // Generate weekdays for scheduling
    const getWeekDays = () => {
        const days = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            days.push({
                value: date.toISOString().split('T')[0],
                label: date.toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'numeric' })
            });
        }
        return days;
    };

    const timeSlots = [
        { value: '09:00', label: '09:00' },
        { value: '10:00', label: '10:00' },
        { value: '11:00', label: '11:00' },
        { value: '12:00', label: '12:00' },
        { value: '13:00', label: '13:00' },
        { value: '14:00', label: '14:00' },
        { value: '15:00', label: '15:00' },
        { value: '16:00', label: '16:00' },
        { value: '17:00', label: '17:00' },
        { value: '18:00', label: '18:00' }
    ];

    const handleScheduleMeeting = async () => {
        if (!formData.name || !formData.phone || !formData.email || !formData.day || !formData.time) {
            toast.error("יש למלא את כל השדות הנדרשים");
            return;
        }
        
        if (!formData.agreed_to_terms || !formData.agreed_to_privacy) {
            toast.error("יש לאשר את התקנון ומדיניות הפרטיות");
            return;
        }

        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const selectedAdvisorNames = advisors.filter(a => selectedAdvisors.includes(a.id)).map(a => a.name).join(', ');
        
        try {
            await SearchHistory.create({
                type: 'financing_consultation',
                consultation_details: {
                    ...formData,
                    selectedAdvisors: selectedAdvisorNames,
                    initialFinancingData: data
                }
            });
            toast.info("בקשת הייעוץ נשמרה בהיסטוריה שלך.");
        } catch (error) {
            console.error("Failed to save consultation to history", error);
            toast.error("שגיאה בשמירת הבקשה בהיסטוריה.");
        }

        setShowSchedulingDialog(false);
        setIsSubmitting(false);

        const params = new URLSearchParams();
        params.append('date', formData.day);
        params.append('time', formData.time);
        params.append('advisors', selectedAdvisorNames);

        navigate(`${createPageUrl('FinancingConfirmation')}?${params.toString()}`);
    };

    return (
        <div className="space-y-8">
            {/* Success Header */}
            <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    מצוין! קיבלת הערכה ראשונית למשכנתא
                </h2>
                <p className="text-lg text-slate-600">
                    על פי הנתונים שמסרת, אלו האפשרויות המשוערות שלך:
                </p>
            </div>

            {/* Results Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Loan Details */}
                <Card className="border-l-4 border-l-green-500">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Calculator className="w-6 h-6 text-green-600" />
                            הערכה ראשונית למשכנתא
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-slate-600">סכום הלוואה משוער</p>
                                <p className="text-xl font-bold text-slate-900">
                                    {loanAmount.toLocaleString()} ₪
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-600">החזר חודשי משוער</p>
                                <p className="text-xl font-bold text-slate-900">
                                    {monthlyPayment.toLocaleString()} ₪
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-600">אחוז מימון משוער</p>
                                <p className="text-xl font-bold text-slate-900">
                                    {loanPercentage.toFixed(1)}%
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-600">תקופת פירעון</p>
                                <p className="text-xl font-bold text-slate-900">
                                    {data.loanPeriod || '25'} שנים
                                </p>
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t">
                            <Badge className="bg-blue-100 text-blue-800">
                                {taxBenefit}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Next Steps */}
                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                            השלבים הבאים
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 mt-1">1</div>
                            <div>
                                <p className="font-medium">שיחה עם יועץ משכנתאות</p>
                                <p className="text-sm text-slate-600">לזיקוק הנתונים ובדיקת זכאות מדויקת</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 mt-1">2</div>
                            <div>
                                <p className="font-medium">הכנת מסמכים</p>
                                <p className="text-sm text-slate-600">תלושי שכר, אישור הכנסות, דוחות</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 mt-1">3</div>
                            <div>
                                <p className="font-medium">הגשה לבנקים</p>
                                <p className="text-sm text-slate-600">קבלת הצעות מחיר מתחרות</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-sky-50 to-blue-50 border-sky-200">
                <CardContent className="p-8 text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">מעוניין להמשיך?</h3>
                    <p className="text-slate-600 mb-6">
                        בחר עם אילו גורמים תרצה לתאם שיחת ייעוץ חינם, ותוכל לקבוע מועד שנוח לך.
                    </p>
                    
                    <div className="max-w-xl mx-auto space-y-4 mb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {advisors.map((advisor) => (
                                <label
                                    key={advisor.id}
                                    htmlFor={advisor.id}
                                    className={`p-4 border rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 relative ${
                                        selectedAdvisors.includes(advisor.id)
                                            ? 'bg-white border-sky-500 ring-2 ring-sky-500 shadow-lg'
                                            : 'bg-white/70 border-slate-200 hover:border-sky-300'
                                    }`}
                                >
                                    <Checkbox
                                        id={advisor.id}
                                        checked={selectedAdvisors.includes(advisor.id)}
                                        onCheckedChange={() => handleAdvisorSelection(advisor.id)}
                                        className="absolute top-2 right-2"
                                    />
                                    <img src={advisor.logo} alt={advisor.name} className="h-10 mb-2"/>
                                    <span className="font-semibold text-slate-800">{advisor.name}</span>
                                </label>
                            ))}
                        </div>
                        <Button variant="link" onClick={handleSelectAll} className="text-sky-600">
                            {selectedAdvisors.length === advisors.length ? 'נקה בחירה' : 'בחר הכל'}
                        </Button>
                    </div>

                    <p className="text-xs text-slate-500 mb-6">
                        בבחירת "יועץ פרטי", פרטיך עשויים לעבור לעד 2 יועצים חיצוניים.
                    </p>

                    <Button
                        onClick={() => setShowSchedulingDialog(true)}
                        size="lg"
                        disabled={selectedAdvisors.length === 0}
                        className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Calendar className="w-5 h-5 ml-2" />
                        קבע שיחת ייעוץ עם הגורמים שבחרתי
                    </Button>
                </CardContent>
            </Card>

            {/* Legal Disclaimer */}
            <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-amber-800 mb-3">חשוב לדעת</h4>
                            <div className="text-sm text-amber-700 space-y-2 leading-relaxed">
                                <p>
                                    זוהי הערכה ראשונית בלבד, המבוססת על המידע שמסרת. האישור הסופי למשכנתא כפוף לבדיקת הבנק ולעמידה בקריטריונים הנדרשים.
                                </p>
                                <p>
                                    המידע אינו מהווה ייעוץ פיננסי או התחייבות מצד Arena או הבנקים. מומלץ להיוועץ ביועץ משכנתאות מוסמך.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                    onClick={onBackToChat}
                    size="lg"
                    variant="outline"
                    className="px-8"
                >
                    בואו נמצא דירות בטווח המחירים
                </Button>
                <Button
                    variant="ghost"
                    onClick={onStartOver}
                    size="lg"
                    className="px-8"
                >
                    התחל מחדש
                </Button>
            </div>

            {/* Scheduling Dialog */}
            <Dialog open={showSchedulingDialog} onOpenChange={setShowSchedulingDialog}>
                <DialogContent className="max-w-md" dir="rtl">
                    <DialogHeader>
                        <DialogTitle className="text-center text-xl">
                            קביעת שיחת ייעוץ חינם
                        </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                        <div>
                            <Label htmlFor="name">שם מלא *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                                placeholder="הזן שם מלא"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="phone">טלפון *</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                                placeholder="050-1234567"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="email">דוא"ל *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                                placeholder="example@email.com"
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <Label>יום *</Label>
                                <Select value={formData.day} onValueChange={(value) => setFormData(prev => ({...prev, day: value}))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="בחר יום" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getWeekDays().map(day => (
                                            <SelectItem key={day.value} value={day.value}>
                                                {day.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div>
                                <Label>שעה *</Label>
                                <Select value={formData.time} onValueChange={(value) => setFormData(prev => ({...prev, time: value}))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="בחר שעה" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timeSlots.map(time => (
                                            <SelectItem key={time.value} value={time.value}>
                                                {time.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex items-start space-x-2 space-x-reverse">
                                <Checkbox 
                                    id="terms"
                                    checked={formData.agreed_to_terms}
                                    onCheckedChange={(checked) => setFormData(prev => ({...prev, agreed_to_terms: checked}))}
                                />
                                <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                                    אני מסכים ל
                                    <a 
                                        href={createPageUrl('TermsOfService')} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-sky-600 hover:underline mx-1"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        תקנון השימוש
                                    </a>
                                    ול
                                    <a 
                                        href={createPageUrl('PrivacyPolicy')} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-sky-600 hover:underline mx-1"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        מדיניות הפרטיות
                                    </a>
                                    *
                                </Label>
                            </div>
                            
                            <div className="flex items-start space-x-2 space-x-reverse">
                                <Checkbox 
                                    id="privacy"
                                    checked={formData.agreed_to_privacy}
                                    onCheckedChange={(checked) => setFormData(prev => ({...prev, agreed_to_privacy: checked}))}
                                />
                                <Label htmlFor="privacy" className="text-sm leading-relaxed cursor-pointer">
                                    אני מסכים לקבל פניות מיועץ המשכנתאות *
                                </Label>
                            </div>
                        </div>
                        
                        <Button 
                            onClick={handleScheduleMeeting}
                            disabled={isSubmitting}
                            className="w-full bg-sky-600 hover:bg-sky-700"
                        >
                            {isSubmitting ? 'מתזמן...' : 'קבע שיחה'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
