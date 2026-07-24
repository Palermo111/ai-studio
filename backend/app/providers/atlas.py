import os

import httpx
from dotenv import load_dotenv

from app.exceptions import (
    DownloadError,
    InvalidResponseError,
    ProviderConnectionError,
    ProviderError,
    TemporaryProviderError,
)

load_dotenv()


class AtlasClient:

    def _safe_headers(
        self,
        headers: dict,
    ) -> dict:

        safe = dict(headers)

        if "Authorization" in safe:
            safe["Authorization"] = "Bearer ********"

        return safe    

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

        import json
        import traceback

        try:

            print("=" * 80)
            print("ATLAS REQUEST")
            print(json.dumps(data, indent=2, ensure_ascii=False))
            print("=" * 80)

            with httpx.Client(timeout=600) as client:

                request = client.build_request(
                    "POST",
                    f"{self.base_url}/{endpoint}",
                    headers=self.headers,
                    json=data,
                )

                print("=" * 80)
                print("RAW HTTP REQUEST")
                print(request.method)
                print(request.url)
                print(
                    self._safe_headers(
                        dict(request.headers)
                    )
                )
                print(request.content.decode("utf-8"))
                print("=" * 80)

                response = client.send(request)

            print("=" * 80)
            print("ATLAS RESPONSE")
            print("STATUS:", response.status_code)

            if response.status_code >= 500:
                print("<response body hidden>")
            else:
                print(response.text)

            print("=" * 80)

            self._check_response(response)

            return response.json()

        except Exception as e:

            print("=" * 80)
            print("ATLAS EXCEPTION")
            traceback.print_exc()
            print()

            print("TYPE:", type(e))
            print("ERROR:", repr(e))

            if hasattr(e, "__cause__"):
                print("CAUSE:", repr(e.__cause__))

            if hasattr(e, "request"):
                print("REQUEST:", e.request)

            print("=" * 80)

            raise

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

            print("=" * 80)
            print("ATLAS POLLING")
            print("GET:", endpoint)
            print("STATUS:", response.status_code)
            print("BODY:")

            if response.status_code >= 500:
                print("<response body hidden>")
            else:
                print(response.text)

            print("=" * 80)

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

        if response.status_code in (502, 503, 504):

            print("=" * 80)
            print("ATLAS TEMPORARY ERROR")
            print("STATUS:", response.status_code)
            print("Retry later.")
            print("=" * 80)

            raise TemporaryProviderError(
                f"Atlas temporary error ({response.status_code})"
            )

        if response.status_code >= 400:

            print("=" * 80)
            print("ATLAS ERROR")
            print("STATUS:", response.status_code)
            print("BODY:")

            content_type = response.headers.get("Content-Type", "")

            if "application/json" in content_type:
                print(response.text)
            else:
                print("<non-json response hidden>")

            print("=" * 80)

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