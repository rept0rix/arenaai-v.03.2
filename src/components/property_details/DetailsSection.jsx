import React from 'react';
import { BedDouble, Ruler, ParkingCircle, Building, Calendar } from 'lucide-react';
import MapComponent from './MapComponent';

export default function DetailsSection({ property }) {
  const details = [
    { icon: BedDouble, label: 'חדרים', value: property.rooms },
    { icon: Ruler, label: 'מ"ר', value: property.size },
    { icon: Building, label: 'קומה', value: property.floor },
    { icon: ParkingCircle, label: 'חניה', value: property.parking ? 'כן' : 'לא' },
    { icon: Calendar, label: 'מצב', value: property.condition },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">על הנכס</h2>
        <p className="text-slate-600 leading-relaxed">{property.description || "לא צוין תיאור מפורט עבור נכס זה."}</p>
        
        <h3 className="text-xl font-bold mt-6 mb-4">מפרט הנכס</h3>
        <div className="grid grid-cols-2 gap-4">
          {details.map((item, index) => (
            <div key={index} className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
              <item.icon className="w-5 h-5 text-sky-600" />
              <div>
                <div className="text-sm text-slate-500">{item.label}</div>
                <div className="font-semibold">{item.value || '-'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">מיקום הנכס</h2>
        <MapComponent property={property} />
      </div>
    </div>
  );
}