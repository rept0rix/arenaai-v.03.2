import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Ruler, Building, Check, X } from 'lucide-react';

export default function PropertyStats({ property, viewCount }) {
  const stats = [
    { icon: Home, label: 'חדרים', value: property.rooms },
    { icon: Ruler, label: 'שטח בנוי', value: `${property.size} מ"ר` },
    { icon: Building, label: 'קומה', value: property.floor },
  ];
  
  const features = [
    { label: 'חניה', value: property.parking },
    { label: 'מעלית', value: property.elevator },
    { label: 'מרפסת', value: property.balcony },
  ]

  const conditionLabels = {
    new: 'חדש מהקבלן',
    renovated: 'משופץ',
    good: 'מצב טוב',
    needs_renovation: 'דורש שיפוץ'
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">מפרט הנכס</h3>
        
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-3 bg-slate-100 rounded-lg">
              <stat.icon className="w-7 h-7 text-primary mx-auto mb-2" />
              <div className="text-sm text-slate-500">{stat.label}</div>
              <div className="font-semibold text-slate-900 text-lg">{stat.value || '-'}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              {feature.value ? <Check className="w-4 h-4 text-green-500"/> : <X className="w-4 h-4 text-red-500"/>}
              <span>{feature.label}</span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap items-center justify-between">
          <Badge variant="secondary" className="text-lg px-4 py-1">
             {property.property_type === 'apartment' ? 'דירה' : 
             property.property_type === 'house' ? 'בית פרטי' :
             property.property_type === 'studio' ? 'סטודיו' :
             property.property_type === 'penthouse' ? 'פנטהאוס' :
             property.property_type === 'duplex' ? 'דופלקס' : property.property_type}
          </Badge>
          {property.condition && (
            <Badge variant="outline" className="text-base">
              מצב הנכס: {conditionLabels[property.condition]}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}