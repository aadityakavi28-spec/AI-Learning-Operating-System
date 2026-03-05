'use client';

import { motion } from 'framer-motion';
import { Bot, User, Copy, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  isTyping?: boolean;
}

export default function AIMessage({ role, content, timestamp, isTyping }: AIMessageProps) {
  const isAssistant = role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex gap-3', isAssistant ? 'flex-row' : 'flex-row-reverse')}
    >
      {/* Avatar */}
      <div className={cn(
        'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg',
        isAssistant
          ? 'bg-gradient-to-br from-cyan-500 to-purple-600'
          : 'bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700'
      )}>
        {isAssistant ? (
          <Sparkles className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-slate-700 dark:text-slate-200" />
        )}
      </div>

      {/* Message Bubble */}
      <div className={cn(
        'max-w-[85%] rounded-2xl px-4 py-3 shadow-sm',
        isAssistant
          ? 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
          : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
      )}>
        {isTyping ? (
          <div className="flex gap-1 py-2">
            {[0, 150, 300].map((delay, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"
                style={{ animationDelay: `${delay}ms` }}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="text-sm whitespace-pre-wrap leading-relaxed">{content}</div>
            
            {/* Timestamp & Actions */}
            {isAssistant && (
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-400">
                  {timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" title="Copy">
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" title="Helpful">
                    <ThumbsUp className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" title="Not helpful">
                    <ThumbsDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

