'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Clock, Brain, Target, Flame, Award, Calendar } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import ProgressChart from '@/components/analytics/progress-chart';
import StudyTimeChart from '@/components/analytics/study-time-chart';
import ConceptMasteryChart from '@/components/analytics/concept-mastery-chart';
import { analyticsData } from '@/lib/mock-data';
import { formatDuration } from '@/lib/utils';

export default function AnalyticsPage() {
  const { totalStats, studyStreak } = analyticsData;

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
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      label: 'Current Streak',
      value: `${studyStreak.current} days`,
      icon: Flame,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
    },
    {
      label: 'Notes Created',
      value: totalStats.totalNotes,
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <Sidebar />
      
      <main className="pt-20 pb-8 pl-64 pr-4 lg:pr-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Track your learning progress and insights
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ProgressChart />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <StudyTimeChart />
            </motion.div>
          </div>

          {/* Concept Mastery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <ConceptMasteryChart />
          </motion.div>

          {/* Additional Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Focus Sessions */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Focus Sessions</h3>
                  <p className="text-xs text-slate-500">This week</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">19</div>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>+12% from last week</span>
              </div>
            </div>

            {/* Longest Streak */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Longest Streak</h3>
                  <p className="text-xs text-slate-500">All time</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{studyStreak.longest} days</div>
              <div className="text-sm text-slate-500">Achieved on Nov 15</div>
            </div>

            {/* Study Days */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Study Days</h3>
                  <p className="text-xs text-slate-500">Total active</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{studyStreak.totalDays}</div>
              <div className="text-sm text-slate-500">Keep it up!</div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

