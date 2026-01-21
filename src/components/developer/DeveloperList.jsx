import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function DeveloperList({
  developers,
  selectedDeveloper,
  onSelectDeveloper,
  onAddDeveloper,
  onDeleteDeveloper,
  onEditDeveloper
}) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>יזמים</CardTitle>
        <Button onClick={onAddDeveloper}>
          <Plus className="w-4 h-4 ml-2" /> הוסף יזם
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {developers.length === 0 && <p className="text-slate-500 text-sm">לא נמצאו יזמים. התחל בהוספת אחד!</p>}
          {developers.map(dev => (
            <li
              key={dev.id}
              className={`p-3 rounded-md cursor-pointer transition-colors flex justify-between items-center ${selectedDeveloper?.id === dev.id ? 'bg-sky-100 text-sky-800 font-medium' : 'hover:bg-slate-100'}`}
            >
              <span onClick={() => onSelectDeveloper(dev)} className="flex-grow">{dev.name_he}</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-500 hover:text-slate-700" onClick={(e) => { e.stopPropagation(); onEditDeveloper(dev); }}>
                  <Edit className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500 opacity-50 hover:opacity-100" onClick={(e) => { e.stopPropagation(); onDeleteDeveloper(dev); }}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}