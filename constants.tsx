
import React from 'react';
import { Priority, Category, Task } from './types';

export const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design Liquid UI components',
    description: 'Create the primary glassmorphism wrappers and fluid background elements.',
    completed: true,
    priority: Priority.HIGH,
    category: Category.WORK,
    dueDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    subTasks: [
      { id: '1-1', title: 'Research glassmorphism styles', completed: true },
      { id: '1-2', title: 'Implement Tailwind glass classes', completed: true }
    ]
  },
  {
    id: '2',
    title: 'Integrate Gemini API',
    description: 'Use Gemini 3 Flash to help break down complex tasks into manageable subtasks.',
    completed: false,
    priority: Priority.URGENT,
    category: Category.WORK,
    dueDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    subTasks: []
  },
  {
    id: '3',
    title: 'Weekly grocery run',
    description: 'Buy organic vegetables and fruits.',
    completed: false,
    priority: Priority.MEDIUM,
    category: Category.SHOPPING,
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    subTasks: []
  }
];

export const PRIORITY_COLORS: Record<Priority, string> = {
  [Priority.LOW]: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  [Priority.MEDIUM]: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  [Priority.HIGH]: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
  [Priority.URGENT]: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
};

export const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  [Category.WORK]: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  [Category.PERSONAL]: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>,
  [Category.SHOPPING]: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>,
  [Category.HEALTH]: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>,
  [Category.FINANCE]: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  [Category.OTHER]: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
};
