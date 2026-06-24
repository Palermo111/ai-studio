from pydantic import BaseModel


class GenerateResponse(BaseModel):
    success: bool
    video_path: str


class HistoryItem(BaseModel):
    id: int

    prompt: str
    model: str

    duration: int
    resolution: str
    aspect_ratio: str

    video_path: str

    created_at: str

class DeleteResponse(BaseModel):
    success: bool
    message: str