import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function PropertyInquiryForm({ propertyId, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    message: '',
    acceptTerms: false,
    acceptDataTransfer: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.acceptTerms || !formData.acceptDataTransfer) {
      alert('יש לאשר את תנאי השימוש והסכמה להעברת המידע');
      return;
    }
    onSubmit({ ...formData, propertyId });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-slate-900 mb-4">פנייה לגבי הנכס</h3>
      <p className="text-slate-600 mb-6">מלאו את הפרטים ונחזור אליכם בהקדם</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="full_name">שם מלא *</Label>
          <Input
            id="full_name"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">טלפון *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="email">אימייל *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="message">הודעה (אופציונלי)</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked })}
            />
            <Label htmlFor="terms" className="text-sm cursor-pointer">
              אני מאשר/ת את <a href="/TermsOfService" className="text-sky-600 underline">תנאי השימוש</a> של Arena AI
            </Label>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="dataTransfer"
              checked={formData.acceptDataTransfer}
              onCheckedChange={(checked) => setFormData({ ...formData, acceptDataTransfer: checked })}
            />
            <Label htmlFor="dataTransfer" className="text-sm cursor-pointer">
              אני מסכים/ה להעברת הפרטים שלי ליזם/קבלן לצורך יצירת קשר לגבי הנכס
            </Label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1 bg-[#5F3A93] hover:bg-[#4a2d75]">
            שלח פנייה
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            ביטול
          </Button>
        </div>
      </form>
    </div>
  );
}