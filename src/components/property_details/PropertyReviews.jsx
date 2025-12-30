import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, User, ThumbsUp } from 'lucide-react';

export default function PropertyReviews() {
  const reviews = [
    {
      id: 1,
      name: "דני כהן",
      rating: 5,
      date: "לפני שבוע",
      comment: "דירה מדהימה במיקום מעולה! החברה מאוד מקצועית ושירותית. ממליץ בחום!",
      helpful: 12
    },
    {
      id: 2,
      name: "שרה לוי",
      rating: 4,
      date: "לפני שבועיים",
      comment: "נכס יפה וחדש. יש כמה נקודות שצריך לשפר אבל בסך הכל מרוצה מאוד.",
      helpful: 8
    },
    {
      id: 3,
      name: "אמיר אברהם",
      rating: 5,
      date: "לפני חודש",
      comment: "קנינו דירה מהחברה והיא מושלמת. גימורים איכותיים ושירות מצוין.",
      helpful: 15
    },
    {
      id: 4,
      name: "מיכל דוד",
      rating: 4,
      date: "לפני חודשיים",
      comment: "מיקום מעולה קרוב לכל מה שצריך. הדירה מרווחת ונוחה למשפחה.",
      helpful: 6
    }
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">מה אומרים על הנכס?</h2>
        <p className="text-slate-600">חוות דעת ממש של דיירים וקונים</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= averageRating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-slate-600">
                מבוסס על {reviews.length} ביקורות
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{review.name}</div>
                        <div className="text-sm text-slate-500">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed mb-4">{review.comment}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.helpful} אנשים מצאו את זה מفיד</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}