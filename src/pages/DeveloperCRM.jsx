import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Building, Users, FolderKanban, TrendingUp, Eye } from 'lucide-react';
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

        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">סה"כ יזמים</CardTitle>
                            <Users className="w-4 h-4 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{totalDevelopers}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">סה"כ פרויקטים</CardTitle>
                            <FolderKanban className="w-4 h-4 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{totalProjects}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">ממוצע פרויקטים ליזם</CardTitle>
                            <TrendingUp className="w-4 h-4 text-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {totalDevelopers > 0 ? (totalProjects / totalDevelopers).toFixed(1) : 0}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>פרויקטים אחרונים</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {recentProjects.length === 0 ? (
                            <p className="text-slate-500 text-sm">אין פרויקטים עדיין</p>
                        ) : (
                            <div className="space-y-3">
                                {recentProjects.map(project => (
                                    <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                                        <div>
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
                    <CardTitle>רשימת יזמים</CardTitle>
                    <Button onClick={handleAddDeveloper}>
                        <Plus className="w-4 h-4 ml-2" /> הוסף יזם חדש
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
                                        <th className="text-right p-3 font-semibold">אתר</th>
                                        <th className="text-right p-3 font-semibold">מספר פרויקטים</th>
                                        <th className="text-right p-3 font-semibold">תאריך יצירה</th>
                                        <th className="text-left p-3 font-semibold">פעולות</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {developers.map(dev => {
                                        const devProjects = projects.filter(p => p.developerId === dev.id);
                                        return (
                                            <tr key={dev.id} className="border-b hover:bg-slate-50">
                                                <td className="p-3">{dev.name_he}</td>
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
                                                    <div className="flex items-center justify-end gap-2">
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
                    <CardTitle>רשימת פרויקטים</CardTitle>
                    <Button onClick={handleAddProject}>
                        <Plus className="w-4 h-4 ml-2" /> הוסף פרויקט חדש
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
                                        <th className="text-right p-3 font-semibold">יזם</th>
                                        <th className="text-right p-3 font-semibold">עיר</th>
                                        <th className="text-right p-3 font-semibold">תאריך יצירה</th>
                                        <th className="text-left p-3 font-semibold">פעולות</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map(project => (
                                        <tr key={project.id} className="border-b hover:bg-slate-50">
                                            <td className="p-3 font-medium">{project.name_he}</td>
                                            <td className="p-3">{getDeveloperName(project.developerId)}</td>
                                            <td className="p-3">{project.city || '-'}</td>
                                            <td className="p-3 text-slate-500 text-sm">
                                                {new Date(project.created_date).toLocaleDateString('he-IL')}
                                            </td>
                                            <td className="p-3">
                                                <div className="flex items-center justify-end gap-2">
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
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900">מערכת ניהול יזמים ופרויקטים</h1>
                    <p className="text-slate-600 mt-2">דשבורד ניהול מרכזי ליזמים ופרויקטים</p>
                </header>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="mb-6">
                        <TabsTrigger value="dashboard" className="gap-2">
                            <TrendingUp className="w-4 h-4" />
                            דשבורד
                        </TabsTrigger>
                        <TabsTrigger value="developers" className="gap-2">
                            <Users className="w-4 h-4" />
                            יזמים
                        </TabsTrigger>
                        <TabsTrigger value="projects" className="gap-2">
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