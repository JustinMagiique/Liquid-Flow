
import React, { useState, useEffect, useMemo } from 'react';
import { Task, Priority, Category } from './types';
import { INITIAL_TASKS } from './constants';
import { TaskItem } from './components/TaskItem';
import { TaskStats } from './components/TaskStats';
import { GlassCard } from './components/GlassCard';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<Category | 'All'>('All');
  const [showStats, setShowStats] = useState(false);

  // New Task Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState<Priority>(Priority.MEDIUM);
  const [newCategory, setNewCategory] = useState<Category>(Category.WORK);

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = filterCategory === 'All' || t.category === filterCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      // Urgent first
      const priorityMap = { [Priority.URGENT]: 4, [Priority.HIGH]: 3, [Priority.MEDIUM]: 2, [Priority.LOW]: 1 };
      return priorityMap[b.priority] - priorityMap[a.priority];
    });
  }, [tasks, search, filterCategory]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDesc,
      completed: false,
      priority: newPriority,
      category: newCategory,
      dueDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      subTasks: []
    };

    setTasks([newTask, ...tasks]);
    setNewTitle('');
    setNewDesc('');
    setShowAddForm(false);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addSubTask = (taskId: string, title: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          subTasks: [...t.subTasks, { id: Date.now().toString(), title, completed: false }]
        };
      }
      return t;
    }));
  };

  const toggleSubTask = (taskId: string, subId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          subTasks: t.subTasks.map(s => s.id === subId ? { ...s, completed: !s.completed } : s)
        };
      }
      return t;
    }));
  };

  return (
    <div className="relative min-h-screen p-4 md:p-12 max-w-6xl mx-auto">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full liquid-bg animate-orbit"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-purple-600/20 rounded-full liquid-bg animate-orbit-reverse"></div>
        <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] bg-blue-600/20 rounded-full liquid-bg animate-orbit"></div>
      </div>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white drop-shadow-2xl">
            Liquid <span className="text-indigo-400">Flow.</span>
          </h1>
          <p className="text-white/40 text-lg font-medium">Simplify your chaos with fluid intelligence.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowStats(!showStats)}
            className={`px-6 py-3 rounded-2xl font-bold transition-all ${showStats ? 'bg-white/20 text-white' : 'bg-white/5 text-white/60'} backdrop-blur-md border border-white/10 hover:bg-white/15`}
          >
            {showStats ? 'View Tasks' : 'Productivity'}
          </button>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            Create Task
          </button>
        </div>
      </header>

      {showStats ? (
        <div className="space-y-6">
          <TaskStats tasks={tasks} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar / Filters */}
          <aside className="lg:col-span-3 space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-sm font-bold text-white/30 uppercase tracking-widest mb-4">Search</h3>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Find anything..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500/50 transition-all text-sm"
                />
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-sm font-bold text-white/30 uppercase tracking-widest mb-4">Collections</h3>
              <div className="space-y-2">
                {['All', ...Object.values(Category)].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat as any)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-semibold flex items-center justify-between group ${filterCategory === cat ? 'bg-indigo-500/20 text-indigo-300' : 'text-white/60 hover:bg-white/5'}`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${filterCategory === cat ? 'bg-indigo-500/30' : 'bg-white/5 group-hover:bg-white/10'}`}>
                      {cat === 'All' ? tasks.length : tasks.filter(t => t.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </GlassCard>
          </aside>

          {/* Main Task List */}
          <main className="lg:col-span-9">
            {filteredTasks.length === 0 ? (
              <GlassCard className="p-12 text-center">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white/80">No tasks found</h3>
                <p className="text-white/40 mt-2">Clear your filters or create a new flow.</p>
              </GlassCard>
            ) : (
              <div className="space-y-2">
                {filteredTasks.map(task => (
                  <TaskItem 
                    key={task.id} 
                    task={task} 
                    onToggle={toggleTask} 
                    onDelete={deleteTask}
                    onAddSubTask={addSubTask}
                    onToggleSubTask={toggleSubTask}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      )}

      {/* New Task Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <GlassCard className="w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black">New Flow.</h2>
                <button onClick={() => setShowAddForm(false)} className="text-white/40 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <form onSubmit={handleAddTask} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Task Title</label>
                  <input 
                    autoFocus
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="E.g. Brainstorm marketing strategies"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Description</label>
                  <textarea 
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Add more context..."
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-indigo-500 transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Priority</label>
                    <select 
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as Priority)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-indigo-500 transition-all appearance-none"
                    >
                      {Object.values(Priority).map(p => <option key={p} value={p} className="bg-slate-900">{p}</option>)}
                    </select>
                  </div>
                   <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Category</label>
                    <select 
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as Category)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-indigo-500 transition-all appearance-none"
                    >
                      {Object.values(Category).map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-indigo-500/20 active:scale-[0.98]"
                  >
                    IGNITE FLOW
                  </button>
                </div>
              </form>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default App;
