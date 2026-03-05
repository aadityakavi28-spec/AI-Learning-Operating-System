'use client';

import { motion } from 'framer-motion';
import { Target, BookOpen, Clock, Award, TrendingUp } from 'lucide-react';
import { analyticsData } from '@/lib/mock-data';
import { formatDuration } from '@/lib/utils';

interface ProgressWidgetProps {
  showDetailed?: boolean;
}

export default function ProgressWidget({ showDetailed = false }: ProgressWidgetProps) {
  const { totalStats } = analyticsData;

  const stats = [
    {
      label: 'Total Study Time',
      value: formatDuration(totalStats.totalStudyTime),
      icon: Clock,
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
    },
    {
      label: 'Resources Completed',
      value: totalStats.totalResources,
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      label: 'Notes Created',
      value: totalStats.totalNotes,
      icon: Award,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      label: 'Daily Average',
      value: `${totalStats.averageDailyStudyTime}m`,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white">Learning Progress</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Your overall statistics</p>
        </div>
      </div>

      <div className={showDetailed ? 'grid grid-cols-2 gap-4' : 'grid grid-cols-4 gap-3'}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`${showDetailed ? 'p-4' : 'p-3'} bg-slate-50 dark:bg-slate-700/50 rounded-xl`}
          >
            <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {showDetailed && (
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Weekly Goal</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">4/7 days</p>
            </div>
            <div className="w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '57%' }}
                className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

