from app.schemas.video_request import VideoRequest

from app.services.video.base import BaseVideoService
from app.services.video.video_service import VideoService
from app.services.video.atlas_video_service import (
    AtlasVideoService,
)


class VideoFactory:

    @staticmethod
    def create(
        request: VideoRequest,
    ) -> BaseVideoService:

        if request.provider == "openrouter":
            return VideoService()

        if request.provider == "atlas":
            return AtlasVideoService()

        raise ValueError(
            f"Unsupported provider: {request.provider}"
        )