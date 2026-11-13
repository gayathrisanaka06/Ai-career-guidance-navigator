import os
import json
from typing import Optional, Dict, Any
from dotenv import load_dotenv

load_dotenv()

# We check if google-genai is available
try:
    from google import genai
    from google.genai import types
    _HAS_GENAI = True
except ImportError:
    _HAS_GENAI = False

class GeminiService:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
        self.client = None
        if _HAS_GENAI and self.api_key:
            try:
                self.client = genai.Client(api_key=self.api_key)
            except Exception as e:
                print(f"Warning: Gemini Client init error: {e}")
                self.client = None

    def is_live(self) -> bool:
        return self.client is not None

    def generate_content(self, prompt: str, system_instruction: Optional[str] = None) -> Optional[str]:
        if not self.client:
            return None
        try:
            config = {}
            if system_instruction:
                config["system_instruction"] = system_instruction
            
            response = self.client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
                config=types.GenerateContentConfig(**config) if config else None
            )
            return response.text
        except Exception as e:
            print(f"Gemini generation exception: {e}")
            return None

    def generate_json(self, prompt: str, system_instruction: Optional[str] = None) -> Optional[Dict[str, Any]]:
        raw_text = self.generate_content(prompt, system_instruction)
        if not raw_text:
            return None
        try:
            # Clean possible markdown fence blocks
            clean = raw_text.strip()
            if clean.startswith("```json"):
                clean = clean[7:]
            elif clean.startswith("```"):
                clean = clean[3:]
            if clean.endswith("```"):
                clean = clean[:-3]
            return json.loads(clean.strip())
        except Exception as e:
            print(f"JSON parsing error from Gemini response: {e}")
            return None

gemini_service = GeminiService()
