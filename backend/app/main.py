from app.schemas.video_request import VideoRequest
from app.services.seedance import SeedanceService


def main():

    print("=" * 40)
    print("AI Studio")
    print("=" * 40)

    prompt = input("\nВведите промпт:\n\n> ")

    request = VideoRequest(
        prompt=prompt,
    )

    service = SeedanceService()

    video_path = service.generate(request)

    print("\nГотово!")
    print(video_path)


if __name__ == "__main__":
    main()