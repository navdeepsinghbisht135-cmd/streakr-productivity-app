export type WorkspaceType = 'Work' | 'Personal' | 'All';

export type PriorityType = 'Low' | 'Medium' | 'High';

export type TaskStatus = 'Todo' | 'In Progress' | 'Completed';

export type RecurrenceType = 'None' | 'Daily' | 'Weekdays' | 'Weekly' | 'Monthly';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  workspace: 'Work' | 'Personal';
  projectId?: string;
  category?: string;
  tags: string[];
  priority: PriorityType;
  dueDate?: string; // YYYY-MM-DD
  dueTime?: string; // HH:MM
  reminderMinutesBefore?: number;
  status: TaskStatus;
  subtasks: Subtask[];
  recurring: RecurrenceType;
  createdAt: any;
  updatedAt: any;
  completedAt?: any;
  carriedForwardCount?: number;
  originalDueDate?: string;
  userId: string;
  attachments?: Attachment[];
  isTop3?: boolean;
}

export interface Project {
  id: string;
  name: string;
  workspace: 'Work' | 'Personal';
  color: string;
  description?: string;
  dueDate?: string;
  archived?: boolean;
  userId: string;
}

export interface Category {
  id: string;
  name: string;
  workspace: 'Work' | 'Personal';
  color: string;
  userId: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: any;
  taskId?: string;
}

export interface UserPreferences {
  defaultWorkspace: 'Work' | 'Personal';
  startOfWeek: 'Monday' | 'Sunday';
  defaultPriority: PriorityType;
  emailReminders: boolean;
  soundEnabled: boolean;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  streak: number;
  lastActiveDate?: string;
  preferences: UserPreferences;
}
