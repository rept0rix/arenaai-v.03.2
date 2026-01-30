import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, Mail, Calendar, FileText, Camera, Users, MessageSquare, Heart, Share2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { toast } from "sonner";

export default function PropertyServices({ property, onContactClick, onFinancingClick, onFormSubmit }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    wantsMeeting: false,
    consentTerms: false,
    consentDeveloper: false,
    consentMarketing: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.email) {
      toast.error('נא למלא את כל השדות');
      return;
    }
    
    if (!formData.consentTerms) {
      toast.error('יש לאשר את תנאי השימוש');
      return;
    }
    
    if (!formData.consentDeveloper) {
      toast.error('יש לאשר העברת פרטים ליזם');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await base44.entities.InterestTrigger.create({
        session_id: 'property_details_form',
        trigger_type: 'property_inquiry',
        property_id: property.id,
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        consent_marketing: formData.consentMarketing,
        consent_terms: formData.consentTerms,
        consent_timestamp: new Date().toISOString(),
        additional_info: {
          wants_meeting: formData.wantsMeeting,
          property_title: property.title
        }
      });
      
      toast.success('הפנייה נשלחה בהצלחה!');
      
      // Send message to chat
      if (onFormSubmit) {
        const message = formData.wantsMeeting 
          ? `נשלחה בקשה ליזם עבור ${property.title} וקביעת פגישה` 
          : `נשלחה פנייה ליזם עבור ${property.title}`;
        onFormSubmit(message);
      }
      
      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        wantsMeeting: false,
        consentTerms: false,
        consentDeveloper: false,
        consentMarketing: false
      });
    } catch (error) {
      toast.error('שגיאה בשליחת הפנייה');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sticky top-6 space-y-6">
      {/* Contact Form */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">מעוניינים בפרטים נוספים?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input 
              placeholder="שם מלא" 
              className="bg-slate-50 border-0"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
            <Input 
              placeholder="טלפון" 
              className="bg-slate-50 border-0"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            <Input 
              placeholder="אימייל" 
              type="email" 
              className="bg-slate-50 border-0"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            
            {/* Meeting Checkbox */}
            <div className="flex items-start gap-2 pt-2">
              <Checkbox 
                id="wantsMeeting"
                checked={formData.wantsMeeting}
                onCheckedChange={(checked) => setFormData({...formData, wantsMeeting: checked})}
              />
              <label htmlFor="wantsMeeting" className="text-sm text-slate-700 cursor-pointer">
                רוצה לקבוע פגישה
              </label>
            </div>
            
            {/* Consent Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <div className="flex items-start gap-2">
                <Checkbox 
                  id="consentTerms"
                  checked={formData.consentTerms}
                  onCheckedChange={(checked) => setFormData({...formData, consentTerms: checked})}
                />
                <label htmlFor="consentTerms" className="text-xs text-slate-600 cursor-pointer">
                  אני מאשר/ת את תנאי השימוש ומדיניות הפרטיות *
                </label>
              </div>
              
              <div className="flex items-start gap-2">
                <Checkbox 
                  id="consentDeveloper"
                  checked={formData.consentDeveloper}
                  onCheckedChange={(checked) => setFormData({...formData, consentDeveloper: checked})}
                />
                <label htmlFor="consentDeveloper" className="text-xs text-slate-600 cursor-pointer">
                  אני מאשר/ת להעביר את פרטי ליזם של נכס זה לצורך קבלת מידע בלבד *
                </label>
              </div>
              
              <div className="flex items-start gap-2">
                <Checkbox 
                  id="consentMarketing"
                  checked={formData.consentMarketing}
                  onCheckedChange={(checked) => setFormData({...formData, consentMarketing: checked})}
                />
                <label htmlFor="consentMarketing" className="text-xs text-slate-600 cursor-pointer">
                  אני מעוניין/ת לקבל עדכונים שיווקיים על נכסים דומים (אופציונלי)
                </label>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full text-lg py-5 bg-sky-600 hover:bg-sky-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'שולח...' : 'שלח'}
            </Button>
          </form>
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