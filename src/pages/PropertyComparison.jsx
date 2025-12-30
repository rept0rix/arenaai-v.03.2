import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Property } from "@/entities/Property";
import { User } from "@/entities/User";
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { createPageUrl } from '@/utils';
import TopNavigation from '../components/TopNavigation';
// FloatingTips import removed
import ComparisonTable from '../components/properties/ComparisonTable';
import { toast } from "sonner";
import { motion } from 'framer-motion';

// Demo data for testing
const demoProperties = [
    {
        id: '1',
        title: 'דירת 4 חדרים בגבעתיים',
        location: 'רח\' המגשימים 12, גבעתיים',
        price: 3200000,
        image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        rooms: 4,
        size: 95,
        property_type: 'דירה',
        floor: 3,
        parking: true,
        elevator: true,
        balcony: true,
        storage: false,
        developer: 'שיכון ובינוי',
        matchScore: 88
    },
    {
        id: '2', 
        title: 'דירת 3 חדרים בתל אביב',
        location: 'רח\' אבן גבירול 45, תל אביב',
        price: 4100000,
        image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
        rooms: 3,
        size: 78,
        property_type: 'דירה',
        floor: 8,
        parking: true,
        elevator: true,
        balcony: false,
        storage: true,
        developer: 'אפריקה ישראל',
        matchScore: 75
    },
    {
        id: '3',
        title: 'פנטהאוז 5 חדרים ברמת השרון',
        location: 'רח\' התמרים 8, רמת השרון',
        price: 5800000,
        image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        rooms: 5,
        size: 130,
        property_type: 'פנטהאוז',
        floor: 12,
        parking: true,
        elevator: true,
        balcony: true,
        storage: true,
        developer: 'דימרי',
        matchScore: 92
    }
];

// Main PropertyComparison Page
export default function PropertyComparison() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showChatHelp, setShowChatHelp] = useState(false);

    // Auto-show chat help after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowChatHelp(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    // Demo user preferences
    const userPreferences = {
        budget: 3500000,
        rooms: 4,
        minSize: 90,
        propertyType: 'דירה'
    };

    const loadComparison = useCallback(async () => {
        setIsLoading(true);
        try {
            const currentUser = await User.me().catch(() => null);
            setUser(currentUser);

            const ids = searchParams.get('ids')?.split(',') || [];
            
            if (ids.length === 0) {
                setProperties(demoProperties);
            } else {
                try {
                    const loadedProperties = await Promise.all(
                        ids.map(async (id) => {
                            const results = await Property.filter({ id });
                            return results[0] || null;
                        })
                    );
                    const validProperties = loadedProperties.filter(p => p);
                    setProperties(validProperties.length > 0 ? validProperties : demoProperties);
                } catch (error) {
                    console.error('Error loading properties:', error);
                    setProperties(demoProperties);
                }
            }
        } catch (error) {
            console.error('Error loading comparison:', error);
            setProperties(demoProperties);
        }
        setIsLoading(false);
    }, [searchParams]);

    useEffect(() => {
        loadComparison();
    }, [loadComparison]);

    const handleToggleFavorite = async (propertyId) => {
        if (!user) {
            toast.error("עליך להתחבר כדי לשמור מועדפים.");
            return;
        }
        const currentFavorites = user.favorite_properties || [];
        const isFavorite = currentFavorites.includes(propertyId);
        const newFavorites = isFavorite
            ? currentFavorites.filter(id => id !== propertyId)
            : [...currentFavorites, propertyId];
        
        try {
            await User.updateMyUserData({ favorite_properties: newFavorites });
            setUser({ ...user, favorite_properties: newFavorites });
            toast.success(isFavorite ? "הנכס הוסר מהמועדפים" : "הנכס נשמר במועדפים!");
        } catch (error) {
            toast.error("שגיאה בעדכון מועדפים.");
        }
    };
    
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <TopNavigation />
            
            <div className="w-full mx-auto py-8">
                <div className="max-w-7xl mx-auto px-6">
                    <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
                        <ArrowLeft className="w-4 h-4 ml-2" /> חזרה
                    </Button>
                    
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-4xl font-bold text-slate-900 mb-3">השוואת נכסים חכמה</h1>
                        <p className="text-lg text-slate-600">
                            בהתבסס על ההעדפות שלך, השווה בין הנכסים המובילים ובחר בביטחון
                        </p>
                    </motion.div>

                    <ComparisonTable 
                        properties={properties}
                        userPreferences={userPreferences}
                        onToggleFavorite={handleToggleFavorite}
                        favoriteIds={user?.favorite_properties || []}
                    />
                </div>
            </div>

            {/* Floating Chat Help Button */}
            {showChatHelp && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    className="fixed bottom-24 right-6 z-40 bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-2xl p-5 max-w-sm border-2 border-purple-300"
                >
                    <button
                        onClick={() => setShowChatHelp(false)}
                        className="absolute -top-2 -left-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg"
                    >
                        ✕
                    </button>
                    <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">AI</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-1">רוצה להבין איך זה עובד? 🤔</h4>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                ארנה כאן כדי להסביר לך את ההשוואה, לענות על שאלות ולעזור לך לקבל את ההחלטה הנכונה.
                            </p>
                        </div>
                    </div>
                    <Button
                        size="sm"
                        onClick={() => navigate(createPageUrl('Chat'))}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-lg"
                    >
                        💬 שאלו את ארנה
                    </Button>
                </motion.div>
            )}

            <motion.button
                onClick={() => setShowChatHelp(!showChatHelp)}
                className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    boxShadow: [
                        '0 0 0 0 rgba(168, 85, 247, 0.4)',
                        '0 0 0 10px rgba(168, 85, 247, 0)',
                        '0 0 0 0 rgba(168, 85, 247, 0)'
                    ]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'loop'
                }}
            >
                <MessageCircle className="w-6 h-6" />
            </motion.button>

            {/* Floating Tips Component removed */}
        </div>
    );
}