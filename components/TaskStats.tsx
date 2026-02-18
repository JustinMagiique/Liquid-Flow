
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Task, Priority } from '../types';
import { GlassCard } from './GlassCard';

interface TaskStatsProps {
  tasks: Task[];
}

export const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const data = Object.values(Priority).map(priority => ({
    name: priority,
    value: tasks.filter(t => t.priority === priority).length
  })).filter(d => d.value > 0);

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <GlassCard className="p-6 flex flex-col justify-center items-center">
        <div className="relative w-32 h-32 mb-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="#8b5cf6"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={364.4}
              strokeDashoffset={364.4 * (1 - completionRate / 100)}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{completionRate}%</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white/80">Completed Tasks</h3>
        <p className="text-sm text-white/40">{completedCount} of {totalCount} tasks finished</p>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-white/80 mb-2">Priority Distribution</h3>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff' 
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};
