import os

import httpx
from dotenv import load_dotenv

from app.exceptions import (
    DownloadError,
    InsufficientCreditsError,
    InvalidResponseError,
    OpenRouterConnectionError,
    OpenRouterError,
)

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

    def get_models(self) -> dict:
        return self.get("models")

    def find_model(self, keyword: str) -> list:
        models = self.get_models()

        keyword = keyword.lower()

        return [
            model
            for model in models["data"]
            if keyword in model["id"].lower()
            or keyword in model.get("name", "").lower()
        ]

    def post(self, endpoint: str, data: dict) -> dict:
        try:
            response = httpx.post(
                f"{self.base_url}/{endpoint}",
                headers=self.headers,
                json=data,
                timeout=300,
            )

            self._check_response(response)

            return response.json()

        except httpx.ConnectError as e:
            raise OpenRouterConnectionError(
                "Не удалось подключиться к OpenRouter."
            ) from e

    def get(self, endpoint: str) -> dict:
        try:
            response = httpx.get(
                f"{self.base_url}/{endpoint}",
                headers=self.headers,
                timeout=300,
            )

            self._check_response(response)

            return response.json()

        except httpx.ConnectError as e:
            raise OpenRouterConnectionError(
                "Не удалось подключиться к OpenRouter."
            ) from e

    def get_absolute(self, url: str) -> dict:
        try:
            response = httpx.get(
                url,
                headers=self.headers,
                timeout=300,
            )

            self._check_response(response)

            return response.json()

        except httpx.ConnectError as e:
            raise OpenRouterConnectionError(
                "Не удалось подключиться к OpenRouter."
            ) from e

    def download(self, url: str) -> bytes:
        try:
            response = httpx.get(
                url,
                headers={
                    "Authorization": f"Bearer {self.api_key}",
                },
                timeout=300,
            )

            self._check_response(response)

            return response.content

        except httpx.ConnectError as e:
            raise DownloadError(
                "Не удалось скачать видео."
            ) from e

    @staticmethod
    def _check_response(response: httpx.Response) -> None:
        if response.status_code == 402:
            raise InsufficientCreditsError(
                "Недостаточно средств на балансе OpenRouter."
            )

        if response.status_code >= 400:
            try:
                message = response.json()
            except Exception:
                message = response.text

            raise OpenRouterError(message)

        try:
            if (
                "application/json"
                in response.headers.get("Content-Type", "")
            ):
                response.json()
        except Exception as e:
            raise InvalidResponseError(
                "OpenRouter вернул некорректный JSON."
            ) from e