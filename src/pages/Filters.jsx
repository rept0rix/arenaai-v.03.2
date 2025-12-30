
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Search, MessageCircle, Sun, Mountain, ParkingSquare, Baby, Train, Recycle, Home, Building, ArrowUp, HeartPulse, School, TreePine, ShoppingCart, Dumbbell, DollarSign, BedDouble, MapPin, Calendar, Star, Info, Landmark } from 'lucide-react';
import { createPageUrl } from '@/utils';
import TopNavigation from '../components/TopNavigation';

const FilterSection = ({ title, icon, children }) => (
    <AccordionItem value={title}>
        <AccordionTrigger className="text-lg font-semibold hover:no-underline">
            <div className="flex items-center gap-3">
                {icon}
                {title}
            </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4 px-1 space-y-4">
            {children}
        </AccordionContent>
    </AccordionItem>
);

const CheckboxOption = ({ id, label, icon }) => (
    <div className="flex items-center space-x-2 space-x-reverse">
        <Checkbox id={id} />
        <label htmlFor={id} className="flex items-center gap-2 text-base font-medium text-slate-800 cursor-pointer">
            {icon}
            {label}
        </label>
    </div>
);

export default function Filters() {
    const navigate = useNavigate();
    const [budget, setBudget] = useState([1000000, 7000000]);

    const handleApplyFilters = () => {
        // Here you would gather all filter states and pass them to the results page
        // For now, it just navigates back
        navigate(createPageUrl('Chat'));
    };
    
    const startGuidedProcess = () => {
        navigate(createPageUrl('Home'));
    };

    const specialFeatures = [
        { id: "balcony", label: "מרפסת שמש", icon: <Sun className="w-5 h-5 text-yellow-500" /> },
        { id: "view", label: "נוף פתוח", icon: <Mountain className="w-5 h-5 text-green-600" /> },
        { id: "underground_parking", label: "חניה תת קרקעית", icon: <ParkingSquare className="w-5 h-5 text-blue-500" /> },
        { id: "kindergarten", label: "קרבה לגני ילדים", icon: <Baby className="w-5 h-5 text-pink-500" /> },
        { id: "train", label: "קרבה לרכבת", icon: <Train className="w-5 h-5 text-purple-500" /> },
        { id: "green_project", label: "פרויקט ירוק", icon: <Recycle className="w-5 h-5 text-green-500" /> },
        { id: "penthouse", label: "פנטהאוז / גג", icon: <Home className="w-5 h-5 text-indigo-500" /> },
        { id: "investment", label: "דירה להשקעה", icon: <DollarSign className="w-5 h-5 text-teal-500" /> },
        { id: "tama", label: "פרויקט תמ\"א", icon: <Building className="w-5 h-5 text-orange-500" /> },
        { id: "high_floor", label: "קומה גבוהה", icon: <ArrowUp className="w-5 h-5 text-cyan-500" /> },
    ];
    
    const poiFeatures = [
        { id: "medical", label: "מרכזים רפואיים", icon: <HeartPulse className="w-5 h-5 text-red-500" /> },
        { id: "education", label: "מוסדות חינוך", icon: <School className="w-5 h-5 text-blue-600" /> },
        { id: "parks", label: "פארקים וטבע", icon: <TreePine className="w-5 h-5 text-green-700" /> },
        { id: "synagogue", label: "בתי כנסת", icon: <Landmark className="w-5 h-5 text-blue-800" /> },
        { id: "shopping", label: "מרכזי קניות", icon: <ShoppingCart className="w-5 h-5 text-orange-600" /> },
        { id: "sports", label: "ספורט ובריכות", icon: <Dumbbell className="w-5 h-5 text-slate-700" /> },
    ];

    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <TopNavigation currentPage="Filters" />
            <div className="max-w-4xl mx-auto p-4 sm:p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">🎯 התאם את החיפוש שלך</h1>
                    <p className="text-lg text-slate-600">מצא פרויקטים שמתאימים למה שחשוב לך</p>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-sky-400 to-blue-500 text-white p-6 rounded-2xl mb-8 text-center shadow-lg">
                    <h3 className="text-2xl font-bold mb-3">רוצה ש־Arena תתאים עבורך את הנכסים?</h3>
                    <p className="mb-4">תוכל לסנן לבד, או להיעזר בסוכנת החכמה לבחירה מדויקת יותר.</p>
                    <Button 
                        onClick={startGuidedProcess}
                        variant="secondary" 
                        className="bg-white/90 text-sky-700 hover:bg-white"
                    >
                        התחל תהליך מותאם אישי 💬
                    </Button>
                </div>

                <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3']} className="w-full">
                    {/* Budget */}
                    <FilterSection title="תקציב" icon={<DollarSign className="w-6 h-6 text-green-600"/>}>
                        <div className="flex items-center gap-4">
                            <span className="font-bold w-40 text-right">מ- {budget[0].toLocaleString()} ₪</span>
                            <Slider
                                value={[budget[0]]}
                                onValueChange={(val) => setBudget([val[0], budget[1]])}
                                min={500000}
                                max={10000000}
                                step={100000}
                            />
                        </div>
                         <div className="flex items-center gap-4">
                            <span className="font-bold w-40 text-right">עד {budget[1].toLocaleString()} ₪</span>
                            <Slider
                                value={[budget[1]]}
                                onValueChange={(val) => setBudget([budget[0], val[0]])}
                                min={500000}
                                max={10000000}
                                step={100000}
                            />
                        </div>
                    </FilterSection>

                    {/* Rooms */}
                    <FilterSection title="מספר חדרים" icon={<BedDouble className="w-6 h-6 text-purple-600"/>}>
                         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <CheckboxOption id="rooms-2" label="2 חדרים" />
                            <CheckboxOption id="rooms-3" label="3 חדרים" />
                            <CheckboxOption id="rooms-4" label="4 חדרים" />
                            <CheckboxOption id="rooms-5" label="5+ חדרים" />
                         </div>
                    </FilterSection>

                    {/* Area */}
                    <FilterSection title="אזור" icon={<MapPin className="w-6 h-6 text-red-600"/>}>
                        <Input placeholder="הקלד עיר או שכונה..." className="text-base" />
                    </FilterSection>

                    {/* Occupancy Date */}
                    <FilterSection title="מועד אכלוס" icon={<Calendar className="w-6 h-6 text-blue-600"/>}>
                        <Select>
                            <SelectTrigger className="w-full text-base">
                                <SelectValue placeholder="בחר מועד אכלוס" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="now">מיידי</SelectItem>
                                <SelectItem value="3m">עד 3 חודשים</SelectItem>
                                <SelectItem value="6m">עד 6 חודשים</SelectItem>
                                <SelectItem value="1y">עד שנה</SelectItem>
                                <SelectItem value="2y">מעל שנה</SelectItem>
                            </SelectContent>
                        </Select>
                    </FilterSection>

                    {/* Special Features */}
                    <FilterSection title="מאפיינים מיוחדים" icon={<Star className="w-6 h-6 text-yellow-500"/>}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-5">
                            {specialFeatures.map(f => <CheckboxOption key={f.id} {...f} />)}
                        </div>
                    </FilterSection>
                    
                    {/* Environment POI */}
                    <FilterSection title="סביבת מגורים" icon={<TreePine className="w-6 h-6 text-green-700"/>}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-5">
                             {poiFeatures.map(f => <CheckboxOption key={f.id} {...f} />)}
                        </div>
                    </FilterSection>

                    {/* Developer/Project */}
                    <FilterSection title="יזם / פרויקט" icon={<Building className="w-6 h-6 text-slate-600"/>}>
                        <Input placeholder="חפש לפי שם יזם או פרויקט..." className="text-base"/>
                    </FilterSection>
                    
                    {/* Status */}
                    <FilterSection title="מצב הנכס" icon={<Info className="w-6 h-6 text-teal-600"/>}>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <CheckboxOption id="status-ready" label="מוכן לאכלוס" />
                            <CheckboxOption id="status-soon" label="לקראת אכלוס" />
                            <CheckboxOption id="status-building" label="בבנייה" />
                            <CheckboxOption id="status-presale" label="תחילת שיווק" />
                         </div>
                    </FilterSection>
                </Accordion>

                {/* Bottom CTA */}
                <div className="sticky bottom-0 py-4 bg-slate-50/80 backdrop-blur-sm border-t border-slate-200 mt-8">
                    <Button 
                        onClick={handleApplyFilters}
                        size="lg" 
                        className="w-full text-lg bg-sky-500 hover:bg-sky-600"
                    >
                        <Search className="ml-2 h-5 w-5" />
                        הצג נכסים
                    </Button>
                </div>
            </div>
        </div>
    );
}
