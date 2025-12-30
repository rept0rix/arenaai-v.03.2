import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, User as UserIcon, Mail, Calendar, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import TopNavigation from '../components/TopNavigation';
import { toast } from "sonner";

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        preferred_budget_min: '',
        preferred_budget_max: '',
        preferred_areas: '',
        family_status: '',
        notes: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthAndLoadProfile();
    }, []);

    const checkAuthAndLoadProfile = async () => {
        try {
            const currentUser = await User.me();
            setUser(currentUser);
            setFormData({
                full_name: currentUser.full_name || '',
                phone: currentUser.phone || '',
                preferred_budget_min: currentUser.preferred_budget_min || '',
                preferred_budget_max: currentUser.preferred_budget_max || '',
                preferred_areas: currentUser.preferred_areas || '',
                family_status: currentUser.family_status || '',
                notes: currentUser.notes || ''
            });
        } catch (error) {
            navigate(createPageUrl('Landing'));
        }
        setIsLoading(false);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await User.updateMyUserData(formData);
            toast.success('הפרטים נשמרו בהצלחה');
        } catch (error) {
            toast.error('שגיאה בשמירת הפרטים');
        }
        setIsSaving(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
                    <p className="text-slate-600">טוען פרטי משתמש...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <TopNavigation currentPage="UserProfile" />
            
            <div className="max-w-4xl mx-auto p-4 sm:p-8">
                {/* Header */}
                <div className="mb-8">
                    <Button 
                        variant="ghost" 
                        onClick={() => navigate(-1)}
                        className="mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 ml-2" />
                        חזרה
                    </Button>
                    
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                        פרופיל משתמש
                    </h1>
                    <p className="text-slate-600">
                        נהל את הפרטים האישיים וההעדפות שלך
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Profile Overview */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader className="text-center">
                                <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <UserIcon className="w-10 h-10 text-sky-600" />
                                </div>
                                <CardTitle>{user?.full_name || 'משתמש'}</CardTitle>
                                <p className="text-slate-500 flex items-center justify-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    {user?.email}
                                </p>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        <span className="text-sm text-slate-600">
                                            הצטרף ב-{new Date(user?.created_date).toLocaleDateString('he-IL')}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-4 h-4 text-slate-400" />
                                        <span className="text-sm text-slate-600">
                                            סטטוס: {user?.role === 'admin' ? 'מנהל' : 'משתמש'}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Profile Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>פרטים אישיים</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">מידע בסיסי</h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="full_name">שם מלא</Label>
                                            <Input
                                                id="full_name"
                                                value={formData.full_name}
                                                onChange={(e) => handleInputChange('full_name', e.target.value)}
                                                placeholder="הזן שם מלא"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="phone">טלפון</Label>
                                            <Input
                                                id="phone"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                placeholder="050-1234567"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Preferences */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">העדפות נדל"ן</h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="budget_min">תקציב מינימום</Label>
                                            <Input
                                                id="budget_min"
                                                type="number"
                                                value={formData.preferred_budget_min}
                                                onChange={(e) => handleInputChange('preferred_budget_min', e.target.value)}
                                                placeholder="1000000"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="budget_max">תקציב מקסימום</Label>
                                            <Input
                                                id="budget_max"
                                                type="number"
                                                value={formData.preferred_budget_max}
                                                onChange={(e) => handleInputChange('preferred_budget_max', e.target.value)}
                                                placeholder="5000000"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="areas">אזורים מועדפים</Label>
                                        <Input
                                            id="areas"
                                            value={formData.preferred_areas}
                                            onChange={(e) => handleInputChange('preferred_areas', e.target.value)}
                                            placeholder="תל אביב, רמת גן, הרצליה"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="family_status">מצב משפחתי</Label>
                                        <Input
                                            id="family_status"
                                            value={formData.family_status}
                                            onChange={(e) => handleInputChange('family_status', e.target.value)}
                                            placeholder="רווק/נשוי/עם ילדים"
                                        />
                                    </div>
                                </div>

                                <Separator />

                                {/* Additional Notes */}
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="notes">הערות נוספות</Label>
                                        <textarea
                                            id="notes"
                                            className="w-full p-3 border border-slate-200 rounded-md resize-none h-20"
                                            value={formData.notes}
                                            onChange={(e) => handleInputChange('notes', e.target.value)}
                                            placeholder="כל מידע נוסף שחשוב לך..."
                                        />
                                    </div>
                                </div>

                                <Button 
                                    onClick={handleSave} 
                                    disabled={isSaving}
                                    className="w-full sm:w-auto"
                                >
                                    {isSaving ? 'שומר...' : 'שמור שינויים'}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}