import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';
import { Task } from '../../types';
import { requestDailyPlan } from '../../services/aiService';
import { 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Flame, 
  Calendar, 
  Clock, 
  Plus, 
  ArrowRight, 
  Check, 
  AlertCircle,
  Briefcase,
  User
} from 'lucide-react';

interface TodayViewProps {
  onOpenTaskModal: (task?: Task) => void;
}

export const TodayView: React.FC<TodayViewProps> = ({ onOpenTaskModal }) => {
  const { tasks, toggleTaskComplete, activeWorkspace, addTask } = useTasks();
  const { userProfile } = useAuth();
  const [aiPlan, setAiPlan] = useState<{ orderedTaskIds: string[]; explanation: string } | null>(null);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [quickTitle, setQuickTitle] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];
  
  // Filter by active workspace and today's due date or overdue
  const workspaceTasks = tasks.filter(t => activeWorkspace === 'All' || t.workspace === activeWorkspace);
  const todayTasks = workspaceTasks.filter(t => t.dueDate === todayStr || (t.dueDate && t.dueDate < todayStr && t.status !== 'Completed'));
  
  const completedToday = todayTasks.filter(t => t.status === 'Completed').length;
  const totalToday = todayTasks.length;
  const top3Tasks = todayTasks.filter(t => t.isTop3 || t.priority === 'High');

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;
    addTask({
      title: quickTitle.trim(),
      workspace: activeWorkspace === 'Personal' ? 'Personal' : 'Work',
      dueDate: todayStr,
      priority: 'Medium',
      status: 'Todo',
      subtasks: [],
      tags: [],
    });
    setQuickTitle('');
  };

  const handleGetAiPlan = async () => {
    setLoadingPlan(true);
    const plan = await requestDailyPlan(todayTasks);
    setAiPlan(plan);
    setLoadingPlan(false);
  };

  // Time of day greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const userName = userProfile?.displayName?.split(' ')[0] || 'Navdeep';

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-semibold mb-3 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>Today's Execution Dashboard</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              {greeting}, {userName} 👋
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              You have completed <strong className="text-white">{completedToday} of {totalToday}</strong> tasks scheduled for today. Maintain your momentum!
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
            <div className="text-center px-3">
              <div className="text-2xl font-black text-amber-400">🔥 {userProfile?.streak || 5}</div>
              <div className="text-[11px] text-slate-300 uppercase tracking-wider font-medium">Day Streak</div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center px-3">
              <div className="text-2xl font-black text-indigo-300">{Math.round((completedToday / (totalToday || 1)) * 100)}%</div>
              <div className="text-[11px] text-slate-300 uppercase tracking-wider font-medium">Progress</div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Top 3 Focus Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Today's Top 3 Focus</h2>
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
              {top3Tasks.filter(t => t.status === 'Completed').length}/3 done
            </span>
          </div>
          <button
            onClick={handleGetAiPlan}
            disabled={loadingPlan}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl border border-indigo-200 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>{loadingPlan ? 'Analyzing...' : 'AI Schedule Optimizer'}</span>
          </button>
        </div>

        {aiPlan && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-sm text-indigo-900 animate-in fade-in duration-200">
            <div className="font-semibold flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>AI Recommended Plan</span>
            </div>
            <p className="text-indigo-700 text-xs">{aiPlan.explanation}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {top3Tasks.slice(0, 3).map((task, idx) => (
            <div
              key={task.id}
              className={`bg-white rounded-2xl p-5 border shadow-sm transition-all flex flex-col justify-between ${
                task.status === 'Completed' ? 'border-emerald-200 bg-emerald-50/20 opacity-75' : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    Priority {task.priority}
                  </span>
                  <button
                    onClick={() => toggleTaskComplete(task.id)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      task.status === 'Completed' ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 hover:border-indigo-600'
                    }`}
                  >
                    {task.status === 'Completed' && <Check className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <h3 className={`font-semibold text-slate-900 text-base line-clamp-2 ${task.status === 'Completed' ? 'line-through text-slate-400' : ''}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{task.description}</p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  {task.workspace === 'Work' ? <Briefcase className="w-3.5 h-3.5 text-indigo-500" /> : <User className="w-3.5 h-3.5 text-emerald-500" />}
                  {task.workspace}
                </span>
                {task.dueTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {task.dueTime}
                  </span>
                )}
              </div>
            </div>
          ))}

          {top3Tasks.length === 0 && (
            <div className="col-span-3 bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-400">
              No top focus tasks selected yet. Create or mark tasks as high priority to feature them here.
            </div>
          )}
        </div>
      </div>

      {/* All Today Tasks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Today's Task Stream</h2>
          <button
            onClick={() => onOpenTaskModal()}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Advanced modal ↗
          </button>
        </div>

        {/* Quick Add Bar */}
        <form onSubmit={handleQuickAdd} className="flex gap-2">
          <input
            type="text"
            value={quickTitle}
            onChange={(e) => setQuickTitle(e.target.value)}
            placeholder="+ Type a new task and press Enter..."
            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl shadow-md transition-all shrink-0"
          >
            Add
          </button>
        </form>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
          {todayTasks.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800">You're all caught up for today! 🎉</h3>
              <p className="text-slate-500 text-sm mt-1">Enjoy your free time or plan ahead for tomorrow.</p>
            </div>
          ) : (
            todayTasks.map(task => (
              <div
                key={task.id}
                className={`p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors ${
                  task.status === 'Completed' ? 'bg-slate-50/50' : ''
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <button
                    onClick={() => toggleTaskComplete(task.id)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      task.status === 'Completed' ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 hover:border-indigo-600'
                    }`}
                  >
                    {task.status === 'Completed' && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <div className="min-w-0">
                    <h4 className={`text-sm font-semibold truncate ${task.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                      <span className={`px-1.5 py-0.5 rounded font-medium ${
                        task.priority === 'High' ? 'bg-red-100 text-red-700' : task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {task.priority}
                      </span>
                      <span>•</span>
                      <span>{task.workspace}</span>
                      {task.subtasks.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{task.subtasks.filter(s => s.completed).length}/{task.subtasks.length} subtasks</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onOpenTaskModal(task)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
