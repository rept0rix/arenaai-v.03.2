import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Landmark, PiggyBank, Calculator, CreditCard } from 'lucide-react';

export default function FinancingOptions({ property }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">אפשרויות מימון</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border border-slate-200 p-4 rounded-lg text-center hover:bg-slate-50 cursor-pointer">
            <Landmark className="mx-auto w-8 h-8 text-sky-600 mb-2"/>
            <h4 className="font-semibold mb-1">ייעוץ משכנתא</h4>
            <p className="text-sm text-slate-500">קבלו ליווי מיועצים מומחים</p>
          </div>
          
          <div className="border border-slate-200 p-4 rounded-lg text-center hover:bg-slate-50 cursor-pointer">
            <PiggyBank className="mx-auto w-8 h-8 text-sky-600 mb-2"/>
            <h4 className="font-semibold mb-1">בדיקת זכאות</h4>
            <p className="text-sm text-slate-500">ראו אם אתם זכאים להטבות</p>
          </div>
          
          <div className="border border-slate-200 p-4 rounded-lg text-center hover:bg-slate-50 cursor-pointer">
            <Calculator className="mx-auto w-8 h-8 text-sky-600 mb-2"/>
            <h4 className="font-semibold mb-1">מחשבון משכנתא</h4>
            <p className="text-sm text-slate-500">חישוב החזר חודשי</p>
          </div>
          
          <div className="border border-slate-200 p-4 rounded-lg text-center hover:bg-slate-50 cursor-pointer">
            <CreditCard className="mx-auto w-8 h-8 text-sky-600 mb-2"/>
            <h4 className="font-semibold mb-1">השוואת בנקים</h4>
            <p className="text-sm text-slate-500">מצאו את התנאים הטובים ביותר</p>
          </div>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">הערכת מחיר משוערת</h4>
          <div className="text-2xl font-bold text-sky-600 mb-1">
            ₪ {property.price?.toLocaleString()}
          </div>
          <p className="text-sm text-slate-600">*על בסיס נתוני השוק באזור</p>
        </div>
      </CardContent>
    </Card>
  );
}