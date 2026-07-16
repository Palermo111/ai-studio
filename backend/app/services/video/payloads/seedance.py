from app.schemas.video_request import VideoRequest


class SeedancePayload:

    @staticmethod
    def build(request: VideoRequest) -> dict:

        payload = {
            "model": request.model,
            "prompt": request.prompt,
            "duration": request.duration,
            "resolution": request.resolution,
            "aspect_ratio": request.aspect_ratio,
            "generate_audio": request.generate_audio,
        }

        frame_images = []

        if request.start_frame_url:
            frame_images.append(
                {
                    "type": "image_url",
                    "image_url": {
                        "url": request.start_frame_url,
                    },
                    "frame_type": "first_frame",
                }
            )

        if request.end_frame_url:
            frame_images.append(
                {
                    "type": "image_url",
                    "image_url": {
                        "url": request.end_frame_url,
                    },
                    "frame_type": "last_frame",
                }
            )

        if (
            not frame_images
            and request.reference_image_urls
        ):
            frame_images.append(
                {
                    "type": "image_url",
                    "image_url": {
                        "url": request.reference_image_urls[0],
                    },
                    "frame_type": "first_frame",
                }
            )

        if frame_images:
            payload["frame_images"] = frame_images

        return payload