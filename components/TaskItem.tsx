
import React, { useState } from 'react';
import { Task, Priority } from '../types';
import { GlassCard } from './GlassCard';
import { PRIORITY_COLORS, CATEGORY_ICONS } from '../constants';
import { getTaskBreakdown } from '../services/geminiService';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAddSubTask: (id: string, subTask: string) => void;
  onToggleSubTask: (taskId: string, subId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ 
  task, onToggle, onDelete, onAddSubTask, onToggleSubTask 
}) => {
  const [isExpanding, setIsExpanding] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiBreakdown = async () => {
    setIsAiLoading(true);
    const subtasks = await getTaskBreakdown(task.title, task.description);
    subtasks.forEach(s => onAddSubTask(task.id, s));
    setIsAiLoading(false);
  };

  return (
    <GlassCard className={`p-5 mb-4 group ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-4">
        <button 
          onClick={() => onToggle(task.id)}
          className={`
            w-6 h-6 rounded-full border-2 mt-1 flex-shrink-0 transition-all duration-300
            ${task.completed ? 'bg-indigo-500 border-indigo-500' : 'border-white/20 hover:border-indigo-400'}
          `}
        >
          {task.completed && (
            <svg className="w-4 h-4 text-white m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0" onClick={() => setIsExpanding(!isExpanding)}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${PRIORITY_COLORS[task.priority]}`}>
              {task.priority}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-white/40 uppercase tracking-wider font-semibold">
              {CATEGORY_ICONS[task.category]}
              {task.category}
            </span>
            <span className="ml-auto text-[10px] text-white/40">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
          
          <h3 className={`text-lg font-semibold truncate ${task.completed ? 'line-through' : ''}`}>
            {task.title}
          </h3>
          <p className="text-sm text-white/50 line-clamp-2 mt-1">
            {task.description}
          </p>
        </div>

        <button 
          onClick={() => onDelete(task.id)}
          className="p-2 text-white/10 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {isExpanding && (
        <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-indigo-400 uppercase">Subtasks</h4>
            <button 
              disabled={isAiLoading}
              onClick={handleAiBreakdown}
              className="text-[10px] flex items-center gap-1 px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg hover:bg-indigo-500/40 disabled:opacity-50 transition-all"
            >
              {isAiLoading ? 'Brainstorming...' : (
                <>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 21h6v-1H9v1zm3-19C7.58 2 4 5.58 4 10c0 2.76 1.41 5.19 3.54 6.6l1.46 1.4V20h6v-2l1.46-1.4C18.59 15.19 20 12.76 20 10c0-4.42-3.58-8-8-8z"/></svg>
                  Ask Gemini AI
                </>
              )}
            </button>
          </div>
          
          <div className="space-y-2">
            {task.subTasks.map(sub => (
              <div key={sub.id} className="flex items-center gap-2 text-sm group/sub">
                <button 
                  onClick={() => onToggleSubTask(task.id, sub.id)}
                  className={`w-4 h-4 rounded border transition-colors ${sub.completed ? 'bg-indigo-400 border-indigo-400' : 'border-white/20'}`}
                >
                  {sub.completed && <svg className="w-3 h-3 text-white m-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                </button>
                <span className={sub.completed ? 'line-through text-white/30' : 'text-white/70'}>
                  {sub.title}
                </span>
              </div>
            ))}
            
            <div className="flex items-center gap-2 mt-2">
               <input 
                 placeholder="Add subtask..."
                 className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm outline-none focus:border-indigo-500/50"
                 onKeyDown={(e) => {
                   if (e.key === 'Enter' && e.currentTarget.value) {
                     onAddSubTask(task.id, e.currentTarget.value);
                     e.currentTarget.value = '';
                   }
                 }}
               />
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
};
