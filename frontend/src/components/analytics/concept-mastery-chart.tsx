'use client';

import { motion } from 'framer-motion';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend 
} from 'recharts';
import { analyticsData } from '@/lib/mock-data';

interface ConceptMasteryChartProps {
  data?: typeof analyticsData.conceptMastery;
}

export default function ConceptMasteryChart({ data = analyticsData.conceptMastery }) {
  const totalMastery = data.reduce((acc, item) => acc + item.mastery, 0);
  const averageMastery = Math.round(totalMastery / data.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Concept Mastery</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Topic understanding</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-cyan-500">{averageMastery}%</p>
          <p className="text-xs text-slate-500">Average</p>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="mastery"
              nameKey="topic"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: 'none', 
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
              labelStyle={{ color: '#f8fafc', fontWeight: 600 }}
              itemStyle={{ color: '#94a3b8' }}
              formatter={(value: number) => [`${value}%`, 'Mastery']}
            />
            <Legend 
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-slate-600 dark:text-slate-400">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Progress Bars */}
      <div className="mt-6 space-y-3">
        {data.map((item, index) => (
          <div key={item.topic} className="flex items-center gap-3">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="flex-1 text-sm text-slate-600 dark:text-slate-400">{item.topic}</span>
            <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.mastery}%` }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
              />
            </div>
            <span className="text-sm font-medium text-slate-900 dark:text-white w-10 text-right">
              {item.mastery}%
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

