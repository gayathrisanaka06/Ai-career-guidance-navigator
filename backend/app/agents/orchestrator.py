from typing import Dict, Any, List
from app.models.schemas import (
    StudentProfileInput,
    AIStudentProfile,
    MentorChatRequest
)
from app.agents.career_agent import career_agent
from app.agents.skill_gap_agent import skill_gap_agent
from app.agents.roadmap_agent import roadmap_agent
from app.agents.resume_agent import resume_agent
from app.agents.interview_coach_agent import interview_coach_agent
from app.agents.project_agent import project_agent
from app.agents.certification_agent import certification_agent
from app.agents.placement_agent import placement_agent
from app.agents.gamification_agent import gamification_agent
from app.services.gemini_service import gemini_service

class MasterOrchestrator:
    def __init__(self):
        self.career_agent = career_agent
        self.skill_gap_agent = skill_gap_agent
        self.roadmap_agent = roadmap_agent
        self.resume_agent = resume_agent
        self.interview_coach_agent = interview_coach_agent
        self.project_agent = project_agent
        self.certification_agent = certification_agent
        self.placement_agent = placement_agent
        self.gamification_agent = gamification_agent

    def generate_ai_student_profile(self, profile: StudentProfileInput) -> AIStudentProfile:
        if gemini_service.is_live():
            prompt = f"""
            Act as an elite Psychometrician and AI Talent Profiler.
            Analyze this student profile:
            Name: {profile.name}
            Degree: {profile.degree} in {profile.branch}, Year: {profile.current_year}, CGPA: {profile.cgpa}
            Skills: {', '.join(profile.skills)}
            Interests: {', '.join(profile.interests)}
            Work Style: {profile.preferred_work_style}
            Goals: {profile.career_goals}

            Generate a comprehensive psychological & technical diagnosis in JSON:
            {{
              "personality_summary": "2-3 sentences analyzing temperament, analytical drive, and teamwork orientation.",
              "learning_style": "Project-First / Visual / Theoretical",
              "technical_strengths": ["Strength 1", "Strength 2", "Strength 3"],
              "soft_skills": ["Skill 1", "Skill 2"],
              "weaknesses": ["Vulnerability 1", "Vulnerability 2"],
              "readiness_score": 82,
              "confidence_score": 80,
              "ikigai_alignment": "Deep overlap with Data & AI innovation..."
            }}
            """
            llm_res = gemini_service.generate_json(prompt, "You are an elite talent profiler. Return valid JSON only.")
            if llm_res and "readiness_score" in llm_res:
                try:
                    return AIStudentProfile(**llm_res)
                except Exception as e:
                    print(f"Error parsing LLM student profile: {e}")

        # Deterministic Heuristic Engine
        skills_str = ", ".join(profile.skills[:4]) or "Core Computer Science"
        personality = (
            f"{profile.name} exhibits an analytical and pragmatic problem-solving disposition. "
            f"Demonstrates natural affinity for {profile.interests[0] if profile.interests else 'technology'} "
            f"with strong execution capability in {skills_str}."
        )
        strengths = profile.skills[:4] if profile.skills else ["Analytical Thinking", "Algorithmic Logic", "Rapid Prototyping"]
        soft_skills = ["Technical Communication", "Collaborative Debugging", "Curiosity", "Resilience"]
        weaknesses = [
            "Needs deeper production-grade CI/CD and system design exposure.",
            "Can improve quantification of project business metrics."
        ]
        cgpa_score = min(98, max(50, int(profile.cgpa * 9 + len(profile.skills) * 3)))
        confidence = min(95, max(60, cgpa_score - 4))
        ikigai = f"High convergence at the intersection of {profile.interests[0] if profile.interests else 'modern computing'} and high-impact industrial applications."

        return AIStudentProfile(
            personality_summary=personality,
            learning_style="Project-Based (Learn by Building & Shipping)",
            technical_strengths=strengths,
            soft_skills=soft_skills,
            weaknesses=weaknesses,
            readiness_score=cgpa_score,
            confidence_score=confidence,
            ikigai_alignment=ikigai
        )

    def chat_mentor(self, req: MentorChatRequest) -> Dict[str, Any]:
        user_msg = req.message.lower()
        role = req.current_role_target or "AI Engineer"

        # Check if live Gemini API is active
        if gemini_service.is_live():
            history_context = "\n".join([f"{h.get('role', 'user')}: {h.get('content', '')}" for h in req.history[-4:]])
            prompt = f"""
            You are the "AI Career Mentor" inside the AI Career Guidance Navigator platform.
            The student is targeting: '{role}'.
            Conversation History:
            {history_context}

            Student's query: "{req.message}"

            Provide an inspiring, highly specific, actionable mentor response. Include concrete next steps, technologies to learn, or interview tips where appropriate.
            """
            ans = gemini_service.generate_content(prompt, "You are a warm, wise, high-achieving tech mentor. Be structured and encouraging.")
            if ans:
                return {
                    "reply": ans,
                    "quick_actions": [
                        "View my personalized roadmap",
                        "Start an AI Mock Interview",
                        "Analyze my resume ATS score"
                    ]
                }

        # Contextual Intelligent Heuristic Responses
        if "compare" in user_msg or "vs" in user_msg:
            reply = (
                f"### Comparing Top Pathways\n\n"
                f"- **AI Engineer**: Focuses on deploying LLMs, vector search, RAG pipelines, and API integrations with foundation models. High current demand (+36% growth) with compensation averaging ₹14–35 LPA.\n"
                f"- **Data Engineer**: Focuses on scalable ETL pipelines, Spark, Kafka, and Snowflake/BigQuery architectures. Very stable, critical infrastructure role.\n"
                f"- **Software Engineer (Full Stack)**: The highest volume of campus openings. Excelling in TypeScript, Next.js, and System Design guarantees strong baseline opportunities.\n\n"
                f"**Recommendation**: If you enjoy fast prototyping and cutting-edge GenAI, choose **AI Engineer**. If you prefer foundational systems and algorithms, start with **Software Engineer**."
            )
        elif "resume" in user_msg or "ats" in user_msg:
            reply = (
                f"To boost your resume for **{role}**:\n\n"
                f"1. **Use the STAR Formula**: *Situation, Task, Action, Result* in every project bullet point.\n"
                f"2. **Quantify Results**: Replace *'Built a web app'* with *'Architected a full-stack Next.js web application reducing API latency by 35% for 1,200+ users'*.\n"
                f"3. **Incorporate Target Keywords**: Add Docker, FastAPI, PostgreSQL, and Unit Testing to your technical skills section.\n\n"
                f"👉 Head over to the **Resume Analyzer** tab to run a live scan!"
            )
        elif "interview" in user_msg or "prepare" in user_msg:
            reply = (
                f"Here is your 3-step placement interview strategy for **{role}**:\n\n"
                f"1. **DSA Core**: Solve 2 NeetCode Medium problems daily (focus: Sliding Window, Binary Trees, Graphs).\n"
                f"2. **System Design & Core CS**: Review indexing in SQL, ACID vs BASE, and caching with Redis.\n"
                f"3. **Mock Simulations**: Practice behavioral questions using the STAR framework so you can answer fluently under pressure.\n\n"
                f"👉 Try out the **AI Mock Interview** tab to simulate a live round right now!"
            )
        elif "certification" in user_msg or "cert" in user_msg:
            reply = (
                f"For **{role}**, prioritize certifications with high industry recognition:\n\n"
                f"- **Free**: Kaggle Micro-Courses & freeCodeCamp.\n"
                f"- **Top Industry**: AWS Certified Cloud Practitioner / Solutions Architect or DeepLearning.AI Specialization.\n\n"
                f"👉 Visit the **Certifications** section in the sidebar for ROI rankings!"
            )
        else:
            reply = (
                f"Hello! As your AI Career Mentor for **{role}**, I'm here to ensure you maximize your placement readiness.\n\n"
                f"We can analyze your skill gaps, generate a week-by-week learning roadmap, optimize your resume for ATS parsers, or conduct a live mock interview round.\n\n"
                f"What would you like to tackle today?"
            )

        return {
            "reply": reply,
            "quick_actions": [
                "View my personalized roadmap",
                "Start an AI Mock Interview",
                "Analyze my resume ATS score",
                f"Compare {role} with other roles"
            ]
        }

orchestrator = MasterOrchestrator()
