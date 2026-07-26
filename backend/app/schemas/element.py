from pydantic import BaseModel, Field


class ElementResponse(BaseModel):
    id: str

    name: str

    description: str

    # URL для отображения в UI
    main_reference: str | None = None

    references: list[str] = Field(default_factory=list)

    # Имена файлов для backend
    main_reference_file: str | None = None

    reference_files: list[str] = Field(default_factory=list)