import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '../components/TopNavigation';
import Sidebar from '../components/developer/Sidebar';
import DeveloperMainDashboard from '../components/developer/DeveloperMainDashboard';
import DeveloperLeads from '../components/developer/DeveloperLeads';
import DeveloperProjects from '../components/developer/DeveloperProjects';
import DeveloperNotifications from '../components/developer/DeveloperNotifications';
import ArenaClubPro from '../components/developer/ArenaClubPro';
import CompanyProfileView from '../components/developer/CompanyProfileView';

export default function DeveloperDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DeveloperMainDashboard />;
      case 'leads':
        return <DeveloperLeads />;
      case 'projects':
        return <DeveloperProjects />;
      case 'notifications':
        return <DeveloperNotifications />;
      case 'arena-club':
        return <ArenaClubPro />;
      case 'profile':
        return <CompanyProfileView />;
      default:
        return <DeveloperMainDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <TopNavigation currentPage="DeveloperDashboard" />
      
      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}