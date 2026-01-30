import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Award } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { SessionManager } from '../utils/sessionManager';
import { toast } from '@/components/ui/use-toast';

export default function ArenaClubForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    consent_marketing: false,
    consent_terms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.consent_terms) {
      toast({
        title: 'שגיאה',
        description: 'יש לאשר את תנאי השימוש',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const sessionInfo = SessionManager.getSessionInfo();
      
      await base44.entities.InterestTrigger.create({
        session_id: sessionInfo.sessionId,
        trigger_type: 'arena_club',
        full_name: formData.full_name,
        phone: formData.phone,
        email: formData.email,
        consent_marketing: formData.consent_marketing,
        consent_terms: formData.consent_terms,
        consent_timestamp: new Date().toISOString(),
        consent_ip: 'client_ip',
        additional_info: {
          club_benefits: 'premium_access',
          consent_text_terms: 'אישור תנאי שימוש ומדיניות פרטיות',
          consent_text_marketing: 'אישור opt-in לקבלת עדכונים שיווקיים על נכסים חדשים והטבות'
        }
      });

      SessionManager.saveSessionData({
        triggers_activated: [...(sessionInfo.data?.triggers_activated || []), 'arena_club']
      });

      toast({
        title: 'ברוכים הבאים ל-Arena Club! 🎉',
        description: 'נשלח אליך מייל עם פרטי ההטבות והגישה למועדון'
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      toast({
        title: 'שגיאה',
        description: 'אירעה שגיאה בהצטרפות למועדון. אנא נסה שוב.',
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

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              הצטרף ל-Arena Club
            </h3>
            <p className="text-sm text-slate-600">
              הטבות וגישה בלעדית לחברי המועדון
            </p>
          </div>
        </div>

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
                checked={formData.consent_marketing}
                onCheckedChange={(checked) => setFormData({ ...formData, consent_marketing: checked })}
                id="consent_marketing"
              />
              <label htmlFor="consent_marketing" className="text-sm text-slate-600 cursor-pointer">
                אני מאשר/ת קבלת עדכונים ושיווק מ-ARENA (אופציונלי)
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
              disabled={isSubmitting || !formData.consent_terms}
              className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
            >
              {isSubmitting ? 'מצטרף...' : 'הצטרף למועדון'}
            </Button>
          </div>
        </form>

        <p className="text-xs text-slate-500 text-center mt-4">
          הצטרפות למועדון כוללת הטבות בלעדיות וגישה מוקדמת לנכסים חדשים
        </p>
      </Card>
    </div>
  );
}