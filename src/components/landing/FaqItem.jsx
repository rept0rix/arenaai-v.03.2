import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function FaqItem({ faq }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const renderText = (text) => {
        return text.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
        ));
    };

    const handleTermsClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(createPageUrl('TermsOfService'));
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
            <div 
                className="flex justify-between items-start cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex-1 pr-4">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.question}</h3>
                    <div className="text-slate-700 space-y-2">
                        {renderText(faq.answer)}
                    </div>
                    {faq.emphasis && (
                        <p className="font-semibold text-sky-700 mt-3">{faq.emphasis}</p>
                    )}
                </div>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                </Button>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: '1.5rem' }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="text-slate-600 space-y-4 text-sm border-r-2 border-sky-200 pr-4">
                            {renderText(faq.details)}
                            
                            {(faq.question.includes("הפרטיות") || faq.question.includes("מגיע המידע")) && (
                                <p className="mt-4">
                                    <a href="#" onClick={handleTermsClick} className="text-sky-600 hover:underline">
                                        לתנאי שימוש ומדיניות פרטיות
                                    </a>
                                </p>
                            )}

                             {faq.question.includes("מגיע המידע") && (
                                <p className="text-xs bg-slate-100 p-3 rounded-lg mt-4">
                                    <strong>⭐ לתשומת לבך:</strong> המידע במערכת ארנה מוצג כפי שנמסר על ידי היזמים, לצד נתונים רשמיים ומחקרים שביצע צוות ארנה. המערכת אינה מעניקה שירותי תיווך ואינה צד לעסקאות נדל"ן – כל התקשרות נעשית ישירות מול היזם או הגורם הרלוונטי. השימוש במערכת כפוף <a href="#" onClick={handleTermsClick} className="text-sky-600 hover:underline">לתקנון האתר ותנאי השימוש</a>.
                                </p>
                             )}
                        </div>
                        <Button 
                            variant="link"
                            onClick={() => setIsExpanded(false)}
                            className="text-sky-600 mt-4 px-0"
                        >
                            סגור
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}