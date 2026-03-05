'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '@/components/layout/navbar';
import Sidebar from '@/components/layout/sidebar';
import TopicCard from '@/components/dashboard/topic-card';
import ProgressWidget from '@/components/dashboard/progress-widget';
import StreakWidget from '@/components/dashboard/streak-widget';
import { topics, recentActivity, analyticsData } from '@/lib/mock-data';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <Sidebar />
      
      <main className="pt-20 pb-8 pl-64 pr-4 lg:pr-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Welcome back, Alex! 👋
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  Ready to continue your learning journey? You're on a {analyticsData.studyStreak.current}-day streak!
                </p>
              </div>
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-cyan-500/30 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                Start Learning
              </Link>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">45m</p>
                  <p className="text-sm text-slate-500">Today's Study</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">3</p>
                  <p className="text-sm text-slate-500">Resources Today</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">75%</p>
                  <p className="text-sm text-slate-500">Weekly Goal</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>
                  <p className="text-sm text-slate-500">Day Streak</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Progress & Streak */}
            <div className="space-y-6">
              <StreakWidget />
              <ProgressWidget />
            </div>

            {/* Recent Topics */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Continue Learning
                  </h2>
                  <Link
                    href="/learn"
                    className="text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center gap-1"
                  >
                    View all
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {topics.slice(0, 4).map((topic) => (
                    <TopicCard
                      key={topic.id}
                      id={topic.id}
                      title={topic.title}
                      description={topic.description}
                      thumbnail={topic.thumbnail}
                      progress={topic.progress}
                      completedResources={topic.completedResources}
                      totalResources={topic.totalResources}
                      difficulty={topic.difficulty}
                      category={topic.category}
                      estimatedTime={topic.estimatedTime}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
          >
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
              Recent Activity
            </h2>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activity.type === 'resource' 
                      ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600' :
                    activity.type === 'note'
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' :
                    activity.type === 'flashcard'
                      ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' :
                      'bg-green-100 dark:bg-green-900/30 text-green-600'
                  }`}>
                    {activity.type === 'resource' && <BookOpen className="w-5 h-5" />}
                    {activity.type === 'note' && <Sparkles className="w-5 h-5" />}
                    {activity.type === 'flashcard' && <Sparkles className="w-5 h-5" />}
                    {activity.type === 'study_plan' && <TrendingUp className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {activity.action}: {activity.title}
                    </p>
                    <p className="text-sm text-slate-500">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

