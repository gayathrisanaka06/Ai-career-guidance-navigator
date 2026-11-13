"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserCheck,
  Compass,
  GitCompare,
  CalendarDays,
  FolderGit2,
  Medal,
  FileText,
  Mic2,
  CheckCircle2,
  MessageSquareCode,
  Trophy,
  ChevronRight
} from "lucide-react";

const NAV_SECTIONS = [
  {
    category: "AI Discovery & Strategy",
    items: [
      { name: "Progress Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Student Profile", href: "/onboarding", icon: UserCheck },
      { name: "Career Recommendations", href: "/careers", icon: Compass },
      { name: "Skill Gap Diagnostic", href: "/skill-gap", icon: GitCompare },
    ]
  },
  {
    category: "Learning & Portfolio",
    items: [
      { name: "Personalized Roadmap", href: "/roadmap", icon: CalendarDays },
      { name: "Project Studio", href: "/projects", icon: FolderGit2 },
      { name: "Certifications", href: "/certifications", icon: Medal },
    ]
  },
  {
    category: "Placement Readiness",
    items: [
      { name: "Resume ATS Analyzer", href: "/resume", icon: FileText },
      { name: "AI Mock Interview", href: "/interview", icon: Mic2 },
      { name: "Readiness Index", href: "/placement", icon: CheckCircle2 },
    ]
  },
  {
    category: "Mentorship & Community",
    items: [
      { name: "AI Mentor Chat", href: "/mentor", icon: MessageSquareCode },
      { name: "Gamification & XP", href: "/gamification", icon: Trophy },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 hidden md:block border-r border-slate-800/80 bg-slate-950/50 backdrop-blur-xl min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-6">
        {NAV_SECTIONS.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            <h3 className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {section.category}
            </h3>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-violet-600/20 to-indigo-600/10 text-violet-300 border border-violet-500/30 shadow-sm"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`h-4 w-4 ${isActive ? "text-violet-400" : "text-slate-400"}`} />
                      <span>{item.name}</span>
                    </div>
                    {isActive && <ChevronRight className="h-3 w-3 text-violet-400" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
