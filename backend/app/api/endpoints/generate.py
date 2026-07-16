from pathlib import Path
from uuid import uuid4
import traceback

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from app.config import BASE_URL
from app.exceptions import ProviderError
from app.schemas.responses import GenerateResponse
from app.schemas.video_request import VideoRequest
from app.services.reference_parser import ReferenceParser
from app.services.video.factory import VideoFactory

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

    startFrameAlias: str | None = Form(None),
    endFrameAlias: str | None = Form(None),
):
    try:
        reference_image_paths: list[str] = []
        reference_image_urls: list[str] = []

        references: dict[str, str] = {}
        reference_paths: dict[str, str] = {}

        print("=" * 80)
        print("FILES:", len(files))
        print("ALIASES:", aliases)
        print("PROJECT:", projectId)
        print("=" * 80)

        for index, file in enumerate(files):
            filename = f"{uuid4().hex}_{file.filename}"

            if projectId is None:
                save_path = (
                    Path("storage")
                    / "images"
                    / filename
                )

                image_url = (
                    f"{BASE_URL}/storage/images/{filename}"
                )

            else:
                save_path = (
                    Path("projects")
                    / str(projectId)
                    / "images"
                    / filename
                )

                image_url = (
                    f"{BASE_URL}/project-storage/{projectId}/images/{filename}"
                )

            save_path.parent.mkdir(
                parents=True,
                exist_ok=True,
            )

            with open(save_path, "wb") as buffer:
                buffer.write(await file.read())

            reference_image_paths.append(
                str(save_path)
            )

            reference_image_urls.append(
                image_url
            )

            if index < len(aliases):
                references[aliases[index]] = image_url
                reference_paths[aliases[index]] = str(save_path)

        parsed_prompt = ReferenceParser.replace_prompt(
            prompt,
            references,
        )

        start_frame_url = (
            references.get(startFrameAlias)
            if startFrameAlias
            else None
        )

        start_frame_path = (
            reference_paths.get(startFrameAlias)
            if startFrameAlias
            else None
        )

        end_frame_url = (
            references.get(endFrameAlias)
            if endFrameAlias
            else None
        )

        end_frame_path = (
            reference_paths.get(endFrameAlias)
            if endFrameAlias
            else None
        )

        print("=" * 80)
        print("REFERENCES:", references)
        print("REFERENCE PATHS:", reference_paths)
        print("START URL:", start_frame_url)
        print("START PATH:", start_frame_path)
        print("END URL:", end_frame_url)
        print("END PATH:", end_frame_path)
        print("=" * 80)

        request = VideoRequest(
            prompt=parsed_prompt,
            provider=provider,
            model=model,
            duration=duration,
            resolution=resolution,
            aspect_ratio=aspectRatio,
            generate_audio=audio,

            reference_image_paths=reference_image_paths,
            reference_image_urls=reference_image_urls,

            project_id=projectId,

            start_frame_path=start_frame_path,
            start_frame_url=start_frame_url,

            end_frame_path=end_frame_path,
            end_frame_url=end_frame_url,
        )

        service = VideoFactory.create(request)

        video_path = service.generate(request)

        return GenerateResponse(
            success=True,
            video_path=video_path,
        )

    except ProviderError as e:
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
):
    try:
        request = VideoRequest(
            prompt="",
            project_id=projectId,
        )

        service = VideoFactory.create(request)

        service.delete_video(
            filename=filename,
            project_id=projectId,
        )

        return {
            "success": True,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )