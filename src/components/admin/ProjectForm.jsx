import React, { useState } from 'react';
import { Project } from '@/entities/Project';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

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

const FileUploadField = ({ label, id, value, onChange, required = false }) => {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const { file_url } = await base44.integrations.Core.UploadFile({ file });
            onChange({ target: { name: id, value: file_url } });
            toast.success('הקובץ הועלה בהצלחה');
        } catch (error) {
            toast.error('שגיאה בהעלאת הקובץ');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-1">
            <label htmlFor={id} className="text-sm font-medium text-slate-700">{label}{required && ' *'}</label>
            <div className="flex gap-2">
                <Input
                    id={id}
                    name={id}
                    type="text"
                    value={value || ''}
                    onChange={onChange}
                    placeholder="URL או העלה קובץ"
                    className="flex-1"
                />
                <label htmlFor={`${id}-file`}>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={uploading}
                        className="cursor-pointer"
                        asChild
                    >
                        <span>
                            <Upload className="w-4 h-4 ml-1" />
                            {uploading ? 'מעלה...' : 'העלה'}
                        </span>
                    </Button>
                </label>
                <input
                    id={`${id}-file`}
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
        </div>
    );
};

const CheckboxField = ({ label, id, checked, onCheckedChange }) => (
    <div className="flex items-center space-x-2 pt-2">
        <Checkbox id={id} name={id} checked={checked || false} onCheckedChange={onCheckedChange} />
        <label htmlFor={id} className="text-sm font-medium leading-none">{label}</label>
    </div>
);

