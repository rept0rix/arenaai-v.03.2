
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, BedDouble, Ruler, Building, MapPin, ExternalLink, Car, Warehouse, Sunset, Calendar, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function PropertyQuickView({ property, onClose }) {
    const navigate = useNavigate();

    if (!property) return null;

    const handleFullDetails = (e) => {
        e.stopPropagation();
        navigate(createPageUrl(`PropertyDetails?id=${property.id}`), { state: { property } });
        onClose();
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={handleBackdropClick}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    dir="rtl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header with close button */}
                    <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex items-center justify-between rounded-t-xl">
                        <h3 className="text-xl font-bold text-slate-800">תצוגה מהירה</h3>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                    
                    {/* Property image */}
                    <div className="relative">
                        <img 
                            src={property.image_url || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'} 
                            alt={property.title} 
                            className="w-full h-64 object-cover" 
                        />
                        <div className="absolute top-4 right-4">
                            <Badge className="bg-white/95 text-slate-900 text-lg font-bold px-3 py-1">
                                ₪{property.price?.toLocaleString()}
                            </Badge>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Property title and location */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">{property.title}</h2>
                            <div className="flex items-center text-slate-600">
                                <MapPin className="w-5 h-5 ml-2" />
                                <span className="text-lg">{property.location}</span>
                            </div>
                        </div>

                        {/* Key specs grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="text-center p-3 bg-slate-50 rounded-lg">
                                <BedDouble className="w-6 h-6 text-sky-600 mx-auto mb-2" />
                                <div className="text-sm text-slate-600">חדרים</div>
                                <div className="font-bold text-slate-900">{property.rooms || '-'}</div>
                            </div>
                            <div className="text-center p-3 bg-slate-50 rounded-lg">
                                <Ruler className="w-6 h-6 text-sky-600 mx-auto mb-2" />
                                <div className="text-sm text-slate-600">גודל</div>
                                <div className="font-bold text-slate-900">{property.size ? `${property.size} מ"ר` : '-'}</div>
                            </div>
                            <div className="text-center p-3 bg-slate-50 rounded-lg">
                                <Building className="w-6 h-6 text-sky-600 mx-auto mb-2" />
                                <div className="text-sm text-slate-600">קומה</div>
                                <div className="font-bold text-slate-900">{property.floor || '-'}</div>
                            </div>
                            <div className="text-center p-3 bg-slate-50 rounded-lg">
                                <Calendar className="w-6 h-6 text-sky-600 mx-auto mb-2" />
                                <div className="text-sm text-slate-600">שנת בנייה</div>
                                <div className="font-bold text-slate-900">{property.year_built || '-'}</div>
                            </div>
                        </div>

                        {/* Additional features */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-slate-900 mb-3">מאפיינים נוספים</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {property.parking && (
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <Car className="w-4 h-4 text-sky-600" />
                                        <span>חניה{property.parking_spots ? ` (${property.parking_spots} מקומות)` : ''}</span>
                                    </div>
                                )}
                                {property.balcony && (
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <Sunset className="w-4 h-4 text-sky-600" />
                                        <span>מרפסת{property.balcony_size ? ` (${property.balcony_size} מ"ר)` : ''}</span>
                                    </div>
                                )}
                                {property.storage && (
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <Warehouse className="w-4 h-4 text-sky-600" />
                                        <span>מחסן{property.storage_size ? ` (${property.storage_size} מ"ר)` : ''}</span>
                                    </div>
                                )}
                                {property.elevator && (
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <Zap className="w-4 h-4 text-sky-600" />
                                        <span>מעלית</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Property description */}
                        {property.description && (
                            <div className="mb-6">
                                <h4 className="font-semibold text-slate-900 mb-3">תיאור</h4>
                                <p className="text-slate-700 leading-relaxed line-clamp-4">
                                    {property.description}
                                </p>
                            </div>
                        )}

                        {/* Developer and project info */}
                        {(property.developer || property.project_name) && (
                            <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                                <h4 className="font-semibold text-slate-900 mb-2">פרטי פרויקט</h4>
                                <div className="space-y-1 text-slate-700">
                                    {property.developer && <div><strong>יזם:</strong> {property.developer}</div>}
                                    {property.project_name && <div><strong>פרויקט:</strong> {property.project_name}</div>}
                                </div>
                            </div>
                        )}

                        {/* Action button */}
                        <div className="pt-4 border-t border-slate-200">
                            <Button 
                                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3"
                                onClick={handleFullDetails}
                            >
                                <ExternalLink className="w-5 h-5 ml-2" />
                                צפה בפרטים המלאים
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
