import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Property } from "@/entities/Property";
import { User } from "@/entities/User";
import { ChatSession } from "@/entities/ChatSession";
import { ChatQuestion } from "@/entities/ChatQuestion";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { createPageUrl } from '@/utils';
import TopNavigation from '../components/TopNavigation';
import ComparisonTable from '../components/properties/ComparisonTable';
import ChatInterface from '../components/chat/ChatInterface';
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
    const [chatSession, setChatSession] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [isSelectionMode, setIsSelectionMode] = useState(false);

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

            // Load questions
            const questionsData = await ChatQuestion.list('order');
            const activeQuestions = questionsData.filter(q => q.is_active);
            setQuestions(activeQuestions);

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

            // Initialize or load chat session
            const sessionId = searchParams.get('sessionId');
            if (sessionId) {
                try {
                    const sessions = await ChatSession.filter({ id: sessionId });
                    if (sessions.length > 0) {
                        setChatSession(sessions[0]);
                    }
                } catch (error) {
                    console.error('Error loading session:', error);
                }
            }

            if (!chatSession && currentUser) {
                const newSession = await ChatSession.create({
                    answers: {},
                    current_question: 0,
                    completed: false,
                    purpose: 'living',
                    is_guided: false
                });
                setChatSession(newSession);
            }
        } catch (error) {
            console.error('Error loading comparison:', error);
            setProperties(demoProperties);
        }
        setIsLoading(false);
    }, [searchParams, chatSession]);

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

    const updateAnswer = async (question, answer) => {
        if (!chatSession) return chatSession;
        
        const newSessionAnswers = { ...chatSession.answers };
        if (question === 'ai_analysis') {
            Object.entries(answer).forEach(([field, value]) => {
                const matchingQuestion = questions.find(q => q.filter_field === field);
                const questionId = matchingQuestion ? matchingQuestion.id : `${field}_q`;
                newSessionAnswers[questionId] = value;
            });
        } else {
            newSessionAnswers[question.id] = answer;
        }
        
        try {
            const updatedSession = await ChatSession.update(chatSession.id, {
                answers: newSessionAnswers
            });
            setChatSession(updatedSession);
            return updatedSession;
        } catch (error) {
            console.error("Failed to update session:", error);
            return chatSession;
        }
    };

    const contextMessage = {
        type: 'comparison',
        title: `מבצע השוואה בין ${properties.length} נכסים`,
        details: properties.map(p => p.title).join(' • '),
        message: 'איזה נכס מתאים לך יותר? אני כאן לעזור!'
    };

    return (
        <div className="h-screen w-full flex flex-col bg-slate-50">
            <div className="flex-shrink-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
                <Button variant="ghost" onClick={() => navigate(-1)}>
                    <ArrowLeft className="w-4 h-4 ml-2" /> חזרה
                </Button>
                <TopNavigation currentPage="PropertyComparison" />
            </div>

            <div className="flex-1 min-h-0 flex flex-row">
                <div className="flex-1 h-full overflow-y-auto border-l border-slate-200">
                    <div className="max-w-7xl mx-auto px-6 py-8">
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

                <div className="w-96 h-full flex-shrink-0 border-r border-slate-200 bg-white">
                    {chatSession && (
                        <ChatInterface
                            questions={questions}
                            currentSession={chatSession}
                            onUpdateAnswer={updateAnswer}
                            filteredCount={properties.length}
                            isMobile={false}
                            isSelectionMode={isSelectionMode}
                            setIsSelectionMode={setIsSelectionMode}
                            contextMessage={contextMessage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}