import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { CheckCircle, RotateCcw, Trash2 } from 'lucide-react';

export const CompletedView: React.FC = () => {
  const { tasks, toggleTaskComplete, deleteTask, activeWorkspace } = useTasks();

  const completedTasks = tasks.filter(t => (activeWorkspace === 'All' || t.workspace === activeWorkspace) && t.status === 'Completed');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Completed History</h1>
        <p className="text-slate-500 text-sm mt-0.5">Review your completed accomplishments and wins</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
        {completedTasks.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Nothing completed yet. Your first win is waiting!
          </div>
        ) : (
          completedTasks.map(task => (
            <div key={task.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-slate-400 line-through truncate">{task.title}</h4>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                    <span>{task.workspace}</span>
                    <span>•</span>
                    <span>Completed</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleTaskComplete(task.id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
                  title="Reopen task"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore</span>
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
