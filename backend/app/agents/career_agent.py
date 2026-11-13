import json
import os
from typing import List, Dict, Any
from app.models.schemas import StudentProfileInput, CareerRecommendation
from app.services.gemini_service import gemini_service

CAREERS_DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "careers.json")

class CareerAgent:
    def __init__(self):
        with open(CAREERS_DATA_PATH, "r", encoding="utf-8") as f:
            self.careers = json.load(f)

    def analyze_and_recommend(self, profile: StudentProfileInput) -> List[CareerRecommendation]:
        # Try LLM-based smart evaluation if Gemini is active
        if gemini_service.is_live():
            prompt = f"""
            Act as an elite AI Career Strategy Agent. Analyze this student profile:
            Name: {profile.name}
            Degree: {profile.degree} in {profile.branch}, CGPA: {profile.cgpa}
            Skills: {', '.join(profile.skills)}
            Interests: {', '.join(profile.interests)}
            Goals: {profile.career_goals}
            Work Style: {profile.preferred_work_style}

            Available Career Paths:
            {[c['title'] for c in self.careers]}

            Evaluate the match for each career. Return a JSON list of objects matching schema:
            [
              {{
                "id": "role-id",
                "title": "Role Title",
                "category": "Category",
                "match_percentage": 88,
                "why_it_matches": "Detailed reasoning based on skills & interests",
                "required_skills": ["Skill1", "Skill2"],
                "salary_range": "$90k - $160k / ₹12-25 LPA",
                "job_demand": "High",
                "future_growth": "+30%",
                "learning_difficulty": "Moderate",
                "recommended_companies": ["Company1", "Company2"]
              }}
            ]
            Sort by match_percentage descending.
            """
            llm_result = gemini_service.generate_json(prompt, "You are a senior tech career strategist. Output only valid JSON.")
            if llm_result and isinstance(llm_result, list):
                try:
                    return [CareerRecommendation(**item) for item in llm_result]
                except Exception as e:
                    print(f"Error validating LLM career recommendations: {e}")

        # Deterministic High-Precision Matching Engine (Fallback & Instant Engine)
        results = []
        user_skills_lower = [s.lower().strip() for s in profile.skills]
        user_interests_lower = [i.lower().strip() for i in profile.interests]

        for c in self.careers:
            # Score factors
            skill_hits = 0
            for req in c["required_skills"]:
                req_lower = req.lower()
                if any(us in req_lower or req_lower in us for us in user_skills_lower):
                    skill_hits += 1
            
            interest_hits = 0
            for mf in c["match_factors"]:
                mf_lower = mf.lower()
                if any(ui in mf_lower or mf_lower in ui for ui in user_interests_lower):
                    interest_hits += 1

            # Base score calculation
            base_skill_ratio = (skill_hits / max(1, len(c["required_skills"]))) * 60
            interest_ratio = (interest_hits / max(1, len(c["match_factors"]))) * 30
            academic_bonus = min(10, int(profile.cgpa))

            match_pct = int(min(98, max(38, base_skill_ratio + interest_ratio + academic_bonus)))

            why_matches = f"Strong alignment with your background in {profile.branch}. Your existing skills in {', '.join(profile.skills[:3]) or 'software foundations'} provide an immediate launching pad for {c['title']}."
            if skill_hits > 0:
                why_matches += f" You already cover {skill_hits} of the core technological competencies."

            results.append(CareerRecommendation(
                id=c["id"],
                title=c["title"],
                category=c["category"],
                match_percentage=match_pct,
                why_it_matches=why_matches,
                required_skills=c["required_skills"],
                salary_range=c["salary_range"],
                job_demand=c["job_demand"],
                future_growth=c["future_growth"],
                learning_difficulty=c["learning_difficulty"],
                recommended_companies=c["recommended_companies"]
            ))

        results.sort(key=lambda x: x.match_percentage, reverse=True)
        return results

career_agent = CareerAgent()
