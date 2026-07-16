import os

import httpx
from dotenv import load_dotenv

from app.exceptions import (
    DownloadError,
    InvalidResponseError,
    ProviderConnectionError,
    ProviderError,
)

load_dotenv()


class AtlasClient:

    def __init__(self):
        self.api_key = os.getenv("ATLAS_API_KEY")
        self.base_url = "https://api.atlascloud.ai/api/v1"

        if not self.api_key:
            raise ValueError(
                "Не найден ATLAS_API_KEY"
            )

    @property
    def headers(self) -> dict:
        return {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

    def generate_video(
        self,
        payload: dict,
    ) -> dict:

        return self.post(
            "model/generateVideo",
            payload,
        )

    def get_prediction(
        self,
        prediction_id: str,
    ) -> dict:

        return self.get(
            f"model/prediction/{prediction_id}"
        )

    def download(
        self,
        url: str,
    ) -> bytes:

        try:
            with httpx.Client(timeout=600) as client:

                response = client.get(
                    url,
                    follow_redirects=True,
                )

            response.raise_for_status()

            return response.content

        except Exception as e:
            raise DownloadError(
                "Не удалось скачать видео."
            ) from e

    def upload_media(
        self,
        file_path: str,
    ) -> dict:

        try:
            with open(file_path, "rb") as file:

                files = {
                    "file": file,
                }

                headers = {
                    "Authorization": f"Bearer {self.api_key}",
                }

                with httpx.Client(timeout=600) as client:

                    response = client.post(
                        f"{self.base_url}/model/uploadMedia",
                        headers=headers,
                        files=files,
                    )

            self._check_response(response)

            return response.json()

        except httpx.ConnectError as e:
            raise ProviderConnectionError(
                "Не удалось подключиться к Atlas."
            ) from e


    def post(
        self,
        endpoint: str,
        data: dict,
    ) -> dict:

        try:

            import json

            print("=" * 80)
            print("ATLAS REQUEST")
            print(json.dumps(data, indent=2, ensure_ascii=False))
            print("=" * 80)

            with httpx.Client(timeout=600) as client:

                response = client.post(
                    f"{self.base_url}/{endpoint}",
                    headers=self.headers,
                    json=data,
                )
            
            print("=" * 80)
            print("ATLAS RESPONSE")
            print("STATUS:", response.status_code)
            print("HEADERS:", response.headers)
            print("BODY:")
            print(response.text)
            print("=" * 80)

            self._check_response(response)

            return response.json()

        except httpx.ConnectError as e:
            raise ProviderConnectionError(
                "Не удалось подключиться к Atlas."
            ) from e

    def get(
        self,
        endpoint: str,
    ) -> dict:

        try:

            with httpx.Client(timeout=600) as client:

                response = client.get(
                    f"{self.base_url}/{endpoint}",
                    headers=self.headers,
                )

            self._check_response(response)

            return response.json()

        except httpx.ConnectError as e:
            raise ProviderConnectionError(
                "Не удалось подключиться к Atlas."
            ) from e

    @staticmethod
    def _check_response(
        response: httpx.Response,
    ) -> None:

        if response.status_code >= 400:

            try:
                data = response.json()

                if isinstance(data, dict):

                    message = (
                        data.get("message")
                        or data.get("error")
                        or str(data)
                    )

                else:
                    message = str(data)

            except Exception:

                message = response.text

            raise ProviderError(message)

        if (
            "application/json"
            in response.headers.get(
                "Content-Type",
                "",
            )
        ):
            try:
                response.json()

            except Exception as e:
                raise InvalidResponseError(
                    "Atlas вернул некорректный JSON."
                ) from e