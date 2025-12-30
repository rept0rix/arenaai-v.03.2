import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Calendar, FileText, Camera, Users, MessageSquare, Heart, Share2 } from 'lucide-react';

export default function PropertyServices({ property }) {
  return (
    <div className="sticky top-6 space-y-6">
      {/* Contact Form */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">מעוניינים בפרטים נוספים?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Input placeholder="שם מלא" className="bg-slate-50 border-0" />
            <Input placeholder="טלפון" className="bg-slate-50 border-0" />
            <Input placeholder="אימייל" type="email" className="bg-slate-50 border-0" />
            <Textarea 
              placeholder="אני מעוניין/ת לקבל פרטים נוספים על הנכס הזה"
              rows={3}
              className="bg-slate-50 border-0"
            />
            <Button className="w-full text-lg py-6">
              <MessageSquare className="w-5 h-5 ml-2" />
              שליחת פנייה
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" className="py-5">
              <Phone className="w-4 h-4 ml-2" />
              התקשר
            </Button>
            <Button variant="outline" className="py-5">
              <Calendar className="w-4 h-4 ml-2" />
              קבע פגישה
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">פעולות מהירות</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Heart className="w-4 h-4 ml-2" />
            שמור לרשימת המועדפים
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Share2 className="w-4 h-4 ml-2" />
            שתף את הנכס
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <FileText className="w-4 h-4 ml-2" />
            הורד מסמכים
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Camera className="w-4 h-4 ml-2" />
            צילום מקצועי
          </Button>
        </CardContent>
      </Card>

      {/* Professional Services */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">שירותים מקצועיים</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Users className="w-4 h-4 ml-2" />
            יועץ משכנתאות
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <FileText className="w-4 h-4 ml-2" />
            בדיקת מסמכים
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Calendar className="w-4 h-4 ml-2" />
            מעריך מקרקעין
          </Button>
          
          <Button variant="outline" className="w-full justify-start">
            <Phone className="w-4 h-4 ml-2" />
            עורך דין מומחה
          </Button>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-blue-600">247</div>
            <div className="text-sm text-slate-600">צפיות השבוע</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}