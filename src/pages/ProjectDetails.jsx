import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TopNavigation from '../components/TopNavigation';
import ProjectFloorplan from '../components/properties/ProjectFloorplan';
import ChatInterface from '../components/chat/ChatInterface';
import { mockProperties, getPropertiesByProject } from '../components/properties/mockPropertiesData';
import { createPageUrl } from '@/utils';
import { ChatSession } from '@/entities/ChatSession';
import { ChatQuestion } from '@/entities/ChatQuestion';
import { User as UserEntity } from '@/entities/User';

export default function ProjectDetails() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [projectProperties, setProjectProperties] = useState([]);
  const [projectInfo, setProjectInfo] = useState(null);
  const [chatSession, setChatSession] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [user, setUser] = useState(null);

  const projectId = searchParams.get('id');

  useEffect(() => {
    checkUser();
    loadQuestions();
    if (projectId) {
      loadProjectData(projectId);
    } else {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (user && !chatSession && projectInfo) {
      initializeChatSession();
    }
  }, [user, chatSession, projectInfo]);

  const checkUser = async () => {
    try {
      const currentUser = await UserEntity.me();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
  };

  const loadQuestions = async () => {
    try {
      const questionsData = await ChatQuestion.list('order');
      const activeQuestions = questionsData.filter(q => q.is_active);
      setQuestions(activeQuestions);
    } catch (error) {
      console.error('Failed to load questions:', error);
      setQuestions([]);
    }
  };

  const initializeChatSession = async () => {
    if (!chatSession && user && projectInfo) {
      try {
        const projectContext = {
          viewing_project_id: projectInfo.id,
          viewing_project_name: projectInfo.name,
          project_developer: projectInfo.developer,
          project_location: projectInfo.location,
          total_units: projectInfo.totalUnits
        };
        
        const newSession = await ChatSession.create({
          answers: { project_context: projectContext },
          current_question: 0,
          completed: false,
          purpose: 'living',
          is_guided: false
        });
        setChatSession(newSession);
      } catch (err) {
        console.error("Failed to create chat session:", err);
      }
    }
  };

  const handleChatOpen = () => {
    if (!user) {
      UserEntity.loginWithRedirect(window.location.href);
      return;
    }
    initializeChatSession();
  };

  const loadProjectData = async (id) => {
    setIsLoading(true);
    try {
      // Get all properties for this project from mock data
      const properties = getPropertiesByProject(id);
      
      if (properties.length > 0) {
        setProjectProperties(properties);
        
        // Extract project info from first property
        const firstProp = properties[0];
        setProjectInfo({
          id: id,
          name: firstProp.project_name,
          developer: firstProp.developer,
          location: firstProp.city,
          address: firstProp.address,
          totalUnits: firstProp.project_total_units
        });
      }
    } catch (error) {
      console.error('Error loading project data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-sky-500 mx-auto mb-4" />
          <p className="text-slate-600">טוען פרטי פרויקט...</p>
        </div>
      </div>
    );
  }

  if (!projectId || !projectInfo) {
    return (
      <div>
        <TopNavigation currentPage="ProjectDetails" />
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">הפרויקט לא נמצא</h2>
          <p className="text-slate-500 mb-6">לא הצלחנו למצוא את הפרויקט שחיפשת.</p>
          <Button onClick={() => navigate(createPageUrl('Chat'))} className="bg-sky-500 hover:bg-sky-600">
            חזרה לחיפוש
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה
          </Button>
          <TopNavigation currentPage="ProjectDetails" />
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex-1 min-h-0 flex flex-row">
        {/* Project Details - Left Side */}
        <div className="flex-1 h-full overflow-y-auto border-l border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <ProjectFloorplan
              projectId={projectId}
              properties={projectProperties}
            />
          </div>
        </div>

        {/* Chat Panel - Right Side */}
        <div className="w-96 h-full flex-shrink-0 border-r border-slate-200 bg-white flex flex-col">
          <div className="p-4 border-b border-slate-200 bg-gradient-to-br from-sky-50 to-purple-50">
            <h3 className="text-lg font-semibold text-slate-900">💬 שיחה עם ארנה</h3>
          </div>
          <div className="flex-1 overflow-hidden">
            {!user ? (
              <div className="flex items-center justify-center h-full p-6">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600 mb-4">התחבר כדי לשאול שאלות על הפרויקט</p>
                  <button
                    onClick={handleChatOpen}
                    className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                  >
                    התחבר
                  </button>
                </div>
              </div>
            ) : !chatSession ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
              </div>
            ) : (
              <ChatInterface
                questions={questions}
                currentSession={chatSession}
                onUpdateAnswer={async () => chatSession}
                filteredCount={projectProperties.length}
                isMobile={false}
                isSelectionMode={false}
                setIsSelectionMode={() => {}}
                contextMessage={projectInfo ? {
                  type: 'project_view',
                  title: `מסתכל עכשיו על: ${projectInfo.name}`,
                  details: `${projectInfo.developer} • ${projectInfo.location} • ${projectProperties.length} דירות זמינות`,
                  message: 'אני כאן כדי לעזור לך להחליט!'
                } : null}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}