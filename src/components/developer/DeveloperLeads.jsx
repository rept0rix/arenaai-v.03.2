import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Phone, MessageSquare, X, Eye, TrendingUp, Calendar } from 'lucide-react';

export default function DeveloperLeads() {
  const [selectedLead, setSelectedLead] = useState(null);
  const [showScript, setShowScript] = useState(false);

  // Mock data
  const leads = [
    {
      id: 1,
      name: 'דני כהן',
      status: 'hot',
      phone: '054-1234567',
      email: 'danny@example.com',
      project: 'פרויקט דיזנגוף',
      date: '08/01/2026',
      profile: {
        age: 35,
        family: 'זוג + 2 ילדים',
        budget: '3.5M',
        urgency: 'גבוהה',
        decisionStyle: 'מהיר ואינטואיטיבי',
        concerns: ['תקציב', 'קרבה לבתי ספר']
      },
      chatSummary: 'דני מחפש דירת 4-5 חדרים באזור מרכזי, קרוב לבתי ספר. יש לו תקציב של עד 3.5M ומעוניין לעבור תוך 6 חודשים.'
    },
    {
      id: 2,
      name: 'שרה לוי',
      status: 'considering',
      phone: '052-7654321',
      email: 'sara@example.com',
      project: 'פרויקט גבעתיים',
      date: '07/01/2026',
      profile: {
        age: 42,
        family: 'רווקה',
        budget: '2M',
        urgency: 'בינונית',
        decisionStyle: 'מדוד וזהיר',
        concerns: ['השקעה', 'תשואה']
      },
      chatSummary: 'שרה מחפשת דירה להשקעה, מעדיפה אזור עם פוטנציאל עליה במחירים.'
    },
    {
      id: 3,
      name: 'יוסי מזרחי',
      status: 'cold',
      phone: '050-9876543',
      email: 'yossi@example.com',
      project: 'פרויקט רמת השרון',
      date: '05/01/2026',
      profile: {
        age: 28,
        family: 'זוג צעיר',
        budget: '2.5M',
        urgency: 'נמוכה',
        decisionStyle: 'צריך זמן לחשוב',
        concerns: ['מחיר', 'גודל']
      },
      chatSummary: 'יוסי עדיין בשלבי בירור ראשוניים, לא בטוח לגבי התזמון.'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-700 border-red-300';
      case 'considering': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'cold': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'hot': return 'חם 🔥';
      case 'considering': return 'מתלבט 🤔';
      case 'cold': return 'קר ❄️';
      default: return status;
    }
  };

  const getSmartScript = (lead) => {
    if (lead.status === 'hot') {
      return `שלום ${lead.name}, קיבלתי את ההעדפות שלך דרך ARENA ונראה שיש לנו דירה שתואמת בדיוק למה שציינת ב${lead.project}! מתי נוח לך שנדבר?`;
    } else if (lead.status === 'considering') {
      return `היי ${lead.name}, הבנתי מ-Arena שאתה עדיין בתהליך בירור – אשמח לשוחח איתך ולהבין יחד אם יש דירה שתרגיש בה בבית.`;
    } else {
      return `היי ${lead.name}, רציתי לוודא שקיבלת את ההצעות ששלחנו דרך Arena. אם משהו לא הרגיש מדויק – נשמח לשמוע ולנסות מחדש.`;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">מתעניינים בפרויקטים</h1>
        <p className="text-slate-600">קונים פוטנציאליים שהתעניינו בפרויקטים שלך</p>
        <p className="text-sm text-slate-500 mt-2 bg-blue-50 p-3 rounded-lg border border-blue-200">
          💡 הנתונים במסך זה מסוננים לפרויקטים של היזם בלבד
        </p>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>רשימת מתעניינים</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sky-600 font-bold text-lg">
                      {lead.name.charAt(0)}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{lead.name}</h3>
                      <Badge className={getStatusColor(lead.status)}>
                        {getStatusLabel(lead.status)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {lead.status === 'hot' ? 'השאיר פרטים' : 
                         lead.status === 'considering' ? 'צפה בנכסים' : 'התחיל חיפוש'}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600">{lead.project}</p>
                    <p className="text-xs text-slate-500">
                      {lead.date} • {lead.status === 'hot' ? 'ביקש הסבר התאמה' : 
                       lead.status === 'considering' ? '3 נכסים נשמרו' : 'מקור: חיפוש בצ\'אט'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <Eye className="w-4 h-4 ml-1" />
                    פרופיל
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedLead(lead);
                      setShowScript(true);
                    }}
                  >
                    <MessageSquare className="w-4 h-4 ml-1" />
                    תסריט
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => alert(`שולח הודעת WhatsApp ל-${lead.name}...`)}
                  >
                    <Phone className="w-4 h-4 ml-1" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lead Profile Dialog */}
      {selectedLead && !showScript && (
        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="max-w-2xl" dir="rtl">
            <DialogHeader>
              <DialogTitle>פרופיל קונה: {selectedLead.name}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Contact Info */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">פרטי קשר</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm">
                    <span className="text-slate-500">טלפון: </span>
                    <span className="font-medium">{selectedLead.phone}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-slate-500">אימייל: </span>
                    <span className="font-medium">{selectedLead.email}</span>
                  </div>
                </div>
              </div>

              {/* Psychographic Profile */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">פרופיל פסיכוגרפי</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">גיל</p>
                    <p className="font-medium">{selectedLead.profile.age}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">מצב משפחתי</p>
                    <p className="font-medium">{selectedLead.profile.family}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">תקציב</p>
                    <p className="font-medium">{selectedLead.profile.budget}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">דחיפות</p>
                    <p className="font-medium">{selectedLead.profile.urgency}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg col-span-2">
                    <p className="text-xs text-slate-500 mb-1">סגנון החלטה</p>
                    <p className="font-medium">{selectedLead.profile.decisionStyle}</p>
                  </div>
                </div>
              </div>

              {/* Concerns */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">חששות עיקריים</h4>
                <div className="flex gap-2">
                  {selectedLead.profile.concerns.map((concern, idx) => (
                    <Badge key={idx} variant="outline">{concern}</Badge>
                  ))}
                </div>
              </div>

              {/* Chat Summary */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">סיכום שיחה עם ארנה</h4>
                <p className="text-sm text-slate-700 bg-sky-50 p-4 rounded-lg border border-sky-200">
                  {selectedLead.chatSummary}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Smart Script Dialog */}
      {selectedLead && showScript && (
        <Dialog open={showScript} onOpenChange={() => setShowScript(false)}>
          <DialogContent className="max-w-xl" dir="rtl">
            <DialogHeader>
              <DialogTitle>תסריט מותאם ל-{selectedLead.name}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
                <p className="text-slate-700 leading-relaxed">
                  {getSmartScript(selectedLead)}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-slate-900">טיפים לשיחה:</h4>
                <ul className="text-sm text-slate-600 space-y-1 mr-4">
                  <li>• התמקד ב{selectedLead.profile.concerns.join(' וב')}</li>
                  <li>• הסגנון שלו: {selectedLead.profile.decisionStyle}</li>
                  <li>• רמת דחיפות: {selectedLead.profile.urgency}</li>
                </ul>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => {
                  navigator.clipboard.writeText(getSmartScript(selectedLead));
                  alert('התסריט הועתק ללוח!');
                }}
              >
                העתק תסריט
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}