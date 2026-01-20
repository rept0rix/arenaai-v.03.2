import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Settings, ArrowUp, User as UserIcon, Compass, History, ChevronLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { base44 } from '@/api/base44Client';
import TopNavigation from '../components/TopNavigation';
import { Card } from '@/components/ui/card';

const quickStartOptions = [
"פריסייל חדש בתל אביב - לפני כולם",
"דירת 3 חדרים בת\"א - קומה גבוהה ונוף פתוח",
"דירה עם גינה למשפחה עם ילדים קטנים",
"השקעה בנכס מניב עם תשואה גבוהה",
"דירה עם מטבח פתוח גדול ומרפסת לאירוח",
"דירות להשקעה עם תשואה גבוהה וביקוש קבוע",
"דירה שקטה עם ירוק מסביב וקהילה חמה"
];


export default function YourBackPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recentHistory, setRecentHistory] = useState([]);
  const [chatSessions, setChatSessions] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const checkAuthAndPurpose = async () => {
      setIsLoading(true);
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);

        // Load recent history and sessions
        const [historyData, sessionsData] = await Promise.all([
          base44.entities.SearchHistory.list('-created_date', 5),
          base44.entities.ChatSession.list('-updated_date', 5)
        ]);
        
        setRecentHistory(historyData || []);
        
        // Add demo sessions if no sessions exist
        const sessions = sessionsData || [];
        if (sessions.length === 0) {
          sessions.push({
            id: 'demo-1',
            purpose: 'living',
            created_date: new Date().toISOString(),
            updated_date: new Date().toISOString(),
            answers: {
              city: 'תל אביב',
              location: 'רמת אביב',
              rooms: 4,
              budget_max: 4500000,
              features: ['מרפסת גדולה', 'קרוב לגינה'],
              match_percentage: 87,
              top_property: {
                title: 'דירת 4 חדרים מרווחת ברמת אביב',
                image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
                price: 4200000,
                location: 'רמת אביב, תל אביב'
              }
            }
          });
          sessions.push({
            id: 'demo-2',
            purpose: 'investment',
            created_date: new Date(Date.now() - 86400000).toISOString(),
            updated_date: new Date(Date.now() - 86400000).toISOString(),
            answers: {
              city: 'חיפה',
              rooms: 3,
              budget_max: 2000000,
              features: ['קרוב לאוניברסיטה', 'פוטנציאל להשכרה']
            }
          });
        }
        
        setChatSessions(sessions);

        const urlPurpose = searchParams.get('purpose');
        if (urlPurpose) {
          setSelectedPurpose(urlPurpose);
        }

      } catch (error) {
        setUser(null);
        const urlPurpose = searchParams.get('purpose');
        if (urlPurpose) {
          setSelectedPurpose(urlPurpose);
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthAndPurpose();
  }, [searchParams]);

  const handleSearch = (query) => {
    if (!selectedPurpose) {
      alert('אנא בחר מטרת חיפוש לפני תחילת השיחה');
      return;
    }
    if (!query.trim()) return;

    // If user is not logged in, save intent and redirect to login
    if (!user) {
      localStorage.setItem('pendingChatRedirect', JSON.stringify({ purpose: selectedPurpose, query: query, isGuided: false }));
      navigate(createPageUrl('login'));
      return;
    }

    const chatUrl = createPageUrl(`Chat?purpose=${selectedPurpose}&q=${encodeURIComponent(query)}`);
    navigate(chatUrl);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const handleGuidedJourney = () => {
    if (!selectedPurpose) {
      alert('אנא בחר מטרת חיפוש לפני תחילת המסע המודרך');
      return;
    }

    // If user is not logged in, save intent and redirect to login
    if (!user) {
      localStorage.setItem('pendingChatRedirect', JSON.stringify({ purpose: selectedPurpose, query: null, isGuided: true }));
      navigate(createPageUrl('login'));
      return;
    }

    navigate(createPageUrl(`Chat?purpose=${selectedPurpose}&guided=true`));
  };

  const handleQuickOption = (option) => {
    if (!selectedPurpose) {
      alert('אנא בחר מטרת חיפוש לפני תחילת החיפוש');
      return;
    }

    // If user is not logged in, save intent and redirect to login
    if (!user) {
      localStorage.setItem('pendingChatRedirect', JSON.stringify({ purpose: selectedPurpose, query: option, isGuided: false }));
      navigate(createPageUrl('login'));
      return;
    }

    handleSearch(option);
  };

  const getSessionName = (session) => {
    // Generate name based on answers
    const answers = session.answers || {};
    const parts = [];
    
    if (answers.location || answers.city) {
      parts.push(answers.location || answers.city);
    }
    if (answers.rooms) {
      parts.push(`${answers.rooms} חדרים`);
    }
    if (answers.property_type) {
      parts.push(answers.property_type);
    }
    
    if (parts.length > 0) {
      return parts.join(' • ');
    }
    
    return session.purpose === 'living' ? 'חיפוש נכס למגורים' : 'חיפוש נכס להשקעה';
  };

  const getSessionConversation = (session) => {
    const conversation = [];
    const answers = session.answers || {};
    
    // Purpose question
    if (session.purpose) {
      conversation.push({
        question: 'לאיזו מטרה את/ה מחפש/ת נכס?',
        answer: session.purpose === 'living' ? 'נכס למגורים' : 'נכס להשקעה'
      });
    }
    
    // Location
    if (answers.location || answers.city) {
      conversation.push({
        question: 'באיזה אזור את/ה מחפש/ת?',
        answer: answers.location || answers.city
      });
    }
    
    // Rooms
    if (answers.rooms) {
      conversation.push({
        question: 'כמה חדרים את/ה מחפש/ת?',
        answer: `${answers.rooms} חדרים`
      });
    }
    
    // Budget
    if (answers.budget_max) {
      conversation.push({
        question: 'מה התקציב שלך?',
        answer: `עד ${(answers.budget_max / 1000000).toFixed(1)} מיליון ₪`
      });
    }
    
    // Additional features
    if (answers.features && answers.features.length > 0) {
      conversation.push({
        question: 'מה חשוב לך בנכס?',
        answer: answers.features.slice(0, 2).join(', ')
      });
    }
    
    return conversation.slice(0, 3); // Show max 3 Q&As
  };

  const getTopProperty = (session) => {
    return session.answers?.top_property || null;
  };

  const getMatchPercentage = (session) => {
    return session.answers?.match_percentage || session.answers?.matchPercentage || null;
  };

  const getHistoryContent = (item) => {
    if (item.type === 'comparison' && item.propertiesSnapshot?.length > 0) {
      const propTitles = item.propertiesSnapshot.slice(0, 2).map(p => p.title || p.location).join(' • ');
      return propTitles;
    }
    
    if (item.filters) {
      const parts = [];
      if (item.filters.rooms) parts.push(`${item.filters.rooms} חדרים`);
      if (item.filters.location || item.filters.city) parts.push(item.filters.location || item.filters.city);
      if (item.filters.budget_max) parts.push(`עד ${(item.filters.budget_max / 1000000).toFixed(1)}M ₪`);
      if (parts.length > 0) return parts.join(' • ');
    }
    
    return 'חיפוש ללא פרטים';
  };

  const getHistoryType = (item) => {
    if (item.type === 'comparison') return 'השוואה';
    if (item.type === 'financing_consultation') return 'מימון';
    return 'חיפוש';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `לפני ${diffMins} דקות`;
    if (diffHours < 24) return `לפני ${diffHours} שעות`;
    if (diffDays < 7) return `לפני ${diffDays} ימים`;
    
    return date.toLocaleDateString('he-IL', { day: 'numeric', month: 'short' });
  };

  const handleSessionClick = (session) => {
    const chatUrl = createPageUrl(`Chat?session=${session.id}&purpose=${session.purpose || 'general'}`);
    navigate(chatUrl);
  };

  const handleHistoryClick = (historyItem) => {
    if (historyItem.type === 'comparison' && historyItem.propertyIds?.length > 0) {
      const comparisonUrl = createPageUrl(`PropertyComparison?properties=${historyItem.propertyIds.join(',')}`);
      navigate(comparisonUrl);
    } else {
      navigate(createPageUrl('History'));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-slate-600">טוען...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavigation currentPage="YourBack" />
      
      <div className="flex-1 w-full flex flex-col items-center justify-center p-4 bg-slate-50">
        <div className="max-w-3xl w-full flex flex-col items-center">
          
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-slate-200/80 mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-t-2xl p-6 border-b border-slate-200/80 flex items-center gap-6">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c276074aac6e6711db72a6/fefa17145_logoarena3d.png"
                alt="Arena AI Logo" 
                className="w-10 h-10 flex-shrink-0 animate-bounce" 
              />

              <div className="text-right flex-1">
                <p className="text-lg font-semibold mb-4 text-slate-800">
                  היי {user?.full_name?.split(' ')[0] || 'משתמש'}!
                </p>
                <p className="text-slate-700 mb-4">
                  אפשר להמשיך את השיחה הקודמת מאיפה שעצרנו או ליצור שיחה חדשה
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => navigate(createPageUrl('Chat'))}
                    className="bg-sky-500 hover:bg-sky-600 text-white"
                  >
                    המשך שיחה
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate(createPageUrl('Home'))}
                    className="bg-white hover:bg-slate-50"
                  >
                    התחל שיחה חדשה
                  </Button>
                </div>
              </div>
            </div>
            
            <div id="new-chat-section" className="bg-slate-50/70 p-4 rounded-b-2xl border-t border-slate-200/80">
              <div className="space-y-3">
                <p className="text-slate-800 font-medium text-right">
                  לאיזו מטרה את/ה מחפש/ת נכס?
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={selectedPurpose === 'living' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPurpose('living')}
                    className={selectedPurpose === 'living' ? "bg-sky-500 hover:bg-sky-600 text-white" : "bg-white hover:bg-slate-50"}
                  >
                    נכס למגורים
                  </Button>
                  <Button
                    variant={selectedPurpose === 'investment' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPurpose('investment')}
                    className={selectedPurpose === 'investment' ? "bg-sky-500 hover:bg-sky-600 text-white" : "bg-white hover:bg-slate-50"}
                  >
                    נכס להשקעה
                  </Button>
                </div>
              </div>
              
              <form onSubmit={handleFormSubmit} className="relative mt-4">
                <Textarea
                  placeholder="לדוגמה: אני מחפש דירת 4 חדרים מרווחת עם מרפסת שמש באזור שקט של תל אביב, קרוב לגינה ציבורית. התקציב שלי הוא עד 4.5 מיליון שקלים..."
                  className="bg-white text-right px-4 py-4 text-lg flex min-h-[80px] ring-offset-background focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-xl border-2 border-slate-200 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:border-sky-400 resize-none shadow-sm placeholder:text-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  rows={5}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleGuidedJourney}
                  className="absolute bottom-4 right-4 text-slate-600 hover:text-slate-800 flex items-center gap-1 text-sm"
                >
                  <Compass className="w-4 h-4" />
                  מסע מודרך
                </Button>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className="text-slate-500 text-sm mb-2 w-full text-center">או התחל עם משהו ממה שמחפשים הכי הרבה:</span>
            {quickStartOptions.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickOption(option)}
                className="bg-white hover:bg-slate-50 text-slate-700 border-slate-200 px-4 py-2 rounded-full"
              >
                {option}
              </Button>
            ))}
          </div>

          {user && (chatSessions.length > 0 || recentHistory.length > 0) && (
            <div className="w-full max-w-2xl mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-800">שיחות אחרונות</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(createPageUrl('History'))}
                  className="text-sky-600 hover:text-sky-700"
                >
                  ראה הכל
                  <ChevronLeft className="w-4 h-4 mr-1" />
                </Button>
              </div>

              <div className="space-y-4">
                {chatSessions.map((session) => {
                  const matchPercentage = getMatchPercentage(session);
                  const topProperty = getTopProperty(session);
                  const conversation = getSessionConversation(session);
                  const sessionName = getSessionName(session);
                  
                  return (
                    <Card
                      key={session.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow bg-white border-slate-200"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Right side - Property image or placeholder */}
                        <div className="w-full md:w-48 h-48 bg-slate-100 flex-shrink-0 relative">
                          {topProperty?.image_url ? (
                            <>
                              <img 
                                src={topProperty.image_url} 
                                alt={topProperty.title}
                                className="w-full h-full object-cover"
                              />
                              {matchPercentage && (
                                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-lg text-sm font-bold shadow-lg">
                                  {matchPercentage}% התאמה
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <div className="text-center">
                                <Compass className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">השיחה בתהליך</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Left side - Content */}
                        <div className="flex-1 p-4">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-slate-800 mb-1">{sessionName}</h3>
                              <div className="flex items-center gap-2">
                                <span className="inline-block px-2 py-0.5 bg-sky-50 text-sky-700 text-xs rounded-full border border-sky-200">
                                  {session.purpose === 'living' ? 'מגורים' : 'השקעה'}
                                </span>
                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatDate(session.updated_date || session.created_date)}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Conversation snippet */}
                          {conversation.length > 0 && (
                            <div className="space-y-2 mb-3">
                              {conversation.map((qa, idx) => (
                                <div key={idx} className="text-sm">
                                  <p className="text-slate-500">{qa.question}</p>
                                  <p className="text-slate-700 font-medium">{qa.answer}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Action button */}
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleSessionClick(session)}
                              className={topProperty && matchPercentage ? 
                                "bg-green-600 hover:bg-green-700 text-white flex-1" : 
                                "bg-sky-600 hover:bg-sky-700 text-white flex-1"
                              }
                              size="sm"
                            >
                              {topProperty && matchPercentage ? 'הנכס הזה מותאם לך' : 'חזור לשיחה'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}

                {recentHistory.map((item) => (
                  <Card
                    key={item.id}
                    className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-white border-slate-200"
                    onClick={() => handleHistoryClick(item)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <History className="w-4 h-4 text-purple-600" />
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-block px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded-full border border-purple-200">
                              {getHistoryType(item)}
                            </span>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDate(item.created_date)}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">{getHistoryContent(item)}</p>
                      </div>
                      <ChevronLeft className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}