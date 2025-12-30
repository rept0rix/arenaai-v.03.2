import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Calendar, MessageSquare } from 'lucide-react';

export default function ContactForm({ property }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: 'אני מעוניין/ת לקבל פרטים נוספים על הנכס.'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
  };

  return (
    <div className="sticky top-6 space-y-4">
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-center">מעוניינים בפרטים נוספים?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              placeholder="שם מלא"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="bg-slate-100 border-0"
            />
            <Input
              placeholder="טלפון"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="bg-slate-100 border-0"
            />
            <Input
              placeholder="אימייל"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="bg-slate-100 border-0"
            />
            <Textarea
              placeholder="הודעה"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows={3}
              className="bg-slate-100 border-0"
            />
            <Button type="submit" className="w-full text-lg py-6">
              <MessageSquare className="w-5 h-5 ml-2" />
              שליחת פנייה
            </Button>
          </form>
          
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
    </div>
  );
}