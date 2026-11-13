import re
import io
from typing import List, Dict, Any, Optional

try:
    import pypdf
    _HAS_PYPDF = True
except ImportError:
    _HAS_PYPDF = False

COMMON_TECH_SKILLS = [
    "python", "javascript", "typescript", "java", "c++", "c#", "go", "rust", "php", "ruby", "swift", "kotlin",
    "react", "next.js", "vue", "angular", "node.js", "express", "fastapi", "django", "flask", "spring boot",
    "sql", "postgresql", "mysql", "mongodb", "redis", "firebase", "sqlite", "snowflake", "bigquery",
    "aws", "gcp", "azure", "docker", "kubernetes", "terraform", "ci/cd", "git", "linux", "bash",
    "machine learning", "deep learning", "pytorch", "tensorflow", "scikit-learn", "pandas", "numpy",
    "langchain", "llamaindex", "rag", "transformers", "hugging face", "vector database", "chromadb",
    "html", "css", "tailwind", "figma", "dsa", "rest api", "graphql", "microservices"
]

ACTION_VERBS = [
    "developed", "designed", "implemented", "engineered", "architected", "optimized",
    "spearheaded", "accelerated", "deployed", "orchestrated", "automated", "reduced",
    "increased", "built", "launched", "created", "integrated", "managed", "led"
]

def extract_text_from_pdf(file_bytes: bytes) -> str:
    if not _HAS_PYPDF:
        return ""
    try:
        reader = pypdf.PdfReader(io.BytesIO(file_bytes))
        text = []
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text.append(extracted)
        return "\n".join(text)
    except Exception as e:
        print(f"Error parsing PDF: {e}")
        return ""

def analyze_resume_text(text: str) -> Dict[str, Any]:
    text_lower = text.lower()
    
    # 1. Detected Skills
    detected_skills = []
    for skill in COMMON_TECH_SKILLS:
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text_lower):
            detected_skills.append(skill.title() if len(skill) > 3 else skill.upper())

    # 2. Action verbs analysis
    found_verbs = []
    for verb in ACTION_VERBS:
        pattern = r'\b' + re.escape(verb) + r'\b'
        matches = re.findall(pattern, text_lower)
        if matches:
            found_verbs.append(verb)

    # 3. Metric and quantification check (e.g. 20%, $10k, 2x, 500+ users)
    metrics = re.findall(r'(\d+%\s*|\$\d+|\b\d+x\b|\b\d+\+\s*(?:users|queries|requests|stars))', text_lower)
    quant_score = min(100, max(30, len(metrics) * 18 + 25))

    # 4. Action verb score
    action_verb_score = min(100, max(35, len(found_verbs) * 12 + 20))

    # 5. ATS Layout formatting score heuristic
    has_contact = bool(re.search(r'[\w\.-]+@[\w\.-]+', text))
    has_education = "education" in text_lower or "degree" in text_lower or "b.tech" in text_lower or "bachelor" in text_lower
    has_experience = "experience" in text_lower or "projects" in text_lower or "work" in text_lower
    has_skills_sec = "skills" in text_lower or "technologies" in text_lower
    
    formatting_score = 40
    if has_contact: formatting_score += 15
    if has_education: formatting_score += 15
    if has_experience: formatting_score += 15
    if has_skills_sec: formatting_score += 15

    # 6. Overall ATS composite
    overall = int((formatting_score * 0.3) + (action_verb_score * 0.25) + (quant_score * 0.25) + (min(100, len(detected_skills)*6) * 0.2))

    # Suggested improvements
    improvements = []
    if quant_score < 70:
        improvements.append("Add measurable outcomes to your bullet points (e.g. 'reduced latency by 35%', 'handled 10k+ requests').")
    if action_verb_score < 70:
        improvements.append("Start each project bullet point with strong active impact verbs (Architected, Engineered, Spearheaded).")
    if not has_contact:
        improvements.append("Ensure your email and LinkedIn profile are clearly visible in the header.")

    sample_rewrites = [
        {
            "before": "Worked on a web app using React and Node.js for student data.",
            "after": "Architected a full-stack student intelligence platform using Next.js, Node.js, and PostgreSQL, accelerating query retrieval speeds by 42% for 2,500+ active users."
        },
        {
            "before": "Did machine learning models for predicting house prices.",
            "after": "Engineered an end-to-end predictive ML pipeline using XGBoost and FastAPI, achieving 94.2% R2 accuracy with automated hyperparameter tuning via Optuna."
        }
    ]

    missing_keywords = [
        "CI/CD Pipeline", "Docker / Containerization", "Unit Testing / TDD", "Microservices", "Cloud Deployment (AWS/Vercel)"
    ]

    return {
        "overall_score": overall,
        "breakdown": {
            "ats_score": overall,
            "formatting_score": formatting_score,
            "action_verbs_score": action_verb_score,
            "quantifiable_metrics_score": quant_score,
            "keyword_alignment_score": min(95, max(50, len(detected_skills) * 8))
        },
        "detected_skills": detected_skills,
        "missing_keywords": missing_keywords,
        "grammar_and_tone_feedback": [
            "Tone is professional and tech-aligned.",
            "Avoid first-person pronouns ('I', 'my') in project bullet points."
        ],
        "bullet_point_improvements": sample_rewrites,
        "suggested_action_verbs": ["Orchestrated", "Engineered", "Optimized", "Scaled", "Automated", "Delivered"]
    }
