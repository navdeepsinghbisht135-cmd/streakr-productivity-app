import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { Search, Bell, Sparkles, Check, Trash2, X } from 'lucide-react';

interface NavbarProps {
  onToggleAIChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleAIChat }) => {
  const { searchQuery, setSearchQuery, notifications, markNotificationRead, clearAllNotifications, activeWorkspace, setActiveWorkspace } = useTasks();
  const { userProfile } = useAuth();
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 sticky top-0 z-30">
      {/* Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, projects, tags (#urgent)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Workspace Dropdown for Mobile or Quick Switch */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {(['All', 'Work', 'Personal'] as const).map(ws => (
            <button
              key={ws}
              onClick={() => setActiveWorkspace(ws)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeWorkspace === ws
                  ? 'bg-white text-indigo-600 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {ws}
            </button>
          ))}
        </div>

        {/* AI Assistant Button */}
        <button
          onClick={onToggleAIChat}
          className="flex items-center gap-2 py-2 px-3.5 bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 text-indigo-700 font-medium rounded-xl border border-indigo-200 shadow-sm transition-all text-sm"
        >
          <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span className="hidden sm:inline">Streakr AI</span>
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl relative transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={clearAllNotifications}
                    className="text-xs text-slate-500 hover:text-indigo-600 transition-colors px-2 py-1 rounded"
                    title="Mark all as read"
                  >
                    Mark read
                  </button>
                  <button
                    onClick={() => setShowNotifDropdown(false)}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-sm">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer ${
                        !n.read ? 'bg-indigo-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-medium text-slate-900 text-sm">{n.title}</div>
                        {!n.read && <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-1"></span>}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <img
            src={userProfile?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
            alt="User avatar"
            className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-sm"
          />
        </div>
      </div>
    </header>
  );
};
