'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Brain, 
  Shuffle, 
  RotateCcw,
  CheckCircle2,
  XCircle,
  Plus,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { flashcards } from '@/lib/mock-data';
import Flashcard from './flashcard';

interface FlashcardListProps {
  deckId?: string;
  onCreateNew?: () => void;
}

export default function FlashcardList({ deckId, onCreateNew }: FlashcardListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [showDeck, setShowDeck] = useState(false);

  const displayCards = isShuffled 
    ? [...flashcards].sort(() => Math.random() - 0.5)
    : flashcards;

  const currentCard = displayCards[currentIndex];
  const progress = ((currentIndex + 1) / displayCards.length) * 100;

  const handleNext = () => {
    if (currentIndex < displayCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleShuffle = () => {
    setIsShuffled(!isShuffled);
    setCurrentIndex(0);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Flashcards</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {displayCards.length} cards • {currentIndex + 1} of {displayCards.length}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className={cn(
              'p-2.5 rounded-xl transition-colors',
              isShuffled 
                ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            )}
            title={isShuffled ? 'Unshuffle' : 'Shuffle'}
          >
            <Shuffle className="w-5 h-5" />
          </button>
          <button
            onClick={handleRestart}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Restart"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          {onCreateNew && (
            <button
              onClick={onCreateNew}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Card
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
        />
      </div>

      {/* Card Carousel */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Flashcard
              id={currentCard.id}
              front={currentCard.front}
              back={currentCard.back}
              topicTitle={currentCard.topicTitle}
              deckName={currentCard.deckName}
              onReview={(id, quality) => {
                console.log('Reviewed card:', id, quality);
                if (currentIndex < displayCards.length - 1) {
                  setTimeout(() => handleNext(), 300);
                }
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <div className="flex items-center gap-1">
          {displayCards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all',
                idx === currentIndex 
                  ? 'bg-cyan-500 w-6' 
                  : idx < currentIndex 
                    ? 'bg-purple-500' 
                    : 'bg-slate-300 dark:bg-slate-600'
              )}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === displayCards.length - 1}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
          <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto mb-2" />
          <p className="text-lg font-bold text-slate-900 dark:text-white">{currentIndex}</p>
          <p className="text-xs text-slate-500">Mastered</p>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
          <RotateCcw className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
          <p className="text-lg font-bold text-slate-900 dark:text-white">{displayCards.length - currentIndex - 1}</p>
          <p className="text-xs text-slate-500">Remaining</p>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center">
          <Layers className="w-5 h-5 text-purple-500 mx-auto mb-2" />
          <p className="text-lg font-bold text-slate-900 dark:text-white">{displayCards.length}</p>
          <p className="text-xs text-slate-500">Total Cards</p>
        </div>
      </div>
    </div>
  );
}

