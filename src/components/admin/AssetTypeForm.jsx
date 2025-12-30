import React, { useState } from 'react';
import { AssetType } from '@/entities/AssetType';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { toast } from 'sonner';

const FormField = ({ label, id, value, onChange, type = 'text', required = false, isTextarea = false, placeholder }) => (
    <div className="space-y-1">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">{label}{required && ' *'}</label>
        {isTextarea ? (
            <Textarea id={id} name={id} value={value || ''} onChange={onChange} required={required} placeholder={placeholder} className="w-full" />
        ) : (
            <Input id={id} name={id} type={type} value={value || ''} onChange={onChange} required={required} placeholder={placeholder} className="w-full" />
        )}
    </div>
);

const CheckboxField = ({ label, id, checked, onCheckedChange }) => (
    <div className="flex items-center space-x-2 pt-2">
        <Checkbox id={id} name={id} checked={checked || false} onCheckedChange={onCheckedChange} />
        <label htmlFor={id} className="text-sm font-medium leading-none">{label}</label>
    </div>
);

export default function AssetTypeForm({ assetType, projectId, onSave, onCancel }) {
    const [formData, setFormData] = useState(assetType ? { ...assetType, projectId } : { projectId });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };
    
    const handleCheckboxChange = (name) => (checked) => {
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSelectChange = (name) => (value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const savedAssetType = formData.id
                ? await AssetType.update(formData.id, formData)
                : await AssetType.create(formData);
            toast.success("סוג הנכס נשמר בהצלחה!");
            onSave(savedAssetType);
        } catch (error) {
            toast.error("שגיאה בשמירת סוג הנכס");
            console.error(error);
        }
    };
    
    const propertyTypes = [
      { value: "apartment", label: "דירה" },
      { value: "penthouse", label: "פנטהאוז" },
      { value: "garden_apartment", label: "דירת גן" },
      { value: "villa", label: "וילה" },
      { value: "duplex", label: "דופלקס" },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 p-4 rounded-lg border mt-4">
            <h4 className="text-xl font-semibold">{formData.id ? 'עריכת סוג נכס' : 'הוספת סוג נכס'}</h4>

            <Accordion type="multiple" defaultValue={['item-1']} className="w-full">
                {/* General Info */}
                <AccordionItem value="item-1">
                    <AccordionTrigger>מידע כללי</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="שם טיפוס (A, B...)" id="type_name" value={formData.type_name} onChange={handleChange} required />
                             <div className="space-y-1">
                                <label htmlFor="property_type" className="text-sm font-medium text-slate-700">סוג נכס</label>
                                <Select onValueChange={handleSelectChange('property_type')} value={formData.property_type}>
                                    <SelectTrigger><SelectValue placeholder="בחר סוג נכס" /></SelectTrigger>
                                    <SelectContent>
                                        {propertyTypes.map(pt => <SelectItem key={pt.value} value={pt.value}>{pt.label}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <FormField label='גודל במ"ר' id="size_sqm" value={formData.size_sqm} onChange={handleChange} type="number" />
                            <FormField label="מספר חדרים" id="room_count" value={formData.room_count} onChange={handleChange} type="number" />
                            <FormField label="מספר חדרי שינה" id="bedroom_count" value={formData.bedroom_count} onChange={handleChange} type="number" />
                            <FormField label="קומה" id="floor" value={formData.floor} onChange={handleChange} type="number" />
                            <FormField label="קומות בבניין" id="total_floors_in_building" value={formData.total_floors_in_building} onChange={handleChange} type="number" />
                            <FormField label="מחיר" id="price" value={formData.price} onChange={handleChange} type="number" />
                            <FormField label="כיווני אוויר" id="air_directions" value={formData.air_directions} onChange={handleChange} />
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Features */}
                <AccordionItem value="item-2">
                    <AccordionTrigger>מאפיינים</AccordionTrigger>
                    <AccordionContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <CheckboxField label='ממ"ד' id="has_mamad" checked={formData.has_mamad} onCheckedChange={handleCheckboxChange('has_mamad')} />
                        <CheckboxField label='ממ"ק' id="has_mamak" checked={formData.has_mamak} onCheckedChange={handleCheckboxChange('has_mamak')} />
                        <CheckboxField label="פיר אשפה" id="has_garbage_chute" checked={formData.has_garbage_chute} onCheckedChange={handleCheckboxChange('has_garbage_chute')} />
                        <CheckboxField label="דוד שמש" id="has_solar_heater" checked={formData.has_solar_heater} onCheckedChange={handleCheckboxChange('has_solar_heater')} />
                        <CheckboxField label="תשתית רשת" id="network_infrastructure" checked={formData.network_infrastructure} onCheckedChange={handleCheckboxChange('network_infrastructure')} />
                    </AccordionContent>
                </AccordionItem>

                {/* Parking & Storage */}
                 <AccordionItem value="item-3">
                    <AccordionTrigger>חניה ומחסן</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <CheckboxField label="חניה" id="has_parking" checked={formData.has_parking} onCheckedChange={handleCheckboxChange('has_parking')} />
                        {formData.has_parking && (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                                <FormField label="מספר חניות" id="parking_spots" value={formData.parking_spots} onChange={handleChange} type="number" />
                                <FormField label="סוג חניה (מלל חופשי)" id="parking_type" value={formData.parking_type} onChange={handleChange} />
                            </div>
                        )}
                        <CheckboxField label="מחסן" id="has_storage" checked={formData.has_storage} onCheckedChange={handleCheckboxChange('has_storage')} />
                         {formData.has_storage && (
                            <div className="pl-6">
                                <FormField label='גודל מחסן (מ"ר)' id="storage_size" value={formData.storage_size} onChange={handleChange} type="number" />
                            </div>
                         )}
                    </AccordionContent>
                </AccordionItem>
                
                {/* Balcony & Kitchen */}
                <AccordionItem value="item-4">
                    <AccordionTrigger>מרפסת ומטבח</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <CheckboxField label="מרפסת" id="has_balcony" checked={formData.has_balcony} onCheckedChange={handleCheckboxChange('has_balcony')} />
                        {formData.has_balcony && (
                            <div className="pl-6">
                                <FormField label='גודל מרפסת (מ"ר)' id="balcony_size_sqm" value={formData.balcony_size_sqm} onChange={handleChange} type="number" />
                            </div>
                        )}
                        <FormField label='גודל מטבח (מ"ר)' id="kitchen_size_sqm" value={formData.kitchen_size_sqm} onChange={handleChange} type="number" />
                    </AccordionContent>
                </AccordionItem>

                {/* Specs & Media */}
                <AccordionItem value="item-5">
                    <AccordionTrigger>מפרט וקישורים</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <FormField label="מפרט טכני" id="technical_specifications" value={formData.technical_specifications} onChange={handleChange} isTextarea />
                        <FormField label="קישור לתכנית דירה" id="apartment_plan_url" value={formData.apartment_plan_url} onChange={handleChange} type="url" />
                        <FormField label="קישור לברושור (עברית)" id="brochure_he_url" value={formData.brochure_he_url} onChange={handleChange} type="url" />
                        <FormField label="קישור לברושור (אנגלית)" id="brochure_en_url" value={formData.brochure_en_url} onChange={handleChange} type="url" />
                        <FormField label="תמונות פנים (מופרד בפסיק)" id="interior_images" value={formData.interior_images?.join(',') || ''} onChange={e => setFormData({...formData, interior_images: e.target.value ? e.target.value.split(',') : []})} isTextarea />
                        <FormField label="תמונות חוץ (מופרד בפסיק)" id="exterior_images" value={formData.exterior_images?.join(',') || ''} onChange={e => setFormData({...formData, exterior_images: e.target.value ? e.target.value.split(',') : []})} isTextarea />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            
            <div className="flex justify-end gap-3">
                <Button type="button" variant="ghost" size="sm" onClick={onCancel}>ביטול</Button>
                <Button type="submit" size="sm">שמור סוג נכס</Button>
            </div>
        </form>
    );
}