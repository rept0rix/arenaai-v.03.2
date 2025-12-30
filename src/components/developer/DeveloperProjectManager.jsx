
import React, { useState } from 'react';
import { Project } from '@/entities/Project';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, TrendingUp, Handshake } from 'lucide-react';
import { toast } from "sonner";
import ProjectForm from '../admin/ProjectForm';

export default function DeveloperProjectManager({ developer, projects, interactions, onProjectsChange }) {
    const [editingProject, setEditingProject] = useState(null);
    const [isCreatingNew, setIsCreatingNew] = useState(false);

    const handleProjectSave = async (savedProject) => {
        setEditingProject(null);
        setIsCreatingNew(false);
        onProjectsChange();
        toast.success("הפרויקט נשמר בהצלחה!");
    };

    const handleDeleteProject = async (project) => {
        if (confirm(`האם למחוק את הפרויקט "${project.name_he}"?`)) {
            try {
                await Project.delete(project.id);
                toast.success("הפרויקט נמחק");
                onProjectsChange();
            } catch (error) { 
                toast.error("שגיאה במחיקת הפרויקט"); 
            }
        }
    };

    if (!developer) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>ניהול פרויקטים</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-slate-600">
                        כדי לנהל פרויקטים, תחילה יש להקים פרופיל חברה בלשונית "פרטי חברה".
                    </p>
                </CardContent>
            </Card>
        );
    }

    if (isCreatingNew || editingProject) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>
                        {isCreatingNew ? 'הוספת פרויקט חדש' : `עריכת פרויקט: ${editingProject.name_he}`}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ProjectForm
                        project={editingProject}
                        developerId={developer.id}
                        onSave={handleProjectSave}
                        onCancel={() => {
                            setEditingProject(null);
                            setIsCreatingNew(false);
                        }}
                    />
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">ניהול פרויקטים</h2>
                <Button onClick={() => setIsCreatingNew(true)}>
                    <Plus className="w-4 h-4 ml-2" />
                    הוסף פרויקט חדש
                </Button>
            </div>

            {projects.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-8">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">אין פרויקטים עדיין</h3>
                        <p className="text-slate-600 mb-4">התחל בהוספת הפרויקט הראשון שלך</p>
                        <Button onClick={() => setIsCreatingNew(true)}>
                            הוסף פרויקט חדש
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {projects.map(project => {
                        const projectViews = interactions.filter(i => i.projectId === project.id && i.interactionType === 'view').length;
                        const projectInquiries = interactions.filter(i => i.projectId === project.id && i.interactionType === 'inquiry').length;

                        return (
                        <Card key={project.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-xl">{project.name_he}</CardTitle>
                                        <p className="text-slate-600">{project.address}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {project.project_type && (
                                            <Badge variant="secondary">
                                                {project.project_type === 'tama' ? 'תמ"א' : 
                                                 project.project_type === 'pinui_binui' ? 'פינוי בינוי' : 'רגיל'}
                                            </Badge>
                                        )}
                                        <Badge variant="outline" className="flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" />
                                            {projectViews} צפיות
                                        </Badge>
                                        <Badge variant="outline" className="flex items-center gap-1">
                                            <Handshake className="w-3 h-3" />
                                            {projectInquiries} פניות
                                        </Badge>
                                        <Button size="sm" variant="outline" onClick={() => setEditingProject(project)}>
                                            <Edit className="w-4 h-4 ml-1" />
                                            ערוך
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={() => handleDeleteProject(project)}>
                                            <Trash2 className="w-4 h-4 ml-1" />
                                            מחק
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    {project.occupancy_date && (
                                        <div>
                                            <span className="text-slate-500">מועד אכלוס:</span>
                                            <p className="font-medium">{new Date(project.occupancy_date).toLocaleDateString('he-IL')}</p>
                                        </div>
                                    )}
                                    {project.starting_price_per_meter && (
                                        <div>
                                            <span className="text-slate-500">מחיר למ"ר:</span>
                                            <p className="font-medium">₪{project.starting_price_per_meter.toLocaleString()}</p>
                                        </div>
                                    )}
                                    {project.accompanying_bank && (
                                        <div>
                                            <span className="text-slate-500">בנק מלווה:</span>
                                            <p className="font-medium">{project.accompanying_bank}</p>
                                        </div>
                                    )}
                                    {project.contractor && (
                                        <div>
                                            <span className="text-slate-500">קבלן:</span>
                                            <p className="font-medium">{project.contractor}</p>
                                        </div>
                                    )}
                                </div>
                                
                                {project.about && (
                                    <div className="mt-4">
                                        <p className="text-slate-700 text-sm line-clamp-2">{project.about}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )})}
                </div>
            )}
        </div>
    );
}
