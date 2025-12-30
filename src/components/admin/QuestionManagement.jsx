import React, { useState } from "react";
import { ChatQuestion } from "@/entities/ChatQuestion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ArrowUp, ArrowDown, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionForm from "./QuestionForm";

const questionTypeLabels = {
  open: "שאלה פתוחה",
  single_choice: "בחירה יחידה",
  multiple_choice: "בחירה מרובה",
  range: "טווח מספרים"
};

const questionTypeColors = {
  open: "bg-blue-100 text-blue-800",
  single_choice: "bg-green-100 text-green-800",
  multiple_choice: "bg-purple-100 text-purple-800",
  range: "bg-orange-100 text-orange-800"
};

export default function QuestionManagement({ questions, onRefresh, isLoading }) {
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setShowForm(true);
  };

  const handleDelete = async (question) => {
    if (confirm(`האם אתה בטוח שברצונך למחוק את השאלה "${question.question_text}"?`)) {
      try {
        await ChatQuestion.delete(question.id);
        onRefresh();
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    }
  };

  const handleReorder = async (question, direction) => {
    try {
      const currentOrder = question.order;
      const newOrder = direction === 'up' ? currentOrder - 1 : currentOrder + 1;
      
      // Find question with target order
      const targetQuestion = questions.find(q => q.order === newOrder);
      
      if (targetQuestion) {
        // Swap orders
        await ChatQuestion.update(question.id, { order: newOrder });
        await ChatQuestion.update(targetQuestion.id, { order: currentOrder });
        onRefresh();
      }
    } catch (error) {
      console.error("Error reordering question:", error);
    }
  };

  const toggleActive = async (question) => {
    try {
      await ChatQuestion.update(question.id, { is_active: !question.is_active });
      onRefresh();
    } catch (error) {
      console.error("Error toggling question:", error);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingQuestion(null);
    onRefresh();
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-slate-600">טוען שאלות...</p>
      </div>
    );
  }

  const sortedQuestions = [...questions].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">ניהול שאלות צ'אט</h2>
          <p className="text-slate-600">{questions.length} שאלות במערכת</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <Plus className="w-4 h-4 ml-2" />
          הוסף שאלה חדשה
        </Button>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <AnimatePresence>
          {sortedQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="group"
            >
              <Card className={`transition-all duration-300 ${
                question.is_active 
                  ? "border-slate-200 hover:shadow-lg" 
                  : "border-slate-100 bg-slate-50 opacity-60"
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-xs">
                          סדר {question.order || index + 1}
                        </Badge>
                        <Badge className={questionTypeColors[question.question_type]}>
                          {questionTypeLabels[question.question_type]}
                        </Badge>
                        {!question.is_active && (
                          <Badge variant="outline" className="text-red-600 border-red-200">
                            לא פעיל
                          </Badge>
                        )}
                      </div>
                      
                      <CardTitle className="text-lg leading-relaxed">
                        {question.question_text}
                      </CardTitle>
                      
                      {question.filter_field && (
                        <p className="text-sm text-slate-500 mt-1">
                          מסנן לפי: {question.filter_field}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Reorder buttons */}
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleReorder(question, 'up')}
                          disabled={index === 0}
                        >
                          <ArrowUp className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => handleReorder(question, 'down')}
                          disabled={index === sortedQuestions.length - 1}
                        >
                          <ArrowDown className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleActive(question)}
                          className={question.is_active ? "text-red-600 hover:bg-red-50" : "text-green-600 hover:bg-green-50"}
                        >
                          {question.is_active ? "השבת" : "הפעל"}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(question)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(question)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {question.options && question.options.length > 0 && (
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-700">אפשרויות:</p>
                      <div className="flex flex-wrap gap-2">
                        {question.options.map((option, optionIndex) => (
                          <Badge key={optionIndex} variant="outline" className="text-xs">
                            {option}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {questions.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">אין שאלות</h3>
          <p className="text-slate-600">הוסף שאלות חדשות לצ'אט</p>
        </div>
      )}

      {/* Question Form Modal */}
      {showForm && (
        <QuestionForm
          question={editingQuestion}
          questions={questions}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}