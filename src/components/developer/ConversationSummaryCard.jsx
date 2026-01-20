import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Search, ThumbsUp, X, ArrowRight } from 'lucide-react';

export default function ConversationSummaryCard({ summary }) {
  if (!summary) return null;

  return (
    <Card className="border-2 border-sky-200 bg-gradient-to-br from-sky-50 to-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-sky-600" />
          סיכום שיחה
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* What Searched */}
        {summary.what_searched && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Search className="w-4 h-4 text-sky-600" />
              <span className="text-sm font-semibold text-slate-700">מה חיפש</span>
            </div>
            <div className="p-3 bg-white rounded border border-sky-200">
              <p className="text-slate-700 leading-relaxed">{summary.what_searched}</p>
            </div>
          </div>
        )}

        {/* What Liked */}
        {summary.what_liked && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ThumbsUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-slate-700">מה אהב</span>
            </div>
            <div className="p-3 bg-green-50 rounded border border-green-200">
              <p className="text-slate-700 leading-relaxed">{summary.what_liked}</p>
            </div>
          </div>
        )}

        {/* What Blocked */}
        {summary.what_blocked && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <X className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-slate-700">מה חסם</span>
            </div>
            <div className="p-3 bg-red-50 rounded border border-red-200">
              <p className="text-slate-700 leading-relaxed">{summary.what_blocked}</p>
            </div>
          </div>
        )}

        {/* Next Recommended Step */}
        {summary.next_recommended_step && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ArrowRight className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-slate-700">הצעד הבא המומלץ</span>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-50 to-sky-50 rounded border-2 border-purple-300">
              <p className="text-slate-900 font-medium leading-relaxed">{summary.next_recommended_step}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}