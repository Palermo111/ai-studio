from dataclasses import dataclass, field


@dataclass
class VideoModel:
    provider: str
    id: str
    name: str

    supports_audio: bool
    supports_image_to_video: bool
    supports_reference_images: bool

    max_duration: int

    resolutions: list[str] = field(default_factory=list)

    aspect_ratios: list[str] = field(default_factory=list)


VIDEO_MODELS = [
    VideoModel(
        provider="openrouter",

        id="bytedance/seedance-2.0",

        name="Seedance 2.0",

        supports_audio=True,

        supports_image_to_video=True,

        supports_reference_images=True,

        max_duration=10,

        resolutions=[
            "480p",
            "720p",
            "1080p",
        ],

        aspect_ratios=[
            "9:16",
            "16:9",
            "1:1",
        ],
    )
]