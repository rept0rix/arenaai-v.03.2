import React, { useState, useEffect, useCallback } from 'react';
import { User } from '@/entities/User';
import { Property } from '@/entities/Property';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Search, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import TopNavigation from '../components/TopNavigation';
import PropertyCard from '../components/properties/PropertyCard';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from "sonner";
import ArenaClubForm from '../components/onboarding/ArenaClubForm';

export default function SavedProperties() {
    const [savedProperties, setSavedProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [showArenaClubForm, setShowArenaClubForm] = useState(false);
    const navigate = useNavigate();

    const loadSavedProperties = useCallback(async () => {
        setIsLoading(true);
        try {
            const currentUser = await User.me();
            setUser(currentUser);

            if (currentUser && currentUser.favorite_properties && currentUser.favorite_properties.length > 0) {
                const propertyPromises = currentUser.favorite_properties.map(id => 
                    Property.filter({ id: id }).then(res => res[0])
                );
                const propertiesData = (await Promise.all(propertyPromises)).filter(p => p);
                setSavedProperties(propertiesData);
            } else {
                setSavedProperties([]);
            }
        } catch (error) {
            toast.error("יש להתחבר כדי לראות נכסים שמורים.");
            navigate(createPageUrl('Landing'));
        }
        setIsLoading(false);
    }, [navigate]);

    useEffect(() => {
        loadSavedProperties();
    }, [loadSavedProperties]);

    const handleRemoveFavorite = async (propertyId) => {
        const newFavorites = user.favorite_properties.filter(id => id !== propertyId);
        try {
            await User.updateMyUserData({ favorite_properties: newFavorites });
            setUser(prevUser => ({ ...prevUser, favorite_properties: newFavorites }));
            setSavedProperties(prevProps => prevProps.filter(p => p.id !== propertyId));
            toast.success("הנכס הוסר מהמועדפים");
        } catch (error) {
            toast.error("שגיאה בהסרת הנכס מהמועדפים");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            {showArenaClubForm && (
                <ArenaClubForm
                    onClose={() => setShowArenaClubForm(false)}
                    onSuccess={() => {
                        toast.success("הצטרפת בהצלחה ל-Arena Club!");
                    }}
                />
            )}
            <TopNavigation currentPage="SavedProperties" />
            
            <div className="max-w-7xl mx-auto p-4 sm:p-8">
                {/* Header */}
                <div className="mb-8">
                    <Button 
                        variant="ghost" 
                        onClick={() => navigate(-1)}
                        className="mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 ml-2" />
                        חזרה
                    </Button>
                    
                    <div className="flex items-center gap-3 mb-2">
                        <Heart className="w-8 h-8 text-red-500" />
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                            הנכסים השמורים שלי
                        </h1>
                    </div>
                    <p className="text-slate-600">
                        כל הנכסים שסימנת כמועדפים, מחכים לך כאן.
                    </p>
                </div>

                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
                        <p className="text-slate-600">טוען נכסים שמורים...</p>
                    </div>
                ) : savedProperties.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl border border-dashed">
                        <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">עדיין לא שמרת נכסים</h3>
                        <p className="text-slate-600 mb-6">התחל לחפש ולסמן נכסים שאהבת כדי לראות אותם כאן.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button onClick={() => navigate(createPageUrl('Home'))}>
                                <Search className="w-4 h-4 ml-2" />
                                התחל חיפוש חדש
                            </Button>
                            <Button variant="outline" onClick={() => setShowArenaClubForm(true)}>
                                <Award className="w-4 h-4 ml-2" />
                                הצטרף ל-Arena Club
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence>
                        {savedProperties.map((property) => (
                             <motion.div
                                key={property.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative"
                             >
                                <PropertyCard
                                    property={property}
                                    onSelect={() => {}}
                                    onQuickView={(prop) => navigate(createPageUrl(`PropertyDetails?id=${prop.id}`))}
                                    isSelected={true}
                                />
                                <Button 
                                    size="sm"
                                    variant="destructive"
                                    className="absolute top-5 right-5 z-10 opacity-80 hover:opacity-100"
                                    onClick={() => handleRemoveFavorite(property.id)}
                                >
                                    הסר
                                </Button>
                             </motion.div>
                        ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}