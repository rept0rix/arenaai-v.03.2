import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import TopNavigation from '../components/TopNavigation';
import PropertyHeader from '../components/property_details/PropertyHeader';
import PropertyGallery from '../components/property_details/PropertyGallery';
import PropertySpecs from '../components/property_details/PropertySpecs';
import PropertyDescription from '../components/property_details/PropertyDescription';
import PropertyFeatures from '../components/property_details/PropertyFeatures';
import LocationMap from '../components/property_details/LocationMap';
import PriceAnalysis from '../components/property_details/PriceAnalysis';
import FinancingCalculator from '../components/property_details/FinancingCalculator';
import PropertyServices from '../components/property_details/PropertyServices';
import CompanyInfo from '../components/property_details/CompanyInfo';
import SimilarProperties from '../components/property_details/SimilarProperties';
import PropertyReviews from '../components/property_details/PropertyReviews';
import FloatingTips from '../components/property_details/FloatingTips';
import ChatInterface from '../components/chat/ChatInterface';
import { Loader2, MessageCircle, X } from 'lucide-react';
import { Property } from '@/entities/Property';
import { ChatSession } from '@/entities/ChatSession';
import { ChatQuestion } from '@/entities/ChatQuestion';
import { User as UserEntity } from '@/entities/User';

// This transformation function might become redundant if the Property entity handles it internally.
// However, as it's not explicitly removed in the outline, we keep it.
const transformPropertyData = (item) => {
  if (!item || !item.asset || !item.project) return null;
  const { asset, project, company } = item;
  const propertyTypeMapping = { 1: 'דירה', 2: 'פנטהאוז', 3: 'דופלקס', 4: 'סטודיו' };
  return {
    id: asset.id,
    title: `דירת ${asset.numRooms} חדרים ב${project.nameHe}`,
    description: asset.technicalSpecificationsText || `נכס בפרויקט ${project.nameHe}.`,
    price: asset.price,
    location: project.address,
    property_type: propertyTypeMapping[asset.assetTypeId] || 'נכס',
    rooms: asset.numRooms,
    size: asset.sizeSqm,
    floor: asset.floorNumber,
    parking: asset.parkingSpots > 0,
    elevator: project.tags?.some(tag => tag.name === 'מעלית'),
    balcony: asset.balconySizeSqm > 0,
    image_url: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
    raw_data: item,
  };
};

