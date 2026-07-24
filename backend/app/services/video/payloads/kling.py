from app.schemas.video_request import VideoRequest
from app.schemas.models import (
    ATLAS_KLING_V30_STD_T2V,
    ATLAS_KLING_V30_STD_I2V,
    ATLAS_KLING_V30_PRO_T2V,
    ATLAS_KLING_V30_PRO_I2V,
    ATLAS_KLING_V30_4K_T2V,
    ATLAS_KLING_V30_4K_I2V,
)


RESOLUTION_MAP = {
    "720p": {
        "text": ATLAS_KLING_V30_STD_T2V,
        "image": ATLAS_KLING_V30_STD_I2V,
        "resolution": "720P",
    },
    "1080p": {
        "text": ATLAS_KLING_V30_PRO_T2V,
        "image": ATLAS_KLING_V30_PRO_I2V,
        "resolution": "1080P-SR",
    },
    "4K": {
        "text": ATLAS_KLING_V30_4K_T2V,
        "image": ATLAS_KLING_V30_4K_I2V,
        "resolution": "1440P-SR",
    },
}


class KlingPayload:

    @staticmethod
    def build(request: VideoRequest) -> dict:

        image_mode = (
            bool(request.start_frame_url)
            or len(request.reference_image_urls) > 0
        )

        model_info = RESOLUTION_MAP[request.resolution]

        payload = {
            "model": (
                model_info["image"]
                if image_mode
                else model_info["text"]
            ),
            "prompt": request.prompt,
            "duration": request.duration,
            "cfg_scale": request.cfg_scale,
            "sound": request.generate_audio,
            "resolution": model_info["resolution"],
            "aspect_ratio": request.aspect_ratio,
        }

        if request.negative_prompt:
            payload["negative_prompt"] = (
                request.negative_prompt
            )

        # --------------------------------------------------
        # Multi Shot
        # --------------------------------------------------

        if request.multi_shot:

            payload["multi_shot"] = True
            payload["shot_type"] = "customize"

            payload["multi_prompt"] = [
                {
                    "index": index + 1,
                    "prompt": shot.prompt,
                    "duration": shot.duration,
                }
                for index, shot in enumerate(
                    request.multi_prompt
                )
            ]

            if request.instructions.strip():
                payload["prompt"] = (
                    request.instructions
                )

        # --------------------------------------------------
        # Image → Video
        # --------------------------------------------------

        if image_mode:

            if request.start_frame_url:
                payload["image"] = (
                    request.start_frame_url
                )

            elif request.reference_image_urls:
                payload["image"] = (
                    request.reference_image_urls[0]
                )

            if request.kling_elements:
                payload["elements"] = (
                    request.kling_elements
                )

            if request.end_frame_url:
                payload["end_image"] = (
                    request.end_frame_url
                )

        return payload