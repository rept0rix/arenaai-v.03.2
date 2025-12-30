import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BarChart3, Calculator, PieChart } from 'lucide-react';

export default function PriceAnalysis({ property }) {
  const price = property.price || 4500000;
  const pricePerSqm = Math.round(price / (property.size || 120));
  
  const marketData = [
    { label: 'מחיר ממוצע באזור', value: `₪${(pricePerSqm + 2000).toLocaleString()}/מ"ר`, trend: 'up' },
    { label: 'מחיר הנכס', value: `₪${pricePerSqm.toLocaleString()}/מ"ר`, trend: 'neutral' },
    { label: 'חיסכון אפשרי', value: `₪${(240000).toLocaleString()}`, trend: 'down' },
  ];

  const costs = [
    { label: 'מחיר הנכס', amount: price, color: 'bg-blue-500' },
    { label: 'דמי רכישה (6%)', amount: Math.round(price * 0.06), color: 'bg-orange-500' },
    { label: 'עמלת מתווך', amount: 45000, color: 'bg-green-500' },
    { label: 'עורך דין', amount: 8000, color: 'bg-purple-500' },
  ];

  const totalCost = costs.reduce((sum, cost) => sum + cost.amount, 0);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          ניתוח מחירים ועלויות
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Market Analysis */}
        <div>
          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            השוואת מחירים
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketData.map((item, index) => (
              <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600 mb-1">{item.label}</div>
                <div className="text-lg font-bold text-slate-900">{item.value}</div>
                {item.trend === 'up' && <Badge className="mt-2 bg-red-100 text-red-800">+5.2%</Badge>}
                {item.trend === 'down' && <Badge className="mt-2 bg-green-100 text-green-800">-5.3%</Badge>}
              </div>
            ))}
          </div>
        </div>

        {/* Cost Breakdown */}
        <div>
          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            פירוט עלויות
          </h4>
          <div className="space-y-3">
            {costs.map((cost, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${cost.color}`}></div>
                  <span className="text-slate-700">{cost.label}</span>
                </div>
                <span className="font-semibold text-slate-900">
                  ₪{cost.amount.toLocaleString()}
                </span>
              </div>
            ))}
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">סה"כ עלות</span>
                <span className="text-xl font-bold text-blue-600">
                  ₪{totalCost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Market Trend */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">מגמת שוק</span>
          </div>
          <p className="text-sm text-slate-700">
            האזור נמצא במגמת עלייה של 3.2% בשנה האחרונה. מחירי הנדל"ן צפויים להמשיך לעלות בקצב מתון.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}