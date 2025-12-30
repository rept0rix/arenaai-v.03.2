import React from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';

export default function PtContactSection() {
  return (
    <div className="w-full bg-white py-12 border-t border-slate-100" dir="rtl">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="text-right flex-1">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">עדיין מתלבטים?</h3>
            <p className="text-slate-600 mb-6">
              צוות המומחים של Arena בפתח תקוה זמין עבורכם לכל שאלה.
              <br />
              אנחנו כאן כדי לעזור לכם למצוא את הבית הבא.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:*2024" 
                className="flex items-center gap-3 px-5 py-3 bg-white border border-slate-200 rounded-xl hover:border-cyan-400 hover:text-cyan-700 transition-all group shadow-sm"
              >
                <div className="w-10 h-10 bg-cyan-50 rounded-full flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                  <Phone className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">חייגו אלינו</div>
                  <div className="font-bold text-slate-800 text-lg">*2024</div>
                </div>
              </a>
              
              <a 
                href="mailto:pt@arena-ai.org" 
                className="flex items-center gap-3 px-5 py-3 bg-white border border-slate-200 rounded-xl hover:border-cyan-400 hover:text-cyan-700 transition-all group shadow-sm"
              >
                <div className="w-10 h-10 bg-cyan-50 rounded-full flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                  <Mail className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">כתבו לנו</div>
                  <div className="font-bold text-slate-800">pt@arena-ai.org</div>
                </div>
              </a>
            </div>
          </div>

          {/* Quick question bubbles - visual decoration */}
          <div className="relative hidden md:block w-1/3 h-40">
             <div className="absolute top-0 right-0 bg-white p-3 rounded-t-xl rounded-bl-xl shadow-md border border-slate-100 transform rotate-2 z-10">
                <span className="text-sm text-slate-700">איפה יש בתי ספר מצטיינים? 🎓</span>
             </div>
             <div className="absolute top-12 left-4 bg-cyan-50 p-3 rounded-t-xl rounded-br-xl shadow-md border border-cyan-100 transform -rotate-3 z-20">
                <span className="text-sm text-cyan-900">מחפש דירת גן בכפר גנים 🏡</span>
             </div>
             <div className="absolute bottom-0 right-8 bg-white p-3 rounded-t-xl rounded-bl-xl shadow-md border border-slate-100 transform rotate-1 z-10">
                <span className="text-sm text-slate-700">מה התשואה הממוצעת? 📈</span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}