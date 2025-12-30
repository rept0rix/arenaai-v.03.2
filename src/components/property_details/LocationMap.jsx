import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Car, Bus } from 'lucide-react';

export default function LocationMap({ property }) {
  const location = property.location || "תל אביב, ישראל";
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          מיקום הנכס
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Map Placeholder */}
        <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1524813686514-9040c58b7244?auto=format&fit=crop&w=800&q=80"
            alt="מפה"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        {/* Location Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-500" />
            <span className="text-lg font-medium">{location}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-slate-500" />
              <div>
                <div className="text-sm text-slate-600">נסיעה למרכז</div>
                <div className="font-medium">15 דקות</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bus className="w-4 h-4 text-slate-500" />
              <div>
                <div className="text-sm text-slate-600">תחבורה ציבורית</div>
                <div className="font-medium">מעולה</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700">אזור שקט</Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">קרוב לתחבורה</Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700">מתאים למשפחות</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}