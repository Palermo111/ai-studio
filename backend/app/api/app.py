import os

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from app.api.routes import router

load_dotenv()

AUTH_SECRET = os.getenv("AI_STUDIO_SECRET")

app = FastAPI(
    title="AI Studio",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://162.248.164.246:3000",
        "https://myaistudio.ru",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def auth_middleware(request: Request, call_next):
    path = request.url.path

    # ===========================
    # Публичные маршруты
    # ===========================

    if (
        path.startswith("/storage")
        or path.startswith("/currency")
        or path.startswith("/health")
    ):
        return await call_next(request)

    # Разрешаем доступ к файлам проектов
    if (
        "/images/" in path
        or "/videos/" in path
        or "/audio/" in path
    ):
        return await call_next(request)

    # ===========================
    # Защищенные API
    # ===========================

    protected_paths = (
        "/generate",
        "/projects",
        "/history",
        "/models",
    )

    if not path.startswith(protected_paths):
        return await call_next(request)

    if not AUTH_SECRET:
        return JSONResponse(
            status_code=500,
            content={
                "detail": "AI_STUDIO_SECRET is not configured",
            },
        )

    cookie = request.cookies.get("ai_studio_auth")

    if cookie != AUTH_SECRET:
        return JSONResponse(
            status_code=401,
            content={
                "detail": "Unauthorized",
            },
        )

    return await call_next(request)


app.mount(
    "/storage",
    StaticFiles(directory="storage"),
    name="storage",
)

app.mount(
    "/project-storage",
    StaticFiles(directory="projects"),
    name="project-storage",
)

app.include_router(router)