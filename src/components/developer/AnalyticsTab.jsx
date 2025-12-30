import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AnalyticsTab({ interactions, projects }) {
    const inquiries = interactions.filter(i => i.interactionType === 'inquiry');

    const getProjectName = (projectId) => {
        const project = projects.find(p => p.id === projectId);
        return project ? project.name_he : 'לא ידוע';
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>דוחות וסטטיסטיקות</CardTitle>
                <CardDescription>מעקב אחר הפניות וההתעניינות בפרויקטים שלכם.</CardDescription>
            </CardHeader>
            <CardContent>
                <h3 className="text-lg font-semibold mb-4">דוח פניות מלקוחות</h3>
                {inquiries.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-slate-500">לא התקבלו פניות עדיין.</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>פרויקט</TableHead>
                                <TableHead>שם הלקוח</TableHead>
                                <TableHead>אימייל</TableHead>
                                <TableHead>תאריך פנייה</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inquiries.map(inquiry => (
                                <TableRow key={inquiry.id}>
                                    <TableCell className="font-medium">{getProjectName(inquiry.projectId)}</TableCell>
                                    <TableCell>{inquiry.userFullName || 'לא צוין'}</TableCell>
                                    <TableCell>{inquiry.userEmail}</TableCell>
                                    <TableCell>{new Date(inquiry.created_date).toLocaleDateString('he-IL')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}