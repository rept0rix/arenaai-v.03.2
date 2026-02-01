import React, { useState } from 'react';
import { 
  MapPin, Train, Bus, ShoppingCart, Home, Waves, School, 
  Flower, TreePine, Dumbbell, Volume2, Wind, House, BedDouble,
  Building2, ArrowUp, ShieldCheck, Package, Bike, PartyPopper,
  DollarSign, TrendingUp, Users, Baby, GraduationCap, Map,
  Info, ChevronDown, HelpCircle
} from 'lucide-react';

const AccordionSection = ({ title, isOpen, onClick, children }) => (
  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <button
      onClick={onClick}
      className="w-full px-6 py-4 flex items-center justify-between text-right hover:bg-slate-50 transition-colors"
    >
      <span className="text-lg font-bold text-slate-900">{title}</span>
      <ChevronDown 
        className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    {isOpen && (
      <div className="px-6 pb-6 border-t border-slate-100">
        {children}
      </div>
    )}
  </div>
);

const InfoRow = ({ icon: Icon, label, value, helpText }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 group">
    <div className="flex items-center gap-3 flex-1">
      <Icon className="w-5 h-5 text-sky-600 flex-shrink-0" />
      <span className="text-slate-700">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="font-semibold text-slate-900">{value || 'לא זמין'}</span>
      {helpText && (
        <div className="relative group/tooltip">
          <HelpCircle className="w-4 h-4 text-slate-400 cursor-help hover:text-sky-600" />
          <div className="absolute left-0 bottom-full mb-2 w-64 bg-slate-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 shadow-xl">
            {helpText}
            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
          </div>
        </div>
      )}
    </div>
  </div>
);

const MapThumbnail = ({ property }) => (
  <div className="mt-4 pt-4 border-t border-slate-100">
    <div className="bg-slate-100 rounded-lg h-32 flex items-center justify-center relative overflow-hidden cursor-pointer hover:bg-slate-200 transition-colors">
      <Map className="w-8 h-8 text-slate-400" />
      <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 opacity-0 hover:opacity-100 transition-opacity">
        <span className="text-white text-sm font-medium">לחץ לצפייה במפה</span>
      </div>
    </div>
  </div>
);

const ComingSoonBadge = () => (
  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">בקרוב</span>
);

