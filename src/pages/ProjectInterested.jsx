import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, AlertCircle, ArrowRight } from 'lucide-react';
import TopNavigation from '../components/TopNavigation';

export default function ProjectInterested() {
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);

      if (!currentUser?.is_developer) {
        navigate(createPageUrl('Landing'));
        return;
      }

      // Load leads
      const leadsData = await base44.entities.Lead.list();
      setLeads(leadsData);

      // Load projects
      const projectsData = await base44.entities.Project.list();
      const projectsMap = {};
      projectsData.forEach(p => {
        projectsMap[p.id] = p;
      });
      setProjects(projectsMap);

    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { label: 'התחיל חיפוש', color: 'bg-blue-100 text-blue-800' },
      interested: { label: 'סימן נכסים', color: 'bg-purple-100 text-purple-800' },
      ready_for_meeting: { label: 'השוואה', color: 'bg-amber-100 text-amber-800' },
      in_meeting: { label: 'ביקש פרטים', color: 'bg-green-100 text-green-800' },
      closed_won: { label: 'עסקה נסגרה', color: 'bg-emerald-100 text-emerald-800' },
      closed_lost: { label: 'לא רלוונטי', color: 'bg-slate-100 text-slate-800' }
    };
    return statusConfig[status] || statusConfig.new;
  };

  const getMaturityBadge = (maturity) => {
    const maturityConfig = {
      curiosity: { label: 'סקרנות', color: 'bg-slate-100 text-slate-700' },
      comparison: { label: 'השוואה', color: 'bg-sky-100 text-sky-700' },
      ready: { label: 'מוכן לקניה', color: 'bg-green-100 text-green-700' }
    };
    return maturityConfig[maturity] || { label: 'לא ידוע', color: 'bg-slate-100 text-slate-500' };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">טוען נתונים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <TopNavigation currentPage="ProjectInterested" />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(createPageUrl('DeveloperDashboard'))}
              className="text-slate-600 hover:text-slate-900"
            >
              <ArrowRight className="w-4 h-4 ml-1" />
              חזרה לדשבורד
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            מתעניינים בפרויקטים שלי
          </h1>
          <p className="text-slate-600">
            רשימת הקונים שהתעניינו או פעלו בפרויקטים שלך במערכת
          </p>
        </div>

        {/* Privacy Notice */}
        <Card className="mb-6 bg-sky-50 border-sky-200">
          <div className="p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-slate-700">
              <p className="font-medium mb-1">הערת פרטיות ואבטחת מידע</p>
              <p>
                הנתונים המוצגים כאן נאספו באופן חוקי ובהסכמת המשתמשים במסגרת השימוש במערכת Arena AI.
                המידע המוצג כולל רק פרטי קשר בסיסיים ונתוני התנהגות כלליים במסע הקנייה, ללא מידע פיננסי או אישי רגיש.
              </p>
            </div>
          </div>
        </Card>

        {/* Leads Table */}
        {leads.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-slate-500 mb-2">אין עדיין מתעניינים בפרויקטים שלך</p>
            <p className="text-sm text-slate-400">
              ברגע שקונים יתחילו לחפש ולהתעניין בפרויקטים שלך, הם יופיעו כאן
            </p>
          </Card>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">
                      שם הקונה
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">
                      פרויקט
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">
                      סטטוס במסע
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">
                      רמת בשלות
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">
                      תאריך יצירה
                    </th>
                    <th className="text-center px-6 py-4 text-sm font-semibold text-slate-700">
                      פעולות
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {leads.map((lead) => {
                    const statusBadge = getStatusBadge(lead.status);
                    const maturityBadge = getMaturityBadge(lead.maturity_level);
                    const project = projects[lead.project_id];

                    return (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-slate-900">{lead.full_name}</p>
                            <p className="text-sm text-slate-500">{lead.email}</p>
                            <p className="text-sm text-slate-500">{lead.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-slate-900">
                            {project?.name_he || 'פרויקט לא מזוהה'}
                          </p>
                          {project?.city && (
                            <p className="text-sm text-slate-500">{project.city}</p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={statusBadge.color}>
                            {statusBadge.label}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={maturityBadge.color}>
                            {maturityBadge.label}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {new Date(lead.created_date).toLocaleDateString('he-IL')}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(createPageUrl(`LeadDetails?id=${lead.id}`))}
                            className="text-sky-600 hover:text-sky-700"
                          >
                            <Eye className="w-4 h-4 ml-1" />
                            צפייה
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Summary Stats */}
        {leads.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <p className="text-sm text-slate-600 mb-1">סה"כ מתעניינים</p>
              <p className="text-2xl font-bold text-slate-900">{leads.length}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-slate-600 mb-1">ליידים חדשים</p>
              <p className="text-2xl font-bold text-blue-600">
                {leads.filter(l => l.status === 'new').length}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-slate-600 mb-1">מעוניינים</p>
              <p className="text-2xl font-bold text-purple-600">
                {leads.filter(l => l.status === 'interested').length}
              </p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-slate-600 mb-1">מוכנים לפגישה</p>
              <p className="text-2xl font-bold text-green-600">
                {leads.filter(l => l.status === 'ready_for_meeting' || l.status === 'in_meeting').length}
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}