import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import QuestionCard from './QuestionCard';

export default function ChatBubble({ message, isActiveQuestion, onSubmitAnswer }) {
  const [multiSelect, setMultiSelect] = useState([]);

  const handleMultiSelect = (option) => {
    setMultiSelect(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };
  
  const isBot = message.type === 'bot' || message.type === 'arena_intro';
  
  const renderQuestionOptions = () => {
    if (!message.question || !isActiveQuestion) return null;

    const { question_type, options } = message.question;

    if (question_type === 'single_choice') {
      return (
        <div className="flex flex-wrap gap-2 mt-3">
          {options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-700"
              onClick={() => onSubmitAnswer(message.question, option)}
            >
              {option}
            </Button>
          ))}
        </div>
      );
    }
    
    if (question_type === 'multiple_choice') {
      return (
        <div className="mt-3 space-y-3">
          <div className="flex flex-wrap gap-2">
            {options.map((option, index) => (
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
          <Button 
            onClick={() => onSubmitAnswer(message.question, multiSelect)} 
            disabled={multiSelect.length === 0} 
            className="w-full bg-sky-500 hover:bg-sky-600"
          >
            אישור ({multiSelect.length})
          </Button>
        </div>
      );
    }
    
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div
        className={`px-4 py-3 rounded-2xl max-w-sm md:max-w-md lg:max-w-lg ${
          isBot
            ? 'bg-slate-100 text-slate-800 rounded-bl-lg'
            : 'bg-sky-500 text-white rounded-br-lg'
        }`}
      >
        {message.isMarkdown ? (
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => <p className="m-0" {...props} />,
              strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
            }}
          >
            {message.message}
          </ReactMarkdown>
        ) : (
          <p className="m-0">{message.message}</p>
        )}
        {renderQuestionOptions()}
      </div>
    </motion.div>
  );
}