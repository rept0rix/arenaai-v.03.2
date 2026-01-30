import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Calculator, PiggyBank, CreditCard, TrendingUp } from 'lucide-react';

export default function FinancingCalculator({ property, onFinancingClick }) {
  const [downPayment, setDownPayment] = useState(30);
  const [loanTerm, setLoanTerm] = useState(25);
  const [interestRate, setInterestRate] = useState(4.5);
  
  const propertyPrice = property.price || 4500000;
  const downPaymentAmount = Math.round(propertyPrice * downPayment / 100);
  const loanAmount = propertyPrice - downPaymentAmount;
  const monthlyPayment = Math.round(loanAmount * (interestRate/100/12) * Math.pow(1 + interestRate/100/12, loanTerm*12) / (Math.pow(1 + interestRate/100/12, loanTerm*12) - 1));

  const mortgageOptions = [
    { 
      name: 'משכנתא קלאסית', 
      rate: '4.2%', 
      monthly: Math.round(monthlyPayment * 0.95),
      description: 'ריבית קבועה לכל התקופה'
    },
    { 
      name: 'משכנתא משתנה', 
      rate: '3.8%', 
      monthly: Math.round(monthlyPayment * 0.88),
      description: 'ריבית משתנה לפי בנק ישראל'
    },
    { 
      name: 'משכנתא מעורבת', 
      rate: '4.0%', 
      monthly: Math.round(monthlyPayment * 0.91),
      description: 'שילוב של ריבית קבועה ומשתנה'
    },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          מחשבון מימון
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Calculator Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">מקדמה ({downPayment}%)</label>
            <Slider
              value={[downPayment]}
              onValueChange={(value) => setDownPayment(value[0])}
              max={50}
              min={10}
              step={5}
              className="mb-2"
            />
            <div className="text-sm text-slate-600">
              ₪{downPaymentAmount.toLocaleString()}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">תקופת הלוואה ({loanTerm} שנים)</label>
            <Slider
              value={[loanTerm]}
              onValueChange={(value) => setLoanTerm(value[0])}
              max={35}
              min={10}
              step={5}
              className="mb-2"
            />
            <div className="text-sm text-slate-600">
              {loanTerm} שנים
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-sm text-slate-600 mb-1">תשלום חודשי</div>
              <div className="text-2xl font-bold text-blue-600">
                ₪{monthlyPayment.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-slate-600 mb-1">סכום הלוואה</div>
              <div className="text-2xl font-bold text-slate-900">
                ₪{loanAmount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Mortgage Options */}
        <div>
          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <PiggyBank className="w-4 h-4" />
            אפשרויות מימון
          </h4>
          <div className="space-y-3">
            {mortgageOptions.map((option, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="font-semibold text-slate-900">{option.name}</h5>
                    <p className="text-sm text-slate-600">{option.description}</p>
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-slate-600">ריבית</div>
                    <div className="font-bold text-green-600">{option.rate}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">תשלום חודשי</span>
                  <span className="text-lg font-bold text-slate-900">
                    ₪{option.monthly.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button className="w-full md:w-auto" onClick={onFinancingClick}>
            <CreditCard className="w-4 h-4 ml-2" />
            קבל הצעת מימון מותאמת
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}