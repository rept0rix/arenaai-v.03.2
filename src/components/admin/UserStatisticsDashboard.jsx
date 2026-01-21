import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, Clock, Zap, Activity, Eye } from 'lucide-react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
import moment from 'moment';

export default function UserStatisticsDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadUserStatistics();
    }, []);

    const loadUserStatistics = async () => {
        setLoading(true);
        setError(null);
        try {
            const [users, leads, sessions, projectInteractions] = await Promise.all([
                base44.entities.User.list(),
                base44.entities.Lead.list(),
                base44.entities.AnonymousSession.list(),
                base44.entities.ProjectInteraction.list()
            ]);

            // Calculate total users by role
            const totalUsers = users.length;
            const adminUsers = users.filter(u => u.role === 'admin').length;
            const regularUsers = users.filter(u => u.role === 'user').length;

            // Calculate lead stats
            const totalLeads = leads.length;
            const convertedLeads = leads.filter(l => l.status === 'closed_won').length;
            const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(2) : 0;

            // Calculate active sessions (e.g., in last 24 hours)
            const twentyFourHoursAgo = moment().subtract(24, 'hours');
            const activeSessions = sessions.filter(s => moment(s.last_active).isAfter(twentyFourHoursAgo)).length;

            // Calculate new users over time for chart
            const userCreationData = {};
            users.forEach(user => {
                const date = moment(user.created_date).format('YYYY-MM-DD');
                userCreationData[date] = (userCreationData[date] || 0) + 1;
            });

            const newUsersChartData = Object.keys(userCreationData).sort().slice(-30).map(date => ({
                date: moment(date).format('DD/MM'),
                'משתמשים': userCreationData[date]
            }));

            // Lead sources breakdown
            const sourceBreakdown = {};
            leads.forEach(lead => {
                const source = lead.source || 'לא ידוע';
                sourceBreakdown[source] = (sourceBreakdown[source] || 0) + 1;
            });

            const sourcesChartData = Object.keys(sourceBreakdown).map(source => ({
                name: source,
                value: sourceBreakdown[source]
            }));

            // Lead status breakdown
            const statusBreakdown = {};
            leads.forEach(lead => {
                const status = lead.status || 'לא ידוע';
                statusBreakdown[status] = (statusBreakdown[status] || 0) + 1;
            });

            const statusChartData = Object.keys(statusBreakdown).map(status => ({
                name: status,
                'לידים': statusBreakdown[status]
            }));

            // User activity over time
            const interactionsByDate = {};
            projectInteractions.forEach(interaction => {
                const date = moment(interaction.created_date).format('YYYY-MM-DD');
                interactionsByDate[date] = (interactionsByDate[date] || 0) + 1;
            });

            const activityChartData = Object.keys(interactionsByDate).sort().slice(-30).map(date => ({
                date: moment(date).format('DD/MM'),
                'אינטראקציות': interactionsByDate[date]
            }));

            setStats({
                totalUsers,
                adminUsers,
                regularUsers,
                totalLeads,
                convertedLeads,
                conversionRate,
                activeSessions,
                newUsersChartData,
                projectInteractionsCount: projectInteractions.length,
                sourcesChartData,
                statusChartData,
                activityChartData
            });
        } catch (err) {
            console.error('Failed to load user statistics:', err);
            setError('שגיאה בטעינת נתוני משתמשים: ' + err.message);
        } finally {
            setLoading(false);
        }
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

    if (!stats) {
        return (
            <div className="text-center text-slate-500 p-4">אין נתונים זמינים.</div>
        );
    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

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
                            {stats.adminUsers} מנהלים, {stats.regularUsers} משתמשים רגילים
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">לידים סה"כ</CardTitle>
                        <Zap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalLeads}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.convertedLeads} נסגרו בהצלחה
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">שיעור המרה</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.conversionRate}%</div>
                        <p className="text-xs text-muted-foreground">
                            מליד לעסקה סגורה
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">סשנים פעילים (24 שעות)</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeSessions}</div>
                        <p className="text-xs text-muted-foreground">
                            סשנים אנונימיים אקטיביים
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>משתמשים חדשים לאורך זמן (30 יום אחרונים)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={stats.newUsersChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="משתמשים" stroke="#0ea5e9" strokeWidth={2} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>אינטראקציות משתמשים עם פרויקטים (30 יום)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stats.activityChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="אינטראקציות" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>מקורות לידים</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={stats.sourcesChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {stats.sourcesChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>סטטוס לידים</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stats.statusChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="לידים" fill="#f59e0b" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Total Interactions Card */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>סה"כ אינטראקציות עם פרויקטים</CardTitle>
                    <Eye className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-sky-600">{stats.projectInteractionsCount}</div>
                    <p className="text-sm text-muted-foreground mt-2">
                        צפיות ופניות בפרויקטים מכל המשתמשים
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}