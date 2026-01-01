import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Car, Dumbbell, ShieldCheck, Wifi, Baby, Trees, Store, UtensilsCrossed, Camera } from 'lucide-react';

export default function BuildingInfo({ project }) {
  const buildingFeatures = [
    { icon: Car, label: 'חניה תת-קרקעית', description: '2 קומות חניה' },
    { icon: Dumbbell, label: 'חדר כושר', description: 'מאובזר במכשירים מתקדמים' },
    { icon: ShieldCheck, label: 'אבטחה 24/7', description: 'שמירה ומצלמות' },
    { icon: Wifi, label: 'WiFi משותף', description: 'באזורים ציבוריים' },
    { icon: Baby, label: 'גן ילדים', description: 'בתוך הפרויקט' },
    { icon: Trees, label: 'גינה משותפת', description: 'שטחים ירוקים מטופחים' },
    { icon: Store, label: 'חנויות', description: 'קומת מסחר בקומת קרקע' },
    { icon: UtensilsCrossed, label: 'מסעדות', description: 'בסביבה הקרובה' },
    { icon: Camera, label: 'מערכת אינטרקום', description: 'ווידאו אינטרקום חכם' }
  ];

  const buildingImages = [
    {
      url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      title: 'חזית הבניין'
    },
    {
      url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
      title: 'לובי הכניסה'
    },
    {
      url: 'https://images.unsplash.com/photo-1486304873000-235643847519?auto=format&fit=crop&w=800&q=80',
      title: 'הגינה המשותפת'
    },
    {
      url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      title: 'חדר כושר'
    }
  ];

  const buildingSpecs = [
    { label: 'גובה הבניין', value: '60 קומות' },
    { label: 'שנת בנייה', value: '2024' },
    { label: 'קבלן', value: 'קבלן איכות גבוהה' },
    { label: 'אדריכל', value: 'משרד אדריכלים מוביל' },
    { label: 'תקן ירוק', value: 'תו תקן ירוק 5 כוכבים' },
    { label: 'מעליות', value: '4 מעליות מהירות' }
  ];

  return (
    <div className="space-y-6">
      {/* Building Images Gallery */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-sky-600" />
            תמונות הבניין
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {buildingImages.map((img, index) => (
              <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-semibold">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Building Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>מפרט הבניין</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {buildingSpecs.map((spec, index) => (
              <div key={index} className="border-b border-slate-200 pb-3">
                <div className="text-sm text-slate-600">{spec.label}</div>
                <div className="font-semibold text-slate-900">{spec.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Building Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>שירותים ומתקנים</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {buildingFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{feature.label}</div>
                    <div className="text-sm text-slate-600">{feature.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Nearby Services */}
      <Card>
        <CardHeader>
          <CardTitle>שירותים בסביבה</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <div className="font-semibold text-slate-900">גני ילדים ובתי ספר</div>
                <div className="text-sm text-slate-600">3 גנים ו-2 בתי ספר בהליכה</div>
              </div>
              <Badge className="bg-green-500">5 דק' הליכה</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <div className="font-semibold text-slate-900">תחבורה ציבורית</div>
                <div className="text-sm text-slate-600">תחנת אוטובוס ורכבת קלה</div>
              </div>
              <Badge className="bg-blue-500">2 דק' הליכה</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <div className="font-semibold text-slate-900">קניות ובילוי</div>
                <div className="text-sm text-slate-600">קניון דיזנגוף סנטר</div>
              </div>
              <Badge className="bg-purple-500">10 דק' הליכה</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div>
                <div className="font-semibold text-slate-900">שירותי בריאות</div>
                <div className="text-sm text-slate-600">קופת חולים ובית מרקחת</div>
              </div>
              <Badge className="bg-orange-500">3 דק' הליכה</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}