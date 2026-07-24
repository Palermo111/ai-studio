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

        # --------------------------------------------------
        # Reference Images (Reference-to-Video)
        # --------------------------------------------------

        if request.reference_image_urls:
            payload["input_references"] = [
                {
                    "type": "image_url",
                    "image_url": {
                        "url": url,
                    },
                }
                for url in request.reference_image_urls
            ]

        # --------------------------------------------------
        # First / Last Frame (Image-to-Video)
        # --------------------------------------------------

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

        if frame_images:
            payload["frame_images"] = frame_images

        return payload