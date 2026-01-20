import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Trash2, RefreshCw } from 'lucide-react';
import { SessionManager } from '../utils/sessionManager';

export default function ReturningUserPrompt({ onContinue, onStartNew, onDelete }) {
  const sessionInfo = SessionManager.getSessionInfo();
  const sessionData = sessionInfo.data || {};

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('he-IL', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full bg-white p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-sky-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              שלום שוב!
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              נראה שכבר התחלת חיפוש איתנו.
              {sessionInfo.created && ` פעילות אחרונה: ${formatDate(sessionInfo.created)}`}
            </p>

            {sessionData.purpose && (
              <div className="bg-slate-50 rounded-lg p-3 mb-4 text-sm">
                <p className="text-slate-700">
                  <strong>מטרה:</strong> {sessionData.purpose === 'living' ? 'נכס למגורים' : 'נכס להשקעה'}
                </p>
                {sessionData.budget_max && (
                  <p className="text-slate-700">
                    <strong>תקציב:</strong> עד {(sessionData.budget_max / 1000000).toFixed(1)} מיליון ₪
                  </p>
                )}
                {sessionData.location && (
                  <p className="text-slate-700">
                    <strong>אזור:</strong> {sessionData.location}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Button
            onClick={onContinue}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white"
          >
            המשך מאיפה שעצרתי
          </Button>
          
          <Button
            onClick={onStartNew}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            התחל חיפוש חדש
          </Button>

          <Button
            onClick={onDelete}
            variant="ghost"
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            מחק את כל המידע שלי (GDPR)
          </Button>
        </div>

        <p className="text-xs text-slate-500 text-center">
          מידע זה נשמר במכשירך בלבד ולא משותף עם אף גורם חיצוני
        </p>
      </Card>
    </div>
  );
}