"use client";
import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Types
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface SuggestedQuestion {
  text: string;
  action: () => void;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi there! I\'m SoftSell Assistant. How can I help you with software license reselling today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Listen for theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };
    
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Sample suggested questions
  const suggestedQuestions: SuggestedQuestion[] = [
    {
      text: 'How do I sell my software license?',
      action: () => handleSendMessage('How do I sell my software license?')
    },
    {
      text: 'What types of licenses can I sell?',
      action: () => handleSendMessage('What types of licenses can I sell?')
    },
    {
      text: 'How much is my license worth?',
      action: () => handleSendMessage('How much is my license worth?')
    },
    {
      text: 'Is selling my license legal?',
      action: () => handleSendMessage('Is selling my license legal?')
    }
  ];

  // Generate response using Gemini API
  const generateAIResponse = async (userMessage: string) => {
    try {
      // Initialize the Gemini API with your API key
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyAf61goeFziI7H9cMRqKFmzjT_YfRdyAQs');
      // Add this near the top of your generateAIResponse function
console.log("API Key available:", !!process.env.NEXT_PUBLIC_GEMINI_API_KEY);
      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Context for the AI about SoftSell's business
      const context = `
        You are a helpful customer service assistant for SoftSell, a company that helps businesses resell 
        their unused software licenses. SoftSell's process involves: 1) Uploading license details, 
        2) Receiving a valuation within 24 hours, and 3) Getting paid within 48 hours after accepting the offer. 
        SoftSell ensures all transactions are legally compliant and secure. 
        Be friendly, helpful, and concise in your responses. If you don't know something specific about 
        SoftSell's processes, suggest the user contact the team directly through the contact form.
      `;

      // Create a chat session
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: context }],
          },
          {
            role: "model",
            parts: [{ text: "I understand. I'll act as SoftSell's customer service assistant within these guidelines." }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 200,
        },
      });

      // Send the user's message to the model
      const result = await chat.sendMessage(userMessage);
      const response = result.response.text();
      
      return response;
    } catch (error) {
      console.error("Error generating AI response:", error);
      return "I'm sorry, I'm having trouble connecting right now. Please try again or contact our team through the contact form.";
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() && !inputValue.trim()) return;
    
    const userMessage = message || inputValue;
    
    // Add user message to chat
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Generate and add AI response
    try {
      const aiResponse = await generateAIResponse(userMessage);
      
      const newAIMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse
      };
      
      setMessages(prev => [...prev, newAIMessage]);
    } catch (error) {
      console.error("Error in chat:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, something went wrong. Please try again or reach out to our team through the contact form."
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-lg flex items-center justify-center ${
          theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-all duration-200`}
        aria-label="Chat with us"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`absolute bottom-16 right-0 w-80 sm:w-96 rounded-lg shadow-xl overflow-hidden flex flex-col ${
            theme === 'dark' ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'
          }`}
          style={{ height: '500px', maxHeight: 'calc(100vh - 100px)' }}
        >
          {/* Header */}
          <div className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-500 text-white'}`}>
            <h3 className="font-semibold">SoftSell Assistant</h3>
            <p className="text-sm opacity-90">Ask us anything about selling software licenses</p>
          </div>

          {/* Messages */}
          <div className={`flex-1 p-4 overflow-y-auto ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.role === 'user' ? 'flex justify-end' : 'flex justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? theme === 'dark' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-500 text-white'
                      : theme === 'dark'
                        ? 'bg-gray-800 text-gray-200'
                        : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800 border border-gray-200'
                }`}>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length <= 2 && (
            <div className={`p-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <p className={`text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                SUGGESTED QUESTIONS
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={question.action}
                    className={`text-xs py-1 px-2 rounded-full mb-1 ${
                      theme === 'dark' 
                        ? 'bg-gray-700 text-blue-300 hover:bg-gray-600' 
                        : 'bg-gray-200 text-blue-700 hover:bg-gray-300'
                    }`}
                  >
                    {question.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className={`p-3 border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200'}`}>
            <div className="flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className={`flex-1 py-2 px-3 rounded-l-lg focus:outline-none ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-white border-gray-600 focus:ring-1 focus:ring-blue-500' 
                    : 'bg-white text-gray-800 border border-gray-300'
                }`}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className={`py-2 px-4 rounded-r-lg ${
                  theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-700 disabled:text-gray-500'
                    : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300 disabled:text-gray-500'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}