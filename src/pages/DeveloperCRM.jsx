import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Plus, Edit, Trash2, Building } from 'lucide-react';
import { toast } from "sonner";
import DeveloperForm from '@/components/admin/DeveloperForm';
import ProjectForm from '@/components/admin/ProjectForm';
import AssetTypeForm from '@/components/admin/AssetTypeForm';
import TopNavigation from '@/components/TopNavigation';
import DeveloperList from '@/components/developer/DeveloperList';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function DeveloperCRM() {
    const [developers, setDevelopers] = useState([]);
    const [selectedDeveloper, setSelectedDeveloper] = useState(null);
    const [projects, setProjects] = useState([]);
    const [assetTypesByProject, setAssetTypesByProject] = useState({});

    const [showDeveloperForm, setShowDeveloperForm] = useState(false);
    const [editingDeveloperData, setEditingDeveloperData] = useState(null);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [editingProjectData, setEditingProjectData] = useState(null);
    const [showAssetTypeForm, setShowAssetTypeForm] = useState(false);
    const [editingAssetTypeData, setEditingAssetTypeData] = useState(null);
    const [currentProjectIdForAssetType, setCurrentProjectIdForAssetType] = useState(null);

    const [activeTab, setActiveTab] = useState('projects');

    useEffect(() => {
        loadDevelopers();
    }, []);

    const loadDevelopers = async () => {
        const devs = await base44.entities.Developer.list('-created_date');
        setDevelopers(devs);
        if (devs.length > 0 && !selectedDeveloper) {
            setSelectedDeveloper(devs[0]);
        }
    };

    useEffect(() => {
        if (selectedDeveloper) {
            loadProjects(selectedDeveloper.id);
        }
    }, [selectedDeveloper]);

    const loadProjects = async (developerId) => {
        const devProjects = await base44.entities.Project.filter({ developerId });
        setProjects(devProjects);
        devProjects.forEach(p => loadAssetTypes(p.id));
    };

    const loadAssetTypes = async (projectId) => {
        const types = await base44.entities.AssetType.filter({ projectId });
        setAssetTypesByProject(prev => ({
            ...prev,
            [projectId]: types
        }));
    };

    const handleSelectDeveloper = (developer) => {
        setSelectedDeveloper(developer);
        setShowDeveloperForm(false);
        setEditingDeveloperData(null);
        setShowProjectForm(false);
        setEditingProjectData(null);
        setShowAssetTypeForm(false);
        setEditingAssetTypeData(null);
        setCurrentProjectIdForAssetType(null);
    };

    const handleAddDeveloper = () => {
        setEditingDeveloperData(null);
        setShowDeveloperForm(true);
    };

    const handleEditDeveloper = (dev) => {
        setEditingDeveloperData(dev);
        setShowDeveloperForm(true);
    };

    const onDeveloperSaved = (savedDeveloper) => {
        loadDevelopers();
        setShowDeveloperForm(false);
        setSelectedDeveloper(savedDeveloper);
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
        if (selectedDeveloper) {
            loadProjects(selectedDeveloper.id);
        }
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
                setSelectedDeveloper(null);
                loadDevelopers();
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
                loadProjects(selectedDeveloper.id);
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

    const renderMainContent = () => {
        if (!selectedDeveloper) {
            return (
                <div className="flex items-center justify-center h-full bg-white rounded-lg border-2 border-dashed border-slate-300 p-8">
                    <div className="text-center text-slate-500">
                        <Building className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                        <p className="text-lg">בחר יזם מהרשימה בצד ימין או הוסף יזם חדש כדי להתחיל.</p>
                    </div>
                </div>
            );
        }

        return (
            <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl">פרויקטים של {selectedDeveloper.name_he}</CardTitle>
                    <Button onClick={handleAddProject} disabled={!selectedDeveloper}>
                        <Plus className="w-4 h-4 ml-2" /> הוסף פרויקט חדש
                    </Button>
                </CardHeader>
                <CardContent>
                    {projects.length === 0 && <p className="text-slate-500 text-sm">ליזם זה אין פרויקטים. התחל בהוספת אחד!</p>}
                    <Accordion type="single" collapsible className="w-full">
                        {projects.map(project => (
                            <AccordionItem key={project.id} value={project.id}>
                                <AccordionTrigger className="font-medium hover:bg-slate-50 p-2 rounded">
                                    <div className="flex justify-between items-center w-full pr-2">
                                        <span>{project.name_he}</span>
                                        <div className="flex items-center gap-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); handleEditProject(project); }}>
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={(e) => { e.stopPropagation(); handleDeleteProject(project); }}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-4 bg-slate-50">
                                    <h5 className="font-semibold mb-2">סוגי נכסים</h5>
                                    <Button size="sm" variant="outline" className="w-full mb-2" onClick={() => handleAddAssetType(project.id)}>
                                        <Plus className="w-4 h-4 ml-2" /> הוסף סוג נכס
                                    </Button>

                                    {(assetTypesByProject[project.id] || []).map(asset => (
                                        <div key={asset.id} className="p-2 border rounded-md mb-2 bg-white flex justify-between items-center">
                                            <p>{asset.type_name} - {asset.room_count} חדרים, {asset.size_sqm} מ"ר</p>
                                            <div className="flex items-center gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditAssetType(asset)}>
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDeleteAssetType(asset)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 flex" dir="rtl">
            <div className="w-64 bg-white border-l border-slate-200 flex-shrink-0">
              <div className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-6">מערכת ניהול יזם</h2>
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('projects')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === 'projects'
                        ? 'bg-sky-50 text-sky-600 font-medium'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Building className={`w-5 h-5 ${activeTab === 'projects' ? 'text-sky-600' : 'text-slate-400'}`} />
                    <span>פרויקטים</span>
                  </button>
                </nav>
              </div>
            </div>

            <div className="flex-1 p-8">
                <TopNavigation currentPage="DeveloperCRM" />
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900">ניהול יזמים ופרויקטים</h1>
                    <p className="text-slate-600 mt-2">ניהול יזמים, הפרויקטים שלהם וסוגי הנכסים.</p>
                </header>

                <div className="grid grid-cols-4 gap-8 h-[calc(100vh-200px)]">
                    <div className="col-span-1">
                        <DeveloperList
                            developers={developers}
                            selectedDeveloper={selectedDeveloper}
                            onSelectDeveloper={handleSelectDeveloper}
                            onAddDeveloper={handleAddDeveloper}
                            onDeleteDeveloper={handleDeleteDeveloper}
                            onEditDeveloper={handleEditDeveloper}
                        />
                    </div>

                    <div className="col-span-3">
                        {renderMainContent()}
                    </div>
                </div>
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
                    {selectedDeveloper && (
                        <ProjectForm
                            project={editingProjectData}
                            developerId={selectedDeveloper?.id}
                            onSave={onProjectSaved}
                            onCancel={() => setShowProjectForm(false)}
                        />
                    )}
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