import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CheckCircle, XCircle, AlertTriangle, Eye, Phone, Star, Heart, MapPin, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function ComparisonTable({ properties, userPreferences, onToggleFavorite, favoriteIds = [] }) {
    const navigate = useNavigate();
    const [helpOpen, setHelpOpen] = useState(false);

    // Find the leading property (highest matchScore)
    const leadingProperty = properties.reduce((prev, current) => 
        (current.matchScore || 0) > (prev.matchScore || 0) ? current : prev
    , properties[0]);

    // Define all parameters to compare
    const parameters = [
        { key: 'price', label: 'מחיר', type: 'number', format: (val) => `₪${val?.toLocaleString()}`, preference: userPreferences?.budget },
        { key: 'rooms', label: 'מספר חדרים', type: 'number', preference: userPreferences?.rooms },
        { key: 'size', label: 'שטח (מ"ר)', type: 'number', preference: userPreferences?.minSize },
        { key: 'property_type', label: 'סוג נכס', type: 'text', preference: userPreferences?.propertyType },
        { key: 'floor', label: 'קומה', type: 'number' },
        { key: 'parking', label: 'חניה', type: 'boolean' },
        { key: 'elevator', label: 'מעלית', type: 'boolean' },
        { key: 'balcony', label: 'מרפסת', type: 'boolean' },
        { key: 'storage', label: 'מחסן', type: 'boolean' },
        { key: 'developer', label: 'יזם', type: 'text' },
        { key: 'location', label: 'מיקום', type: 'text' },
    ];

    const getValueDisplay = (property, param) => {
        const value = property[param.key];
        
        if (value === undefined || value === null) {
            return { display: 'אין מידע', status: 'missing', icon: <AlertTriangle className="w-4 h-4" /> };
        }

        if (param.type === 'boolean') {
            if (value) {
                return { display: 'קיים', status: 'positive', icon: <CheckCircle className="w-4 h-4" /> };
            } else {
                return { display: 'חסר', status: 'negative', icon: <XCircle className="w-4 h-4" /> };
            }
        }

        if (param.type === 'number') {
            const formatted = param.format ? param.format(value) : value;
            
            if (param.preference !== undefined) {
                if (param.key === 'price' && value > param.preference) {
                    return { 
                        display: formatted, 
                        status: 'warning', 
                        note: 'גבוה מההעדפה',
                        icon: <AlertTriangle className="w-4 h-4" />
                    };
                }
                if (param.key === 'rooms' && value < param.preference) {
                    return { 
                        display: formatted, 
                        status: 'warning', 
                        note: 'פחות מההעדפה',
                        icon: <AlertTriangle className="w-4 h-4" />
                    };
                }
            }
            
            return { display: formatted, status: 'neutral', icon: <CheckCircle className="w-4 h-4" /> };
        }

        if (param.type === 'text') {
            if (param.preference && value.toLowerCase() !== param.preference.toLowerCase()) {
                return { 
                    display: value, 
                    status: 'warning', 
                    note: 'שונה מההעדפה',
                    icon: <AlertTriangle className="w-4 h-4" />
                };
            }
            return { display: value, status: 'neutral' };
        }

        return { display: value, status: 'neutral' };
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'positive': return 'text-green-600 bg-green-50';
            case 'negative': return 'text-red-600 bg-red-50';
            case 'warning': return 'text-orange-600 bg-orange-50';
            case 'missing': return 'text-gray-500 bg-gray-50';
            default: return 'text-slate-700 bg-white';
        }
    };

    const handleParameterClick = (paramLabel, propertyTitle, value) => {
        toast.info(`מסביר על ${paramLabel}`, {
            description: `Arena תסביר בקרוב למה "${value}" של ${propertyTitle} מתאים לך (או פחות).`
        });
    };

    return (
        <div className="w-full">
            {/* Help Bubble */}
            <div className="flex justify-end mb-4">
                <Popover open={helpOpen} onOpenChange={setHelpOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-2 text-slate-600 hover:text-slate-900">
                            <HelpCircle className="w-4 h-4 text-sky-500" />
                            רוצה להבין איך לקרוא את ההשוואה?
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96" align="end">
                        <div className="space-y-3">
                            <h4 className="font-bold text-slate-900">איך לקרוא את ההשוואה הזו</h4>
                            <div className="space-y-2 text-sm text-slate-700">
                                <div>
                                    <strong>1. אחוז ההתאמה</strong>
                                    <p className="text-slate-600">מראה עד כמה הנכס מתאים למה שסיפרת ל-Arena בשיחה ובבחירות שלך.</p>
                                </div>
                                <div>
                                    <strong>2. ההבדלים בין הנכסים</strong>
                                    <p className="text-slate-600">כל שורה מדגישה מה חיזק או החליש את ההתאמה של כל נכס ביחס לאחרים.</p>
                                </div>
                                <div>
                                    <strong>3. רוצה להבין למה?</strong>
                                    <p className="text-slate-600">אפשר ללחוץ על כל פריט ו-Arena תסביר בצ׳אט למה זה מתאים – או פחות.</p>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Properties Header Cards */}
            <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `repeat(${properties.length}, minmax(280px, 1fr))` }}>
                {properties.map((property, index) => {
                    const isFavorite = favoriteIds.includes(property.id);
                    const isLeading = property.id === leadingProperty.id;
                    
                    return (
                        <motion.div
                            key={property.id}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            whileHover={{ 
                                scale: 1.03, 
                                y: -5,
                                transition: { duration: 0.2 } 
                            }}
                        >
                            <Card className={`overflow-hidden transition-all duration-300 ${
                                isLeading 
                                    ? 'ring-4 ring-purple-400 shadow-2xl shadow-purple-300/60 bg-gradient-to-br from-purple-50 to-white' 
                                    : 'hover:shadow-xl hover:ring-2 hover:ring-teal-300'
                            }`}>
                                <div className="relative h-48">
                                    <img 
                                        src={property.image_url} 
                                        alt={property.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="absolute top-3 left-3 rounded-full bg-white/90 hover:bg-white"
                                        onClick={() => onToggleFavorite(property.id)}
                                    >
                                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                                    </Button>
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
                                        <span className="text-base font-bold text-sky-600">
                                            {property.matchScore || 85}%
                                        </span>
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-bold text-lg text-slate-900 mb-1 line-clamp-1">{property.title}</h3>
                                    <div className="flex items-center gap-1 text-sm text-slate-600 mb-3">
                                        <MapPin className="w-3 h-3" />
                                        <span className="line-clamp-1">{property.location}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            className={`flex-1 transition-all duration-300 ${
                                                isLeading 
                                                    ? 'bg-purple-50 border-purple-300 hover:bg-purple-100 hover:border-purple-400' 
                                                    : 'hover:bg-teal-50 hover:border-teal-400'
                                            }`}
                                            onClick={() => navigate(createPageUrl(`PropertyDetails?id=${property.id}`))}
                                        >
                                            <Eye className="w-3 h-3 ml-1" />
                                            צפה
                                        </Button>
                                        <Button 
                                           size="sm" 
                                           variant="outline"
                                           className="flex-1 hover:bg-sky-50 hover:border-sky-400"
                                           onClick={() => handleParameterClick('נכס', property.title, 'חקירה מלאה')}
                                        >
                                           <HelpCircle className="w-3 h-3 ml-1" />
                                           חקר
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Comparison Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="border-slate-200">
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <TooltipProvider>
                                <table className="w-full" style={{ backgroundColor: '#FFFFFF' }}>
                                    <tbody>
                                        {parameters.map((param, idx) => (
                                            <motion.tr 
                                                key={param.key}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 + idx * 0.03 }}
                                                className={`${idx % 2 === 0 ? '' : 'bg-[#F7FAFD]'} hover:bg-slate-100 transition-colors`}
                                                style={{ borderBottom: '1px solid #E6EEF6' }}
                                            >
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <td 
                                                            className="p-4 font-semibold text-slate-700 sticky right-0 bg-slate-50 min-w-[150px] cursor-help"
                                                            style={{ borderLeft: '1px solid #D9E5F2' }}
                                                        >
                                                            {param.label}
                                                        </td>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="left">
                                                        <p className="text-xs">איך זה השפיע על ההתאמה שלך?</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                                {properties.map((property) => {
                                                    const valueData = getValueDisplay(property, param);
                                                    
                                                    const getCellBg = (status) => {
                                                        if (status === 'positive') return '#E8F4F2';
                                                        if (status === 'negative' || status === 'warning') return '#F6E9EE';
                                                        return 'transparent';
                                                    };
                                                    
                                                    const getCellTextColor = (status) => {
                                                        if (status === 'positive') return '#1F6F6A';
                                                        if (status === 'negative' || status === 'warning') return '#7A2E3A';
                                                        return '#4A5D73';
                                                    };
                                                    
                                                    return (
                                                        <td 
                                                            key={property.id} 
                                                            className="p-4 min-w-[250px] transition-all cursor-pointer"
                                                            style={{ 
                                                                borderLeft: '1px solid #D9E5F2',
                                                                backgroundColor: getCellBg(valueData.status)
                                                            }}
                                                            onClick={() => handleParameterClick(param.label, property.title, valueData.display)}
                                                        >
                                                            <motion.div 
                                                                whileHover={{ scale: 1.02 }}
                                                                className="p-2 rounded-lg transition-all"
                                                            >
                                                                <div 
                                                                    className="font-medium"
                                                                    style={{ color: getCellTextColor(valueData.status) }}
                                                                >
                                                                    {valueData.display}
                                                                </div>
                                                            </motion.div>
                                                        </td>
                                                    );
                                                })}
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </TooltipProvider>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}