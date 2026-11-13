import {
  StudentProfileInput,
  AIStudentProfile,
  CareerRecommendation,
  SkillGapAnalysis,
  PersonalizedRoadmap,
  ResumeAnalysis,
  ProjectRecommendation,
  CertificationItem,
  MockInterviewQuestion,
  MockInterviewEvaluation,
  PlacementReadiness,
  GamificationStatus
} from "./types";

export const defaultStudentProfile: StudentProfileInput = {
  name: "Aarav Sharma",
  college: "National Institute of Technology",
  degree: "B.Tech",
  branch: "Computer Science & Engineering",
  current_year: 3,
  cgpa: 8.7,
  skills: ["Python", "SQL", "Git", "React", "Data Structures", "FastAPI"],
  interests: ["Artificial Intelligence", "Large Language Models", "Autonomous Agents", "Cloud Infrastructure"],
  preferred_work_style: "Hybrid (Innovative Product Startup / Tier-1 Tech)",
  career_goals: "Secure an AI Engineer or SDE-1 role at a leading tech product company.",
  preferred_location: "Bengaluru, India / Remote",
  github_url: "https://github.com/aarav-sharma-dev",
  linkedin_url: "https://linkedin.com/in/aarav-sharma-tech"
};

export const defaultAIProfile: AIStudentProfile = {
  personality_summary: "Aarav combines high analytical rigor with proactive engineering curiosity. Demonstrates high intrinsic motivation for deep technical challenges and thrives in autonomous, fast-moving software environments.",
  learning_style: "Project-First (Learn by building production-grade capstones and debugging live code)",
  technical_strengths: ["Python Backend Architecture", "Relational Database Design (SQL)", "Algorithmic Problem Solving (DSA)", "RESTful API Integration"],
  soft_skills: ["Clear Technical Communication", "High Cognitive Flexibility", "Collaborative Problem Solving", "Constructive Receptivity to Feedback"],
  weaknesses: [
    "Needs more hands-on production experience with distributed vector indexing and RAG evaluation.",
    "Resume project descriptions currently lack quantitative business metrics (e.g. latency reduction %, throughput)."
  ],
  readiness_score: 84,
  confidence_score: 82,
  ikigai_alignment: "Strong convergence at the crossroads of cutting-edge Generative AI engineering and high-throughput software architecture."
};

export const defaultCareerRecommendations: CareerRecommendation[] = [
  {
    id: "ai-engineer",
    title: "AI Engineer",
    category: "Artificial Intelligence & Data",
    match_percentage: 94,
    why_it_matches: "Your core proficiency in Python, APIs, and interest in LLMs and Autonomous Agents aligns 94% with modern AI engineering job descriptions.",
    required_skills: ["Python", "PyTorch / TensorFlow", "LangChain / LangGraph", "Vector DBs (Chroma/Pinecone)", "RAG Pipelines", "FastAPI / Docker"],
    salary_range: "$95,000 - $185,000 / ₹14 - 35 LPA",
    job_demand: "Extremely High (98/100)",
    future_growth: "+36% over next 5 years",
    learning_difficulty: "Advanced",
    recommended_companies: ["OpenAI", "Google", "Microsoft", "Anthropic", "NVIDIA", "Perplexity"]
  },
  {
    id: "software-engineer",
    title: "Software Engineer (Full Stack)",
    category: "Software Engineering",
    match_percentage: 91,
    why_it_matches: "Strong grounding in React, Python, SQL, and Data Structures qualifies you immediately for high-volume campus SDE hiring brackets.",
    required_skills: ["TypeScript / JavaScript", "React / Next.js", "Node.js / Python", "REST APIs", "PostgreSQL", "Git & CI/CD"],
    salary_range: "$80,000 - $165,000 / ₹8 - 28 LPA",
    job_demand: "Very High (95/100)",
    future_growth: "+25% over next 5 years",
    learning_difficulty: "Moderate",
    recommended_companies: ["Google", "Atlassian", "Amazon", "Salesforce", "Razorpay", "Zomato"]
  },
  {
    id: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    category: "Artificial Intelligence & Data",
    match_percentage: 86,
    why_it_matches: "Solid mathematical intuition and Python skills make bridging into MLOps and predictive modeling straightforward.",
    required_skills: ["Python", "Scikit-Learn", "PyTorch", "MLflow", "SQL", "Docker"],
    salary_range: "$90,000 - $175,000 / ₹10 - 30 LPA",
    job_demand: "High (92/100)",
    future_growth: "+28% over next 5 years",
    learning_difficulty: "Advanced",
    recommended_companies: ["Meta", "Uber", "Fractal Analytics", "Adobe", "Apple"]
  },
  {
    id: "data-engineer",
    title: "Data Engineer",
    category: "Artificial Intelligence & Data",
    match_percentage: 82,
    why_it_matches: "Your strong SQL and Python foundations provide the perfect bedrock for distributed data pipeline engineering.",
    required_skills: ["SQL (Advanced)", "Python / Scala", "Apache Spark", "Airflow", "Snowflake / BigQuery", "Kafka"],
    salary_range: "$90,000 - $170,000 / ₹10 - 32 LPA",
    job_demand: "Very High (94/100)",
    future_growth: "+30% over next 5 years",
    learning_difficulty: "Moderate to High",
    recommended_companies: ["Databricks", "Snowflake", "Stripe", "JPMorgan Chase", "Swiggy"]
  }
];

