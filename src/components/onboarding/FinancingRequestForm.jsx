import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function FinancingRequestForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    monthlyIncome: '',
    existingDebt: '',
    propertyPrice: '',
    acceptTerms: false,
    acceptDataTransfer: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.acceptTerms || !formData.acceptDataTransfer) {
      alert('יש לאשר את תנאי השימוש והסכמה להעברת המידע');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-slate-900 mb-4">בדיקת אפשרויות מימון</h3>
      <p className="text-slate-600 mb-6">מלאו את הפרטים ונבדוק עבורכם את אפשרויות המימון הטובות ביותר</p>
      
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
          <Label htmlFor="monthlyIncome">הכנסה חודשית משפחתית (ברוטו) *</Label>
          <Input
            id="monthlyIncome"
            type="number"
            value={formData.monthlyIncome}
            onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="existingDebt">התחייבויות חודשיות קיימות</Label>
          <Input
            id="existingDebt"
            type="number"
            value={formData.existingDebt}
            onChange={(e) => setFormData({ ...formData, existingDebt: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="propertyPrice">מחיר הנכס המשוער *</Label>
          <Input
            id="propertyPrice"
            type="number"
            value={formData.propertyPrice}
            onChange={(e) => setFormData({ ...formData, propertyPrice: e.target.value })}
            required
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
              אני מסכים/ה להעברת הפרטים שלי לבנקים/יועצי משכנתאות לצורך בדיקת כשירות אשראי
            </Label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1 bg-sky-600 hover:bg-sky-700">
            המשך לבדיקה
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            ביטול
          </Button>
        </div>
      </form>
    </div>
  );
}