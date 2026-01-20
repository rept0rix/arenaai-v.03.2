import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Phone, Video, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import MeetingsCalendar from './MeetingsCalendar';

export default function DeveloperMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [leads, setLeads] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    try {
      const meetingsData = await base44.entities.Meeting.list('-date_time');
      setMeetings(meetingsData);

      // Load lead info for each meeting
      const leadsMap = {};
      for (const meeting of meetingsData) {
        if (meeting.lead_id && !leadsMap[meeting.lead_id]) {
          try {
            const leadData = await base44.entities.Lead.filter({ id: meeting.lead_id });
            if (leadData.length > 0) {
              leadsMap[meeting.lead_id] = leadData[0];
            }
          } catch (err) {
            console.error('Error loading lead:', err);
          }
        }
      }
      setLeads(leadsMap);
    } catch (error) {
      console.error('Error loading meetings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      no_show: 'bg-slate-100 text-slate-800'
    };
    return colors[status] || 'bg-slate-100 text-slate-800';
  };

  const getStatusText = (status) => {
    const texts = {
      scheduled: 'מתוכננת',
      completed: 'התקיימה',
      cancelled: 'בוטלה',
      no_show: 'לא הגיע'
    };
    return texts[status] || status;
  };

  const getMeetingTypeIcon = (type) => {
    const icons = {
      phone: <Phone className="w-4 h-4" />,
      video: <Video className="w-4 h-4" />,
      office: <Building className="w-4 h-4" />,
      property_visit: <MapPin className="w-4 h-4" />
    };
    return icons[type] || <Calendar className="w-4 h-4" />;
  };

  const getMeetingTypeText = (type) => {
    const texts = {
      phone: 'שיחת טלפון',
      video: 'שיחת וידאו',
      office: 'במשרד',
      property_visit: 'ביקור בנכס'
    };
    return texts[type] || 'פגישה';
  };

  const isUpcoming = (dateTime) => {
    return new Date(dateTime) > new Date();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500" />
      </div>
    );
  }

  const upcomingMeetings = meetings.filter(m => isUpcoming(m.date_time) && m.status === 'scheduled');
  const pastMeetings = meetings.filter(m => !isUpcoming(m.date_time) || m.status !== 'scheduled');

  return (
    <div className="space-y-6">
      {/* Calendar View */}
      <MeetingsCalendar />

       {/* Upcoming Meetings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            פגישות קרובות ({upcomingMeetings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingMeetings.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>אין פגישות קרובות</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingMeetings.map((meeting) => {
                const lead = leads[meeting.lead_id];
                return (
                  <div 
                    key={meeting.id}
                    className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-slate-900">
                            {lead?.full_name || 'ליד לא נמצא'}
                          </h4>
                          <Badge className={getStatusColor(meeting.status)}>
                            {getStatusText(meeting.status)}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(meeting.date_time).toLocaleDateString('he-IL', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>
                              {new Date(meeting.date_time).toLocaleTimeString('he-IL', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          {meeting.meeting_type && (
                            <div className="flex items-center gap-2">
                              {getMeetingTypeIcon(meeting.meeting_type)}
                              <span>{getMeetingTypeText(meeting.meeting_type)}</span>
                            </div>
                          )}
                          {meeting.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{meeting.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(createPageUrl(`LeadDetails?id=${meeting.lead_id}`))}
                      >
                        צפה בפרטי הליד
                      </Button>
                    </div>
                    {meeting.notes && (
                      <div className="mt-3 p-3 bg-white rounded border border-slate-200">
                        <p className="text-sm text-slate-700">{meeting.notes}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Past Meetings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-600" />
            פגישות קודמות ({pastMeetings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pastMeetings.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p>אין פגישות קודמות</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pastMeetings.slice(0, 10).map((meeting) => {
                const lead = leads[meeting.lead_id];
                return (
                  <div 
                    key={meeting.id}
                    className="p-4 bg-slate-50 rounded-lg opacity-75"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-slate-700">
                            {lead?.full_name || 'ליד לא נמצא'}
                          </span>
                          <Badge className={getStatusColor(meeting.status)}>
                            {getStatusText(meeting.status)}
                          </Badge>
                        </div>
                        <div className="text-sm text-slate-600">
                          {new Date(meeting.date_time).toLocaleDateString('he-IL')}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}