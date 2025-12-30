import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, ExternalLink, Play } from 'lucide-react';
import DeveloperForm from '../admin/DeveloperForm';

export default function CompanyProfileView({ developer, onSave }) {
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (savedDeveloper) => {
        setIsEditing(false);
        onSave(savedDeveloper);
    };

    if (isEditing) {
        return (
            <DeveloperForm 
                developer={developer}
                onSave={handleSave}
                onCancel={() => setIsEditing(false)}
            />
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">פרטי החברה</h2>
                <Button onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 ml-2" />
                    ערוך פרטים
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>מידע בסיסי</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-slate-500">שם החברה (עברית)</label>
                            <p className="text-lg font-medium">{developer.name_he || 'לא הוגדר'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-500">שם החברה (אנגלית)</label>
                            <p className="text-lg">{developer.name_en || 'לא הוגדר'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-500">סלוגן (עברית)</label>
                            <p className="text-base italic">{developer.slogan_he || 'לא הוגדר'}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-500">סלוגן (אנגלית)</label>
                            <p className="text-base italic">{developer.slogan_en || 'לא הוגדר'}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Digital Assets */}
                <Card>
                    <CardHeader>
                        <CardTitle>נכסים דיגיטליים</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-slate-500">לוגו (עברית)</label>
                            {developer.logo_he_url ? (
                                <div className="flex items-center gap-2">
                                    <img src={developer.logo_he_url} alt="לוגו עברית" className="w-20 h-10 object-contain border rounded" />
                                    <Button variant="ghost" size="sm" asChild>
                                        <a href={developer.logo_he_url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </Button>
                                </div>
                            ) : (
                                <p className="text-slate-500">לא הועלה</p>
                            )}
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-500">אתר אינטרנט</label>
                            {developer.website_url ? (
                                <div className="flex items-center gap-2">
                                    <a href={developer.website_url} target="_blank" rel="noopener noreferrer" 
                                       className="text-blue-600 hover:underline">{developer.website_url}</a>
                                    <ExternalLink className="w-3 h-3 text-slate-400" />
                                </div>
                            ) : (
                                <p className="text-slate-500">לא הוגדר</p>
                            )}
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-500">סרטון תדמית (עברית)</label>
                            {developer.video_he_url ? (
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" asChild>
                                        <a href={developer.video_he_url} target="_blank" rel="noopener noreferrer">
                                            <Play className="w-3 h-3 ml-1" />
                                            צפה בסרטון
                                        </a>
                                    </Button>
                                </div>
                            ) : (
                                <p className="text-slate-500">לא הועלה</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* About Section */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>אודות החברה</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-slate-500">תיאור בעברית</label>
                            <p className="text-base leading-relaxed bg-slate-50 p-4 rounded border">
                                {developer.about_he || 'לא הוגדר תיאור'}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-500">תיאור באנגלית</label>
                            <p className="text-base leading-relaxed bg-slate-50 p-4 rounded border">
                                {developer.about_en || 'לא הוגדר תיאור'}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Programs & Benefits */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>תוכניות והטבות</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">ARENA CLUB:</span>
                                {developer.arena_benefits_program ? (
                                    <Badge className="bg-green-100 text-green-800">משתתף</Badge>
                                ) : (
                                    <Badge variant="secondary">לא משתתף</Badge>
                                )}
                            </div>
                        </div>
                        {developer.arena_benefits_program && (
                            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                                <p className="text-sm text-green-800">
                                    החברה משתתפת בתוכנית הטבות ARENA CLUB ומקבלת עדיפות בהצגת נכסים עם ציון התאמה זהה.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}