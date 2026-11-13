import json
import os
from typing import List, Dict, Any
from app.models.schemas import SkillGapAnalysis, SkillGapItem, StudentProfileInput

CAREERS_DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "careers.json")

class SkillGapAgent:
    def __init__(self):
        with open(CAREERS_DATA_PATH, "r", encoding="utf-8") as f:
            self.careers = {c["id"]: c for c in json.load(f)}

    def analyze_gap(self, user_skills: List[str], target_role_id: str) -> SkillGapAnalysis:
        career = self.careers.get(target_role_id)
        if not career:
            # Fallback to AI Engineer if not found
            career = self.careers.get("ai-engineer", list(self.careers.values())[0])

        required = career["required_skills"]
        nice_to_have = career.get("nice_to_have_skills", [])
        user_skills_clean = [s.strip().lower() for s in user_skills]

        existing = []
        missing: List[SkillGapItem] = []

        # Check required skills
        priority_counter = 1
        for req in required:
            req_clean = req.lower()
            matched = any(us in req_clean or req_clean in us for us in user_skills_clean)
            if matched:
                existing.append(req)
            else:
                missing.append(SkillGapItem(
                    skill=req,
                    importance="Critical",
                    status="Missing",
                    priority=priority_counter,
                    estimated_time_to_learn="2 - 3 weeks",
                    suggested_resource=f"https://github.com/topics/{req.lower().replace(' ', '-')}"
                ))
                priority_counter += 1

        # Check nice to have
        for nth in nice_to_have:
            nth_clean = nth.lower()
            matched = any(us in nth_clean or nth_clean in us for us in user_skills_clean)
            if matched:
                existing.append(nth)
            else:
                missing.append(SkillGapItem(
                    skill=nth,
                    importance="High",
                    status="Missing",
                    priority=priority_counter,
                    estimated_time_to_learn="1 - 2 weeks",
                    suggested_resource=f"Official Docs & Tutorials for {nth}"
                ))
                priority_counter += 1

        total_tracked = len(required) + len(nice_to_have)
        match_pct = int((len(existing) / max(1, total_tracked)) * 100)
        match_pct = max(25, min(95, match_pct))

        if match_pct >= 75:
            verdict = "Interview Ready with Targeted Polishing: You possess strong core foundations. Focus immediately on capstone architecture and mock interview practice."
        elif match_pct >= 50:
            verdict = "Intermediate Readiness (Bridging Phase): You have foundational competence, but need 4-6 weeks of focused implementation in high-priority gaps."
        else:
            verdict = "Foundational Phase: Accelerate learning by committing 3+ hours daily following the structured roadmap."

        return SkillGapAnalysis(
            target_role=career["title"],
            match_percentage=match_pct,
            existing_skills=existing,
            missing_skills=missing,
            readiness_verdict=verdict
        )

skill_gap_agent = SkillGapAgent()
