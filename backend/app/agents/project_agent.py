from typing import List
from app.models.schemas import ProjectRecommendation
from app.services.gemini_service import gemini_service

PROJECT_CATALOG = {
    "ai-engineer": [
        ProjectRecommendation(
            title="Autonomous Enterprise RAG Agent with Multi-Document Hybrid Search",
            difficulty="Advanced",
            technologies=["Python", "FastAPI", "Gemini 2.5", "ChromaDB", "Docker", "Streamlit/Next.js"],
            estimated_time="3 - 4 weeks",
            resume_value_score=96,
            overview="Architect a production-grade Retrieval-Augmented Generation agent capable of parsing complex PDFs, generating vector embeddings, and providing verifiable citations with hallucination guards.",
            github_structure="""rag-agent/
├── app/
│   ├── api/routes.py
│   ├── core/embeddings.py
│   ├── agents/retriever.py
│   └── main.py
├── frontend/
├── tests/
├── Dockerfile
├── docker-compose.yml
└── README.md""",
            step_by_step_guide=[
                "Step 1: Ingest and chunk PDFs using recursive character splitting with overlap.",
                "Step 2: Generate embeddings and persist in ChromaDB with metadata filtering.",
                "Step 3: Implement hybrid retrieval (BM25 lexical + dense cosine similarity).",
                "Step 4: Integrate Gemini Flash for grounded generation and citation synthesis.",
                "Step 5: Package as a Dockerized FastAPI service with Swagger API documentation."
            ],
            deployment_guide="Deploy FastAPI backend on Render / Railway and frontend on Vercel with automated GitHub Actions CI/CD."
        ),
        ProjectRecommendation(
            title="Real-Time Multimodal Voice AI Support Assistant",
            difficulty="Intermediate to Advanced",
            technologies=["TypeScript", "WebSockets", "Gemini Live API", "Tailwind CSS", "Node.js"],
            estimated_time="2 - 3 weeks",
            resume_value_score=92,
            overview="Build a low-latency, bidirectional audio streaming AI agent for live voice customer support and automated troubleshooting.",
            github_structure="""voice-ai-assistant/
├── src/
│   ├── hooks/useLiveAudio.ts
│   ├── components/AudioVisualizer.tsx
│   └── server/wsHandler.ts
├── package.json
└── README.md""",
            step_by_step_guide=[
                "Step 1: Capture browser audio via MediaStream API in PCM 16-bit format.",
                "Step 2: Stream chunks through secure WebSocket to backend gateway.",
                "Step 3: Connect with Gemini Live API for real-time turn-by-turn speech.",
                "Step 4: Stream audio responses back and visualize waveforms with Canvas API."
            ],
            deployment_guide="Deploy on Vercel Edge with WebSocket gateway on Railway."
        )
    ],
    "software-engineer": [
        ProjectRecommendation(
            title="Scalable Distributed Task Queue & Real-Time Notification Engine",
            difficulty="Intermediate",
            technologies=["Go / Node.js", "Redis", "PostgreSQL", "Next.js", "Docker", "WebSockets"],
            estimated_time="3 weeks",
            resume_value_score=94,
            overview="Engineer a resilient distributed task processing pipeline with exponential backoff retries, priority queues, and real-time live updates.",
            github_structure="""task-flow-engine/
├── worker/
│   ├── queue.go
│   └── processor.go
├── server/
│   ├── handlers/
│   └── db/
├── web/
└── docker-compose.yml""",
            step_by_step_guide=[
                "Step 1: Build a task publisher with PostgreSQL state tracking.",
                "Step 2: Implement Redis-backed message broker with delayed job queues.",
                "Step 3: Add worker pool with graceful shutdown and dead-letter queues.",
                "Step 4: Stream execution status to interactive Next.js dashboard via WebSockets."
            ],
            deployment_guide="Containerize with Docker Compose and deploy to AWS Lightsail or Railway."
        )
    ]
}

class ProjectAgent:
    def recommend_projects(self, target_role_id: str = "ai-engineer") -> List[ProjectRecommendation]:
        if gemini_service.is_live():
            prompt = f"""
            Act as a Senior Principal Engineer. Recommend 2 resume-grade, production portfolio projects for: '{target_role_id}'.
            Return JSON list:
            [
              {{
                "title": "Project Title",
                "difficulty": "Advanced",
                "technologies": ["Tech1", "Tech2"],
                "estimated_time": "3 weeks",
                "resume_value_score": 95,
                "overview": "Summary...",
                "github_structure": "repo-tree...",
                "step_by_step_guide": ["Step 1", "Step 2"],
                "deployment_guide": "Deploy details..."
              }}
            ]
            """
            llm_res = gemini_service.generate_json(prompt, "You are a tech portfolio expert. Return valid JSON only.")
            if llm_res and isinstance(llm_res, list):
                try:
                    return [ProjectRecommendation(**p) for p in llm_res]
                except Exception as e:
                    print(f"Error parsing LLM project recommendations: {e}")

        # Fallback catalog
        return PROJECT_CATALOG.get(target_role_id, PROJECT_CATALOG["ai-engineer"])

project_agent = ProjectAgent()
