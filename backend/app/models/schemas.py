from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class StudentProfileInput(BaseModel):
    name: str = Field(..., example="Aarav Sharma")
    college: str = Field(..., example="National Institute of Technology")
    degree: str = Field(..., example="B.Tech")
    branch: str = Field(..., example="Computer Science & Engineering")
    current_year: int = Field(..., ge=1, le=5, example=3)
    cgpa: float = Field(..., ge=0.0, le=10.0, example=8.6)
    skills: List[str] = Field(default_factory=list, example=["Python", "SQL", "Git", "C++"])
    interests: List[str] = Field(default_factory=list, example=["Artificial Intelligence", "Autonomous Systems", "Cloud"])
    preferred_work_style: str = Field(default="Hybrid", example="Remote / High-Paced Startup")
    career_goals: str = Field(default="", example="Aiming for an AI Engineer or SDE role in a tier-1 product firm")
    preferred_location: str = Field(default="Bengaluru, India / Remote", example="Bengaluru / Remote")
    github_url: Optional[str] = Field(None, example="https://github.com/aaravsharma")
    linkedin_url: Optional[str] = Field(None, example="https://linkedin.com/in/aaravsharma")
    resume_text: Optional[str] = None

class AIStudentProfile(BaseModel):
    personality_summary: str
    learning_style: str
    technical_strengths: List[str]
    soft_skills: List[str]
    weaknesses: List[str]
    readiness_score: int
    confidence_score: int
    ikigai_alignment: str

class CareerRecommendation(BaseModel):
    id: str
    title: str
    category: str
    match_percentage: int
    why_it_matches: str
    required_skills: List[str]
    salary_range: str
    job_demand: str
    future_growth: str
    learning_difficulty: str
    recommended_companies: List[str]

class SkillGapItem(BaseModel):
    skill: str
    importance: str  # Critical, High, Moderate
    status: str      # Acquired, Missing
    priority: int    # 1 to 5
    estimated_time_to_learn: str
    suggested_resource: str

class SkillGapAnalysis(BaseModel):
    target_role: str
    match_percentage: int
    existing_skills: List[str]
    missing_skills: List[SkillGapItem]
    readiness_verdict: str

class DailyTask(BaseModel):
    day: int
    time_slot: str
    task_title: str
    description: str
    resource_link: str
    is_completed: bool = False

class WeeklyModule(BaseModel):
    week_number: int
    focus_topic: str
    outcomes: List[str]
    practice_problems: List[str]
    mini_project: str

class MonthlyMilestone(BaseModel):
    month_number: int
    theme: str
    deliverable_capstone: str
    evaluation_criteria: str

class PersonalizedRoadmap(BaseModel):
    target_role: str
    hours_per_day: int
    target_days: int
    learning_style: str
    daily_schedule: List[DailyTask]
    weekly_modules: List[WeeklyModule]
    monthly_milestones: List[MonthlyMilestone]

class ResumeScoreBreakdown(BaseModel):
    ats_score: int
    formatting_score: int
    action_verbs_score: int
    quantifiable_metrics_score: int
    keyword_alignment_score: int

class ResumeAnalysis(BaseModel):
    overall_score: int
    breakdown: ResumeScoreBreakdown
    detected_skills: List[str]
    missing_keywords: List[str]
    grammar_and_tone_feedback: List[str]
    bullet_point_improvements: List[Dict[str, str]]  # {"before": "...", "after": "..."}
    suggested_action_verbs: List[str]

class ProjectRecommendation(BaseModel):
    title: str
    difficulty: str
    technologies: List[str]
    estimated_time: str
    resume_value_score: int
    overview: str
    github_structure: str
    step_by_step_guide: List[str]
    deployment_guide: str

class CertificationItem(BaseModel):
    name: str
    issuer: str
    type: str # Free, Paid, Industry
    roi_score: int
    time_required: str
    official_url: str
    why_valuable: str

class MockInterviewQuestion(BaseModel):
    id: str
    round_type: str  # HR, Technical, Behavioral, Coding
    question: str
    ideal_focus_points: List[str]

class MockInterviewEvaluation(BaseModel):
    technical_accuracy: int  # 1 to 10
    confidence_tone: int      # 1 to 10
    communication_clarity: int # 1 to 10
    completeness: int        # 1 to 10
    overall_round_score: int # 1 to 100
    strengths: List[str]
    areas_for_improvement: List[str]
    model_answer: str

class PlacementReadiness(BaseModel):
    overall_score: int
    breakdown: Dict[str, int]
    target_company_tiers: Dict[str, List[str]]
    critical_action_items: List[str]
    placement_probability_percentage: int

class MentorChatRequest(BaseModel):
    message: str
    current_role_target: Optional[str] = "AI Engineer"
    history: Optional[List[Dict[str, str]]] = []

class GamificationStatus(BaseModel):
    current_xp: int
    current_level: int
    current_streak_days: int
    badges_earned: List[Dict[str, Any]]
    daily_challenges: List[Dict[str, Any]]
    leaderboard_rank: int
