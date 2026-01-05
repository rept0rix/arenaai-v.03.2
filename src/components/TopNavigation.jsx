import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Home, User, History, LogOut, ChevronDown, Settings, UserCircle, Shield, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from '@/utils';
import { User as UserEntity } from '@/entities/User';

export default function TopNavigation({ currentPage }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      const currentUser = await UserEntity.me();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
    setIsLoading(false);
  };

  const handleLogin = async () => {
    try {
      const callbackUrl = `${window.location.origin}${createPageUrl('Home')}`;
      await UserEntity.loginWithRedirect(callbackUrl);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await UserEntity.logout();
      setUser(null);
      navigate(createPageUrl('Landing'));
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      {/* Right side - Logo and Home button */}
      <div className="flex items-center gap-4">
        {currentPage !== 'Chat' && (
          <a href="/Landing" className="flex items-center hover:opacity-80 transition-opacity">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/053b1be56_arenaailogo-new.png"
              alt="Arena AI"
              className="h-10"
            />
          </a>
        )}
        
        {currentPage !== 'Home' && currentPage !== 'Landing' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(createPageUrl('Home'))}
            className="text-slate-600 hover:text-slate-900"
          >
            <Home className="w-4 h-4 ml-2" />
            דף הבית
          </Button>
        )}
      </div>

      {/* Left side - User section */}
      <div className="flex items-center gap-3">
        {isLoading ? (
          <div className="w-8 h-8 animate-spin rounded-full border-2 border-slate-300 border-t-sky-500"></div>
        ) : user ? (
          /* Logged in - show user menu with profile picture */
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-slate-700 hover:text-slate-900">
                <ChevronDown className="w-3 h-3" />
                <div className="text-right">
                  <div className="font-medium">שלום, {user.full_name?.split(' ')[0] || 'משתמש'}</div>
                  {user.is_developer && user.developer_company_name && (
                    <div className="text-xs text-slate-500">{user.developer_company_name}</div>
                  )}
                </div>
                <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-sky-600" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate(createPageUrl('UserProfile'))}>
                <UserCircle className="w-4 h-4 ml-2" />
                פרופיל אישי
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(createPageUrl('Settings'))}>
                <Settings className="w-4 h-4 ml-2" />
                הגדרות
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              
              {/* נכסים שמורים והיסטוריה - למשתמשים רגילים */}
              {!user.is_developer && (
                <>
                  <DropdownMenuItem onClick={() => navigate(createPageUrl('SavedProperties'))}>
                    <Heart className="w-4 h-4 ml-2" />
                    נכסים שמורים
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(createPageUrl('History'))}>
                    <History className="w-4 h-4 ml-2" />
                    היסטוריית חיפושים
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}

              {/* פאנל יזם - ליזמים */}
              {user.is_developer && (
                <>
                  <DropdownMenuItem onClick={() => navigate(createPageUrl('DeveloperDashboard'))}>
                    <Shield className="w-4 h-4 ml-2" />
                    פאנל יזם
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}

              {/* אדמין */}
              {user.role === 'admin' && (
                <>
                  <DropdownMenuItem onClick={() => navigate(createPageUrl('Admin'))}>
                    <Shield className="w-4 h-4 ml-2" />
                    ניהול מערכת
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(createPageUrl('DeveloperAdmin'))}>
                    <Shield className="w-4 h-4 ml-2" />
                    ניהול יזמים
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 ml-2" />
                התנתקות
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          /* Not logged in - show login button */
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogin}
            className="text-slate-700 hover:text-slate-900"
          >
            <User className="w-4 h-4 ml-2" />
            התחברות
          </Button>
        )}
      </div>
    </div>
  );
}