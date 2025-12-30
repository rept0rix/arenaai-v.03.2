
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FeatureCard({ feature, onCtaClick }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const CtaSection = () => {
    if (!feature.cta) return null;

    if (feature.cta.type === 'financing') {
      return (
        <div className="mt-4 pt-4 border-t border-slate-200 text-center space-y-3">
            <p className="text-sm text-slate-600 font-medium">{feature.cta.pre_text}</p>
            <h4 className="text-base font-bold text-slate-800">{feature.cta.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{feature.cta.description}</p>
            <div className="flex justify-center gap-3 pt-2">
                <Button 
                    onClick={() => window.location.href = '/Financing'}
                    className="bg-sky-500 hover:bg-sky-600"
                >
                    ✅ כן, בואו נבדוק
                </Button>
                <Button 
                    onClick={() => setIsExpanded(false)}
                    variant="outline"
                >
                    ❌ לא כרגע
                </Button>
            </div>
        </div>
      );
    }

    if (feature.cta.type === 'simple') {
      return (
        <div className="mt-4 pt-4 border-t border-slate-200 text-center">
          <Button 
            onClick={() => onCtaClick(feature.cta.purpose)}
            className="bg-sky-500 hover:bg-sky-600"
          >
            {feature.cta.text}
          </Button>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0">
          <img src={feature.icon} alt={feature.title} className="w-12 h-12 object-contain" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
      </div>
      
      <p className="text-slate-600 leading-relaxed mb-4 flex-grow">{feature.description}</p>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="text-slate-600 space-y-3 pb-4 text-sm border-r-2 border-sky-100 pr-4">
              {feature.long_description.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <CtaSection />

            {feature.disclaimer && (
                <p className="text-xs text-slate-500 pt-3 border-t border-slate-200 mt-4">
                  <strong>דיסקליימר:</strong> {feature.disclaimer}
                </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-auto text-sky-600 hover:text-sky-700 hover:bg-sky-50 self-start px-3"
      >
        {isExpanded ? 'סגור' : 'קרא עוד'}
        {isExpanded ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
      </Button>
    </div>
  );
}
