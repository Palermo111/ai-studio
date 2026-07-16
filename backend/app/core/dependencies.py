from app.database.history_service import HistoryService

from app.services.video.base import BaseVideoService
from app.services.video.factory import VideoFactory
from app.schemas.video_request import VideoRequest


def get_video_service(
    request: VideoRequest,
) -> BaseVideoService:
    return VideoFactory.create(request)


def get_history_service() -> HistoryService:
    return HistoryService()