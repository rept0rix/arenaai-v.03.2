import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search, Phone, Mail, Calendar, TrendingUp, Filter } from 'lucide-react';
import TopNavigation from '../components/TopNavigation';
import { createPageUrl } from '@/utils';

export default function ProjectLeads() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const projectId = searchParams.get('id');

  const [project, setProject] = useState(null);
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (projectId) {
      loadProjectLeads();
    }
  }, [projectId]);

  useEffect(() => {
    filterLeads();
  }, [searchTerm, statusFilter, leads]);

  const loadProjectLeads = async () => {
    try {
      // Get project
      const projects = await base44.entities.Project.filter({ id: projectId });
      if (projects.length > 0) {
        setProject(projects[0]);
      }

      // Get leads for this project
      const projectLeads = await base44.entities.Lead.filter({ project_id: projectId });
      setLeads(projectLeads);
    } catch (error) {
      console.error('Error loading project leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = [...leads];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    setFilteredLeads(filtered);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      new: { label: 'חדש', className: 'bg-blue-100 text-blue-800' },
      interested: { label: 'מתעניין', className: 'bg-purple-100 text-purple-800' },
      ready_for_meeting: { label: 'מוכן לפגישה', className: 'bg-green-100 text-green-800' },
      in_meeting: { label: 'בפגישה', className: 'bg-yellow-100 text-yellow-800' },
      closed_won: { label: 'נסגר בהצלחה', className: 'bg-emerald-100 text-emerald-800' },
      closed_lost: { label: 'לא רלוונטי', className: 'bg-slate-100 text-slate-800' }
    };
    const config = statusMap[status] || { label: status, className: 'bg-gray-100 text-gray-800' };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getMaturityBadge = (maturity) => {
    if (!maturity) return null;
    const maturityMap = {
      curiosity: { label: 'סקרנות', className: 'bg-blue-100 text-blue-700' },
      comparison: { label: 'השוואה', className: 'bg-purple-100 text-purple-700' },
      ready: { label: 'מוכן', className: 'bg-orange-100 text-orange-700' }
    };
    const config = maturityMap[maturity] || { label: maturity, className: 'bg-gray-100 text-gray-700' };
    return <Badge className={config.className}>{config.label}</Badge>;
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

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    hot: leads.filter(l => l.maturity_level === 'ready').length,
    meetings: leads.filter(l => l.status === 'ready_for_meeting' || l.status === 'in_meeting').length,
    closed: leads.filter(l => l.status === 'closed_won').length
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavigation currentPage="ProjectLeads" />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(createPageUrl('DeveloperDashboard'))}
            >
              <ArrowRight className="w-4 h-4 ml-2" />
              חזרה
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{project.name_he}</h1>
              <p className="text-slate-600">מתעניינים בפרויקט</p>
            </div>
          </div>
          <Button 
            variant="outline"
            onClick={() => navigate(createPageUrl(`ProjectAnalytics?id=${projectId}`))}
          >
            <TrendingUp className="w-4 h-4 ml-2" />
            אנליטיקות
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">{stats.total}</div>
                <div className="text-sm text-slate-600 mt-1">סה"כ מתעניינים</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stats.new}</div>
                <div className="text-sm text-slate-600 mt-1">חדשים</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{stats.hot}</div>
                <div className="text-sm text-slate-600 mt-1">חמים 🔥</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{stats.meetings}</div>
                <div className="text-sm text-slate-600 mt-1">בפגישות</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{stats.closed}</div>
                <div className="text-sm text-slate-600 mt-1">נסגרו ✓</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="חיפוש לפי שם, אימייל או טלפון..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('all')}
                  size="sm"
                >
                  הכל ({leads.length})
                </Button>
                <Button
                  variant={statusFilter === 'new' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('new')}
                  size="sm"
                >
                  חדשים ({stats.new})
                </Button>
                <Button
                  variant={statusFilter === 'ready_for_meeting' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('ready_for_meeting')}
                  size="sm"
                >
                  לפגישה ({stats.meetings})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leads List */}
        <div className="space-y-4">
          {filteredLeads.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Filter className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                <p className="text-slate-600">לא נמצאו מתעניינים</p>
              </CardContent>
            </Card>
          ) : (
            filteredLeads.map(lead => (
              <Card 
                key={lead.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(createPageUrl(`LeadDetails?id=${lead.id}`))}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-slate-900">{lead.full_name}</h3>
                        {getStatusBadge(lead.status)}
                        {getMaturityBadge(lead.maturity_level)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone className="w-4 h-4" />
                          <span>{lead.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail className="w-4 h-4" />
                          <span>{lead.email}</span>
                        </div>
                      </div>

                      {lead.buyer_profile_summary && (
                        <div className="mt-3 p-3 bg-sky-50 rounded-lg">
                          <p className="text-sm text-slate-700">
                            <span className="font-semibold">סוג קונה:</span> {lead.buyer_profile_summary.type || 'לא ידוע'}
                            {lead.buyer_profile_summary.top_3_preferences && (
                              <span className="mr-3">
                                <span className="font-semibold">מעדיף:</span> {lead.buyer_profile_summary.top_3_preferences.slice(0, 2).join(', ')}
                              </span>
                            )}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(createPageUrl(`LeadDetails?id=${lead.id}`));
                        }}
                      >
                        פרטים
                      </Button>
                      {(lead.status === 'new' || lead.status === 'interested') && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(createPageUrl(`ScheduleMeeting?leadId=${lead.id}`));
                          }}
                        >
                          <Calendar className="w-4 h-4 ml-2" />
                          קבע פגישה
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}