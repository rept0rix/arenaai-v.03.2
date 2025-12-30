
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea'; // This is not used, but keeping for consistency if it was intended to be used later
import { Checkbox } from '@/components/ui/checkbox'; // This is not used in the new flow, but keeping for consistency
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, Lightbulb } from 'lucide-react';

const questions = [
    {
        id: 'propertyPrice',
        title: 'כמה עולה בערך הדירה שאת שוקלת לרכוש?',
        subtitle: 'מספיק גם הערכה כללית.',
        type: 'number',
        placeholder: 'לדוגמה: 2,500,000',
        required: true
    },
    {
        id: 'propertyType',
        title: 'זו הדירה הראשונה שלך?',
        subtitle: 'או שיש לך כבר נכס נוסף, או שמדובר בדירת השקעה?',
        type: 'radio',
        options: [
            { value: 'first', label: 'דירה ראשונה' },
            { value: 'second', label: 'דירה שנייה/נוספת' },
            { value: 'investment', label: 'דירת השקעה' }
        ],
        required: true
    },
    {
        id: 'netIncome',
        title: 'אפשר לשאול מה גובה ההכנסה שלך נטו (אחרי מס)?',
        subtitle: 'גם אם היא משתנה – סדר גודל ממוצע זה מעולה.',
        type: 'number',
        placeholder: 'לדוגמה: 15,000',
        required: true
    },
    {
        id: 'additionalIncome',
        title: 'יש עוד מקורות הכנסה קבועים חוץ מהשכר?',
        subtitle: 'למשל הכנסה של בת הזוג, שכירות מדירה אחרת, קצבה או עסק?',
        type: 'radio',
        options: [
            { value: 'none', label: 'אין הכנסות נוספות' },
            { value: 'partner', label: 'הכנסה של בן/בת זוג' },
            { value: 'rental', label: 'הכנסה משכירות' },
            { value: 'business', label: 'הכנסה מעסק' },
            { value: 'other', label: 'אחר' }
        ],
        additionalInput: {
            condition: value => value !== 'none',
            placeholder: 'סכום ההכנסה הנוספת',
            field: 'additionalIncomeAmount'
        }
    },
    {
        id: 'commitments',
        title: 'יש התחייבויות קיימות?',
        subtitle: 'הלוואות, מינוס קבוע, תשלום חודשי לרכב, גני ילדים או משהו דומה?',
        type: 'radio',
        options: [
            { value: 'none', label: 'אין התחייבויות' },
            { value: 'loan', label: 'הלוואה קיימת' },
            { value: 'overdraft', label: 'מינוס קבוע' },
            { value: 'car', label: 'מימון רכב' },
            { value: 'other', label: 'אחר' }
        ],
        additionalInput: {
            condition: value => value !== 'none',
            placeholder: 'סכום החיוב החודשי',
            field: 'commitmentsAmount'
        }
    },
    {
        id: 'availableFunds',
        title: 'כמה כסף עומד לרשותך לרכישת הדירה?',
        subtitle: 'אפשר גם בקירוב – כולל חסכונות, מתנה מההורים או דירה שאתה מוכר.',
        type: 'number',
        placeholder: 'לדוגמה: 500,000',
        required: true
    },
    {
        id: 'loanPeriod',
        title: 'כמה זמן תעדיפי לפרוס את ההלוואה?',
        subtitle: 'אפשר גם טווח – למשל 20–25 שנה.',
        type: 'radio',
        options: [
            { value: '15', label: '15 שנים' },
            { value: '20', label: '20 שנים' },
            { value: '25', label: '25 שנים' },
            { value: '30', label: '30 שנים' },
            { value: 'custom', label: 'אחר' }
        ],
        additionalInput: {
            condition: value => value === 'custom',
            placeholder: 'מספר שנים',
            field: 'customLoanPeriod'
        }
    },
    {
        id: 'priorities',
        title: 'מה הכי חשוב לך כשבונים איתך את ההלוואה?',
        subtitle: 'תשלום נמוך? יכולת להחזיר מוקדם? יציבות לאורך זמן?',
        type: 'radio',
        options: [
            { value: 'low_payment', label: 'תשלום חודשי נמוך' },
            { value: 'early_repayment', label: 'יכולת לפרעון מוקדם' },
            { value: 'stability', label: 'יציבות לאורך זמן' },
            { value: 'flexibility', label: 'גמישות במסלול' }
        ]
    },
    {
        id: 'contact', // This question will be filtered out.
        title: 'פרטי יצירת קשר',
        subtitle: 'כדי שנוכל לתאם איתך את השלב הבא',
        type: 'contact',
        fields: [
            { id: 'name', label: 'שם מלא', type: 'text', required: true },
            { id: 'phone', label: 'מספר טלפון', type: 'tel', required: true },
            { id: 'email', label: 'דוא"ל', type: 'email', required: true }
        ],
        checkboxes: [
            { id: 'marketing', label: 'אני מאשר/ת קבלת מידע', required: true },
            { id: 'terms', label: 'קראתי את תקנון שימוש', required: true, link: '/TermsOfService' }
        ]
    }
];

