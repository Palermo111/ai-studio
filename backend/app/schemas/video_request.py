from dataclasses import dataclass, field

from app.config import (
    DEFAULT_ASPECT_RATIO,
    DEFAULT_DURATION,
    DEFAULT_OUTPUT_DIR,
    DEFAULT_RESOLUTION,
)
from app.schemas.models import SEEDANCE_20

@dataclass
class Shot:
    prompt: str
    duration: int

@dataclass
class VideoRequest:
    prompt: str

    provider: str = "openrouter"

    model: str = SEEDANCE_20

    duration: int = DEFAULT_DURATION

    resolution: str = DEFAULT_RESOLUTION

    aspect_ratio: str = DEFAULT_ASPECT_RATIO

    # Atlas
    generate_audio: bool = False
    cfg_scale: float = 0.5
    negative_prompt: str = ""

    # Multi Shot
    multi_shot: bool = False

    instructions: str = ""

    multi_prompt: list[Shot] = field(
        default_factory=list
    )

    # Reference images
    reference_image_paths: list[str] = field(default_factory=list)
    reference_image_urls: list[str] = field(default_factory=list)

    # Kling subject references (Atlas elements)
    kling_elements: list[dict] = field(default_factory=list)

    output_dir: str = DEFAULT_OUTPUT_DIR

    # Если None — сохраняем в storage/videos
    # Если указан project_id —
    # сохраняем в projects/<project>/videos
    project_id: int | None = None

    # Первый кадр
    start_frame_path: str | None = None
    start_frame_url: str | None = None

    # Последний кадр
    end_frame_path: str | None = None
    end_frame_url: str | None = None