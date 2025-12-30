import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function BillingTab({ invoices }) {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'paid': return <Badge className="bg-green-100 text-green-800">שולם</Badge>;
            case 'pending': return <Badge className="bg-yellow-100 text-yellow-800">ממתין לתשלום</Badge>;
            case 'overdue': return <Badge className="bg-red-100 text-red-800">באיחור</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>חיובים וחשבוניות</CardTitle>
                <CardDescription>כאן תוכלו לראות ולנהל את היסטוריית החיובים שלכם.</CardDescription>
            </CardHeader>
            <CardContent>
                {invoices.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-slate-500">לא נמצאו חשבוניות.</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>מספר חשבונית</TableHead>
                                <TableHead>תאריך הפקה</TableHead>
                                <TableHead>תאריך יעד</TableHead>
                                <TableHead>סכום</TableHead>
                                <TableHead>סטטוס</TableHead>
                                <TableHead>פעולות</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map(invoice => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                                    <TableCell>{new Date(invoice.created_date).toLocaleDateString('he-IL')}</TableCell>
                                    <TableCell>{new Date(invoice.dueDate).toLocaleDateString('he-IL')}</TableCell>
                                    <TableCell>₪{invoice.amount.toLocaleString()}</TableCell>
                                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm">
                                            <Download className="w-4 h-4 ml-2" />
                                            הורדה
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}