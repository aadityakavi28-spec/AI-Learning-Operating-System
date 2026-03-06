'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, X, Copy, ThumbsUp, ThumbsDown, Minimize2, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { aiChatMessages } from '@/lib/mock-data';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AIChatSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AIChatSidebar({ isOpen = true, onClose }: AIChatSidebarProps) {
  const [messages, setMessages] = useState<Message[]>(aiChatMessages as Message[]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "That's a great question! Let me help you understand that concept better. Based on your current learning progress in this topic, I recommend focusing on the fundamentals first before moving to advanced applications.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        'flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300',
        isMinimized ? 'h-14' : 'h-full'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-cyan-50 to-purple-50 dark:from-slate-800 dark:to-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">AI Learning Assistant</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4 text-slate-500" />
            ) : (
              <Minimize2 className="w-4 h-4 text-slate-500" />
            )}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'flex gap-3',
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                )}
              >
                {/* Avatar */}
                <div className={cn(
                  'w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0',
                  message.role === 'assistant'
                    ? 'bg-gradient-to-br from-cyan-500 to-purple-600'
                    : 'bg-slate-200 dark:bg-slate-700'
                )}>
                  {message.role === 'assistant' ? (
                    <Bot className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                  )}
                </div>

                {/* Message Content */}
                <div className={cn(
                  'max-w-[80%] rounded-2xl px-4 py-3',
                  message.role === 'assistant'
                    ? 'bg-slate-100 dark:bg-slate-800'
                    : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                )}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                      <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                      <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                      <button className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <ThumbsDown className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything..."
                className="w-full pl-4 pr-12 py-3 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

