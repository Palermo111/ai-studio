from dataclasses import asdict

from fastapi import APIRouter

from app.registry.models import VIDEO_MODELS

router = APIRouter(
    prefix="/models",
    tags=["Models"],
)


@router.get("")
def get_models():
    return [
        asdict(model)
        for model in VIDEO_MODELS
    ]