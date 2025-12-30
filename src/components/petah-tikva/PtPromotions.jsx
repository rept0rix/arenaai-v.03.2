import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Star, Building, Gift, Smartphone, CreditCard } from 'lucide-react';

export default function PtPromotions() {
  const navigate = useNavigate();

  const handlePromotionClick = () => {
    navigate(createPageUrl('ArenaClub'));
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-8" dir="rtl">
      <div className="flex flex-col items-center gap-4">
        {/* Star Label */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-50 px-4 py-2 rounded-full border border-amber-200 shadow-sm">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
          <span className="font-bold text-amber-900">משתתף במבצע - לרוכשים עד 31.3.2026</span>
        </div>

        {/* Promotions Banner - Clean Glassmorphism */}
        <div className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-slate-800 rounded-2xl p-4 shadow-sm relative overflow-hidden">
          
          <div className="flex flex-wrap justify-around items-center gap-4 text-center">
            
            {/* Developer Offer */}
            <div 
              onClick={handlePromotionClick}
              className="flex flex-col items-center gap-1 flex-1 min-w-[140px] cursor-pointer hover:bg-white/10 rounded-xl p-2 transition-colors duration-200 group"
            >
              <Building className="w-6 h-6 text-[#174C6B] mb-1 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-base md:text-lg text-slate-900">250,000 ש״ח</span>
              <span className="text-sm font-medium text-[#174C6B] drop-shadow-sm">מבצע יזמים</span>
            </div>
            
            <div className="w-[2px] h-10 bg-slate-400/50 hidden md:block rounded-full"></div>
            
            {/* Mortgage Insurance */}
            <div 
              onClick={handlePromotionClick}
              className="flex flex-col items-center gap-1 flex-1 min-w-[140px] cursor-pointer hover:bg-white/10 rounded-xl p-2 transition-colors duration-200 group"
            >
              <CreditCard className="w-6 h-6 text-[#174C6B] mb-1 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-base md:text-lg text-slate-900">ביטוח משכנתא חינם</span>
              <span className="text-sm font-medium text-[#174C6B] drop-shadow-sm">לשנה שלמה</span>
            </div>
            
            <div className="w-[2px] h-10 bg-slate-400/50 hidden md:block rounded-full"></div>
            
            {/* Smartphone */}
            <div 
              onClick={handlePromotionClick}
              className="flex flex-col items-center gap-1 flex-1 min-w-[140px] cursor-pointer hover:bg-white/10 rounded-xl p-2 transition-colors duration-200 group"
            >
              <Smartphone className="w-6 h-6 text-[#174C6B] mb-1 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-base md:text-lg text-slate-900">טלפון חכם מתנה</span>
              <span className="text-sm font-medium text-[#174C6B] drop-shadow-sm">ל-50 רוכשים ראשונים</span>
            </div>
            
            <div className="w-[2px] h-10 bg-slate-400/50 hidden md:block rounded-full"></div>
            
            {/* Benefits Club */}
            <div 
              onClick={handlePromotionClick}
              className="flex flex-col items-center gap-1 flex-1 min-w-[140px] cursor-pointer hover:bg-white/10 rounded-xl p-2 transition-colors duration-200 group"
            >
              <Gift className="w-6 h-6 text-[#174C6B] mb-1 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-base md:text-lg text-slate-900">מועדון הטבות לפתח תקוה</span>
              <span className="text-sm font-medium text-[#174C6B] drop-shadow-sm">בשיתוף חנויות מובחרות בעיר</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}