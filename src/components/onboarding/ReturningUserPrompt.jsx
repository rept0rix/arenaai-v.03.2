import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Trash2, RefreshCw } from 'lucide-react';
import { SessionManager } from '../utils/sessionManager';
import { base44 } from '@/api/base44Client';

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

  const handleGoogleSignIn = async () => {
    try {
      const redirectUrl = `${window.location.origin}${window.location.pathname}?skip_prompt=true`;
      await base44.auth.loginWithRedirect(redirectUrl, 'google');
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
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
            size="sm"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white"
          >
            המשך מאיפה שעצרתי
          </Button>
          
          <Button
            onClick={onStartNew}
            variant="outline"
            size="sm"
            className="w-full flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3 h-3" />
            התחל חיפוש חדש
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-slate-500">או</span>
            </div>
          </div>

          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            size="sm"
            className="w-full flex items-center justify-center gap-2 hover:bg-slate-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            התחבר עם Google
          </Button>

          <Button
            onClick={onDelete}
            variant="ghost"
            size="sm"
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center justify-center gap-2 text-xs"
          >
            <Trash2 className="w-3 h-3" />
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