export default function FinancingWizard({ onComplete }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Remove the contact question from the questions array for active flow
    const activeQuestions = questions.filter(q => q.id !== 'contact');
    const currentQuestion = activeQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / activeQuestions.length) * 100;

    const handleAnswer = (questionId, value, additionalData = {}) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value,
            ...additionalData
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < activeQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1500));
        onComplete(answers);
        setIsSubmitting(false);
    };

    const isCurrentQuestionAnswered = () => {
        const question = currentQuestion;
        const answer = answers[question.id];
        
        // No longer checking for 'contact' type specifically here
        if (question.required && (!answer && answer !== 0 || (typeof answer === 'string' && answer.trim() === ''))) {
            return false;
        }

        // For radio buttons with additional input, ensure the additional input is also filled if condition met
        if (question.type === 'radio' && question.additionalInput && question.additionalInput.condition(answer)) {
            const additionalAnswer = answers[question.additionalInput.field];
            if (!additionalAnswer && additionalAnswer !== 0 || (typeof additionalAnswer === 'string' && additionalAnswer.trim() === '')) {
                return false;
            }
        }
        
        return true;
    };

    const renderQuestion = (question) => {
        switch (question.type) {
            case 'number':
                return (
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder={question.placeholder}
                            value={typeof answers[question.id] === 'number' 
                                ? answers[question.id].toLocaleString('en-US') 
                                : answers[question.id] || ''
                            }
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '');
                                handleAnswer(question.id, value ? parseInt(value, 10) : '');
                            }}
                            className="text-lg p-4"
                        />
                    </div>
                );

            case 'radio':
                return (
                    <div className="space-y-4">
                        <RadioGroup
                            value={answers[question.id] || ''}
                            onValueChange={(value) => handleAnswer(question.id, value)}
                            className="space-y-3"
                        >
                            {question.options.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2 space-x-reverse">
                                    <RadioGroupItem value={option.value} id={option.value} />
                                    <Label htmlFor={option.value} className="text-base cursor-pointer">
                                        {option.label}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                        
                        {question.additionalInput && 
                         question.additionalInput.condition(answers[question.id]) && (
                            <div className="mt-4">
                                <Input
                                    type="text"
                                    placeholder={question.additionalInput.placeholder}
                                    value={typeof answers[question.additionalInput.field] === 'number' 
                                        ? answers[question.additionalInput.field].toLocaleString('en-US') 
                                        : answers[question.additionalInput.field] || ''
                                    }
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, '');
                                        handleAnswer(question.additionalInput.field, value ? parseInt(value, 10) : '');
                                    }}
                                    className="p-3"
                                />
                            </div>
                        )}
                    </div>
                );

            // Removed 'contact' case as per requirements.
            // If Textarea or Checkbox components were intended for other question types, they should be implemented here.
            // For now, they are just imported but not used in `renderQuestion`.
            default:
                return null;
        }
    };

    if (isSubmitting) {
        return (
            <Card className="max-w-2xl mx-auto">
                <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">מחשב את המשכנתא המתאימה לך...</h3>
                    <p className="text-slate-600">עוד רגע נציג לך את כל האפשרויות</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-slate-600">
                        שאלה {currentQuestionIndex + 1} מתוך {activeQuestions.length}
                    </span>
                    <span className="text-sm text-slate-500">{Math.round(progress)}% הושלם</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            {/* Encouragement Message */}
            {currentQuestionIndex === 2 && (
                <Card className="bg-green-50 border-green-200 mb-6">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <Lightbulb className="w-4 h-4 text-green-600" />
                            </div>
                            <p className="text-green-800 font-medium">
                                מעולה – עוד {activeQuestions.length - currentQuestionIndex - 1} שאלות קצרות וסיימנו. על פי התשובות שלך – אוכל לנתח מה הן אפשרויות המימון שלך
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Question Card */}
            <Card className="shadow-lg">
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <img
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/a1d576606_a-icon-shadow1.png"
                                alt="Arena AI"
                                className="w-8 h-8"
                            />
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-xl text-slate-900 leading-tight">
                                {currentQuestion.title}
                            </CardTitle>
                            {currentQuestion.subtitle && (
                                <p className="text-slate-600 mt-2">{currentQuestion.subtitle}</p>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-0">
                    {renderQuestion(currentQuestion)}
                </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
                <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-2"
                >
                    <ArrowRight className="w-4 h-4" />
                    הקודם
                </Button>
                
                <Button
                    onClick={handleNext}
                    disabled={!isCurrentQuestionAnswered()}
                    className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 flex items-center gap-2"
                >
                    {currentQuestionIndex === activeQuestions.length - 1 ? 'חשב משכנתא' : 'הבא'}
                    <ArrowLeft className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
