import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { Task } from '../../types';
import { Check, Plus, Filter, SortAsc, Briefcase, User, Calendar, Trash2 } from 'lucide-react';

interface AllTasksViewProps {
  onOpenTaskModal: (task?: Task) => void;
}

export const AllTasksView: React.FC<AllTasksViewProps> = ({ onOpenTaskModal }) => {
  const { tasks, toggleTaskComplete, deleteTask, activeWorkspace, searchQuery } = useTasks();
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredTasks = tasks.filter(t => {
    if (activeWorkspace !== 'All' && t.workspace !== activeWorkspace) return false;
    if (filterPriority !== 'All' && t.priority !== filterPriority) return false;
    if (filterStatus !== 'All' && t.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchDesc = t.description?.toLowerCase().includes(q) || false;
      const matchTags = t.tags.some(tag => tag.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchTags) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">All Tasks Database</h1>
          <p className="text-slate-500 text-sm mt-0.5">Filter, search, and manage your complete task repository</p>
        </div>
        <button
          onClick={() => onOpenTaskModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-md transition-all self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-600 uppercase">Filters:</span>
        </div>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="All">All Priorities</option>
          <option value="High">Priority: High</option>
          <option value="Medium">Priority: Medium</option>
          <option value="Low">Priority: Low</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="All">All Statuses</option>
          <option value="Todo">Status: Todo</option>
          <option value="In Progress">Status: In Progress</option>
          <option value="Completed">Status: Completed</option>
        </select>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            No tasks found matching your filters.
          </div>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
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
                    {task.dueDate && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {task.dueDate}</span>
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
