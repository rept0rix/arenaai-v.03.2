import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChatQuestion } from "@/entities/ChatQuestion";
import { ChatSession } from "@/entities/ChatSession";
import PropertyResults from '../components/properties/PropertyResults';
import ChatInterface from '../components/chat/ChatInterface';
import TopNavigation from '../components/TopNavigation';
import PropertyQuickView from '../components/properties/PropertyQuickView';
import { createPageUrl } from '@/utils';
import { mockProperties, getBestFitPropertiesPerProject } from '../components/properties/mockPropertiesData';

export default function Chat() {
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchParams] = useSearchParams();
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const navigate = useNavigate();
  const [selectedPropertyForDetails, setSelectedPropertyForDetails] = useState(null);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [forceShowResults, setForceShowResults] = useState(false);

  // When exiting compare mode, clear selected properties
  useEffect(() => {
    if (!isCompareMode) {
      setSelectedProperties([]);
    }
  }, [isCompareMode]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // When filters are changed, don't force show results unless they are cleared
    if (Object.keys(newFilters).length > 0) {
      setForceShowResults(false);
    }
  };

  const handleViewAll = () => {
    setFilters({});
    setForceShowResults(true);
  };

  const applyFilters = useCallback((currentFilters) => {
    if (!currentFilters || Object.keys(currentFilters).length === 0) {
        setFilteredProperties(properties); // if no filters, show all
        return;
    }

    let tempFiltered = [...properties];

    Object.values(currentFilters).forEach(q => {
      // Ensure q exists and has a filter_field and a non-empty answer
      if (!q || !q.filter_field || q.answer === undefined || q.answer === null || (Array.isArray(q.answer) && q.answer.length === 0) || (typeof q.answer === 'string' && q.answer.trim() === '')) {
          return;
      }
      
      const { filter_field, answer } = q;
      
      switch (filter_field) {
        case 'budget':
            if (typeof answer === 'number') {
                tempFiltered = tempFiltered.filter(p => p.price <= answer);
            }
            break;
        case 'location':
            if (typeof answer === 'string') {
                tempFiltered = tempFiltered.filter(p =>
                    (p.city && p.city.toLowerCase().includes(answer.toLowerCase())) || 
                    (p.location && p.location.toLowerCase().includes(answer.toLowerCase()))
                );
            }
            break;
        case 'rooms':
            if (typeof answer === 'number') {
                tempFiltered = tempFiltered.filter(p => p.rooms >= answer);
            }
            break;
        case 'property_type':
            if (Array.isArray(answer)) { // multiple choice
                tempFiltered = tempFiltered.filter(p => answer.some(a => p.property_type && p.property_type.toLowerCase().includes(a.toLowerCase())));
            } else if (typeof answer === 'string') { // single choice / open
                tempFiltered = tempFiltered.filter(p => p.property_type && p.property_type.toLowerCase().includes(answer.toLowerCase()));
            }
            break;
        default:
            console.warn(`Unknown filter_field: ${filter_field}`);
            break;
      }
    });

    setFilteredProperties(tempFiltered);
  }, [properties]);


  const loadData = useCallback(async () => {
    setIsLoading(true);
    
    try {
      console.log('Loading data...');
      
      // Use mock data with "best fit" logic to avoid showing all properties from same project
      const bestFitProperties = getBestFitPropertiesPerProject(mockProperties);
      
      const questionsData = await ChatQuestion.list('order');
      
      setProperties(bestFitProperties);
      setFilteredProperties(bestFitProperties); // Initial set before filters are applied by useEffect
      
      const activeQuestions = questionsData.filter(q => q.is_active);
      setQuestions(activeQuestions);
      console.log('Mock properties loaded:', bestFitProperties.length);
      console.log('Total mock properties available:', mockProperties.length);
      console.log('Questions loaded:', activeQuestions.length);

      const purpose = searchParams.get('purpose') || 'general';
      const initialQuery = searchParams.get('q');
      const isGuided = searchParams.get('guided') === 'true';

      const sessionData = {
        answers: initialQuery ? { initial_query: initialQuery } : {},
        current_question: 0,
        completed: false,
        purpose: purpose,
        is_guided: isGuided
      };

      const session = await ChatSession.create(sessionData);
      setCurrentSession(session);
      console.log('Session created');

    } catch (error) {
      console.error("Error in loadData:", error);
    }
    
    setIsLoading(false);
  }, [searchParams]);

  useEffect(() => {
    const urlFilters = searchParams.get('filters');
    const developerFilter = searchParams.get('developer');
    
    if (urlFilters) {
        try {
            const parsedFilters = JSON.parse(decodeURIComponent(urlFilters));
            setFilters(parsedFilters);
        } catch(e) {
            console.error("Failed to parse filters from URL", e);
        }
    }
    loadData();
  }, [loadData, searchParams]);

  useEffect(() => {
      if(properties.length > 0) {
        applyFilters(filters);
      }
  }, [properties, filters, applyFilters]);

  const handleSelectProperty = (propertyId) => {
    setSelectedProperties(prev => {
        if (prev.includes(propertyId)) {
            return prev.filter(id => id !== propertyId);
        }
        if (prev.length < 5) { // Changed limit to 5
            return [...prev, propertyId];
        }
        alert('ניתן לבחור עד 5 נכסים להשוואה.');
        return prev;
    });
  };
  
  const handleCompare = () => {
      if (selectedProperties.length < 2) { // Changed condition to >= 2
          alert('יש לבחור שני נכסים לפחות כדי להשוות.');
          return;
      }
      const url = createPageUrl(`PropertyComparison?ids=${selectedProperties.join(',')}&filters=${encodeURIComponent(JSON.stringify(filters))}`);
      navigate(url);
  };

  const updateAnswer = async (question, answer) => {
      if (!currentSession) return;
  
      let newFilters = { ...filters };
      let newSessionAnswers = { ...currentSession.answers };
  
      if (question === 'ai_analysis') {
          // answer is an object of { filter_field: answer_value }
          Object.entries(answer).forEach(([field, value]) => {
              const matchingQuestion = questions.find(q => q.filter_field === field);
              const questionId = matchingQuestion ? matchingQuestion.id : `${field}_q`;
              newFilters[questionId] = { filter_field: field, answer: value };
              newSessionAnswers[questionId] = value;
          });
      } else {
          // question is a full question object
          newFilters[question.id] = { ...question, answer: answer };
          newSessionAnswers[question.id] = answer;
      }
      
      setFilters(newFilters);
  
      try {
          const updatedSession = await ChatSession.update(currentSession.id, {
              answers: newSessionAnswers
          });
          setCurrentSession(updatedSession);
          return updatedSession;
      } catch (error) {
          console.error("Failed to update session:", error);
          return currentSession; // return original session on failure
      }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-slate-600">טוען את המערכת...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Header with Logo */}
      <div className="flex-shrink-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(createPageUrl('Home'))} className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/053b1be56_arenaailogo-new.png" 
              alt="Arena AI" 
              className="h-10"
            />
          </button>
          {selectedPropertyForDetails && (
            <button 
              onClick={() => setSelectedPropertyForDetails(null)}
              className="text-sm text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1"
            >
              ← חזור לתוצאות
            </button>
          )}
        </div>
        <TopNavigation currentPage="Chat" />
      </div>

      <div className="flex-1 min-h-0 flex flex-row">
        <div className="flex-1 h-full border-l border-slate-200">
          <PropertyResults
            properties={filteredProperties}
            totalProperties={properties.length}
            isLoading={isLoading}
            filters={filters}
            selectedProperties={selectedProperties}
            onSelectProperty={handleSelectProperty}
            onCompare={handleCompare}
            isCompareMode={isCompareMode}
            setIsCompareMode={setIsCompareMode}
            onQuickView={setSelectedPropertyForDetails}
            onFiltersChange={handleFiltersChange}
            onViewAll={handleViewAll}
            forceShowResults={forceShowResults}
            developerId={searchParams.get('developer')}
            isGuided={searchParams.get('guided') === 'true'}
            currentSession={currentSession}
            questions={questions}
          />
        </div>
        
        <div className="w-96 h-full flex-shrink-0 border-r border-slate-200">
          <ChatInterface
            questions={questions}
            currentSession={currentSession}
            onUpdateAnswer={updateAnswer}
            filteredCount={filteredProperties.length}
            isMobile={false}
            isSelectionMode={isSelectionMode}
            setIsSelectionMode={setIsSelectionMode}
          />
        </div>
      </div>

      {/* Property Quick View Modal */}
      {selectedPropertyForDetails && (
        <PropertyQuickView 
          property={selectedPropertyForDetails}
          onClose={() => setSelectedPropertyForDetails(null)}
          isInline={false}
        />
      )}
    </div>
  );
}