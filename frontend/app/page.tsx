"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Brain,
  Compass,
  FileCheck2,
  Calendar,
  Mic,
  Award,
  ShieldCheck,
  CheckCircle2,
  Zap
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-spin-slow" />
          <span>Hackathon-Winning Multi-Agent Architecture</span>
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
          <span className="text-slate-400">Powered by Gemini 2.5 Flash</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.15]">
          Your Autonomous{" "}
          <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
            AI Career Mentor
          </span>{" "}
          for High-Impact Placements
        </h1>

        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Far beyond a simple chatbot. An orchestrated swarm of 10 specialized AI agents that analyzes your complete academic profile, identifies high-demand careers, bridges skill gaps, and guides you day-by-day to your dream offer.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Brain className="h-4 w-4" />
            <span>Generate My AI Career Profile</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 font-medium text-sm hover:bg-slate-800/80 hover:text-white transition-all"
          >
            <span>Explore Live Dashboard Demo</span>
          </Link>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-3xl mx-auto">
          {[
            { label: "AI Specialized Agents", val: "10 Agents Swarm" },
            { label: "Target Tech Roles", val: "11+ High Growth" },
            { label: "Resume ATS Scoring", val: "STAR Heuristics" },
            { label: "UN SDG Alignment", val: "Goals 8 & 9" },
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-4 rounded-2xl text-center space-y-1">
              <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
              <p className="text-base font-bold text-slate-100">{stat.val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10-Agent Swarm Section */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            The 10 Specialized AI Agents Behind Your Success
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Each agent owns an exact domain in the student career lifecycle, collaborating under a unified Master Orchestrator.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              agent: "1. Career Strategy Agent",
              desc: "Calculates match percentage across 11 tech roles using Ikigai & O*NET demand benchmarks.",
              icon: Compass,
              color: "text-violet-400"
            },
            {
              agent: "2. Resume ATS Agent",
              desc: "Parses PDF resumes, calculates 0-100 ATS scores, checks quantifiable metrics & suggests STAR rewrites.",
              icon: FileCheck2,
              color: "text-cyan-400"
            },
            {
              agent: "3. Skill Gap Diagnostic Agent",
              desc: "Diffs student abilities against target role requirements with critical priority tiers.",
              icon: ShieldCheck,
              color: "text-rose-400"
            },
            {
              agent: "4. Learning Roadmap Agent",
              desc: "Generates custom Daily, Weekly, and Monthly learning roadmaps calibrated to your daily hours.",
              icon: Calendar,
              color: "text-amber-400"
            },
            {
              agent: "5. Mock Interview Coach Agent",
              desc: "Conducts simulated HR, Technical, Behavioral, and Coding rounds with instant feedback.",
              icon: Mic,
              color: "text-emerald-400"
            },
            {
              agent: "6. Project Architect Agent",
              desc: "Generates production-grade capstone architectures, repo scaffolding, and deployment guides.",
              icon: Zap,
              color: "text-indigo-400"
            },
            {
              agent: "7. Certification Curator Agent",
              desc: "Ranks free, paid, and industry certifications by verified hiring ROI and preparation time.",
              icon: Award,
              color: "text-purple-400"
            },
            {
              agent: "8. Placement Readiness Agent",
              desc: "Evaluates 8 composite pillars (DSA, Projects, Resume, Aptitude) and matches target company tiers.",
              icon: CheckCircle2,
              color: "text-teal-400"
            },
            {
              agent: "9. Resource Recommender Agent",
              desc: "Contextually fetches top documentation, LeetCode drills, and open-source project references.",
              icon: Brain,
              color: "text-blue-400"
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="glass-panel-interactive p-5 rounded-2xl space-y-3">
                <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-slate-100">{item.agent}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Target User Callout */}
      <section className="glass-panel p-8 rounded-3xl border border-violet-500/20 bg-gradient-to-b from-violet-950/20 to-slate-950/60 text-center space-y-4">
        <h3 className="text-xl md:text-2xl font-bold text-white">
          Designed for Tomorrow&apos;s High-Impact Engineers
        </h3>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
          Whether you&apos;re an engineering student preparing for campus placements, a degree undergraduate aiming for your first tech job, or a career switcher pivoting into AI — the Navigator gives you clarity, accountability, and real-world execution.
        </p>
        <div className="pt-2">
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-all shadow-md"
          >
            <span>Begin Profile Assessment</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
