import os
import time
from datetime import datetime

from app.config import BASE_URL, POLL_INTERVAL
from app.database.history_service import HistoryService
from app.providers.openrouter import OpenRouterClient
from app.schemas.video_request import VideoRequest


class SeedanceService:
    def __init__(self):
        self.client = OpenRouterClient()
        self.history = HistoryService()

    def generate(self, request: VideoRequest) -> str:
        job = self._submit_job(request)

        self._wait_for_completion(job["polling_url"])

        video_bytes = self._download_video(job["id"])

        output_dir = self._get_output_dir(request)

        video_path = self._save_video(
            video_bytes=video_bytes,
            output_dir=output_dir,
        )

        # В историю сохраняем путь на диске
        self.history.add(
            prompt=request.prompt,
            model=request.model,
            duration=request.duration,
            resolution=request.resolution,
            aspect_ratio=request.aspect_ratio,
            video_path=video_path,
        )

        # А фронтенду возвращаем публичный URL
        return self._build_public_url(video_path)

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

    def _submit_job(self, request: VideoRequest) -> dict:
        payload = self._build_payload(request)

        return self.client.post("videos", payload)

    def _build_payload(self, request: VideoRequest) -> dict:
        payload = {
            "model": request.model,
            "prompt": request.prompt,
            "duration": request.duration,
            "resolution": request.resolution,
            "aspect_ratio": request.aspect_ratio,
            "generate_audio": request.generate_audio,
        }

        frame_images = []

        # Первый кадр
        if request.start_frame_url:
            frame_images.append(
                {
                    "type": "image_url",
                    "image_url": {
                        "url": request.start_frame_url,
                    },
                    "frame_type": "first_frame",
                }
            )

        # Последний кадр
        if request.end_frame_url:
            frame_images.append(
                {
                    "type": "image_url",
                    "image_url": {
                        "url": request.end_frame_url,
                    },
                    "frame_type": "last_frame",
                }
            )

        # Старый режим Image-to-Video
        if (
            not frame_images
            and request.reference_images
        ):
            frame_images.append(
                {
                    "type": "image_url",
                    "image_url": {
                        "url": request.reference_images[0],
                    },
                    "frame_type": "first_frame",
                }
            )

        if frame_images:
            payload["frame_images"] = frame_images

        print("=" * 50)
        print("MODEL:", request.model)
        print(payload)
        print("=" * 50)

        return payload

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
        path = path.replace("\\", "/")
        return f"{BASE_URL}/{path}"