import React from 'react';
import { LayoutDashboard, Users, Building2, Bell, Gift, Building } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'דשבורד ראשי', icon: LayoutDashboard },
    { id: 'leads', label: 'לידים', icon: Users },
    { id: 'projects', label: 'פרויקטים / נכסים', icon: Building2 },
    { id: 'notifications', label: 'הודעות והתראות', icon: Bell },
    { id: 'arena-club', label: 'ARENA CLUB PRO', icon: Gift },
    { id: 'profile', label: 'פרופיל חברה', icon: Building },
  ];

  return (
    <div className="w-64 bg-white border-l border-slate-200 flex-shrink-0">
      <div className="p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">מערכת ניהול יזם</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-sky-50 text-sky-600 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}