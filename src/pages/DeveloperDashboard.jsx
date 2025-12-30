
import React, { useState, useEffect } from 'react';
import { User as UserEntity } from '@/entities/User';
import { DeveloperSubscription } from '@/entities/DeveloperSubscription';
import { Project } from '@/entities/Project';
import { Developer } from '@/entities/Developer';
import { Invoice } from '@/entities/Invoice';
import { ProjectInteraction } from '@/entities/ProjectInteraction';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Building, Plus, Eye, CreditCard, Users, BarChart3, TrendingUp, Handshake, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import TopNavigation from '../components/TopNavigation';
import { toast } from 'sonner';
import DeveloperForm from '../components/admin/DeveloperForm';
import DeveloperProjectManager from '../components/developer/DeveloperProjectManager';
import BillingTab from '../components/developer/BillingTab';
import AnalyticsTab from '../components/developer/AnalyticsTab';

// Component to display developer company profile and handle editing
const CompanyProfileView = ({ developer, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);

    if (!developer) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>טוען פרטי חברה...</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-600">המידע על החברה שלך נטען.</p>
                </CardContent>
            </Card>
        );
    }

    if (isEditing) {
        return (
            <DeveloperForm 
                developer={developer} 
                onSave={(data) => {
                    onSave(data);
                    setIsEditing(false); // Exit edit mode after saving
                }}
                onCancel={() => setIsEditing(false)} // Cancel edit mode
            />
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>פרטי חברה</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Pencil className="h-4 w-4 ml-2" />
                    ערוך פרטים
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold text-lg">{developer.name_he}</h3>
                    <p className="text-sm text-slate-600">{developer.name_en}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium">כתובת</p>
                        <p className="text-sm text-slate-600">{developer.address || 'לא צוין'}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">טלפון</p>
                        <p className="text-sm text-slate-600">{developer.phone || 'לא צוין'}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">אימייל</p>
                        <p className="text-sm text-slate-600">{developer.email || 'לא צוין'}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">אתר אינטרנט</p>
                        <p className="text-sm text-slate-600">
                            {developer.website ? (
                                <a href={developer.website} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                                    {developer.website}
                                </a>
                            ) : 'לא צוין'}
                        </p>
                    </div>
                    <div className="md:col-span-2">
                        <p className="text-sm font-medium">תיאור</p>
                        <p className="text-sm text-slate-600">{developer.description || 'לא צוין'}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};


export default function DeveloperDashboard() {
    const [user, setUser] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const [developer, setDeveloper] = useState(null);
    const [projects, setProjects] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [interactions, setInteractions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("dashboard");
    const navigate = useNavigate();

    useEffect(() => {
        loadDeveloperData();
    }, []);

    const loadDeveloperData = async () => {
        setIsLoading(true);
        try {
            const currentUser = await UserEntity.me();
            setUser(currentUser);

            if (!currentUser.is_developer && !currentUser.developer_subscription_id) {
                // If the user is not marked as a developer and has no subscription ID,
                // it implies they need to set up their developer profile first.
                // We will direct them to the "company" tab (or "setup" if we decide to keep it separate for initial flow).
                // For now, let's direct to 'company' which then shows DeveloperForm for initial setup.
                // If they have developer_company_name but not is_developer, they will load into 'company' tab to verify/edit.
                // If no company name is set, they'll also see the setup form.
                if (!currentUser.developer_company_name) {
                    setActiveTab("company"); // Direct to company setup if no company name is found
                }
            }

            if (currentUser.developer_subscription_id) {
                const subscriptions = await DeveloperSubscription.filter({ 
                    id: currentUser.developer_subscription_id 
                });
                if (subscriptions.length > 0) {
                    setSubscription(subscriptions[0]);
                }
            }
            
            if (currentUser.developer_company_name) {
                const developers = await Developer.filter({ 
                    name_he: currentUser.developer_company_name 
                });
                if (developers.length > 0) {
                    const currentDeveloper = developers[0];
                    setDeveloper(currentDeveloper);
                    
                    const [devProjects, devInvoices, devInteractions] = await Promise.all([
                        Project.filter({ developerId: currentDeveloper.id }),
                        Invoice.filter({ developerId: currentDeveloper.id }),
                        ProjectInteraction.filter({ developerId: currentDeveloper.id })
                    ]);
                    
                    setProjects(devProjects);
                    setInvoices(devInvoices);
                    setInteractions(devInteractions);
                } else {
                    // This case means a company name is set on the user, but no corresponding developer entity exists.
                    // This could be an inconsistency or a first-time scenario where the developer entity needs creation.
                    // Directing to 'company' tab will handle the creation flow if 'developer' state is null.
                    setActiveTab("company"); 
                }
            } else {
                // No developer_company_name implies first time setup for developer profile
                setActiveTab("company");
            }


        } catch (error) {
            console.error('Error loading developer data:', error);
            toast.error('שגיאה בטעינת נתוני היזם');
        }
        setIsLoading(false);
    };

    const handleDeveloperSetup = async (developerData) => {
        try {
            let savedDeveloper;
            if (developer) {
                savedDeveloper = await Developer.update(developer.id, developerData);
            } else {
                savedDeveloper = await Developer.create(developerData);
            }

            // Update user to mark as developer and link company name
            await UserEntity.updateMyUserData({
                is_developer: true,
                developer_company_name: developerData.name_he
            });

            setDeveloper(savedDeveloper);
            setActiveTab("dashboard");
            toast.success('פרטי החברה נשמרו בהצלחה!');
            loadDeveloperData(); // Reload all data to ensure consistency with potentially new developer entity
        } catch (error) {
            console.error('Error setting up developer:', error);
            toast.error('שגיאה בשמירת פרטי החברה');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50" dir="rtl">
                <TopNavigation currentPage="DeveloperDashboard" />
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
                        <p className="text-slate-600">טוען נתוני יזם...</p>
                    </div>
                </div>
            </div>
        );
    }

    const getSubscriptionStatus = () => {
        if (!subscription) return { status: 'לא פעיל', color: 'bg-gray-100 text-gray-800' };
        if (subscription.isSigned) return { status: 'פעיל', color: 'bg-green-100 text-green-800' };
        return { status: 'ממתין לאישור', color: 'bg-yellow-100 text-yellow-800' };
    };

    const subscriptionStatus = getSubscriptionStatus();
    // Only count views and inquiries for the current developer's projects
    const totalViews = interactions.filter(i => i.interactionType === 'view' && projects.some(p => p.id === i.projectID)).length;
    const totalInquiries = interactions.filter(i => i.interactionType === 'inquiry' && projects.some(p => p.id === i.projectID)).length;


    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <TopNavigation currentPage="DeveloperDashboard" />
            
            <div className="p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">פאנל ניהול יזם</h1>
                                <p className="text-slate-600 mt-2">
                                    {user?.developer_company_name || 'ברוך הבא למערכת הניהול של ARENA'}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge className={subscriptionStatus.color}>
                                    {subscriptionStatus.status}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                        <TabsList className="grid w-full grid-cols-5 max-w-3xl">
                            <TabsTrigger value="dashboard">דשבורד</TabsTrigger>
                            <TabsTrigger value="projects">פרויקטים</TabsTrigger>
                            <TabsTrigger value="billing">חיובים וחשבוניות</TabsTrigger>
                            <TabsTrigger value="analytics">דוחות וסטטיסטיקות</TabsTrigger>
                            <TabsTrigger value="company">פרטי חברה</TabsTrigger>
                        </TabsList>

                        <TabsContent value="dashboard">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Projects Count */}
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">פרויקטים במערכת</CardTitle>
                                        <Building className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{projects.length}</div>
                                        <p className="text-xs text-muted-foreground">
                                            {subscription ? `מתוך ${subscription.projectCount} בחבילה` : 'פרויקטים פעילים'}
                                        </p>
                                    </CardContent>
                                </Card>
                                
                                {/* Total Views */}
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">צפיות בפרויקטים</CardTitle>
                                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{totalViews}</div>
                                        <p className="text-xs text-muted-foreground">
                                            סך כל הצפיות החודש
                                        </p>
                                    </CardContent>
                                </Card>
                                
                                {/* Total Inquiries */}
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">פניות חדשות</CardTitle>
                                        <Handshake className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{totalInquiries}</div>
                                        <p className="text-xs text-muted-foreground">
                                            סך כל הפניות שהתקבלו
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Subscription Info Card */}
                                {subscription && (
                                    <Card>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">המנוי שלי</CardTitle>
                                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">{subscription.projectCount} פרויקטים</div>
                                            <p className="text-xs text-muted-foreground">
                                                תקופה: {subscription.subscriptionPeriod} חודשים
                                            </p>
                                            <div className="mt-2">
                                                <p className="text-sm">₪{subscription.monthlyFee?.toLocaleString()} לחודש</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 mt-6 mb-6">
                                <Button 
                                    onClick={() => navigate(createPageUrl(`Chat?developer=${developer?.id}`))}
                                    className="bg-sky-500 hover:bg-sky-600"
                                >
                                    <Eye className="w-4 h-4 ml-2" />
                                    צפה בפרויקטים שלי בתוצאות חיפוש
                                </Button>
                                <Button 
                                    variant="outline"
                                    onClick={() => setActiveTab("projects")}
                                >
                                    <Plus className="w-4 h-4 ml-2" />
                                    נהל פרויקטים
                                </Button>
                            </div>

                            {/* Recent Projects */}
                            {projects.length > 0 && (
                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle>פרויקטים אחרונים</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {projects.slice(0, 3).map(project => (
                                                <div key={project.id} className="flex items-center justify-between p-3 border rounded">
                                                    <div>
                                                        <h4 className="font-medium">{project.name_he}</h4>
                                                        <p className="text-sm text-slate-600">{project.city}</p>
                                                    </div>
                                                    <Button size="sm" variant="outline" onClick={() => navigate(createPageUrl(`developer-project/${project.id}`))}>
                                                        ערוך
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        <TabsContent value="projects">
                            <DeveloperProjectManager 
                                developer={developer} 
                                projects={projects}
                                interactions={interactions}
                                onProjectsChange={loadDeveloperData}
                            />
                        </TabsContent>
                        
                        <TabsContent value="billing">
                            <BillingTab invoices={invoices} />
                        </TabsContent>

                        <TabsContent value="analytics">
                            <AnalyticsTab interactions={interactions} projects={projects} />
                        </TabsContent>

                        <TabsContent value="company">
                            {developer ? (
                                <CompanyProfileView 
                                    developer={developer} 
                                    onSave={handleDeveloperSetup}
                                />
                            ) : (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>הקמת פרופיל חברה</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-600 mb-4">
                                            כדי להתחיל לנהל פרויקטים, תחילה יש להקים פרופיל חברה במערכת.
                                        </p>
                                        <DeveloperForm 
                                            onSave={handleDeveloperSetup}
                                            onCancel={() => setActiveTab("dashboard")} // If setup is cancelled, go back to dashboard
                                        />
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>

                        {/* This tab ("setup") is conceptually for first-time setup logic,
                            but its content can be integrated into the "company" tab or used for generic account settings.
                            Keeping it separate for now as it was in original code, but its trigger for first-time login
                            was changed to "company" tab. */}
                        <TabsContent value="setup">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>הגדרות חשבון</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium">סטטוס יזם</label>
                                            <p className="text-sm text-slate-600">
                                                {user?.is_developer ? 'החשבון מוגדר כיזם' : 'החשבון לא מוגדר כיזם'}
                                            </p>
                                        </div>
                                        
                                        {subscription && (
                                            <div>
                                                <label className="text-sm font-medium">פרטי מנוי</label>
                                                <div className="text-sm text-slate-600 space-y-1">
                                                    <p>חברה: {subscription.advertiserName}</p>
                                                    <p>מספר פרויקטים: {subscription.projectCount}</p>
                                                    <p>תקופה: {subscription.subscriptionPeriod} חודשים</p>
                                                    <p>סטטוס: {subscription.isSigned ? 'חתום' : 'ממתין לחתימה'}</p>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>תמיכה ועזרה</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Button variant="outline" className="w-full justify-start">
                                            <Users className="w-4 h-4 ml-2" />
                                            צור קשר עם התמיכה
                                        </Button>
                                        <Button variant="outline" className="w-full justify-start">
                                            <BarChart3 className="w-4 h-4 ml-2" />
                                            מדריך למשתמש
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
