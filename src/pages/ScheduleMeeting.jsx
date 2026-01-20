import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, MapPin, ArrowRight, Phone, Video, Building2 } from 'lucide-react';
import TopNavigation from '../components/TopNavigation';
import { createPageUrl } from '@/utils';

export default function ScheduleMeeting() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const leadId = searchParams.get('leadId');

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    meeting_type: 'office',
    location: '',
    notes: ''
  });

  useEffect(() => {
    if (leadId) {
      loadLead();
    }
  }, [leadId]);

  const loadLead = async () => {
    try {
      const leads = await base44.entities.Lead.filter({ id: leadId });
      if (leads.length > 0) {
        setLead(leads[0]);
      }
    } catch (error) {
      console.error('Error loading lead:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const dateTime = new Date(`${formData.date}T${formData.time}`);

      const meetingData = {
        lead_id: leadId,
        project_id: lead.project_id,
        developer_id: lead.developer_id,
        date_time: dateTime.toISOString(),
        meeting_type: formData.meeting_type,
        location: formData.location,
        notes: formData.notes,
        status: 'scheduled'
      };

      await base44.entities.Meeting.create(meetingData);

      // Update lead status
      await base44.entities.Lead.update(leadId, {
        status: 'ready_for_meeting'
      });

      alert('הפגישה נקבעה בהצלחה!');
      navigate(createPageUrl(`LeadDetails?id=${leadId}`));
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      alert('שגיאה בקביעת הפגישה');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">ליד לא נמצא</p>
          <Button onClick={() => navigate(createPageUrl('DeveloperDashboard'))}>
            חזרה לדאשבורד
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavigation currentPage="ScheduleMeeting" />
      
      <div className="max-w-3xl mx-auto p-6">
        <div className="mb-6 flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(createPageUrl(`LeadDetails?id=${leadId}`))}
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            חזרה
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">קביעת פגישה</h1>
            <p className="text-slate-600">עם {lead.full_name}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>פרטי הפגישה</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">תאריך</Label>
                  <div className="relative mt-2">
                    <Calendar className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      id="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="pr-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="time">שעה</Label>
                  <div className="relative mt-2">
                    <Clock className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      id="time"
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="pr-10"
                    />
                  </div>
                </div>
              </div>

              {/* Meeting Type */}
              <div>
                <Label>סוג פגישה</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  <Button
                    type="button"
                    variant={formData.meeting_type === 'phone' ? 'default' : 'outline'}
                    onClick={() => setFormData({...formData, meeting_type: 'phone'})}
                    className="flex flex-col items-center justify-center h-20"
                  >
                    <Phone className="w-5 h-5 mb-1" />
                    <span className="text-xs">טלפון</span>
                  </Button>
                  <Button
                    type="button"
                    variant={formData.meeting_type === 'video' ? 'default' : 'outline'}
                    onClick={() => setFormData({...formData, meeting_type: 'video'})}
                    className="flex flex-col items-center justify-center h-20"
                  >
                    <Video className="w-5 h-5 mb-1" />
                    <span className="text-xs">וידאו</span>
                  </Button>
                  <Button
                    type="button"
                    variant={formData.meeting_type === 'office' ? 'default' : 'outline'}
                    onClick={() => setFormData({...formData, meeting_type: 'office'})}
                    className="flex flex-col items-center justify-center h-20"
                  >
                    <Building2 className="w-5 h-5 mb-1" />
                    <span className="text-xs">במשרד</span>
                  </Button>
                  <Button
                    type="button"
                    variant={formData.meeting_type === 'property_visit' ? 'default' : 'outline'}
                    onClick={() => setFormData({...formData, meeting_type: 'property_visit'})}
                    className="flex flex-col items-center justify-center h-20"
                  >
                    <MapPin className="w-5 h-5 mb-1" />
                    <span className="text-xs">ביקור בנכס</span>
                  </Button>
                </div>
              </div>

              {/* Location */}
              {(formData.meeting_type === 'office' || formData.meeting_type === 'property_visit') && (
                <div>
                  <Label htmlFor="location">מיקום</Label>
                  <div className="relative mt-2">
                    <MapPin className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      id="location"
                      placeholder="כתובת הפגישה"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="pr-10"
                    />
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <Label htmlFor="notes">הערות</Label>
                <Textarea
                  id="notes"
                  placeholder="הערות לפגישה..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={4}
                  className="mt-2"
                />
              </div>

              {/* Submit */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(createPageUrl(`LeadDetails?id=${leadId}`))}
                  className="flex-1"
                >
                  ביטול
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-sky-500 hover:bg-sky-600"
                >
                  {saving ? 'שומר...' : 'קבע פגישה'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Lead Info Summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>פרטי הלקוח</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">שם:</span>
                <span className="font-medium">{lead.full_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">טלפון:</span>
                <span className="font-medium">{lead.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">אימייל:</span>
                <span className="font-medium">{lead.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}