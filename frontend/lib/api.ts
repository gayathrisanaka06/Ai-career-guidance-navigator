import {
  StudentProfileInput,
  AIStudentProfile,
  CareerRecommendation,
  SkillGapAnalysis,
  PersonalizedRoadmap,
  ResumeAnalysis,
  ProjectRecommendation,
  CertificationItem,
  MockInterviewQuestion,
  MockInterviewEvaluation,
  PlacementReadiness,
  GamificationStatus
} from "./types";

import {
  defaultAIProfile,
  defaultCareerRecommendations,
  defaultSkillGapAnalysis,
  defaultPersonalizedRoadmap,
  defaultResumeAnalysis,
  defaultPlacementReadiness,
  defaultGamificationStatus
} from "./mockData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function fetchAIProfile(profile: StudentProfileInput): Promise<AIStudentProfile> {
  try {
    const res = await fetch(`${API_BASE_URL}/profile/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    });
    if (!res.ok) throw new Error("API call failed");
    return await res.json();
  } catch (e) {
    console.warn("Using fallback profile:", e);
    return defaultAIProfile;
  }
}

export async function fetchCareerRecommendations(profile: StudentProfileInput): Promise<CareerRecommendation[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/careers/recommend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    });
    if (!res.ok) throw new Error("API call failed");
    return await res.json();
  } catch (e) {
    console.warn("Using fallback careers:", e);
    return defaultCareerRecommendations;
  }
}

export async function fetchSkillGap(skills: string[], targetRoleId: string): Promise<SkillGapAnalysis> {
  try {
    const res = await fetch(`${API_BASE_URL}/skills/gap-analysis`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills, target_role_id: targetRoleId })
    });
    if (!res.ok) throw new Error("API call failed");
    return await res.json();
  } catch (e) {
    console.warn("Using fallback skill gap:", e);
    return defaultSkillGapAnalysis;
  }
}

export async function fetchRoadmap(targetRole: string, hoursPerDay: number, targetDays: number, learningStyle: string): Promise<PersonalizedRoadmap> {
  try {
    const res = await fetch(`${API_BASE_URL}/roadmap/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        target_role: targetRole,
        hours_per_day: hoursPerDay,
        target_days: targetDays,
        learning_style: learningStyle
      })
    });
    if (!res.ok) throw new Error("API call failed");
    return await res.json();
  } catch (e) {
    console.warn("Using fallback roadmap:", e);
    return defaultPersonalizedRoadmap;
  }
}

export async function analyzeResumeText(resumeText: string, targetRole: string): Promise<ResumeAnalysis> {
  try {
    const res = await fetch(`${API_BASE_URL}/resume/analyze-text`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume_text: resumeText, target_role: targetRole })
    });
    if (!res.ok) throw new Error("API call failed");
    return await res.json();
  } catch (e) {
    console.warn("Using fallback resume analysis:", e);
    return defaultResumeAnalysis;
  }
}

export async function getProjectRecommendations(roleId: string): Promise<ProjectRecommendation[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects/recommend/${roleId}`);
    if (!res.ok) throw new Error("API call failed");
    return await res.json();
  } catch (e) {
    console.warn("Using fallback projects:", e);
    return [
      {
        title: "Autonomous Enterprise RAG Agent with Hybrid Retrieval",
        difficulty: "Advanced",
        technologies: ["Python", "FastAPI", "Gemini 2.5", "ChromaDB", "Docker"],
        estimated_time: "3 weeks",
        resume_value_score: 96,
        overview: "Architect an end-to-end RAG system with hallucination metrics, hybrid search, and production Docker containerization.",
        github_structure: "app/\n  ├── api/\n  ├── core/\n  └── main.py\nDockerfile\ndocker-compose.yml",
        step_by_step_guide: [
          "Chunk documents using recursive text splitter with 200 token overlap",
          "Index into ChromaDB vector database with dense cosine distance",
          "Synthesize grounded answers using Gemini Flash with verified citations",
          "Containerize using multi-stage Dockerfile and push to GitHub"
        ],
        deployment_guide: "Deploy to Render or Railway with automated GitHub Actions workflow."
      }
    ];
  }
}

export async function getCertifications(roleId: string): Promise<CertificationItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/certifications/recommend/${roleId}`);
    if (!res.ok) throw new Error("API call failed");
    return await res.json();
  } catch (e) {
    console.warn("Using fallback certs:", e);
    return [
      {
        name: "Deep Learning Specialization",
        issuer: "DeepLearning.AI / Andrew Ng",
        type: "Industry Standard (Free Audit)",
        roi_score: 96,
        time_required: "2 months",
        official_url: "https://www.deeplearning.ai",
        why_valuable: "Gold standard foundation for neural networks, transformers, and ML optimization."
      },
      {
        name: "AWS Certified Solutions Architect – Associate",
        issuer: "Amazon Web Services",
        type: "Industry (Paid $150)",
        roi_score: 98,
        time_required: "6 - 8 weeks",
        official_url: "https://aws.amazon.com",
        why_valuable: "Globally recognized proof of resilient cloud and distributed architecture knowledge."
      }
    ];
  }
}

