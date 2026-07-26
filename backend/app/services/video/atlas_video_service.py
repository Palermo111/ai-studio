import os
import time
from datetime import datetime

from app.config import BASE_URL
from app.database.history_service import HistoryService
from app.providers.atlas import AtlasClient
from app.exceptions import TemporaryProviderError

from app.schemas.video_request import VideoRequest
from app.services.video.base import BaseVideoService
from app.services.video.payloads.kling import KlingPayload


class AtlasVideoService(BaseVideoService):

    def __init__(self):
        self.client = AtlasClient()
        self.history = HistoryService()

    def generate(
        self,
        request: VideoRequest,
    ) -> str:

        print("=" * 80)
        print("ATLAS GENERATE")
        print("=" * 80)

        # --------------------------------------------------
        # Загружаем все локальные изображения в Atlas
        # --------------------------------------------------

        if request.start_frame_path:

            print("Uploading start frame...")

            result = self.client.upload_media(
                request.start_frame_path
            )

            request.start_frame_url = (
                result["data"]["download_url"]
            )

        if request.end_frame_path:

            print("Uploading end frame...")

            result = self.client.upload_media(
                request.end_frame_path
            )

            request.end_frame_url = (
                result["data"]["download_url"]
            )

        uploaded_urls = []

        for image_path in request.reference_image_paths:

            print("Uploading reference image...")

            result = self.client.upload_media(
                image_path
            )

            uploaded_urls.append(
                result["data"]["download_url"]
            )

        request.reference_image_urls = uploaded_urls

        if request.elements:

            for element in request.elements:

                # Главное изображение элемента
                if element.get("mainReferenceFile"):

                    image_path = os.path.join(
                        "projects",
                        str(request.project_id),
                        "images",
                        element["mainReferenceFile"],
                    )

                    print(
                        f"Uploading element main image: {image_path}"
                    )

                    result = self.client.upload_media(
                        image_path
                    )

                    element["frontal_image"] = (
                        result["data"]["download_url"]
                    )

                # Дополнительные изображения
                refer_images = []

                for filename in element.get(
                    "referenceFiles",
                    [],
                ):

                    image_path = os.path.join(
                        "projects",
                        str(request.project_id),
                        "images",
                        filename,
                    )

                    print(
                        f"Uploading element reference image: {image_path}"
                    )

                    result = self.client.upload_media(
                        image_path
                    )

                    refer_images.append(
                        result["data"]["download_url"]
                    )

                element["refer_images"] = refer_images     

        payload = KlingPayload.build(request)

        print("=" * 80)
        print("PAYLOAD")
        print(payload)
        print("=" * 80)

        response = self.client.generate_video(
            payload
        )

        prediction_id = response["data"]["id"]

        print("Prediction:", prediction_id)


        MAX_WAIT_TIME = 20 * 60

        attempt = 1
        start_time = time.monotonic()

        while True:

            elapsed = time.monotonic() - start_time

            if elapsed > MAX_WAIT_TIME:
                raise TimeoutError(
                    "Atlas не завершил генерацию за допустимое время."
                )

            print(f"Polling #{attempt}")

            try:

                result = self.client.get_prediction(
                    prediction_id
                )

            except TemporaryProviderError:

                print(
                    "Temporary Atlas error. Retrying..."
                )

                attempt += 1

                elapsed = time.monotonic() - start_time

                time.sleep(
                    self._get_poll_interval(elapsed)
                )

                continue

            status = result["data"]["status"]

            print("STATUS:", status)

            if status in (
                "completed",
                "succeeded",
            ):
                video_url = result["data"][
                    "outputs"
                ][0]
                break

            if status == "failed":
                raise RuntimeError(
                    result["data"].get(
                        "error",
                        "Generation failed",
                    )
                )

            attempt += 1

            elapsed = time.monotonic() - start_time

            time.sleep(
                self._get_poll_interval(elapsed)
            )

        print("Downloading...")

        video_bytes = self.client.download(
            video_url
        )

        output_dir = self._get_output_dir(
            request
        )

        video_path = self._save_video(
            video_bytes,
            output_dir,
        )

        self.history.add(
            prompt=request.prompt,
            model=request.model,
            duration=request.duration,
            resolution=request.resolution,
            aspect_ratio=request.aspect_ratio,
            video_path=video_path,
        )

        return self._build_public_url(
            video_path
        )

    def delete_video(
        self,
        filename: str,
        project_id: int | None = None,
    ) -> None:

        request = VideoRequest(
            prompt="",
            project_id=project_id,
        )

        output_dir = self._get_output_dir(
            request
        )

        path = os.path.join(
            output_dir,
            filename,
        )

        if os.path.exists(path):
            os.remove(path)

    def _get_poll_interval(
        self,
        elapsed: float,
    ) -> int:

        if elapsed < 30:
            return 2

        if elapsed < 90:
            return 5

        return 10

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

        os.makedirs(
            output_dir,
            exist_ok=True,
        )

        filename = (
            f"kling_{datetime.now():%Y%m%d_%H%M%S}.mp4"
        )

        path = os.path.join(
            output_dir,
            filename,
        )

        with open(path, "wb") as file:
            file.write(video_bytes)

        return path

    def _build_public_url(
        self,
        path: str,
    ) -> str:

        public_path = path.replace(
            "\\",
            "/",
        )

        if public_path.startswith(
            "projects/"
        ):
            public_path = public_path.replace(
                "projects/",
                "project-storage/",
                1,
            )

        return "/" + public_path