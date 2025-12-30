import React, { useState } from "react";
import { Property } from "@/entities/Property";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, MapPin, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PropertyForm from "./PropertyForm";

export default function PropertyManagement({ properties, onRefresh, isLoading }) {
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProperties = properties.filter(property =>
    property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleDelete = async (property) => {
    if (confirm(`האם אתה בטוח שברצונך למחוק את "${property.title}"?`)) {
      try {
        await Property.delete(property.id);
        onRefresh();
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProperty(null);
    onRefresh();
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-slate-600">טוען נכסים...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">ניהול נכסים</h2>
          <p className="text-slate-600">{properties.length} נכסים במערכת</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <Plus className="w-4 h-4 ml-2" />
          הוסף נכס חדש
        </Button>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <Input
          placeholder="חיפוש לפי שם או מיקום..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-slate-200 focus:border-orange-300"
        />
      </div>

      {/* Properties Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredProperties.map((property) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                  <img
                    src={property.image_url || `https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-orange-500">
                      {property.price?.toLocaleString()} ₪
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-1">{property.title}</CardTitle>
                  <div className="flex items-center text-slate-600 text-sm">
                    <MapPin className="w-4 h-4 ml-1" />
                    <span className="line-clamp-1">{property.location}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      <span>{property.rooms} חדרים</span>
                    </div>
                    {property.size && <span>{property.size} מ״ר</span>}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(property)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 ml-1" />
                      עריכה
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(property)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProperties.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Home className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">אין נכסים</h3>
          <p className="text-slate-600">הוסף נכסים חדשים או שנה את החיפוש</p>
        </div>
      )}

      {/* Property Form Modal */}
      {showForm && (
        <PropertyForm
          property={editingProperty}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}