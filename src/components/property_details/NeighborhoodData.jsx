import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, School, Baby } from 'lucide-react';

export default function NeighborhoodData({ property }) {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const householdData = {
        totalHouseholds: 92955,
        avgHouseholdSize: 2.6
    };

    const educationCategories = [
        { id: 'all', label: 'כל סוגי המוסדות', count: 10 },
        { id: 'elementary', label: 'יסודי (סוף)', count: 3 },
        { id: 'preschool', label: 'גן/מעון', count: 4 },
        { id: 'high_school', label: 'תיכון', count: 2 },
        { id: 'special', label: 'חינוך מיוחד', count: 1 }
    ];

    const educationInstitutions = {
        all: [
            { name: 'בית ספר יסודי אורט', distance: '450 מטר', type: 'יסודי', rating: '3/5' },
            { name: 'תיכון הרצליה', distance: '800 מטר', type: 'תיכון', rating: '4/5' },
            { name: 'גן ילדים התקווה', distance: '200 מטר', type: 'גן', rating: '5/5' },
            { name: 'מעון יום דקל', distance: '350 מטר', type: 'מעון', rating: '4/5' },
        ],
        elementary: [
            { name: 'בית ספר יסודי אורט', distance: '450 מטר', type: 'יסודי', rating: '3/5' },
            { name: 'יסודי רמב"ם', distance: '600 מטר', type: 'יסודי', rating: '4/5' },
        ],
        preschool: [
            { name: 'גן ילדים התקווה', distance: '200 מטר', type: 'גן', rating: '5/5' },
            { name: 'מעון יום דקל', distance: '350 מטר', type: 'מעון', rating: '4/5' },
        ],
        high_school: [
            { name: 'תיכון הרצליה', distance: '800 מטר', type: 'תיכון', rating: '4/5' },
        ],
        special: [
            { name: 'חינוך מיוחד אור', distance: '1.2 ק"מ', type: 'מיוחד', rating: '4/5' },
        ]
    };

    const displayedInstitutions = educationInstitutions[selectedCategory] || educationInstitutions.all;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">נתוני שכונה ומוסדות חינוך</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Household Statistics */}
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">נתוני משקי בית</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-blue-900">
                                        {householdData.totalHouseholds.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-blue-700">מספר משקי בית</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-purple-900">
                                        {householdData.avgHouseholdSize}
                                    </div>
                                    <div className="text-sm text-purple-700">ממוצע נפשות למשקי בית</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Education Institutions */}
                <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">מוסדות חינוך באזור</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        {educationCategories.map(category => (
                            <Button
                                key={category.id}
                                variant={selectedCategory === category.id ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedCategory(category.id)}
                                className="rounded-full"
                            >
                                {category.label} ({category.count})
                            </Button>
                        ))}
                    </div>

                    <div className="space-y-3">
                        {displayedInstitutions.map((institution, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-lg p-4 border border-slate-200 hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                                            {institution.type === 'גן' || institution.type === 'מעון' ? (
                                                <Baby className="w-5 h-5 text-white" />
                                            ) : institution.type === 'תיכון' ? (
                                                <GraduationCap className="w-5 h-5 text-white" />
                                            ) : (
                                                <School className="w-5 h-5 text-white" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-900">{institution.name}</div>
                                            <div className="text-sm text-slate-600">
                                                {institution.type} • {institution.distance}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm font-semibold">
                                        {institution.rating}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🏫</span>
                        <div className="text-sm text-green-900 font-semibold">איכות חינוך באזור</div>
                    </div>
                    <div className="text-sm text-green-800">
                        האזור כולל מגוון רחב של מוסדות חינוך איכותיים בהליכה קצרה מהנכס.
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}