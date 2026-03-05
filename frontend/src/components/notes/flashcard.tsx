'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Check, X, Lightbulb, Brain, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlashcardProps {
  id: string;
  front: string;
  back: string;
  topicTitle?: string;
  deckName?: string;
  onReview?: (id: string, quality: number) => void;
}

export default function Flashcard({
  id,
  front,
  back,
  topicTitle,
  deckName,
  onReview,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowAnswer(true);
  };

  const handleReview = (quality: number) => {
    onReview?.(id, quality);
    setIsFlipped(false);
    setShowAnswer(false);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key={isFlipped ? 'back' : 'front'}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleFlip}
          className={cn(
            'relative w-full min-h-[320px] cursor-pointer preserve-3d',
            isFlipped && 'rotate-y-180'
          )}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div
            className={cn(
              'absolute inset-0 w-full h-full backface-hidden rounded-3xl p-6 flex flex-col',
              'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700',
              'hover:border-cyan-500 dark:hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300'
            )}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {deckName || 'Flashcard'}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(true);
                }}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xl font-semibold text-center text-slate-900 dark:text-white">
                {front}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                {topicTitle && (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {topicTitle}
                  </span>
                )}
                <span className="text-xs text-slate-400 dark:text-slate-500 ml-auto">
                  Click to flip
                </span>
              </div>
            </div>
          </div>

          {/* Back */}
          <div
            className={cn(
              'absolute inset-0 w-full h-full backface-hidden rounded-3xl p-6 flex flex-col',
              'bg-gradient-to-br from-cyan-500 to-purple-600 text-white',
              'rotate-y-180'
            )}
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-medium text-white/80">Answer</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center overflow-y-auto">
              <p className="text-lg text-center text-white leading-relaxed">
                {back}
              </p>
            </div>

            {/* Rating Buttons */}
            {showAnswer && (
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-xs text-white/60 text-center mb-3">How well did you know this?</p>
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReview(1);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-white text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Again
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReview(3);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/40 text-white text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Hard
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReview(5);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-green-500/20 hover:bg-green-500/40 text-white text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <Check className="w-4 h-4" />
                    Easy
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

