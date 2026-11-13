# 🚀 AI Career Guidance Navigator

> **Hackathon-Winning Autonomous AI Career Strategist & Placement Preparation Ecosystem**  
> *Beyond a chatbot — A coordinated multi-agent AI system designed to guide engineering students and graduates from self-discovery to top-tier placement offers.*

---

## 🌟 Executive Summary

Over 80% of engineering and degree students experience placement anxiety not from a lack of potential, but due to an acute **actionable information gap**: *Which modern role fits their strengths? What exact skills are missing? What should they build day-by-day? And how do recruiters evaluate their resumes and interview responses?*

**AI Career Guidance Navigator** replaces static counseling and generic Q&A chatbots with a proactive, persistent **Multi-Agent Mentorship Swarm** powered by **Google Gemini 2.5 Flash** and **FastAPI**, coupled with a dark-mode **Next.js 14** web application.

---

## 🤖 The 10 Specialized AI Agents Swarm

```
                            [ User Input / Resume / Profile ]
                                            │
                                            ▼
                        ┌─────────────────────────────────────────┐
                        │        Master Orchestrator Agent        │
                        └───────────────────┬─────────────────────┘
                                            │
            ┌───────────────────┬───────────┴───────────┬───────────────────┐
            ▼                   ▼                       ▼                   ▼
    1. Career Agent     2. Resume Agent         3. Skill Gap Agent   4. Roadmap Agent
 (Match %, Demand, ROI) (ATS Score & STAR)       (Matrix & Priority)  (Daily/Weekly Plans)
            │                   │                       │                   │
            ├───────────────────┼───────────────────────┼───────────────────┤
            ▼                   ▼                       ▼                   ▼
    5. Mock Coach       6. Project Architect    7. Cert Curator      8. Placement Agent
 (4-Round Simulator)   (Scaffolding & Deploy)  (ROI Rankings)       (100-pt Index & Tiers)
            │                   │                       │                   │
            └───────────────────┴───────────┬───────────┴───────────────────┘
                                            ▼
                                9. Resource Recommender
                               10. Gamification & XP Agent
```

| Agent | Responsibility | Core Metrics & Outputs |
| :--- | :--- | :--- |
| **0. Orchestrator** | Intent classification, routing, and multi-agent synthesis | Unified Student Profile & Dynamic State |
| **1. Career Strategy** | Evaluates 11 tech roles (AI Eng, SDE, Data Eng, Cloud, DevOps, etc.) | Match %, Demand (0-100), Salary curve, Growth % |
| **2. Resume ATS** | Parses resumes, identifies missing keywords, checks quantifiable metrics | ATS Score (0-100), Before/After STAR rewrites |
| **3. Skill Gap Diagnostic** | Diffs user skills against industry standards | Criticality tiers (Critical, High, Moderate), Timelines |
| **4. Learning Roadmap** | Day-by-day, week-by-week, and month-by-month plans | Custom hours/day slider & Placement countdown |
| **5. Mock Interview Coach**| Simulates HR, Technical, Behavioral STAR, and Coding rounds | Multi-parameter scoring (Accuracy, Tone, Clarity) |
| **6. Project Architect** | Designs resume-grade capstone projects | GitHub folder trees, User stories, Deployment playbooks |
| **7. Certification Curator**| Evaluates Free, Paid, and Industry certifications | ROI Score, Prep time, and Official curriculum URLs |
| **8. Placement Readiness** | Composite evaluation across 8 pillars | 100-point Index, Company Tier matching (Tier 1/2/3) |
| **9. Resource Recommender**| Ingests LeetCode drills, documentation, and repos | Contextual deep links for every skill gap |
| **10. Gamification Agent** | Manages XP, streak tracking, and badges | Badges ("ATS 85+ Club", "Flame"), Leaderboards |

---

## ⚡ The 13 Core Features

1. **Student Onboarding**: Collects 13 academic & professional data points (CGPA, Branch, Skills, Work Style, Resume PDF, GitHub, LinkedIn).
2. **AI Student Profile**: Instant psychometric diagnosis (Personality, Learning Style, Strengths, Vulnerabilities, Readiness Score).
3. **AI Career Recommendation Engine**: 11+ high-demand tech pathways with match affinity and salary projections.
4. **Skill Gap Analysis**: Visual gap matrix separating existing proficiencies from critical blockers.
5. **Personalized Learning Roadmap**: Granular daily routines, weekly sprints, and monthly capstones.
6. **Resume Analyzer & ATS Optimizer**: Real-time ATS parser with STAR formula bullet-point rewriting.
7. **Project Recommendation Studio**: Production-ready GitHub repo scaffolding with Docker and CI/CD guides.
8. **Certification Recommendation**: Ranked credentials categorized into Free and Industry Standards.
9. **AI Mock Interview Simulator**: Adaptive question generator with multi-criteria candidate evaluation.
10. **Placement Readiness Score**: 8-pillar composite index matching candidates to Tier 1, 2, and 3 employers.
11. **AI Career Mentor Chat**: Contextual omnibar for on-demand strategy, comparison, and placement advice.
12. **Progress Dashboard**: Executive command center displaying streaks, readiness gauges, and quick shortcuts.
13. **Gamification & Leaderboard**: XP mechanics, streak multiplier, unlockable badges, and cohort rankings.

---

## 🛠️ Technology Stack

* **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons.
* **Backend**: FastAPI (Python 3.13), Uvicorn, Pydantic v2, PyPDF.
* **AI & Multi-Agent Swarm**: Google Gemini 2.5 Flash (`google-genai`), LangChain architecture.
* **Design System**: Dark-mode glassmorphism (`backdrop-blur-xl`, radiant gradients, micro-interactions).

---

## 🚀 Quick Start Guide

### Option A: One-Click Launch (Windows)

Simply double click or run:
```powershell
.\start.ps1
```
*Or via command prompt:*
```cmd
start.bat
```

### Option B: Manual Startup

#### 1. Backend (FastAPI)
```powershell
# Set environment
$env:PYTHONPATH = "backend"

# Run FastAPI server
.\backend\venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
*API will run on [http://localhost:8000](http://localhost:8000) with interactive Swagger Docs at [http://localhost:8000/docs](http://localhost:8000/docs).*

#### 2. Frontend (Next.js)
```powershell
cd frontend
npm run dev
```
*Web application will run on [http://localhost:3000](http://localhost:3000).*

---

## 🌍 UN Sustainable Development Goals (SDGs)

* **SDG 8: Decent Work & Economic Growth**: Democratizes elite placement coaching for engineering students from all tier colleges, directly addressing youth underemployment.
* **SDG 9: Industry, Innovation & Infrastructure**: Accelerates digital transformation by upskilling students in critical future technologies (Generative AI, Cloud Infrastructure, Cyber Defense).

---

## 🏆 Hackathon Demo Pitch (3-Minute Script)

1. **The Hook (30 sec)**: Present the placement paradox — high job demand in AI/Cloud, yet high student anxiety due to fractured, generic guidance.
2. **The Live Demo (2 min)**:
   - Run profile onboarding -> Show multi-agent profile diagnosis.
   - Jump to Career Horizons -> One-click compare *AI Engineer vs Data Engineer*.
   - View 90-Day Roadmap -> Check off day-1 containerization task.
   - Run Resume ATS scan -> Show live STAR rewrite.
   - Conduct a 1-minute AI Mock Interview round -> Show immediate score breakdown.
3. **The Closing (30 sec)**: Highlight the 8-pillar Placement Readiness Index and SDG alignment.
