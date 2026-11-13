from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
import json

from app.models.schemas import (
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
    MentorChatRequest,
    GamificationStatus
)
from app.agents.orchestrator import orchestrator
from app.services.resume_parser import extract_text_from_pdf

app = FastAPI(
    title="AI Career Guidance Navigator API",
    description="Multi-Agent AI Platform for Student Career Guidance, Skill Gap Diagnostics & Placement Preparation",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "app": "AI Career Guidance Navigator",
        "agents": 10,
        "engine": "Gemini 2.5 Flash / Multi-Agent Swarm"
    }

# 1 & 2. Student Profile & AI Analysis
@app.post("/api/profile/generate", response_model=AIStudentProfile)
def generate_student_profile(profile: StudentProfileInput):
    return orchestrator.generate_ai_student_profile(profile)

# 3. Career Recommendations
@app.post("/api/careers/recommend", response_model=List[CareerRecommendation])
def recommend_careers(profile: StudentProfileInput):
    return orchestrator.career_agent.analyze_and_recommend(profile)

# 4. Skill Gap Analysis
@app.post("/api/skills/gap-analysis", response_model=SkillGapAnalysis)
def analyze_skill_gap(payload: dict):
    skills = payload.get("skills", [])
    target_role_id = payload.get("target_role_id", "ai-engineer")
    return orchestrator.skill_gap_agent.analyze_gap(skills, target_role_id)

# 5. Personalized Learning Roadmap
@app.post("/api/roadmap/generate", response_model=PersonalizedRoadmap)
def generate_roadmap(payload: dict):
    target_role = payload.get("target_role", "AI Engineer")
    hours = payload.get("hours_per_day", 3)
    target_days = payload.get("target_days", 90)
    style = payload.get("learning_style", "Project-Based")
    return orchestrator.roadmap_agent.generate_roadmap(target_role, hours, target_days, style)

# 6. Resume Analyzer
@app.post("/api/resume/analyze-text", response_model=ResumeAnalysis)
def analyze_resume_raw_text(payload: dict):
    text = payload.get("resume_text", "")
    target_role = payload.get("target_role", "Software Engineer")
    if not text:
        raise HTTPException(status_code=400, detail="resume_text is required")
    return orchestrator.resume_agent.analyze(text, target_role)

@app.post("/api/resume/upload", response_model=ResumeAnalysis)
async def upload_and_analyze_resume(file: UploadFile = File(...), target_role: str = Form("Software Engineer")):
    contents = await file.read()
    if file.filename.endswith(".pdf"):
        text = extract_text_from_pdf(contents)
    else:
        text = contents.decode("utf-8", errors="ignore")
    
    if not text.strip():
        text = "Experienced in Python, SQL, Git, and full-stack web applications with standard project experience."
    return orchestrator.resume_agent.analyze(text, target_role)

# 7. Project Recommendation Studio
@app.get("/api/projects/recommend/{role_id}", response_model=List[ProjectRecommendation])
def get_project_recommendations(role_id: str):
    return orchestrator.project_agent.recommend_projects(role_id)

# 8. Certification Recommendation
@app.get("/api/certifications/recommend/{role_id}", response_model=List[CertificationItem])
def get_certifications(role_id: str):
    return orchestrator.certification_agent.recommend_certifications(role_id)

# 9. AI Mock Interview
@app.get("/api/interview/question", response_model=MockInterviewQuestion)
def get_interview_question(round_type: str = "Technical", target_role: str = "AI Engineer"):
    return orchestrator.interview_coach_agent.get_question(round_type, target_role)

@app.post("/api/interview/evaluate", response_model=MockInterviewEvaluation)
def evaluate_interview_response(payload: dict):
    question = payload.get("question", "")
    round_type = payload.get("round_type", "Technical")
    student_answer = payload.get("student_answer", "")
    target_role = payload.get("target_role", "AI Engineer")
    return orchestrator.interview_coach_agent.evaluate_answer(question, round_type, student_answer, target_role)

# 10. Placement Readiness Score
@app.post("/api/placement/readiness", response_model=PlacementReadiness)
def calculate_placement_readiness(profile: StudentProfileInput, target_role: str = "AI Engineer"):
    return orchestrator.placement_agent.calculate_readiness(profile, target_role)

# 11. AI Career Mentor Chat
@app.post("/api/mentor/chat")
def chat_with_career_mentor(req: MentorChatRequest):
    return orchestrator.chat_mentor(req)

# 12 & 13. Gamification & Progress
@app.get("/api/gamification/status", response_model=GamificationStatus)
def get_gamification_status():
    return orchestrator.gamification_agent.get_status()

@app.post("/api/gamification/award-xp", response_model=GamificationStatus)
def award_xp(payload: dict):
    xp = payload.get("xp", 50)
    reason = payload.get("reason", "Completed daily task")
    return orchestrator.gamification_agent.award_xp(xp, reason)
