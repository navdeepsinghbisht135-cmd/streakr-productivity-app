import React from 'react';
import { useTasks } from '../../context/TaskContext';
import { Task } from '../../types';
import { Calendar as CalendarIcon, CheckCircle2, Plus } from 'lucide-react';

interface CalendarViewProps {
  onOpenTaskModal: (task?: Task) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ onOpenTaskModal }) => {
  const { tasks, activeWorkspace } = useTasks();

  const workspaceTasks = tasks.filter(t => activeWorkspace === 'All' || t.workspace === activeWorkspace);

  // Generate current month days
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const days = [];
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {monthNames[month]} {year} Calendar
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">Monthly calendar due date overview</p>
        </div>
        <button
          onClick={() => onOpenTaskModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200 text-center text-xs font-bold text-slate-600 py-3 uppercase">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-100 bg-slate-100/50">
          {days.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="min-h-[100px] bg-slate-50/50"></div>;
            }

            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayTasks = workspaceTasks.filter(t => t.dueDate === dateStr);
            const isToday = dateStr === new Date().toISOString().split('T')[0];

            return (
              <div key={`day-${day}`} className={`min-h-[110px] bg-white p-2.5 flex flex-col justify-between ${isToday ? 'bg-indigo-50/30' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    isToday ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-700'
                  }`}>
                    {day}
                  </span>
                  {dayTasks.length > 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 font-semibold rounded-md">
                      {dayTasks.length}
                    </span>
                  )}
                </div>

                <div className="space-y-1 mt-2 overflow-y-auto max-h-20">
                  {dayTasks.map(task => (
                    <div
                      key={task.id}
                      onClick={() => onOpenTaskModal(task)}
                      className={`text-[11px] px-2 py-1 rounded-lg truncate cursor-pointer transition-all ${
                        task.status === 'Completed'
                          ? 'bg-emerald-100/60 text-emerald-800 line-through'
                          : task.priority === 'High'
                          ? 'bg-red-50 text-red-700 font-medium border border-red-200'
                          : 'bg-indigo-50 text-indigo-700 font-medium border border-indigo-100'
                      }`}
                      title={task.title}
                    >
                      {task.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
