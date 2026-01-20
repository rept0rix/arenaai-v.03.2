import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Users, Eye, Calendar, Building2 } from 'lucide-react';
import TopNavigation from '../components/TopNavigation';
import SimpleFunnelVisualization from '../components/developer/SimpleFunnelVisualization';
import { createPageUrl } from '@/utils';

export default function ProjectAnalytics() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const projectId = searchParams.get('id');

  const [project, setProject] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      loadProjectAnalytics();
    }
  }, [projectId]);

  const loadProjectAnalytics = async () => {
    try {
      // Get project
      const projects = await base44.entities.Project.filter({ id: projectId });
      if (projects.length > 0) {
        setProject(projects[0]);
      }

      // Get analytics
      const response = await base44.functions.invoke('aggregateProjectAnalytics', { projectId });
      if (response.data.success) {
        setAnalytics(response.data.analytics);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">פרויקט לא נמצא</p>
          <Button onClick={() => navigate(createPageUrl('DeveloperDashboard'))}>
            חזרה לדאשבורד
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavigation currentPage="ProjectAnalytics" />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(createPageUrl('DeveloperDashboard'))}
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            חזרה
          </Button>
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-sky-600" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{project.name_he}</h1>
              <p className="text-slate-600">{project.city} • נתוני עניין</p>
            </div>
          </div>
        </div>

        {analytics && (
          <div className="space-y-6">
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">צפיות ייחודיות</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-slate-900">{analytics.unique_views}</div>
                    <Eye className="w-8 h-8 text-sky-500" />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">משתמשים שונים שצפו בפרויקט</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">אינטראקציות</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-purple-600">{analytics.interactions.total}</div>
                    <TrendingUp className="w-8 h-8 text-purple-500" />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">כניסות לעמוד נכס, פניות</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">לידים</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-green-600">{analytics.leads.total}</div>
                    <Users className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">השאירו פרטים</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">פגישות</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-orange-600">{analytics.meetings.total}</div>
                    <Calendar className="w-8 h-8 text-orange-500" />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">פגישות שנקבעו</p>
                </CardContent>
              </Card>
            </div>

            {/* Funnel */}
            <SimpleFunnelVisualization funnel={analytics.funnel} conversionRates={analytics.conversion_rates} />

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Interactions Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>פירוט אינטראקציות</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">צפיות</span>
                    <span className="font-bold text-slate-900">{analytics.interactions.views}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">פניות</span>
                    <span className="font-bold text-slate-900">{analytics.interactions.inquiries}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Leads Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>פירוט לידים</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">סה"כ</span>
                    <span className="font-bold text-slate-900">{analytics.leads.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">חמים 🔥</span>
                    <span className="font-bold text-orange-600">{analytics.leads.hot}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">בפגישה</span>
                    <span className="font-bold text-purple-600">{analytics.leads.in_meeting}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">נסגר בהצלחה ✓</span>
                    <span className="font-bold text-green-600">{analytics.leads.closed_won}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Meetings Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>פירוט פגישות</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">מתוכננות</span>
                    <span className="font-bold text-blue-600">{analytics.meetings.scheduled}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">התקיימו</span>
                    <span className="font-bold text-green-600">{analytics.meetings.completed}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}