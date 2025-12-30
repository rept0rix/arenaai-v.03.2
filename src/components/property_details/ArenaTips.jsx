import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Shield, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function ArenaTips() {
  const tips = [
    {
      icon: Shield,
      title: "בדיקת עורך דין",
      content: "ודא שכל המסמכים תקינים לפני החתימה על הסכם",
      type: "warning"
    },
    {
      icon: TrendingUp,
      title: "מגמות שוק",
      content: "האזור נמצא במגמת עלייה של 3.2% בשנה האחרונה",
      type: "success"
    },
    {
      icon: Lightbulb,
      title: "טיפ חכם",
      content: "בדוק את תוכניות הפיתוח העירוניות באזור",
      type: "info"
    },
    {
      icon: AlertTriangle,
      title: "נקודות לבדיקה",
      content: "מומלץ לבדוק מצב התשתיות והצנרת בנכס זה",
      type: "warning"
    },
    {
      icon: CheckCircle,
      title: "יתרונות הנכס",
      content: "מיקום מעולה ליד תחבורה ציבורית ומרכזי קניות",
      type: "success"
    },
    {
      icon: Info,
      title: "מידע נוסף",
      content: "הנכס נמצא באזור מתפתח עם תוכניות להקמת פארק חדש",
      type: "info"
    }
  ];

  const getTypeStyles = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-800';
    }
  };

  return (
    <div className="sticky top-6">
      <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/a1d576606_a-icon-shadow1.png" 
              alt="Arena AI" 
              className="w-6 h-6"
            />
            ARENA TIPS
          </CardTitle>
          <p className="text-sm text-slate-600">תובנות חכמות לקבלת החלטה נכונה</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {tips.map((tip, index) => (
            <div key={index} className={`p-3 rounded-lg border ${getTypeStyles(tip.type)}`}>
              <div className="flex items-start gap-3">
                <tip.icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">{tip.title}</h4>
                  <p className="text-xs leading-relaxed">{tip.content}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}