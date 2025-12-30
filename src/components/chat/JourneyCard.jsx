
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle } from 'lucide-react';

const AnswerInput = ({ question, currentAnswer, onCommitAnswer }) => {
  const [value, setValue] = useState(currentAnswer);

  useEffect(() => {
    setValue(currentAnswer);
  }, [currentAnswer]);

  const handleCommit = () => {
    onCommitAnswer(value);
  };

  switch (question.question_type) {
    case 'single_choice':
      return (
        <RadioGroup value={value} onValueChange={onCommitAnswer} className="mt-2 space-y-2">
          {question.options.map(option => (
            <div key={option} className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value={option} id={`${question.id}-${option}`} />
              <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      );
    
    case 'multiple_choice':
      const currentSelection = Array.isArray(value) ? value : [];
      const handleMultiChange = (option) => {
        const newSelection = currentSelection.includes(option)
          ? currentSelection.filter(item => item !== option)
          : [...currentSelection, option];
        setValue(newSelection);
      };
      return (
         <div className="space-y-3 mt-2">
          {question.options.map(option => (
            <div key={option} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id={`${question.id}-${option}`}
                checked={currentSelection.includes(option)}
                onCheckedChange={() => handleMultiChange(option)}
              />
              <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
            </div>
          ))}
          <Button onClick={handleCommit} size="sm" className="mt-2">אישור בחירה</Button>
        </div>
      );

    case 'range':
    case 'open':
      return (
        <div className="flex gap-2 mt-2">
          <Input 
            type={question.question_type === 'range' ? 'number' : 'text'}
            placeholder="הזן תשובה..."
            value={value || ''}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={handleCommit}>שמור</Button>
        </div>
      );

    default:
      return null;
  }
};

export default function JourneyCard({ question, answer, onAnswer }) {
  const [isEditing, setIsEditing] = useState(!answer);
  
  useEffect(() => {
    setIsEditing(!answer);
  }, [answer]);

  const handleCommitAnswer = (newAnswer) => {
    onAnswer(newAnswer);
    setIsEditing(false);
  };

  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold">{question.question_text}</CardTitle>
            {answer && !isEditing && (
                 <Button variant="link" onClick={() => setIsEditing(true)} className="p-0 h-auto">ערוך</Button>
            )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <AnswerInput 
            question={question} 
            currentAnswer={answer} 
            onCommitAnswer={handleCommitAnswer} 
          />
        ) : (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">
              {answer && (Array.isArray(answer) ? answer.join(', ') : answer.toString())}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