export const defaultSkillGapAnalysis: SkillGapAnalysis = {
  target_role: "AI Engineer",
  match_percentage: 76,
  existing_skills: ["Python", "SQL", "Git", "REST APIs", "Data Structures & Algorithms"],
  missing_skills: [
    {
      skill: "LangChain / LangGraph & Agent Swarms",
      importance: "Critical",
      status: "Missing",
      priority: 1,
      estimated_time_to_learn: "2 weeks",
      suggested_resource: "LangChain & LangGraph Official Documentation & Cookbook"
    },
    {
      skill: "Vector Databases & Dense Retrieval (ChromaDB/Pinecone)",
      importance: "Critical",
      status: "Missing",
      priority: 2,
      estimated_time_to_learn: "1 week",
      suggested_resource: "Pinecone Learning Center & Vector Search Handbook"
    },
    {
      skill: "Docker & Containerized Microservices",
      importance: "High",
      status: "Missing",
      priority: 3,
      estimated_time_to_learn: "10 days",
      suggested_resource: "Docker Curriculum & Hands-on Containers Labs"
    },
    {
      skill: "RAG Evaluation Frameworks (Ragas / TruLens)",
      importance: "High",
      status: "Missing",
      priority: 4,
      estimated_time_to_learn: "1 week",
      suggested_resource: "Ragas Documentation on Faithfulness and Answer Relevance"
    }
  ],
  readiness_verdict: "High Potential with Fast Bridge: You possess the core language and logic skills. By committing 3 hours daily for 4 weeks on the missing agentic & vector skills, you will be in the top 5% of candidate pools."
};

export const defaultPersonalizedRoadmap: PersonalizedRoadmap = {
  target_role: "AI Engineer",
  hours_per_day: 3,
  target_days: 90,
  learning_style: "Project-Based",
  daily_schedule: [
    {
      day: 1,
      time_slot: "Morning (1.5 hrs)",
      task_title: "AI Development Environment & API Keys Configuration",
      description: "Setup Python 3.11+ virtual environment, install google-genai, langchain, and configure Gemini API keys.",
      resource_link: "https://ai.google.dev",
      is_completed: true
    },
    {
      day: 2,
      time_slot: "Evening (1.5 hrs)",
      task_title: "Vector Embeddings & Cosine Distance Mechanics",
      description: "Build an in-memory cosine similarity search script using NumPy and sentence-transformers.",
      resource_link: "https://huggingface.co/blog/getting-started-with-embeddings",
      is_completed: true
    },
    {
      day: 3,
      time_slot: "Morning (1.5 hrs)",
      task_title: "ChromaDB Persistent Collection Setup",
      description: "Ingest 20 technical documents, chunk via recursive character splitter, and query nearest neighbors.",
      resource_link: "https://docs.trychroma.com",
      is_completed: false
    },
    {
      day: 4,
      time_slot: "Evening (1.5 hrs)",
      task_title: "NeetCode 150: Sliding Window & Two Pointers",
      description: "Solve 2 Medium DSA problems (Longest Substring Without Repeating Characters, Container With Most Water).",
      resource_link: "https://neetcode.io",
      is_completed: false
    },
    {
      day: 5,
      time_slot: "Morning (1.5 hrs)",
      task_title: "Prompt Engineering & Structured JSON Output Schemas",
      description: "Implement Pydantic response validation and few-shot formatting for high reliability.",
      resource_link: "https://docs.pydantic.dev",
      is_completed: false
    }
  ],
  weekly_modules: [
    {
      week_number: 1,
      focus_topic: "Generative AI Foundations & Embeddings",
      outcomes: ["Embeddings intuition", "Vector DB storage", "Chunking strategies"],
      practice_problems: ["Array & Hashing 5 problems", "Vector similarity benchmark script"],
      mini_project: "Semantic Search Engine over Academic Papers"
    },
    {
      week_number: 2,
      focus_topic: "Production RAG Pipelines & Hybrid Search",
      outcomes: ["BM25 + Dense hybrid search", "Re-ranking with Cohere/Cross-encoders", "Hallucination guards"],
      practice_problems: ["Two Pointers & Sliding Window 6 problems"],
      mini_project: "Full-Stack PDF Research Assistant with Grounded Citations"
    },
    {
      week_number: 3,
      focus_topic: "Autonomous Multi-Agent Architectures (LangGraph)",
      outcomes: ["State graphs", "Tool calling & routing", "Self-correcting code agents"],
      practice_problems: ["Trees & Graphs 5 problems"],
      mini_project: "Multi-Agent Code Reviewer with Automated GitHub PR commenting"
    },
    {
      week_number: 4,
      focus_topic: "Cloud Deployment, Dockerization & Placement Polishing",
      outcomes: ["Containerization with multi-stage Dockerfile", "CI/CD on GitHub Actions", "Cloud deploy"],
      practice_problems: ["Dynamic Programming & System Design mock"],
      mini_project: "Live Production Capstone with custom domain and latency observability"
    }
  ],
  monthly_milestones: [
    {
      month_number: 1,
      theme: "Foundational GenAI & Algorithmic Core",
      deliverable_capstone: "60+ DSA problems solved + 2 functional GenAI backend microservices.",
      evaluation_criteria: "Clean Git commit history, high unit test coverage, and clear architecture README."
    },
    {
      month_number: 2,
      theme: "Agentic Systems & Industry-Grade Capstone",
      deliverable_capstone: "Autonomous Multi-Agent Platform deployed on cloud with live demo video.",
      evaluation_criteria: "Scalable schema, sub-200ms API response time, and zero unhandled exceptions."
    },
    {
      month_number: 3,
      theme: "Placement Sprint & Behavioral Interview Mastery",
      deliverable_capstone: "ATS 90+ customized resume, 12 completed mock interviews, 40+ strategic applications.",
      evaluation_criteria: "Confidence score > 85%, STAR behavioral fluency, and offer readiness."
    }
  ]
};

