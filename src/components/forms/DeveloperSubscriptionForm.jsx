import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { User as UserEntity } from '@/entities/User';
import { DeveloperSubscription } from '@/entities/DeveloperSubscription';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

// New pricing model
const MONTHLY_FEE = 6000; // דמי מנוי פרויקט לחודש: 6,000 ₪
const COMMISSION_RATE = 0.004; // 0.4% עמלת מכירות

export default function DeveloperSubscriptionForm() {
    const [user, setUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showArenaClubDetails, setShowArenaClubDetails] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        // Basic company info
        advertiserName: '',
        companyNumber: '',
        signatoryName: '',
        signatoryId: '',
        contactPerson: '',
        contactPersonEmail: '',
        contactPersonPhone: '',
        financialManager: '',
        financialManagerEmail: '',
        financialManagerPhone: '',
        
        // Additional signatories
        additionalSignatories: [],
        
        // Subscription details
        subscriptionPeriod: '3',
        projectCount: 1,
        paymentMethod: 'quarterly', // quarterly, semi-annual, annual
        
        // Optional services
        arena_benefits_program: false,
        vip_exclusive: false,
        
        // Agreement
        agreementDate: new Date().toISOString().split('T')[0],
        isSigned: false,
        acceptTerms: false,
        acceptPrivacyPolicy: false,
    });

    const [calculatedPrices, setCalculatedPrices] = useState({
        monthlyFee: 0,
        totalPrice: 0,
        downPayment: 0,
        discountPercentage: 0,
        discountAmount: 0
    });

    useEffect(() => {
        const loadUser = async () => {
            try {
                const currentUser = await UserEntity.me();
                setUser(currentUser);
                setFormData(prev => ({
                    ...prev,
                    signatoryName: currentUser.full_name || '',
                    contactPerson: currentUser.full_name || '',
                    contactPersonEmail: currentUser.email || '',
                }));
            } catch (e) {
                toast.warning("יש להתחבר כדי למלא את הטופס");
            }
        };
        loadUser();
    }, []);

    useEffect(() => {
        const calculatePrice = () => {
            const projects = parseInt(formData.projectCount) || 1;
            const months = parseInt(formData.subscriptionPeriod) || 3;
            
            let baseMonthlyFee = MONTHLY_FEE * projects;
            let discountPercentage = 0;
            
            // Volume discounts
            if (projects >= 10) {
                discountPercentage += 20; // Premium
            } else if (projects >= 4) {
                discountPercentage += 10; // Gold
            }
            
            // Payment term discounts
            if (formData.paymentMethod === 'annual') {
                discountPercentage += 10;
            } else if (formData.paymentMethod === 'semi-annual') {
                discountPercentage += 5;
            }
            
            const discountAmount = (baseMonthlyFee * months * discountPercentage) / 100;
            const totalPrice = (baseMonthlyFee * months) - discountAmount;
            const downPayment = totalPrice; // Payment in advance
            
            setCalculatedPrices({
                monthlyFee: baseMonthlyFee,
                totalPrice,
                downPayment,
                discountPercentage,
                discountAmount
            });
        };
        calculatePrice();
    }, [formData.projectCount, formData.subscriptionPeriod, formData.paymentMethod]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addSignatory = () => {
        if (formData.additionalSignatories.length < 2) {
            setFormData(prev => ({
                ...prev,
                additionalSignatories: [...prev.additionalSignatories, { name: '', id: '' }]
            }));
        }
    };

    const updateSignatory = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            additionalSignatories: prev.additionalSignatories.map((sig, i) => 
                i === index ? { ...sig, [field]: value } : sig
            )
        }));
    };

    const removeSignatory = (index) => {
        setFormData(prev => ({
            ...prev,
            additionalSignatories: prev.additionalSignatories.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.isSigned) {
            toast.error("יש לסמן אישור וחתימה על ההסכם.");
            return;
        }
        if (!formData.acceptTerms) {
            toast.error("יש לאשר את תנאי השירות.");
            return;
        }
        if (!formData.acceptPrivacyPolicy) {
            toast.error("יש לאשר את תקנון האתר ומדיניות הפרטיות.");
            return;
        }
        if (!user) {
            toast.error("חובה להיות משתמש מחובר כדי לשלוח את הטופס.");
            return;
        }

        setIsSubmitting(true);
        try {
            await DeveloperSubscription.create({
                ...formData,
                userId: user.id,
                monthlyFee: calculatedPrices.monthlyFee,
                totalPrice: calculatedPrices.totalPrice,
                downPayment: calculatedPrices.downPayment,
                discountPercentage: calculatedPrices.discountPercentage,
                commissionRate: COMMISSION_RATE
            });
            toast.success("ההסכם נשלח בהצלחה! ניצור איתך קשר בקרוב.");
            navigate(createPageUrl('DeveloperThankYou'));
        } catch (error) {
            console.error("Failed to submit subscription:", error);
            toast.error("שגיאה בשליחת הטופס. נסה שוב.");
        }
        setIsSubmitting(false);
    };

    const handleDigitalSignatureClick = () => {
        setFormData(prev => ({ ...prev, isSigned: !prev.isSigned }));
    };

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-2xl">
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-sky-700">טופס הצטרפות והסכם שירותים</CardTitle>
                    <CardDescription>מלא את הפרטים כדי להצטרף ל-ARENA Ai ולהתחיל למכור יותר</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* פרטי המפרסם */}
                    <div className="p-6 border rounded-lg">
                        <h3 className="font-semibold text-lg mb-4">פרטי המפרסם</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <Label htmlFor="advertiserName">שם המציג/המפרסם *</Label>
                                <Input id="advertiserName" name="advertiserName" value={formData.advertiserName} onChange={handleChange} required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="companyNumber">מ.ח. / ח.פ. *</Label>
                                <Input id="companyNumber" name="companyNumber" value={formData.companyNumber} onChange={handleChange} required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="signatoryName">שם מורשה חתימה *</Label>
                                <Input id="signatoryName" name="signatoryName" value={formData.signatoryName} onChange={handleChange} required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="signatoryId">ת.ז. מורשה חתימה *</Label>
                                <Input id="signatoryId" name="signatoryId" value={formData.signatoryId} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Additional Signatories */}
                        {formData.additionalSignatories.map((sig, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 p-4 bg-slate-50 rounded">
                                <div className="space-y-1">
                                    <Label>מורשה חתימה נוסף #{index + 2} - שם</Label>
                                    <Input value={sig.name} onChange={(e) => updateSignatory(index, 'name', e.target.value)} />
                                </div>
                                <div className="space-y-1 flex items-end">
                                    <div className="flex-1">
                                        <Label>ת.ז.</Label>
                                        <Input value={sig.id} onChange={(e) => updateSignatory(index, 'id', e.target.value)} />
                                    </div>
                                    <Button type="button" variant="destructive" size="sm" onClick={() => removeSignatory(index)}>
                                        הסר
                                    </Button>
                                </div>
                            </div>
                        ))}
                        
                        {formData.additionalSignatories.length < 2 && (
                            <Button type="button" variant="outline" onClick={addSignatory} className="mt-4">
                                הוסף מורשה חתימה נוסף
                            </Button>
                        )}

                        {/* Contact Person */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            <div className="space-y-1">
                                <Label htmlFor="contactPerson">איש קשר *</Label>
                                <Input id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="contactPersonEmail">מייל איש קשר *</Label>
                                <Input id="contactPersonEmail" name="contactPersonEmail" type="email" value={formData.contactPersonEmail} onChange={handleChange} required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="contactPersonPhone">טלפון נייד איש קשר *</Label>
                                <Input id="contactPersonPhone" name="contactPersonPhone" type="tel" value={formData.contactPersonPhone} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Financial Manager */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            <div className="space-y-1">
                                <Label htmlFor="financialManager">מנהל כספים *</Label>
                                <Input id="financialManager" name="financialManager" value={formData.financialManager} onChange={handleChange} required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="financialManagerEmail">מייל מנהל כספים *</Label>
                                <Input id="financialManagerEmail" name="financialManagerEmail" type="email" value={formData.financialManagerEmail} onChange={handleChange} required />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="financialManagerPhone">טלפון נייד מנהל כספים *</Label>
                                <Input id="financialManagerPhone" name="financialManagerPhone" type="tel" value={formData.financialManagerPhone} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="mt-4">
                            <Input type="date" name="agreementDate" value={formData.agreementDate} onChange={handleChange} className="w-auto" disabled />
                        </div>
                    </div>

                    {/* מחשבון עלויות ותקופת מנוי */}
                    <div className="p-6 border rounded-lg bg-slate-50">
                        <h3 className="font-semibold text-lg mb-4">מחשבון עלויות ותקופת מנוי</h3>
                        
                        <div className="bg-blue-50 p-4 rounded-lg mb-6">
                            <h4 className="font-bold text-blue-800 mb-2">עלויות</h4>
                            <p className="text-blue-700 text-sm">דמי מנוי פרויקט לחודש: 6,000 ₪ + 0.4% עמלת מכירות</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            <div className="space-y-1">
                                <Label htmlFor="subscriptionPeriod">תקופת מנוי</Label>
                                <Select name="subscriptionPeriod" value={formData.subscriptionPeriod} onValueChange={(val) => handleSelectChange('subscriptionPeriod', val)}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="3">3 חודשים (מינימום)</SelectItem>
                                        <SelectItem value="6">6 חודשים</SelectItem>
                                        <SelectItem value="9">9 חודשים</SelectItem>
                                        <SelectItem value="12">12 חודשים</SelectItem>
                                        <SelectItem value="24">24 חודשים</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="projectCount">מספר פרויקטים</Label>
                                <Input id="projectCount" name="projectCount" type="number" min="1" value={formData.projectCount} onChange={handleChange} />
                                <div className="text-xs text-slate-600 mt-1">
                                    <p>1-3 פרויקטים: מנוי רגיל</p>
                                    <p>4-9 פרויקטים: מנוי זהב (10% הנחה)</p>
                                    <p>10+ פרויקטים: מנוי פרימיום (20% הנחה)</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="mt-6">
                            <Label>תשלום מראש עבור:</Label>
                            <div className="flex gap-4 mt-2">
                                <Button 
                                    type="button" 
                                    variant={formData.paymentMethod === 'quarterly' ? 'default' : 'outline'}
                                    onClick={() => handleSelectChange('paymentMethod', 'quarterly')}
                                >
                                    3 חודשים
                                </Button>
                                <Button 
                                    type="button" 
                                    variant={formData.paymentMethod === 'semi-annual' ? 'default' : 'outline'}
                                    onClick={() => handleSelectChange('paymentMethod', 'semi-annual')}
                                >
                                    6 חודשים (5% הנחה)
                                </Button>
                                <Button 
                                    type="button" 
                                    variant={formData.paymentMethod === 'annual' ? 'default' : 'outline'}
                                    onClick={() => handleSelectChange('paymentMethod', 'annual')}
                                >
                                    שנה (10% הנחה)
                                </Button>
                            </div>
                        </div>

                        {/* Bank Details */}
                        <div className="mt-6 p-4 bg-white rounded border">
                            <h4 className="font-semibold mb-2">פרטי הבנק להעברה:</h4>
                            <p className="text-sm">ארנה אי איי – זירת הנדל"ן של ישראל</p>
                            <p className="text-sm">בנק הבינלאומי, סניף 51, מספר חשבון: 383665</p>
                        </div>

                        {/* Price Calculation */}
                        <Separator className="my-6" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                            <div className="p-4 bg-white rounded-md">
                                <p className="text-sm text-slate-500">עלות חודשית</p>
                                <p className="text-2xl font-bold text-slate-800">₪{calculatedPrices.monthlyFee.toLocaleString()}</p>
                            </div>
                            <div className="p-4 bg-white rounded-md">
                                <p className="text-sm text-slate-500">סה"כ לתשלום</p>
                                <p className="text-2xl font-bold text-sky-600">₪{calculatedPrices.totalPrice.toLocaleString()}</p>
                                {calculatedPrices.discountPercentage > 0 && (
                                    <p className="text-xs text-green-600">חסכת {calculatedPrices.discountPercentage}%!</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Arena Club Checkbox */}
                    <div className="p-6 border rounded-lg">
                        <div className="flex items-start space-x-2 space-x-reverse mb-4">
                            <Checkbox 
                                id="arena_benefits_program" 
                                checked={formData.arena_benefits_program} 
                                onCheckedChange={(checked) => {
                                    setFormData(prev => ({ ...prev, arena_benefits_program: checked }));
                                    setShowArenaClubDetails(checked);
                                }}
                            />
                            <Label htmlFor="arena_benefits_program" className="text-base cursor-pointer">
                                מאשר הצטרפות לתכנית הטבות לקוחות ARENA Ai
                            </Label>
                        </div>
                        
                        {showArenaClubDetails && (
                            <div className="text-xs text-slate-600 leading-relaxed space-y-2 pr-6">
                                <p>הצטרפות היזם ל־ARENA CLUB מקנה ליזם אפשרות להשתתף במתן הטבות לרוכשים.</p>
                                <p>במקרים בהם לנכס של היזם ניתן ציון התאמה זהה לנכס אחר – תינתן עדיפות להצגת נכסיו של היזם החבר ב־ARENA CLUB.</p>
                                <p>ההצטרפות למועדון מהווה אישור מוקדם מצד היזם להציע לרוכשים פוטנציאליים את ההטבות הנלוות, בכפוף לסגירת עסקה בפועל עם אותו רוכש.</p>
                                <p><strong>היקף ההטבות המאושר כברירת מחדל יהיה כמפורט להלן:</strong></p>
                                <ul className="list-disc pr-6 space-y-1">
                                    <li>בגין נכס שמחירו עד 4,500,000 ₪ – שווי ההטבות לא יעלה על 20,000 ₪.</li>
                                    <li>בגין נכס שמחירו מעל 4,500,000 ₪ – שווי ההטבות לא יעלה על 40,000 ₪.</li>
                                </ul>
                                <p>היזם רשאי לאשר מראש ל־ARENA תקרה גבוהה יותר, לרבות עד שיעור של 1% ממחיר הדירה, וזאת בהודעה כתובה ומראש ל־ARENA במקרה כזה, ARENA תהיה רשאית להציע הטבות לרוכשים עד גובה התקרה המאושרת, ללא צורך בקבלת אישור פרטני בכל מקרה ומקרה.</p>
                            </div>
                        )}
                    </div>

                    {/* VIP Checkbox */}
                    <div className="p-6 border rounded-lg">
                        <div className="flex items-center space-x-2 space-x-reverse">
                            <Checkbox 
                                id="vip_exclusive" 
                                checked={formData.vip_exclusive} 
                                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, vip_exclusive: checked }))} 
                            />
                            <Label htmlFor="vip_exclusive" className="text-base cursor-pointer">
                                מנוי VIP
                            </Label>
                        </div>
                        <p className="text-xs text-slate-600 mt-2 pr-6">
                            כולל חבילת EXCLUSIVE VIP - תוספת דמי הצלחה עבור טיפול היברידי מול לקוחות חו"ל – 0.6%. טיפול המשך על ידי צוות אנשי מכירות מנוסים (דוברי שפות זרות)
                        </p>
                    </div>

                    {/* חתימה ואישור הסכם */}
                    <div className="p-6 border rounded-lg">
                        <h3 className="font-semibold text-lg mb-4">חתימה ואישור הסכם</h3>
                        <p className="text-sm text-slate-600 mb-4">
                            אני החתום מטה, מורשה החתימה של המפרסם, מאשר את כל הפרטים בטופס זה, את תנאי השירות, תקנון האתר ומדיניות הפרטיות של ARENA Ai. חתימתי מהווה הסכמה לתנאי ההתקשרות כפי שחושבו.
                        </p>
                        
                        <div className="bg-slate-50 border-dashed border-2 rounded-lg p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="w-full">
                                <Label>שם מורשה החתימה (כפי שמופיע למעלה)</Label>
                                <p className="font-bold text-lg p-2 bg-white rounded-md h-10">{formData.signatoryName || 'נא למלא שדה מורשה חתימה'}</p>
                            </div>
                            <div className="w-full">
                                <Label>חתימה דיגיטלית</Label>
                                <div 
                                    onClick={handleDigitalSignatureClick}
                                    className={`font-signature text-4xl p-2 bg-white rounded-md h-16 flex items-center justify-center text-slate-700 cursor-pointer border-2 transition-colors ${
                                        formData.isSigned ? 'border-green-500 bg-green-50' : 'border-dashed border-slate-300 hover:border-slate-400'
                                    }`}
                                >
                                    {formData.isSigned ? formData.signatoryName : 'לחץ כאן לחתימה דיגיטלית'}
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <Checkbox 
                                    id="acceptTerms" 
                                    checked={formData.acceptTerms} 
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, acceptTerms: checked }))} 
                                />
                                <Label htmlFor="acceptTerms" className="text-base cursor-pointer">
                                    אני מאשר/ת את <a href={createPageUrl('TermsOfServiceDevelopers')} target="_blank" className="text-blue-600 hover:underline">תנאי השירות ליזמים</a>
                                </Label>
                            </div>
                            
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <Checkbox 
                                    id="acceptPrivacyPolicy" 
                                    checked={formData.acceptPrivacyPolicy} 
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, acceptPrivacyPolicy: checked }))} 
                                />
                                <Label htmlFor="acceptPrivacyPolicy" className="text-base cursor-pointer">
                                    אני מאשר/ת את <a href={createPageUrl('PrivacyPolicy')} target="_blank" className="text-blue-600 hover:underline">תקנון האתר ומדיניות הפרטיות</a>
                                </Label>
                            </div>
                            
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <Checkbox 
                                    id="isSigned" 
                                    checked={formData.isSigned} 
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isSigned: checked }))} 
                                />
                                <Label htmlFor="isSigned" className="text-base font-bold cursor-pointer">
                                    אני מאשר/ת את הפרטים וחותם/ת דיגיטלית על ההסכם.
                                </Label>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || !formData.isSigned || !formData.acceptTerms || !formData.acceptPrivacyPolicy}>
                        {isSubmitting ? 'שולח...' : 'שלח וצור הסכם שירות'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}