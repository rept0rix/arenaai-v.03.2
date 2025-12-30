import React from 'react';
import JourneyCard from './JourneyCard';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function JourneyGuide({ questions, session, onAnswer, onBack }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">מסע חיפוש הנכס</h2>
            <p className="text-slate-600">
              ענה על השאלות כדי שנוכל למצוא עבורך את הנכס המושלם.
            </p>
          </div>
          <Button variant="ghost" onClick={onBack}>
            <ArrowRight className="w-4 h-4 ml-2" />
            חזור לצ'אט
          </Button>
        </div>
        <div className="space-y-4">
          {questions.map((question) => (
            <JourneyCard
              key={question.id}
              question={question}
              answer={session?.answers?.[question.id]}
              onAnswer={(answer) => onAnswer(question.id, answer)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}