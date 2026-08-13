import React, { useEffect } from 'react';
import { Trophy, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'celebration' | 'info';
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 6000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto">
      <div className="bg-slate-900 text-white rounded-2xl shadow-2xl p-4 border border-slate-800 flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/30 to-indigo-500/30 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
          <Trophy className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="flex-1 pr-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            <span>{toast.title}</span>
          </h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {toast.message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
