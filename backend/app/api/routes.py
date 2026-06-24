from fastapi import APIRouter
from app.api.endpoints.files import router as files_router
from app.api.endpoints.generate import router as generate_router
from app.api.endpoints.health import router as health_router
from app.api.endpoints.history import router as history_router
from app.api.endpoints.models import router as models_router
from app.api.endpoints.projects import router as projects_router

router = APIRouter()

router.include_router(generate_router)
router.include_router(history_router)
router.include_router(models_router)
router.include_router(projects_router)
router.include_router(health_router)
router.include_router(files_router)