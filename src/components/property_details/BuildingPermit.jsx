import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function BuildingPermit({ property }) {
  const permitData = {
    currentPrice: 2495,
    previousPrice: 2142,
    priceChange: 353,
    percentChange: 25,
    updateDate: 'פברואר 2025',
    status: 'פעיל',
    permitType: 'עליה בבניין, רישיון לציון',
    details: [
      { label: 'תאריך רישיון', value: '15/01/2024' },
      { label: 'סוג פרויקט', value: 'מגורים חדש' },
      { label: 'מספר יחידות', value: '48 דירות' },
      { label: 'שלב בנייה', value: 'בשלבי גמר' }
    ]
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-600" />
            רישיון לציון
          </CardTitle>
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle2 className="w-3 h-3 ml-1" />
            {permitData.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-sky-50 to-blue-50 rounded-lg border border-sky-100">
            <div className="text-sm text-slate-600 mb-1">מחיר נוכחי</div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {permitData.currentPrice.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500">בלבד ₪ לחודש</div>
            <div className="text-xs text-slate-600 mt-2">
              (עד {permitData.previousPrice.toLocaleString()} ₪ לחודש)
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
            <div className="text-sm text-slate-600 mb-1">עליית מחיר</div>
            <div className="text-3xl font-bold text-green-600 mb-1 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              +{permitData.percentChange}%
            </div>
            <div className="text-xs text-slate-500">מעלה קודמת</div>
            <div className="text-xs text-green-700 mt-2">
              +{permitData.priceChange.toLocaleString()} ₪
            </div>
          </div>
        </div>

        {/* Permit Details */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-600" />
            פרטי רישיון
          </h4>
          
          {permitData.details.map((detail, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
            >
              <span className="text-sm text-slate-600">{detail.label}</span>
              <span className="text-sm font-semibold text-slate-900">{detail.value}</span>
            </div>
          ))}
        </div>

        {/* Project Description */}
        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
          <h4 className="font-semibold text-slate-900 mb-2">🏗️ {permitData.permitType}</h4>
          <p className="text-sm text-slate-700 mb-3">
            שוק הנדל"ן במפרכת הזאת נמצא במגמת עלייה מרשימה. מחירי הנכסים עלו ב-{permitData.percentChange}% בחודשים האחרונים עקב ביקוש גבוה ומלאי נמוך.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Calendar className="w-3 h-3" />
            <span>עדכון אחרון: {permitData.updateDate}</span>
          </div>
        </div>

        {/* Historic Comparison */}
        <div className="p-4 bg-sky-50 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2">📊 השוואת שווי דירה שלי</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">שווי - חודש קודם</span>
              <span className="font-semibold text-slate-900">
                ₪{(property.price * 0.98).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">שווי - היום</span>
              <span className="font-bold text-green-600">
                ₪{property.price?.toLocaleString()}
              </span>
            </div>
            <div className="pt-2 border-t border-sky-200">
              <span className="text-green-600 font-semibold">
                +₪{(property.price * 0.02).toLocaleString()} עליה בשווי
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}