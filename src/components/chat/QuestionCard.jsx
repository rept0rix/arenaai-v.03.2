import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuestionCard({ question, currentAnswer, onAnswer, questionIndex, totalQuestions, isVisible }) {
  const [answer, setAnswer] = useState(currentAnswer || '');
  const [multiSelect, setMultiSelect] = useState(Array.isArray(currentAnswer) ? currentAnswer : []);

  useEffect(() => {
    if (question.question_type === 'multiple_choice') {
      setMultiSelect(Array.isArray(currentAnswer) ? currentAnswer : []);
    } else {
      setAnswer(currentAnswer || '');
    }
  }, [currentAnswer, question.question_type]);

  const handleMultiSelect = (option) => {
    setMultiSelect(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const submitAnswer = () => {
    if (question.question_type === 'multiple_choice') {
      if (multiSelect.length > 0) onAnswer(multiSelect);
    } else {
      if (answer !== '' && answer !== null) onAnswer(answer);
    }
  };

  const renderInput = () => {
    switch (question.question_type) {
      case 'single_choice':
        return (
          <div className="flex flex-wrap gap-2 mt-4">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={answer === option ? 'default' : 'outline'}
                className={`rounded-full ${answer === option ? 'bg-sky-500 hover:bg-sky-600' : ''}`}
                onClick={() => onAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        );
      case 'multiple_choice':
        return (
          <div className="mt-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              {question.options.map((option, index) => (
                <Badge
                  key={index}
                  variant={multiSelect.includes(option) ? 'default' : 'outline'}
                  className={`cursor-pointer transition-colors px-3 py-1.5 text-sm rounded-md ${
                    multiSelect.includes(option)
                      ? 'bg-sky-500 border-sky-500 text-white'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-sky-50'
                  }`}
                  onClick={() => handleMultiSelect(option)}
                >
                  {multiSelect.includes(option) && <CheckCircle className="w-3 h-3 ml-1" />}
                  {option}
                </Badge>
              ))}
            </div>
            <Button onClick={submitAnswer} disabled={multiSelect.length === 0} className="w-full bg-sky-500 hover:bg-sky-600">
              אישור ({multiSelect.length})
            </Button>
          </div>
        );
      case 'range':
        return (
          <div className="mt-4 space-y-4">
            <div className="text-center text-xl font-bold text-sky-600">
              {Number(answer || question.options?.[0] || 0).toLocaleString()} ₪
            </div>
            <Slider
              min={Number(question.options?.[0] || 0)}
              max={Number(question.options?.[1] || 5000000)}
              step={Number(question.options?.[2] || 50000)}
              value={[Number(answer || question.options?.[0] || 0)]}
              onValueChange={(val) => setAnswer(val[0])}
            />
            <Button onClick={submitAnswer} className="w-full bg-sky-500 hover:bg-sky-600">
              המשך
            </Button>
          </div>
        );
      case 'open':
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitAnswer();
            }}
            className="mt-4 flex gap-2"
          >
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="הקלד כאן..."
              className="flex-grow"
            />
            <Button type="submit" disabled={!answer}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </form>
        );
      default:
        return null;
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
      <Card className={`p-4 transition-all duration-300 ${currentAnswer !== undefined ? 'bg-green-50 border-green-200' : 'bg-white'}`}>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-slate-800">{question.question_text}</p>
          <Badge variant="outline" className="text-xs">
            {questionIndex + 1}/{totalQuestions}
          </Badge>
        </div>
        {renderInput()}
        {currentAnswer !== undefined && (
          <div className="mt-3 text-sm text-green-700 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>
              תשובה: {Array.isArray(currentAnswer) ? currentAnswer.join(', ') : Number(currentAnswer) ? Number(currentAnswer).toLocaleString() : currentAnswer}
            </span>
          </div>
        )}
      </Card>
    </motion.div>
  );
}