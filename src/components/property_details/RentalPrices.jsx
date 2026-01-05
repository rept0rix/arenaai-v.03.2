import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home } from 'lucide-react';

export default function RentalPrices({ property }) {
    const rentalData = [
        { rooms: 2, price: 3130000, pricePerSqm: 56350, color: 'bg-blue-500' },
        { rooms: 3, price: 4210000, pricePerSqm: 52200, color: 'bg-green-500' },
        { rooms: 4, price: 5340000, pricePerSqm: 48800, color: 'bg-orange-500' },
        { rooms: 5, price: 7070000, pricePerSqm: 49800, color: 'bg-red-500' },
        { rooms: 6, price: 9720000, pricePerSqm: 43450, color: 'bg-yellow-500' },
    ];

    const totalPercentage = 100;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">התפלגות מחירים באזור</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center py-8">
                    <div className="relative w-48 h-48">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                fill="none"
                                stroke="#e2e8f0"
                                strokeWidth="16"
                            />
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="16"
                                strokeDasharray="552.92"
                                strokeDashoffset="0"
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="25%" stopColor="#3b82f6" />
                                    <stop offset="50%" stopColor="#10b981" />
                                    <stop offset="75%" stopColor="#f97316" />
                                    <stop offset="100%" stopColor="#ef4444" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className="text-sm text-slate-600">נתון הדירות</div>
                            <div className="text-4xl font-bold text-slate-900">{totalPercentage}%</div>
                            <div className="text-sm text-slate-600">כל החדרים</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    {rentalData.map((item) => (
                        <div 
                            key={item.rooms}
                            className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                <div className="flex items-center gap-2">
                                    <Home className="w-4 h-4 text-slate-500" />
                                    <span className="font-medium text-slate-900">{item.rooms} חדרים</span>
                                </div>
                            </div>
                            <div className="text-left">
                                <div className="text-lg font-bold text-slate-900">
                                    ₪{item.price.toLocaleString()}
                                </div>
                                <div className="text-sm text-slate-500">
                                    ₪{item.pricePerSqm.toLocaleString()} למ"ר
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">💰</span>
                        <div className="text-sm text-purple-900 font-semibold">מחיר ממוצע למ"ר באזור</div>
                    </div>
                    <div className="text-3xl font-bold text-purple-900">₪50,160</div>
                    <div className="text-xs text-purple-700 mt-1">מבוסס על עסקאות אחרונות</div>
                </div>
            </CardContent>
        </Card>
    );
}