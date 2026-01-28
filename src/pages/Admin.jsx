import React, { useState, useEffect } from "react";
import { Property } from "@/entities/Property";
import { ChatQuestion } from "@/entities/ChatQuestion";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger }
  from "@/components/ui/tabs";
import { ArrowRight, DownloadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from '@/utils';
import PropertyManagement from "../components/admin/PropertyManagement";
import QuestionManagement from "../components/admin/QuestionManagement";
import UserManagement from "../components/admin/UserManagement";
import UserStatisticsDashboard from "../components/admin/UserStatisticsDashboard";
import LeadManagement from "../components/admin/LeadManagement";
import { toast } from "sonner";

export default function Admin() {
  const [properties, setProperties] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("properties");
  const [isLoading, setIsLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState(null);
  const navigate = useNavigate();

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [propertiesData, questionsData, usersData] = await Promise.all([
        Property.list("-created_date"),
        ChatQuestion.list("order"),
        User.list(),
      ]);
      setProperties(propertiesData);
      setQuestions(questionsData);
      setUsers(usersData);
    } catch (error) {
      console.error("Error loading admin data:", error);
      toast.error("שגיאה בטעינת נתוני ניהול");
    }
    setIsLoading(false);
  };

  const refreshData = async () => {
    try {
        const [propertiesData, questionsData, usersData] = await Promise.all([
            Property.list("-created_date"),
            ChatQuestion.list("order"),
            User.list(),
        ]);
        setProperties(propertiesData);
        setQuestions(questionsData);
        setUsers(usersData);
    } catch (error) {
        toast.error("שגיאה ברענון הנתונים");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleImportProperties = async () => {
    setIsImporting(true);
    setImportStatus(null);
    toast.info("מתחיל תהליך ייבוא נכסים. זה עשוי לקחת מספר דקות...");
    
    try {
      const { importProperties } = await import('@/functions/importProperties');
      const result = await importProperties();
      
      if (!result || !result.data) {
        throw new Error("Invalid response from import function");
      }
      
      const status = {
        success: result.data.success,
        message: result.data.message,
        imported: result.data.imported,
        total: result.data.total,
        errors: result.data.errors
      };
      
      setImportStatus(status);
      
      if (status.success) {
        toast.success(`הייבוא הושלם! ${status.imported || 0} נכסים יובאו בהצלחה.`);
        refreshData();
      } else {
        toast.error(`הייבוא נכשל: ${status.message}`);
      }
    } catch (error) {
      const errorMessage = 'שגיאה חמורה בתהליך הייבוא: ' + (error.response?.data?.message || error.message);
      setImportStatus({ success: false, message: errorMessage });
      toast.error(errorMessage);
    }
    
    setIsImporting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white" dir="rtl">
      {/* Top Navigation */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(createPageUrl('Home'))}
            className="text-slate-600 hover:text-slate-900"
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            חזרה לבית
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/a1d576606_a-icon-shadow1.png"
            alt="Arena AI"
            className="w-8 h-8"
          />
          <span className="font-bold text-slate-900">ניהול מערכת</span>
        </div>

        <div></div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">ניהול מערכת</h1>
                <p className="text-slate-600">נהל נכסים, שאלות ומשתמשים</p>
              </div>
              
              {activeTab === "properties" && (
                <div className="flex gap-3">
                  <Button 
                    onClick={handleImportProperties}
                    disabled={isImporting}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isImporting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        מייבא נכסים...
                      </>
                    ) : (
                      <>
                        <DownloadCloud className="w-4 h-4 ml-2" />
                        ייבא כל הנכסים מ-API
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
            
            {importStatus && (
              <div className={`mt-4 p-4 rounded-lg ${
                importStatus.success 
                  ? 'bg-green-100 border border-green-300 text-green-800'
                  : 'bg-red-100 border border-red-300 text-red-800'
              }`}>
                <p className="font-semibold">{importStatus.message}</p>
                {importStatus.imported !== undefined && (
                  <p className="text-sm mt-1">
                    יובאו {importStatus.imported} מתוך {importStatus.total} נכסים
                  </p>
                )}
                {importStatus.errors && importStatus.errors.length > 0 && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm">הצג שגיאות ({importStatus.errors.length})</summary>
                    <ul className="mt-2 text-xs space-y-1">
                      {importStatus.errors.slice(0, 10).map((error, idx) => (
                        <li key={idx} className="text-red-600">{error}</li>
                      ))}
                      {importStatus.errors.length > 10 && (
                        <li className="text-red-500">ועוד {importStatus.errors.length - 10} שגיאות...</li>
                      )}
                    </ul>
                  </details>
                )}
              </div>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 max-w-4xl">
              <TabsTrigger value="properties">ניהול נכסים</TabsTrigger>
              <TabsTrigger value="questions">ניהול שאלות</TabsTrigger>
              <TabsTrigger value="users">ניהול משתמשים</TabsTrigger>
              <TabsTrigger value="leads">לידים</TabsTrigger>
              <TabsTrigger value="user-statistics">סטטיסטיקת משתמשים</TabsTrigger>
            </TabsList>

            <TabsContent value="properties">
              <PropertyManagement
                properties={properties}
                onRefresh={refreshData}
                isLoading={isLoading}
              />
            </TabsContent>

            <TabsContent value="questions">
              <QuestionManagement
                questions={questions}
                onRefresh={refreshData}
                isLoading={isLoading}
              />
            </TabsContent>

            <TabsContent value="users">
              <UserManagement
                users={users}
                onRefresh={refreshData}
                isLoading={isLoading}
              />
            </TabsContent>

            <TabsContent value="leads">
              <LeadManagement
                onRefresh={refreshData}
                isLoading={isLoading}
              />
            </TabsContent>

            <TabsContent value="user-statistics">
              <UserStatisticsDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}