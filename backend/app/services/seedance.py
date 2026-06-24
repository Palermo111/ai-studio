import os
import time
from datetime import datetime

from app.config import POLL_INTERVAL
from app.database.history_service import HistoryService
from app.providers.openrouter import OpenRouterClient
from app.schemas.video_request import VideoRequest


class SeedanceService:
    def __init__(self):
        self.client = OpenRouterClient()
        self.history = HistoryService()

    def generate(self, request: VideoRequest) -> str:
        """
        Полный цикл генерации видео.

        Возвращает путь к сохраненному видео.
        """

        job = self._submit_job(request)

        print(f"\nJob ID: {job['id']}")

        self._wait_for_completion(job["polling_url"])

        video_bytes = self._download_video(job["id"])

        video_path = self._save_video(
            video_bytes=video_bytes,
            output_dir=request.output_dir,
        )

        self.history.add(
            prompt=request.prompt,
            model=request.model,
            duration=request.duration,
            resolution=request.resolution,
            aspect_ratio=request.aspect_ratio,
            video_path=video_path,
        )

        return video_path

    def _submit_job(self, request: VideoRequest) -> dict:
        payload = self._build_payload(request)

        return self.client.post("videos", payload)

    def _build_payload(self, request: VideoRequest) -> dict:
        return {
            "model": request.model,
            "prompt": request.prompt,
            "duration": request.duration,
            "resolution": request.resolution,
            "aspect_ratio": request.aspect_ratio,
            "generate_audio": request.generate_audio,
        }

    def _wait_for_completion(self, polling_url: str) -> None:
        print("\nОжидаем завершения генерации...\n")

        while True:
            result = self.client.get_absolute(polling_url)

            status = result["status"]

            print("Статус:", status)

            if status == "completed":
                return

            if status == "failed":
                raise RuntimeError(
                    result.get("error", "Неизвестная ошибка")
                )

            time.sleep(POLL_INTERVAL)

    def _download_video(self, job_id: str) -> bytes:
        print("\nСкачиваем видео...")

        url = (
            f"https://openrouter.ai/api/v1/"
            f"videos/{job_id}/content?index=0"
        )

        return self.client.download(url)

    def _save_video(
        self,
        video_bytes: bytes,
        output_dir: str,
    ) -> str:
        os.makedirs(output_dir, exist_ok=True)

        filename = (
            f"seedance_"
            f"{datetime.now():%Y%m%d_%H%M%S}.mp4"
        )

        path = os.path.join(output_dir, filename)

        with open(path, "wb") as file:
            file.write(video_bytes)

        print(f"\nВидео сохранено:\n{path}")

        return path