export async function getInterviewQuestion(roundType: string, targetRole: string): Promise<MockInterviewQuestion> {
  try {
    const res = await fetch(`${API_BASE_URL}/interview/question?round_type=${encodeURIComponent(roundType)}&target_role=${encodeURIComponent(targetRole)}`);
    if (!res.ok) throw new Error("API call failed");
    return await res.json();
  } catch (e) {
    return {
      id: "fallback-q",
      round_type: roundType,
      question: `Explain how you would optimize a high-throughput API endpoint in ${targetRole} to reduce latency and handle concurrent spikes.`,
      ideal_focus_points: [
        "Caching strategy (Redis / in-memory)",
        "Database indexing & connection pooling",
        "Asynchronous task queues"
      ]
    };
  }
}

export async function evaluateInterview(question: string, roundType: string, studentAnswer: string, targetRole: string): Promise<MockInterviewEvaluation> {
  try {
    const res = await fetch(`${API_BASE_URL}/interview/evaluate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        round_type: roundType,
        student_answer: studentAnswer,
        target_role: targetRole
      })
    });
    if (!res.ok) throw new Error("API call failed");
    return await res.json();
  } catch (e) {
    return {
      technical_accuracy: 8,
      confidence_tone: 8,
      communication_clarity: 9,
      completeness: 8,
      overall_round_score: 82,
      strengths: [
        "Structured thought process with clear terminology.",
        "Demonstrated understanding of core latency drivers."
      ],
      areas_for_improvement: [
        "Use the STAR method to connect theory to a personal project experience.",
        "Mention quantitative metrics (e.g. p99 latency reduction from 450ms to 80ms)."
      ],
      model_answer: "An ideal response begins with identifying bottlenecks (network I/O, DB query time), proposes caching and connection pooling, and verifies with profiling tools."
    };
  }
}

export async function fetchPlacementReadiness(profile: StudentProfileInput, targetRole: string): Promise<PlacementReadiness> {
  try {
    const res = await fetch(`${API_BASE_URL}/placement/readiness?target_role=${encodeURIComponent(targetRole)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    });
    if (!res.ok) throw new Error("API call failed");
    return await res.json();
  } catch (e) {
    return defaultPlacementReadiness;
  }
}

export async function sendMentorMessage(message: string, role: string, history: any[] = []): Promise<{ reply: string; quick_actions: string[] }> {
  try {
    const res = await fetch(`${API_BASE_URL}/mentor/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, current_role_target: role, history })
    });
    if (!res.ok) throw new Error("API call failed");
    return await res.json();
  } catch (e) {
    return {
      reply: `As your AI Career Mentor for **${role}**, here is my advice: Focus on shipping 1 production-grade capstone project with Docker and clean test coverage, maintain your 7-day coding streak, and take an AI mock interview round this week!`,
      quick_actions: ["View my learning roadmap", "Start a Mock Interview", "Run Resume ATS scan"]
    };
  }
}

export async function fetchGamificationStatus(): Promise<GamificationStatus> {
  try {
    const res = await fetch(`${API_BASE_URL}/gamification/status`);
    if (!res.ok) throw new Error("API call failed");
    return await res.json();
  } catch (e) {
    return defaultGamificationStatus;
  }
}
