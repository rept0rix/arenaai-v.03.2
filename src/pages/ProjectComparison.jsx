import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TopNavigation from '../components/TopNavigation';
import ProjectComparisonTable from '../components/properties/ProjectComparisonTable';
import { mockProperties } from '../components/properties/mockPropertiesData';
import { createPageUrl } from '@/utils';

export default function ProjectComparison() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleParameterClick = (paramLabel, property) => {
    // In real app, this would open chat with explanation
    alert(`הסבר על ${paramLabel} עבור דירה ${property.id}:\n\nArena תסביר כאן למה הפרמטר הזה מתאים או פחות מתאים עבורך בהתבסס על העדפותיך בשיחה.`);
    
    // TODO: Integrate with chat interface
    // openChatWithExplanation(paramLabel, property);
  };

  useEffect(() => {
    const ids = searchParams.get('ids');
    const projectId = searchParams.get('projectId');

    if (!ids) {
      setIsLoading(false);
      return;
    }

    const propertyIds = ids.split(',');
    const selectedProperties = mockProperties.filter(p => propertyIds.includes(p.id));
    
    setProperties(selectedProperties);
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-sky-500 mx-auto mb-4" />
          <p className="text-slate-600">טוען השוואה...</p>
        </div>
      </div>
    );
  }

  if (properties.length < 2) {
    return (
      <div>
        <TopNavigation currentPage="ProjectComparison" />
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">לא נמצאו דירות להשוואה</h2>
          <p className="text-slate-500 mb-6">יש לבחור לפחות 2 דירות להשוואה.</p>
          <Button onClick={() => navigate(-1)} className="bg-sky-500 hover:bg-sky-600">
            חזרה
          </Button>
        </div>
      </div>
    );
  }

  const projectName = properties[0]?.project_name || 'הפרויקט';

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <TopNavigation currentPage="ProjectComparison" />
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2 flex-row-reverse"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה לפרויקט
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6 text-right">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            השוואת דירות ב{projectName}
          </h1>
          <p className="text-slate-600">
            משווה {properties.length} דירות בפרויקט
          </p>
        </div>

        <ProjectComparisonTable 
          properties={properties} 
          onParameterClick={handleParameterClick}
        />
      </div>
    </div>
  );
}