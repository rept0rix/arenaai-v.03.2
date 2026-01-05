import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Home, Search } from 'lucide-react';

export default function MarketData({ property }) {
    // Mock data for market statistics
    const marketStats = {
        activeListings: 2495,
        recentSales: 1142,
        averagePrice: property.price || 3500000,
        pricePerSqm: property.price && property.size ? Math.floor(property.price / property.size) : 35000,
        priceChange: 7.2,
        demandLevel: 'גבוה'
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">מצב השוק באזור</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center">
                                <Home className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-sky-900">{marketStats.activeListings.toLocaleString()}</div>
                                <div className="text-sm text-sky-700">נכסים פעילים למכירה</div>
                            </div>
                        </div>
                        <div className="text-xs text-sky-600">במועצה האזורית או בעיר</div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                                <Search className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-purple-900">{marketStats.recentSales.toLocaleString()}</div>
                                <div className="text-sm text-purple-700">בדפוס החיפוש</div>
                            </div>
                        </div>
                        <div className="text-xs text-purple-600">עסקאות שהתאימו לקריטריונים</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <div className="text-sm text-slate-600 mb-1">מחיר ממוצע</div>
                        <div className="text-2xl font-bold text-slate-900">
                            ₪{marketStats.averagePrice.toLocaleString()}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <div className="text-sm text-slate-600 mb-1">מחיר למ"ר</div>
                        <div className="text-2xl font-bold text-slate-900">
                            ₪{marketStats.pricePerSqm.toLocaleString()}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <div className="text-sm text-slate-600 mb-1">שינוי מחירים (שנה)</div>
                        <div className="flex items-center gap-2">
                            <div className="text-2xl font-bold text-green-600">
                                +{marketStats.priceChange}%
                            </div>
                            <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-green-700 mb-1">רמת ביקוש באזור</div>
                            <div className="text-3xl font-bold text-green-900">{marketStats.demandLevel}</div>
                        </div>
                        <div className="text-6xl">📈</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}