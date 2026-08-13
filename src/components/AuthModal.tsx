import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { signInWithGoogle, signInAsDemo } = useAuth();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/15 rounded-2xl backdrop-blur-md mb-4 shadow-inner border border-white/20">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Streakr</h1>
          <p className="text-indigo-100 mt-2 text-sm max-w-xs mx-auto">
            Turn scattered responsibilities into clear daily action with AI-powered productivity.
          </p>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Smart Today overview & Top 3 Focus management</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>AI task breakdown, daily planner, and priority recommendations</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Secure private workspaces for Work & Personal goals</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl shadow-md transition-all active:scale-[0.99]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.1.74-2.5 1.18-4.05 1.18-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.17 21.36 7.23 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.29c-.25-.74-.38-1.54-.38-2.29s.13-1.55.38-2.29V6.56H1.19C.43 8.08 0 9.79 0 11.6s.43 3.52 1.19 5.04l4.09-2.35z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.64 1.19 6.56l4.09 3.15c.95-2.83 3.6-4.96 6.72-4.96z"/>
              </svg>
              Sign in with Google
            </button>

            <button
              onClick={signInAsDemo}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium rounded-xl transition-all border border-indigo-200"
            >
              <span>Explore Demo Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-400 text-center">
            By signing in, you agree to secure data privacy and encrypted storage guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};
