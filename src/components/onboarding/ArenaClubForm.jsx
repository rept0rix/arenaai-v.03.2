import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function ArenaClubForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    acceptTerms: false,
    acceptMarketing: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.acceptTerms || !formData.acceptMarketing) {
      alert('יש לאשר את תנאי השימוש והסכמה לקבלת תוכן שיווקי');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-slate-900 mb-4">הצטרפות למועדון ARENA CLUB</h3>
      <p className="text-slate-600 mb-6">קבלו הטבות בלעדיות, עדכונים על נכסים חדשים ותכנים מיוחדים</p>
      
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

        <div className="bg-sky-50 rounded-lg p-4 my-4">
          <h4 className="font-semibold text-slate-900 mb-2">✨ ההטבות שלכם:</h4>
          <ul className="text-sm text-slate-700 space-y-1">
            <li>• גישה מוקדמת לפרויקטים חדשים</li>
            <li>• הנחות בלעדיות מיזמים</li>
            <li>• תוכן חינמי על עולם הנדל"ן</li>
            <li>• ייעוץ אישי ממומחי Arena</li>
          </ul>
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
              id="marketing"
              checked={formData.acceptMarketing}
              onCheckedChange={(checked) => setFormData({ ...formData, acceptMarketing: checked })}
            />
            <Label htmlFor="marketing" className="text-sm cursor-pointer">
              אני מסכים/ה לקבל עדכונים, הצעות והטבות שיווקיות מ-Arena AI ומשותפים
            </Label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
            הצטרף למועדון
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            ביטול
          </Button>
        </div>
      </form>
    </div>
  );
}