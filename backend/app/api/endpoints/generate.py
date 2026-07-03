from pathlib import Path
from uuid import uuid4
import os
import traceback
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile

from app.config import BASE_URL
from app.core.dependencies import get_seedance_service
from app.exceptions import OpenRouterError
from app.schemas.responses import GenerateResponse
from app.schemas.video_request import VideoRequest
from app.services.reference_parser import ReferenceParser
from app.services.seedance import SeedanceService

router = APIRouter(
    prefix="/generate",
    tags=["Generate"],
)


@router.post(
    "",
    response_model=GenerateResponse,
)
async def generate_video(
    provider: str = Form(...),
    model: str = Form(...),
    prompt: str = Form(...),
    resolution: str = Form(...),
    aspectRatio: str = Form(...),
    duration: int = Form(...),
    mode: str = Form(...),
    audio: bool = Form(...),
    projectId: int | None = Form(None),

    files: list[UploadFile] = File(default=[]),
    aliases: list[str] = Form(default=[]),

    # Keyframes
    startFrameAlias: str | None = Form(None),
    endFrameAlias: str | None = Form(None),

    service: SeedanceService = Depends(get_seedance_service),
):
    try:
        reference_images = []
        references: dict[str, str] = {}

        for index, file in enumerate(files):
            filename = f"{uuid4().hex}_{file.filename}"

            save_path = Path("storage") / filename

            save_path.parent.mkdir(
                parents=True,
                exist_ok=True,
            )

            with open(save_path, "wb") as buffer:
                buffer.write(await file.read())

            image_url = f"{BASE_URL}/storage/{filename}"

            reference_images.append(image_url)

            if index < len(aliases):
                references[aliases[index]] = image_url

        parsed_prompt = ReferenceParser.replace_prompt(
            prompt,
            references,
        )

        start_frame_url = (
            references.get(startFrameAlias)
            if startFrameAlias
            else None
        )

        end_frame_url = (
            references.get(endFrameAlias)
            if endFrameAlias
            else None
        )

        request = VideoRequest(
            prompt=parsed_prompt,
            provider=provider,
            model=model,
            duration=duration,
            resolution=resolution,
            aspect_ratio=aspectRatio,
            generate_audio=audio,
            reference_images=reference_images,
            image_to_video=len(reference_images) > 0,
            project_id=projectId,

            start_frame_url=start_frame_url,
            end_frame_url=end_frame_url,
        )

        video_path = service.generate(request)

        return GenerateResponse(
            success=True,
            video_path=video_path,
        )

    except OpenRouterError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

    except Exception:
        traceback.print_exc()
        raise


@router.delete("/video")
async def delete_video(
    filename: str,
    projectId: int | None = None,
    service: SeedanceService = Depends(get_seedance_service),
):
    try:
        service.delete_video(
            filename=filename,
            project_id=projectId,
        )

        return {"success": True}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )