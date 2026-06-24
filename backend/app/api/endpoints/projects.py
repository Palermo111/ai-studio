from fastapi import APIRouter

from app.database.project_service import ProjectService
from app.schemas.project import (
    ProjectCreate,
    ProjectUpdate,
)

router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
)

project_service = ProjectService()


@router.get("")
def get_projects():
    return project_service.get_all()


@router.post("")
def create_project(project: ProjectCreate):
    return project_service.add(project.name)


@router.patch("/{project_id}")
def rename_project(
    project_id: int,
    project: ProjectUpdate,
):
    project_service.rename(
        project_id,
        project.name,
    )

    return {"success": True}


@router.delete("/{project_id}")
def delete_project(project_id: int):
    project_service.delete(project_id)

    return {"success": True}