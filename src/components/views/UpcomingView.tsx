import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { Task } from '../../types';
import { Calendar as CalendarIcon, Check, Plus, Clock } from 'lucide-react';

interface UpcomingViewProps {
  onOpenTaskModal: (task?: Task) => void;
}

export const UpcomingView: React.FC<UpcomingViewProps> = ({ onOpenTaskModal }) => {
  const { tasks, toggleTaskComplete, activeWorkspace } = useTasks();

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const workspaceTasks = tasks.filter(t => activeWorkspace === 'All' || t.workspace === activeWorkspace);
  const upcomingTasks = workspaceTasks.filter(t => t.dueDate && t.dueDate > todayStr && t.status !== 'Completed');

  // Group by date
  const grouped: { [date: string]: Task[] } = {};
  upcomingTasks.forEach(t => {
    if (t.dueDate) {
      if (!grouped[t.dueDate]) grouped[t.dueDate] = [];
      grouped[t.dueDate].push(t);
    }
  });

  const sortedDates = Object.keys(grouped).sort();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Upcoming Planning</h1>
          <p className="text-slate-500 text-sm mt-0.5">Plan ahead for tomorrow and future days</p>
        </div>
        <button
          onClick={() => onOpenTaskModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      <div className="space-y-6">
        {sortedDates.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-sm">
            No upcoming tasks scheduled. You're all clear ahead!
          </div>
        ) : (
          sortedDates.map(date => {
            const dateTitle = date === tomorrowStr ? 'Tomorrow' : date;
            return (
              <div key={date} className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <CalendarIcon className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{dateTitle} ({grouped[date].length})</span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
                  {grouped[date].map(task => (
                    <div key={task.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <button
                          onClick={() => toggleTaskComplete(task.id)}
                          className="w-6 h-6 rounded-full border-2 border-slate-300 hover:border-indigo-600 flex items-center justify-center shrink-0 transition-colors"
                        >
                          <Check className="w-3.5 h-3.5 opacity-0" />
                        </button>
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-slate-900 truncate">{task.title}</h4>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                            <span className="px-1.5 py-0.5 rounded font-medium bg-slate-100 text-slate-600">{task.priority}</span>
                            <span>•</span>
                            <span>{task.workspace}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenTaskModal(task)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors shrink-0"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
