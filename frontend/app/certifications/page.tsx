"use client";

import { useState } from "react";
import {
  Medal,
  Award,
  ExternalLink,
  Clock,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  DollarSign
} from "lucide-react";
import { CertificationItem } from "@/lib/types";

const CERTS: CertificationItem[] = [
  {
    name: "AWS Certified Solutions Architect – Associate (SAA-C03)",
    issuer: "Amazon Web Services",
    type: "Industry Standard (Paid $150)",
    roi_score: 98,
    time_required: "6 - 8 weeks",
    official_url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    why_valuable: "The single most recognized cloud architecture credential. Proves deep understanding of multi-tier resilient microservices."
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation (CNCF)",
    type: "Industry Hands-on (Paid $395)",
    roi_score: 97,
    time_required: "8 - 10 weeks",
    official_url: "https://www.cncf.io/certification/cka/",
    why_valuable: "100% practical performance-based exam validating container orchestration and cluster management in high demand."
  },
  {
    name: "Deep Learning Specialization",
    issuer: "DeepLearning.AI / Andrew Ng",
    type: "Industry Coursework (Free Audit Available)",
    roi_score: 96,
    time_required: "2 - 3 months",
    official_url: "https://www.deeplearning.ai",
    why_valuable: "Gold-standard theoretical and mathematical foundation for neural networks, backpropagation, and transformer architectures."
  },
  {
    name: "Google Cloud Associate Cloud Engineer",
    issuer: "Google Cloud",
    type: "Industry Standard (Paid $125)",
    roi_score: 92,
    time_required: "4 - 6 weeks",
    official_url: "https://cloud.google.com/learn/certification/associate-cloud-engineer",
    why_valuable: "Validates ability to deploy applications, monitor operations, and manage enterprise Google Cloud resources."
  },
  {
    name: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta / Coursera",
    type: "Industry Coursework (Free Audit)",
    roi_score: 90,
    time_required: "2 months",
    official_url: "https://coursera.org",
    why_valuable: "Comprehensive curriculum covering React, design systems, and frontend algorithms evaluated by Meta engineers."
  },
  {
    name: "freeCodeCamp JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    type: "100% Free Open Certification",
    roi_score: 88,
    time_required: "4 weeks",
    official_url: "https://www.freecodecamp.org",
    why_valuable: "Proves hands-on algorithm mastery with 5 verified automated challenge projects."
  }
];

export default function CertificationsPage() {
  const [filterType, setFilterType] = useState<string>("All");

  const filteredCerts = CERTS.filter((c) => {
    if (filterType === "All") return true;
    if (filterType === "Free") return c.type.includes("Free");
    if (filterType === "Industry") return c.type.includes("Industry");
    return true;
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 mb-2">
            <Medal className="h-3.5 w-3.5 text-purple-400" />
            <span>High-Yield Credential Curator</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Curated Industry Certifications</h1>
          <p className="text-slate-400 text-sm">
            Ranked by verified recruitment ROI and recruiter screening weights.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex p-1 rounded-2xl bg-slate-900 border border-slate-800">
          {["All", "Industry", "Free"].map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filterType === f
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert, idx) => (
          <div
            key={idx}
            className="glass-panel-interactive p-6 rounded-3xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                  {cert.issuer}
                </span>
                <div className="flex items-center gap-1 font-extrabold text-sm text-emerald-400">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>{cert.roi_score}% ROI</span>
                </div>
              </div>

              <h3 className="font-bold text-base text-white leading-snug">{cert.name}</h3>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-cyan-400" />
                  {cert.time_required}
                </span>
                <span>•</span>
                <span className="text-slate-300 font-medium">{cert.type}</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                {cert.why_valuable}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <a
                href={cert.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>View Official Exam Curriculum</span>
                <ExternalLink className="h-3.5 w-3.5 text-purple-400" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
