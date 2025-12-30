import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Landmark, PiggyBank, Calculator } from 'lucide-react';

export default function AccordionSection({ property }) {
  return (
    <div className="py-8 bg-slate-50 px-4 rounded-lg">
       <h2 className="text-2xl font-bold mb-4 text-center">בחינת הנכס עם יועץ AI</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>מאפיינים פנימיים</AccordionTrigger>
          <AccordionContent>
            פירוט על מאפייני הפנים של הנכס, כולל סוגי חומרים, גמר, ומערכות.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>מאפיינים חיצוניים</AccordionTrigger>
          <AccordionContent>
            פירוט על מאפייני החוץ, כמו גינה, חזית הבניין, ומתקנים משותפים.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>אפשרויות מימון</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>גלו את אפשרויות המימון והמשכנתא המתאימות לכם בעזרת הכלים שלנו.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border p-4 rounded-lg text-center bg-white">
                  <Landmark className="mx-auto w-8 h-8 text-sky-600 mb-2"/>
                  <h4 className="font-semibold">ייעוץ משכנתא</h4>
                  <p className="text-sm text-slate-500">קבלו ליווי מיועצים מומחים.</p>
                </div>
                 <div className="border p-4 rounded-lg text-center bg-white">
                  <PiggyBank className="mx-auto w-8 h-8 text-sky-600 mb-2"/>
                  <h4 className="font-semibold">בדיקת זכאות</h4>
                  <p className="text-sm text-slate-500">ראו אם אתם זכאים להטבות.</p>
                </div>
                 <div className="border p-4 rounded-lg text-center bg-white">
                  <Calculator className="mx-auto w-8 h-8 text-sky-600 mb-2"/>
                  <h4 className="font-semibold">מחשבון משכנתא</h4>
                  <p className="text-sm text-slate-500">חשבו את ההחזר החודשי.</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}