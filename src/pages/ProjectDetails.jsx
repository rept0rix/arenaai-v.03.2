import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TopNavigation from '../components/TopNavigation';
import ProjectFloorplan from '../components/properties/ProjectFloorplan';
import { mockProperties, getPropertiesByProject } from '../components/properties/mockPropertiesData';
import { createPageUrl } from '@/utils';

export default function ProjectDetails() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [projectProperties, setProjectProperties] = useState([]);
  const [projectInfo, setProjectInfo] = useState(null);

  const projectId = searchParams.get('id');

  useEffect(() => {
    if (projectId) {
      loadProjectData(projectId);
    } else {
      setIsLoading(false);
    }
  }, [projectId]);

  const loadProjectData = async (id) => {
    setIsLoading(true);
    try {
      // Get all properties for this project from mock data
      const properties = getPropertiesByProject(id);
      
      if (properties.length > 0) {
        setProjectProperties(properties);
        
        // Extract project info from first property
        const firstProp = properties[0];
        setProjectInfo({
          id: id,
          name: firstProp.project_name,
          developer: firstProp.developer,
          location: firstProp.city,
          address: firstProp.address,
          totalUnits: firstProp.project_total_units
        });
      }
    } catch (error) {
      console.error('Error loading project data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-sky-500 mx-auto mb-4" />
          <p className="text-slate-600">טוען פרטי פרויקט...</p>
        </div>
      </div>
    );
  }

  if (!projectId || !projectInfo) {
    return (
      <div>
        <TopNavigation currentPage="ProjectDetails" />
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">הפרויקט לא נמצא</h2>
          <p className="text-slate-500 mb-6">לא הצלחנו למצוא את הפרויקט שחיפשת.</p>
          <Button onClick={() => navigate(createPageUrl('Chat'))} className="bg-sky-500 hover:bg-sky-600">
            חזרה לחיפוש
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה
          </Button>
          <TopNavigation currentPage="ProjectDetails" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <ProjectFloorplan
          projectId={projectId}
          properties={projectProperties}
        />
      </div>
    </div>
  );
}