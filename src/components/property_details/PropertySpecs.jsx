import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Ruler, Building, Car, ArrowUp, Calendar, Users, Check, X, Zap, Droplets, Thermometer } from 'lucide-react';

export default function PropertySpecs({ property }) {
  const mainStats = [
    { icon: Home, label: 'חדרים', value: property.rooms || 4, color: 'text-blue-600' },
    { icon: Ruler, label: 'שטח כולל', value: `${property.size || 120} מ"ר`, color: 'text-green-600' },
    { icon: Building, label: 'קומה', value: property.floor || 3, color: 'text-purple-600' },
    { icon: Car, label: 'חניות', value: property.parking ? 1 : 0, color: 'text-orange-600' },
  ];

  const features = [
    { label: 'מעלית', value: property.elevator !== false, icon: ArrowUp },
    { label: 'מרפסת', value: property.balcony !== false, icon: Home },
    { label: 'מיזוג אוויר', value: true, icon: Thermometer },
    { label: 'דוד שמש', value: true, icon: Zap },
    { label: 'מחסן', value: true, icon: Building },
    { label: 'גישה לנכים', value: false, icon: Users },
  ];

  const propertyDetails = [
    { label: 'שנת בנייה', value: '2018' },
    { label: 'סוג נכס', value: property.property_type === 'apartment' ? 'דירה' : 'בית' },
    { label: 'מצב הנכס', value: 'חדש מהקבלן' },
    { label: 'כיוון הנכס', value: 'מזרח-מערב' },
    { label: 'גובה תקרה', value: '2.7 מטר' },
    { label: 'ריצוף', value: 'פרקט למינציה' },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Home className="w-6 h-6 text-blue-600" />
          מפרט הנכס
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mainStats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-sm text-slate-600 mb-1">{stat.label}</div>
              <div className="text-xl font-bold text-slate-900">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div>
          <h4 className="font-semibold text-lg mb-3">מאפיינים</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                {feature.value ? 
                  <Check className="w-4 h-4 text-green-500" /> : 
                  <X className="w-4 h-4 text-red-500" />
                }
                <feature.icon className="w-4 h-4 text-slate-500" />
                <span className={feature.value ? 'text-slate-900' : 'text-slate-500'}>{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div>
          <h4 className="font-semibold text-lg mb-3">פרטים נוספים</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {propertyDetails.map((detail, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                <span className="text-slate-600">{detail.label}</span>
                <span className="font-medium text-slate-900">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Badge */}
        <div className="text-center">
          <Badge className="text-2xl px-6 py-2 bg-blue-100 text-blue-800">
            ₪{(property.price || 4500000).toLocaleString()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}