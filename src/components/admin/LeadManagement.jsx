import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Eye, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function LeadManagement({ onRefresh, isLoading }) {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const leadsData = await base44.entities.Lead.list('-created_date');
      setLeads(leadsData);
    } catch (error) {
      console.error('Error loading leads:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { label: 'חדש', color: 'bg-blue-100 text-blue-800' },
      interested: { label: 'מעוניין', color: 'bg-purple-100 text-purple-800' },
      ready_for_meeting: { label: 'מוכן לפגישה', color: 'bg-amber-100 text-amber-800' },
      in_meeting: { label: 'בפגישה', color: 'bg-green-100 text-green-800' },
      closed_won: { label: 'נסגר בהצלחה', color: 'bg-emerald-100 text-emerald-800' },
      closed_lost: { label: 'לא רלוונטי', color: 'bg-slate-100 text-slate-800' }
    };
    return statusConfig[status] || statusConfig.new;
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone?.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">טוען מתעניינים...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="חיפוש לפי שם, אימייל או טלפון..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('all')}
            >
              הכל ({leads.length})
            </Button>
            <Button
              variant={filterStatus === 'new' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('new')}
            >
              חדש ({leads.filter(l => l.status === 'new').length})
            </Button>
            <Button
              variant={filterStatus === 'interested' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('interested')}
            >
              מעוניין ({leads.filter(l => l.status === 'interested').length})
            </Button>
          </div>
        </div>
      </Card>

      {/* Leads Table */}
      {filteredLeads.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-slate-500 mb-2">לא נמצאו מתעניינים</p>
          <p className="text-sm text-slate-400">
            {searchTerm || filterStatus !== 'all' 
              ? 'נסה לשנות את הסינון או החיפוש'
              : 'ברגע שיהיו מתעניינים במערכת, הם יופיעו כאן'}
          </p>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">
                    שם מלא
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">
                    אימייל
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">
                    טלפון
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">
                    סטטוס
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">
                    מקור
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
                {filteredLeads.map((lead) => {
                  const statusBadge = getStatusBadge(lead.status);

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">{lead.full_name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-700">{lead.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-700" dir="ltr">{lead.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={statusBadge.color}>
                          {statusBadge.label}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600">
                          {lead.source === 'property_inquiry' && 'פנייה לנכס'}
                          {lead.source === 'financing_request' && 'בקשת מימון'}
                          {lead.source === 'arena_club' && 'Arena Club'}
                          {lead.source === 'chat' && 'צ\'אט'}
                          {lead.source === 'social_signin' && 'התחברות חברתית'}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(lead.created_date).toLocaleDateString('he-IL', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="p-4">
            <p className="text-xs text-slate-600 mb-1">סה"כ מתעניינים</p>
            <p className="text-2xl font-bold text-slate-900">{leads.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-slate-600 mb-1">חדש</p>
            <p className="text-2xl font-bold text-blue-600">
              {leads.filter(l => l.status === 'new').length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-slate-600 mb-1">מעוניין</p>
            <p className="text-2xl font-bold text-purple-600">
              {leads.filter(l => l.status === 'interested').length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-slate-600 mb-1">מוכן לפגישה</p>
            <p className="text-2xl font-bold text-amber-600">
              {leads.filter(l => l.status === 'ready_for_meeting').length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-slate-600 mb-1">נסגר</p>
            <p className="text-2xl font-bold text-green-600">
              {leads.filter(l => l.status === 'closed_won').length}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}