export default function PropertyDetailsAccordion({ property }) {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-4">
      {/* קבוצה 1: מיקום וסביבה קרובה */}
      <AccordionSection
        title="מיקום וסביבה"
        isOpen={openSections.location}
        onClick={() => toggleSection('location')}
      >
        <div className="mt-4 space-y-1">
          <InfoRow 
            icon={MapPin} 
            label="קרבה לכביש מהיר" 
            value="800 מ׳" 
            helpText="מרחקים מחושבים בקו הליכה או נסיעה קצרים, לצורך הבנת נגישות יומיומית."
          />
          <InfoRow icon={Train} label="קרבה לרכבת" value="1.2 ק״מ" />
          <InfoRow icon={Train} label="קרבה לרכבת קלה" value="500 מ׳" />
          <InfoRow icon={Bus} label="תדירות אוטובוס" value="כל 10 דק׳" />
          <InfoRow icon={ShoppingCart} label="קרבה למרכז קניות" value="1.5 ק״מ" />
          <InfoRow icon={Home} label="קרבה למרכז קהילתי" value="300 מ׳" />
          <InfoRow icon={Waves} label="קרבה לים" value="5 ק״מ" />
        </div>
        <MapThumbnail property={property} />
      </AccordionSection>

      {/* קבוצה 2: חינוך, משפחה וקהילה */}
      <AccordionSection
        title="משפחה וקהילה"
        isOpen={openSections.community}
        onClick={() => toggleSection('community')}
      >
        <div className="mt-4 space-y-1">
          <InfoRow 
            icon={School} 
            label="קרבה לבית ספר" 
            value="400 מ׳" 
            helpText="הנתונים משקפים שירותים זמינים במרחק הליכה או נסיעה קצרה."
          />
          <InfoRow icon={Flower} label="קרבה לגן משחקים" value="200 מ׳" />
          <InfoRow icon={TreePine} label="קרבה לפארק קטן" value="150 מ׳" />
          <InfoRow icon={TreePine} label="קרבה לפארק גדול" value="1 ק״מ" />
          <InfoRow icon={Dumbbell} label="קרבה למתקני כושר ציבוריים" value="600 מ׳" />
        </div>
      </AccordionSection>

      {/* קבוצה 3: תנאי סביבה */}
      <AccordionSection
        title="תנאי סביבה"
        isOpen={openSections.environment}
        onClick={() => toggleSection('environment')}
      >
        <div className="mt-4 space-y-1">
          <InfoRow 
            icon={Volume2} 
            label="רמת רעש באזור" 
            value="בינונית" 
            helpText="מדד סביבתי יחסי המבוסס על קרבה לתשתיות רועשות. להשוואה בלבד."
          />
          <InfoRow 
            icon={Wind} 
            label="רמת זיהום אוויר" 
            value="נמוכה" 
            helpText="מדד סביבתי כללי לצורך מידע. אינו משפיע על דירוג הנכס."
          />
          <InfoRow icon={MapPin} label="טיפוס רחוב" value="רחוב צדדי" />
        </div>
      </AccordionSection>

      {/* קבוצה 4: מאפייני הנכס */}
      <AccordionSection
        title="מאפייני הדירה"
        isOpen={openSections.features}
        onClick={() => toggleSection('features')}
      >
        <div className="mt-4 space-y-1">
          <InfoRow 
            icon={House} 
            label="גודל דירה" 
            value={`${property.size || 0} מ״ר`}
            helpText="מאפיינים פיזיים של הדירה כפי שנמסרו על ידי היזם."
          />
          <InfoRow icon={BedDouble} label="מספר חדרים" value={property.rooms || 0} />
          <InfoRow icon={Building2} label="קומה" value={property.floor || 'לא ידוע'} />
          <InfoRow icon={Wind} label="כיווני אוויר" value="3 כיוונים" />
          <InfoRow icon={House} label="גודל חלונות" value="גדולים" />
          <InfoRow icon={House} label="סלון" value="32 מ״ר" />
          <InfoRow icon={House} label="מרפסת" value={property.balcony ? '12 מ״ר' : 'אין'} />
          <InfoRow icon={House} label="מטבח גדול" value={property.features?.includes('מטבח גדול') ? 'כן' : 'לא'} />
          <InfoRow icon={House} label="פינת עבודה" value="כן" />
        </div>
      </AccordionSection>

      {/* קבוצה 5: חדרים */}
      <AccordionSection
        title="חדרי שינה"
        isOpen={openSections.bedrooms}
        onClick={() => toggleSection('bedrooms')}
      >
        <div className="mt-4 space-y-1">
          <InfoRow icon={BedDouble} label="חדר שינה 1" value="14 מ״ר" />
          <InfoRow icon={BedDouble} label="חדר שינה 2" value="12 מ״ר" />
          <InfoRow icon={BedDouble} label="חדר שינה 3" value="10 מ״ר" />
          <InfoRow icon={BedDouble} label="חדר שינה 4" value="9 מ״ר" />
        </div>
      </AccordionSection>

      {/* קבוצה 6: הבניין והשירותים */}
      <AccordionSection
        title="הבניין"
        isOpen={openSections.building}
        onClick={() => toggleSection('building')}
      >
        <div className="mt-4 space-y-1">
          <InfoRow 
            icon={ArrowUp} 
            label="מעלית" 
            value={property.elevator ? 'כן' : 'לא'}
            helpText="שירותים המוצעים בבניין עצמו."
          />
          <InfoRow icon={ShieldCheck} label="ממ״ד" value={property.features?.includes('ממ״ד') ? 'כן' : 'לא'} />
          <InfoRow icon={Package} label="מחסן" value="5 מ״ר" />
          <InfoRow icon={Bike} label="מחסן אופניים" value="כן" />
          <InfoRow icon={House} label="חניות" value={property.parking ? '1' : 'אין'} />
          <InfoRow icon={PartyPopper} label="חדר אירועים" value="כן" />
          <InfoRow icon={Dumbbell} label="חדר כושר" value="כן" />
          <InfoRow icon={Waves} label="בריכה" value="לא" />
          <InfoRow icon={ShieldCheck} label="עמדת שומר" value="כן" />
        </div>
      </AccordionSection>

      {/* קבוצה 7: כלכלה ועלויות */}
      <AccordionSection
        title="עלויות וערך"
        isOpen={openSections.economics}
        onClick={() => toggleSection('economics')}
      >
        <div className="mt-4 space-y-1">
          <InfoRow 
            icon={DollarSign} 
            label="מחיר הנכס" 
            value={`₪${(property.price || 0).toLocaleString()}`}
          />
          <InfoRow icon={DollarSign} label="תחזוקה חודשית" value="₪450" />
          <InfoRow icon={DollarSign} label="ארנונה למ״ר" value="₪18" />
          <InfoRow 
            icon={TrendingUp} 
            label="תשואת שכירות" 
            value="4.2%"
            helpText="הערכה סטטיסטית המבוססת על נתוני אזור. אינה התחייבות."
          />
          <InfoRow icon={TrendingUp} label="עליית ערך" value="+8% בשנה" />
        </div>
      </AccordionSection>

      {/* קבוצה 8: סטטיסטיקה שכונתית */}
      <AccordionSection
        title="מאפייני אוכלוסייה"
        isOpen={openSections.demographics}
        onClick={() => toggleSection('demographics')}
      >
        <div className="mt-4 space-y-1">
          <InfoRow 
            icon={Users} 
            label="אחוז מעל גיל 60" 
            value="22%"
            helpText="נתונים סטטיסטיים כלליים לצורך הבנת אופי השכונה."
          />
          <InfoRow icon={GraduationCap} label="אחוז אקדמאים" value="68%" />
          <InfoRow icon={Baby} label="ילדים ממוצע למשפחה" value="2.1" />
        </div>

        {/* גרפים פשוטים */}
        <div className="mt-6 space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">גיל 60+</span>
              <span className="font-semibold text-slate-900">22%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-sky-500 h-2 rounded-full" style={{ width: '22%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-600">אקדמאים</span>
              <span className="font-semibold text-slate-900">68%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
        </div>
      </AccordionSection>

      {/* "בקרוב" - נתונים עתידיים */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-slate-400" />
          נתונים נוספים בקרוב
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>ביטחון באזור</span>
            <ComingSoonBadge />
          </div>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>סוג נוף</span>
            <ComingSoonBadge />
          </div>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>רמת גימור</span>
            <ComingSoonBadge />
          </div>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>פיתוח עתידי</span>
            <ComingSoonBadge />
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-4">
          בקרוב – נתונים מחושבים שיוצגו עם הרחבת המערכת.
        </p>
      </div>
    </div>
  );
}