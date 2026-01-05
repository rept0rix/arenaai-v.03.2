import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function PriceTrends({ property }) {
    // Mock historical price data
    const priceHistory = [
        { date: '11/24', price: 8930000, rental: 7840000 },
        { date: '01/25', price: 9200000, rental: 8120000 },
        { date: '03/25', price: 10320000, rental: 8930000 },
        { date: '05/25', price: 9850000, rental: 8680000 },
        { date: '07/25', price: 9400000, rental: 8450000 },
        { date: '09/25', price: 9400000, rental: 8450000 },
    ];

    const currentPrice = property.price || 9400000;
    const estimatedRental = Math.floor(currentPrice * 0.9);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">מגמת מחירים</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
                    <div className="flex items-center gap-3 mb-4">
                        <TrendingUp className="w-6 h-6 text-orange-600" />
                        <div className="text-lg font-semibold text-orange-900">ניתוח מחיר לאורך זמן</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-sm text-orange-700 mb-1">מחיר נוכחי</div>
                            <div className="text-2xl font-bold text-orange-900">
                                ₪{currentPrice.toLocaleString()}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-orange-700 mb-1">אומדן שכירות</div>
                            <div className="text-2xl font-bold text-orange-900">
                                ₪{estimatedRental.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={priceHistory}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis 
                                dataKey="date" 
                                stroke="#64748b"
                                style={{ fontSize: '12px' }}
                            />
                            <YAxis 
                                stroke="#64748b"
                                style={{ fontSize: '12px' }}
                                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                            />
                            <Tooltip 
                                formatter={(value) => `₪${value.toLocaleString()}`}
                                contentStyle={{ 
                                    backgroundColor: 'white', 
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    padding: '12px'
                                }}
                            />
                            <Legend />
                            <Line 
                                type="monotone" 
                                dataKey="price" 
                                stroke="#f97316" 
                                strokeWidth={3}
                                name="מחיר מכירה"
                                dot={{ fill: '#f97316', r: 4 }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="rental" 
                                stroke="#8b5cf6" 
                                strokeWidth={3}
                                name="שכירות"
                                dot={{ fill: '#8b5cf6', r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="text-sm text-blue-900 font-semibold mb-2">💡 טיפ מקצועי</div>
                    <div className="text-sm text-blue-800">
                        המחירים באזור זה יציבים יחסית בחודשים האחרונים. זהו זמן טוב לקבל החלטה מושכלת.
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}