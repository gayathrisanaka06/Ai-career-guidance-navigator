from typing import Dict, Any, List
from app.models.schemas import GamificationStatus

class GamificationAgent:
    def __init__(self):
        self.state = {
            "current_xp": 1450,
            "current_level": 4,
            "current_streak_days": 7,
            "badges_earned": [
                {"id": "badge-1", "name": "Curious Mind", "icon": "🌱", "description": "Completed student profile setup"},
                {"id": "badge-2", "name": "Resume Polisher", "icon": "📄", "description": "Scored 80+ in ATS Resume Scanner"},
                {"id": "badge-3", "name": "Code Explorer", "icon": "💻", "description": "Solved first 10 roadmap coding challenges"},
                {"id": "badge-4", "name": "Week Warrior", "icon": "🔥", "description": "Maintained a 7-day learning streak"}
            ],
            "daily_challenges": [
                {"id": "ch-1", "title": "Solve 1 Sliding Window LeetCode", "xp": 50, "completed": True},
                {"id": "ch-2", "title": "Review 2 System Design Concepts", "xp": 40, "completed": False},
                {"id": "ch-3", "title": "Complete 1 AI Mock Interview Round", "xp": 100, "completed": False}
            ],
            "leaderboard_rank": 14
        }

    def get_status(self) -> GamificationStatus:
        return GamificationStatus(**self.state)

    def award_xp(self, xp: int, reason: str = "") -> GamificationStatus:
        self.state["current_xp"] += xp
        # Level up every 500 XP
        self.state["current_level"] = max(1, self.state["current_xp"] // 500 + 1)
        return GamificationStatus(**self.state)

gamification_agent = GamificationAgent()
