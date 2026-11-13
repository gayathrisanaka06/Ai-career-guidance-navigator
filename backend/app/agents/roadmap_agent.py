from typing import List
from app.models.schemas import PersonalizedRoadmap, DailyTask, WeeklyModule, MonthlyMilestone
from app.services.gemini_service import gemini_service

class RoadmapAgent:
    def generate_roadmap(self, target_role: str, hours_per_day: int = 3, target_days: int = 90, learning_style: str = "Project-Based") -> PersonalizedRoadmap:
        if gemini_service.is_live():
            prompt = f"""
            Act as an elite Tech Curriculum Architect. Generate a high-impact personalized learning roadmap for:
            Role: {target_role}
            Available Time: {hours_per_day} hours/day
            Target Placement Date: In {target_days} days
            Preferred Learning Style: {learning_style}

            Generate structured JSON matching:
            {{
              "target_role": "{target_role}",
              "hours_per_day": {hours_per_day},
              "target_days": {target_days},
              "learning_style": "{learning_style}",
              "daily_schedule": [
                 {{"day": 1, "time_slot": "Morning (1.5 hrs)", "task_title": "Core Foundations & Setup", "description": "...", "resource_link": "https://..."}},
                 {{"day": 2, "time_slot": "Evening (1.5 hrs)", "task_title": "Hands-on Implementation", "description": "...", "resource_link": "https://..."}}
              ],
              "weekly_modules": [
                 {{"week_number": 1, "focus_topic": "Foundations", "outcomes": ["Out1"], "practice_problems": ["Prob1"], "mini_project": "MiniProj"}}
              ],
              "monthly_milestones": [
                 {{"month_number": 1, "theme": "Foundational Mastery", "deliverable_capstone": "Full-stack MVP", "evaluation_criteria": "Deployed with 90%+ test coverage"}}
              ]
            }}
            """
            llm_result = gemini_service.generate_json(prompt, "You are a senior tech curriculum architect. Output valid JSON only.")
            if llm_result and "daily_schedule" in llm_result:
                try:
                    return PersonalizedRoadmap(**llm_result)
                except Exception as e:
                    print(f"Roadmap LLM parse error: {e}")

        # Deterministic High-Yield Roadmap Matrix
        daily_schedule = [
            DailyTask(
                day=1,
                time_slot=f"Slot 1 ({hours_per_day/2:.1f}h)",
                task_title=f"{target_role} Environment Scaffolding & Core Architecture",
                description="Setup local development workspace, Git repository, Docker containers, and environment variables.",
                resource_link="https://roadmap.sh"
            ),
            DailyTask(
                day=2,
                time_slot=f"Slot 2 ({hours_per_day/2:.1f}h)",
                task_title="Deep Dive into Core Language & Performance Idioms",
                description="Master asynchronous I/O, memory management, and idiomatic coding patterns for production reliability.",
                resource_link="https://docs.python.org" if "AI" in target_role or "Data" in target_role else "https://developer.mozilla.org"
            ),
            DailyTask(
                day=3,
                time_slot=f"Slot 1 ({hours_per_day/2:.1f}h)",
                task_title="High-Yield Data Structures & Algorithmic Problem Solving",
                description="Solve 3 curated medium problems focusing on Two-Pointers, Sliding Window, and Hash Maps.",
                resource_link="https://neetcode.io"
            ),
            DailyTask(
                day=4,
                time_slot=f"Slot 2 ({hours_per_day/2:.1f}h)",
                task_title="System Architecture & Database Schema Modeling",
                description="Design normalized relational schemas with PostgreSQL and caching layer with Redis.",
                resource_link="https://use-the-index-luke.com"
            ),
            DailyTask(
                day=5,
                time_slot=f"Slot 1 ({hours_per_day/2:.1f}h)",
                task_title="API Contract Design & Automated Integration Testing",
                description="Implement REST / gRPC endpoints with automated Pydantic / TypeScript validation and Pytest suites.",
                resource_link="https://fastapi.tiangolo.com"
            ),
            DailyTask(
                day=6,
                time_slot=f"Slot 2 ({hours_per_day/2:.1f}h)",
                task_title="Mini-Project Sprint: End-to-End Microservice",
                description="Ship an authenticated backend endpoint with rate limiting, logging, and Docker containerization.",
                resource_link="https://docker-curriculum.com"
            ),
            DailyTask(
                day=7,
                time_slot="Review & Retrospective (1.5h)",
                task_title="Weekly Code Audit, Documentation & GitHub Push",
                description="Audit weekly commits, write architectural README diagrams, and conduct self-mock review.",
                resource_link="https://github.com"
            )
        ]

        weekly_modules = [
            WeeklyModule(
                week_number=1,
                focus_topic=f"Foundations & Toolchain for {target_role}",
                outcomes=["Production Git hygiene", "Containerized local setup", "Idiomatic syntax mastery"],
                practice_problems=["Array & Hashing NeetCode 150", "String Manipulation drills"],
                mini_project="Containerized CLI or REST API Microservice"
            ),
            WeeklyModule(
                week_number=2,
                focus_topic="Data Modeling, Scalability & Persistence",
                outcomes=["PostgreSQL indexing", "Connection pooling", "ACID guarantees"],
                practice_problems=["SQL 50 LeetCode drills", "Two-Pointers & Binary Search"],
                mini_project="High-throughput CRUD API with Redis caching"
            ),
            WeeklyModule(
                week_number=3,
                focus_topic=f"Advanced {target_role} Domain Core",
                outcomes=["Vector DBs & RAG pipelines" if "AI" in target_role else "Distributed system state & message queues"],
                practice_problems=["Trees, Graphs & BFS/DFS", "Sliding Window problems"],
                mini_project="Production-grade Domain Application with real-time feedback"
            ),
            WeeklyModule(
                week_number=4,
                focus_topic="Cloud Deployment, CI/CD & Observability",
                outcomes=["Automated GitHub Actions workflow", "Cloud deployment (Vercel/Render/AWS)", "Prometheus/Sentry monitoring"],
                practice_problems=["Dynamic Programming & Backtracking", "System Design Case Study"],
                mini_project="Fully Deployed Capstone with custom domain and live traffic testing"
            )
        ]

        monthly_milestones = [
            MonthlyMilestone(
                month_number=1,
                theme="Foundations & Algorithmic Rigor",
                deliverable_capstone="Solved 60+ curated DSA problems and built 2 backend services.",
                evaluation_criteria="Flawless code hygiene, clean commits, and 100% test coverage."
            ),
            MonthlyMilestone(
                month_number=2,
                theme="Domain Specialization & Capstone Development",
                deliverable_capstone=f"Full-stack industry-grade {target_role} portfolio capstone with live URL.",
                evaluation_criteria="Architecture diagrams, API docs, and Dockerized production deployment."
            ),
            MonthlyMilestone(
                month_number=3,
                theme="Placement Sprint, Mock Interviews & ATS Polish",
                deliverable_capstone="ATS 90+ customized resume, 10+ mock interview rounds cleared, 30+ targeted applications.",
                evaluation_criteria="Confidence score > 85%, STAR behavioral mastery, and verified technical interview readiness."
            )
        ]

        return PersonalizedRoadmap(
            target_role=target_role,
            hours_per_day=hours_per_day,
            target_days=target_days,
            learning_style=learning_style,
            daily_schedule=daily_schedule,
            weekly_modules=weekly_modules,
            monthly_milestones=monthly_milestones
        )

roadmap_agent = RoadmapAgent()
