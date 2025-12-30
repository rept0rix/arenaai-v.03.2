import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SEARCH_PHRASES = [
  "פריסייל חדש בפתח תקווה",
  "דירה מגניבה עד 3 מליון ש\"ח",
  "דירה מוארת ומרווחת מתאימה למשפחות",
  "דירה עם גינה למשפחה עם ילדים קטנים",
  "דירת 3 חדרים - קומה גבוהה ונוף פתוח",
  "דירה עם מטבח גדול ומרפסת לאירוח",
  "דירה להשקעה עם תשואה גבוהה וביקוש קבוע",
  "דירה שקטה עם ירוק מסביב וקהילה חמה"
];

export default function PtAnimatedSearch({ onSearch }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SEARCH_PHRASES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePhraseClick = (phrase) => {
    if (onSearch) onSearch(phrase);
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center" dir="rtl">
      <div className="flex flex-wrap justify-center items-center gap-3">
        <span className="text-slate-800 text-sm font-medium bg-white/50 px-2 py-1 rounded-md backdrop-blur-sm">מחפשים למשל:</span>
        <AnimatePresence mode="wait">
          <motion.button
            key={currentIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            onClick={() => handlePhraseClick(SEARCH_PHRASES[currentIndex])}
            className="bg-white/40 hover:bg-white/60 text-slate-900 px-4 py-2 rounded-full text-sm border border-slate-400/30 transition-colors backdrop-blur-sm shadow-sm"
          >
            {SEARCH_PHRASES[currentIndex]}
          </motion.button>
        </AnimatePresence>
      </div>
    </div>
  );
}