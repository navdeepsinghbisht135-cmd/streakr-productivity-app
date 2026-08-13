# ⚡ Streakr

### AI-Powered Productivity & Task Management PWA

Streakr is a modern productivity system designed to help users manage their **work and personal tasks**, plan their day, prioritize what matters most, and stay consistent with their goals.

Instead of being just another Todo app, Streakr focuses on answering one simple question:

> **"What should I focus on right now?"**

---

## 🚀 Why Streakr?

Managing daily responsibilities often becomes difficult because tasks are scattered across different places, priorities are unclear, and users don't know what to work on first.

Streakr brings task management, planning, prioritization, projects, productivity analytics, and AI assistance into one focused workspace.

### Streakr helps users:

* Capture tasks quickly
* Separate Work and Personal responsibilities
* Prioritize important tasks
* Plan Today and upcoming days
* Break large tasks into actionable subtasks
* Manage projects
* Handle recurring tasks
* Track productivity
* Maintain completion streaks
* Use AI to plan and prioritize work

---

# ✨ Features

## 📋 Smart Task Management

Create and manage tasks with:

* Title
* Description / Notes
* Due date
* Due time
* Priority
* Work / Personal workspace
* Projects
* Categories
* Tags
* Subtasks
* Recurring schedules
* Reminders
* Attachments

---

## 🎯 Today's Focus

The **Today** dashboard is the core experience of Streakr.

Users can see:

* Today's tasks
* Overdue tasks
* Work vs Personal tasks
* Today's Top 3
* Completion progress
* AI-powered focus recommendations

The goal is to reduce decision fatigue and help users focus on the next important action.

---

## 🤖 AI Productivity Assistant

Streakr integrates Gemini-powered AI capabilities.

### AI Task Breakdown

Turn a large task into smaller actionable steps.

Example:

**Prepare for PM Interview**

→ Research company
→ Analyze job description
→ Prepare behavioral questions
→ Practice product cases
→ Review answers

### AI Daily Planner

AI recommends an effective order for completing today's tasks based on:

* Priority
* Due dates
* Task context
* Overdue status
* User's daily focus

### AI Task Rewriting

Convert vague tasks into clear, actionable tasks.

### AI Priority Suggestions

AI can suggest whether a task should be:

* Low
* Medium
* High

The user always remains in control.

### AI Productivity Summary

Get a concise summary of completed work and productivity patterns.

---

# 📊 Productivity Analytics

Streakr provides useful productivity insights such as:

* Tasks completed today
* Weekly completion
* Completion rate
* Overdue tasks
* Current streak
* Work vs Personal distribution
* Project progress

The goal is to turn productivity data into useful insights rather than vanity metrics.

---

# 🔥 Light Gamification

Streakr uses lightweight motivation mechanics:

* Daily completion progress
* Productivity streaks
* Weekly milestones
* Completion feedback

The experience is intentionally professional rather than overly gamified.

---

# 🗂️ Organization

Organize responsibilities using:

### Workspaces

* Work
* Personal

### Projects

Create custom projects and manage their tasks.

### Categories

Create categories such as:

* Job Search
* Learning
* Finance
* Health
* Personal
* Admin

### Tags

Use flexible tags such as:

`#urgent` `#followup` `#interview` `#learning`

---

# 🔄 Recurring Tasks

Create recurring tasks such as:

* Daily tasks
* Weekday tasks
* Weekly reviews
* Monthly responsibilities

When a recurring task is completed, Streakr generates the next occurrence.

---

# 🔔 Reminders & Notifications

Users can configure task reminders and receive notifications through the in-app notification system.

---

# 🔐 Authentication & Security

Streakr uses **Firebase Authentication**.

Supported authentication methods:

* Google Sign-In
* Email & Password
* Password Reset
* Logout

User data is protected using **Firestore Security Rules**.

Each user's private tasks and workspace data are isolated from other users.

---

# ☁️ Firebase Architecture

Streakr uses Firebase for backend infrastructure.

### Firebase services

* Firebase Authentication
* Cloud Firestore
* Firebase Storage
* Firebase Cloud Functions where required

Firestore stores structured application data while Firebase Storage is used for task attachments.

---

# 📱 Progressive Web App

Streakr is designed as a responsive PWA.

It works across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📱 Tablet

The application can be installed as a PWA on supported devices.

---

# 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Modern CSS / UI components

### Backend & Infrastructure

* Firebase Authentication
* Cloud Firestore
* Firebase Storage
* Firebase Cloud Functions

### AI

* Google Gemini API

### Deployment

* Firebase / compatible modern web hosting

---

# 🏗️ Project Structure

```text
streakr/
│
├── src/
│   ├── components/
│   │   ├── views/
│   │   ├── AuthModal.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   ├── MobileNav.tsx
│   │   ├── TaskModal.tsx
│   │   └── AIChatDrawer.tsx
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
└── README.md
```

---

# ⚙️ Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/navdeepsinghbisht135-cmd/streakr-productivity-app.git
cd streakr-productivity-app
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure Firebase

Create a Firebase project and enable:

* Authentication
* Google Authentication
* Email/Password Authentication
* Cloud Firestore
* Firebase Storage

Add the required Firebase configuration through environment variables.

## 4. Configure Gemini

Add the required Gemini configuration according to the application's environment setup.

**Never commit private API keys or secrets to GitHub.**

## 5. Start the development server

```bash
npm run dev
```

The application should now be available on the local development server.

---

# 🔒 Environment Variables

Create a local environment file based on the project's environment example.

Do not commit:

```text
.env
.env.local
```

Never expose private credentials, service-account keys, or server-side secrets in the repository.

---

# 🧪 Current Status

### MVP

* [x] Firebase Authentication
* [x] Firestore integration
* [x] Work & Personal workspaces
* [x] Task management
* [x] Projects
* [x] Subtasks
* [x] Task priorities
* [x] Today view
* [x] Upcoming tasks
* [x] Calendar view
* [x] Completed tasks
* [x] Productivity analytics
* [x] Gemini AI integration
* [x] Responsive UI

### In Progress / Future Improvements

* [ ] Advanced collaboration
* [ ] Shared projects
* [ ] Push notifications
* [ ] Advanced offline synchronization
* [ ] Advanced AI productivity insights
* [ ] More integrations

---

# 🗺️ Product Roadmap

### Phase 1 — Foundation

Firebase Authentication + Firestore

### Phase 2 — Core Productivity

Tasks + Projects + Subtasks

### Phase 3 — Planning

Today + Upcoming + Calendar + Recurring Tasks

### Phase 4 — AI

AI Breakdown + AI Planner + AI Prioritization

### Phase 5 — Insights

Analytics + Streaks + Productivity Reports

### Phase 6 — Collaboration

Shared Projects + Task Assignment

### Phase 7 — Ecosystem

Integrations + Advanced AI + Offline-first capabilities

---

# 🎯 Product Philosophy

Streakr follows three principles:

### 1. Capture quickly

Adding a task should take seconds.

### 2. Know what matters

Users should understand what deserves attention first.

### 3. Make progress visible

Productivity should feel measurable without becoming overwhelming.

---

# 👨‍💻 Author

**Navdeep Singh Bist**

Aspiring AI Product Manager

Interested in:

* Product Management
* AI Products
* Product Strategy
* User Experience
* Applied AI

---

## ⭐ If you find Streakr useful

Feel free to explore the project, raise issues, or suggest improvements.

Built with ❤️ using React, Firebase and Gemini.
