import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Star, Award, Phone, Mail } from 'lucide-react';

export default function CompanyInfo({ property }) {
  const companyData = {
    name: "חברת הבנייה הישראלית",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=100&q=80",
    rating: 4.8,
    reviews: 156,
    projects: 23,
    experience: 15,
    description: "חברת בנייה מובילה עם ניסיון של 15 שנה בתחום הבנייה האיכותית. מתמחים בבנייה ירוקה ובטכנולוגיות מתקדמות.",
    achievements: [
      "פרס איכות הבנייה 2023",
      "הסמכה ירוקה",
      "ISO 9001 מוסמך"
    ]
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          על החברה
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Company Header */}
        <div className="flex items-start gap-4">
          <img 
            src={companyData.logo}
            alt={companyData.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900">{companyData.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold">{companyData.rating}</span>
              <span className="text-sm text-slate-600">({companyData.reviews} דירוגים)</span>
            </div>
          </div>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">{companyData.projects}</div>
            <div className="text-sm text-slate-600">פרויקטים</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-xl font-bold text-green-600">{companyData.experience}</div>
            <div className="text-sm text-slate-600">שנות ניסיון</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="text-xl font-bold text-purple-600">A+</div>
            <div className="text-sm text-slate-600">דירוג</div>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-slate-700 leading-relaxed">{companyData.description}</p>
        </div>

        {/* Achievements */}
        <div>
          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-500" />
            הישגים ואישורים
          </h4>
          <div className="space-y-2">
            {companyData.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-slate-700">{achievement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex-1">
            <Phone className="w-4 h-4 ml-2" />
            התקשר
          </Button>
          <Button variant="outline" className="flex-1">
            <Mail className="w-4 h-4 ml-2" />
            שלח מייל
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}