'use client';

import { motion } from 'framer-motion';
import { Play, FileText, BookOpen, Clock, ExternalLink, Bookmark, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  id: string;
  type: 'video' | 'article' | 'tutorial' | 'course';
  title: string;
  description: string;
  thumbnail?: string;
  source: string;
  duration?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  progress?: number;
  onSave?: () => void;
}

const typeIcons = {
  video: Play,
  article: FileText,
  tutorial: BookOpen,
  course: BookOpen,
};

const difficultyColors = {
  beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  intermediate: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function ResourceCard({
  id,
  type,
  title,
  description,
  thumbnail,
  source,
  duration,
  difficulty,
  tags,
  progress,
  onSave,
}: ResourceCardProps) {
  const TypeIcon = typeIcons[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
            <TypeIcon className="w-12 h-12 text-slate-400" />
          </div>
        )}

        {/* Play Button Overlay */}
        {type === 'video' && (
          <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="w-6 h-6 text-slate-900 ml-1" />
            </div>
          </div>
        )}

        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-slate-900/80 backdrop-blur-sm rounded-md text-white text-xs font-medium">
            {duration} min
          </div>
        )}

        {/* Source Badge */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-slate-700 text-xs font-medium">
          {source}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className={cn(
            'px-2 py-0.5 rounded-full text-xs font-medium capitalize',
            difficultyColors[difficulty]
          )}>
            {difficulty}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.preventDefault();
                onSave?.();
              }}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Bookmark className="w-4 h-4 text-slate-500" />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <MoreVertical className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
          {description}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Progress Bar */}
        {progress !== undefined && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
              />
            </div>
          </div>
        )}

        {/* Link */}
        <Link
          href={`/learn?resource=${id}`}
          className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 transition-all duration-200"
        >
          {type === 'video' ? 'Watch Now' : type === 'article' ? 'Read Now' : 'Start Learning'}
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

