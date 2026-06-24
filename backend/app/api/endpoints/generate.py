from fastapi import APIRouter, Depends

from app.core.dependencies import get_seedance_service
from app.schemas.responses import GenerateResponse
from app.schemas.video_request import VideoRequest
from app.services.seedance import SeedanceService

router = APIRouter(
    prefix="/generate",
    tags=["Generate"],
)


@router.post(
    "",
    response_model=GenerateResponse,
)
def generate_video(
    request: VideoRequest,
    service: SeedanceService = Depends(get_seedance_service),
):
    video_path = service.generate(request)

    return GenerateResponse(
        success=True,
        video_path=video_path,
    )