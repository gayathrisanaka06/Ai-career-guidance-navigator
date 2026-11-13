export interface StudentProfileInput {
  name: string;
  college: string;
  degree: string;
  branch: string;
  current_year: number;
  cgpa: number;
  skills: string[];
  interests: string[];
  preferred_work_style: string;
  career_goals: string;
  preferred_location: string;
  github_url?: string;
  linkedin_url?: string;
  resume_text?: string;
}

export interface AIStudentProfile {
  personality_summary: string;
  learning_style: string;
  technical_strengths: string[];
  soft_skills: string[];
  weaknesses: string[];
  readiness_score: number;
  confidence_score: number;
  ikigai_alignment: string;
}

export interface CareerRecommendation {
  id: string;
  title: string;
  category: string;
  match_percentage: number;
  why_it_matches: string;
  required_skills: string[];
  salary_range: string;
  job_demand: string;
  future_growth: string;
  learning_difficulty: string;
  recommended_companies: string[];
}

export interface SkillGapItem {
  skill: string;
  importance: string;
  status: string;
  priority: number;
  estimated_time_to_learn: string;
  suggested_resource: string;
}

export interface SkillGapAnalysis {
  target_role: string;
  match_percentage: number;
  existing_skills: string[];
  missing_skills: SkillGapItem[];
  readiness_verdict: string;
}

export interface DailyTask {
  day: number;
  time_slot: string;
  task_title: string;
  description: string;
  resource_link: string;
  is_completed?: boolean;
}

export interface WeeklyModule {
  week_number: number;
  focus_topic: string;
  outcomes: string[];
  practice_problems: string[];
  mini_project: string;
}

export interface MonthlyMilestone {
  month_number: number;
  theme: string;
  deliverable_capstone: string;
  evaluation_criteria: string;
}

export interface PersonalizedRoadmap {
  target_role: string;
  hours_per_day: number;
  target_days: number;
  learning_style: string;
  daily_schedule: DailyTask[];
  weekly_modules: WeeklyModule[];
  monthly_milestones: MonthlyMilestone[];
}

export interface ResumeScoreBreakdown {
  ats_score: number;
  formatting_score: number;
  action_verbs_score: number;
  quantifiable_metrics_score: number;
  keyword_alignment_score: number;
}

export interface ResumeAnalysis {
  overall_score: number;
  breakdown: ResumeScoreBreakdown;
  detected_skills: string[];
  missing_keywords: string[];
  grammar_and_tone_feedback: string[];
  bullet_point_improvements: { before: string; after: string }[];
  suggested_action_verbs: string[];
}

export interface ProjectRecommendation {
  title: string;
  difficulty: string;
  technologies: string[];
  estimated_time: string;
  resume_value_score: number;
  overview: string;
  github_structure: string;
  step_by_step_guide: string[];
  deployment_guide: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  type: string;
  roi_score: number;
  time_required: string;
  official_url: string;
  why_valuable: string;
}

export interface MockInterviewQuestion {
  id: string;
  round_type: string;
  question: string;
  ideal_focus_points: string[];
}

export interface MockInterviewEvaluation {
  technical_accuracy: number;
  confidence_tone: number;
  communication_clarity: number;
  completeness: number;
  overall_round_score: number;
  strengths: string[];
  areas_for_improvement: string[];
  model_answer: string;
}

export interface PlacementReadiness {
  overall_score: number;
  breakdown: Record<string, number>;
  target_company_tiers: Record<string, string[]>;
  critical_action_items: string[];
  placement_probability_percentage: number;
}

export interface GamificationStatus {
  current_xp: number;
  current_level: number;
  current_streak_days: number;
  badges_earned: { id: string; name: string; icon: string; description: string }[];
  daily_challenges: { id: string; title: string; xp: number; completed: boolean }[];
  leaderboard_rank: number;
}
