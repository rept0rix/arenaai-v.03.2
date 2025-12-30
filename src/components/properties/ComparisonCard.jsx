import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BedDouble, Ruler, Building2, HardHat, Star, Eye, Phone, RefreshCw, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { createPageUrl } from '@/utils';

const FactorItem = ({ factor, isPositive = true }) => {
    const Icon = isPositive ? CheckCircle : AlertTriangle;
    const color = isPositive ? 'text-green-600' : 'text-amber-600';
    const bgColor = isPositive ? 'bg-green-50' : 'bg-amber-50';

    return (
        <div className={`flex items-start gap-3 p-3 rounded-lg text-sm ${bgColor}`}>
            <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${color}`} />
            <div className="flex-1">
                <span className="font-semibold text-slate-800">{factor.name}</span>
                <p className="text-slate-600 leading-snug">{factor.description}</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold whitespace-nowrap">
                <span className={color}>
                    {isPositive ? '+' : '-'}{factor.contribution.toFixed(1)}%
                </span>
            </div>
        </div>
    );
};

export default function ComparisonCard({ property, matchDetails, isFavorite, onToggleFavorite, onReplace }) {
    const navigate = useNavigate();

    return (
        <motion.div 
            className="w-[380px] flex-shrink-0 bg-white rounded-2xl shadow-lg border border-slate-200/80 flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative">
                <img 
                    src={property.image_url} 
                    alt={property.title} 
                    className="w-full h-48 object-cover rounded-t-2xl" 
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-md">
                    <div className="text-center">
                        <p className="text-xl font-bold text-sky-600">{matchDetails.score?.toFixed(1)}%</p>
                        <p className="text-xs text-slate-600">התאמה</p>
                    </div>
                </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-1 truncate">{property.title}</h3>
                <p className="text-slate-500 mb-3">{property.location}</p>
                <p className="text-2xl font-bold text-slate-900 mb-4">₪{property.price?.toLocaleString()}</p>
                
                {/* Technical Details */}
                <div className="border-t border-b border-slate-200 my-4 py-3 grid grid-cols-2 gap-y-4 text-sm">
                    <div className="flex items-center gap-2">
                        <BedDouble className="w-4 h-4 text-slate-500" />
                        <span className="font-medium">{property.rooms} חדרים</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-slate-500" />
                        <span className="font-medium">{property.size} מ"ר</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-500" />
                        <span className="font-medium">קומה {property.floor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <HardHat className="w-4 h-4 text-slate-500" />
                        <span className="font-medium truncate">{property.developer}</span>
                    </div>
                </div>

                {/* Match Breakdown */}
                <div className="space-y-4 mb-4">
                    <div>
                        <h4 className="font-bold text-slate-800 mb-2">מדוע הנכס הזה נבחר (גורמי התאמה):</h4>
                        <div className="space-y-2">
                            {matchDetails.positiveFactors.map((factor, i) => <FactorItem key={i} factor={factor} isPositive={true} />)}
                        </div>
                    </div>
                    {matchDetails.negativeFactors.length > 0 && (
                        <div>
                            <h4 className="font-bold text-slate-800 mb-2">תחומי דאגה (חוסר התאמה פוטנציאלי):</h4>
                            <div className="space-y-2">
                                {matchDetails.negativeFactors.map((factor, i) => <FactorItem key={i} factor={factor} isPositive={false} />)}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-4 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" onClick={() => onToggleFavorite(property.id)}>
                            <Star className={`w-4 h-4 ml-2 ${isFavorite ? 'text-yellow-400 fill-current' : ''}`} />
                            {isFavorite ? 'הסר ממועדפים' : 'שמור למועדפים'}
                        </Button>
                        <Button variant="outline" onClick={() => navigate(createPageUrl(`PropertyDetails?id=${property.id}`))}>
                            <Eye className="w-4 h-4 ml-2" />
                            צפה בפרויקט
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline">
                            <Phone className="w-4 h-4 ml-2" />
                            צור קשר
                        </Button>
                        <Button variant="ghost" onClick={() => onReplace(property.id)} className="text-slate-600">
                            <RefreshCw className="w-4 h-4 ml-2" />
                            החלף נכס
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}