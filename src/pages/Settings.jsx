import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Settings as SettingsIcon, Bell, Eye, Mail, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import TopNavigation from '../components/TopNavigation';
import { toast } from "sonner";

export default function Settings() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [settings, setSettings] = useState({
        email_notifications: true,
        sms_notifications: false,
        new_property_alerts: true,
        price_change_alerts: false,
        weekly_digest: true,
        dark_mode: false,
        compact_view: false,
        show_prices: true,
        auto_save_searches: true,
        advanced_filters: false
    });
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthAndLoadSettings();
    }, []);

    const checkAuthAndLoadSettings = async () => {
        try {
            const currentUser = await User.me();
            setUser(currentUser);
            // Load settings from user data or use defaults
            if (currentUser.settings) {
                setSettings({ ...settings, ...currentUser.settings });
            }
        } catch (error) {
            navigate(createPageUrl('Landing'));
        }
        setIsLoading(false);
    };

    const handleSettingChange = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSaveSettings = async () => {
        setIsSaving(true);
        try {
            await User.updateMyUserData({ settings });
            toast.success('ההגדרות נשמרו בהצלחה');
        } catch (error) {
            toast.error('שגיאה בשמירת ההגדרות');
        }
        setIsSaving(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
                    <p className="text-slate-600">טוען הגדרות...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <TopNavigation currentPage="Settings" />
            
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
                    
                    <div className="flex items-center gap-3 mb-2">
                        <SettingsIcon className="w-8 h-8 text-sky-600" />
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                            הגדרות
                        </h1>
                    </div>
                    <p className="text-slate-600">
                        התאם את הגדרות המערכת לפי העדפותיך
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Notification Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <Bell className="w-5 h-5 text-sky-600" />
                                התראות
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    <div>
                                        <Label htmlFor="email-notifications" className="text-base">התראות אימייל</Label>
                                        <p className="text-sm text-slate-500">קבל עדכונים על נכסים חדשים ושינויי מחירים</p>
                                    </div>
                                </div>
                                <Switch
                                    id="email-notifications"
                                    checked={settings.email_notifications}
                                    onCheckedChange={(checked) => handleSettingChange('email_notifications', checked)}
                                />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Smartphone className="w-4 h-4 text-slate-400" />
                                    <div>
                                        <Label htmlFor="sms-notifications" className="text-base">התראות SMS</Label>
                                        <p className="text-sm text-slate-500">קבל הודעות טקסט על עדכונים חשובים</p>
                                    </div>
                                </div>
                                <Switch
                                    id="sms-notifications"
                                    checked={settings.sms_notifications}
                                    onCheckedChange={(checked) => handleSettingChange('sms_notifications', checked)}
                                />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="new-property-alerts" className="text-base">התראות על נכסים חדשים</Label>
                                    <p className="text-sm text-slate-500">קבל עדכון כשנכס מתאים להעדפות שלך נכנס למערכת</p>
                                </div>
                                <Switch
                                    id="new-property-alerts"
                                    checked={settings.new_property_alerts}
                                    onCheckedChange={(checked) => handleSettingChange('new_property_alerts', checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="price-change-alerts" className="text-base">התראות על שינויי מחירים</Label>
                                    <p className="text-sm text-slate-500">קבל עדכון כשמחיר נכס שעקבת אחריו משתנה</p>
                                </div>
                                <Switch
                                    id="price-change-alerts"
                                    checked={settings.price_change_alerts}
                                    onCheckedChange={(checked) => handleSettingChange('price_change_alerts', checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="weekly-digest" className="text-base">דוח שבועי</Label>
                                    <p className="text-sm text-slate-500">קבל סיכום שבועי של פעילות בשוק הנדל"ן</p>
                                </div>
                                <Switch
                                    id="weekly-digest"
                                    checked={settings.weekly_digest}
                                    onCheckedChange={(checked) => handleSettingChange('weekly_digest', checked)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Display Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <Eye className="w-5 h-5 text-sky-600" />
                                הגדרות תצוגה
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="compact-view" className="text-base">תצוגה קומפקטית</Label>
                                    <p className="text-sm text-slate-500">הצג יותר נכסים בעמוד אחד</p>
                                </div>
                                <Switch
                                    id="compact-view"
                                    checked={settings.compact_view}
                                    onCheckedChange={(checked) => handleSettingChange('compact_view', checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="show-prices" className="text-base">הצגת מחירים</Label>
                                    <p className="text-sm text-slate-500">הצג מחירי הנכסים בתוצאות החיפוש</p>
                                </div>
                                <Switch
                                    id="show-prices"
                                    checked={settings.show_prices}
                                    onCheckedChange={(checked) => handleSettingChange('show_prices', checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="advanced-filters" className="text-base">פילטרים מתקדמים</Label>
                                    <p className="text-sm text-slate-500">הצג אפשרויות סינון נוספות בחיפוש</p>
                                </div>
                                <Switch
                                    id="advanced-filters"
                                    checked={settings.advanced_filters}
                                    onCheckedChange={(checked) => handleSettingChange('advanced_filters', checked)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* System Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>הגדרות מערכת</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="auto-save-searches" className="text-base">שמירה אוטומטית של חיפושים</Label>
                                    <p className="text-sm text-slate-500">שמור את החיפושים שלך להיסטוריה באופן אוטומטי</p>
                                </div>
                                <Switch
                                    id="auto-save-searches"
                                    checked={settings.auto_save_searches}
                                    onCheckedChange={(checked) => handleSettingChange('auto_save_searches', checked)}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <Button 
                            onClick={handleSaveSettings} 
                            disabled={isSaving}
                            size="lg"
                            className="px-8"
                        >
                            {isSaving ? 'שומר...' : 'שמור הגדרות'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}