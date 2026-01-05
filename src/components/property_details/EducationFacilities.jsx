import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Star, MapPin, Phone } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function EducationFacilities({ property }) {
  const facilities = [
    {
      name: 'בית ספר יסודי א-ח',
      type: 'יסודי',
      rating: 3,
      maxRating: 5,
      distance: 'סמוך מאד (10)',
      features: ['מכללת - מסלול א + ב', 'מסלול א-ח'],
      badge: 'כולל פד'
    },
    {
      name: 'גן ילדים',
      type: 'גן',
      rating: 4,
      maxRating: 5,
      distance: 'סמוך מאד',
      features: ['גיל 3-6'],
      badge: null
    },
    {
      name: 'עצמון',
      type: 'חטיבה',
      rating: 3,
      maxRating: 5,
      distance: 'סמוך מאד (12)',
      features: ['כיתות ז-ח', 'תכנית העשרה'],
      badge: null
    }
  ];

  const nearbyLocations = [
    { type: 'חדר כושר', distance: '0.2 ק"מ' },
    { type: 'מרכז מסחרי', distance: '0.5 ק"מ' },
    { type: 'תחנת רכבת', distance: '1.2 ק"מ' },
    { type: 'פארק', distance: '0.3 ק"מ' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-purple-600" />
          מוסדות חינוך באזור
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Education Facilities List */}
        <div className="space-y-4">
          {facilities.map((facility, index) => (
            <div key={index} className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-slate-900">{facility.name}</h4>
                    {facility.badge && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                        {facility.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{facility.distance}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: facility.maxRating }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < facility.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm font-semibold text-slate-700 mr-1">
                    {facility.rating}/{facility.maxRating}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {facility.features.map((feature, featureIndex) => (
                  <span
                    key={featureIndex}
                    className="text-xs bg-white px-2 py-1 rounded-full text-slate-700 border border-slate-200"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Nearby Locations */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-3">מוסדות חינוך באזור</h4>
          <div className="grid grid-cols-2 gap-3">
            {nearbyLocations.map((location, index) => (
              <div
                key={index}
                className="p-3 bg-sky-50 rounded-lg border border-sky-100"
              >
                <div className="text-sm font-semibold text-slate-900 mb-1">
                  {location.type}
                </div>
                <div className="text-xs text-slate-600 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {location.distance}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2">📚 סביבה חינוכית מצוינת</h4>
          <p className="text-sm text-slate-700 mb-3">
            האזור מציע מגוון רחב של מוסדות חינוך איכותיים במרחק הליכה. מושלם למשפחות עם ילדים.
          </p>
          <button className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1">
            <Phone className="w-4 h-4" />
            צור קשר לפרטים נוספים
          </button>
        </div>
      </CardContent>
    </Card>
  );
}