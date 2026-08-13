import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { Project } from '../../types';
import { FolderKanban, Plus, Briefcase, User, Trash2, CheckCircle2 } from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const { projects, addProject, deleteProject, tasks, activeWorkspace } = useTasks();
  const [showNewModal, setShowNewModal] = useState(false);
  const [name, setName] = useState('');
  const [workspace, setWorkspace] = useState<'Work' | 'Personal'>(activeWorkspace === 'Personal' ? 'Personal' : 'Work');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#6366f1');

  const filteredProjects = projects.filter(p => activeWorkspace === 'All' || p.workspace === activeWorkspace);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addProject({ name: name.trim(), workspace, description: description.trim(), color });
    setName('');
    setDescription('');
    setShowNewModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Projects Management</h1>
          <p className="text-slate-500 text-sm mt-0.5">Organize tasks into structured multi-task goals</p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map(proj => {
          const projTasks = tasks.filter(t => t.projectId === proj.id);
          const completedCount = projTasks.filter(t => t.status === 'Completed').length;
          const totalCount = projTasks.length;
          const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

          return (
            <div key={proj.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: proj.color }}></div>
                    <h3 className="text-lg font-bold text-slate-900">{proj.name}</h3>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    proj.workspace === 'Work' ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {proj.workspace}
                  </span>
                </div>
                {proj.description && (
                  <p className="text-sm text-slate-600 mb-4">{proj.description}</p>
                )}

                {/* Progress bar */}
                <div className="space-y-1.5 mt-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span>Progress ({completedCount}/{totalCount} tasks)</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{totalCount} total tasks</span>
                <button
                  onClick={() => deleteProject(proj.id)}
                  className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg transition-colors"
                  title="Delete project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Project Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 space-y-5">
            <h2 className="text-lg font-bold text-slate-900">Create New Project</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., HireMate Redesign"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Workspace</label>
                <select
                  value={workspace}
                  onChange={(e) => setWorkspace(e.target.value as 'Work' | 'Personal')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief project goal..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl shadow-md"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
