import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, UserPlus, DollarSign, Calendar, CheckCircle } from 'lucide-react';

export default function DeveloperNotifications() {
  // Mock data
  const notifications = [
    {
      id: 1,
      type: 'new_lead',
      title: 'ליד חדש התקבל',
      message: 'דני כהן התעניין בפרויקט דיזנגוף - מוכן לשיחה',
      time: 'לפני 5 דקות',
      read: false,
      icon: UserPlus,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 2,
      type: 'price_change',
      title: 'שינוי מחירון',
      message: 'המחיר בדירה #102 עודכן ללקוח שרה לוי',
      time: 'לפני שעה',
      read: false,
      icon: DollarSign,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 3,
      type: 'meeting',
      title: 'פגישה קרובה',
      message: 'פגישה עם משפחת כהן היום בשעה 14:00',
      time: 'לפני שעתיים',
      read: false,
      icon: Calendar,
      color: 'text-orange-600 bg-orange-100'
    },
    {
      id: 4,
      type: 'status_update',
      title: 'עדכון סטטוס ליד',
      message: 'יוסי מזרחי עבר לסטטוס "מתלבט"',
      time: 'אתמול',
      read: true,
      icon: CheckCircle,
      color: 'text-slate-600 bg-slate-100'
    },
    {
      id: 5,
      type: 'new_lead',
      title: 'ליד חדש התקבל',
      message: 'רחל אברהם התעניינה בפרויקט גבעתיים',
      time: 'אתמול',
      read: true,
      icon: UserPlus,
      color: 'text-slate-600 bg-slate-100'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">הודעות והתראות</h1>
        <p className="text-slate-600">כל העדכונים והפעילויות שלך</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-sky-600" />
              התראות אחרונות
            </CardTitle>
            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
              {notifications.filter(n => !n.read).length} חדשות
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                    notification.read
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-white border-sky-200 shadow-sm'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-semibold ${notification.read ? 'text-slate-700' : 'text-slate-900'}`}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <Badge className="bg-red-500 text-white text-xs">חדש</Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                    <p className="text-xs text-slate-400">{notification.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>הגדרות התראות</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-900">התראות WhatsApp</p>
                <p className="text-sm text-slate-500">קבל התראות על לידים חדשים ב-WhatsApp</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-900">התראות אימייל</p>
                <p className="text-sm text-slate-500">קבל סיכום יומי במייל</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-900">התראות SMS</p>
                <p className="text-sm text-slate-500">התראות דחופות בלבד</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}