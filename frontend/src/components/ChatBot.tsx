import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageCircle, Lightbulb } from 'lucide-react';
import { ChatMessage } from '../types/course';

interface ChatBotProps {
  courses: any[];
}

const ChatBot: React.FC<ChatBotProps> = ({ courses }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI tutor. I can help you understand concepts from your courses, create study plans, or answer questions about the material. What would you like to learn about?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "Explain the key concepts from my latest course",
    "Create a study schedule for this week",
    "What are the most important topics to focus on?",
    "Help me understand a difficult concept"
  ];

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('study schedule') || lowerMessage.includes('study plan')) {
      return "I'd be happy to help you create a personalized study schedule! Based on your courses, I recommend:\n\n📅 **Weekly Study Plan:**\n• Monday-Wednesday: Review course notes (30 min/day)\n• Thursday: Practice quizzes (45 min)\n• Friday: Flashcard review (30 min)\n• Weekend: Deep dive into challenging topics (1 hour)\n\n💡 **Tips:**\n• Use spaced repetition for better retention\n• Take breaks every 25 minutes\n• Focus on one topic at a time\n\nWould you like me to adjust this based on specific topics you're struggling with?";
    }
    
    if (lowerMessage.includes('concept') || lowerMessage.includes('explain')) {
      return "I can help explain any concept from your courses! Here's my approach:\n\n🎯 **How I explain concepts:**\n• Break down complex ideas into simple parts\n• Provide real-world examples and analogies\n• Connect new concepts to what you already know\n• Offer different perspectives for better understanding\n\nCan you tell me which specific concept you'd like me to explain? I have access to all your course materials and can provide detailed explanations with examples.";
    }
    
    if (lowerMessage.includes('quiz') || lowerMessage.includes('test')) {
      return "Great! I can help you prepare for quizzes and tests. Here's what I can do:\n\n📝 **Quiz Preparation:**\n• Generate practice questions based on your course content\n• Identify knowledge gaps from your previous quiz results\n• Suggest areas that need more review\n• Provide test-taking strategies\n\n🎯 **Focus Areas:**\nBased on your course progress, I recommend focusing on topics where your quiz scores were below 80%. Would you like me to create a targeted practice session?";
    }
    
    if (lowerMessage.includes('difficult') || lowerMessage.includes('hard') || lowerMessage.includes('struggling')) {
      return "I understand that some topics can be challenging! Let's work through this together:\n\n🤝 **My approach for difficult concepts:**\n• Identify exactly what's confusing\n• Break it down into smaller, manageable pieces\n• Use analogies and visual explanations\n• Provide step-by-step examples\n• Connect to concepts you already understand\n\n💪 **Remember:**\n• It's normal to find some topics challenging\n• Understanding takes time and practice\n• Each small step builds your knowledge\n\nWhat specific concept or topic are you finding difficult? I'll provide a clear, step-by-step explanation.";
    }
    
    // Default responses
    const defaultResponses = [
      "That's an interesting question! Based on your course materials, I can provide detailed explanations and examples. Could you be more specific about what you'd like to learn?",
      "I'm here to help you understand your course content better. Whether it's explaining complex concepts, creating study plans, or preparing for quizzes, I can assist you with personalized guidance.",
      "Great question! I can help you dive deeper into any topic from your courses. I have access to all your course notes, quizzes, and flashcards to provide comprehensive explanations.",
      "I'd be happy to help! I can explain concepts using different approaches - analogies, examples, step-by-step breakdowns, or connecting to topics you already know. What specific area interests you?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: getAIResponse(inputMessage),
      timestamp: new Date()
    };
    
    setIsTyping(false);
    setMessages(prev => [...prev, aiResponse]);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <Bot className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Tutor Chat</h1>
          <p className="text-gray-600">Ask me anything about your courses and I'll help you learn better</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 h-[600px] flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-[70%] ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`flex-shrink-0 p-2 rounded-full ${
                    message.type === 'user' 
                      ? 'bg-blue-600' 
                      : 'bg-gradient-to-r from-purple-600 to-blue-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  
                  <div className={`p-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                  }`}>
                    <p className="whitespace-pre-line">{message.content}</p>
                    <p className={`text-xs mt-2 opacity-70 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 p-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center mb-3">
                <Lightbulb className="h-4 w-4 text-amber-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Suggested questions:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about your courses, study strategies, or any concept you'd like to understand better..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none"
                  rows={2}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;