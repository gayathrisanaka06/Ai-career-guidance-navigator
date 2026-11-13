"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock,
  Target,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Sliders,
  ChevronRight,
  BookOpen,
  Code
} from "lucide-react";
import { defaultPersonalizedRoadmap } from "@/lib/mockData";
import { PersonalizedRoadmap } from "@/lib/types";

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<PersonalizedRoadmap>(defaultPersonalizedRoadmap);
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly">("daily");
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [targetDays, setTargetDays] = useState(90);
  const [learningStyle, setLearningStyle] = useState("Project-Based");
  const [completedDailyTasks, setCompletedDailyTasks] = useState<number[]>([1, 2]);

  const toggleTask = (day: number) => {
    if (completedDailyTasks.includes(day)) {
      setCompletedDailyTasks(completedDailyTasks.filter((d) => d !== day));
    } else {
      setCompletedDailyTasks([...completedDailyTasks, day]);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300 mb-2">
            <CalendarDays className="h-3.5 w-3.5 text-cyan-400" />
            <span>AI Curriculum Architect</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Personalized Learning Roadmap
          </h1>
          <p className="text-slate-400 text-sm">
            Calibrated for <span className="text-violet-300 font-semibold">{roadmap.target_role}</span> • {hoursPerDay} hrs/day • {targetDays}-Day Placement Countdown
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex p-1 rounded-2xl bg-slate-900 border border-slate-800">
          {(["daily", "weekly", "monthly"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? "bg-violet-600 text-white shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab} Plan
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
        {/* Hours / day */}
        <div className="space-y-2">
          <div className="flex justify-between font-medium">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-cyan-400" />
              Available Time
            </span>
            <span className="text-white font-bold">{hoursPerDay} Hours / Day</span>
          </div>
          <input
            type="range"
            min="1"
            max="8"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(parseInt(e.target.value))}
            className="w-full accent-violet-500 cursor-pointer"
          />
        </div>

        {/* Target Days */}
        <div className="space-y-2">
          <div className="flex justify-between font-medium">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5 text-violet-400" />
              Placement Countdown
            </span>
            <span className="text-white font-bold">{targetDays} Days</span>
          </div>
          <input
            type="range"
            min="30"
            max="180"
            step="15"
            value={targetDays}
            onChange={(e) => setTargetDays(parseInt(e.target.value))}
            className="w-full accent-violet-500 cursor-pointer"
          />
        </div>

        {/* Learning Style */}
        <div className="space-y-1.5">
          <label className="text-slate-400 font-medium flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-indigo-400" />
            Learning Mode
          </label>
          <select
            value={learningStyle}
            onChange={(e) => setLearningStyle(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-violet-500"
          >
            <option value="Project-Based">Project-Based (Build & Ship)</option>
            <option value="Interview-First">Interview-First (Heavy DSA & System Design)</option>
            <option value="Conceptual-First">Conceptual Rigor & Theory</option>
          </select>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "daily" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-violet-400" />
              <span>Current Week Sprint Schedule</span>
            </h2>
            <span className="text-xs text-slate-400">
              {completedDailyTasks.length} / {roadmap.daily_schedule.length} Completed
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {roadmap.daily_schedule.map((task) => {
              const isDone = completedDailyTasks.includes(task.day);
              return (
                <div
                  key={task.day}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                    isDone
                      ? "bg-slate-900/40 border-slate-800/60 opacity-80"
                      : "glass-panel-interactive border-slate-800"
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.day)}
                    className={`h-6 w-6 rounded-lg mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                      isDone
                        ? "bg-emerald-500 text-slate-950 font-bold"
                        : "border border-slate-700 hover:border-violet-400"
                    }`}
                  >
                    {isDone && "✓"}
                  </button>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-violet-400">Day {task.day}</span>
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full font-medium">
                          {task.time_slot}
                        </span>
                      </div>
                      <a
                        href={task.resource_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-medium"
                      >
                        <span>Open Exercise</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>

                    <h3 className={`text-sm font-semibold ${isDone ? "line-through text-slate-400" : "text-white"}`}>
                      {task.task_title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{task.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "weekly" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadmap.weekly_modules.map((mod) => (
            <div key={mod.week_number} className="glass-panel p-6 rounded-3xl space-y-4 border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">
                  Week {mod.week_number}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  Active Sprint
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{mod.focus_topic}</h3>

              <div className="space-y-2 text-xs">
                <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                  Target Deliverables
                </span>
                <ul className="space-y-1">
                  {mod.outcomes.map((out, idx) => (
                    <li key={idx} className="text-slate-300 flex items-start gap-2">
                      <span className="text-violet-400 mt-0.5">▪</span>
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Code className="h-3 w-3 text-cyan-400" />
                  <span>Weekly Mini-Project</span>
                </span>
                <p className="text-slate-200 font-medium">{mod.mini_project}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "monthly" && (
        <div className="space-y-6">
          {roadmap.monthly_milestones.map((milestone) => (
            <div
              key={milestone.month_number}
              className="glass-panel p-6 md:p-8 rounded-3xl border border-violet-500/20 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-8 w-8 rounded-xl bg-violet-600/20 text-violet-300 border border-violet-500/30 flex items-center justify-center font-bold text-sm">
                    M{milestone.month_number}
                  </span>
                  <div>
                    <h3 className="font-bold text-base text-white">{milestone.theme}</h3>
                    <p className="text-xs text-slate-400">Placement Benchmark Milestone</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Deliverable Capstone
                  </span>
                  <p className="font-semibold text-slate-200">{milestone.deliverable_capstone}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Passing Evaluation Criteria
                  </span>
                  <p className="font-semibold text-emerald-300">{milestone.evaluation_criteria}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
