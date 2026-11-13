"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Brain,
  Sparkles,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  User,
  GraduationCap,
  Briefcase,
  Layers,
  ShieldCheck,
  Target
} from "lucide-react";
import { defaultStudentProfile, defaultAIProfile } from "@/lib/mockData";
import { fetchAIProfile } from "@/lib/api";
import { AIStudentProfile, StudentProfileInput } from "@/lib/types";

export default function OnboardingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<StudentProfileInput>(defaultStudentProfile);
  const [skillInput, setSkillInput] = useState("");
  const [interestInput, setInterestInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProfile, setGeneratedProfile] = useState<AIStudentProfile | null>(defaultAIProfile);

  const handleAddSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) });
  };

  const handleAddInterest = (interest: string) => {
    if (interest && !formData.interests.includes(interest)) {
      setFormData({ ...formData, interests: [...formData.interests, interest] });
      setInterestInput("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData({ ...formData, interests: formData.interests.filter((i) => i !== interest) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const result = await fetchAIProfile(formData);
      setGeneratedProfile(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-10 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300">
          <Brain className="h-3.5 w-3.5 text-cyan-400" />
          <span>Student Onboarding & Deep Profile Analysis</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          Build Your AI Career Identity
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Our specialized talent profiling agents synthesize your academics, project skills, and aspirations into an actionable psychometric and technical profile.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form (7 Cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-3xl space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <User className="h-5 w-5 text-violet-400" />
            <span>Academic & Profile Information</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-violet-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">College / University</label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-violet-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Degree & Branch</label>
              <input
                type="text"
                value={`${formData.degree} in ${formData.branch}`}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-violet-500 transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Current Year</label>
                <select
                  value={formData.current_year}
                  onChange={(e) => setFormData({ ...formData, current_year: parseInt(e.target.value) })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                >
                  <option value={1}>1st Year</option>
                  <option value={2}>2nd Year</option>
                  <option value={3}>3rd Year</option>
                  <option value={4}>4th Year</option>
                  <option value={5}>Graduate / Switcher</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">CGPA / Percentage</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Skills Input */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">
              Technical Skills (Type & hit enter, or pick suggestions)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Python, Docker, Next.js, PyTorch"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill(skillInput.trim());
                  }
                }}
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
              />
              <button
                type="button"
                onClick={() => handleAddSkill(skillInput.trim())}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-medium hover:bg-slate-700 text-slate-200"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-xs font-medium text-violet-300"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-rose-400 ml-1 text-slate-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300">Passions & Interests</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Autonomous Agents, Cloud Architecture, Design Systems"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddInterest(interestInput.trim());
                  }
                }}
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
              />
              <button
                type="button"
                onClick={() => handleAddInterest(interestInput.trim())}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-medium hover:bg-slate-700 text-slate-200"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {formData.interests.map((interest) => (
                <span
                  key={interest}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs font-medium text-cyan-300"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(interest)}
                    className="hover:text-rose-400 ml-1 text-slate-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Work Style & Career Goals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Preferred Work Style</label>
              <select
                value={formData.preferred_work_style}
                onChange={(e) => setFormData({ ...formData, preferred_work_style: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
              >
                <option value="Hybrid (Product Scaleup)">Hybrid (Product Scaleup)</option>
                <option value="100% Remote (Global Tech)">100% Remote (Global Tech)</option>
                <option value="Onsite (High-Intensity Innovation Hub)">Onsite (High-Intensity Innovation Hub)</option>
                <option value="Structured MNC / Corporate">Structured MNC / Corporate</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Preferred Location</label>
              <input
                type="text"
                value={formData.preferred_location}
                onChange={(e) => setFormData({ ...formData, preferred_location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          {/* Social Profiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">GitHub Profile URL</label>
              <input
                type="url"
                value={formData.github_url || ""}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                placeholder="https://github.com/yourhandle"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">LinkedIn Profile URL</label>
              <input
                type="url"
                value={formData.linkedin_url || ""}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                placeholder="https://linkedin.com/in/yourhandle"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 text-white font-semibold text-sm shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-4 w-4 animate-spin text-cyan-300" />
                <span>Multi-Agent Swarm Synthesizing Profile...</span>
              </>
            ) : (
              <>
                <Brain className="h-4 w-4" />
                <span>Analyze & Generate AI Career Profile</span>
              </>
            )}
          </button>
        </form>

        {/* Right Diagnosis Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {generatedProfile ? (
            <div className="glass-panel p-6 md:p-8 rounded-3xl space-y-6 border border-violet-500/20 bg-gradient-to-b from-slate-900/90 to-slate-950">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400">
                    AI Talent Diagnosis
                  </span>
                  <h3 className="text-xl font-bold text-white">{formData.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-emerald-400">
                    {generatedProfile.readiness_score}
                  </span>
                  <p className="text-[10px] text-slate-400">Readiness Score</p>
                </div>
              </div>

              {/* Personality & Learning Style */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Personality Summary
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {generatedProfile.personality_summary}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center gap-2.5">
                  <GraduationCap className="h-4 w-4 text-violet-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-violet-300 uppercase tracking-wider font-semibold">
                      Optimal Learning Style
                    </p>
                    <p className="text-xs font-medium text-slate-200">
                      {generatedProfile.learning_style}
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Strengths & Vulnerabilities */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Technical Strengths</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {generatedProfile.technical_strengths.map((str, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-300">
                        {str}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
                    <AlertCircle className="h-3.5 w-3.5 text-rose-400" />
                    <span>Identified Vulnerabilities & Skill Gaps</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {generatedProfile.weaknesses.map((w, idx) => (
                      <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Next Action CTA */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => router.push("/careers")}
                  className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>Explore Matched Career Pathways</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-3xl text-center space-y-3">
              <Sparkles className="h-8 w-8 text-violet-400 mx-auto" />
              <h3 className="font-semibold text-sm text-slate-200">Ready to Analyze</h3>
              <p className="text-xs text-slate-400">Fill in your profile details and click generate to initiate multi-agent diagnosis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
