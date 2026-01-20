import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Phone, Video, Building2 } from 'lucide-react';
import { createPageUrl } from '@/utils';

export default function MeetingsCalendar() {
  const [meetings, setMeetings] = useState([]);
  const [leads, setLeads] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeetings();
  }, [currentDate]);

  const loadMeetings = async () => {
    try {
      const allMeetings = await base44.entities.Meeting.filter({ status: 'scheduled' });
      setMeetings(allMeetings);

      // Load associated leads
      const leadIds = [...new Set(allMeetings.map(m => m.lead_id))];
      const leadsData = {};
      for (const leadId of leadIds) {
        const leadResult = await base44.entities.Lead.filter({ id: leadId });
        if (leadResult.length > 0) {
          leadsData[leadId] = leadResult[0];
        }
      }
      setLeads(leadsData);
    } catch (error) {
      console.error('Error loading meetings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const getMeetingsForDate = (date) => {
    if (!date) return [];
    return meetings.filter(meeting => {
      const meetingDate = new Date(meeting.date_time);
      return meetingDate.toDateString() === date.toDateString();
    });
  };

  const getMeetingIcon = (type) => {
    switch(type) {
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'office': return <Building2 className="w-4 h-4" />;
      case 'property_visit': return <MapPin className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('he-IL', { month: 'long', year: 'numeric' });
  const dayNames = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];

  const todayMeetings = getMeetingsForDate(new Date());
  const selectedDateMeetings = selectedDate ? getMeetingsForDate(selectedDate) : [];

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>לוח פגישות</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium px-4">{monthName}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {/* Day names */}
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm font-medium text-slate-600 pb-2">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {days.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const dayMeetings = getMeetingsForDate(day);
              const isToday = day.toDateString() === new Date().toDateString();
              const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    aspect-square p-2 rounded-lg border text-sm transition-colors
                    ${isToday ? 'border-sky-500 bg-sky-50' : 'border-slate-200'}
                    ${isSelected ? 'bg-sky-100 border-sky-600' : ''}
                    ${dayMeetings.length > 0 ? 'font-semibold' : ''}
                    hover:bg-slate-50
                  `}
                >
                  <div className="text-slate-900">{day.getDate()}</div>
                  {dayMeetings.length > 0 && (
                    <div className="mt-1 flex justify-center">
                      <div className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Today's / Selected Date Meetings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {selectedDate 
              ? `פגישות ב-${selectedDate.toLocaleDateString('he-IL', { day: 'numeric', month: 'long' })}`
              : 'פגישות היום'
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(selectedDate ? selectedDateMeetings : todayMeetings).length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-6">אין פגישות מתוכננות</p>
            ) : (
              (selectedDate ? selectedDateMeetings : todayMeetings).map(meeting => {
                const lead = leads[meeting.lead_id];
                const meetingTime = new Date(meeting.date_time);
                
                return (
                  <div
                    key={meeting.id}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-sky-300 transition-colors cursor-pointer"
                    onClick={() => window.location.href = createPageUrl(`LeadDetails?id=${meeting.lead_id}`)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getMeetingIcon(meeting.meeting_type)}
                        <span className="font-medium text-slate-900">
                          {lead?.full_name || 'לקוח'}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {meetingTime.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                      </Badge>
                    </div>
                    {meeting.location && (
                      <p className="text-xs text-slate-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {meeting.location}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}