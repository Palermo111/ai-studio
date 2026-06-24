from fastapi import APIRouter

from app.database.file_service import FileService

router = APIRouter(
    prefix="/projects",
    tags=["Files"],
)

files = FileService()


@router.get("/{project_id}/files/{section}")
def get_files(
    project_id: int,
    section: str,
):
    return files.get_files(
        project_id,
        section,
    )