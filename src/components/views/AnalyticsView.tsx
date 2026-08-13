import React, { useState, useEffect } from 'react';
import { useTasks } from '../../context/TaskContext';
import { useAuth } from '../../context/AuthContext';
import { requestProductivitySummary } from '../../services/aiService';
import { BarChart3, Sparkles, Flame, CheckCircle2, Briefcase, User } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { tasks } = useTasks();
  const { userProfile } = useAuth();
  const [aiSummary, setAiSummary] = useState<string>('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const workCount = tasks.filter(t => t.workspace === 'Work' && t.status === 'Completed').length;
  const personalCount = tasks.filter(t => t.workspace === 'Personal' && t.status === 'Completed').length;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  useEffect(() => {
    async function loadSummary() {
      setLoadingSummary(true);
      const res = await requestProductivitySummary({
        completedCount: completed,
        totalCount: total,
        streak: userProfile?.streak || 5,
        workCount,
        personalCount
      });
      setAiSummary(res);
      setLoadingSummary(false);
    }
    loadSummary();
  }, [tasks]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Productivity Analytics</h1>
        <p className="text-slate-500 text-sm mt-0.5">Understand your execution velocity and distribution</p>
      </div>

      {/* AI Summary Card */}
      <div className="bg-gradient-to-r from-indigo-900 to-blue-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>AI Weekly Productivity Review</span>
        </div>
        <p className="text-sm text-slate-100 leading-relaxed">
          {loadingSummary ? 'Analyzing your productivity trends...' : aiSummary}
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Completed</div>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">{completed}</div>
          <div className="text-xs text-emerald-600 font-medium mt-1">Lifetime wins recorded</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Completion Rate</div>
          <div className="text-3xl font-extrabold text-indigo-600 mt-2">{rate}%</div>
          <div className="text-xs text-slate-500 font-medium mt-1">Efficiency ratio</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Current Streak</div>
          <div className="text-3xl font-extrabold text-amber-500 mt-2">🔥 {userProfile?.streak || 5} Days</div>
          <div className="text-xs text-slate-500 font-medium mt-1">Consistent daily execution</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Work vs Personal</div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span className="font-bold text-slate-900">{workCount}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-slate-900">{personalCount}</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">Completed distribution</div>
        </div>
      </div>
    </div>
  );
};
