import React from 'react';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { 
  CheckSquare, 
  Calendar, 
  Clock, 
  Briefcase, 
  User, 
  FolderKanban, 
  CheckCircle, 
  BarChart3, 
  Settings, 
  Plus, 
  Flame, 
  LogOut,
  Layers,
  Inbox
} from 'lucide-react';

interface SidebarProps {
  onOpenTaskModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenTaskModal }) => {
  const { activeView, setActiveView, activeWorkspace, setActiveWorkspace, tasks } = useTasks();
  const { userProfile, logout } = useAuth();

  const todayStr = new Date().toISOString().split('T')[0];
  const todayCount = tasks.filter(t => t.dueDate === todayStr && t.status !== 'Completed').length;
  const streak = userProfile?.streak || 5;

  const navItems = [
    { id: 'today', label: 'Today', icon: CheckSquare, count: todayCount },
    { id: 'upcoming', label: 'Upcoming', icon: Calendar },
    { id: 'all', label: 'All Tasks', icon: Inbox },
    { id: 'calendar', label: 'Calendar', icon: Clock },
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'completed', label: 'Completed', icon: CheckCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
            S
          </div>
          <div>
            <h1 className="font-bold text-white tracking-tight text-lg leading-none">Streakr</h1>
            <span className="text-xs text-indigo-400 font-medium tracking-wide">Productivity PWA</span>
          </div>
        </div>
      </div>

      {/* Streak Badge & Workspace Switcher */}
      <div className="p-4 mx-3 my-3 bg-slate-800/60 rounded-xl border border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
            <Flame className="w-5 h-5 fill-amber-400/20" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Current Streak</div>
            <div className="text-sm font-bold text-white">{streak} Days Strong 🔥</div>
          </div>
        </div>
      </div>

      {/* Quick Add Task Button */}
      <div className="px-3 mb-2">
        <button
          onClick={onOpenTaskModal}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-md shadow-indigo-600/20 transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Workspace Filter Tabs */}
      <div className="px-3 py-2">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">Workspace</div>
        <div className="grid grid-cols-3 gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
          {(['All', 'Work', 'Personal'] as const).map(ws => (
            <button
              key={ws}
              onClick={() => setActiveWorkspace(ws)}
              className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeWorkspace === ws
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {ws}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">Menu</div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && item.count > 0 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-500/20 text-indigo-300 font-semibold">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <img
            src={userProfile?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
            alt="User avatar"
            className="w-9 h-9 rounded-full object-cover border border-slate-700 shrink-0"
          />
          <div className="overflow-hidden">
            <div className="text-sm font-medium text-white truncate">{userProfile?.displayName || 'Navdeep Singh'}</div>
            <div className="text-xs text-slate-400 truncate">{userProfile?.email || 'navdeep@streakr.app'}</div>
          </div>
        </div>
        <button
          onClick={logout}
          title="Sign out"
          className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
