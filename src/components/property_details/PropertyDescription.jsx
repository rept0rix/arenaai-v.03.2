import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function PropertyDescription({ property }) {
  const description = property.description || `
דירת 4 חדרים מרווחת ויפה בבניין חדש ומתוחזק באזור מבוקש. הדירה כוללת סלון גדול ומרווח, מטבח מודרני ומאובזר במלואו, 3 חדרי שינה נוחים וגדולים, 2 חדרי רחצה מעוצבים, ומרפסת שמש מקסימה עם נוף פתוח. 

הנכס מאופיין בגימורים איכותיים, תקרות גבוהות, חלונות גדולים המספקים הרבה אור טבעי, ומיקום מעולה הקרוב לתחבורה ציבורית, מרכזי קניות ומוסדות חינוך איכותיים.

הדירה מושלמת למשפחה המחפשת נוחות, איכות חיים גבוהה ומיקום מרכזי. בבניין יש מעלית, חניה תת קרקעית ומחסן.
  `.trim();

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          תיאור הנכס
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-slate max-w-none">
          {description.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-slate-700 leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}