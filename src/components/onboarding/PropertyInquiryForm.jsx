import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { SessionManager } from '../utils/sessionManager';
import { toast } from '@/components/ui/use-toast';

export default function PropertyInquiryForm({ property, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    consent_terms: false,
    consent_developer_share: false,
    consent_marketing: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.consent_terms || !formData.consent_developer_share) {
      toast({
        title: 'שגיאה',
        description: 'יש לאשר את תנאי השימוש והסכמה להעברת פרטים ליזם',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const sessionInfo = SessionManager.getSessionInfo();
      
      // Save Interest Trigger
      await base44.entities.InterestTrigger.create({
        session_id: sessionInfo.sessionId,
        trigger_type: 'property_inquiry',
        property_id: property.id,
        full_name: formData.full_name,
        phone: formData.phone,
        email: formData.email,
        consent_marketing: formData.consent_marketing,
        consent_terms: formData.consent_terms,
        consent_timestamp: new Date().toISOString(),
        consent_ip: 'client_ip', // Should be captured server-side
        additional_info: {
          property_title: property.title,
          property_price: property.price,
          property_location: property.location,
          consent_developer_share: formData.consent_developer_share,
          consent_text_terms: 'אישור תנאי שימוש ומדיניות פרטיות',
          consent_text_developer: 'אישור העברת פרטים ליזם הפרויקט לצורך קבלת מידע על הנכס בלבד'
        }
      });

      // Update anonymous session
      SessionManager.saveSessionData({
        triggers_activated: [...(sessionInfo.data?.triggers_activated || []), 'property_inquiry']
      });

      toast({
        title: 'הפנייה נשלחה בהצלחה!',
        description: 'נציג מטעם היזם יצור איתך קשר בקרוב'
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: 'שגיאה',
        description: 'אירעה שגיאה בשליחת הפנייה. אנא נסה שוב.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full bg-white p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-slate-900 mb-2">
          בקשת פרטים נוספים
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          {property.title}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              שם מלא *
            </label>
            <Input
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="הכנס שם מלא"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              טלפון *
            </label>
            <Input
              required
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="05X-XXXXXXX"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">
              אימייל *
            </label>
            <Input
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="example@email.com"
            />
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-200">
            <div className="flex items-start gap-2">
              <Checkbox
                checked={formData.consent_terms}
                onCheckedChange={(checked) => setFormData({ ...formData, consent_terms: checked })}
                id="consent_terms"
              />
              <label htmlFor="consent_terms" className="text-sm text-slate-600 cursor-pointer">
                אני מאשר/ת את <a href="/TermsOfService" target="_blank" className="text-sky-600 hover:underline">תנאי השימוש</a> ו<a href="/PrivacyPolicy" target="_blank" className="text-sky-600 hover:underline">מדיניות הפרטיות</a> *
              </label>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                checked={formData.consent_developer_share}
                onCheckedChange={(checked) => setFormData({ ...formData, consent_developer_share: checked })}
                id="consent_developer_share"
              />
              <label htmlFor="consent_developer_share" className="text-sm text-slate-600 cursor-pointer">
                אני מאשר/ת להעביר את פרטיי ליזם הפרויקט לצורך קבלת מידע על הנכס בלבד *
              </label>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                checked={formData.consent_marketing}
                onCheckedChange={(checked) => setFormData({ ...formData, consent_marketing: checked })}
                id="consent_marketing"
              />
              <label htmlFor="consent_marketing" className="text-sm text-slate-600 cursor-pointer">
                אני מעוניין/ת לקבל עדכונים שיווקיים על נכסים דומים (אופציונלי)
              </label>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              ביטול
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-sky-600 hover:bg-sky-700"
            >
              {isSubmitting ? 'שולח...' : 'שלח פנייה'}
            </Button>
          </div>
        </form>

        <p className="text-xs text-slate-500 text-center mt-4">
          הפרטים שלך ישמרו בצורה מאובטחת ויועברו רק ליזם הנכס
        </p>
      </Card>
    </div>
  );
}