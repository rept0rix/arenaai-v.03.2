import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Eye, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function DeveloperProjectsList() {
  const [projects, setProjects] = useState([]);
  const [projectStats, setProjectStats] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const projectsData = await base44.entities.Project.list();
      setProjects(projectsData);

      // Load stats for each project
      const stats = {};
      for (const project of projectsData) {
        const leads = await base44.entities.Lead.filter({ project_id: project.id });
        const interactions = await base44.entities.ProjectInteraction.filter({ projectId: project.id });
        
        stats[project.id] = {
          leadsCount: leads.length,
          viewsCount: new Set(interactions.map(i => i.userId)).size,
          hotLeads: leads.filter(l => l.maturity_level === 'ready').length
        };
      }
      setProjectStats(stats);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30 text-slate-400" />
            <p className="text-slate-500">לא נמצאו פרויקטים</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => {
            const stats = projectStats[project.id] || {};
            return (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">
                        {project.name_he}
                      </CardTitle>
                      <p className="text-sm text-slate-600">
                        {project.city} • {project.neighborhood}
                      </p>
                    </div>
                    <Building2 className="w-8 h-8 text-sky-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-sky-50 rounded-lg">
                        <div className="text-2xl font-bold text-sky-700">
                          {stats.viewsCount || 0}
                        </div>
                        <div className="text-xs text-slate-600">צפיות</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-700">
                          {stats.leadsCount || 0}
                        </div>
                        <div className="text-xs text-slate-600">לידים</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-700">
                          {stats.hotLeads || 0}
                        </div>
                        <div className="text-xs text-slate-600">חמים</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => navigate(createPageUrl(`ProjectAnalytics?id=${project.id}`))}
                      >
                        <TrendingUp className="w-4 h-4 ml-2" />
                        נתונים
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => navigate(createPageUrl(`ProjectLeads?id=${project.id}`))}
                      >
                        <Users className="w-4 h-4 ml-2" />
                        לידים
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}