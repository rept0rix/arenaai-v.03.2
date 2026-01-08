import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Building, Mail, Phone, Globe, MapPin, Edit } from 'lucide-react';

export default function CompanyProfileView() {
  // Mock data
  const companyInfo = {
    name: 'חברת בניה ופיתוח בע"מ',
    email: 'info@company.co.il',
    phone: '03-1234567',
    website: 'www.company.co.il',
    address: 'רח\' הרצל 123, תל אביב',
    description: 'חברת בניה ופיתוח מובילה עם ניסיון של 20+ שנים בשוק הנדל"ן הישראלי',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80'
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">פרופיל חברה</h1>
        <p className="text-slate-600">ניהול פרטי החברה והפרופיל הציבורי</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Logo */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>לוגו החברה</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="w-32 h-32 bg-slate-100 rounded-lg mx-auto mb-4 overflow-hidden">
                <img 
                  src={companyInfo.logo} 
                  alt="Company Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 ml-1" />
                שנה לוגו
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Company Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>פרטי החברה</CardTitle>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 ml-1" />
                ערוך
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">שם החברה</label>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                  <Building className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-900">{companyInfo.name}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">אימייל</label>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-900">{companyInfo.email}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">טלפון</label>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                  <Phone className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-900">{companyInfo.phone}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">אתר אינטרנט</label>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                  <Globe className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-900">{companyInfo.website}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">כתובת</label>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-900">{companyInfo.address}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Description */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>תיאור החברה</CardTitle>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 ml-1" />
              ערוך
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg">
            {companyInfo.description}
          </p>
        </CardContent>
      </Card>

      {/* Marketing Materials */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>חומרי שיווק</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                📄
              </div>
              <p className="text-sm font-medium text-slate-700">ברושור חברה</p>
              <Button variant="link" size="sm" className="mt-2">העלה</Button>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                🎥
              </div>
              <p className="text-sm font-medium text-slate-700">סרטון תדמית</p>
              <Button variant="link" size="sm" className="mt-2">העלה</Button>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                🖼️
              </div>
              <p className="text-sm font-medium text-slate-700">גלריית תמונות</p>
              <Button variant="link" size="sm" className="mt-2">העלה</Button>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                📊
              </div>
              <p className="text-sm font-medium text-slate-700">מצגות</p>
              <Button variant="link" size="sm" className="mt-2">העלה</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}