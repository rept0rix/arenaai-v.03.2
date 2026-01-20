import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function SimpleFunnelVisualization({ funnel, conversionRates }) {
  if (!funnel) return null;

  const stages = [
    { key: 'viewed', label: 'ראו', value: funnel.viewed, color: 'bg-sky-500' },
    { key: 'interested', label: 'התעניינו', value: funnel.interested, color: 'bg-purple-500' },
    { key: 'left_details', label: 'השאירו פרטים', value: funnel.left_details, color: 'bg-green-500' },
    { key: 'meeting', label: 'פגישה', value: funnel.meeting, color: 'bg-orange-500' }
  ];

  const maxValue = Math.max(...stages.map(s => s.value));

  return (
    <Card>
      <CardHeader>
        <CardTitle>משפך המרות</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stages.map((stage, index) => {
            const width = maxValue > 0 ? (stage.value / maxValue) * 100 : 0;
            const nextStage = stages[index + 1];
            const conversionRate = nextStage && stage.value > 0 
              ? ((nextStage.value / stage.value) * 100).toFixed(1) 
              : null;

            return (
              <div key={stage.key}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{stage.label}</span>
                  <span className="text-xl font-bold text-slate-900">{stage.value}</span>
                </div>
                <div className="relative h-12 bg-slate-100 rounded-lg overflow-hidden">
                  <div
                    className={`h-full ${stage.color} transition-all duration-500 flex items-center justify-center text-white font-semibold`}
                    style={{ width: `${width}%` }}
                  >
                    {width > 15 && `${width.toFixed(0)}%`}
                  </div>
                </div>
                {conversionRate && (
                  <div className="flex items-center justify-center mt-2 text-sm text-slate-600">
                    <ArrowLeft className="w-4 h-4 mx-2" />
                    <span>המרה: {conversionRate}%</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {conversionRates && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">שיעורי המרה מרכזיים</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-sky-50 rounded-lg">
                <div className="text-2xl font-bold text-sky-700">{conversionRates.view_to_interest}%</div>
                <div className="text-xs text-slate-600 mt-1">צפייה → עניין</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-700">{conversionRates.interest_to_lead}%</div>
                <div className="text-xs text-slate-600 mt-1">עניין → ליד</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-700">{conversionRates.lead_to_meeting}%</div>
                <div className="text-xs text-slate-600 mt-1">ליד → פגישה</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}