import React, { useState, useEffect } from 'react';
import { agentSDK } from "@/agents";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, Bot } from 'lucide-react';
import { UploadFile } from "@/integrations/Core";

export default function ArenaAgentChat({ agentName = "arena_property_advisor" }) {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  useEffect(() => {
    initializeConversation();
  }, []);

  const initializeConversation = async () => {
    try {
      const newConversation = await agentSDK.createConversation({
        agent_name: agentName,
        metadata: {
          name: "שיחה עם ארנה - יועצת הנדל״ן",
          description: "שיחה אישית לחיפוש נכס מושלם"
        }
      });
      
      setConversation(newConversation);
      
      // Subscribe to conversation updates
      const unsubscribe = agentSDK.subscribeToConversation(newConversation.id, (data) => {
        setMessages(data.messages);
      });

      // Add welcome message
      await agentSDK.addMessage(newConversation, {
        role: "user",
        content: "שלום ארנה, אני מחפש נכס חדש. אשמח לעזרה אישית"
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error initializing conversation:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !conversation) return;
    
    setIsLoading(true);
    try {
      await agentSDK.addMessage(conversation, {
        role: "user",
        content: inputMessage
      });
      setInputMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setIsLoading(false);
  };

  const handleFileUpload = async (file) => {
    setUploadingFile(true);
    try {
      const { file_url } = await UploadFile({ file });
      await agentSDK.addMessage(conversation, {
        role: "user", 
        content: "העליתי קובץ עם פרטים נוספים על הצרכים שלי:",
        file_urls: [file_url]
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setUploadingFile(false);
  };

  return (
    <div className="h-full flex flex-col bg-white border rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-[#5F3A93] to-[#A6D6F2] text-white">
        <div className="flex items-center gap-3">
          <Bot className="w-8 h-8" />
          <div>
            <h3 className="font-bold">ארנה - יועצת הנדל״ן החכמה</h3>
            <p className="text-sm opacity-90">זמינה 24/7 לייעוץ אישי ומותאם</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              message.role === 'user' 
                ? 'bg-[#5F3A93] text-white'
                : 'bg-[#A6D6F2] text-slate-800'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              
              {/* Tool calls display */}
              {message.tool_calls && message.tool_calls.map((toolCall, idx) => (
                <div key={idx} className="mt-2 p-2 bg-black/10 rounded text-xs">
                  <strong>🔧 {toolCall.name}:</strong> {toolCall.status}
                  {toolCall.results && <pre className="mt-1 text-xs">{toolCall.results}</pre>}
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#A6D6F2] text-slate-800 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex gap-2">
          <div className="flex-1">
            <Textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="שאל אותי הכל על נדל״ן..."
              className="min-h-[60px] resize-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-[#5F3A93] hover:bg-[#4a2e75]"
            >
              <Send className="w-4 h-4" />
            </Button>
            <input
              type="file"
              onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
              className="hidden"
              id="file-upload"
              accept="image/*,.pdf,.doc,.docx"
            />
            <Button
              onClick={() => document.getElementById('file-upload').click()}
              variant="outline"
              disabled={uploadingFile}
              className="text-xs px-2"
            >
              📎
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}