import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Calendar, MapPin, ArrowUpRight, Gift } from 'lucide-react';

export default function DeveloperMainDashboard() {
  // Mock data
  const leadsStats = {
    hot: 12,
    considering: 8,
    cold: 5
  };

  const upcomingActions = [
    { type: 'פגישה', title: 'פגישה עם משפחת כהן', time: 'היום 14:00', urgent: true },
    { type: 'ליד חדש', title: 'ליד חדש ממתין לטיפול', time: 'לפני שעה', urgent: true },
    { type: 'תזכורת', title: 'עדכון מלאי פרויקט דיזנגוף', time: 'מחר 10:00', urgent: false },
  ];

  const activeProjects = [
    { name: 'פרויקט דיזנגוף', location: 'תל אביב', units: 24, sold: 18 },
    { name: 'פרויקט גבעתיים', location: 'גבעתיים', units: 16, sold: 8 },
    { name: 'פרויקט רמת השרון', location: 'רמת השרון', units: 32, sold: 25 },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">דשבורד ראשי</h1>
        <p className="text-slate-600">סקירה כללית של הפעילות שלך</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-r-4 border-r-red-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">לידים חמים</CardTitle>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{leadsStats.hot}</div>
            <p className="text-xs text-slate-500 mt-1">מוכנים לפגישה</p>
          </CardContent>
        </Card>

        <Card className="border-r-4 border-r-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">מתלבטים</CardTitle>
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{leadsStats.considering}</div>
            <p className="text-xs text-slate-500 mt-1">דורשים מעקב</p>
          </CardContent>
        </Card>

        <Card className="border-r-4 border-r-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">קרים</CardTitle>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{leadsStats.cold}</div>
            <p className="text-xs text-slate-500 mt-1">לטיפול מאוחר</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Upcoming Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-600" />
              פעולות לביצוע
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingActions.map((action, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    action.urgent ? 'bg-red-50 border border-red-200' : 'bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        action.urgent ? 'bg-red-200 text-red-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {action.type}
                      </span>
                      <span className="text-sm text-slate-500">{action.time}</span>
                    </div>
                    <p className="font-medium text-slate-900">{action.title}</p>
                  </div>
                  <Button size="sm" variant="ghost">
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Projects Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sky-600" />
              פרויקטים פעילים
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeProjects.map((project, index) => {
                const soldPercentage = (project.sold / project.units) * 100;
                return (
                  <div key={index} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-slate-900">{project.name}</p>
                        <p className="text-sm text-slate-500">{project.location}</p>
                      </div>
                      <span className="text-sm font-medium text-sky-600">
                        {project.sold}/{project.units}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-sky-500 h-2 rounded-full transition-all"
                        style={{ width: `${soldPercentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Arena Club Pro Banner */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">שדרג ל-ARENA CLUB PRO</h3>
              <p className="text-purple-100 mb-4">
                קבל גישה להטבות בלעדיות ללקוחות, תגית "חבר מועדון" והמרות גבוהות יותר
              </p>
              <Button className="bg-white text-purple-600 hover:bg-purple-50">
                למד עוד
              </Button>
            </div>
            <Gift className="w-24 h-24 text-white opacity-20" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}