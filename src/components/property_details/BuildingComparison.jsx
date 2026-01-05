import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Home } from 'lucide-react';

export default function BuildingComparison({ property }) {
  const totalFloors = property.total_floors || 12;
  const currentFloor = property.floor || 5;
  
  // Generate mock comparison data for building
  const apartments = Array.from({ length: 6 }, (_, i) => {
    const floor = Math.max(0, Math.min(totalFloors, currentFloor - 3 + i));
    const isCurrent = floor === currentFloor;
    const basePrice = property.price || 4000000;
    const floorFactor = 1 + (floor * 0.008);
    const price = Math.round(basePrice * floorFactor);
    const pricePerSqm = Math.round(price / (property.size || 100));
    const status = isCurrent ? 'current' : (Math.random() > 0.5 ? 'available' : 'sold');
    
    return {
      floor,
      price,
      pricePerSqm,
      status,
      isCurrent,
      rooms: property.rooms || 4,
      size: property.size || 100
    };
  });

  const matchPercentage = 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>התכלות מחירים</span>
          <div className="text-sm font-normal text-slate-600">
            {apartments.filter(a => a.status !== 'sold').length} מתוך {apartments.length} זמינות
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Match Score Circle */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#e2e8f0"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - matchPercentage / 100)}`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-900">{matchPercentage}%</span>
              <span className="text-xs text-slate-600">תואם הדרישות</span>
              <span className="text-xs text-slate-500">כל הדירות</span>
            </div>
          </div>
        </div>

        {/* Price Comparison Table */}
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-slate-600 pb-2 border-b">
            <div>קומה</div>
            <div>מחיר</div>
            <div>מחיר למ"ר</div>
            <div>חדרים</div>
          </div>
          
          {apartments.map((apt, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 gap-2 items-center p-3 rounded-lg transition-all ${
                apt.isCurrent
                  ? 'bg-gradient-to-r from-sky-100 to-purple-100 border-2 border-sky-500 shadow-md'
                  : 'bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2">
                {apt.status === 'sold' ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : apt.isCurrent ? (
                  <Home className="w-4 h-4 text-sky-600" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-400" />
                )}
                <span className={`font-semibold ${apt.isCurrent ? 'text-sky-900' : 'text-slate-700'}`}>
                  {apt.floor}
                </span>
              </div>
              
              <div className={`text-sm ${apt.isCurrent ? 'font-bold text-sky-900' : 'font-semibold text-slate-900'}`}>
                ₪{(apt.price / 1000000).toFixed(2)}M
              </div>
              
              <div className={`text-sm ${apt.isCurrent ? 'font-semibold text-sky-700' : 'text-slate-600'}`}>
                ₪{apt.pricePerSqm.toLocaleString()}
              </div>
              
              <div className="flex items-center gap-1">
                <span className={`text-sm font-semibold ${apt.isCurrent ? 'text-sky-900' : 'text-slate-700'}`}>
                  {apt.rooms}
                </span>
                {apt.status === 'sold' && (
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    נמכר
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2">📊 ניתוח מחירים בבניין</h4>
          <p className="text-sm text-slate-700 mb-3">
            המחיר של הדירה הזו תואם את הממוצע בבניין. קומות גבוהות יותר נמכרות בפרמיה של כ-0.8% לכל קומה.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">רמת התאמה:</span>
            <Progress value={matchPercentage} className="flex-1 h-2" />
            <span className="text-xs font-semibold text-slate-900">{matchPercentage}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}