import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Phone, 
  Mail, 
  Calendar, 
  User, 
  ArrowRight,
  Loader2,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import TopNavigation from '../components/TopNavigation';
import BuyerSnapshotCard from '../components/developer/BuyerSnapshotCard';
import ConversationSummaryCard from '../components/developer/ConversationSummaryCard';
import { createPageUrl } from '@/utils';

export default function LeadDetails() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const leadId = searchParams.get('id');

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (leadId) {
      loadLeadDetails();
    }
  }, [leadId]);

  const loadLeadDetails = async () => {
    try {
      const leads = await base44.entities.Lead.filter({ id: leadId });
      if (leads.length > 0) {
        setLead(leads[0]);
        setNotes(leads[0].notes || '');
      }
    } catch (error) {
      console.error('Error loading lead:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSnapshot = async () => {
    setGenerating(true);
    try {
      await base44.functions.invoke('generateBuyerSnapshot', { leadId });
      await loadLeadDetails();
    } catch (error) {
      console.error('Error generating snapshot:', error);
      alert('שגיאה ביצירת פרופיל קונה');
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateSummary = async () => {
    setGenerating(true);
    try {
      await base44.functions.invoke('generateConversationSummary', { leadId });
      await loadLeadDetails();
    } catch (error) {
      console.error('Error generating summary:', error);
      alert('שגיאה ביצירת סיכום שיחה');
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveNotes = async () => {
    try {
      await base44.entities.Lead.update(leadId, { notes });
      alert('ההערות נשמרו בהצלחה');
    } catch (error) {
      console.error('Error saving notes:', error);
      alert('שגיאה בשמירת ההערות');
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
      <TopNavigation currentPage="LeadDetails" />
      
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
              <h1 className="text-3xl font-bold text-slate-900">{lead.full_name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getStatusColor(lead.status)}>
                  {getStatusText(lead.status)}
                </Badge>
                {lead.maturity_level === 'ready' && (
                  <Badge className="bg-orange-100 text-orange-800">
                    🔥 חם
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => window.open(`tel:${lead.phone}`, '_self')}
            >
              <Phone className="w-4 h-4 ml-2" />
              התקשר
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(`mailto:${lead.email}`, '_blank')}
            >
              <Mail className="w-4 h-4 ml-2" />
              שלח מייל
            </Button>
            <Button
              onClick={() => navigate(createPageUrl(`ScheduleMeeting?leadId=${leadId}`))}
            >
              <Calendar className="w-4 h-4 ml-2" />
              קבע פגישה
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  פרטי יצירת קשר
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-slate-600" />
                    <span className="text-lg">{lead.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-slate-600" />
                    <span className="text-lg">{lead.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Buyer Snapshot */}
            {lead.buyer_profile_summary ? (
              <BuyerSnapshotCard profile={lead.buyer_profile_summary} />
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                  <h3 className="text-lg font-semibold mb-2">פרופיל קונה חכם</h3>
                  <p className="text-slate-600 mb-4">
                    השתמש ב-AI כדי ליצור פרופיל מפורט של הקונה
                  </p>
                  <Button 
                    onClick={handleGenerateSnapshot}
                    disabled={generating}
                  >
                    {generating ? (
                      <>
                        <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                        מייצר פרופיל...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 ml-2" />
                        צור פרופיל קונה
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Conversation Summary */}
            {lead.conversation_summary ? (
              <ConversationSummaryCard summary={lead.conversation_summary} />
            ) : lead.chat_session_id && (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-sky-500" />
                  <h3 className="text-lg font-semibold mb-2">סיכום שיחה</h3>
                  <p className="text-slate-600 mb-4">
                    צור סיכום אוטומטי של השיחה עם הקונה
                  </p>
                  <Button 
                    onClick={handleGenerateSummary}
                    disabled={generating}
                    variant="outline"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                        מסכם שיחה...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4 ml-2" />
                        צור סיכום שיחה
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>הערות</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="הוסף הערות על הליד..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                  className="mb-3"
                />
                <Button onClick={handleSaveNotes}>
                  שמור הערות
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timeline / Activity */}
            <Card>
              <CardHeader>
                <CardTitle>פעילות אחרונה</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-sky-500 rounded-full mt-2" />
                    <div>
                      <div className="font-medium">ליד נוצר</div>
                      <div className="text-slate-600">
                        {new Date(lead.created_date).toLocaleDateString('he-IL')}
                      </div>
                    </div>
                  </div>
                  {lead.updated_date && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                      <div>
                        <div className="font-medium">עדכון אחרון</div>
                        <div className="text-slate-600">
                          {new Date(lead.updated_date).toLocaleDateString('he-IL')}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}