import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft } from 'lucide-react';

export default function PtKeyMessage({ icon, title, shortText, highlightText, longText }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLong, setShowLong] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (isOpen) setShowLong(false); // Reset to short view on close
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleOpen}
        className="flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-white/80 rounded-full backdrop-blur-md border border-white/50 shadow-sm transition-all duration-300 hover:scale-105 text-slate-800 font-medium text-sm group"
      >
        <span className="text-lg">{icon}</span>
        <span>{title}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 md:w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50"
          >
            <div className="bg-gradient-to-r from-[#174C6B] to-[#1d5b7e] p-3 flex justify-between items-center text-white">
              <div className="flex items-center gap-2 font-bold text-sm">
                {icon} {title}
              </div>
              <button onClick={toggleOpen} className="hover:bg-white/20 rounded-full p-1 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 text-right">
              {!showLong ? (
                <div className="space-y-3">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {shortText}
                  </p>
                  {highlightText && (
                    <p className="text-sm font-bold text-[#174C6B] bg-cyan-50 p-2 rounded-lg border border-cyan-100">
                      {highlightText}
                    </p>
                  )}
                  <button 
                    onClick={() => setShowLong(true)}
                    className="text-xs font-bold text-[#A67C52] flex items-center gap-1 hover:underline mt-2"
                  >
                    המשך לקרוא
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-300">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {longText}
                  </p>
                  <button 
                    onClick={() => setShowLong(false)}
                    className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 mt-2"
                  >
                    חזרה לתקציר
                  </button>
                </div>
              )}
            </div>
            
            {/* Arrow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-sm border-r border-b border-slate-100"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}