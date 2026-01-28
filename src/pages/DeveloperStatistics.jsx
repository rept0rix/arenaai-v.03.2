import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import TopNavigation from '../components/TopNavigation';
import DeveloperStatistics from '../components/developer/DeveloperStatistics';

export default function DeveloperStatisticsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);

      if (!currentUser?.is_developer && currentUser?.role !== 'admin') {
        navigate(createPageUrl('Landing'));
        return;
      }
    } catch (error) {
      navigate(createPageUrl('Landing'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">טוען...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <TopNavigation currentPage="DeveloperStatistics" />

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
            סטטיסטיקות ודוחות
          </h1>
          <p className="text-slate-600">
            מעקב אחר ביצועי הפרויקטים והלידים שלך
          </p>
        </div>

        {/* Statistics Component */}
        <DeveloperStatistics />
      </div>
    </div>
  );
}