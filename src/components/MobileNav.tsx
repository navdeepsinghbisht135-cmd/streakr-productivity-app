import React from 'react';
import { useTasks } from '../context/TaskContext';
import { CheckSquare, Calendar, FolderKanban, Plus, Menu, Inbox } from 'lucide-react';

interface MobileNavProps {
  onOpenTaskModal: () => void;
  onOpenMobileMenu: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onOpenTaskModal, onOpenMobileMenu }) => {
  const { activeView, setActiveView } = useTasks();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-around shadow-lg">
      <button
        onClick={() => setActiveView('today')}
        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
          activeView === 'today' ? 'text-indigo-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <CheckSquare className="w-5 h-5" />
        <span className="text-[10px]">Today</span>
      </button>

      <button
        onClick={() => setActiveView('upcoming')}
        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
          activeView === 'upcoming' ? 'text-indigo-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <Calendar className="w-5 h-5" />
        <span className="text-[10px]">Upcoming</span>
      </button>

      {/* Prominent Center Add Button */}
      <button
        onClick={onOpenTaskModal}
        className="w-12 h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30 -mt-5 transition-transform active:scale-95"
      >
        <Plus className="w-6 h-6" />
      </button>

      <button
        onClick={() => setActiveView('projects')}
        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
          activeView === 'projects' ? 'text-indigo-600 font-semibold' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <FolderKanban className="w-5 h-5" />
        <span className="text-[10px]">Projects</span>
      </button>

      <button
        onClick={onOpenMobileMenu}
        className="flex flex-col items-center gap-1 p-2 rounded-xl text-slate-500 hover:text-slate-900"
      >
        <Menu className="w-5 h-5" />
        <span className="text-[10px]">Menu</span>
      </button>
    </div>
  );
};
