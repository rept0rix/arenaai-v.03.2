import React, { useState } from "react";
import { Property } from "@/entities/Property";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { X, Save } from "lucide-react";
import { motion } from "framer-motion";

const propertyTypes = [
  { value: "apartment", label: "דירה" },
  { value: "house", label: "בית פרטי" },
  { value: "studio", label: "סטודיו" },
  { value: "penthouse", label: "פנטהאוס" },
  { value: "duplex", label: "דופלקס" }
];

const conditions = [
  { value: "new", label: "חדש" },
  { value: "renovated", label: "משופץ" },
  { value: "good", label: "טוב" },
  { value: "needs_renovation", label: "זקוק לשיפוץ" }
];

export default function PropertyForm({ property, onClose }) {
  const [formData, setFormData] = useState({
    title: property?.title || "",
    description: property?.description || "",
    price: property?.price || "",
    location: property?.location || "",
    property_type: property?.property_type || "",
    rooms: property?.rooms || "",
    size: property?.size || "",
    floor: property?.floor || "",
    parking: property?.parking || false,
    elevator: property?.elevator || false,
    balcony: property?.balcony || false,
    condition: property?.condition || "",
    image_url: property?.image_url || "",
    budget_min: property?.budget_min || "",
    budget_max: property?.budget_max || ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSubmit = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        rooms: parseInt(formData.rooms) || 0,
        size: parseFloat(formData.size) || 0,
        floor: parseInt(formData.floor) || 0,
        budget_min: parseFloat(formData.budget_min) || 0,
        budget_max: parseFloat(formData.budget_max) || 0
      };

      if (property) {
        await Property.update(property.id, dataToSubmit);
      } else {
        await Property.create(dataToSubmit);
      }

      onClose();
    } catch (error) {
      console.error("Error saving property:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              {property ? "עריכת נכס" : "הוספת נכס חדש"}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">כותרת הנכס *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">מיקום *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">תיאור</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="property_type">סוג נכס *</Label>
                  <Select
                    value={formData.property_type}
                    onValueChange={(value) => handleInputChange("property_type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="בחר סוג נכס" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rooms">מספר חדרים *</Label>
                  <Input
                    id="rooms"
                    type="number"
                    min="0"
                    value={formData.rooms}
                    onChange={(e) => handleInputChange("rooms", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="size">גודל (מ״ר)</Label>
                  <Input
                    id="size"
                    type="number"
                    min="0"
                    value={formData.size}
                    onChange={(e) => handleInputChange("size", e.target.value)}
                  />
                </div>
              </div>

              {/* Price & Budget */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">מחיר (₪) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="budget_min">תקציב מינימום</Label>
                  <Input
                    id="budget_min"
                    type="number"
                    min="0"
                    value={formData.budget_min}
                    onChange={(e) => handleInputChange("budget_min", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="budget_max">תקציב מקסימום</Label>
                  <Input
                    id="budget_max"
                    type="number"
                    min="0"
                    value={formData.budget_max}
                    onChange={(e) => handleInputChange("budget_max", e.target.value)}
                  />
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="floor">קומה</Label>
                  <Input
                    id="floor"
                    type="number"
                    min="0"
                    value={formData.floor}
                    onChange={(e) => handleInputChange("floor", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="condition">מצב הנכס</Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) => handleInputChange("condition", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="בחר מצב" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map(condition => (
                        <SelectItem key={condition.value} value={condition.value}>
                          {condition.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="image_url">קישור לתמונה</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => handleInputChange("image_url", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Features */}
              <div>
                <Label className="text-base font-medium">מאפיינים נוספים</Label>
                <div className="flex flex-wrap gap-6 mt-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="parking"
                      checked={formData.parking}
                      onCheckedChange={(checked) => handleInputChange("parking", checked)}
                    />
                    <Label htmlFor="parking" className="ml-2">חניה</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="elevator"
                      checked={formData.elevator}
                      onCheckedChange={(checked) => handleInputChange("elevator", checked)}
                    />
                    <Label htmlFor="elevator" className="ml-2">מעלית</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="balcony"
                      checked={formData.balcony}
                      onCheckedChange={(checked) => handleInputChange("balcony", checked)}
                    />
                    <Label htmlFor="balcony" className="ml-2">מרפסת</Label>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  ביטול
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                >
                  <Save className="w-4 h-4 ml-2" />
                  {isSubmitting ? "שומר..." : property ? "עדכן" : "הוסף"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}