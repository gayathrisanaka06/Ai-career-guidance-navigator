import json
import os
from typing import List
from app.models.schemas import CertificationItem

CERTS_DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "certifications.json")

class CertificationAgent:
    def __init__(self):
        with open(CERTS_DATA_PATH, "r", encoding="utf-8") as f:
            self.certs = json.load(f)

    def recommend_certifications(self, target_role_id: str = "ai-engineer") -> List[CertificationItem]:
        matched = []
        for c in self.certs:
            if target_role_id in c["recommended_for"] or "software-engineer" in c["recommended_for"]:
                matched.append(CertificationItem(
                    name=c["name"],
                    issuer=c["issuer"],
                    type=f"{c['type']} ({c['cost_type']})",
                    roi_score=c["roi_rating"],
                    time_required=c["preparation_time"],
                    official_url=c["url"],
                    why_valuable=f"Validates core competencies in {', '.join(c['key_topics'][:2])} directly evaluated by hiring managers."
                ))

        matched.sort(key=lambda x: x.roi_score, reverse=True)
        return matched

certification_agent = CertificationAgent()
