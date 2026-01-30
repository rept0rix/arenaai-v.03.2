import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, Calendar, FileText, Camera, Users, MessageSquare, Heart, Share2 } from 'lucide-react';

export default function PropertyServices({ property, onContactClick, onFinancingClick }) {
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
          </div>
          
          <div className="flex flex-col gap-2">
            <Button className="w-full text-lg py-5 bg-sky-600 hover:bg-sky-700" onClick={onContactClick}>
              פנה ליזם
            </Button>
            <Button variant="outline" className="w-full text-lg py-5" onClick={onContactClick}>
              <Calendar className="w-4 h-4 ml-2" />
              קבע פגישה
            </Button>
          </div>
        </CardContent>
      </Card>



      {/* Professional Services */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">שירותים מקצועיים</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start" onClick={onFinancingClick}>
            <Users className="w-4 h-4 ml-2" />
            יועץ משכנתאות
          </Button>
          
          <Button variant="outline" className="w-full justify-start" onClick={onContactClick}>
            <FileText className="w-4 h-4 ml-2" />
            בדיקת מסמכים
          </Button>
          
          <Button variant="outline" className="w-full justify-start" onClick={onContactClick}>
            <Calendar className="w-4 h-4 ml-2" />
            מעריך מקרקעין
          </Button>
          
          <Button variant="outline" className="w-full justify-start" onClick={onContactClick}>
            <Phone className="w-4 h-4 ml-2" />
            עורך דין מומחה
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}