export default function ProjectForm({ project, developerId, onSave, onCancel }) {
    const [formData, setFormData] = useState(project ? { ...project, developerId } : { developerId, project_type: 'regular' });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let processedValue = type === 'checkbox' ? checked : value;

        setFormData(prev => {
            const newFormData = { ...prev, [name]: processedValue };

            // Generate full address when address components change
            if (['city', 'street', 'street_number', 'neighborhood'].includes(name)) {
                const addressParts = [
                    newFormData.street,
                    newFormData.street_number,
                    newFormData.neighborhood,
                    newFormData.city
                ].filter(part => part && String(part).trim()).join(', '); // Ensure string conversion for number types
                newFormData.address = addressParts;
            }
            return newFormData;
        });
    };
    
    const handleCheckboxChange = (name) => (checked) => {
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleAmenityChange = (amenity) => (checked) => {
        const currentAmenities = formData.amenities || [];
        const newAmenities = checked
            ? [...currentAmenities, amenity]
            : currentAmenities.filter(a => a !== amenity);
        setFormData(prev => ({ ...prev, amenities: newAmenities }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const savedProject = formData.id
                ? await Project.update(formData.id, formData)
                : await Project.create(formData);
            toast.success("הפרויקט נשמר בהצלחה!");
            onSave(savedProject);
        } catch (error) {
            toast.error("שגיאה בשמירת הפרויקט");
            console.error(error);
        }
    };
    
    const amenitiesList = ["חד\"כ בבניין", "בריכה בבניין", "חדר ארועים בבניין", "שומר 24/7"];

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md border mt-4">
            <h3 className="text-2xl font-semibold">{formData.id ? 'עריכת פרויקט' : 'הוספת פרויקט חדש'}</h3>

            <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-full">
                {/* Accordion Item 1: General Info */}
                <AccordionItem value="item-1">
                    <AccordionTrigger>מידע כללי</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="שם הפרויקט (עברית)" id="name_he" value={formData.name_he} onChange={handleChange} required />
                            <FormField label="שם הפרויקט (אנגלית)" id="name_en" value={formData.name_en} onChange={handleChange} />
                            <FormField label="סלוגן (עברית)" id="slogan_he" value={formData.slogan_he} onChange={handleChange} />
                            <FormField label="סלוגן (אנגלית)" id="slogan_en" value={formData.slogan_en} onChange={handleChange} />
                            <FormField label="מועד אכלוס משוער" id="occupancy_date" value={formData.occupancy_date} onChange={handleChange} type="date" />
                        </div>
                        
                        <FormField label="אודות הפרויקט" id="about" value={formData.about} onChange={handleChange} isTextarea placeholder="תיאור מפורט על הפרויקט, היתרונות שלו, ומה שמיוחד בו..." />
                        
                        <h4 className="font-semibold text-slate-800 mt-6 mb-3">כתובת הפרויקט</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="עיר" id="city" value={formData.city} onChange={handleChange} />
                            <FormField label="רחוב" id="street" value={formData.street} onChange={handleChange} />
                            <FormField label="מספר" id="street_number" value={formData.street_number} onChange={handleChange} />
                            <FormField label="שכונה" id="neighborhood" value={formData.neighborhood} onChange={handleChange} />
                        </div>
                        {formData.address && (
                            <div className="bg-slate-50 p-3 rounded-lg">
                                <span className="text-sm font-medium text-slate-600">כתובת מלאה: </span>
                                <span className="text-sm text-slate-800">{formData.address}</span>
                            </div>
                        )}
                        
                        <FormField label="תיאור סביבת הפרויקט" id="environment_description" value={formData.environment_description} onChange={handleChange} isTextarea />
                        <FormField label="נוף לים/אורבני/ירוק/גם (פירוט על כל הפרויקט)" id="view_description" value={formData.view_description} onChange={handleChange} isTextarea />
                        <CheckboxField label="יש דירה לדוגמא?" id="has_model_apartment" checked={formData.has_model_apartment} onCheckedChange={handleCheckboxChange('has_model_apartment')} />
                    </AccordionContent>
                </AccordionItem>

                {/* Accordion Item 2: Legal & Financial */}
                <AccordionItem value="item-2">
                    <AccordionTrigger>מידע משפטי ופיננסי</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="בנק מלווה" id="accompanying_bank" value={formData.accompanying_bank} onChange={handleChange} />
                            <div className="space-y-1">
                                <label htmlFor="project_type" className="text-sm font-medium text-slate-700">סוג פרויקט</label>
                                <Select onValueChange={(value) => setFormData(prev => ({...prev, project_type: value}))} value={formData.project_type}>
                                    <SelectTrigger><SelectValue placeholder="בחר סוג פרויקט" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="regular">פרויקט רגיל</SelectItem>
                                        <SelectItem value="tama">תמ"א</SelectItem>
                                        <SelectItem value="pinui_binui">פינוי בינוי</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {formData.project_type === 'tama' && (
                                <FormField label='איזו תמ"א?' id="tama_type" value={formData.tama_type} onChange={handleChange} placeholder="למשל: תמ״א 38/1, תמ״א 38/2..." />
                            )}
                            <FormField label='משרד עו"ד' id="law_firm" value={formData.law_firm} onChange={handleChange} />
                            <FormField label="קבלן מבצע" id="contractor" value={formData.contractor} onChange={handleChange} />
                            <FormField label='מחיר התחלתי למ"ר' id="starting_price_per_meter" value={formData.starting_price_per_meter} onChange={handleChange} type="number" />
                            <FormField label="מקדמה מינימלית" id="min_down_payment" value={formData.min_down_payment} onChange={handleChange} type="number" />
                            <FormField label='דמי רישום (ש"ח)' id="reservation_fee_ils" value={formData.reservation_fee_ils} onChange={handleChange} type="number" />
                            <FormField label="דמי רישום ($)" id="reservation_fee_usd" value={formData.reservation_fee_usd} onChange={handleChange} type="number" />
                        </div>
                        <FormField label="תנאי תשלום" id="payment_terms" value={formData.payment_terms} onChange={handleChange} isTextarea />
                        <FormField label="מחיר התחלתי לפי סוג דירה בפרויקט" id="starting_price_by_type" value={formData.starting_price_by_type} onChange={handleChange} isTextarea />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <FormField label="הנחה למקדמה גדולה" id="down_payment_discount_info" value={formData.down_payment_discount_info} onChange={handleChange} />
                           <FormField label="הנחה לרכישה מרובה" id="bulk_purchase_discount_info" value={formData.bulk_purchase_discount_info} onChange={handleChange} />
                        </div>
                        <FormField label="הנחות/הטבות מיוחדות" id="special_offers" value={formData.special_offers} onChange={handleChange} isTextarea />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <FormField label="אחוז תשואה באזור" id="yield_percentage" value={formData.yield_percentage} onChange={handleChange} type="number" />
                           <FormField label="מחיר שכירות ממוצע באזור" id="avg_rent_price" value={formData.avg_rent_price} onChange={handleChange} type="number" />
                        </div>
                        <CheckboxField label="המחיר צמוד למדד?" id="is_price_indexed" checked={formData.is_price_indexed} onCheckedChange={handleCheckboxChange('is_price_indexed')} />
                        <CheckboxField label="יש הלוואת קבלן?" id="has_developer_loan" checked={formData.has_developer_loan} onCheckedChange={handleCheckboxChange('has_developer_loan')} />
                    </AccordionContent>
                </AccordionItem>

                {/* Accordion Item 3: Amenities */}
                <AccordionItem value="item-3">
                    <AccordionTrigger>שירותים ומתקנים</AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {amenitiesList.map(amenity => (
                                <CheckboxField 
                                    key={amenity}
                                    label={amenity}
                                    id={`amenity-${amenity}`}
                                    checked={(formData.amenities || []).includes(amenity)}
                                    onCheckedChange={handleAmenityChange(amenity)}
                                />
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Accordion Item 4: Media & Links */}
                <AccordionItem value="item-4">
                    <AccordionTrigger>מדיה וקישורים</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FileUploadField label="אתר הפרויקט" id="website_url" value={formData.website_url} onChange={handleChange} />
                            <FileUploadField label="סרטון הדמיה" id="simulation_video_url" value={formData.simulation_video_url} onChange={handleChange} />
                            <FileUploadField label="סרטון עדויות" id="testimonials_video_url" value={formData.testimonials_video_url} onChange={handleChange} />
                            <FileUploadField label="סרטון כתבה" id="story_video_url" value={formData.story_video_url} onChange={handleChange} />
                            <FileUploadField label="תכנית אדריכלית" id="architectural_plan_url" value={formData.architectural_plan_url} onChange={handleChange} />
                            <FileUploadField label="מודל BIM" id="bim_model_url" value={formData.bim_model_url} onChange={handleChange} />
                            <FileUploadField label="תוכניות CAD" id="cad_plan_url" value={formData.cad_plan_url} onChange={handleChange} />
                            <FileUploadField label="מלאי דירות" id="inventory_list_url" value={formData.inventory_list_url} onChange={handleChange} />
                            <FileUploadField label="תוכניות דירה" id="apartment_plans_url" value={formData.apartment_plans_url} onChange={handleChange} />
                            <FileUploadField label="תמונות הדמיית פנים" id="interior_renders_url" value={formData.interior_renders_url} onChange={handleChange} />
                            <FileUploadField label="תמונות הדמיית חוץ" id="exterior_renders_url" value={formData.exterior_renders_url} onChange={handleChange} />
                            <FileUploadField label="ברושור PDF עברית" id="brochure_he_url" value={formData.brochure_he_url} onChange={handleChange} />
                            <FileUploadField label="ברושור PDF אנגלית" id="brochure_en_url" value={formData.brochure_en_url} onChange={handleChange} />
                        </div>
                    </AccordionContent>
                </AccordionItem>

                 {/* Accordion Item 5: Sales & Marketing */}
                <AccordionItem value="item-5">
                    <AccordionTrigger>מכירות ושיווק</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField label="שם איש המכירות" id="sales_person_name" value={formData.sales_person_name} onChange={handleChange} />
                            <FormField label="טלפון משרד מכירות" id="sales_phone" value={formData.sales_phone} onChange={handleChange} type="tel" />
                            <FormField label="טלפון להודעות SMS" id="sales_sms" value={formData.sales_sms} onChange={handleChange} type="tel" />
                            <FormField label="טלפון לוואטסאפ" id="sales_whatsapp" value={formData.sales_whatsapp} onChange={handleChange} type="tel" />
                            <FormField label="אימייל מכירות" id="sales_email" value={formData.sales_email} onChange={handleChange} type="email" />
                            <FormField label="כתובת משרד מכירות" id="sales_office_address" value={formData.sales_office_address} onChange={handleChange} />
                            <FormField label="שעות פעילות" id="sales_office_hours" value={formData.sales_office_hours} onChange={handleChange} />
                            <FileUploadField label="קישור Calendly" id="calendly_url" value={formData.calendly_url} onChange={handleChange} />
                            <FileUploadField label="קישור ל-CRM" id="crm_integration_url" value={formData.crm_integration_url} onChange={handleChange} />
                            <FileUploadField label="טופס הרשמה (עברית)" id="registration_form_he_url" value={formData.registration_form_he_url} onChange={handleChange} />
                            <FileUploadField label="טופס הרשמה (אנגלית)" id="registration_form_en_url" value={formData.registration_form_en_url} onChange={handleChange} />
                            <FileUploadField label="הסכם לדוגמא (עברית)" id="agreement_he_url" value={formData.agreement_he_url} onChange={handleChange} />
                            <FileUploadField label="הסכם לדוגמא (אנגלית)" id="agreement_en_url" value={formData.agreement_en_url} onChange={handleChange} />
                         </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            
            <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={onCancel}>ביטול</Button>
                <Button type="submit">שמור פרויקט</Button>
            </div>
        </form>
    );
}