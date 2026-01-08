import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Check, Star, TrendingUp, Users, Sparkles } from 'lucide-react';

export default function ArenaClubPro() {
  // Mock data
  const benefits = [
    { icon: Users, title: 'הטבות בלעדיות ללקוחות', description: 'משכנתא בתנאים מיוחדים, ייעוץ פיננסי, עיצוב פנים' },
    { icon: Star, title: 'תגית "חבר מועדון"', description: 'הנכסים שלך יוצגו עם תג מיוחד באתר' },
    { icon: TrendingUp, title: 'שיפור המרות', description: 'לקוחות נוטים יותר לבחור בנכסים עם הטבות' },
    { icon: Sparkles, title: 'עדיפות בחשיפה', description: 'הנכסים שלך יקבלו עדיפות בתוצאות החיפוש' }
  ];

  const clubProperties = [
    { id: 1, name: 'דירת 4 חדרים - פרויקט דיזנגוף', price: 3200000, status: 'active' },
    { id: 2, name: 'דירת 3 חדרים - פרויקט גבעתיים', price: 2800000, status: 'active' },
    { id: 3, name: 'פנטהאוז - פרויקט רמת השרון', price: 4100000, status: 'pending' }
  ];

  const clubBenefits = [
    'ייעוץ משכנתא עם בנקים מובילים בתנאים מיוחדים',
    'שירותי עיצוב פנים בהנחה של 20%',
    'ביטוח דירה בתנאים מועדפים',
    'שירותי עורך דין להשלמת עסקה',
    'שירותי מעבר והובלה במחיר מיוחד'
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">ARENA CLUB PRO</h1>
        <p className="text-slate-600">הצטרף למועדון והצע ללקוחות שלך יתרונות בלעדיים</p>
      </div>

      {/* Hero Banner */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 mb-8">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-8 h-8" />
                <h2 className="text-2xl font-bold">הצטרף ל-ARENA CLUB PRO</h2>
              </div>
              <p className="text-purple-100 text-lg mb-6">
                הצע ללקוחות שלך חבילת הטבות בלעדית ושפר את ההמרות בעד 40%
              </p>
              <div className="flex items-center gap-4">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                  הצטרף עכשיו
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  למד עוד
                </Button>
              </div>
            </div>
            <Gift className="w-32 h-32 text-white opacity-20" />
          </div>
        </CardContent>
      </Card>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-sm text-slate-600">{benefit.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Club Benefits List */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>הטבות ללקוחות חברי המועדון</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {clubBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-slate-700">{benefit}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Properties in Club */}
      <Card>
        <CardHeader>
          <CardTitle>הנכסים שלך במועדון</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {clubProperties.map((property) => (
              <div
                key={property.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Gift className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">{property.name}</h4>
                    <p className="text-sm text-slate-600">₪{property.price.toLocaleString()}</p>
                  </div>
                </div>
                <Badge className={property.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                  {property.status === 'active' ? 'פעיל במועדון' : 'בהמתנה לאישור'}
                </Badge>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-900">
              💡 <strong>טיפ:</strong> נכסים חברי מועדון מקבלים בממוצע פי 2.5 יותר פניות מלקוחות
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}