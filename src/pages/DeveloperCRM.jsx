import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Building, Users, FolderKanban, TrendingUp, Eye, Target, MousePointerClick, Award, BarChart3, Zap, Star } from 'lucide-react';
import { toast } from "sonner";
import DeveloperForm from '@/components/admin/DeveloperForm';
import ProjectForm from '@/components/admin/ProjectForm';
import AssetTypeForm from '@/components/admin/AssetTypeForm';
import TopNavigation from '@/components/TopNavigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function DeveloperCRM() {
    const navigate = useNavigate();
    const [developers, setDevelopers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [assetTypesByProject, setAssetTypesByProject] = useState({});
    const [interactions, setInteractions] = useState([]);
    const [leads, setLeads] = useState([]);
    const [meetings, setMeetings] = useState([]);

    const [showDeveloperForm, setShowDeveloperForm] = useState(false);
    const [editingDeveloperData, setEditingDeveloperData] = useState(null);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [editingProjectData, setEditingProjectData] = useState(null);
    const [showAssetTypeForm, setShowAssetTypeForm] = useState(false);
    const [editingAssetTypeData, setEditingAssetTypeData] = useState(null);
    const [currentProjectIdForAssetType, setCurrentProjectIdForAssetType] = useState(null);

    const [activeTab, setActiveTab] = useState('dashboard');

    useEffect(() => {
        loadDevelopers();
        loadAllProjects();
        loadInteractions();
        loadLeads();
        loadMeetings();
    }, []);

    const loadDevelopers = async () => {
        const devs = await base44.entities.Developer.list('-created_date');
        setDevelopers(devs);
    };

    const loadAllProjects = async () => {
        const allProjects = await base44.entities.Project.list('-created_date');
        setProjects(allProjects);
        allProjects.forEach(p => loadAssetTypes(p.id));
    };

    const loadAssetTypes = async (projectId) => {
        const types = await base44.entities.AssetType.filter({ projectId });
        setAssetTypesByProject(prev => ({
            ...prev,
            [projectId]: types
        }));
    };

    const loadInteractions = async () => {
        try {
            const data = await base44.entities.ProjectInteraction.list('-created_date');
            setInteractions(data);
        } catch (error) {
            console.error('Error loading interactions:', error);
        }
    };

    const loadLeads = async () => {
        try {
            const data = await base44.entities.Lead.list('-created_date');
            setLeads(data);
        } catch (error) {
            console.error('Error loading leads:', error);
        }
    };

    const loadMeetings = async () => {
        try {
            const data = await base44.entities.Meeting.list('-created_date');
            setMeetings(data);
        } catch (error) {
            console.error('Error loading meetings:', error);
        }
    };



    const handleAddDeveloper = () => {
        setEditingDeveloperData(null);
        setShowDeveloperForm(true);
    };

    const handleEditDeveloper = (dev) => {
        setEditingDeveloperData(dev);
        setShowDeveloperForm(true);
    };

    const onDeveloperSaved = () => {
        loadDevelopers();
        setShowDeveloperForm(false);
        setEditingDeveloperData(null);
    };

    const handleAddProject = () => {
        setEditingProjectData(null);
        setShowProjectForm(true);
    };

    const handleEditProject = (project) => {
        setEditingProjectData(project);
        setShowProjectForm(true);
    };

    const onProjectSaved = () => {
        setShowProjectForm(false);
        setEditingProjectData(null);
        loadAllProjects();
    };

    const handleAddAssetType = (projectId) => {
        setEditingAssetTypeData(null);
        setCurrentProjectIdForAssetType(projectId);
        setShowAssetTypeForm(true);
    };

    const handleEditAssetType = (asset) => {
        setEditingAssetTypeData(asset);
        setCurrentProjectIdForAssetType(asset.projectId);
        setShowAssetTypeForm(true);
    };

    const onAssetTypeSaved = (savedAssetType) => {
        setShowAssetTypeForm(false);
        loadAssetTypes(savedAssetType.projectId);
    };

    const handleDeleteDeveloper = async (dev) => {
        if (confirm(`האם למחוק את היזם "${dev.name_he}" וכל הפרויקטים והנכסים המשויכים לו?`)) {
            try {
                await base44.entities.Developer.delete(dev.id);
                toast.success("היזם נמחק");
                loadDevelopers();
                loadAllProjects();
            } catch (error) {
                toast.error("שגיאה במחיקת היזם");
                console.error(error);
            }
        }
    };

    const handleDeleteProject = async (proj) => {
        if (confirm(`האם למחוק את הפרויקט "${proj.name_he}"?`)) {
            try {
                await base44.entities.Project.delete(proj.id);
                toast.success("הפרויקט נמחק");
                loadAllProjects();
            } catch (error) {
                toast.error("שגיאה במחיקת הפרויקט");
                console.error(error);
            }
        }
    };

    const handleDeleteAssetType = async (asset) => {
        if (confirm(`האם למחוק את סוג הנכס "${asset.type_name}"?`)) {
            try {
                await base44.entities.AssetType.delete(asset.id);
                toast.success("סוג הנכס נמחק");
                loadAssetTypes(asset.projectId);
            } catch (error) {
                toast.error("שגיאה במחיקת סוג הנכס");
                console.error(error);
            }
        }
    };

    const getDeveloperName = (developerId) => {
        const dev = developers.find(d => d.id === developerId);
        return dev?.name_he || 'לא ידוע';
    };

    const renderDashboard = () => {
        const totalDevelopers = developers.length;
        const totalProjects = projects.length;
        const recentProjects = projects.slice(0, 5);
        
        // חישוב פרויקטים מובילים לפי צפיות
        const projectViews = {};
        interactions.forEach(int => {
            if (int.interactionType === 'view') {
                projectViews[int.projectId] = (projectViews[int.projectId] || 0) + 1;
            }
        });
        const topProjects = Object.entries(projectViews)
            .map(([projectId, views]) => ({
                project: projects.find(p => p.id === projectId),
                views
            }))
            .filter(item => item.project)
            .sort((a, b) => b.views - a.views)
            .slice(0, 5);

        // חישוב סה"כ חשיפות
        const totalViews = interactions.filter(i => i.interactionType === 'view').length;
        const totalInquiries = interactions.filter(i => i.interactionType === 'inquiry').length;

        // דירות/נכסים מומלצים ביותר (לפי פניות)
        const assetPopularity = {};
        leads.forEach(lead => {
            if (lead.property_id) {
                assetPopularity[lead.property_id] = (assetPopularity[lead.property_id] || 0) + 1;
            }
        });
        const topAssets = Object.entries(assetPopularity)
            .map(([propertyId, inquiries]) => ({ propertyId, inquiries }))
            .sort((a, b) => b.inquiries - a.inquiries)
            .slice(0, 5);

        // שיעור המרה ליד לפגישה
        const conversionRate = leads.length > 0 ? ((meetings.length / leads.length) * 100).toFixed(1) : 0;

        // יזמים מובילים
        const developerStats = {};
        projects.forEach(project => {
            if (!developerStats[project.developerId]) {
                developerStats[project.developerId] = {
                    projects: 0,
                    views: 0,
                    leads: 0
                };
            }
            developerStats[project.developerId].projects += 1;
            developerStats[project.developerId].views += projectViews[project.id] || 0;
            developerStats[project.developerId].leads += leads.filter(l => l.developer_id === project.developerId).length;
        });
        const topDevelopers = Object.entries(developerStats)
            .map(([devId, stats]) => ({
                developer: developers.find(d => d.id === devId),
                ...stats
            }))
            .filter(item => item.developer)
            .sort((a, b) => b.views - a.views)
            .slice(0, 3);

        return (
            <div className="space-y-6">
                {/* סטטיסטיקות ראשיות */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6" dir="rtl">
                    <Card>
                        <CardHeader className="flex flex-row-reverse items-center justify-between pb-2">
                            <Users className="w-4 h-4 text-slate-500" />
                            <CardTitle className="text-sm font-medium text-right">סה"כ יזמים</CardTitle>
                        </CardHeader>
                        <CardContent className="text-right">
                            <div className="text-3xl font-bold">{totalDevelopers}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row-reverse items-center justify-between pb-2">
                            <FolderKanban className="w-4 h-4 text-slate-500" />
                            <CardTitle className="text-sm font-medium text-right">סה"כ פרויקטים</CardTitle>
                        </CardHeader>
                        <CardContent className="text-right">
                            <div className="text-3xl font-bold">{totalProjects}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row-reverse items-center justify-between pb-2">
                            <Eye className="w-4 h-4 text-slate-500" />
                            <CardTitle className="text-sm font-medium text-right">סה"כ חשיפות</CardTitle>
                        </CardHeader>
                        <CardContent className="text-right">
                            <div className="text-3xl font-bold">{totalViews}</div>
                            <p className="text-xs text-slate-500 mt-1">+ {totalInquiries} פניות</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row-reverse items-center justify-between pb-2">
                            <TrendingUp className="w-4 h-4 text-slate-500" />
                            <CardTitle className="text-sm font-medium text-right">המרה ליד→פגישה</CardTitle>
                        </CardHeader>
                        <CardContent className="text-right">
                            <div className="text-3xl font-bold">{conversionRate}%</div>
                            <p className="text-xs text-slate-500 mt-1">{meetings.length} מתוך {leads.length} לידים</p>
                        </CardContent>
                    </Card>
                </div>

                {/* פרויקטים מובילים */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-right">
                            <Target className="w-5 h-5 text-sky-600" />
                            פרויקטים מובילים (לפי צפיות)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {topProjects.length === 0 ? (
                            <p className="text-slate-500 text-sm">אין נתוני צפיות עדיין</p>
                        ) : (
                            <div className="space-y-3">
                                {topProjects.map(({ project, views }, index) => (
                                    <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-bold">
                                                {index + 1}
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium">{project.name_he}</div>
                                                <div className="text-sm text-slate-500">{getDeveloperName(project.developerId)} • {project.city}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-sky-600">{views}</div>
                                                <div className="text-xs text-slate-500">צפיות</div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => navigate(createPageUrl(`ProjectDetails?id=${project.id}`))}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* יזמים מובילים */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-right">
                                <Award className="w-5 h-5 text-amber-600" />
                                יזמים מובילים
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {topDevelopers.length === 0 ? (
                                <p className="text-slate-500 text-sm">אין נתונים</p>
                            ) : (
                                <div className="space-y-3">
                                    {topDevelopers.map(({ developer, projects, views, leads }, index) => (
                                        <div key={developer.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                                                    index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600' :
                                                    index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-500' :
                                                    'bg-gradient-to-br from-orange-400 to-orange-600'
                                                }`}>
                                                    {index + 1}
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-medium">{developer.name_he}</div>
                                                    <div className="text-xs text-slate-500">{projects} פרויקטים</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-amber-600">{views}</div>
                                                <div className="text-xs text-slate-500">{leads} לידים</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* דירות מומלצות */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-right">
                                <Star className="w-5 h-5 text-purple-600" />
                                דירות/נכסים מומלצים ביותר
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {topAssets.length === 0 ? (
                                <p className="text-slate-500 text-sm">אין נתוני פניות עדיין</p>
                            ) : (
                                <div className="space-y-3">
                                    {topAssets.map(({ propertyId, inquiries }, index) => (
                                        <div key={propertyId} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                                                    {index + 1}
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-medium">נכס #{propertyId.substring(0, 8)}</div>
                                                    <div className="text-xs text-slate-500">מזהה נכס</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-purple-600">{inquiries}</div>
                                                <div className="text-xs text-slate-500">פניות</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* משפך לידים */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-right">
                            <Zap className="w-5 h-5 text-green-600" />
                            מסע קונים - כל המערכת
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                                <div className="text-3xl font-bold text-blue-600">{leads.filter(l => l.status === 'new').length}</div>
                                <div className="text-sm text-slate-600 mt-1 font-medium">התחילו מסע</div>
                            </div>
                            <div className="text-center p-4 bg-sky-50 rounded-lg border-2 border-sky-200">
                                <div className="text-3xl font-bold text-sky-600">{leads.filter(l => l.status === 'interested').length}</div>
                                <div className="text-sm text-slate-600 mt-1 font-medium">הגיעו להשוואה</div>
                            </div>
                            <div className="text-center p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
                                <div className="text-3xl font-bold text-amber-600">{meetings.filter(m => m.status === 'scheduled').length}</div>
                                <div className="text-sm text-slate-600 mt-1 font-medium">ביקשו קשר</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
                                <div className="text-3xl font-bold text-green-600">{leads.filter(l => l.status === 'closed_won').length}</div>
                                <div className="text-sm text-slate-600 mt-1 font-medium">סגרו עסקה</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* תובנות ומגמות */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-right">
                                <BarChart3 className="w-5 h-5 text-indigo-600" />
                                מקורות מתעניינים
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {['property_inquiry', 'financing_request', 'chat', 'arena_club', 'social_signin'].map(source => {
                                const count = leads.filter(l => l.source === source).length;
                                const percentage = leads.length > 0 ? ((count / leads.length) * 100).toFixed(0) : 0;
                                const sourceNames = {
                                    property_inquiry: 'פניה לנכס',
                                    financing_request: 'בקשת מימון',
                                    chat: 'צ\'אט',
                                    arena_club: 'ARENA CLUB',
                                    social_signin: 'התחברות סושיאל'
                                };
                                return count > 0 ? (
                                    <div key={source} className="flex items-center justify-between py-2 border-b last:border-0">
                                        <span className="text-sm text-slate-600">{sourceNames[source]}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-20 bg-slate-200 rounded-full h-2">
                                                <div className="bg-indigo-600 h-2 rounded-full" style={{width: `${percentage}%`}}></div>
                                            </div>
                                            <span className="font-bold text-slate-900 text-sm w-8">{count}</span>
                                        </div>
                                    </div>
                                ) : null;
                            })}
                            {leads.length === 0 && <p className="text-sm text-slate-500 text-center py-4">אין מתעניינים עדיין</p>}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-right">
                                <Target className="w-5 h-5 text-pink-600" />
                                פילוח גיאוגרפי
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {(() => {
                                const cityCounts = {};
                                projects.forEach(p => {
                                    if (p.city) {
                                        const views = projectViews[p.id] || 0;
                                        cityCounts[p.city] = (cityCounts[p.city] || 0) + views;
                                    }
                                });
                                const topCities = Object.entries(cityCounts)
                                    .sort((a, b) => b[1] - a[1])
                                    .slice(0, 5);
                                
                                return topCities.length > 0 ? topCities.map(([city, views]) => (
                                    <div key={city} className="flex items-center justify-between py-2 border-b last:border-0">
                                        <span className="text-sm text-slate-600">{city}</span>
                                        <span className="font-bold text-pink-600">{views}</span>
                                    </div>
                                )) : <p className="text-sm text-slate-500 text-center py-4">אין נתונים</p>;
                            })()}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-right">
                                <TrendingUp className="w-5 h-5 text-emerald-600" />
                                סטטוס פרויקטים
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <span className="text-sm font-medium text-green-800">פרויקטים פורסמו</span>
                                <span className="text-2xl font-bold text-green-600">{projects.filter(p => !p.isDraft).length}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                                <span className="text-sm font-medium text-amber-800">טיוטות</span>
                                <span className="text-2xl font-bold text-amber-600">{projects.filter(p => p.isDraft).length}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                <span className="text-sm font-medium text-slate-600">ללא צפיות</span>
                                <span className="text-2xl font-bold text-slate-600">
                                    {projects.filter(p => !projectViews[p.id] || projectViews[p.id] === 0).length}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* פרויקטים אחרונים */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-right">פרויקטים אחרונים</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentProjects.length === 0 ? (
                            <p className="text-slate-500 text-sm text-right">אין פרויקטים עדיין</p>
                        ) : (
                            <div className="space-y-3">
                                {recentProjects.map(project => (
                                    <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                                        <div className="text-right">
                                            <div className="font-medium">{project.name_he}</div>
                                            <div className="text-sm text-slate-500">יזם: {getDeveloperName(project.developerId)}</div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEditProject(project)}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        );
    };

    const renderDevelopersTable = () => {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-right">רשימת יזמים</CardTitle>
                    <Button onClick={handleAddDeveloper} className="flex-row-reverse">
                        <Plus className="w-4 h-4 mr-2" /> הוסף יזם חדש
                    </Button>
                </CardHeader>
                <CardContent>
                    {developers.length === 0 ? (
                        <p className="text-slate-500 text-sm text-center py-8">אין יזמים במערכת. התחל בהוספת יזם ראשון!</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-right p-3 font-semibold">שם החברה</th>
                                        <th className="text-right p-3 font-semibold">סטטוס</th>
                                        <th className="text-right p-3 font-semibold">אתר</th>
                                        <th className="text-right p-3 font-semibold">מספר פרויקטים</th>
                                        <th className="text-right p-3 font-semibold">תאריך יצירה</th>
                                        <th className="text-right p-3 font-semibold">פעולות</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {developers.map(dev => {
                                        const devProjects = projects.filter(p => p.developerId === dev.id);
                                        return (
                                            <tr key={dev.id} className="border-b hover:bg-slate-50">
                                                <td className="p-3">{dev.name_he}</td>
                                                <td className="p-3">
                                                    {dev.isDraft ? (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                                            טיוטה
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            ✓ פורסם
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-3">
                                                    {dev.website_url ? (
                                                        <a href={dev.website_url} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">
                                                            קישור
                                                        </a>
                                                    ) : (
                                                        <span className="text-slate-400">-</span>
                                                    )}
                                                </td>
                                                <td className="p-3">{devProjects.length}</td>
                                                <td className="p-3 text-slate-500 text-sm">
                                                    {new Date(dev.created_date).toLocaleDateString('he-IL')}
                                                </td>
                                                <td className="p-3">
                                                    <div className="flex items-center justify-start gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleEditDeveloper(dev)}
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDeleteDeveloper(dev)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    const renderProjectsTable = () => {
        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-right">רשימת פרויקטים</CardTitle>
                    <Button onClick={handleAddProject} className="flex-row-reverse">
                        <Plus className="w-4 h-4 mr-2" /> הוסף פרויקט חדש
                    </Button>
                </CardHeader>
                <CardContent>
                    {projects.length === 0 ? (
                        <p className="text-slate-500 text-sm text-center py-8">אין פרויקטים במערכת. התחל בהוספת פרויקט ראשון!</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-right p-3 font-semibold">שם הפרויקט</th>
                                        <th className="text-right p-3 font-semibold">סטטוס</th>
                                        <th className="text-right p-3 font-semibold">יזם</th>
                                        <th className="text-right p-3 font-semibold">עיר</th>
                                        <th className="text-right p-3 font-semibold">תאריך יצירה</th>
                                        <th className="text-right p-3 font-semibold">פעולות</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map(project => (
                                        <tr key={project.id} className="border-b hover:bg-slate-50">
                                            <td className="p-3 font-medium">{project.name_he}</td>
                                            <td className="p-3">
                                                {project.isDraft ? (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                                        טיוטה
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        ✓ פורסם
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-3">{getDeveloperName(project.developerId)}</td>
                                            <td className="p-3">{project.city || '-'}</td>
                                            <td className="p-3 text-slate-500 text-sm">
                                                {new Date(project.created_date).toLocaleDateString('he-IL')}
                                            </td>
                                            <td className="p-3">
                                                <div className="flex items-center justify-start gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => navigate(createPageUrl(`ProjectDetails?id=${project.id}`))}
                                                        title="כניסה לפרויקט"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditProject(project)}
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteProject(project)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <div className="p-8">
                <TopNavigation currentPage="DeveloperCRM" />
                <header className="mb-8 text-right">
                    <h1 className="text-4xl font-bold text-slate-900">מערכת ניהול יזמים ופרויקטים</h1>
                    <p className="text-slate-600 mt-2">דשבורד ניהול מרכזי ליזמים ופרויקטים</p>
                </header>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir="rtl">
                    <TabsList className="mb-6 flex justify-start">
                        <TabsTrigger value="dashboard" className="gap-2 flex-row-reverse">
                            <TrendingUp className="w-4 h-4" />
                            דשבורד
                        </TabsTrigger>
                        <TabsTrigger value="developers" className="gap-2 flex-row-reverse">
                            <Users className="w-4 h-4" />
                            יזמים
                        </TabsTrigger>
                        <TabsTrigger value="projects" className="gap-2 flex-row-reverse">
                            <FolderKanban className="w-4 h-4" />
                            פרויקטים
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="dashboard">
                        {renderDashboard()}
                    </TabsContent>

                    <TabsContent value="developers">
                        {renderDevelopersTable()}
                    </TabsContent>

                    <TabsContent value="projects">
                        {renderProjectsTable()}
                    </TabsContent>
                </Tabs>
            </div>

            <Dialog open={showDeveloperForm} onOpenChange={setShowDeveloperForm}>
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingDeveloperData ? 'עריכת יזם' : 'הוספת יזם חדש'}</DialogTitle>
                    </DialogHeader>
                    <DeveloperForm
                        developer={editingDeveloperData}
                        onSave={onDeveloperSaved}
                        onCancel={() => setShowDeveloperForm(false)}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={showProjectForm} onOpenChange={setShowProjectForm}>
                <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingProjectData ? 'עריכת פרויקט' : 'הוספת פרויקט חדש'}</DialogTitle>
                    </DialogHeader>
                    <ProjectForm
                        project={editingProjectData}
                        developerId={editingProjectData?.developerId}
                        onSave={onProjectSaved}
                        onCancel={() => setShowProjectForm(false)}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={showAssetTypeForm} onOpenChange={setShowAssetTypeForm}>
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingAssetTypeData ? 'עריכת סוג נכס' : 'הוספת סוג נכס חדש'}</DialogTitle>
                    </DialogHeader>
                    {currentProjectIdForAssetType && (
                        <AssetTypeForm
                            assetType={editingAssetTypeData}
                            projectId={currentProjectIdForAssetType}
                            onSave={onAssetTypeSaved}
                            onCancel={() => setShowAssetTypeForm(false)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}