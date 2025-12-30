
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Shield, TrendingUp, AlertTriangle, CheckCircle, Info, X, Send, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';

export default function FloatingTips() {
  const [isOpen, setIsOpen] = useState(false);

  const tips = [
    {
      icon: Shield,
      title: "בדיקת עורך דין",
      content: "ודא שכל המסמכים תקינים לפני החתימה על הסכם",
      type: "warning"
    },
    {
      icon: TrendingUp,
      title: "מגמות שוק",
      content: "האזור נמצא במגמת עלייה של 3.2% בשנה האחרונה",
      type: "success"
    },
    {
      icon: Lightbulb,
      title: "טיפ חכם",
      content: "בדוק את תוכניות הפיתוח העירוניות באזור",
      type: "info"
    },
    {
      icon: AlertTriangle,
      title: "נקודות לבדיקה",
      content: "מומלץ לבדוק מצב התשתיות והצנרת בנכס זה",
      type: "warning"
    },
    {
      icon: CheckCircle,
      title: "יתרונות הנכס",
      content: "מיקום מעולה ליד תחבורה ציבורית ומרכזי קניות",
      type: "success"
    },
    {
      icon: Info,
      title: "מידע נוסף",
      content: "הנכס נמצא באזור מתפתח עם תוכניות להקמת פארק חדש",
      type: "info"
    }
  ];

  const getTypeStyles = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-slate-50 border-slate-200 text-slate-800';
    }
  };

  return (
    <>
      {/* Floating Button with Dialog */}
      <motion.div
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center gap-4"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 1 }}
      >
        {/* Speech Bubble */}
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-white p-3 rounded-xl rounded-br-none shadow-lg border border-slate-200 hidden md:block"
        >
            <p className="text-slate-800 font-medium text-sm">אני עדיין כאן 😉 איך אפשר לעזור?</p>
        </motion.div>

        {/* Floating Button (bigger) */}
        <motion.div
          onClick={() => setIsOpen(true)}
          className="cursor-pointer"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-20 h-20 rounded-full bg-white hover:bg-gray-50 shadow-2xl hover:shadow-3xl border border-slate-100 transition-all duration-300 flex items-center justify-center"
          >
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/a1d576606_a-icon-shadow1.png" 
              alt="Arena AI" 
              className="w-12 h-12"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Tips Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Modal - Bubble Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96 z-50"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-slate-100/50 overflow-hidden backdrop-blur-sm">
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-50 to-white p-6 pb-4 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center shadow-md">
                        <img 
                          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/a1d576606_a-icon-shadow1.png" 
                          alt="Arena AI" 
                          className="w-6 h-6"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">ARENA TIPS</h3>
                        <p className="text-sm text-slate-500">תובנות חכמות לקבלת החלטה נכונה</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 rounded-full hover:bg-slate-100"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 max-h-96 overflow-y-auto bg-white">
                  <div className="space-y-3">
                    {tips.map((tip, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-3 rounded-xl border flex items-start gap-3 shadow-sm ${getTypeStyles(tip.type)}`}
                      >
                        <tip.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">{tip.title}</p>
                          <p className="text-xs leading-relaxed mt-1">{tip.content}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Interactive Section */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="bg-slate-50/70 rounded-2xl p-4 shadow-inner">
                        <form className="relative">
                        <Textarea
                            placeholder="מה תרצה לשאול את היועץ החכם?"
                            className="w-full p-4 pr-12 text-base rounded-xl border-slate-200 focus-visible:ring-1 focus-visible:ring-sky-400 resize-none bg-white shadow-sm placeholder:text-slate-400"
                            rows={2}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="absolute left-3 top-3 bg-slate-800 hover:bg-slate-900 rounded-xl shadow-md"
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                        </form>
                        
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200">
                        <Button variant="ghost" size="sm" className="rounded-xl">
                            <Compass className="w-4 h-4 ml-2" />
                            כרטיסיות מידע
                        </Button>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
