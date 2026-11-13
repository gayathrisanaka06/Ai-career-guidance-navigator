"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Sparkles,
  TrendingUp,
  DollarSign,
  Briefcase,
  GitCompare,
  ArrowRight,
  CheckCircle2,
  Building,
  BarChart3,
  HelpCircle
} from "lucide-react";
import { defaultCareerRecommendations } from "@/lib/mockData";
import { CareerRecommendation } from "@/lib/types";

export default function CareersPage() {
  const [careers, setCareers] = useState<CareerRecommendation[]>(defaultCareerRecommendations);
  const [selectedRole, setSelectedRole] = useState<CareerRecommendation>(defaultCareerRecommendations[0]);
  const [compareRole, setCompareRole] = useState<CareerRecommendation>(defaultCareerRecommendations[1]);
  const [isComparing, setIsComparing] = useState(false);

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300 mb-2">
            <Compass className="h-3.5 w-3.5 text-cyan-400" />
            <span>AI Career Recommendation Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Recommended Career Horizons</h1>
          <p className="text-slate-400 text-sm">
            Ranked by multi-parameter match against your skills, passions, and market hiring velocity.
          </p>
        </div>

        <button
          onClick={() => setIsComparing(!isComparing)}
          className={`px-4 py-2.5 rounded-xl font-medium text-xs flex items-center gap-2 transition-all ${
            isComparing
              ? "bg-violet-600 text-white"
              : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          }`}
        >
          <GitCompare className="h-4 w-4" />
          <span>{isComparing ? "Exit Comparison View" : "One-Click Career Comparison"}</span>
        </button>
      </div>

      {/* Comparison View Modal / Section */}
      {isComparing && (
        <div className="glass-panel p-6 rounded-3xl border border-violet-500/30 bg-gradient-to-r from-violet-950/20 via-slate-900/60 to-slate-950/80 space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <GitCompare className="h-5 w-5 text-violet-400" />
              <span>Side-by-Side Career Evaluation</span>
            </h2>
            <span className="text-xs text-slate-400">Select roles to compare</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Role */}
            <div className="space-y-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <select
                value={selectedRole.id}
                onChange={(e) => {
                  const found = careers.find((c) => c.id === e.target.value);
                  if (found) setSelectedRole(found);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm font-semibold text-white focus:outline-none focus:border-violet-500"
              >
                {careers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.match_percentage}% Match)
                  </option>
                ))}
              </select>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400">Salary Range:</span>
                  <p className="font-semibold text-emerald-400">{selectedRole.salary_range}</p>
                </div>
                <div>
                  <span className="text-slate-400">Hiring Demand:</span>
                  <p className="font-semibold text-cyan-300">{selectedRole.job_demand}</p>
                </div>
                <div>
                  <span className="text-slate-400">Future 5-Year Outlook:</span>
                  <p className="font-semibold text-indigo-300">{selectedRole.future_growth}</p>
                </div>
                <div>
                  <span className="text-slate-400">Learning Curve:</span>
                  <p className="font-semibold text-amber-300">{selectedRole.learning_difficulty}</p>
                </div>
                <div>
                  <span className="text-slate-400">Core Required Stack:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedRole.required_skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Role */}
            <div className="space-y-4 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <select
                value={compareRole.id}
                onChange={(e) => {
                  const found = careers.find((c) => c.id === e.target.value);
                  if (found) setCompareRole(found);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-sm font-semibold text-white focus:outline-none focus:border-violet-500"
              >
                {careers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.match_percentage}% Match)
                  </option>
                ))}
              </select>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400">Salary Range:</span>
                  <p className="font-semibold text-emerald-400">{compareRole.salary_range}</p>
                </div>
                <div>
                  <span className="text-slate-400">Hiring Demand:</span>
                  <p className="font-semibold text-cyan-300">{compareRole.job_demand}</p>
                </div>
                <div>
                  <span className="text-slate-400">Future 5-Year Outlook:</span>
                  <p className="font-semibold text-indigo-300">{compareRole.future_growth}</p>
                </div>
                <div>
                  <span className="text-slate-400">Learning Curve:</span>
                  <p className="font-semibold text-amber-300">{compareRole.learning_difficulty}</p>
                </div>
                <div>
                  <span className="text-slate-400">Core Required Stack:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {compareRole.required_skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Career Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {careers.map((career) => (
          <div
            key={career.id}
            className="glass-panel-interactive p-6 rounded-3xl space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400">
                    {career.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{career.title}</h3>
                </div>
                <div className="text-right shrink-0">
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold text-sm">
                    <Sparkles className="h-3 w-3" />
                    <span>{career.match_percentage}%</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Match Affinity</p>
                </div>
              </div>

              {/* Why it matches */}
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3.5 rounded-xl border border-slate-800/80">
                {career.why_it_matches}
              </p>

              {/* Badges / Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Avg Salary</span>
                  <span className="font-semibold text-emerald-400">{career.salary_range}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Job Demand</span>
                  <span className="font-semibold text-cyan-300">{career.job_demand}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">5-Yr Growth</span>
                  <span className="font-semibold text-indigo-300">{career.future_growth}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Learning Difficulty</span>
                  <span className="font-semibold text-amber-300">{career.learning_difficulty}</span>
                </div>
              </div>

              {/* Required Skills */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Required Competencies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {career.required_skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/70 text-slate-300 text-xs font-medium border border-slate-700/50"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Companies */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Building className="h-3 w-3 text-slate-400" />
                  <span>Target Hiring Companies</span>
                </span>
                <p className="text-xs text-slate-400">
                  {career.recommended_companies.join(" • ")}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
              <Link
                href="/skill-gap"
                className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Run Skill Gap Diagnostic</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/roadmap"
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-medium text-xs transition-all"
              >
                <span>Roadmap</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
