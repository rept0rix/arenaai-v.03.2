import React, { useState, useEffect } from 'react';
import { Developer } from '@/entities/Developer';
import { Project } from '@/entities/Project';
import { AssetType } from '@/entities/AssetType';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Plus, Edit, Trash2, Building } from 'lucide-react';
import { toast } from "sonner";
import DeveloperForm from '../components/admin/DeveloperForm';
import ProjectForm from '../components/admin/ProjectForm';
import AssetTypeForm from '../components/admin/AssetTypeForm';
import TopNavigation from '../components/TopNavigation';

// Main DeveloperAdmin Page
export default function DeveloperAdmin() {
    const [developers, setDevelopers] = useState([]);
    const [selectedDeveloper, setSelectedDeveloper] = useState(null);
    const [projects, setProjects] = useState([]);
    const [assetTypesByProject, setAssetTypesByProject] = useState({});

    const [editingDeveloper, setEditingDeveloper] = useState(false);
    const [editingProject, setEditingProject] = useState(null); // null, 'new', or project object
    const [editingAssetType, setEditingAssetType] = useState(null); // null, {projectId: '...'}, or asset object

    useEffect(() => {
        loadDevelopers();
    }, []);

    const loadDevelopers = async () => {
        const devs = await Developer.list({ sort: 'name_he' });
        setDevelopers(devs);
    };

    const loadProjects = async (developerId) => {
        const devProjects = await Project.filter({ developerId });
        setProjects(devProjects);
        devProjects.forEach(p => loadAssetTypes(p.id));
    };

    const loadAssetTypes = async (projectId) => {
        const types = await AssetType.filter({ projectId });
        setAssetTypesByProject(prev => ({ ...prev, [projectId]: types }));
    };

    const handleSelectDeveloper = (developer) => {
        setSelectedDeveloper(developer);
        setEditingDeveloper(false);
        setEditingProject(null);
        setEditingAssetType(null);
        if (developer) {
            loadProjects(developer.id);
        } else {
            setProjects([]);
            setAssetTypesByProject({});
        }
    };
    
    const onDeveloperSaved = (savedDeveloper) => {
        loadDevelopers();
        setEditingDeveloper(false);
        handleSelectDeveloper(savedDeveloper);
    };

    const onProjectSaved = () => {
        setEditingProject(null);
        loadProjects(selectedDeveloper.id);
    };

    const onAssetTypeSaved = (savedAssetType) => {
        setEditingAssetType(null);
        loadAssetTypes(savedAssetType.projectId);
    };

    const handleDeleteDeveloper = async (dev) => {
         if (confirm(`האם למחוק את היזם "${dev.name_he}" וכל הפרויקטים והנכסים המשויכים לו?`)) {
            try {
                // You might need cascading delete on the backend for this
                await Developer.delete(dev.id);
                toast.success("היזם נמחק");
                handleSelectDeveloper(null);
                loadDevelopers();
            } catch (error) { toast.error("שגיאה במחיקת היזם"); }
        }
    };
    
    const handleDeleteProject = async (proj) => {
        if (confirm(`האם למחוק את הפרויקט "${proj.name_he}"?`)) {
            try {
                await Project.delete(proj.id);
                toast.success("הפרויקט נמחק");
                loadProjects(selectedDeveloper.id);
            } catch (error) { toast.error("שגיאה במחיקת הפרויקט"); }
        }
    };

    const handleDeleteAssetType = async (asset) => {
         if (confirm(`האם למחוק את סוג הנכס "${asset.type_name}"?`)) {
            try {
                await AssetType.delete(asset.id);
                toast.success("סוג הנכס נמחק");
                loadAssetTypes(asset.projectId);
            } catch (error) { toast.error("שגיאה במחיקת סוג הנכס"); }
        }
    };

    const MainContent = () => {
        if (editingDeveloper) {
            return <DeveloperForm developer={selectedDeveloper} onSave={onDeveloperSaved} onCancel={() => setEditingDeveloper(false)} />;
        }

        if (selectedDeveloper) {
            return (
                 <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-3xl">{selectedDeveloper.name_he}</CardTitle>
                            <div>
                                <Button variant="outline" size="sm" onClick={() => setEditingDeveloper(true)}>
                                    <Edit className="w-3 h-3 ml-1"/> ערוך פרטי יזם
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <h4 className="text-xl font-semibold mb-2">פרויקטים</h4>
                         <Button className="w-full mb-4" onClick={() => setEditingProject('new')}>
                            <Plus className="w-4 h-4 ml-2" /> הוסף פרויקט חדש
                        </Button>

                        {editingProject === 'new' && (
                            <ProjectForm 
                                developerId={selectedDeveloper.id} 
                                onSave={onProjectSaved} 
                                onCancel={() => setEditingProject(null)} 
                            />
                        )}

                        <Accordion type="single" collapsible className="w-full">
                            {projects.map(project => (
                                <AccordionItem key={project.id} value={project.id}>
                                    <AccordionTrigger className="font-medium hover:bg-slate-50 p-2 rounded">
                                       <div className="flex justify-between items-center w-full pr-2">
                                            <span>{project.name_he}</span>
                                            <div>
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); setEditingProject(project); }}>
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={(e) => { e.stopPropagation(); handleDeleteProject(project); }}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                       </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="p-4 bg-slate-50">
                                        {editingProject?.id === project.id ? (
                                            <ProjectForm 
                                                project={editingProject} 
                                                developerId={selectedDeveloper.id}
                                                onSave={onProjectSaved}
                                                onCancel={() => setEditingProject(null)}
                                            />
                                        ) : (
                                            <>
                                                <h5 className="font-semibold mb-2">סוגי נכסים</h5>
                                                <Button size="sm" variant="outline" className="w-full mb-2" onClick={() => setEditingAssetType({ projectId: project.id })}>
                                                     <Plus className="w-4 h-4 ml-2" /> הוסף סוג נכס
                                                </Button>

                                                {editingAssetType?.projectId === project.id && !editingAssetType.id && (
                                                    <AssetTypeForm
                                                        projectId={project.id}
                                                        onSave={onAssetTypeSaved}
                                                        onCancel={() => setEditingAssetType(null)}
                                                    />
                                                )}
                                                
                                                {(assetTypesByProject[project.id] || []).map(asset => (
                                                    <div key={asset.id} className="p-2 border rounded-md mb-2 bg-white">
                                                         {editingAssetType?.id === asset.id ? (
                                                            <AssetTypeForm
                                                                assetType={asset}
                                                                projectId={project.id}
                                                                onSave={onAssetTypeSaved}
                                                                onCancel={() => setEditingAssetType(null)}
                                                            />
                                                         ) : (
                                                            <div className="flex justify-between items-center">
                                                                <p>{asset.type_name} - {asset.room_count} חדרים, {asset.size_sqm} מ"ר</p>
                                                                <div>
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingAssetType(asset)}>
                                                                        <Edit className="w-4 h-4" />
                                                                    </Button>
                                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDeleteAssetType(asset)}>
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                         )}
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>
            );
        }

        return (
            <div className="flex items-center justify-center h-full bg-white rounded-lg border-2 border-dashed border-slate-300">
                <div className="text-center text-slate-500">
                    <Building className="mx-auto h-12 w-12 text-slate-400" />
                    <p className="mt-2">בחר יזם מהרשימה או הוסף יזם חדש</p>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50" dir="rtl">
            <TopNavigation currentPage="DeveloperAdmin" />
            <div className="p-8">
                <div className="max-w-7xl mx-auto">
                    <header className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-900">ניהול יזמים ופרויקטים</h1>
                        <p className="text-slate-600 mt-2">הוספה וניהול של יזמים, הפרויקטים שלהם, וסוגי הנכסים.</p>
                    </header>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Developers List */}
                        <Card className="lg:col-span-1 self-start">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>יזמים</CardTitle>
                                <Button onClick={() => { setSelectedDeveloper(null); setEditingDeveloper(true); }}>
                                    <Plus className="w-4 h-4 ml-2" /> הוסף יזם
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {developers.map(dev => (
                                        <li key={dev.id} 
                                            onClick={() => handleSelectDeveloper(dev)}
                                            className={`p-3 rounded-md cursor-pointer transition-colors flex justify-between items-center ${selectedDeveloper?.id === dev.id ? 'bg-sky-100 text-sky-800' : 'hover:bg-slate-100'}`}>
                                            <span>{dev.name_he}</span>
                                            <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500 opacity-50 hover:opacity-100" onClick={(e) => {e.stopPropagation(); handleDeleteDeveloper(dev);}}>
                                                <Trash2 className="w-3 h-3" />
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Main Content Area */}
                        <div className="lg:col-span-2">
                           <MainContent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}