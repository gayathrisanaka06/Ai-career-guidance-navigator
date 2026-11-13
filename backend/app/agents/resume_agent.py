from app.services.resume_parser import analyze_resume_text
from app.models.schemas import ResumeAnalysis
from app.services.gemini_service import gemini_service

class ResumeAgent:
    def analyze(self, resume_text: str, target_role: str = "Software Engineer") -> ResumeAnalysis:
        # If Gemini is enabled, augment with deep LLM bullet rewrite & keyword matching
        if gemini_service.is_live():
            prompt = f"""
            Act as an executive technical recruiter and ATS parsing algorithm.
            Analyze this resume for target role: '{target_role}'.
            Resume Content:
            {resume_text[:4000]}

            Return JSON matching:
            {{
              "overall_score": 85,
              "breakdown": {{
                 "ats_score": 85,
                 "formatting_score": 90,
                 "action_verbs_score": 82,
                 "quantifiable_metrics_score": 75,
                 "keyword_alignment_score": 88
              }},
              "detected_skills": ["Python", "FastAPI"],
              "missing_keywords": ["Docker", "Kubernetes", "CI/CD"],
              "grammar_and_tone_feedback": ["Use active voice", "Keep bullet points concise"],
              "bullet_point_improvements": [
                 {{"before": "Worked on backend", "after": "Architected resilient backend services with 99.9% uptime"}}
              ],
              "suggested_action_verbs": ["Spearheaded", "Engineered", "Orchestrated"]
            }}
            """
            llm_res = gemini_service.generate_json(prompt, "You are a professional ATS resume reviewer. Output only valid JSON.")
            if llm_res and "overall_score" in llm_res:
                try:
                    return ResumeAnalysis(**llm_res)
                except Exception as e:
                    print(f"Error parsing LLM resume analysis: {e}")

        # High-Fidelity Heuristic Parser
        result_dict = analyze_resume_text(resume_text)
        return ResumeAnalysis(**result_dict)

resume_agent = ResumeAgent()
