"use client";

import { useState } from "react";
import {
  FileText,
  Sparkles,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Zap,
  Copy
} from "lucide-react";
import { defaultResumeAnalysis } from "@/lib/mockData";
import { analyzeResumeText } from "@/lib/api";
import { ResumeAnalysis } from "@/lib/types";

export default function ResumePage() {
  const [resumeText, setResumeText] = useState(
    "Aarav Sharma | B.Tech CSE (CGPA: 8.7)\nSkills: Python, FastAPI, React, PostgreSQL, Git, Docker, REST APIs, DSA\nExperience & Projects:\n- Developed an AI application using Python that searches documents.\n- Worked on a full stack web app in React and Node for campus event registration.\n- Solved 120+ coding questions on algorithms."
  );
  const [targetRole, setTargetRole] = useState("Software Engineer");
  const [isScanning, setIsScanning] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis>(defaultResumeAnalysis);

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const res = await analyzeResumeText(resumeText, targetRole);
      setAnalysis(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 mb-2">
            <FileText className="h-3.5 w-3.5 text-cyan-400" />
            <span>AI Resume Diagnostic & ATS Optimizer</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Resume ATS Scanner</h1>
          <p className="text-slate-400 text-sm">
            Tuned against modern enterprise Applicant Tracking Systems (Workday, Greenhouse, Lever).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="glass-panel px-5 py-2.5 rounded-2xl flex items-center gap-3 border border-cyan-500/30 bg-slate-900/60">
            <span className="text-xs text-slate-400 font-medium">ATS Match Score</span>
            <span className="text-2xl font-black text-cyan-400">{analysis.overall_score}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Input (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <UploadCloud className="h-4 w-4 text-violet-400" />
              <span>Resume Content Input</span>
            </h2>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-violet-500"
            >
              <option value="Software Engineer">Software Engineer</option>
              <option value="AI Engineer">AI Engineer</option>
              <option value="Data Engineer">Data Engineer</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">
              Paste Resume Markdown / Plain Text
            </label>
            <textarea
              rows={12}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed resize-none"
              placeholder="Paste your resume contents here..."
            />
          </div>

          <button
            onClick={handleScan}
            disabled={isScanning}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isScanning ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Running ATS Heuristics...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Run Real-Time ATS Evaluation</span>
              </>
            )}
          </button>
        </div>

        {/* Right Diagnostic Breakdown (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Sub-Score Bars */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-white">Multi-Factor ATS Breakdown</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Layout & Formatting", score: analysis.breakdown.formatting_score },
                { label: "Action Verbs", score: analysis.breakdown.action_verbs_score },
                { label: "Metrics & Data", score: analysis.breakdown.quantifiable_metrics_score },
                { label: "Keyword Density", score: analysis.breakdown.keyword_alignment_score },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] text-slate-400 block leading-tight">{item.label}</span>
                  <span className={`text-xl font-extrabold ${item.score >= 80 ? "text-emerald-400" : item.score >= 70 ? "text-amber-400" : "text-rose-400"}`}>
                    {item.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Keywords & Detected Skills */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>Missing Recruiter Keywords (Add These)</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {analysis.missing_keywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs font-medium text-rose-300">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Detected Technical Skills</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {analysis.detected_skills.map((sk, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-300">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Before & After STAR Rewrites */}
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>AI Bullet Point Enhancer (STAR Transformation)</span>
            </h3>

            <div className="space-y-3">
              {analysis.bullet_point_improvements.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-rose-400 uppercase tracking-wider">Before (Weak)</span>
                    <p className="text-slate-400 italic bg-slate-950/50 p-2 rounded-lg border border-slate-800/80">
                      {item.before}
                    </p>
                  </div>
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      <span>Optimized STAR Formulation (High-Impact)</span>
                    </span>
                    <p className="text-slate-200 font-medium bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/20">
                      {item.after}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
