import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock,
  Phone,
  Mail,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function DeveloperOverview() {
    const [leads, setLeads] = useState([]);
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const leadsData = await base44.entities.Lead.list();
            const meetingsData = await base44.entities.Meeting.list();
            setLeads(leadsData);
            setMeetings(meetingsData);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeadsThisWeek: 0,
    upcomingMeetings: 0,
    hotLeads: 0
  });
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [hotLeads, setHotLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadOverviewData();
  }, []);

  const loadOverviewData = async () => {
    try {
      // Load leads
      const leads = await base44.entities.Lead.list();
      
      // Load meetings
      const meetings = await base44.entities.Meeting.list();
      const now = new Date();
      const upcoming = meetings.filter(m => 
        m.status === 'scheduled' && new Date(m.date_time) > now
      ).slice(0, 5);

      // Calculate stats
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const newThisWeek = leads.filter(l => 
        new Date(l.created_date) > weekAgo
      ).length;

      const hot = leads.filter(l => 
        l.maturity_level === 'ready' || l.status === 'ready_for_meeting'
      ).slice(0, 5);

      setStats({
        totalLeads: leads.length,
        newLeadsThisWeek: newThisWeek,
        upcomingMeetings: upcoming.length,
        hotLeads: hot.length
      });

      setUpcomingMeetings(upcoming);
      setHotLeads(hot);
    } catch (error) {
      console.error('Error loading overview:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      interested: 'bg-purple-100 text-purple-800',
      ready_for_meeting: 'bg-green-100 text-green-800',
      in_meeting: 'bg-yellow-100 text-yellow-800',
      closed_won: 'bg-emerald-100 text-emerald-800',
      closed_lost: 'bg-slate-100 text-slate-800'
    };
    return colors[status] || 'bg-slate-100 text-slate-800';
  };

  const getStatusText = (status) => {
    const texts = {
      new: 'חדש',
      interested: 'מתעניין',
      ready_for_meeting: 'מוכן לפגישה',
      in_meeting: 'בפגישה',
      closed_won: 'נסגר בהצלחה',
      closed_lost: 'נסגר ללא עסקה'
    };
    return texts[status] || status;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <LeadsFunnel leads={leads} meetings={meetings} title="משפך לידים - כל היזם" />
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">סך הכל לידים</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-slate-900">{stats.totalLeads}</div>
              <Users className="w-8 h-8 text-sky-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">לידים חדשים השבוע</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-green-600">+{stats.newLeadsThisWeek}</div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">פגישות קרובות</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-purple-600">{stats.upcomingMeetings}</div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">לידים חמים</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-orange-600">{stats.hotLeads}</div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                פגישות קרובות
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(createPageUrl('DeveloperDashboard?tab=meetings'))}
              >
                צפה בהכל
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {upcomingMeetings.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>אין פגישות קרובות</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingMeetings.map((meeting) => (
                  <div 
                    key={meeting.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">
                        {new Date(meeting.date_time).toLocaleDateString('he-IL')}
                      </div>
                      <div className="text-sm text-slate-600">
                        {new Date(meeting.date_time).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">
                      {meeting.meeting_type || 'פגישה'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Hot Leads */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                לידים חמים
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(createPageUrl('DeveloperDashboard?tab=leads'))}
              >
                צפה בהכל
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {hotLeads.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>אין לידים חמים כרגע</p>
              </div>
            ) : (
              <div className="space-y-3">
                {hotLeads.map((lead) => (
                  <div 
                    key={lead.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    onClick={() => navigate(createPageUrl(`LeadDetails?id=${lead.id}`))}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{lead.full_name}</div>
                      <div className="text-sm text-slate-600">{lead.phone}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(lead.status)}>
                        {getStatusText(lead.status)}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}