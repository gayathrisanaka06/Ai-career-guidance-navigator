"use client";

import { useState } from "react";
import {
  Trophy,
  Flame,
  Award,
  CheckCircle2,
  Sparkles,
  Zap,
  Target,
  Users,
  ShieldAlert
} from "lucide-react";
import { defaultGamificationStatus } from "@/lib/mockData";
import { GamificationStatus } from "@/lib/types";

const LEADERBOARD = [
  { rank: 1, name: "Sneha Reddy", college: "IIT Madras", xp: 4850, streak: 28, badge: "Grandmaster" },
  { rank: 2, name: "Rohan Verma", college: "BITS Pilani", xp: 4420, streak: 24, badge: "Master" },
  { rank: 3, name: "Priya Nair", college: "NIT Trichy", xp: 3950, streak: 21, badge: "Master" },
  { rank: 4, name: "Vikram Malhotra", college: "IIIT Hyderabad", xp: 3600, streak: 18, badge: "Expert" },
  { rank: 12, name: "Aarav Sharma (You)", college: "NIT Surathkal", xp: 1850, streak: 8, badge: "Explorer" },
  { rank: 13, name: "Tanvi Joshi", college: "DTU Delhi", xp: 1820, streak: 7, badge: "Explorer" },
];

export default function GamificationPage() {
  const [status, setStatus] = useState<GamificationStatus>(defaultGamificationStatus);

  const handleCompleteChallenge = (id: string, xpGain: number) => {
    setStatus((prev) => ({
      ...prev,
      current_xp: prev.current_xp + xpGain,
      daily_challenges: prev.daily_challenges.map((ch) =>
        ch.id === id ? { ...ch, completed: true } : ch
      )
    }));
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300 mb-2">
          <Trophy className="h-3.5 w-3.5 text-amber-400" />
          <span>Gamification & Placement Accountability Engine</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">XP, Badges & Leaderboards</h1>
        <p className="text-slate-400 text-sm">
          Stay consistent, complete daily interview and code challenges, and climb the placement leaderboards.
        </p>
      </div>

      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* XP Card */}
        <div className="glass-panel p-6 rounded-3xl space-y-3 border border-violet-500/20 bg-gradient-to-b from-violet-950/20 to-slate-900/60">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Level {status.current_level}</span>
            <Award className="h-5 w-5 text-violet-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{status.current_xp}</span>
            <span className="text-xs text-slate-400">Total XP</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full rounded-full w-3/4" />
          </div>
          <p className="text-[11px] text-violet-300">150 XP to Level {status.current_level + 1}</p>
        </div>

        {/* Streak Card */}
        <div className="glass-panel p-6 rounded-3xl space-y-3 border border-amber-500/20 bg-gradient-to-b from-amber-950/20 to-slate-900/60">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Learning Streak</span>
            <Flame className="h-5 w-5 text-amber-500 animate-pulse" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-amber-400">{status.current_streak_days}</span>
            <span className="text-xs text-slate-400">Consecutive Days</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full w-4/5" />
          </div>
          <p className="text-[11px] text-amber-300">6 days remaining for 14-Day Flame Badge</p>
        </div>

        {/* Leaderboard Rank Card */}
        <div className="glass-panel p-6 rounded-3xl space-y-3 border border-cyan-500/20 bg-gradient-to-b from-cyan-950/20 to-slate-900/60">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Cohort Standing</span>
            <Trophy className="h-5 w-5 text-cyan-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-cyan-300">#{status.leaderboard_rank}</span>
            <span className="text-xs text-slate-400">Rank of 450+</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div className="bg-cyan-400 h-full rounded-full w-[88%]" />
          </div>
          <p className="text-[11px] text-cyan-300">Top 5% among engineering peers</p>
        </div>
      </div>

      {/* Badges Showcase & Daily Quests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Badges (7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-violet-400" />
              <span>Earned Placement Milestone Badges</span>
            </h2>
            <p className="text-xs text-slate-400">
              Badges verify core milestones completed across coding, resume polish, and interviews.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {status.badges_earned.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 flex flex-col justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{b.icon}</span>
                  <div>
                    <h3 className="font-bold text-xs text-white">{b.name}</h3>
                    <span className="text-[10px] text-emerald-400 font-semibold">Unlocked</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">{b.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Daily Quests (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 md:p-8 rounded-3xl space-y-5 border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-400" />
                <span>Today&apos;s Active Quests</span>
              </h2>
              <p className="text-[11px] text-slate-400">Complete daily tasks to accrue XP</p>
            </div>
          </div>

          <div className="space-y-3">
            {status.daily_challenges.map((ch) => (
              <div
                key={ch.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  ch.completed
                    ? "bg-emerald-500/5 border-emerald-500/20 text-slate-400"
                    : "bg-slate-900/80 border-slate-800 text-slate-200"
                }`}
              >
                <div className="space-y-1">
                  <p className={`text-xs font-medium ${ch.completed ? "line-through text-slate-500" : "text-white"}`}>
                    {ch.title}
                  </p>
                  <span className="text-[10px] text-violet-400 font-semibold block">+{ch.xp} XP Reward</span>
                </div>

                {!ch.completed ? (
                  <button
                    onClick={() => handleCompleteChallenge(ch.id, ch.xp)}
                    className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-[11px] font-semibold transition-all shrink-0"
                  >
                    Claim XP
                  </button>
                ) : (
                  <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                    Done
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* College & Global Leaderboard Table */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl space-y-6 border border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-cyan-400" />
              <span>National Engineering Cohort Leaderboard</span>
            </h2>
            <p className="text-xs text-slate-400">Ranked by verified XP earned through placement milestones</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">College</th>
                <th className="py-3 px-4">Placement Streak</th>
                <th className="py-3 px-4">XP Score</th>
                <th className="py-3 px-4 text-right">Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {LEADERBOARD.map((user) => {
                const isMe = user.name.includes("You");
                return (
                  <tr
                    key={user.rank}
                    className={`transition-colors ${
                      isMe ? "bg-violet-500/10 font-semibold text-violet-300" : "hover:bg-slate-900/50 text-slate-300"
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold">
                      {user.rank <= 3 ? (
                        <span className="h-6 w-6 rounded-full bg-amber-500/20 text-amber-400 inline-flex items-center justify-center text-xs">
                          {user.rank}
                        </span>
                      ) : (
                        `#${user.rank}`
                      )}
                    </td>
                    <td className="py-3.5 px-4">{user.name}</td>
                    <td className="py-3.5 px-4 text-slate-400">{user.college}</td>
                    <td className="py-3.5 px-4">
                      <span className="flex items-center gap-1 text-amber-400 font-medium">
                        <Flame className="h-3.5 w-3.5" />
                        {user.streak} Days
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">{user.xp} XP</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
                        {user.badge}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
