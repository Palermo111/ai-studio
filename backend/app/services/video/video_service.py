import os
import time
from datetime import datetime

from app.services.video.payloads.seedance import SeedancePayload
from app.config import BASE_URL, POLL_INTERVAL
from app.database.history_service import HistoryService
from app.providers.openrouter import OpenRouterClient
from app.schemas.video_request import VideoRequest
from app.exceptions import OpenRouterError
from app.schemas.models import (
    SEEDANCE_20,
    KLING_V3,
)

from app.services.video.payloads.kling import KlingPayload


class VideoService:
    def __init__(self):
        self.client = OpenRouterClient()
        self.history = HistoryService()

    def generate(self, request: VideoRequest) -> str:
        print("=== SUBMIT ===")

        job = self._submit_job(request)

        if job.get("error"):
            raise OpenRouterError(job["error"]["message"])
        print("JOB =", job)

        print(job)

        print("=== WAIT ===")

        self._wait_for_completion(job["polling_url"])

        print("=== DOWNLOAD ===")

        video_bytes = self._download_video(job["id"])

        print(f"Downloaded {len(video_bytes)} bytes")

        output_dir = self._get_output_dir(request)

        print("Output dir:", output_dir)

        video_path = self._save_video(
            video_bytes=video_bytes,
            output_dir=output_dir,
        )

        print("Saved:", video_path)

        self.history.add(
            prompt=request.prompt,
            model=request.model,
            duration=request.duration,
            resolution=request.resolution,
            aspect_ratio=request.aspect_ratio,
            video_path=video_path,
        )

        public_url = self._build_public_url(video_path)

        print("Public URL:", public_url)

        return public_url

    def delete_video(
        self,
        filename: str,
        project_id: int | None = None,
    ) -> None:
        request = VideoRequest(
            prompt="",
            project_id=project_id,
        )

        output_dir = self._get_output_dir(request)

        path = os.path.join(output_dir, filename)

        if os.path.exists(path):
            os.remove(path)

    def _submit_job(
        self,
        request: VideoRequest,
    ) -> dict:

        if request.model == KLING_V3:
            payload = KlingPayload.build(request)

        else:
            payload = SeedancePayload.build(request)

        print("=" * 50)
        print("MODEL:", request.model)
        import json

        print("=" * 80)
        print("REQUEST TO OPENROUTER")
        print(json.dumps(payload, indent=2, ensure_ascii=False))
        print("=" * 80)

        print("=" * 50)

        response = self.client.post(
            "videos",
            payload,
        )

        print("=" * 80)
        print("OPENROUTER RESPONSE")
        print(json.dumps(response, indent=2, ensure_ascii=False))
        print("=" * 80)

        return response


    def _wait_for_completion(self, polling_url: str) -> None:
        while True:
            result = self.client.get_absolute(polling_url)

            status = result["status"]

            if status == "completed":
                return

            if status == "failed":
                raise RuntimeError(
                    result.get("error", "Неизвестная ошибка")
                )

            time.sleep(POLL_INTERVAL)

    def _download_video(self, job_id: str) -> bytes:
        url = (
            f"https://openrouter.ai/api/v1/"
            f"videos/{job_id}/content?index=0"
        )

        return self.client.download(url)

    def _get_output_dir(
        self,
        request: VideoRequest,
    ) -> str:
        if request.project_id is not None:
            return os.path.join(
                "projects",
                str(request.project_id),
                "videos",
            )

        return request.output_dir

    def _save_video(
        self,
        video_bytes: bytes,
        output_dir: str,
    ) -> str:
        os.makedirs(output_dir, exist_ok=True)

        filename = (
            f"seedance_{datetime.now():%Y%m%d_%H%M%S}.mp4"
        )

        path = os.path.join(output_dir, filename)

        with open(path, "wb") as file:
            file.write(video_bytes)

        return path

    def _build_public_url(self, path: str) -> str:
        public_path = path.replace("\\", "/")

        if public_path.startswith("projects/"):
            public_path = public_path.replace(
                "projects/",
                "project-storage/",
                1,
            )

        return "/" + public_path