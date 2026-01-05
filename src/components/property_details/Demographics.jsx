import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { Users, Home, TrendingUp, Baby } from 'lucide-react';

export default function Demographics({ property }) {
  // Mock demographic data
  const ageDistribution = [
    { range: '0-9', value: 15 },
    { range: '10-19', value: 18 },
    { range: '20-29', value: 25 },
    { range: '30-39', value: 28 },
    { range: '40-49', value: 22 },
    { range: '50-59', value: 20 },
    { range: '60-69', value: 16 },
    { range: '70-79', value: 12 },
    { range: '80+', value: 8 }
  ];

  const colors = ['#8b5cf6', '#8b5cf6', '#8b5cf6', '#a78bfa', '#c4b5fd', '#e9d5ff', '#f3e8ff', '#faf5ff', '#fdf4ff'];

  const householdStats = {
    totalHouseholds: 92955,
    avgHouseholdSize: 2.6,
    youngFamilies: 34,
    seniors: 60
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>אוכלוסייה</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Demographic Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Baby className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{householdStats.youngFamilies}%</div>
                <div className="text-xs text-slate-600">משפחות צעירות</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-sky-50 to-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{householdStats.seniors}%</div>
                <div className="text-xs text-slate-600">אזרח ותיק</div>
              </div>
            </div>
          </div>
        </div>

        {/* Age Distribution Chart */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-4">התפלגות גילאים</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="range" 
                stroke="#64748b"
                style={{ fontSize: '11px' }}
              />
              <YAxis 
                stroke="#64748b"
                style={{ fontSize: '11px' }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {ageDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Household Statistics */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900">נתוני משק בית</h4>
          
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5 text-slate-600" />
              <span className="text-sm text-slate-700">מספר משקי בית</span>
            </div>
            <span className="text-lg font-bold text-slate-900">
              {householdStats.totalHouseholds.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-slate-600" />
              <span className="text-sm text-slate-700">ממוצע נפשות למשק בית</span>
            </div>
            <span className="text-lg font-bold text-slate-900">
              {householdStats.avgHouseholdSize}
            </span>
          </div>
        </div>

        {/* Insights */}
        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            תובנות דמוגרפיות
          </h4>
          <ul className="text-sm text-slate-700 space-y-1">
            <li>• האזור מתאפיין באוכלוסייה מגוונת עם דגש על משפחות צעירות</li>
            <li>• ממוצע נפשות גבוה יחסית - מעיד על משפחות עם ילדים</li>
            <li>• {householdStats.seniors}% מהאוכלוסייה הם אזרחים ותיקים</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}