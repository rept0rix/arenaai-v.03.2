import React from 'react';
import { motion } from 'framer-motion';
import { Map, Sparkles, BrainCircuit } from 'lucide-react';

export default function PtOnboardingCards() {
  const cards = [
    {
      icon: <Sparkles className="w-8 h-8 text-[#174C6B]" />,
      title: "ברוך הבא למהדורה המיוחדת של Arena לפתח תקוה",
      description: "מערכת חכמה לבחירת הדירה המושלמת בעיר החדשנות",
      color: "bg-cyan-50"
    },
    {
      icon: <Map className="w-8 h-8 text-[#174C6B]" />,
      title: "בדוק התאמה לכל שכונה בעיר",
      description: "המערכת תציע לך את השכונות המובילות בפתח תקוה המתאימות לאורח החיים שלך",
      color: "bg-yellow-50" // "לימון עדין" ish
    },
    {
      icon: <BrainCircuit className="w-8 h-8 text-[#174C6B]" />,
      title: "ניתוח חכם ומותאם אישית",
      description: "המערכת מנתחת צרכים אישיים, תחבורה, חינוך, קהילה ונגישות וממליצה על ההתאמות הטובות ביותר עבורך",
      color: "bg-cyan-50"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12" dir="rtl">
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className={`${card.color} rounded-2xl p-8 text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow`}
          >
            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight">
              {card.title}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}