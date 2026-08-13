# ⚡ Streakr

### AI-Powered Productivity & Task Management PWA

Streakr is a modern productivity application designed to help people manage their **work and personal tasks**, plan their day, prioritize important work, and build consistent productivity habits.

Instead of being just another Todo app, Streakr focuses on one important question:

> **What should I focus on right now?**

---

## 🎯 Problem

Managing work and personal responsibilities can become overwhelming when tasks are scattered, priorities are unclear, and users don't have a clear plan for the day.

Streakr brings task management, planning, prioritization, projects, productivity tracking, and AI assistance into one focused workspace.

---

## ✨ Key Features

### 📋 Task Management

Create and manage tasks with:

- Task title
- Description / notes
- Due date
- Priority
- Work / Personal workspace
- Projects
- Categories
- Tags
- Subtasks
- Recurring tasks
- Task completion
- Task editing
- Task deletion

---

### 🎯 Today Dashboard

The Today view gives users a clear overview of their day.

Users can see:

- Today's tasks
- Overdue tasks
- Priority levels
- Work vs Personal tasks
- Daily progress
- Productivity statistics

The goal is to help users focus on the most important work instead of getting overwhelmed by a long task list.

---

### 📅 Planning

Streakr provides multiple ways to organize work:

- Today
- Upcoming
- All Tasks
- Calendar
- Completed Tasks
- Projects

Users can plan tasks for upcoming days and manage their workload more effectively.

---

### 🗂️ Work & Personal Workspaces

Keep professional and personal responsibilities separate.

#### Work

Examples:

- Job Search
- Projects
- Meetings
- Learning
- Applications

#### Personal

Examples:

- Personal tasks
- Finance
- Health
- Admin
- Daily responsibilities

Users can create their own projects and categories according to their workflow.

---

### 📁 Projects

Organize related tasks inside projects.

Example:

**HireMate**

- Complete PRD
- Review user research
- Update Figma
- Prepare presentation
- Publish LinkedIn post

Projects make it easier to manage larger goals without losing track of individual tasks.

---

### 🔄 Recurring Tasks

Create tasks that repeat automatically.

Examples:

- Study every weekday
- Weekly planning
- Sunday review
- Monthly bills
- Daily routines

The next occurrence can be generated automatically after completing the current task.

---

# 🤖 AI Productivity Features

Streakr integrates AI-powered productivity assistance.

### 🧩 AI Task Breakdown

Turn a large task into smaller actionable steps.

Example:

**Prepare for PM Interview**

AI can break it into:

1. Research the company
2. Review the job description
3. Prepare behavioral questions
4. Practice product cases
5. Review answers

---

### 🧠 AI Daily Planner

AI can analyze the day's tasks and suggest an effective order based on:

- Priority
- Due dates
- Task urgency
- Workload

The user remains in control of the final plan.

---

### ✍️ AI Task Rewriting

Turn vague tasks into clear and actionable tasks.

Example:

**Before**

> Work on project

**After**

> Review project requirements and create the first version of the implementation plan.

---

### 🎯 AI Priority Suggestions

AI can suggest a priority:

- Low
- Medium
- High

along with a reason for the recommendation.

---

### 📊 AI Productivity Summary

Generate a short summary based on productivity statistics such as:

- Completed tasks
- Total tasks
- Current streak
- Work tasks
- Personal tasks

---

### 💬 AI Productivity Assistant

Streakr also includes an AI chat experience for helping users organize and think through their tasks.

---

# 📈 Productivity Analytics

Streakr provides productivity insights including:

- Tasks completed
- Total tasks
- Completion progress
- Current streak
- Work vs Personal distribution
- Productivity trends

The goal is to make progress visible without turning productivity into excessive gamification.

---

# 🔥 Light Gamification

Streakr uses lightweight motivation features such as:

- Productivity streaks
- Completion progress
- Daily achievements
- Progress feedback

The experience remains professional and productivity-focused.

---

# 🔐 Authentication

Streakr uses Firebase Authentication.

Supported authentication includes:

- Google Sign-In
- Email & Password
- Password Reset
- Logout
- Persistent authentication sessions

Each user's data is isolated using Firebase security rules.

---

# ☁️ Firebase Backend

Streakr uses Firebase for backend infrastructure.

### Firebase Services

- Firebase Authentication
- Cloud Firestore
- Firebase Storage architecture
- Firestore Security Rules

Firestore stores application data including:

- Users
- Tasks
- Projects
- Workspace data

---

# 🔒 Security

Security is an important part of Streakr's architecture.

Firestore Security Rules ensure that authenticated users can access only their authorized data.

User-specific resources are protected using the authenticated Firebase UID.

Private environment variables are stored locally using environment configuration and are excluded from version control.

> Never commit `.env`, API secrets, service-account credentials, or other private credentials to GitHub.

---

# 📱 Responsive PWA

Streakr is designed as a responsive web application that works across:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📱 Tablet

The interface uses a modern SaaS dashboard layout on larger screens and mobile-friendly navigation on smaller screens.

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Modern CSS

## Backend

- Firebase Authentication
- Cloud Firestore
- Firebase Security Rules

## AI

- Google Gemini

## Architecture

- Context-based state management
- Service layer for Firebase
- Backend API routes for AI functionality
- Responsive PWA architecture

---

# 🏗️ Project Structure

```text
streakr-productivity-app/
│
├── src/
│   ├── components/
│   │   ├── views/
│   │   ├── AuthModal.tsx
│   │   ├── Sidebar.tsx
│   │   ├── MobileNav.tsx
│   │   ├── Navbar.tsx
│   │   ├── TaskModal.tsx
│   │   ├── AIChatDrawer.tsx
│   │   └── Toast.tsx
│   │
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── TaskContext.tsx
│   │
│   ├── services/
│   │   ├── firebase.ts
│   │   └── aiService.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── types.ts
│
├── firestore.rules
├── package.json
├── vite.config.ts
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
