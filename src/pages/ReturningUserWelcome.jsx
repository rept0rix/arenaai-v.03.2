import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play, Sparkles, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { createPageUrl } from '@/utils';

export default function ReturningUserWelcome() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(createPageUrl('Home'));
  };

  const handleStartNew = () => {
    navigate(createPageUrl('Home'));
  };

  const handleChangePurpose = () => {
    navigate(createPageUrl('Home'));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50" dir="rtl">
      <Card className="max-w-2xl w-full bg-white/95 backdrop-blur-sm border-slate-200 shadow-xl">
        <div className="p-8 text-center">
          {/* Welcome Header */}
          <div className="mb-8">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/826138143_a1d576606_a-icon-shadow1.png"
              alt="Arena AI"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              שוב שלום! 👋
            </h2>
            <p className="text-lg text-slate-600">
              נעים לראות אותך שוב. איך נמשיך?
            </p>
          </div>

          {/* Main Actions */}
          <div className="space-y-4 mb-6">
            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              className="w-full h-16 text-lg bg-gradient-to-l from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg"
            >
              <Play className="w-6 h-6 ml-3" />
              להמשיך מאיפה שעצרת
            </Button>

            {/* Start New Button */}
            <Button
              onClick={handleStartNew}
              variant="outline"
              className="w-full h-16 text-lg border-2 border-slate-300 hover:bg-slate-50"
            >
              <Sparkles className="w-6 h-6 ml-3" />
              התחלת חיפוש חדש
            </Button>
          </div>

          {/* Secondary Option */}
          <div className="pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-3">
              החיפוש האחרון שלך היה למגורים
            </p>
            <Button
              onClick={handleChangePurpose}
              variant="ghost"
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              <RefreshCw className="w-4 h-4 ml-2" />
              שינוי הקשר החיפוש
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}