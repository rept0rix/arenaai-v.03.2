import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Phone, 
  Mail, 
  Eye,
  Calendar,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function DeveloperLeadsList() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [searchTerm, statusFilter, leads]);

  const loadLeads = async () => {
    try {
      const data = await base44.entities.Lead.list('-created_date');
      setLeads(data);
      setFilteredLeads(data);
    } catch (error) {
      console.error('Error loading leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = [...leads];

    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone?.includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    setFilteredLeads(filtered);
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
    <div className="space-y-4">
      {/* Filters */}
      <Card>
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
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                הכל ({leads.length})
              </Button>
              <Button
                variant={statusFilter === 'new' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('new')}
              >
                חדש ({leads.filter(l => l.status === 'new').length})
              </Button>
              <Button
                variant={statusFilter === 'ready_for_meeting' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('ready_for_meeting')}
              >
                מוכן לפגישה ({leads.filter(l => l.status === 'ready_for_meeting').length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads List */}
      <div className="grid gap-4">
        {filteredLeads.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-slate-500">לא נמצאו לידים</p>
            </CardContent>
          </Card>
        ) : (
          filteredLeads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {lead.full_name}
                      </h3>
                      <Badge className={getStatusColor(lead.status)}>
                        {getStatusText(lead.status)}
                      </Badge>
                      {lead.maturity_level === 'ready' && (
                        <Badge className="bg-orange-100 text-orange-800">
                          🔥 חם
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-1 text-sm text-slate-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{lead.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{lead.email}</span>
                      </div>
                    </div>

                    {lead.buyer_profile_summary?.type && (
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="outline" className="bg-sky-50">
                          {lead.buyer_profile_summary.type}
                        </Badge>
                        {lead.buyer_profile_summary.maturity && (
                          <Badge variant="outline" className="bg-purple-50">
                            {lead.buyer_profile_summary.maturity}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(createPageUrl(`LeadDetails?id=${lead.id}`))}
                    >
                      <Eye className="w-4 h-4 ml-2" />
                      צפה בפרטים
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(createPageUrl(`ScheduleMeeting?leadId=${lead.id}`))}
                    >
                      <Calendar className="w-4 h-4 ml-2" />
                      קבע פגישה
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}