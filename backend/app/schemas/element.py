from pydantic import BaseModel


class ElementResponse(BaseModel):
    id: str

    name: str

    description: str

    main_reference: str | None = None

    references: list[str]