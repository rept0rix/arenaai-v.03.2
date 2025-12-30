import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Bus, GraduationCap, ShoppingCart, Hospital, Trees } from 'lucide-react';

export default function PropertyFeatures({ property }) {
  const nearbyPlaces = [
    { name: 'תחנת אוטובוס', distance: '50 מטר', icon: Bus, type: 'transport' },
    { name: 'סופרמרקט', distance: '100 מטר', icon: ShoppingCart, type: 'shopping' },
    { name: 'בית ספר יסודי', distance: '200 מטר', icon: GraduationCap, type: 'education' },
    { name: 'פארק גן העיר', distance: '300 מטר', icon: Trees, type: 'recreation' },
    { name: 'מרכז רפואי', distance: '500 מטר', icon: Hospital, type: 'health' },
    { name: 'קניון עזריאלי', distance: '1.2 ק"מ', icon: ShoppingCart, type: 'shopping' },
  ];

  const highlights = [
    'דירה מרווחת ומוארת',
    'מיקום מעולה ושקט',
    'חדשה מהקבלן',
    'מרפסת עם נוף פתוח',
    'קרוב לתחבורה ציבורית',
    'אזור מתפתח',
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'transport': return 'bg-blue-100 text-blue-800';
      case 'shopping': return 'bg-green-100 text-green-800';
      case 'education': return 'bg-purple-100 text-purple-800';
      case 'recreation': return 'bg-orange-100 text-orange-800';
      case 'health': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Highlights */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            נקודות מבט מרכזיות
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-700">{highlight}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nearby Places */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            מה יש בסביבה?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearbyPlaces.map((place, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <place.icon className="w-5 h-5 text-slate-600" />
                  <span className="font-medium text-slate-900">{place.name}</span>
                </div>
                <Badge variant="outline" className={getTypeColor(place.type)}>
                  {place.distance}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}