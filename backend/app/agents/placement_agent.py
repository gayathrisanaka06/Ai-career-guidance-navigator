from typing import Dict, List
from app.models.schemas import PlacementReadiness, StudentProfileInput

class PlacementAgent:
    def calculate_readiness(self, profile: StudentProfileInput, target_role: str = "AI Engineer") -> PlacementReadiness:
        # Heuristic scoring based on student background, projects, CGPA, and skills
        cgpa_factor = min(20, int(profile.cgpa * 2))
        skills_count = len(profile.skills)
        programming_score = min(95, max(45, skills_count * 8 + 30))
        dsa_score = min(90, max(40, 50 + int(profile.cgpa * 3.5)))
        aptitude_score = min(92, max(50, 60 + int(profile.cgpa * 3)))
        comm_score = 82 if profile.preferred_work_style else 75
        resume_score = 78
        projects_score = 85 if profile.github_url else 65
        cert_score = 70
        interview_score = 72

        breakdown = {
            "Programming": programming_score,
            "DSA": dsa_score,
            "Aptitude": aptitude_score,
            "Communication": comm_score,
            "Resume": resume_score,
            "Projects": projects_score,
            "Certifications": cert_score,
            "Interview Readiness": interview_score
        }

        # Weighted overall composite
        overall = int(
            (programming_score * 0.15) +
            (dsa_score * 0.15) +
            (aptitude_score * 0.10) +
            (comm_score * 0.10) +
            (resume_score * 0.15) +
            (projects_score * 0.15) +
            (cert_score * 0.10) +
            (interview_score * 0.10)
        )

        tiers = {
            "Tier 1 (Product & AI Giants)": ["Google", "Microsoft", "Amazon", "Uber", "Razorpay", "NVIDIA"],
            "Tier 2 (High-Growth Startups & Scaleups)": ["Zomato", "Swiggy", "Postman", "Zerodha", "CRED", "BrowserStack"],
            "Tier 3 (Global Tech & Enterprise MNCs)": ["TCS Digital", "Infosys Power Programmer", "Cognizant", "Accenture", "Wipro Turbo"]
        }

        action_items = [
            "Complete 2 LeetCode Medium problems daily on Tree & Graph traversals.",
            "Integrate measurable performance metrics into your top GitHub project README.",
            "Participate in at least 2 AI Mock Interview simulations this week.",
            "Add GitHub Actions CI/CD pipeline to your primary full-stack repository."
        ]

        placement_probability = min(96, max(35, int(overall * 0.95 + 4)))

        return PlacementReadiness(
            overall_score=overall,
            breakdown=breakdown,
            target_company_tiers=tiers,
            critical_action_items=action_items,
            placement_probability_percentage=placement_probability
        )

placement_agent = PlacementAgent()
