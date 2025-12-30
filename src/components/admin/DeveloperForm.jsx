
import React, { useState } from 'react';
import { Developer } from '@/entities/Developer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

// Reusable FormField Component
const FormField = ({ label, id, value, onChange, type = 'text', required = false, isTextarea = false, isCheckbox = false }) => (
    <div className="space-y-1">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">{label}{required && ' *'}</label>
        {isTextarea ? (
            <Textarea id={id} name={id} value={value || ''} onChange={onChange} required={required} className="w-full" />
        ) : isCheckbox ? (
            <div className="flex items-center space-x-2 pt-2">
                <Checkbox id={id} name={id} checked={value || false} onCheckedChange={onChange} />
                <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {label}
                </label>
            </div>
        ) : (
            <Input id={id} name={id} type={type} value={value || ''} onChange={onChange} required={required} className="w-full" />
        )}
    </div>
);


export default function DeveloperForm({ developer, onSave, onCancel }) {
    const [formData, setFormData] = useState(developer || {});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };
    
    const handleCheckboxChange = (name) => (checked) => {
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const savedDeveloper = formData.id
                ? await Developer.update(formData.id, formData)
                : await Developer.create(formData);
            toast.success("היזם נשמר בהצלחה!");
            onSave(savedDeveloper);
        } catch (error) {
            toast.error("שגיאה בשמירת היזם");
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-2xl font-semibold">{formData.id ? 'עריכת יזם' : 'הוספת יזם חדש'}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="שם החברה (עברית)" id="name_he" value={formData.name_he} onChange={handleChange} required />
                <FormField label="שם החברה (אנגלית)" id="name_en" value={formData.name_en} onChange={handleChange} />
                <FormField label="סלוגן (עברית)" id="slogan_he" value={formData.slogan_he} onChange={handleChange} />
                <FormField label="סלוגן (אנגלית)" id="slogan_en" value={formData.slogan_en} onChange={handleChange} />
                <FormField label="לוגו (עברית) - URL" id="logo_he_url" value={formData.logo_he_url} onChange={handleChange} type="url" />
                <FormField label="לוגו (אנגלית) - URL" id="logo_en_url" value={formData.logo_en_url} onChange={handleChange} type="url" />
                <FormField label="אתר אינטרנט" id="website_url" value={formData.website_url} onChange={handleChange} type="url" />
                <FormField label="עמוד 'אודות' באתר" id="about_page_url" value={formData.about_page_url} onChange={handleChange} type="url" />
                <FormField label="סרטון תדמית (עברית) - URL" id="video_he_url" value={formData.video_he_url} onChange={handleChange} type="url" />
                <FormField label="סרטון תדמית (אנגלית) - URL" id="video_en_url" value={formData.video_en_url} onChange={handleChange} type="url" />
            </div>

            <FormField label="אודות החברה (עברית)" id="about_he" value={formData.about_he} onChange={handleChange} isTextarea />
            <FormField label="אודות החברה (אנגלית)" id="about_en" value={formData.about_en} onChange={handleChange} isTextarea />

            <div className="space-y-1">
                <div className="flex items-center space-x-2 pt-2">
                     <Checkbox id="arena_benefits_program" name="arena_benefits_program" checked={formData.arena_benefits_program} onCheckedChange={handleCheckboxChange('arena_benefits_program')} />
                    <label htmlFor="arena_benefits_program" className="text-sm font-medium">הצטרפות ל-ARENA CLUB</label>
                </div>
                <p className="text-xs text-slate-500 pl-8 pt-1">
                    הצטרפות ל־ARENA CLUB מקנה ליזם אפשרות להשתתף בהטבות לרוכשים. במקרים שבהם לנכס יש ציון התאמה זהה לנכס אחר – תינתן עדיפות להצגת הנכס החבר במועדון. הכל בהתאם לאמור במסמך ההתקשרות שבינך לבין החברה.
                </p>
            </div>

            <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={onCancel}>ביטול</Button>
                <Button type="submit">שמור יזם</Button>
            </div>
        </form>
    );
}

