"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Flame,
  Award,
  CheckCircle2,
  Calendar,
  FileText,
  Mic2,
  GitCompare,
  ArrowRight,
  TrendingUp,
  Target,
  Zap,
  BookOpen
} from "lucide-react";

import {
  defaultAIProfile,
  defaultCareerRecommendations,
  defaultPlacementReadiness,
  defaultPersonalizedRoadmap,
  defaultGamificationStatus
} from "@/lib/mockData";

export default function DashboardPage() {
  const [targetRole, setTargetRole] = useState("AI Engineer");
  const [placementData, setPlacementData] = useState(defaultPlacementReadiness);
  const [gamification, setGamification] = useState(defaultGamificationStatus);
  const [roadmap, setRoadmap] = useState(defaultPersonalizedRoadmap);

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden border border-violet-500/20 bg-gradient-to-r from-violet-950/40 via-slate-900/60 to-slate-950/80">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              <span>Target Role: {targetRole}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              Welcome back, Aarav!
            </h1>
            <p className="text-slate-400 text-sm max-w-xl">
              You are currently pacing <span className="text-emerald-400 font-semibold">+18% faster</span> than the median applicant cohort. 3 recommended actions today will elevate your Placement Readiness Score above 85.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/roadmap"
              className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs flex items-center gap-2 shadow-lg shadow-violet-600/20 transition-all"
            >
              <Calendar className="h-4 w-4" />
              <span>Open Today&apos;s Roadmap</span>
            </Link>
            <Link
              href="/interview"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium text-xs flex items-center gap-2 transition-all"
            >
              <Mic2 className="h-4 w-4 text-emerald-400" />
              <span>Start Mock Interview</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Placement Readiness */}
        <div className="glass-panel p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Placement Readiness</span>
            <Target className="h-4 w-4 text-violet-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">{placementData.overall_score}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full transition-all duration-1000"
              style={{ width: `${placementData.overall_score}%` }}
            />
          </div>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
            <TrendingUp className="h-3 w-3" />
            Top 15% Placement Bracket
          </p>
        </div>

        {/* Current Streak */}
        <div className="glass-panel p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Active Learning Streak</span>
            <Flame className="h-4 w-4 text-amber-500 animate-pulse" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">{gamification.current_streak_days}</span>
            <span className="text-xs text-slate-400">Days</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full w-4/5" />
          </div>
          <p className="text-[11px] text-amber-300 font-medium">
            Next milestone at 14 days (+200 XP)
          </p>
        </div>

        {/* Total XP & Level */}
        <div className="glass-panel p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Gamification Level</span>
            <Award className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">Level {gamification.current_level}</span>
            <span className="text-xs text-slate-400">{gamification.current_xp} XP</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-cyan-400 h-full rounded-full w-3/4" />
          </div>
          <p className="text-[11px] text-cyan-300 font-medium">
            Rank #{gamification.leaderboard_rank} on College Leaderboard
          </p>
        </div>

        {/* Roadmap Progress */}
        <div className="glass-panel p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Roadmap Completion</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">28%</span>
            <span className="text-xs text-slate-400">Day 14 of 90</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full w-[28%]" />
          </div>
          <p className="text-[11px] text-slate-400 font-medium">
            Next capstone evaluation in 16 days
          </p>
        </div>
      </div>

      {/* Main Grid: Breakdown & Daily Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Placement Pillar Radar Breakdown */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">Placement Readiness Pillars</h2>
              <p className="text-xs text-slate-400">Comprehensive breakdown across all 8 hiring dimensions</p>
            </div>
            <Link
              href="/placement"
              className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 font-medium"
            >
              <span>View Full Diagnostic</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {Object.entries(placementData.breakdown).map(([pillar, score]) => (
              <div key={pillar} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-300">{pillar}</span>
                  <span className={`font-bold ${score >= 80 ? "text-emerald-400" : score >= 70 ? "text-amber-400" : "text-rose-400"}`}>
                    {score}%
                  </span>
                </div>
                <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
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

          {/* Critical Next Actions */}
          <div className="pt-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              AI Recommended Action Items Today
            </h3>
            <div className="space-y-2">
              {placementData.critical_action_items.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-violet-500/5 border border-violet-500/10 text-xs text-slate-300">
                  <Zap className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Daily Challenges & Quick Launch */}
        <div className="space-y-6">
          {/* Daily Challenges */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="h-4 w-4 text-amber-500" />
                <span>Daily Quests</span>
              </h2>
              <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                +190 XP Total
              </span>
            </div>

            <div className="space-y-2.5">
              {gamification.daily_challenges.map((ch) => (
                <div
                  key={ch.id}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                    ch.completed
                      ? "bg-emerald-500/5 border-emerald-500/20 text-slate-400"
                      : "bg-slate-900/60 border-slate-800 text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] ${
                      ch.completed ? "bg-emerald-500/20 text-emerald-400" : "border border-slate-700"
                    }`}>
                      {ch.completed && "✓"}
                    </div>
                    <span className={ch.completed ? "line-through text-slate-500" : ""}>{ch.title}</span>
                  </div>
                  <span className="font-semibold text-violet-400 shrink-0 ml-2">+{ch.xp} XP</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Navigator Hub */}
          <div className="glass-panel p-6 rounded-3xl space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Module Quick Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/resume"
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-violet-500/40 text-left transition-all group"
              >
                <FileText className="h-4 w-4 text-cyan-400 mb-1 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-slate-200">Resume ATS</p>
                <p className="text-[10px] text-slate-400">Score & Rewrites</p>
              </Link>
              <Link
                href="/skill-gap"
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-violet-500/40 text-left transition-all group"
              >
                <GitCompare className="h-4 w-4 text-rose-400 mb-1 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-slate-200">Skill Gap</p>
                <p className="text-[10px] text-slate-400">Bridge Missing</p>
              </Link>
              <Link
                href="/projects"
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-violet-500/40 text-left transition-all group"
              >
                <Zap className="h-4 w-4 text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-slate-200">Project Studio</p>
                <p className="text-[10px] text-slate-400">Capstones & Repos</p>
              </Link>
              <Link
                href="/mentor"
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-violet-500/40 text-left transition-all group"
              >
                <BookOpen className="h-4 w-4 text-violet-400 mb-1 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-slate-200">AI Mentor</p>
                <p className="text-[10px] text-slate-400">Ask Anything</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
