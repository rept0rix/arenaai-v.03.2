
import React, { useState } from "react";
import { ChatQuestion } from "@/entities/ChatQuestion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Save, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const questionTypes = [
  { value: "open", label: "שאלה פתוחה" },
  { value: "single_choice", label: "בחירה יחידה" },
  { value: "multiple_choice", label: "בחירה מרובה" },
  { value: "range", label: "טווח מספרים" }
];

const filterFields = [
  { value: "_none", label: "ללא סינון" }, // Changed from "" to "_none"
  { value: "budget", label: "תקציב" },
  { value: "property_type", label: "סוג נכס" },
  { value: "location", label: "מיקום" },
  { value: "rooms", label: "מספר חדרים" },
  { value: "features", label: "מאפיינים" }
];

export default function QuestionForm({ question, questions, onClose }) {
  const [formData, setFormData] = useState({
    question_text: question?.question_text || "",
    question_type: question?.question_type || "open",
    options: question?.options || [],
    order: question?.order || (Math.max(...questions.map(q => q.order || 0), 0) + 1),
    filter_field: question?.filter_field || "_none", // Changed from "" to "_none"
    is_active: question?.is_active !== false
  });
  const [newOption, setNewOption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addOption = () => {
    if (newOption.trim()) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, newOption.trim()]
      }));
      setNewOption("");
    }
  };

  const removeOption = (index) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSubmit = {
        ...formData,
        order: parseInt(formData.order) || 1,
        options: (formData.question_type === 'single_choice' || formData.question_type === 'multiple_choice') 
          ? formData.options 
          : [],
        filter_field: formData.filter_field === '_none' ? '' : formData.filter_field // Added logic to convert "_none" to "" for submission
      };

      if (question) {
        await ChatQuestion.update(question.id, dataToSubmit);
      } else {
        await ChatQuestion.create(dataToSubmit);
      }

      onClose();
    } catch (error) {
      console.error("Error saving question:", error);
    }
    setIsSubmitting(false);
  };

  const needsOptions = formData.question_type === 'single_choice' || formData.question_type === 'multiple_choice';

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
              {question ? "עריכת שאלה" : "הוספת שאלה חדשה"}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Question Text */}
              <div>
                <Label htmlFor="question_text">טקסט השאלה *</Label>
                <Textarea
                  id="question_text"
                  value={formData.question_text}
                  onChange={(e) => handleInputChange("question_text", e.target.value)}
                  placeholder="מה השאלה שתרצה לשאול?"
                  rows={3}
                  required
                />
              </div>

              {/* Question Type & Order */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="question_type">סוג השאלה *</Label>
                  <Select
                    value={formData.question_type}
                    onValueChange={(value) => handleInputChange("question_type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="בחר סוג שאלה" />
                    </SelectTrigger>
                    <SelectContent>
                      {questionTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="order">סדר השאלה</Label>
                  <Input
                    id="order"
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => handleInputChange("order", e.target.value)}
                  />
                </div>
              </div>

              {/* Filter Field */}
              <div>
                <Label htmlFor="filter_field">שדה לסינון</Label>
                <Select
                  value={formData.filter_field}
                  onValueChange={(value) => handleInputChange("filter_field", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="בחר שדה לסינון" />
                  </SelectTrigger>
                  <SelectContent>
                    {filterFields.map(field => (
                      <SelectItem key={field.value} value={field.value}>
                        {field.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-slate-500 mt-1">
                  איזה שדה בנכס ישמש לסינון התוצאות על בסיס התשובה לשאלה זו
                </p>
              </div>

              {/* Options for Choice Questions */}
              {needsOptions && (
                <div>
                  <Label>אפשרויות לבחירה</Label>
                  
                  {/* Existing Options */}
                  {formData.options.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.options.map((option, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="flex items-center gap-2 px-3 py-1"
                        >
                          {option}
                          <button
                            type="button"
                            onClick={() => removeOption(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Add New Option */}
                  <div className="flex gap-2">
                    <Input
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      placeholder="הוסף אפשרות חדשה..."
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOption())}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addOption}
                      disabled={!newOption.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

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
                  {isSubmitting ? "שומר..." : question ? "עדכן" : "הוסף"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
