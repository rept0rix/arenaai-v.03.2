import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Users, Calendar, Phone, CheckCircle, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

export default function DeveloperStatistics() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [stats, setStats] = useState({
    views: 0,
    interested: 0,
    meetings: 0,
    contacts: 0,
    closed: 0
  });
  const [leads, setLeads] = useState([]);
  const [meetings, setMeetings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [selectedProject, dateRange, leads, meetings]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [projectsData, leadsData, meetingsData, interactionsData] = await Promise.all([
        base44.entities.Project.list(),
        base44.entities.Lead.list('-created_date'),
        base44.entities.Meeting.list(),
        base44.entities.ProjectInteraction.list()
      ]);

      setProjects(projectsData);
      setLeads(leadsData);

      // Create meetings map by lead_id
      const meetingsMap = {};
      meetingsData.forEach(m => {
        if (!meetingsMap[m.lead_id]) {
          meetingsMap[m.lead_id] = [];
        }
        meetingsMap[m.lead_id].push(m);
      });
      setMeetings(meetingsMap);

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterByDate = (date) => {
    if (dateRange === 'all') return true;
    const itemDate = new Date(date);
    const now = new Date();

    if (dateRange === 'month') {
      return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
    }
    if (dateRange === 'year') {
      return itemDate.getFullYear() === now.getFullYear();
    }
    return true;
  };

  const calculateStats = () => {
    let filteredLeads = leads.filter(lead => {
      const projectMatch = selectedProject === 'all' || lead.project_id === selectedProject;
      const dateMatch = filterByDate(lead.created_date);
      return projectMatch && dateMatch;
    });

    const newStats = {
      views: filteredLeads.length, // Simplified - could use ProjectInteraction for actual views
      interested: filteredLeads.filter(l => l.status === 'interested' || l.status === 'ready_for_meeting').length,
      meetings: filteredLeads.filter(l => meetings[l.id] && meetings[l.id].length > 0).length,
      contacts: filteredLeads.filter(l => l.phone || l.email).length,
      closed: filteredLeads.filter(l => l.status === 'closed_won').length
    };

    setStats(newStats);
  };

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project?.name_he || 'פרויקט לא ידוע';
  };

  const getLeadMeeting = (leadId) => {
    const leadMeetings = meetings[leadId];
    if (!leadMeetings || leadMeetings.length === 0) return null;
    return leadMeetings[0]; // Return the first/latest meeting
  };

  const filteredLeadsForTable = selectedProject === 'all' 
    ? []
    : leads.filter(lead => lead.project_id === selectedProject && filterByDate(lead.created_date));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">טוען נתונים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">פרויקט</label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger>
                <SelectValue placeholder="בחר פרויקט" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">כל הפרויקטים</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name_he}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">טווח תאריכים</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="בחר טווח" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">כל הזמנים</SelectItem>
                <SelectItem value="month">חודש נוכחי</SelectItem>
                <SelectItem value="year">שנה נוכחית</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-slate-600">צפיות</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.views}</p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-slate-600">מתעניינים</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.interested}</p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-sm text-slate-600">פגישות</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.meetings}</p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-sky-600" />
            </div>
            <p className="text-sm text-slate-600">יצרו קשר</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.contacts}</p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-slate-600">סגירות</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stats.closed}</p>
        </Card>
      </div>

      {/* Detailed Table - Only show when specific project selected */}
      {selectedProject !== 'all' && (
        <Card>
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">
              פירוט מתעניינים - {getProjectName(selectedProject)}
            </h3>
          </div>

          {filteredLeadsForTable.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              אין מתעניינים בפרויקט זה בטווח התאריכים שנבחר
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">שם</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">מייל</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">טלפון</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">תאריך</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">במה התעניין</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">פגישה</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">יצר קשר</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredLeadsForTable.map(lead => {
                    const meeting = getLeadMeeting(lead.id);
                    
                    return (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-900">{lead.full_name}</p>
                          {lead.buyer_profile_summary?.maturity && (
                            <Badge className="mt-1 text-xs bg-slate-100 text-slate-700">
                              {lead.buyer_profile_summary.maturity}
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">{lead.email}</td>
                        <td className="px-6 py-4 text-sm text-slate-700" dir="ltr">{lead.phone}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {format(new Date(lead.created_date), 'dd/MM/yyyy', { locale: he })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-700 max-w-xs">
                            {lead.conversation_summary?.what_searched ? (
                              <p className="line-clamp-2">{lead.conversation_summary.what_searched}</p>
                            ) : (
                              <span className="text-slate-400">אין תמצית</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {meeting ? (
                            <div className="text-sm">
                              <Badge className="bg-green-100 text-green-800 mb-1">
                                תואמה
                              </Badge>
                              <p className="text-slate-600">
                                {format(new Date(meeting.date_time), 'dd/MM/yyyy HH:mm', { locale: he })}
                              </p>
                            </div>
                          ) : (
                            <Badge className="bg-slate-100 text-slate-600">לא תואמה</Badge>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {lead.phone || lead.email ? (
                            <div className="text-sm">
                              <Badge className="bg-sky-100 text-sky-800">כן</Badge>
                            </div>
                          ) : (
                            <Badge className="bg-slate-100 text-slate-600">לא</Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}