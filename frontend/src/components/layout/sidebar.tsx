'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  PenTool,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Flame,
  Target,
  Clock,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { streakData } from '@/lib/mock-data';

const mainNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/notes', label: 'Notes', icon: PenTool },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
];

const bottomNavItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/help', label: 'Help & Support', icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 bottom-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 z-40 flex flex-col',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3 text-slate-600 dark:text-slate-400" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-slate-600 dark:text-slate-400" />
        )}
      </button>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className={cn('mb-6', isCollapsed && 'hidden')}>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3">
            Main
          </p>
        </div>
        
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                active
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              <Icon className={cn('w-5 h-5 flex-shrink-0', active && 'text-white')} />
              {!isCollapsed && <span>{item.label}</span>}
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"
                />
              )}
            </Link>
          );
        })}

        {/* Stats Summary (Collapsed) */}
        {!isCollapsed && (
          <div className="mt-8 p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 rounded-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{streakData.current}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Day Streak</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-white dark:bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="w-3 h-3 text-cyan-500" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Today</span>
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">45m</p>
              </div>
              <div className="p-2 bg-white dark:bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-1.5 mb-1">
                  <Target className="w-3 h-3 text-purple-500" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Goal</span>
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">5/7</p>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed Stats */}
        {isCollapsed && (
          <div className="mt-4 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{streakData.current}</span>
          </div>
        )}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

