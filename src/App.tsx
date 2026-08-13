/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider, useTasks } from './context/TaskContext';
import { AuthModal } from './components/AuthModal';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { Navbar } from './components/Navbar';
import { TaskModal } from './components/TaskModal';
import { AIChatDrawer } from './components/AIChatDrawer';
import { Toast } from './components/Toast';

import { TodayView } from './components/views/TodayView';
import { AllTasksView } from './components/views/AllTasksView';
import { UpcomingView } from './components/views/UpcomingView';
import { CalendarView } from './components/views/CalendarView';
import { ProjectsView } from './components/views/ProjectsView';
import { CompletedView } from './components/views/CompletedView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { SettingsView } from './components/views/SettingsView';
import { Task } from './types';
import { Loader2 } from 'lucide-react';

function MainAppContent() {
  const { currentUser, loading } = useAuth();
  const { activeView, toast, closeToast } = useTasks();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          <span className="text-sm font-medium tracking-wide">Loading Streakr...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthModal />;
  }

  const handleOpenTaskModal = (task?: Task) => {
    setTaskToEdit(task || null);
    setIsTaskModalOpen(true);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'today':
      case 'work':
      case 'personal':
        return <TodayView onOpenTaskModal={handleOpenTaskModal} />;
      case 'all':
        return <AllTasksView onOpenTaskModal={handleOpenTaskModal} />;
      case 'upcoming':
        return <UpcomingView onOpenTaskModal={handleOpenTaskModal} />;
      case 'calendar':
        return <CalendarView onOpenTaskModal={handleOpenTaskModal} />;
      case 'projects':
        return <ProjectsView />;
      case 'completed':
        return <CompletedView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <TodayView onOpenTaskModal={handleOpenTaskModal} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <Sidebar onOpenTaskModal={() => handleOpenTaskModal()} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar onToggleAIChat={() => setIsAIChatOpen(!isAIChatOpen)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 pb-24 md:pb-8">
          <div className="max-w-6xl mx-auto">
            {renderActiveView()}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        onOpenTaskModal={() => handleOpenTaskModal()}
        onOpenMobileMenu={() => setIsAIChatOpen(true)}
      />

      {/* Task Creation/Editing Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        taskToEdit={taskToEdit}
      />

      {/* AI Assistant Chat Drawer */}
      <AIChatDrawer
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
      />

      {/* Completion Toast Notification */}
      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <MainAppContent />
      </TaskProvider>
    </AuthProvider>
  );
}
