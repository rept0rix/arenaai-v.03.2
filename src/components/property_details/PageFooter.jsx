import React from 'react';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function PageFooter() {
  return (
    <footer className="bg-gradient-to-t from-sky-100 to-white text-slate-800 py-12 mt-8">
      <div className="container mx-auto text-center">
         <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/a1d576606_a-icon-shadow1.png" 
            alt="Arena AI" 
            className="w-16 h-16 mx-auto mb-4"
          />
        <p className="max-w-xl mx-auto mb-6 text-slate-600">
          Arena AI - פלטפורמת הנדל"ן החכמה שמספקת לך 360 מעלות של תובנות וכלים לקבלת ההחלטה הנכונה ביותר.
        </p>
        <div className="flex justify-center gap-4 mb-8">
            <Button variant="ghost">אודות</Button>
            <Button variant="ghost">צור קשר</Button>
            <Button variant="ghost">תנאי שימוש</Button>
            <Button variant="ghost">מדיניות פרטיות</Button>
        </div>
        <div className="flex justify-center gap-6">
            <Facebook className="w-6 h-6 text-slate-500 hover:text-sky-600 cursor-pointer"/>
            <Instagram className="w-6 h-6 text-slate-500 hover:text-sky-600 cursor-pointer"/>
            <Linkedin className="w-6 h-6 text-slate-500 hover:text-sky-600 cursor-pointer"/>
            <Twitter className="w-6 h-6 text-slate-500 hover:text-sky-600 cursor-pointer"/>
        </div>
        <p className="text-sm text-slate-500 mt-8">&copy; {new Date().getFullYear()} Arena AI. כל הזכויות שמורות.</p>
      </div>
    </footer>
  );
}