export const defaultResumeAnalysis: ResumeAnalysis = {
  overall_score: 86,
  breakdown: {
    ats_score: 86,
    formatting_score: 92,
    action_verbs_score: 84,
    quantifiable_metrics_score: 78,
    keyword_alignment_score: 90
  },
  detected_skills: ["Python", "FastAPI", "React", "PostgreSQL", "Git", "Docker", "REST APIs", "DSA"],
  missing_keywords: [
    "CI/CD Pipeline (GitHub Actions)",
    "Distributed Caching (Redis)",
    "Unit Testing (Pytest/Jest)",
    "Cloud Architecture (AWS / GCP)",
    "RAG / Vector Databases"
  ],
  grammar_and_tone_feedback: [
    "Strong, technical voice throughout the experience section.",
    "Eliminate passive verbs like 'Responsible for helping build' and replace with active drivers like 'Architected' or 'Engineered'.",
    "Keep bullet points strictly under 2 lines for effortless ATS scanning."
  ],
  bullet_point_improvements: [
    {
      before: "Worked on an AI chatbot that answers questions from documents.",
      after: "Architected an enterprise RAG agent using Gemini 2.5, ChromaDB, and FastAPI, cutting document query latency by 44% for 1,500+ active queries."
    },
    {
      before: "Made a website using React and Node.js for campus events.",
      after: "Engineered a high-concurrency event portal using Next.js and PostgreSQL with Redis session caching, supporting 5,000+ simultaneous registrations during tech fest."
    }
  ],
  suggested_action_verbs: ["Spearheaded", "Architected", "Engineered", "Orchestrated", "Accelerated", "Automated"]
};

export const defaultPlacementReadiness: PlacementReadiness = {
  overall_score: 82,
  breakdown: {
    Programming: 88,
    DSA: 78,
    Aptitude: 82,
    Communication: 85,
    Resume: 86,
    Projects: 84,
    Certifications: 75,
    "Interview Readiness": 80
  },
  target_company_tiers: {
    "Tier 1 (Product & AI Giants)": ["Google", "Microsoft", "Amazon", "Uber", "Razorpay", "NVIDIA"],
    "Tier 2 (High-Growth Tech Startups)": ["Zomato", "Swiggy", "Postman", "Zerodha", "CRED", "BrowserStack"],
    "Tier 3 (Global Tech & Enterprise MNCs)": ["TCS Digital", "Infosys Power Programmer", "Cognizant", "Accenture", "Wipro Turbo"]
  },
  critical_action_items: [
    "Solve 15 more medium problems on Tree and Graph traversals to elevate DSA score above 85.",
    "Add Docker Compose containerization and CI/CD badge to your top GitHub repository.",
    "Complete 2 full-length simulated AI Mock Interview rounds before weekend."
  ],
  placement_probability_percentage: 87
};

export const defaultGamificationStatus: GamificationStatus = {
  current_xp: 1850,
  current_level: 4,
  current_streak_days: 8,
  badges_earned: [
    { id: "b1", name: "Profile Master", icon: "🌱", description: "Completed in-depth student onboarding" },
    { id: "b2", name: "ATS 85+ Club", icon: "📄", description: "Scored 86 in ATS Resume Diagnostic" },
    { id: "b3", name: "DSA Sprinter", icon: "💻", description: "Solved 25 LeetCode roadmap challenges" },
    { id: "b4", name: "8-Day Flame", icon: "🔥", description: "Maintained continuous daily learning streak" }
  ],
  daily_challenges: [
    { id: "ch-1", title: "Solve 1 Binary Search Tree LeetCode problem", xp: 50, completed: true },
    { id: "ch-2", title: "Review 3 System Design concepts (CAP theorem, Caching)", xp: 40, completed: false },
    { id: "ch-3", title: "Complete 1 AI Mock Interview Round", xp: 100, completed: false }
  ],
  leaderboard_rank: 12
};
