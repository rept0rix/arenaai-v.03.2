import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building2, Edit, Plus, Trash2 } from 'lucide-react';

export default function DeveloperProjects() {
  const [editingPrice, setEditingPrice] = useState(null);

  // Mock data
  const projects = [
    {
      id: 1,
      name: 'פרויקט דיזנגוף',
      location: 'תל אביב',
      apartments: [
        { id: 101, floor: 3, rooms: 4, size: 95, price: 3200000, status: 'available' },
        { id: 102, floor: 5, rooms: 3, size: 78, price: 2800000, status: 'sold' },
        { id: 103, floor: 8, rooms: 5, size: 120, price: 4100000, status: 'reserved' },
      ]
    },
    {
      id: 2,
      name: 'פרויקט גבעתיים',
      location: 'גבעתיים',
      apartments: [
        { id: 201, floor: 2, rooms: 4, size: 90, price: 2900000, status: 'available' },
        { id: 202, floor: 4, rooms: 3, size: 75, price: 2500000, status: 'available' },
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'reserved': return 'bg-yellow-100 text-yellow-700';
      case 'sold': return 'bg-slate-100 text-slate-500';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'available': return 'זמין';
      case 'reserved': return 'שמור';
      case 'sold': return 'נמכר';
      default: return status;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">פרויקטים ונכסים</h1>
        <p className="text-slate-600">ניהול מלאי ומחירונים</p>
      </div>

      <div className="space-y-8">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-sky-600" />
                  <div>
                    <CardTitle>{project.name}</CardTitle>
                    <p className="text-sm text-slate-500 mt-1">{project.location}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 ml-1" />
                  הוסף דירה
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">דירה</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">קומה</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">חדרים</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">גודל (מ"ר)</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">מחיר</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">סטטוס</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">פעולות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.apartments.map((apt) => (
                      <tr key={apt.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4 text-sm font-medium text-slate-900">#{apt.id}</td>
                        <td className="py-3 px-4 text-sm text-slate-700">{apt.floor}</td>
                        <td className="py-3 px-4 text-sm text-slate-700">{apt.rooms}</td>
                        <td className="py-3 px-4 text-sm text-slate-700">{apt.size}</td>
                        <td className="py-3 px-4 text-sm">
                          {editingPrice === apt.id ? (
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                defaultValue={apt.price}
                                className="w-32 h-8"
                                onBlur={() => setEditingPrice(null)}
                              />
                              <Button
                                size="sm"
                                onClick={() => {
                                  setEditingPrice(null);
                                  alert('מחיר עודכן!');
                                }}
                              >
                                שמור
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-900">
                                ₪{apt.price.toLocaleString()}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingPrice(apt.id)}
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(apt.status)}>
                            {getStatusLabel(apt.status)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Button size="sm" variant="ghost" onClick={() => alert('עריכת דירה...')}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => alert('מחיקת דירה...')}>
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}