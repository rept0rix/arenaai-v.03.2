import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, Activity, UserCheck, UserX, Phone, Mail, Eye, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import moment from 'moment';

export default function UserStatisticsDashboard() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        totalUsers: 0,
        usersWithPhone: 0,
        usersWithLeads: 0,
        activeUsers: 0
    });

    useEffect(() => {
        loadUserData();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [searchTerm, users]);

    const loadUserData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [allUsers, leads, projectInteractions, sessions] = await Promise.all([
                base44.entities.User.list('-created_date'),
                base44.entities.Lead.list(),
                base44.entities.ProjectInteraction.list(),
                base44.entities.AnonymousSession.list()
            ]);

            // Filter out admin users - focus on end users only
            const endUsers = allUsers.filter(u => u.role !== 'admin');

            // Build enhanced user data
            const enrichedUsers = endUsers.map(user => {
                // Find related lead
                const userLead = leads.find(l => l.email === user.email);
                
                // Find user interactions
                const userInteractions = projectInteractions.filter(i => 
                    i.userEmail === user.email || i.userId === user.id
                );

                // Find user session
                const userSession = sessions.find(s => s.created_by === user.email);

                // Calculate activity data
                const lastActivity = userInteractions.length > 0 
                    ? moment(userInteractions[userInteractions.length - 1].created_date).fromNow()
                    : 'אין פעילות';

                const totalActions = userInteractions.length;

                // Check if user has complete profile
                const hasPhone = !!(user.phone || (userLead && userLead.phone));
                const hasLead = !!userLead;

                return {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email,
                    phone: user.phone || (userLead ? userLead.phone : null),
                    created_date: user.created_date,
                    hasPhone,
                    hasLead,
                    leadStatus: userLead ? userLead.status : null,
                    totalActions,
                    lastActivity,
                    interactions: userInteractions
                };
            });

            setUsers(enrichedUsers);
            setFilteredUsers(enrichedUsers);

            // Calculate stats
            const totalUsers = enrichedUsers.length;
            const usersWithPhone = enrichedUsers.filter(u => u.hasPhone).length;
            const usersWithLeads = enrichedUsers.filter(u => u.hasLead).length;
            const activeUsers = enrichedUsers.filter(u => u.totalActions > 0).length;

            setStats({
                totalUsers,
                usersWithPhone,
                usersWithLeads,
                activeUsers
            });

        } catch (err) {
            console.error('Failed to load user data:', err);
            setError('שגיאה בטעינת נתוני משתמשים: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const filterUsers = () => {
        if (!searchTerm) {
            setFilteredUsers(users);
            return;
        }

        const lowercaseSearch = searchTerm.toLowerCase();
        const filtered = users.filter(user => 
            user.full_name?.toLowerCase().includes(lowercaseSearch) ||
            user.email?.toLowerCase().includes(lowercaseSearch) ||
            user.phone?.includes(searchTerm)
        );
        setFilteredUsers(filtered);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-4">{error}</div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">סך הכל משתמשים</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalUsers}</div>
                        <p className="text-xs text-muted-foreground">
                            משתמשי קצה במערכת
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">השלימו טלפון</CardTitle>
                        <Phone className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.usersWithPhone}</div>
                        <p className="text-xs text-muted-foreground">
                            מתוך {stats.totalUsers} משתמשים
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">מילאו טופס ליד</CardTitle>
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.usersWithLeads}</div>
                        <p className="text-xs text-muted-foreground">
                            משתמשים שהשאירו פרטים
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">משתמשים פעילים</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeUsers}</div>
                        <p className="text-xs text-muted-foreground">
                            משתמשים עם פעילות
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Users Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>ניהול משתמשי קצה ({filteredUsers.length})</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <Input
                                placeholder="חיפוש לפי שם, מייל או טלפון..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-10"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>שם מלא</TableHead>
                                    <TableHead>אימייל</TableHead>
                                    <TableHead>טלפון</TableHead>
                                    <TableHead>תאריך הרשמה</TableHead>
                                    <TableHead>סטטוס פרטים</TableHead>
                                    <TableHead>פעולות במערכת</TableHead>
                                    <TableHead>פעילות אחרונה</TableHead>
                                    <TableHead>פעולות</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center text-slate-500 py-8">
                                            לא נמצאו משתמשים
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{user.full_name}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Mail className="w-3 h-3 text-slate-400" />
                                                    {user.email}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {user.phone ? (
                                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                        {user.phone}
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                                        חסר
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-sm text-slate-600">
                                                {moment(user.created_date).format('DD/MM/YYYY')}
                                            </TableCell>
                                            <TableCell>
                                                {user.hasLead ? (
                                                    <Badge className="bg-blue-500">מילא ליד</Badge>
                                                ) : (
                                                    <Badge variant="outline">משתמש רגיל</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Eye className="w-3 h-3 text-slate-400" />
                                                    <span className="font-medium">{user.totalActions}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-slate-600">
                                                {user.lastActivity}
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="sm">
                                                    צפה בפרטים
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}