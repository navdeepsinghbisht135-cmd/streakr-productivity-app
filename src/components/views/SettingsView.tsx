import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTasks } from '../../context/TaskContext';
import { Download, LogOut, User, Shield, HardDrive, Bell } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { userProfile, logout } = useAuth();
  const { exportDataJSON, exportDataCSV } = useTasks();

  return (
    <div className="space-y-6 max-w-3xl animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Settings & Preferences</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your account preferences and data backups</p>
      </div>

      {/* Account Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-600" />
          <span>Account Profile</span>
        </h2>
        <div className="flex items-center gap-4 pt-2">
          <img
            src={userProfile?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 shadow-sm"
          />
          <div>
            <div className="text-lg font-bold text-slate-900">{userProfile?.displayName || 'Navdeep Singh'}</div>
            <div className="text-sm text-slate-500">{userProfile?.email || 'navdeep@streakr.app'}</div>
            <div className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
              <Shield className="w-3 h-3" /> Secure Google Session
            </div>
          </div>
        </div>
      </div>

      {/* Data Export Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-indigo-600" />
          <span>Data Portability & Backups</span>
        </h2>
        <p className="text-sm text-slate-600">
          Download a complete backup of your tasks, projects, and custom categories at any time.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={exportDataJSON}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl shadow-sm transition-all text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON Backup</span>
          </button>
          <button
            onClick={exportDataCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-xl border border-indigo-200 transition-all text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV Spreadsheet</span>
          </button>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <LogOut className="w-4 h-4 text-red-500" />
          <span>Session Actions</span>
        </h2>
        <div className="pt-2">
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-xl border border-red-200 transition-all text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out from Streakr</span>
          </button>
        </div>
      </div>
    </div>
  );
};
