from abc import ABC, abstractmethod

from app.schemas.video_request import VideoRequest


class BaseVideoService(ABC):

    @abstractmethod
    def generate(
        self,
        request: VideoRequest,
    ) -> str:
        pass

    @abstractmethod
    def delete_video(
        self,
        filename: str,
        project_id: int | None = None,
    ) -> None:
        pass