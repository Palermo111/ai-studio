from typing import List

from fastapi import APIRouter, Depends, HTTPException

from app.core.dependencies import get_history_service
from app.database.history_service import HistoryService
from app.schemas.responses import (
    DeleteResponse,
    HistoryItem,
)

router = APIRouter(
    prefix="/history",
    tags=["History"],
)


@router.get(
    "",
    response_model=List[HistoryItem],
)
def get_history(
    history: HistoryService = Depends(get_history_service),
):
    return history.get_all()


@router.delete(
    "/{generation_id}",
    response_model=DeleteResponse,
)
def delete_history(
    generation_id: int,
    history: HistoryService = Depends(get_history_service),
):
    deleted = history.delete(generation_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Генерация не найдена",
        )

    return DeleteResponse(
        success=True,
        message="Генерация удалена",
    )