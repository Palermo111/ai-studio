import os
import httpx
from dotenv import load_dotenv

load_dotenv()


class OpenRouterClient:
    def __init__(self):
        self.api_key = os.getenv("OPENROUTER_API_KEY")
        self.base_url = "https://openrouter.ai/api/v1"

        if not self.api_key:
            raise ValueError("Не найден OPENROUTER_API_KEY")

    @property
    def headers(self):
        return {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

    def get_models(self):
        response = httpx.get(
            f"{self.base_url}/models",
            headers=self.headers,
            timeout=30,
        )

        response.raise_for_status()

        return response.json()
    
    def find_model(self, keyword: str):
        models = self.get_models()

        keyword = keyword.lower()

        return [
            model
            for model in models["data"]
            if keyword in model["id"].lower()
            or keyword in model.get("name", "").lower()
    ]