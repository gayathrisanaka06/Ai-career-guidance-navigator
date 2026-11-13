"use client";

import Link from "next/link";
import { Sparkles, Compass, Flame, Award, Bell } from "lucide-react";

interface NavbarProps {
  currentRole?: string;
  currentXp?: number;
  streakDays?: number;
}

export default function Navbar({
  currentRole = "AI Engineer",
  currentXp = 1850,
  streakDays = 8
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 p-0.5 shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
            <div className="h-full w-full rounded-[10px] bg-slate-950 flex items-center justify-center">
              <Compass className="h-5 w-5 text-violet-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                CareerNavigator
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                AI Agent
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Autonomous Career Guidance Ecosystem</p>
          </div>
        </Link>

        {/* Target Role & Gamification Quick View */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400">Target Role:</span>
            <span className="font-semibold text-violet-300 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-cyan-400" />
              {currentRole}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-400">
              <Flame className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
              <span>{streakDays} Days</span>
            </div>

            {/* XP */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300">
              <Award className="h-3.5 w-3.5 text-violet-400" />
              <span>{currentXp} XP</span>
            </div>

            {/* Notification */}
            <button className="h-9 w-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <Bell className="h-4 w-4" />
            </button>

            {/* Student Avatar */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white shadow-md">
                AS
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-medium text-slate-200">Aarav Sharma</p>
                <p className="text-[10px] text-slate-400">NIT • B.Tech CSE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
