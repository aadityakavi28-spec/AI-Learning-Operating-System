'use client';

import { motion } from 'framer-motion';
import { Flame, Trophy, Calendar, Zap } from 'lucide-react';
import { streakData } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface StreakWidgetProps {
  compact?: boolean;
}

export default function StreakWidget({ compact = false }: StreakWidgetProps) {
  const { current, longest, weeklyGoal, thisWeek, studyDates } = streakData;

  // Generate week days
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const adjustedDay = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 overflow-hidden relative"
    >
      {/* Background Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-full blur-3xl" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Study Streak</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Keep it going!</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-orange-500">{current}</p>
            <p className="text-xs text-slate-500">days</p>
          </div>
        </div>

        {!compact && (
          <>
            {/* Week Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">This Week</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {thisWeek}/{weeklyGoal} days
                </span>
              </div>
              <div className="flex gap-2">
                {weekDays.map((day, index) => {
                  const isCompleted = index < thisWeek;
                  const isToday = index === adjustedDay;
                  const hasStudied = studyDates.includes(
                    new Date(Date.now() - (adjustedDay - index) * 86400000)
                      .toISOString()
                      .split('T')[0]
                  );

                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          'w-8 h-8 rounded-xl flex items-center justify-center text-xs font-medium transition-all',
                          isCompleted || hasStudied
                            ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg shadow-orange-500/20'
                            : isToday
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                            : 'bg-slate-100 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500'
                        )}
                      >
                        {isCompleted || hasStudied ? (
                          <Zap className="w-4 h-4" />
                        ) : (
                          day.charAt(0)
                        )}
                      </motion.div>
                      <span className="text-[10px] text-slate-500">{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{longest}</p>
                  <p className="text-xs text-slate-500">Best Streak</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{thisWeek}</p>
                  <p className="text-xs text-slate-500">This Week</p>
                </div>
              </div>
            </div>
          </>
        )}

        {compact && (
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Best: {longest} days</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

