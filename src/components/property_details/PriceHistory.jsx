import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function PriceHistory({ property }) {
  // Generate mock price history data
  const generatePriceHistory = () => {
    const months = ['01/24', '02/24', '03/24', '04/24', '05/24', '06/24', '07/24', '08/24', '09/24'];
    const basePrice = property.price || 4000000;
    
    return months.map((month, index) => {
      const variation = Math.random() * 200000 - 100000;
      const apartmentPrice = basePrice + variation - (index * 20000);
      const marketAvg = basePrice * 0.95 + variation - (index * 15000);
      
      return {
        month,
        apartment: Math.round(apartmentPrice),
        market: Math.round(marketAvg)
      };
    });
  };

  const data = generatePriceHistory();
  const currentPrice = data[data.length - 1].apartment;
  const previousPrice = data[data.length - 2].apartment;
  const priceChange = currentPrice - previousPrice;
  const percentChange = ((priceChange / previousPrice) * 100).toFixed(1);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-slate-900 mb-2">{payload[0].payload.month}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ₪{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>מגמת מחירים</span>
          <div className="flex items-center gap-2">
            {priceChange >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
            <span className={`text-lg font-bold ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {priceChange >= 0 ? '+' : ''}{percentChange}%
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-3xl font-bold text-slate-900">
              ₪{currentPrice.toLocaleString()}
            </span>
            <span className="text-sm text-slate-500">פברואר 2025</span>
          </div>
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-slate-600">מחיר קודם: </span>
              <span className="font-semibold">₪{previousPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="month" 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `₪${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '14px' }}
              iconType="line"
            />
            <Line 
              type="monotone" 
              dataKey="apartment" 
              stroke="#0ea5e9" 
              strokeWidth={3}
              name="דירה זו"
              dot={{ fill: '#0ea5e9', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="market" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="ממוצע שוק"
              dot={{ fill: '#8b5cf6', r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-6 p-4 bg-gradient-to-br from-sky-50 to-blue-50 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2">💡 תובנה מקצועית</h4>
          <p className="text-sm text-slate-700">
            {priceChange >= 0 
              ? `המחיר עלה ב-${Math.abs(priceChange).toLocaleString()}₪ בחודש האחרון. זוהי עליה של ${percentChange}%, המעידה על ביקוש גבוה באזור.`
              : `המחיר ירד ב-${Math.abs(priceChange).toLocaleString()}₪ בחודש האחרון. זו הזדמנות טובה למשא ומתן.`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}