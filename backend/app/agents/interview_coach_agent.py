import random
from typing import List, Dict, Any
from app.models.schemas import MockInterviewQuestion, MockInterviewEvaluation
from app.services.gemini_service import gemini_service

QUESTION_BANK = {
    "HR": [
        MockInterviewQuestion(
            id="hr-1",
            round_type="HR",
            question="Walk me through your background, your technical journey, and why you are targeting this specific role.",
            ideal_focus_points=["Concise chronological story", "Key turning points & passions", "Specific alignment with company/role"]
        ),
        MockInterviewQuestion(
            id="hr-2",
            round_type="HR",
            question="Describe a situation where you had a tight deadline and conflicting priorities. How did you manage your time and deliverables?",
            ideal_focus_points=["Prioritization framework", "Communication with stakeholders", "Outcome & lessons learned"]
        )
    ],
    "Technical": [
        MockInterviewQuestion(
            id="tech-1",
            round_type="Technical",
            question="Explain the fundamental difference between synchronous and asynchronous processing, and describe how you would design an API to handle high-latency background operations.",
            ideal_focus_points=["Event loop / thread pool mechanics", "Task queues (Celery/RabbitMQ/Redis)", "Polling vs WebSockets vs Webhooks"]
        ),
        MockInterviewQuestion(
            id="tech-2",
            round_type="Technical",
            question="How do vector databases (like ChromaDB or Pinecone) work under the hood, and how do they differ from traditional B-Tree relational database indexes?",
            ideal_focus_points=["Embeddings & high-dimensional vector spaces", "Approximate Nearest Neighbors (ANN)", "HNSW / IVF indexing algorithms"]
        )
    ],
    "Behavioral": [
        MockInterviewQuestion(
            id="beh-1",
            round_type="Behavioral",
            question="Tell me about a time when a project or code you deployed failed in production or didn't meet requirements. What actions did you take using the STAR framework?",
            ideal_focus_points=["Situation & context", "Task assigned", "Action taken (debugging, post-mortem)", "Result & preventive safeguards"]
        )
    ],
    "Coding": [
        MockInterviewQuestion(
            id="code-1",
            round_type="Coding",
            question="How would you design an algorithm to find the longest substring without repeating characters with optimal time and space complexity?",
            ideal_focus_points=["Sliding window technique", "Hash set / map for character index tracking", "O(N) time and O(min(N, M)) space complexity"]
        )
    ]
}

class InterviewCoachAgent:
    def get_question(self, round_type: str = "Technical", target_role: str = "AI Engineer") -> MockInterviewQuestion:
        if gemini_service.is_live():
            prompt = f"""
            Act as an elite Senior Hiring Manager conducting an interview for '{target_role}'.
            Generate 1 compelling {round_type} interview question.
            Return JSON:
            {{
              "id": "q-1",
              "round_type": "{round_type}",
              "question": "...",
              "ideal_focus_points": ["Point 1", "Point 2", "Point 3"]
            }}
            """
            llm_res = gemini_service.generate_json(prompt, "You are a top tech hiring manager. Return valid JSON only.")
            if llm_res and "question" in llm_res:
                try:
                    return MockInterviewQuestion(**llm_res)
                except Exception as e:
                    print(f"Error parsing LLM interview question: {e}")

        # Fallback question bank
        bank = QUESTION_BANK.get(round_type, QUESTION_BANK["Technical"])
        return random.choice(bank)

    def evaluate_answer(self, question: str, round_type: str, student_answer: str, target_role: str = "AI Engineer") -> MockInterviewEvaluation:
        if gemini_service.is_live():
            prompt = f"""
            Act as an experienced interviewer evaluating a candidate for '{target_role}'.
            Round: {round_type}
            Question: {question}
            Candidate's Answer: {student_answer}

            Provide an objective, constructive evaluation in JSON:
            {{
              "technical_accuracy": 8,
              "confidence_tone": 7,
              "communication_clarity": 8,
              "completeness": 8,
              "overall_round_score": 78,
              "strengths": ["Clear explanation of core concepts", "Structured thought process"],
              "areas_for_improvement": ["Mention specific complexity trade-offs", "Elaborate with concrete production examples"],
              "model_answer": "An exemplary answer would explain..."
            }}
            """
            llm_res = gemini_service.generate_json(prompt, "You are an expert interview coach. Return valid JSON only.")
            if llm_res and "overall_round_score" in llm_res:
                try:
                    return MockInterviewEvaluation(**llm_res)
                except Exception as e:
                    print(f"Error parsing LLM interview evaluation: {e}")

        # Deterministic Heuristic Evaluation
        words = len(student_answer.strip().split())
        clarity = min(10, max(5, int(words / 15)))
        accuracy = 7 if words > 30 else 5
        confidence = 8 if ("because" in student_answer.lower() or "for example" in student_answer.lower()) else 6
        completeness = min(10, max(4, int(words / 20)))
        overall = int(((accuracy + confidence + clarity + completeness) / 40) * 100)

        strengths = [
            "Good articulation of foundational ideas.",
            "Relevant vocabulary aligned with standard software terminology."
        ]
        improvements = [
            "Structure your response using the STAR (Situation, Task, Action, Result) method for higher impact.",
            "Quantify technical metrics (e.g., latency, throughput, complexity) when explaining technical choices."
        ]
        model_answer = (
            "A model response begins with a clear 1-sentence executive summary answering the question directly, "
            "followed by concrete technical principles (e.g. time/space trade-offs, architecture patterns), "
            "and concludes with a practical real-world scenario where you applied this approach."
        )

        return MockInterviewEvaluation(
            technical_accuracy=accuracy,
            confidence_tone=confidence,
            communication_clarity=clarity,
            completeness=completeness,
            overall_round_score=overall,
            strengths=strengths,
            areas_for_improvement=improvements,
            model_answer=model_answer
        )

interview_coach_agent = InterviewCoachAgent()
