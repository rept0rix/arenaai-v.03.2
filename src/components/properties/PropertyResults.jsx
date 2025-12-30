
import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import PropertyFilters from './PropertyFilters';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight, Search, CheckSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PropertyResults({
  properties,
  totalProperties,
  isLoading,
  filters,
  selectedProperties,
  onSelectProperty,
  onCompare,
  isCompareMode,
  setIsCompareMode,
  onQuickView,
  onFiltersChange,
  onViewAll,
  forceShowResults,
  developerId,
  isGuided,
  currentSession,
  questions
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Calculate answered questions count
  const answeredQuestionsCount = currentSession?.answers ? Object.keys(currentSession.answers).filter(k => k !== 'initial_query').length : 0;

  const hasActiveFilters = Object.keys(filters || {}).length > 0;
  // Show the matching screen ONLY if there are no filters applied and forceShowResults is false.
  const showMatchingScreen = !hasActiveFilters && !forceShowResults && answeredQuestionsCount < 3;
  const shouldShowGuidedMode = isGuided && answeredQuestionsCount < 5;

  let matchingTitle = '';
  let matchingSubtitle = '';

  if (answeredQuestionsCount === 0) {
    matchingTitle = 'שנתחיל לגלות את הבית שלך?';
    matchingSubtitle = 'אפשר לשוחח איתי חופשי בצ’אט פתוח או לבחור במסע מודרך עם כמה שאלות קצרות. ככה אמצא לך את מה שבאמת מתאים.';
  } else if (answeredQuestionsCount === 1) {
    matchingTitle = 'אני כאן בשבילך';
    matchingSubtitle = 'כבר מתחילה להבין אותך... ככל שנמשיך, ההמלצות שלי יהיו מדויקות יותר.';
  } else if (answeredQuestionsCount === 2) {
    matchingTitle = 'אני כאן בשבילך';
    matchingSubtitle = 'אני מתחשבת גם בלוחות הזמנים שלך';
  } else if (answeredQuestionsCount === 3) {
    matchingTitle = 'אני כאן בשבילך';
    matchingSubtitle = 'אני מתקרבת למה שבאמת חשוב לך';
  } else { // answeredQuestionsCount >= 4
    matchingTitle = 'אני כאן בשבילך';
    matchingSubtitle = 'מעולה, עוד מעט כבר אפשר להתחיל להראות לך נכסים עם ציון התאמה אישי ואפילו להציע לך סיור תלת מימד בנכס וסביבתו.';
  }

  return (
    <div className="h-full w-full flex flex-col bg-slate-50/50 relative" dir="rtl" data-property-results>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b flex-shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-slate-800 text-sm font-medium">
            {isLoading ? 'טוען נכסים...' : `נמצאו ${properties.length} מתוך ${totalProperties} נכסים`}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          {isCompareMode || selectedProperties.length > 0 ?
          <>
              <Button
              onClick={onCompare}
              className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
              disabled={selectedProperties.length < 2}>

                <ArrowLeftRight className="w-4 h-4" />
                השווה ({selectedProperties.length})
              </Button>
              <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCompareMode(false)}>

                ביטול
              </Button>
            </> :

          <Button
            variant="outline"
            onClick={() => setIsCompareMode(true)}
            className="gap-2">

              <CheckSquare className="w-4 h-4" />
              בחר להשוואה
            </Button>
          }
          
          <Button
            variant={isFilterOpen ? "default" : "outline"}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="gap-2">

            <Search className="w-4 h-4" />
            סינון
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Filter Panel */}
        {isFilterOpen &&
        <PropertyFilters
          onFiltersChange={onFiltersChange}
          onViewAll={onViewAll}
          activeFilters={filters}
          isOpen={isFilterOpen}
          onToggle={() => setIsFilterOpen(!isFilterOpen)} />

        }

        {/* Results Grid or Guided Mode Display */}
        <div className="flex-1 overflow-y-auto p-4">
          {shouldShowGuidedMode ? (
          /* מסע מודרך עם רקע תמונה */
          <div className="h-full relative overflow-hidden">
              {/* Blurred Background Image Layer */}
              <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
              style={{
                backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c276074aac6e6711db72a6/b593a4412_image.png)',
                filter: 'blur(2px)' // Changed from 3px to 2px
              }}>
            </div>
              
              {/* המסע המודרך */}
              <div className="absolute inset-0 flex items-center justify-center z-20 p-4">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl max-w-sm text-center border">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    {matchingTitle}
                  </h3>

                  {/* Progress Counter */}
                  <div className="bg-slate-50 rounded-full px-4 py-2 shadow-inner border mb-4">
                    <p className="text-xs font-medium text-slate-700">
                      שאלה {answeredQuestionsCount + 1} מתוך 5
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <motion.div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                      initial={{ width: "0%" }}
                      animate={{ width: `${answeredQuestionsCount / 5 * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }} />

                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {matchingSubtitle}
                  </p>
                </div>
              </div>
            </div>) :
          showMatchingScreen ? (
          /* מסך ההתאמה עם רקע תמונה */
          <div className="h-full relative overflow-hidden">
              {/* Blurred Background Image Layer */}
              <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
              style={{
                backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c276074aac6e6711db72a6/b593a4412_image.png)',
                filter: 'blur(2px)' // Changed from 3px to 2px
              }}>
            </div>
              
              {/* התוכן המרכזי */}
              <div className="absolute inset-0 flex items-center justify-center p-8 z-20">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-10 shadow-2xl max-w-md text-center border border-slate-200/50">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">
                      {matchingTitle}
                    </h2>
                    <p className="text-base text-slate-700 leading-relaxed max-w-md mx-auto">
                      {matchingSubtitle}
                    </p>
                  </div>
                  
                  <div className="bg-slate-50/90 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-700 font-medium">התקדמות התאמה</span>
                      <span className="text-base font-bold text-slate-800">{Math.round((answeredQuestionsCount / 3) * 100)}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full transition-all duration-700 ease-out"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(answeredQuestionsCount / 3) * 100}%` }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                    </div>
                    
                    <p className="text-xs text-slate-600 leading-relaxed">
                      ככל שנענה על יותר שאלות, כך המערכת תוכל למצוא נכסים מותאמים אישית עבורך.
                    </p>
                  </div>
                </div>
              </div>
            </div>) : (

          /* תצוגת נכסים רגילה */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {properties.map((property, index) =>
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}>

                    <PropertyCard
                  property={property}
                  isSelected={selectedProperties.includes(property.id)}
                  onSelect={() => onSelectProperty(property.id)}
                  isCompareMode={isCompareMode}
                  onQuickView={() => onQuickView(property)} />

                  </motion.div>
              )}
              </AnimatePresence>
            </div>)
          }
        </div>
      </div>
    </div>);

}
