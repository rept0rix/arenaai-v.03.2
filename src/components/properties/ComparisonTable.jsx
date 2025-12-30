import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle, Eye, Phone, Star, Heart, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';

export default function ComparisonTable({ properties, userPreferences, onToggleFavorite, favoriteIds = [] }) {
    const navigate = useNavigate();

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

    return (
        <div className="w-full">
            {/* Explainability Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                    <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">AI</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 mb-2">שכבת ההסבריות של ARENA AI</h3>
                                <p className="text-slate-700 leading-relaxed">
                                    ההתאמות וההבדלים המוצגים להלן מחושבים לפי מנגנון ה-CBR (Case-Based Reasoning) של Arena AI - 
                                    המבוסס על הפרופיל האישי שלך, התשובות שמסרת בשיחה, והשוואה מדויקת בין פרמטרי הנכסים. 
                                    כל ציון והערה מותאמים אישית עבורך.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

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
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                                        <span className="text-sm font-bold text-sky-600">
                                            {property.matchScore || 85}% התאמה
                                        </span>
                                    </div>
                                    {isLeading && (
                                        <>
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ type: "spring", stiffness: 500, delay: 0.5 }}
                                                className="absolute top-3 right-3 bg-purple-600 text-white rounded-full p-2 shadow-lg"
                                            >
                                                <Star className="w-5 h-5 fill-white" />
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.7 }}
                                                className="absolute bottom-3 left-0 right-0 mx-3"
                                            >
                                                <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg px-3 py-2 text-center shadow-lg">
                                                    <div className="text-xs font-bold">💜 ההמלצה שלנו עבורך</div>
                                                </div>
                                            </motion.div>
                                        </>
                                    )}
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
                                            className={`flex-1 transition-all duration-300 ${
                                                isLeading 
                                                    ? 'bg-purple-50 border-purple-300 hover:bg-purple-100 hover:border-purple-400' 
                                                    : 'hover:bg-teal-50 hover:border-teal-400'
                                            }`}
                                        >
                                            <Phone className="w-3 h-3 ml-1" />
                                            התקשר
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
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>השוואת פרמטרים</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <tbody>
                                    {parameters.map((param, idx) => (
                                        <motion.tr 
                                            key={param.key}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.5 + idx * 0.05 }}
                                            className={`${idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'} hover:bg-slate-100 transition-colors`}
                                        >
                                            <td className="p-4 font-semibold text-slate-700 border-l border-slate-200 sticky right-0 bg-slate-100 min-w-[150px]">
                                                {param.label}
                                            </td>
                                            {properties.map((property) => {
                                                const valueData = getValueDisplay(property, param);
                                                const isLeading = property.id === leadingProperty.id;
                                                
                                                return (
                                                    <td 
                                                        key={property.id} 
                                                        className={`p-4 border-l border-slate-200 min-w-[250px] transition-all ${
                                                            isLeading ? 'bg-purple-50/30' : ''
                                                        }`}
                                                    >
                                                        <motion.div 
                                                            whileHover={{ scale: 1.05 }}
                                                            className={`flex items-center gap-2 p-2 rounded-lg transition-all ${getStatusColor(valueData.status)}`}
                                                        >
                                                            {valueData.icon && (
                                                                <span className="flex-shrink-0">{valueData.icon}</span>
                                                            )}
                                                            <div className="flex-1">
                                                                <div className="font-medium">{valueData.display}</div>
                                                                {valueData.note && (
                                                                    <div className="text-xs mt-0.5 opacity-80">{valueData.note}</div>
                                                                )}
                                                            </div>
                                                            </motion.div>
                                                            </td>
                                                );
                                            })}
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}