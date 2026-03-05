'use client';

import { motion } from 'framer-motion';
import { Play, Clock, BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TopicCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  progress: number;
  completedResources: number;
  totalResources: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  estimatedTime: string;
  lastStudied?: string;
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const categoryColors: Record<string, string> = {
  'AI & Data Science': 'from-cyan-500 to-blue-500',
  'Web Development': 'from-purple-500 to-pink-500',
  'Programming': 'from-green-500 to-emerald-500',
  'Design': 'from-orange-500 to-red-500',
  'Computer Science': 'from-indigo-500 to-purple-500',
};

export default function TopicCard({
  id,
  title,
  description,
  thumbnail,
  progress,
  completedResources,
  totalResources,
  difficulty,
  category,
  estimatedTime,
  lastStudied,
}: TopicCardProps) {
  const gradientColor = categoryColors[category] || 'from-cyan-500 to-purple-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradientColor} flex items-center justify-center`}>
            <BookOpen className="w-16 h-16 text-white/50" />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700">
            {category}
          </span>
        </div>

        {/* Progress Badge */}
        <div className="absolute top-3 right-3">
          <span className={cn(
            'px-3 py-1 backdrop-blur-sm rounded-full text-xs font-medium',
            progress === 100 
              ? 'bg-green-500 text-white' 
              : 'bg-slate-900/70 text-white'
          )}>
            {progress === 100 ? (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Complete
              </span>
            ) : (
              `${progress}%`
            )}
          </span>
        </div>

        {/* Play Button */}
        <Link
          href={`/learn?topic=${id}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
            <Play className="w-7 h-7 text-slate-900 ml-1" />
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
          {description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            {estimatedTime}
          </div>
          <span className={cn(
            'px-2 py-0.5 rounded-full text-xs font-medium capitalize',
            difficultyColors[difficulty]
          )}>
            {difficulty}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span>Progress</span>
            <span className="font-medium">{completedResources}/{totalResources} resources</span>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={cn(
                'h-full rounded-full',
                progress === 100 
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                  : 'bg-gradient-to-r from-cyan-500 to-purple-500'
              )}
            />
          </div>
        </div>

        {/* Continue Button */}
        <Link
          href={`/learn?topic=${id}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 transition-all duration-200 group/btn"
        >
          {progress === 100 ? 'Review' : progress > 0 ? 'Continue' : 'Start Learning'}
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

