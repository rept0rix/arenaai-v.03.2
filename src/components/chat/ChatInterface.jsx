import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, Compass, MessageSquareMore, MousePointer2, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBubble from './ChatBubble';
import QuestionCard from './QuestionCard';
import { InvokeLLM } from "@/integrations/Core";
import ChatButtonsExplanation from './ChatButtonsExplanation';

export default function ChatInterface({ questions, currentSession, onUpdateAnswer, filteredCount, isMobile, isSelectionMode, setIsSelectionMode, contextMessage, propertyToAnalyze, onPropertyAnalyzed }) {
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [activeQuestionId, setActiveQuestionId] = useState(null);
  const [viewMode, setViewMode] = useState('chat'); // 'chat', 'guided', 'open_chat'
  const [visibleQuestions, setVisibleQuestions] = useState(0);
  const [selectedElement, setSelectedElement] = useState(null);
  const escListenerRef = useRef(null); // Ref to store the ESC key listener function
  const [showExplanation, setShowExplanation] = useState(false);

  // Helper functions that don't depend on state/props, or whose dependencies are stable
  const getElementContext = (element) => {
    const parent = element.closest('[class*="property"], [class*="card"], [class*="result"]');
    if (parent) {
      return parent.textContent?.substring(0, 200) || '';
    }
    return '';
  };

  const generateElementResponse = (selectedText, element) => {
    const text = selectedText.toLowerCase();

    if (text.includes('חדר') || /\d+\s*חדרים?/.test(text)) {
      return `**מעולה! בחרת לדבר על "${selectedText}"**

מספר החדרים הוא אחד הגורמים הקריטיים ביותר בבחירת נכס. הנה מה שחשוב לדעת:

📏 **גודל ופריסה:**
• חדרים רגילים: בין 12-16 מ״ר
• חדר הורים: 16-20 מ״ר לפחות
• חדרי ילדים: 10-14 מ״ר

🏠 **שאלות שכדאי לשאול:**
• מה הפריסה של החדרים?
• האם יש חדרים עם גישה למרפסת?
• מהו גודל החדר הקטן ביותר?

💡 **טיפ מקצועי:** תמיד בדוק את התוכנית - לפעמים "5 חדרים" כוללים מחסן קטן או מרפסת סגורה.

איזה היבט ספציפי מעניין אותך לגבי החדרים בנכס הזה?`;
    }

    if (text.includes('₪') || text.includes('מיליון') || text.includes('אלף')) {
      return `**נבחר המחיר: "${selectedText}"**

💰 **ניתוח מחיר:**
המחיר הזה נראה ${text.includes('מיליון') ? 'משמעותי' : 'סביר'}. הנה מה שחשוב לבחון:

📊 **השוואת מחירים:**
• מחיר למ״ר באזור
• מגמות מחירים ברבעון האחרון  
• השוואה לנכסים דומים

🏦 **אפשרויות מימון:**
• משכנתא - עד 75% מהערך
• הון עצמי נדרש
• עלויות נוספות (עו״ד, מס רכישה)

📈 **פוטנציאל השקעה:**
• פוטנציאל עלייה באזור
• תשואה משכירות
• נזילות הנכס

האם תרצה שאעזור לך לנתח את ההיגיון הכלכלי של המחיר הזה?`;
    }

    if (text.includes('מ״ר') || text.includes('מטר')) {
      return `**נבחר הגודל: "${selectedText}"**

📏 **ניתוח שטח:**
הגודל הזה ${parseInt(text) > 100 ? 'מרווח' : parseInt(text) < 70 ? 'קומפקטי' : 'סטנדרטי'} לסוג הנכס.

🏠 **פירוט שטחים:**
• שטח נטו vs שטח ברוטו
• שטח מרפסות (לא נכלל בדרך כלל)
• שטחי אחסון ועזר

💡 **מה לבדוק:**
• האם השטח מנוצל יעיל?
• איך מתפלג השטח בין החדרים?
• האם יש אפשרות להרחבה?

📐 **יחס מחיר לשטח:**
חישוב מחיר למ״ר יעזור להבין אם המחיר הוגן.

תרצה שאעזור לך לנתח את הפריסה והניצול של השטח?`;
    }

    if (text.includes('קומה') || /\d+/.test(text)) {
      return `**נבחרה הקומה: "${selectedText}"**

🏢 **ניתוח מיקום הקומה:**

⬆️ **יתרונות קומה גבוהה:**
• נוף טוב יותר
• פחות רעש מהרחוב
• יותר פרטיות וביטחון

⬇️ **יתרונות קומה נמוכה:**
• נגישות טובה יותר
• חסכון בחשמל (מעלית)
• יציאה מהירה בחירום

🔍 **מה לבדוק:**
• האם יש מעלית פעילה?
• מצב חדר המדרגות
• רמת הרעש מהרחוב

איזה שיקולים הכי חשובים לך בבחירת הקומה?`;
    }

    return `**נבחר: "${selectedText}"**

🔍 **ניתוח האלמנט שבחרת:**

נראה שבחרת באלמנט מעניין! זה יכול להיות חלק חשוב מהמידע על הנכס.

💭 **כמה שאלות שיכולות לעזור:**
• מה ההקשר של המידע הזה בתוך הנכס?
• איך זה משפיע על ההחלטה שלך?
• האם יש פרטים נוספים שתרצה לדעת?

📋 **אני כאן לעזור לך:**
• לנתח כל פרט בנכס
• להסביר חשיבות של מאפיינים שונים
• לתת המלצות מותאמות אישית

איך אני יכול לעזור לך להבין טוב יותר את "${selectedText}"?`;
  };

  // Memoized callback for final message
  const addFinalMessage = useCallback((history) => {
    history.push({
      type: "bot",
      message: `מעולה! סיימנו את השאלות. מצאתי ${filteredCount || 0} נכסים שמתאימים להעדפות שלך 🎉 תוכל לראות אותם בצד שמאל${isMobile ? ' או בחלק התחתון של המסך' : ''}.`,
      isFinal: true
    });
  }, [filteredCount, isMobile]);

  // Memoized callback for handling element clicks in selection mode
  const handleElementClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    const element = e.target;
    const text = element.textContent?.trim();

    if (text && text.length > 0 && element.classList.contains('selectable-element')) {
      setSelectedElement({
        text: text,
        tagName: element.tagName,
        className: element.className,
        context: getElementContext(element)
      });

      setIsSelectionMode(false);
      setViewMode('open_chat');

      const selectionMessage = {
        type: "user",
        message: `[בחרתי את האלמנט: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"]`
      };

      setChatHistory((prev) => [...prev, selectionMessage]);

      setTimeout(() => {
        setIsBotTyping(true);
        setTimeout(() => {
          const botResponse = {
            type: "bot",
            message: generateElementResponse(text, element),
            isMarkdown: true
          };
          setChatHistory((prev) => [...prev, botResponse]);
          setIsBotTyping(false);
        }, 1500);
      }, 500);
    }
  }, []); // Removed setIsSelectionMode and getElementContext as they are stable

  // Memoized callback to enable selection mode
  const enableSelectionMode = useCallback(() => {
    // Find the property results area
    const propertyResultsArea = document.querySelector('[data-property-results]');
    if (!propertyResultsArea) return;

    propertyResultsArea.style.cursor = 'crosshair';
    propertyResultsArea.addEventListener('click', handleElementClick, true);

    // Create overlay only on property results area
    const overlay = document.createElement('div');
    overlay.id = 'selection-overlay';
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(59, 130, 246, 0.1);
      pointer-events: none;
      z-index: 9998;
      border: 2px dashed #3b82f6;
      border-radius: 8px;
    `;
    // Directly set position relative as per outline, assuming it's safe.
    propertyResultsArea.style.position = 'relative';
    propertyResultsArea.appendChild(overlay);

    // Add exit instructions positioned relative to property area
    const exitInstructions = document.createElement('div');
    exitInstructions.id = 'selection-instructions';
    exitInstructions.style.cssText = `
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #3b82f6;
      color: white;
      padding: 12px 24px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 500;
      z-index: 10001;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      white-space: nowrap;
    `;
    exitInstructions.innerHTML = '🎯 לחץ על אלמנט לבחירה • ESC לביטול'; // Added from outline
    propertyResultsArea.appendChild(exitInstructions);

    const style = document.createElement('style');
    style.id = 'selection-styles';
    style.textContent = `
      [data-property-results] * {
        cursor: crosshair !important;
      }
      [data-property-results] .selectable-element:hover {
        outline: 3px solid #3b82f6 !important;
        background-color: rgba(59, 130, 246, 0.15) !important;
        border-radius: 4px !important;
        position: relative !important;
        z-index: 9999 !important;
      }
      [data-property-results] .selectable-element:hover::after {
        content: '🎯 לחץ כדי לבחור';
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-55%);
        background: #3b82f6;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 10000;
      }
    `;
    document.head.appendChild(style);

    // Only add selectable class to elements within property results
    propertyResultsArea.querySelectorAll('*').forEach((el) => {
      const text = el.textContent?.trim();
      const hasChildren = el.children.length === 0 || el.matches('span, strong, em, b, i');
      if (text && text.length > 2 && text.length < 200 && hasChildren) {
        el.classList.add('selectable-element');
      }
    });

    // Add ESC key listener
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        setIsSelectionMode(false);
      }
    };
    document.addEventListener('keydown', handleEscKey);
    escListenerRef.current = handleEscKey; // Store the listener function for cleanup
  }, [handleElementClick, setIsSelectionMode]);

  // Memoized callback to disable selection mode
  const disableSelectionMode = useCallback(() => {
    const propertyResultsArea = document.querySelector('[data-property-results]');
    
    if (propertyResultsArea) {
      propertyResultsArea.style.cursor = ''; // Reset cursor
      // As per outline, assuming position should not be restored explicitly here.
      // propertyResultsArea.style.position = ''; // Original had logic to restore
      propertyResultsArea.removeEventListener('click', handleElementClick, true);
    }
    
    const overlay = document.getElementById('selection-overlay');
    if (overlay) overlay.remove();

    const instructions = document.getElementById('selection-instructions');
    if (instructions) instructions.remove();

    const styles = document.getElementById('selection-styles');
    if (styles) styles.remove();

    // Remove selectable class from elements only within the property results area
    // The outline removed the conditional check for propertyResultsArea.
    // Re-adding the check for safety to prevent errors if area is null.
    if (propertyResultsArea) {
      propertyResultsArea.querySelectorAll('.selectable-element').forEach((el) => {
        el.classList.remove('selectable-element');
      });
    } else {
      // If propertyResultsArea is null, still try to remove global selectable elements
      document.querySelectorAll('.selectable-element').forEach((el) => {
        el.classList.remove('selectable-element');
      });
    }

    // Remove ESC key listener
    // Incorporating the outline's data-esc-listener check, but using escListenerRef for correct removal.
    if (escListenerRef.current) {
      document.removeEventListener('keydown', escListenerRef.current);
      escListenerRef.current = null; // Clear the ref
    }
  }, [handleElementClick]);

  // Enhanced function to analyze free text using InvokeLLM
  const analyzeUserInput = async (userInput) => {
    try {
      const prompt = `
אתה יועץ נדל"ן מנוסה. נתח את הטקסט הבא שכתב משתמש וחלץ מידע רלוונטי לחיפוש נכסים.

הטקסט של המשתמש: "${userInput}"

חלץ את המידע הבא אם קיים (אם המידע לא קיים, השאר ריק):
- סוג נכס (דירה/פנטהאוז/בית פרטי/דירת גן/סטודיו)
- מספר חדרים (מספר או טווח)
- מיקום/עיר
- תקציב (אם נמזכר)
- מאפיינים מיוחדים (חניה, מרפסת, מעלית, מחסן וכו')
- כוונת הרכישה (מגורים או השקעה)

אם הטקסט אינו רלוונטי לחיפוש נדל"ן או לא ברור, ציין זאת.

השב רק ב-JSON בפורמט הבא:
{
  "is_relevant": true/false,
  "property_type": "",
  "rooms": "",
  "location": "",
  "budget": "",
  "features": [],
  "purpose": "",
  "confidence_level": "high/medium/low",
  "suggested_response": "תגובה מוצעת למשתמש"
}
`;

      const response = await InvokeLLM({
        prompt: prompt,
        response_json_schema: {
          type: "object",
          properties: {
            is_relevant: { type: "boolean" },
            property_type: { type: "string" },
            rooms: { type: "string" },
            location: { type: "string" },
            budget: { type: "string" },
            features: { type: "array", items: { type: "string" } },
            purpose: { type: "string" },
            confidence_level: { type: "string" },
            suggested_response: { type: "string" }
          }
        }
      });

      return response;
    } catch (error) {
      console.error('Error analyzing user input:', error);
      return {
        is_relevant: false,
        confidence_level: "low",
        suggested_response: "אני לא בטוח שהבנתי. תוכל לתאר לי יותר מה אתה מחפש?"
      };
    }
  };

  // Function to apply filters from AI analysis
  const applyAIFilters = async (analysis) => {
    const filtersToApply = {};
    
    if (analysis.property_type) {
        filtersToApply['property_type'] = analysis.property_type;
    }
    if (analysis.rooms) {
        const roomsNumber = parseInt(analysis.rooms);
        if (!isNaN(roomsNumber)) {
            filtersToApply['rooms'] = roomsNumber;
        }
    }
    if (analysis.location) {
        filtersToApply['location'] = analysis.location;
    }
    if (analysis.budget) {
        const budgetNumber = parseInt(analysis.budget.replace(/[^\d]/g, ''));
        if (!isNaN(budgetNumber)) {
            filtersToApply['budget'] = budgetNumber;
        }
    }

    if (Object.keys(filtersToApply).length > 0) {
      // The answer is an object of { filter_field: answer_value }
      return await onUpdateAnswer('ai_analysis', filtersToApply);
    }
    
    return currentSession;
  };

  // Memoized callback to initialize chat history
  const initializeChatHistory = useCallback(() => {
    const history = [];
    const initialQuery = currentSession?.answers?.initial_query;
    const purpose = currentSession?.purpose;

    // Arena's opening message with icon
    const arenaOpeningMessage = {
      type: "arena_intro",
      message: "ארנה - יועצת הנדל״ן שלך",
      isMarkdown: false,
      showArenaIcon: true
    };
    history.push(arenaOpeningMessage);

    // Add context message if provided
    if (contextMessage) {
      history.push({
        type: "context",
        title: contextMessage.title,
        details: contextMessage.details,
        message: contextMessage.message,
        contextType: contextMessage.type
      });
    }

    let purposeText = "";
    if (purpose === 'living') {
      purposeText = "נכס למגורים";
    } else if (purpose === 'investment') {
      purposeText = "נכס להשקעה";
    }

    const greeting = initialQuery ?
    `קיבלתי! אני מחפש עבורך ${purposeText}: **"${initialQuery}"**. כדי שאדייק את החיפוש, תוכל לענות על מספר שאלות או להתחיל מסע מודרך.` :
    `שלום! אני יועץ הנדל״ן האישי שלך 🏡 אני כאן כדי לעזור לך למצוא ${purposeText} מושלם. בוא נתחיל?`;

    history.push({
      type: "bot",
      message: greeting,
      isMarkdown: true
    });

    // Show first question in chat mode
    // Modified: Ensure questions array exists and is not empty before filtering and pushing questions.
    // Also, ensure addFinalMessage is called if all questions are answered, irrespective of viewMode.
    if (questions && questions.length > 0) {
      const unansweredQuestions = questions.filter((q) => !currentSession?.answers?.[q.id]);

      if (unansweredQuestions.length > 0 && viewMode === 'chat') {
        const nextQuestion = unansweredQuestions[0];
        history.push({
          type: "bot",
          message: nextQuestion.question_text,
          question: nextQuestion
        });
        setActiveQuestionId(nextQuestion.id);
      } else if (unansweredQuestions.length === 0) {// If all questions are answered
        addFinalMessage(history);
      }
    }

    setChatHistory(history);
  }, [questions, currentSession, viewMode, addFinalMessage, contextMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isBotTyping, viewMode, visibleQuestions]);

  useEffect(() => {
    if (questions.length > 0 && currentSession) {
      initializeChatHistory();
    }
  }, [questions, currentSession, initializeChatHistory]);

  // Selection mode handlers
  useEffect(() => {
    if (isSelectionMode) {
      enableSelectionMode();
    } else {
      disableSelectionMode();
    }

    return () => disableSelectionMode();
  }, [isSelectionMode, enableSelectionMode, disableSelectionMode]);

  const formatAnswer = (question, answer) => {
    if (Array.isArray(answer)) return answer.join(", ");
    if (question?.question_type === "range" && typeof answer === 'number') return `${answer.toLocaleString()} ₪`;
    return answer ? answer.toString() : '';
  };

  const handleSubmitAnswer = (question, answer) => {
    if (!question) return;

    const userMessage = { type: "user", message: formatAnswer(question, answer) };
    setChatHistory((prev) => [...prev, userMessage]);

    setIsBotTyping(true);
    setActiveQuestionId(null);

    onUpdateAnswer(question, answer).then((updatedSession) => {
      const nextUnansweredQuestion = questions.find((q) => !updatedSession?.answers?.[q.id]);

      const newHistory = [];
      if (nextUnansweredQuestion && viewMode === 'chat') {
        newHistory.push({
          type: "bot",
          message: nextUnansweredQuestion.question_text,
          question: nextUnansweredQuestion
        });
        setActiveQuestionId(nextUnansweredQuestion.id);
      } else {
        addFinalMessage(newHistory);
      }

      setTimeout(() => {
        setChatHistory((prev) => [...prev, ...newHistory]);
        setIsBotTyping(false);
      }, 800);
    });

    setInputValue("");
  };

  const handleGuidedAnswer = (questionId, answer) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return;

    onUpdateAnswer(question, answer).then((updatedSession) => {
      if (question) {
        const userMessage = { type: "user", message: formatAnswer(question, answer) };
        setChatHistory((prev) => [...prev, userMessage]);

        const answeredCount = Object.keys(updatedSession?.answers || {}).filter((k) => k !== 'initial_query').length;
        const botProgressMessage = {
          type: "bot",
          message: `תודה! השלמת ${answeredCount} מתוך ${questions.length} שאלות. ממשיך לעדכן את התוצאות...`,
          isMarkdown: false
        };
        setChatHistory((prev) => [...prev, botProgressMessage]);

        // Show next question card after a short delay
        if (visibleQuestions <= answeredCount && answeredCount < questions.length) {
          setTimeout(() => {
            setVisibleQuestions((prev) => prev + 1);
          }, 500);
        }
      }
    });
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    const currentQuestion = questions.find((q) => q.id === activeQuestionId);
    if (inputValue.trim() && currentQuestion) {
      if (currentQuestion.question_type === 'open' || currentQuestion.question_type === 'range') {
        let processedAnswer = inputValue.trim();
        // Remove commas before parsing for number questions
        if (currentQuestion.question_type === "range") {
          const numericValue = parseInt(processedAnswer.replace(/[^\d]/g, ''), 10);
          if (!isNaN(numericValue)) processedAnswer = numericValue;
        }
        handleSubmitAnswer(currentQuestion, processedAnswer);
      }
    }
  };

  const startGuidedJourney = () => {
    setViewMode('guided');
    setActiveQuestionId(null);
    const answeredCount = Object.keys(currentSession?.answers || {}).filter((k) => k !== 'initial_query').length;
    setVisibleQuestions(answeredCount + 1);


    const guidedMessage = {
      type: "bot",
      message: "מעולה! אני אציג לך את השאלות בהדרגה. ענה על כל שאלה בקצב שלך, ואני אציג את הבאה. תוכל גם לעבור לשיחה פתוחה בכל עת:",
      showAllQuestions: true
    };

    setChatHistory((prev) => [...prev, guidedMessage]);
  };

  const startOpenChat = () => {
    setViewMode('open_chat');
    setActiveQuestionId(null);

    const hasGuidedQuestions = chatHistory.some((msg) => msg.showAllQuestions);

    if (!hasGuidedQuestions) {
      const openChatMessage = {
        type: "bot",
        message: "עכשיו אני במצב שיחה פתוחה! אתה יכול לשאול אותי הכל על הנכסים שמצאנו, לקבל עצות על בחירה, או לדבר על כל נושא הקשור לנדל״ן. מה תרצה לדעת? 🤔",
        isMarkdown: false
      };

      setChatHistory((prev) => [...prev, openChatMessage]);
    }
  };

  const toggleSelectionMode = () => {
    if (!isSelectionMode) {
      setViewMode('open_chat');
    }
    setIsSelectionMode(!isSelectionMode);
  };

  const analyzeProperty = useCallback(async (property) => {
    // Switch to open chat mode
    setViewMode('open_chat');

    // Add user message about wanting to know more about this property
    const userMessage = {
      type: "user",
      message: `למה הנכס "${property.title}" מתאים לי?`
    };
    setChatHistory((prev) => [...prev, userMessage]);

    setIsBotTyping(true);
    
    try {
      // Build context from session answers
      const answeredQuestions = Object.keys(currentSession?.answers || {}).filter(k => k !== 'initial_query');
      const hasProfile = answeredQuestions.length > 0;
      
      let contextInfo = '';
      if (hasProfile) {
        contextInfo = `המשתמש ענה על ${answeredQuestions.length} שאלות. תשובות: ${JSON.stringify(currentSession.answers)}`;
      } else {
        contextInfo = 'המשתמש עדיין לא ענה על שאלות, תן הסבר כללי.';
      }

      const prompt = `
אתה ארנה, יועצת נדל"ן חכמה. משתמש שואל למה נכס מסוים מתאים לו.

הקשר על המשתמש: ${contextInfo}

פרטי הנכס:
- כותרת: ${property.title}
- מחיר: ${property.price?.toLocaleString()} ₪
- מיקום: ${property.location || property.city || 'לא צוין'}
- חדרים: ${property.rooms}
- גודל: ${property.size || 'לא צוין'} מ"ר
- קומה: ${property.floor !== undefined ? property.floor : 'לא צוין'}
${property.parking ? '- יש חניה' : ''}
${property.elevator ? '- יש מעלית' : ''}
${property.balcony ? '- יש מרפסת' : ''}
${property.storage ? '- יש מחסן' : ''}

${hasProfile ? `
נתח למה הנכס הזה מתאים או לא מתאים למשתמש בהתבסס על התשובות שלו.
אם הנכס מתאים - הסבר למה. אם לא - הסבר בעדינות מה חסר או לא מתאים.
` : `
המשתמש עדיין לא בנה פרופיל מפורט. תן הסבר כללי על הנכס ועל היתרונות שלו.
הוסף: "על סמך מה שאני יודעת כרגע, זה מה שאני יכולה לומר על הנכס הזה. ככל שנמשיך לדבר – אוכל לדייק יותר למה כן או לא."
`}

השב בצורה חברותית, אישית ומועילה. השתמש באימוג'י בצורה מתונה.
`;

      const response = await InvokeLLM({
        prompt: prompt
      });

      const botResponse = {
        type: "bot",
        message: response || "מצטערת, לא הצלחתי לנתח את הנכס כרגע. נסה שוב.",
        isMarkdown: true
      };

      setChatHistory((prev) => [...prev, botResponse]);
      setIsBotTyping(false);
      
      // Notify parent that analysis is done
      if (onPropertyAnalyzed) {
        onPropertyAnalyzed();
      }
    } catch (error) {
      console.error('Error analyzing property:', error);
      const errorResponse = {
        type: "bot",
        message: "מצטערת, קרתה שגיאה בניתוח הנכס. תוכל לנסות שוב או לשאול אותי משהו אחר.",
        isMarkdown: false
      };
      setChatHistory((prev) => [...prev, errorResponse]);
      setIsBotTyping(false);
    }
  }, [currentSession, onPropertyAnalyzed]);

  // Handle property analysis
  useEffect(() => {
    if (propertyToAnalyze) {
      analyzeProperty(propertyToAnalyze);
    }
  }, [propertyToAnalyze, analyzeProperty]);

  const handleInputChangeWithFormatting = (e) => {
    const value = e.target.value;
    
    const reprocessedValue = value.split(' ').map(word => {
        const numericWord = word.replace(/,/g, ''); // Remove existing commas for parsing
        // Check if it's a valid number and not just '0' or empty after removal
        if (numericWord !== '' && !isNaN(numericWord) && !isNaN(parseFloat(numericWord))) {
             // Exclude formatting for potential years (4 digits starting with 19 or 20)
            if (numericWord.length === 4 && (numericWord.startsWith('19') || numericWord.startsWith('20'))) {
                return numericWord;
            }
            // Exclude formatting for potential phone numbers (starts with 0 and > 8 digits)
            if (numericWord.startsWith('0') && numericWord.length > 8) {
                return numericWord;
            }
            // Only format numbers longer than 3 digits (e.g., 1,000, 10,000)
            if(numericWord.length > 3) {
              return parseInt(numericWord, 10).toLocaleString('en-US');
            }
        }
        return word; // return original word if not a formattable number or excluded
    }).join(' ');

    setInputValue(reprocessedValue);
  };

  const handleOpenChatSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Remove commas from inputValue before sending to AI or processing as user message
    const userMessageRaw = inputValue.trim().replace(/,/g, '');
    const chatMessage = { type: "user", message: inputValue.trim() }; // Keep formatted value for display
    setChatHistory((prev) => [...prev, chatMessage]);

    setIsBotTyping(true);
    setInputValue("");

    try {
      // Analyze user input with AI
      const analysis = await analyzeUserInput(userMessageRaw);
      
      setTimeout(async () => {
        let botResponse = "";
        
        if (analysis.is_relevant && analysis.confidence_level !== "low") {
          // Apply filters based on AI analysis
          await applyAIFilters(analysis);
          
          // Create smart response
          const extractedInfo = [];
          if (analysis.property_type) extractedInfo.push(`סוג נכס: ${analysis.property_type}`);
          if (analysis.rooms) extractedInfo.push(`חדרים: ${analysis.rooms}`);
          if (analysis.location) extractedInfo.push(`מיקום: ${analysis.location}`);
          if (analysis.budget) extractedInfo.push(`תקציב: ${analysis.budget}`);
          
          if (extractedInfo.length > 0) {
            botResponse = `מעולה! הבנתי שאתה מחפש:\n${extractedInfo.join('\n')}\n\nאני מתאימה עבורך נכסים כרגע. כדי לדייק עוד יותר, תוכל לענות על השאלות הבאות:`;
            
            // Switch to guided mode to show questions
            setViewMode('guided');
            setVisibleQuestions(1);
          } else {
            botResponse = analysis.suggested_response || "אני מבין את הכיוון. בוא נדייק יותר עם מספר שאלות קצרות:";
          }
        } else if (userMessageRaw.toLowerCase().includes('גדגדג') || userMessageRaw.length < 4) { // Use raw input for logic
          // Special handling for nonsense or very short inputs
          botResponse = "אני לא בטוחה שהבנתי את זה... 🤔 תוכל לתאר לי יותר מה אתה מחפש? למשל: 'אני רוצה דירת 3 חדרים בתל אביב' או 'מחפש נכס להשקעה עד 2 מיליון'";
        } else {
          // For other irrelevant or unclear input
          botResponse = analysis.suggested_response || "אני לא בטוח שהבנתי מה אתה מחפש. תוכל לתאר לי יותר את הנכס שאתה מדמיין?";
        }

        const response = {
          type: "bot",
          message: botResponse,
          isMarkdown: true,
          showAllQuestions: analysis.is_relevant && analysis.confidence_level !== "low"
        };
        
        setChatHistory((prev) => [...prev, response]);
        setIsBotTyping(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error in handleOpenChatSubmit:', error);
      setTimeout(() => {
        const response = {
          type: "bot",
          message: "אני מצטער, קרתה שגיאה. תוכל לנסות שוב או לעבור למסע המודרך?",
          isMarkdown: false
        };
        setChatHistory((prev) => [...prev, response]);
        setIsBotTyping(false);
      }, 1000);
    }
  };

  const currentQuestion = questions.find((q) => q.id === activeQuestionId);
  const isTextInputActive = viewMode === 'chat' && currentQuestion && (currentQuestion.question_type === 'open' || currentQuestion.question_type === 'range');
  const isOpenChatActive = viewMode === 'open_chat' || viewMode === 'guided';

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-4 py-5 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c276074aac6e6711db72a6/fefa17145_logoarena3d.png"
                alt="Arena AI"
                className="w-10 h-10 object-contain" />

              </div>
              <div>
                <h2 className="text-slate-900 text-base font-bold">אני ארנה, יועצת הנדל״ן החכמה שלך</h2>
              </div>
            </div>
        </div>
      </div>
      
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
            {chatHistory.map((msg, index) =>
        <div key={index}>
                {msg.type === "arena_intro" ?
          null :
                msg.type === "context" ?
                  <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 text-sm">
                    <div className="text-sky-700 font-semibold mb-1">{msg.title}</div>
                    <div className="text-slate-600 text-xs mb-2">{msg.details}</div>
                    <div className="text-sky-600 text-xs">{msg.message}</div>
                  </div> :

          <ChatBubble
            message={msg}
            isActiveQuestion={msg.question?.id === activeQuestionId && !msg.question.answered && viewMode === 'chat'}
            onSubmitAnswer={handleSubmitAnswer} />

          }
                
                {msg.showAllQuestions && viewMode === 'guided' &&
          <div className="mt-6 space-y-6">
                    <AnimatePresence>
                      {questions.slice(0, visibleQuestions).map((question, questionIndex) =>
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: questionIndex * 0.1 }}>

                          <QuestionCard
                  question={question}
                  currentAnswer={currentSession?.answers?.[question.id]}
                  onAnswer={(answer) => handleGuidedAnswer(question.id, answer)}
                  questionIndex={questionIndex}
                  totalQuestions={questions.length}
                  isVisible={true} />

                        </motion.div>
              )}
                    </AnimatePresence>
                    
                    {visibleQuestions < questions.length &&
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center">

                        <Button
                onClick={() => setVisibleQuestions((prev) => Math.min(prev + 2, questions.length))}
                variant="outline"
                className="bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-700">

                          הצג עוד שאלות ({questions.length - visibleQuestions} נותרו)
                        </Button>
                      </motion.div>
            }
                  </div>
          }
              </div>
        )}
          
          {isBotTyping &&
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl bg-slate-100 text-slate-800 rounded-bl-lg">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </motion.div>
        }

          <div ref={messagesEndRef} />
        </div>

      <div className="p-4 border-t border-slate-200 bg-white flex-shrink-0">
        <div className="bg-slate-50 rounded-xl p-3">
          <form onSubmit={isOpenChatActive ? handleOpenChatSubmit : handleTextSubmit} className="relative">
            <Textarea
              value={inputValue}
              onChange={handleInputChangeWithFormatting}
              placeholder={
              selectedElement ?
              `שאל על "${selectedElement.text.substring(0, 30)}..."` :
              isOpenChatActive ?
              "שאל אותי הכל על הנכסים או על נדל״ן..." :
              isTextInputActive ?
              "הקלד תשובה..." :
              "בחר אפשרות או עבור למסע מודרך"
              }
              className="w-full p-3 pr-12 text-base rounded-lg border-slate-200 focus-visible:ring-1 focus-visible:ring-sky-400 resize-none bg-white text-right"
              rows={2}
              dir="rtl"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (isOpenChatActive) {
                    handleOpenChatSubmit(e);
                  } else {
                    handleTextSubmit(e);
                  }
                }
              }}
              disabled={!isTextInputActive && !isOpenChatActive} />

            <Button
              type="submit"
              size="icon"
              className="absolute left-3 top-3 bg-sky-500 hover:bg-sky-600 rounded-md"
              disabled={!inputValue.trim() || !isTextInputActive && !isOpenChatActive}>

              <Send className="w-4 h-4" />
            </Button>
          </form>
          
          <div className="relative flex items-center justify-between gap-1 mt-3 pt-2 border-t border-slate-200">
            {showExplanation && (
              <ChatButtonsExplanation onClose={() => setShowExplanation(false)} isMobile={isMobile} />
            )}
            
            <div className="flex items-center gap-1 flex-1 justify-around">
              <Button
                variant={viewMode === 'guided' ? 'default' : 'ghost'}
                onClick={startGuidedJourney}
                className={`h-8 px-2 text-xs ${viewMode === 'guided' ? "bg-sky-500 hover:bg-sky-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>

                <Compass className="w-3.5 h-3.5 ml-1" />
                מסע מודרך
              </Button>
              
              <Button
                variant={viewMode === 'open_chat' ? 'default' : 'ghost'}
                onClick={startOpenChat}
                className={`h-8 px-2 text-xs ${viewMode === 'open_chat' ? "bg-sky-500 hover:bg-sky-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>

                <MessageSquareMore className="w-3.5 h-3.5 ml-1" />
                שיחה פתוחה
              </Button>
              
              <Button
                variant={isSelectionMode ? 'default' : 'ghost'}
                onClick={toggleSelectionMode}
                className={`h-8 px-2 text-xs ${isSelectionMode ? "bg-sky-500 hover:bg-sky-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>

                <MousePointer2 className="w-3.5 h-3.5 ml-1" />
                {isSelectionMode ? 'ביטול' : 'בחר'}
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowExplanation(!showExplanation)}
              className="w-8 h-8 text-slate-500 hover:bg-slate-100 flex-shrink-0"
              title="מה הכפתורים עושים?"
            >
              <HelpCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>);

}