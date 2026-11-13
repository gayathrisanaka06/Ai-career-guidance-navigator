"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Building,
  Sparkles,
  TrendingUp,
  Target,
  ArrowRight,
  ShieldCheck,
  Zap,
  Briefcase
} from "lucide-react";
import { defaultPlacementReadiness } from "@/lib/mockData";
import { PlacementReadiness } from "@/lib/types";

export default function PlacementReadinessPage() {
  const [data, setData] = useState<PlacementReadiness>(defaultPlacementReadiness);

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-semibold text-teal-300 mb-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-teal-400" />
            <span>Placement Readiness Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Composite Placement Diagnostic</h1>
          <p className="text-slate-400 text-sm">
            Holistic index synthesized from DSA drills, project depth, ATS metrics, and mock rounds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="glass-panel px-6 py-3 rounded-2xl flex items-center gap-4 border border-teal-500/30 bg-slate-900/60">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                Placement Index
              </span>
              <span className="text-2xl font-black text-teal-400">{data.overall_score} / 100</span>
            </div>
            <div className="border-l border-slate-800 pl-4">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                Offer Probability
              </span>
              <span className="text-2xl font-black text-emerald-400">
                {data.placement_probability_percentage}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 8 Pillar Grid */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white">The 8 Placement Pillars</h2>
          <p className="text-xs text-slate-400">
            Weighted assessment determining placement eligibility for Tier 1 and Tier 2 tech firms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(data.breakdown).map(([pillar, score]) => (
            <div key={pillar} className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{pillar}</span>
                <span
                  className={`font-black ${
                    score >= 80 ? "text-emerald-400" : score >= 70 ? "text-amber-400" : "text-rose-400"
                  }`}
                >
                  {score}%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    score >= 80 ? "bg-emerald-400" : score >= 70 ? "bg-amber-400" : "bg-rose-400"
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Target Companies by Tier */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Building className="h-5 w-5 text-violet-400" />
            <span>Target Company Tier Matching</span>
          </h2>
          <p className="text-xs text-slate-400">
            Companies actively screening profiles with your current readiness profile and skill set.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(data.target_company_tiers).map(([tierName, companies], idx) => (
            <div key={tierName} className="glass-panel p-6 rounded-3xl space-y-4 border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-sm text-white">{tierName}</h3>
                <span className="text-[10px] font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">
                  Tier {idx + 1}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {companies.map((comp) => (
                  <span
                    key={comp}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 hover:border-violet-500/40 transition-colors"
                  >
                    {comp}
                  </span>
                ))}
              </div>

              <p className="text-[11px] text-slate-500 pt-1">
                {idx === 0
                  ? "Requires 80+ in DSA and system architecture rounds."
                  : idx === 1
                  ? "Values high-velocity execution and full-stack capstone projects."
                  : "Consistent academic baseline and aptitude test clearance."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
