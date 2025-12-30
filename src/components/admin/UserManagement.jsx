import React, { useState } from 'react';
import { User } from '@/entities/User';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Edit } from 'lucide-react';
import { toast } from 'sonner';

function EditUserDialog({ user, onUserUpdate }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [role, setRole] = useState(user.role);
    const [isDeveloper, setIsDeveloper] = useState(user.is_developer || false);
    const [companyName, setCompanyName] = useState(user.developer_company_name || '');

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await User.update(user.id, {
                role,
                is_developer: isDeveloper,
                developer_company_name: isDeveloper ? companyName : ''
            });
            toast.success('פרטי המשתמש עודכנו בהצלחה');
            onUserUpdate();
            setIsOpen(false);
        } catch (error) {
            console.error('Failed to update user:', error);
            toast.error('שגיאה בעדכון המשתמש');
        }
        setIsSaving(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 ml-2" /> ערוך
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>עריכת משתמש: {user.full_name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div>
                        <Label>שם מלא</Label>
                        <p className="text-sm text-slate-700">{user.full_name}</p>
                    </div>
                    <div>
                        <Label>אימייל</Label>
                        <p className="text-sm text-slate-700">{user.email}</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role-select">תפקיד</Label>
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger id="role-select">
                                <SelectValue placeholder="בחר תפקיד" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">משתמש</SelectItem>
                                <SelectItem value="admin">מנהל</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                        <Switch
                            id="is-developer"
                            checked={isDeveloper}
                            onCheckedChange={setIsDeveloper}
                        />
                        <Label htmlFor="is-developer">האם יזם?</Label>
                    </div>
                    {isDeveloper && (
                        <div className="space-y-2">
                            <Label htmlFor="company-name">שם חברת היזמות</Label>
                            <Input
                                id="company-name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                placeholder="לדוגמה: Arena נדלן"
                            />
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>ביטול</Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'שומר...' : 'שמור שינויים'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


export default function UserManagement({ users, onRefresh, isLoading }) {
    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>ניהול משתמשים</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>טוען משתמשים...</p>
                </CardContent>
            </Card>
        );
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>ניהול משתמשים ({users.length})</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>שם מלא</TableHead>
                            <TableHead>אימייל</TableHead>
                            <TableHead>תפקיד</TableHead>
                            <TableHead>סטטוס יזם</TableHead>
                            <TableHead>פעולות</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.full_name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                        {user.role === 'admin' ? 'מנהל' : 'משתמש'}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {user.is_developer ? (
                                        <Badge variant="outline" className="text-green-700 border-green-300">
                                            יזם ({user.developer_company_name})
                                        </Badge>
                                    ) : (
                                        <span className="text-slate-500">-</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <EditUserDialog user={user} onUserUpdate={onRefresh} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}