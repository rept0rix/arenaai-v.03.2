import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Calendar,
  TrendingUp,
  Clock,
  AlertCircle
} from 'lucide-react';
import TopNavigation from '../components/TopNavigation';
import DeveloperOverview from '../components/developer/DeveloperOverview';
import DeveloperLeadsList from '../components/developer/DeveloperLeadsList';
import DeveloperProjectsList from '../components/developer/DeveloperProjectsList';
import DeveloperMeetings from '../components/developer/DeveloperMeetings';

export default function DeveloperDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await base44.auth.me();
      if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = '/Landing';
        return;
      }
      setUser(currentUser);
    } catch (error) {
      window.location.href = '/Landing';
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4" />
          <p className="text-slate-600">טוען...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <TopNavigation currentPage="DeveloperDashboard" />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            דאשבורד יזם
          </h1>
          <p className="text-slate-600">
            ניהול מתעניינים בפרויקטים, פרויקטים ופגישות
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span>סקירה כללית</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>מתעניינים</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>פרויקטים</span>
            </TabsTrigger>
            <TabsTrigger value="meetings" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>פגישות</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DeveloperOverview />
          </TabsContent>

          <TabsContent value="leads">
            <DeveloperLeadsList />
          </TabsContent>

          <TabsContent value="projects">
            <DeveloperProjectsList />
          </TabsContent>

          <TabsContent value="meetings">
            <DeveloperMeetings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}