"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GitCompare,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  Plus,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { defaultSkillGapAnalysis } from "@/lib/mockData";
import { SkillGapAnalysis } from "@/lib/types";

export default function SkillGapPage() {
  const [data, setData] = useState<SkillGapAnalysis>(defaultSkillGapAnalysis);
  const [bridgedSkills, setBridgedSkills] = useState<string[]>([]);

  const handleBridgeSkill = (skill: string) => {
    if (!bridgedSkills.includes(skill)) {
      setBridgedSkills([...bridgedSkills, skill]);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-300 mb-2">
            <GitCompare className="h-3.5 w-3.5 text-rose-400" />
            <span>Differential Competency Matrix</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Skill Gap Diagnostic: {data.target_role}
          </h1>
          <p className="text-slate-400 text-sm">
            Instant delta between your validated skills and recruiter expectations for top-tier placement.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="glass-panel px-4 py-2 rounded-2xl flex items-center gap-3 border border-violet-500/20">
            <span className="text-xs text-slate-400 font-medium">Readiness Match</span>
            <span className="text-xl font-black text-violet-400">{data.match_percentage}%</span>
          </div>
        </div>
      </div>

      {/* Verdict Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-950/20 to-slate-900/40 flex items-start gap-3">
        <Sparkles className="h-5 w-5 text-violet-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-xs font-bold text-violet-300 uppercase tracking-wider">
            AI Diagnostic Verdict
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{data.readiness_verdict}</p>
        </div>
      </div>

      {/* Skills Matrix: 2 Columns (Existing vs Missing) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Existing Skills (4 Cols) */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Verified Existing Skills</span>
            </h2>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              {data.existing_skills.length} Acquired
            </span>
          </div>

          <div className="space-y-2">
            {data.existing_skills.map((skill) => (
              <div
                key={skill}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
              >
                <span className="font-medium text-slate-200">{skill}</span>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  Proficient
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 italic pt-2">
            These foundational competencies satisfy baseline requirements. Maintain them with weekly problem solving.
          </p>
        </div>

        {/* Missing Skills (8 Cols) */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-rose-400" />
              <span>High-Priority Gaps to Bridge</span>
            </h2>
            <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
              {data.missing_skills.length} Missing
            </span>
          </div>

          <div className="space-y-3">
            {data.missing_skills.map((item) => {
              const isBridged = bridgedSkills.includes(item.skill);
              return (
                <div
                  key={item.skill}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-violet-500/30 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">{item.skill}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            item.importance === "Critical"
                              ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {item.importance} Priority #{item.priority}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 flex items-center gap-2">
                        <Clock className="h-3 w-3 text-slate-500" />
                        <span>Estimated time: {item.estimated_time_to_learn}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => handleBridgeSkill(item.skill)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
                        isBridged
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-violet-600 hover:bg-violet-500 text-white shadow-sm"
                      }`}
                    >
                      {isBridged ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Added to Roadmap</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5" />
                          <span>Bridge This Skill</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/60 text-slate-400">
                    <span className="text-[11px]">Recommended Resource: {item.suggested_resource}</span>
                    <a
                      href={`https://github.com/topics/${item.skill.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-400 hover:text-violet-300 inline-flex items-center gap-1 text-[11px]"
                    >
                      <span>Explore Docs</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <Link
              href="/roadmap"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-xs flex items-center gap-2 shadow-md hover:scale-[1.01] transition-all"
            >
              <span>View Synergized Learning Roadmap</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
