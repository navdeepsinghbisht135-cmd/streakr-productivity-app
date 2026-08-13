import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task, Project, Category, AppNotification, WorkspaceType, PriorityType, Subtask } from '../types';
import { useAuth } from './AuthContext';
import { ToastMessage } from '../components/Toast';
import confetti from 'canvas-confetti';

interface TaskContextType {
  tasks: Task[];
  projects: Project[];
  categories: Category[];
  notifications: AppNotification[];
  activeView: string;
  setActiveView: (view: string) => void;
  activeWorkspace: WorkspaceType;
  setActiveWorkspace: (ws: WorkspaceType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  addTask: (taskData: Partial<Task>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskComplete: (id: string) => void;
  addProject: (projectData: Partial<Project>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addCategory: (catData: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  exportDataJSON: () => void;
  exportDataCSV: () => void;
  refreshData: () => void;
  toast: ToastMessage | null;
  closeToast: () => void;
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  projects: [],
  categories: [],
  notifications: [],
  activeView: 'today',
  setActiveView: () => {},
  activeWorkspace: 'All',
  setActiveWorkspace: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  toggleTaskComplete: () => {},
  addProject: () => {},
  updateProject: () => {},
  deleteProject: () => {},
  addCategory: () => {},
  deleteCategory: () => {},
  markNotificationRead: () => {},
  clearAllNotifications: () => {},
  exportDataJSON: () => {},
  exportDataCSV: () => {},
  refreshData: () => {},
});

const TODAY_STR = new Date().toISOString().split('T')[0];
const TOMORROW_STR = new Date(Date.now() + 86400000).toISOString().split('T')[0];

const INITIAL_PROJECTS: Project[] = [
  { id: 'proj-1', name: 'HireMate App', workspace: 'Work', color: '#6366f1', description: 'AI recruiting platform PRD and frontend', userId: 'demo-user-123' },
  { id: 'proj-2', name: 'Q3 Product Roadmap', workspace: 'Work', color: '#3b82f6', description: 'Planning core engineering sprints', userId: 'demo-user-123' },
  { id: 'proj-3', name: 'Marathon Training', workspace: 'Personal', color: '#10b981', description: 'Weekly running goals and diet plan', userId: 'demo-user-123' },
  { id: 'proj-4', name: 'Home Renovation', workspace: 'Personal', color: '#f59e0b', description: 'Living room interior upgrades', userId: 'demo-user-123' },
];

const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Engineering', workspace: 'Work', color: '#6366f1', userId: 'demo-user-123' },
  { id: 'cat-2', name: 'Meetings', workspace: 'Work', color: '#ec4899', userId: 'demo-user-123' },
  { id: 'cat-3', name: 'Health & Fitness', workspace: 'Personal', color: '#10b981', userId: 'demo-user-123' },
  { id: 'cat-4', name: 'Finance', workspace: 'Personal', color: '#8b5cf6', userId: 'demo-user-123' },
];

const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Complete HireMate PRD & Architecture Doc',
    description: 'Finalize API specs, Firestore security rules, and user flow diagrams.',
    workspace: 'Work',
    projectId: 'proj-1',
    category: 'Engineering',
    tags: ['#deepwork', '#urgent'],
    priority: 'High',
    dueDate: TODAY_STR,
    dueTime: '18:00',
    status: 'Todo',
    subtasks: [
      { id: 'sub-1', title: 'Write executive summary', completed: true },
      { id: 'sub-2', title: 'Detail Firestore schema', completed: false },
      { id: 'sub-3', title: 'Review with engineering lead', completed: false }
    ],
    recurring: 'None',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'demo-user-123',
    isTop3: true,
  },
  {
    id: 'task-2',
    title: 'Review weekly Q3 engineering sprint board',
    description: 'Check pull requests and unblock team members.',
    workspace: 'Work',
    projectId: 'proj-2',
    category: 'Meetings',
    tags: ['#followup'],
    priority: 'Medium',
    dueDate: TODAY_STR,
    dueTime: '10:30',
    status: 'In Progress',
    subtasks: [
      { id: 'sub-4', title: 'Check PR backlog', completed: true },
      { id: 'sub-5', title: 'Assign QA testers', completed: false }
    ],
    recurring: 'Weekly',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'demo-user-123',
    isTop3: true,
  },
  {
    id: 'task-3',
    title: 'Morning 8km interval run',
    description: 'Maintain steady pace around the lake loop.',
    workspace: 'Personal',
    projectId: 'proj-3',
    category: 'Health & Fitness',
    tags: ['#fitness', '#health'],
    priority: 'High',
    dueDate: TODAY_STR,
    dueTime: '07:00',
    status: 'Completed',
    subtasks: [],
    recurring: 'Daily',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
    userId: 'demo-user-123',
    isTop3: true,
  },
  {
    id: 'task-4',
    title: 'Pay monthly electricity and internet bills',
    description: 'Auto-debit check with bank portal.',
    workspace: 'Personal',
    projectId: 'proj-4',
    category: 'Finance',
    tags: ['#admin'],
    priority: 'Low',
    dueDate: TOMORROW_STR,
    dueTime: '20:00',
    status: 'Todo',
    subtasks: [],
    recurring: 'Monthly',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'demo-user-123',
    isTop3: false,
  },
  {
    id: 'task-5',
    title: 'Prepare product presentation for stakeholders',
    description: 'Slide deck highlighting core conversion metrics and AI capabilities.',
    workspace: 'Work',
    projectId: 'proj-1',
    category: 'Engineering',
    tags: ['#presentation'],
    priority: 'High',
    dueDate: TOMORROW_STR,
    dueTime: '15:00',
    status: 'Todo',
    subtasks: [
      { id: 'sub-6', title: 'Gather analytics charts', completed: false },
      { id: 'sub-7', title: 'Draft slide transitions', completed: false }
    ],
    recurring: 'None',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'demo-user-123',
    isTop3: false,
  }
];

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    userId: 'demo-user-123',
    title: 'Welcome to Streakr! 🎉',
    message: 'Your personal AI-powered productivity workspace is ready.',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'notif-2',
    userId: 'demo-user-123',
    title: 'Streak Milestone',
    message: 'You are on a 5-day streak! Keep up the fantastic momentum.',
    read: false,
    createdAt: new Date().toISOString(),
  }
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  
  const [activeView, setActiveView] = useState<string>('today');
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceType>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const closeToast = () => setToast(null);

  // Load from localStorage or defaults
  useEffect(() => {
    const savedTasks = localStorage.getItem('streakr_tasks');
    const savedProjects = localStorage.getItem('streakr_projects');
    const savedCategories = localStorage.getItem('streakr_categories');
    const savedNotifs = localStorage.getItem('streakr_notifications');

    if (savedTasks) {
      try { setTasks(JSON.parse(savedTasks)); } catch (e) { setTasks(INITIAL_TASKS); }
    } else {
      setTasks(INITIAL_TASKS);
    }

    if (savedProjects) {
      try { setProjects(JSON.parse(savedProjects)); } catch (e) { setProjects(INITIAL_PROJECTS); }
    } else {
      setProjects(INITIAL_PROJECTS);
    }

    if (savedCategories) {
      try { setCategories(JSON.parse(savedCategories)); } catch (e) { setCategories(INITIAL_CATEGORIES); }
    } else {
      setCategories(INITIAL_CATEGORIES);
    }

    if (savedNotifs) {
      try { setNotifications(JSON.parse(savedNotifs)); } catch (e) { setNotifications(INITIAL_NOTIFICATIONS); }
    } else {
      setNotifications(INITIAL_NOTIFICATIONS);
    }
  }, [currentUser]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (tasks.length > 0) localStorage.setItem('streakr_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (projects.length > 0) localStorage.setItem('streakr_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (categories.length > 0) localStorage.setItem('streakr_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    if (notifications.length > 0) localStorage.setItem('streakr_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const refreshData = () => {
    // Triggers re-sync or state reload
  };

  const addTask = (taskData: Partial<Task>) => {
    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: taskData.title || 'Untitled Task',
      description: taskData.description || '',
      workspace: taskData.workspace || 'Work',
      projectId: taskData.projectId,
      category: taskData.category,
      tags: taskData.tags || [],
      priority: taskData.priority || 'Medium',
      dueDate: taskData.dueDate || TODAY_STR,
      dueTime: taskData.dueTime,
      reminderMinutesBefore: taskData.reminderMinutesBefore || 30,
      status: taskData.status || 'Todo',
      subtasks: taskData.subtasks || [],
      recurring: taskData.recurring || 'None',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: currentUser?.uid || 'demo-user-123',
      isTop3: taskData.isTop3 || false,
    };

    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    let completedLastTask = false;
    let todayTotal = 0;

    setTasks(prev => {
      const target = prev.find(t => t.id === id);
      const isToday = target && target.dueDate === TODAY_STR;
      const willBeCompleted = updates.status === 'Completed' && target?.status !== 'Completed';

      const todayTasks = prev.filter(t => t.dueDate === TODAY_STR);
      todayTotal = todayTasks.length;
      const uncompletedBefore = todayTasks.filter(t => t.status !== 'Completed').length;

      if (isToday && willBeCompleted && uncompletedBefore === 1 && todayTotal > 0) {
        completedLastTask = true;
      }

      return prev.map(t => {
        if (t.id === id) {
          const updated = { ...t, ...updates, updatedAt: new Date().toISOString() };
          if (updates.status === 'Completed' && t.status !== 'Completed') {
            updated.completedAt = new Date().toISOString();
            confetti({ particleCount: 100, spread: 80, origin: { y: 0.7 } });
          }
          return updated;
        }
        return t;
      });
    });

    if (completedLastTask) {
      setToast({
        id: String(Date.now()),
        title: "🎉 All Done for Today!",
        message: `Incredible work! You've successfully completed all ${todayTotal} tasks scheduled for today. Streak secured!`,
        type: 'celebration'
      });
    }
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleTaskComplete = (id: string) => {
    let completedLastTask = false;
    let todayTotal = 0;

    setTasks(prev => {
      const target = prev.find(t => t.id === id);
      const isToday = target && target.dueDate === TODAY_STR;
      const willBeCompleted = target && target.status !== 'Completed';

      const todayTasks = prev.filter(t => t.dueDate === TODAY_STR);
      todayTotal = todayTasks.length;
      const uncompletedBefore = todayTasks.filter(t => t.status !== 'Completed').length;

      if (isToday && willBeCompleted && uncompletedBefore === 1 && todayTotal > 0) {
        completedLastTask = true;
      }

      return prev.map(t => {
        if (t.id === id) {
          const newStatus = t.status === 'Completed' ? 'Todo' : 'Completed';
          const updated = {
            ...t,
            status: newStatus,
            completedAt: newStatus === 'Completed' ? new Date().toISOString() : undefined,
            updatedAt: new Date().toISOString()
          };
          if (newStatus === 'Completed') {
            confetti({ particleCount: 100, spread: 80, origin: { y: 0.7 } });
          }
          return updated;
        }
        return t;
      });
    });

    if (completedLastTask) {
      setToast({
        id: String(Date.now()),
        title: "🎉 All Done for Today!",
        message: `Incredible work! You've successfully completed all ${todayTotal} tasks scheduled for today. Streak secured!`,
        type: 'celebration'
      });
    }
  };

  const addProject = (projectData: Partial<Project>) => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: projectData.name || 'New Project',
      workspace: projectData.workspace || 'Work',
      color: projectData.color || '#6366f1',
      description: projectData.description || '',
      dueDate: projectData.dueDate,
      archived: false,
      userId: currentUser?.uid || 'demo-user-123',
    };
    setProjects(prev => [...prev, newProj]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addCategory = (catData: Partial<Category>) => {
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: catData.name || 'New Category',
      workspace: catData.workspace || 'Work',
      color: catData.color || '#3b82f6',
      userId: currentUser?.uid || 'demo-user-123',
    };
    setCategories(prev => [...prev, newCat]);
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const exportDataJSON = () => {
    const exportObj = { tasks, projects, categories, exportDate: new Date().toISOString() };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `streakr_backup_${TODAY_STR}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportDataCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,ID,Title,Workspace,Priority,Status,DueDate,Project\n";
    tasks.forEach(t => {
      const row = [t.id, `"${t.title.replace(/"/g, '""')}"`, t.workspace, t.priority, t.status, t.dueDate || '', t.projectId || ''];
      csvContent += row.join(",") + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `streakr_tasks_${TODAY_STR}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      projects,
      categories,
      notifications,
      activeView,
      setActiveView,
      activeWorkspace,
      setActiveWorkspace,
      searchQuery,
      setSearchQuery,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskComplete,
      addProject,
      updateProject,
      deleteProject,
      addCategory,
      deleteCategory,
      markNotificationRead,
      clearAllNotifications,
      exportDataJSON,
      exportDataCSV,
      refreshData,
      toast,
      closeToast,
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
