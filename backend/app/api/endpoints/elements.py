from fastapi import (
    APIRouter,
    Form,
    HTTPException,
    UploadFile,
)

from app.database.element_service import ElementService
from app.schemas.element import ElementResponse

router = APIRouter(
    prefix="/projects",
    tags=["Elements"],
)

elements = ElementService()


@router.get(
    "/{project_id}/elements",
    response_model=list[ElementResponse],
)
def get_elements(project_id: int):
    return [
        elements.prepare_response(
            project_id,
            element,
        )
        for element in elements.get_all(
            project_id
        )
    ]


@router.get(
    "/{project_id}/elements/{element_id}",
    response_model=ElementResponse,
)
def get_element(
    project_id: int,
    element_id: str,
):
    element = elements.get_by_id(
        project_id,
        element_id,
    )

    if element is None:
        raise HTTPException(
            status_code=404,
            detail="Element not found",
        )

    return elements.prepare_response(
        project_id,
        element,
    )


@router.post(
    "/{project_id}/elements",
    response_model=ElementResponse,
    status_code=201,
)
def create_element(
    project_id: int,
    name: str = Form(...),
    description: str = Form(""),
    main_reference: UploadFile | None = None,
    references: list[UploadFile] | None = None,
):
    element = elements.create(
        project_id=project_id,
        name=name.strip(),
        description=description.strip(),
    )

    if main_reference is not None:
        element["main_reference"] = (
            elements.save_image(
                project_id,
                main_reference,
            )
        )

    if references:
        element["references"] = [
            elements.save_image(
                project_id,
                image,
            )
            for image in references
        ]

    elements.update(
        project_id,
        element,
    )

    return elements.prepare_response(
        project_id,
        element,
    )


@router.put(
    "/{project_id}/elements/{element_id}",
    response_model=ElementResponse,
)
def update_element(
    project_id: int,
    element_id: str,
    name: str = Form(...),
    description: str = Form(""),
    remove_main_reference: bool = Form(False),
    replace_references: bool = Form(False),
    main_reference: UploadFile | None = None,
    references: list[UploadFile] | None = None,
):
    element = elements.get_by_id(
        project_id,
        element_id,
    )

    if element is None:
        raise HTTPException(
            status_code=404,
            detail="Element not found",
        )

    element["name"] = name.strip()
    element["description"] = description.strip()

    # Удаление главного изображения
    if remove_main_reference:
        elements.delete_image(
            project_id,
            element.get("main_reference"),
        )

        element["main_reference"] = None

    # Замена главного изображения
    if main_reference is not None:
        if element.get("main_reference"):
            elements.delete_image(
                project_id,
                element.get("main_reference"),
            )

        element["main_reference"] = (
            elements.save_image(
                project_id,
                main_reference,
            )
        )

    # Полная замена дополнительных изображений
    if replace_references:
        for image in element.get(
            "references",
            [],
        ):
            elements.delete_image(
                project_id,
                image,
            )

        element["references"] = []

        if references:
            element["references"] = [
                elements.save_image(
                    project_id,
                    image,
                )
                for image in references
            ]

    elements.update(
        project_id,
        element,
    )

    return elements.prepare_response(
        project_id,
        element,
    )


@router.delete(
    "/{project_id}/elements/{element_id}",
    response_model=dict,
)
def delete_element(
    project_id: int,
    element_id: str,
):
    success = elements.delete(
        project_id,
        element_id,
    )

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Element not found",
        )

    return {
        "success": True,
    }