export default function PropertyDetails() {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    
    const [property, setProperty] = useState(location.state?.property || null);
    const [similarProperties, setSimilarProperties] = useState([]);
    const [viewCount, setViewCount] = useState(0);
    const [isLoading, setIsLoading] = useState(!location.state?.property);
    const [error, setError] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatSession, setChatSession] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkUser();
        loadQuestions();
        const propertyId = searchParams.get('id');
        setViewCount(Math.floor(Math.random() * 150) + 50);
        
        // If property data wasn't passed through navigation state, fetch it.
        if (!location.state?.property && propertyId) {
            fetchData(propertyId);
        } else if (location.state?.property) {
            // If property exists in location state, fetch similar properties.
            fetchSimilar(location.state.property);
        }
    }, [searchParams]);

    const loadQuestions = async () => {
        try {
            const questionsData = await ChatQuestion.list('order');
            const activeQuestions = questionsData.filter(q => q.is_active);
            setQuestions(activeQuestions);
        } catch (error) {
            console.error('Failed to load questions:', error);
            setQuestions([]);
        }
    };

    useEffect(() => {
        if (user && !chatSession) {
            initializeChatSession();
        }
    }, [user, chatSession]);

    const checkUser = async () => {
        try {
            const currentUser = await UserEntity.me();
            setUser(currentUser);
        } catch (error) {
            setUser(null);
        }
    };

    const initializeChatSession = async () => {
        if (!chatSession && user) {
            try {
                const newSession = await ChatSession.create({
                    answers: {},
                    current_question: 0,
                    completed: false,
                    purpose: 'living',
                    is_guided: false
                });
                setChatSession(newSession);
            } catch (err) {
                console.error("Failed to create chat session:", err);
            }
        }
    };

    const handleChatOpen = () => {
        if (!user) {
            UserEntity.loginWithRedirect(window.location.href);
            return;
        }
        setIsChatOpen(true);
        initializeChatSession();
    };

    const fetchData = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedProperty = await Property.get(id); // Use the Property entity to get data
            if (fetchedProperty) {
                setProperty(fetchedProperty);
                await fetchSimilar(fetchedProperty); // Fetch similar properties after current property is loaded
            } else {
                setError('הנכס לא נמצא במערכת');
            }
        } catch (err) {
            console.error("Failed to fetch property from DB:", err);
            setError('שגיאה בטעינת פרטי הנכס. אנא נסה שוב מאוחר יותר.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSimilar = async (currentProperty) => {
        // Ensure currentProperty and its project_name are available before fetching similar properties
        if (currentProperty && currentProperty.raw_data && currentProperty.raw_data.project && currentProperty.raw_data.project.nameHe) {
            try {
                // Assuming Property.filter returns already transformed data suitable for direct use
                const allInProject = await Property.filter({ project_name: currentProperty.raw_data.project.nameHe });
                const similar = allInProject
                    .filter(p => p.id !== currentProperty.id)
                    .slice(0, 4);
                setSimilarProperties(similar);
            } catch (err) {
                console.error("Failed to fetch similar properties:", err);
                // Not a critical error for the main page, so don't set the main error state
            }
        } else {
             console.warn("Cannot fetch similar properties: currentProperty or its project name is missing.");
        }
    };
    
    if (isLoading) {
        return (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-sky-500 mx-auto mb-4" />
              <p className="text-slate-600">טוען פרטי נכס...</p>
            </div>
          </div>
        );
    }

    if (error || !property) {
        return (
            <div>
                <TopNavigation currentPage="PropertyDetails" />
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                      {error || 'הנכס לא נמצא'}
                    </h2>
                    <p className="text-slate-500 mb-6">
                      {error || 'לא הצלחנו למצוא את הנכס שחיפשת.'}
                    </p>
                    <button
                      onClick={() => window.history.back()}
                      className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600"
                    >
                      חזור
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full flex flex-col bg-slate-50">
            {/* Header */}
            <div className="flex-shrink-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
                <TopNavigation currentPage="PropertyDetails" />
            </div>

            {/* Main Content - Split View */}
            <div className="flex-1 min-h-0 flex flex-row">
                {/* Property Details - Left Side */}
                <div className="flex-1 h-full overflow-y-auto border-l border-slate-200">
                    <PropertyHeader property={property} viewCount={viewCount} />
                    
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="grid grid-cols-12 gap-8">
                            {/* Main Content */}
                            <div className="col-span-12 lg:col-span-8">
                                <div className="space-y-8">
                                    <PropertyGallery property={property} />
                                    <PropertySpecs property={property} />
                                    <PropertyDescription property={property} />
                                    <PropertyFeatures property={property} />
                                    <LocationMap property={property} />
                                    <PriceAnalysis property={property} />
                                    <FinancingCalculator property={property} />
                                    <CompanyInfo property={property} />
                                </div>
                            </div>
                            
                            {/* Right Sidebar */}
                            <div className="col-span-12 lg:col-span-4">
                                <PropertyServices property={property} />
                            </div>
                        </div>
                        
                        {/* Full Width Sections */}
                        <div className="mt-12 space-y-12">
                            <PropertyReviews />
                            <SimilarProperties properties={similarProperties} />
                        </div>
                    </div>
                </div>

                {/* Chat Panel - Right Side */}
                <div className="w-96 h-full flex-shrink-0 border-r border-slate-200 bg-white flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
                        <h3 className="text-lg font-semibold text-slate-900">שאלו את ארנה</h3>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        {!user ? (
                            <div className="flex items-center justify-center h-full p-6">
                                <div className="text-center">
                                    <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <p className="text-slate-600 mb-4">התחבר כדי לשאול שאלות על הנכס</p>
                                    <button
                                        onClick={handleChatOpen}
                                        className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                                    >
                                        התחבר
                                    </button>
                                </div>
                            </div>
                        ) : !chatSession ? (
                            <div className="flex items-center justify-center h-full">
                                <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
                            </div>
                        ) : (
                            <ChatInterface
                                questions={questions}
                                currentSession={chatSession}
                                onUpdateAnswer={async () => chatSession}
                                filteredCount={0}
                                isMobile={false}
                                isSelectionMode={false}
                                setIsSelectionMode={() => {}}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}