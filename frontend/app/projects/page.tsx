"use client";

import { useState } from "react";
import {
  FolderGit2,
  Sparkles,
  Clock,
  Layers,
  Award,
  ChevronRight,
  Terminal,
  CloudUpload,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { ProjectRecommendation } from "@/lib/types";

const PROJECTS: ProjectRecommendation[] = [
  {
    title: "Autonomous Enterprise RAG Agent with Multi-Document Hybrid Search",
    difficulty: "Advanced",
    technologies: ["Python", "FastAPI", "Gemini 2.5", "ChromaDB", "Docker", "Next.js"],
    estimated_time: "3 - 4 weeks",
    resume_value_score: 96,
    overview: "Architect an enterprise-grade Retrieval-Augmented Generation agent capable of parsing complex technical PDFs, generating vector embeddings, and providing verifiable citations with hallucination guards.",
    github_structure: `rag-agent/
├── app/
│   ├── api/routes.py
│   ├── core/embeddings.py
│   ├── agents/retriever.py
│   └── main.py
├── frontend/
├── tests/
├── Dockerfile
├── docker-compose.yml
└── README.md`,
    step_by_step_guide: [
      "Chunk documents using recursive text splitter with 200 token overlap.",
      "Index embeddings into ChromaDB vector database with dense cosine distance.",
      "Implement BM25 lexical + dense vector hybrid retrieval.",
      "Synthesize grounded answers using Gemini Flash with verified citations.",
      "Containerize using multi-stage Dockerfile and push to GitHub."
    ],
    deployment_guide: "Deploy FastAPI backend on Render / Railway and frontend on Vercel with automated GitHub Actions CI/CD."
  },
  {
    title: "High-Throughput Distributed Task Queue with WebSockets",
    difficulty: "Intermediate to Advanced",
    technologies: ["TypeScript", "Node.js", "Redis", "PostgreSQL", "Next.js", "WebSockets"],
    estimated_time: "2 - 3 weeks",
    resume_value_score: 92,
    overview: "Engineer a resilient distributed task processing pipeline with exponential backoff retries, priority queues, and real-time live updates on an interactive client dashboard.",
    github_structure: `task-flow/
├── worker/
│   └── processor.ts
├── server/
│   ├── ws.ts
│   └── db.ts
├── web/
└── docker-compose.yml`,
    step_by_step_guide: [
      "Build a task publisher with PostgreSQL ACID state tracking.",
      "Implement Redis-backed message broker with delayed job queues.",
      "Add worker pool with graceful shutdown and dead-letter queues.",
      "Stream execution status to interactive Next.js dashboard via WebSockets."
    ],
    deployment_guide: "Deploy backend container on Railway and client on Vercel with automated health check alerts."
  }
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectRecommendation>(PROJECTS[0]);

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-2">
          <FolderGit2 className="h-3.5 w-3.5 text-indigo-400" />
          <span>Production Capstone Project Studio</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Resume-Worthy Project Blueprints</h1>
        <p className="text-slate-400 text-sm">
          Recruiters ignore generic todo-apps. These architectural capstones demonstrate real distributed engineering, GenAI integration, and production deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Project Selector (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          {PROJECTS.map((project, idx) => {
            const isSelected = selectedProject.title === project.title;
            return (
              <div
                key={idx}
                onClick={() => setSelectedProject(project)}
                className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                  isSelected
                    ? "glass-panel border-indigo-500/50 bg-indigo-950/20 shadow-lg shadow-indigo-500/10"
                    : "glass-panel-interactive border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-indigo-400">{project.difficulty}</span>
                  <span className="font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 text-[10px]">
                    {project.resume_value_score}% Resume Impact
                  </span>
                </div>
                <h3 className="font-bold text-sm text-white leading-snug">{project.title}</h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{project.overview}</p>
              </div>
            );
          })}
        </div>

        {/* Right Project Details View (8 Cols) */}
        <div className="lg:col-span-8 glass-panel p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                Blueprint Architecture
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">{selectedProject.title}</h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="h-4 w-4 text-cyan-400" />
              <span>{selectedProject.estimated_time}</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            {selectedProject.overview}
          </p>

          {/* Tech Stack */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Recommended Technologies
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedProject.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* GitHub Tree Scaffolding */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-cyan-400" />
              <span>Repository Scaffolding</span>
            </span>
            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
              {selectedProject.github_structure}
            </pre>
          </div>

          {/* Step-by-Step Implementation */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Implementation Playbook
            </span>
            <div className="space-y-2">
              {selectedProject.step_by_step_guide.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deployment Guide */}
          <div className="p-4 rounded-2xl bg-violet-500/5 border border-violet-500/20 space-y-1">
            <span className="text-xs font-bold text-violet-300 flex items-center gap-1.5">
              <CloudUpload className="h-4 w-4" />
              <span>Deployment & CI/CD Strategy</span>
            </span>
            <p className="text-xs text-slate-300">{selectedProject.deployment_guide}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
