import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Zap } from 'lucide-react';

export default function LeadsFunnel({ leads = [], meetings = [], title = "משפך לידים" }) {
    const newLeads = leads.filter(l => l.status === 'new').length;
    const interested = leads.filter(l => l.status === 'interested').length;
    const scheduledMeetings = meetings.filter(m => m.status === 'scheduled').length;
    const closedWon = leads.filter(l => l.status === 'closed_won').length;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-600" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                        <div className="text-3xl font-bold text-blue-600">{newLeads}</div>
                        <div className="text-sm text-slate-600 mt-1 font-medium">לידים חדשים</div>
                    </div>
                    <div className="text-center p-4 bg-sky-50 rounded-lg border-2 border-sky-200">
                        <div className="text-3xl font-bold text-sky-600">{interested}</div>
                        <div className="text-sm text-slate-600 mt-1 font-medium">מתעניינים</div>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
                        <div className="text-3xl font-bold text-amber-600">{scheduledMeetings}</div>
                        <div className="text-sm text-slate-600 mt-1 font-medium">פגישות מתוזמנות</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                        <div className="text-3xl font-bold text-green-600">{closedWon}</div>
                        <div className="text-sm text-slate-600 mt-1 font-medium">נסגרו בהצלחה</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}