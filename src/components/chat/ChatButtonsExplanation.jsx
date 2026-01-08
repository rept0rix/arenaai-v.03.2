import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, Compass, MessageSquareMore, MousePointer2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const explanations = [
  {
    title: "מסע מודרך",
    icon: Compass,
    description: "במצב זה, אני אציג לך שאלות אחת אחרי השנייה. זה עוזר לנו לדייק את החיפוש ולמצוא את הנכס המתאים ביותר עבורך בקלות.",
  },
  {
    title: "שיחה פתוחה",
    icon: MessageSquareMore,
    description: "כאן תוכל לשאול אותי כל שאלה על נכסים, אזורים או כל נושא אחר שקשור לנדל״ן. אני אשתמש בבינה מלאכותית כדי לענות לך בצורה הטובה ביותר.",
  },
  {
    title: "בחר אלמנט",
    icon: MousePointer2,
    description: "בעזרת כפתור 'בחר' תוכל להצביע על כל חלק בעמוד הנכס (למשל, מחיר, חדרים, קומה) ולקבל ממני הסבר מעמיק עליו באופן מיידי.",
  },
];

export default function ChatButtonsExplanation({ onClose, isMobile }) {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, explanations.length - 1));
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const currentExplanation = explanations[step];

  const ExplanationContent = () => {
    const Icon = currentExplanation.icon;
    return (
      <div className="p-4">
        <div className="text-center mb-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon className="w-5 h-5 text-sky-500" />
            <h3 className="font-bold text-lg text-slate-800">{currentExplanation.title}</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">{currentExplanation.description}</p>
        </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          disabled={step === 0}
          className="text-slate-600 hover:bg-slate-100"
        >
          <ChevronRight className="w-4 h-4" />
          הקודם
        </Button>
        <div className="text-sm text-slate-500">
          {step + 1} מתוך {explanations.length}
        </div>
        {step < explanations.length - 1 ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            className="text-slate-600 hover:bg-slate-100"
          >
            הבא
            <ChevronLeft className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={onClose}
            className="bg-sky-500 hover:bg-sky-600 text-white"
          >
            הבנתי!
          </Button>
        )}
      </div>
    </div>
    );
  };

  // Mobile: Full screen modal
  if (isMobile) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <ExplanationContent />
        </DialogContent>
      </Dialog>
    );
  }

  // Desktop: Popup above buttons
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="absolute bottom-full right-0 mb-2 w-full"
      >
        <Card className="relative bg-white shadow-lg border border-slate-200">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-2 left-2 w-6 h-6 text-slate-500 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </Button>
          <ExplanationContent />
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}