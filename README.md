# Penang LRT Mutiara Line – Community Information & Feedback Platform

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Academic%20Simulation-yellow.svg)]()

> **CMT322 Web Engineering & Technologies**  
> School of Computer Sciences, Universiti Sains Malaysia (USM)

---

## 📌 Project Overview

The **Penang LRT Mutiara Line Community Information & Feedback Platform** is a specialized web application engineered to bridge communication between project authorities (MRT Corp, Penang State Government, contractors) and the local communities affected by the ongoing LRT construction works.

The platform provides:
1. **Public Transit & Civil Work Information**: Real-time construction announcements, station progress milestones, and traffic diversion/detour advisories.
2. **Community Feedback & Complaint System**: Secure resident registration, issue lodging (noise, safety, business/road access) with photographic evidence, and live multi-stage lifecycle tracking.
3. **Administrator & Liaison Portal**: High-level KPI analytics with Recharts, content management for announcements/road closures, resident complaint investigation, and user account governance.

---

## 🏗️ Architecture & Development Roadmap

This project is developed in two systematic parts:

- **PART A (Current)**: High-fidelity React single-page frontend powered by a centralized, persistent mock service architecture (`localStorage`). All CRUD operations across public visitors, residents, and administrators operate synchronously and seamlessly.
- **PART B (Upcoming)**: Laravel 11 RESTful API backend connected to MySQL database with Laravel Sanctum authentication.

```
Mutiara LRT Line Community System/
├── frontend/                     # PART A: React 18 + Vite Frontend
│   ├── src/
│   │   ├── components/           # Reusable UI components & layouts
│   │   ├── context/              # AuthContext session state
│   │   ├── mocks/                # Academic seed datasets
│   │   ├── pages/
│   │   │   ├── public/           # Home, Announcements, Road Closures
│   │   │   ├── auth/             # Login, Register
│   │   │   ├── user/             # Resident Dashboard, Submit Feedback, Profile
│   │   │   └── admin/            # Admin Dashboard, CRUD Management, Users
│   │   ├── routes/               # AppRoutes & ProtectedRoute (RBAC)
│   │   └── services/             # Simulated persistent API services
│   ├── package.json
│   └── vite.config.js
└── backend/                      # PART B: Laravel 11 REST API (Reserved)
```

---

## 👥 Stakeholder & Role-Based Access Control (RBAC)

The system supports 3 primary system roles:

| System Role | Target Stakeholders | Primary Access Privileges |
| :--- | :--- | :--- |
| **Public Visitor** | Commuters, Road Users, General Inquirers, Emergency Services | Browse home portal, view construction notices, search active road closures & detour routes without login. |
| **Registered User** | Local Residents, Commercial Business Owners | Access personal dashboard (`/dashboard`), lodge complaints with photo attachments, track resolution timeline, view liaison replies. |
| **Administrator** | System Administrators, Project Liaison Officers | Complete administrative oversight (`/admin/dashboard`), manage notices/road closures, investigate complaints, post official replies, manage user accounts. |

---

## 🔑 Demo Credentials (Part A Simulation)

To facilitate immediate evaluation, pre-seeded accounts are available with one-click demo autofill on the login page:

| Account Type | Email | Password | Access Route |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@demo.test` | `Demo12345!` | `/admin/dashboard` |
| **Resident User** | `user@demo.test` | `Demo12345!` | `/dashboard` |

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or newer)
- npm or yarn

### Installation & Execution
```bash
# 1. Clone repository
git clone https://github.com/HazriqAfiq/Mutiara-LRT-Line-Community-Information-System.git
cd Mutiara-LRT-Line-Community-Information-System

# 2. Enter frontend directory
cd frontend

# 3. Install dependencies
npm install

# 4. Start Vite development server
npm run dev
```

Visit **`http://localhost:5173`** (or the port indicated in your console) in your browser.

### Production Build
```bash
npm run build
```

---

## ⚖️ Academic Disclaimer
*This web application is an academic simulation project developed strictly for the fulfillment of **CMT322 Web Engineering & Technologies** at Universiti Sains Malaysia. All project data, announcements, road closure notices, and liaison personnel are simulated for educational evaluation purposes and are not affiliated with any actual public transit operator.*
