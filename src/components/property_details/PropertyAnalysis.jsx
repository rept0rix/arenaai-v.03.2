import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function PropertyAnalysis({ property }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          ניתוח הנכס
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-800">הערכת מחיר הוגנת</span>
          </div>
          <p className="text-green-700 text-sm">המחיר הנדרש תואם לשוק האזור</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-800">פוטנציאל השקעה</span>
          </div>
          <p className="text-blue-700 text-sm">אזור בצמיחה עם פוטנציאל העלאת ערך</p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <span className="font-semibold text-yellow-800">נקודות לבדיקה</span>
          </div>
          <p className="text-yellow-700 text-sm">מומלץ לבדוק מצב התשתיות והצנרת</p>
        </div>
      </CardContent>
    </Card>
  );
}