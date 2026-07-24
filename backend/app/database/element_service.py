import json
import shutil
from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile

from app.config import (
    ALLOWED_IMAGE_EXTENSIONS,
    BASE_URL,
    ELEMENTS_FOLDER,
    IMAGES_FOLDER,
    PROJECTS_DIR,
)


class ElementService:
    def __init__(self):
        self.projects_path = Path(PROJECTS_DIR)

    def get_project_folder(
        self,
        project_id: int,
    ) -> Path:
        folder = (
            self.projects_path
            / str(project_id)
        )

        folder.mkdir(
            parents=True,
            exist_ok=True,
        )

        return folder

    def get_elements_folder(
        self,
        project_id: int,
    ) -> Path:
        folder = (
            self.get_project_folder(project_id)
            / ELEMENTS_FOLDER
        )

        folder.mkdir(
            parents=True,
            exist_ok=True,
        )

        return folder

    def get_images_folder(
        self,
        project_id: int,
    ) -> Path:
        folder = (
            self.get_project_folder(project_id)
            / IMAGES_FOLDER
        )

        folder.mkdir(
            parents=True,
            exist_ok=True,
        )

        return folder

    def get_element_file(
        self,
        project_id: int,
        element_id: str,
    ) -> Path:
        return (
            self.get_elements_folder(project_id)
            / f"{element_id}.json"
        )

    def load_element(
        self,
        project_id: int,
        element_id: str,
    ) -> dict | None:
        file = self.get_element_file(
            project_id,
            element_id,
        )

        if not file.exists():
            return None

        with open(
            file,
            "r",
            encoding="utf-8",
        ) as f:
            return json.load(f)

    def save_element(
        self,
        project_id: int,
        element: dict,
    ) -> None:
        file = self.get_element_file(
            project_id,
            element["id"],
        )

        with open(
            file,
            "w",
            encoding="utf-8",
        ) as f:
            json.dump(
                element,
                f,
                ensure_ascii=False,
                indent=4,
            )

    def get_all(
        self,
        project_id: int,
    ) -> list[dict]:
        folder = self.get_elements_folder(
            project_id
        )

        elements = []

        for file in sorted(folder.glob("*.json")):
            with open(
                file,
                "r",
                encoding="utf-8",
            ) as f:
                elements.append(
                    json.load(f)
                )

        return elements

    def get_by_id(
        self,
        project_id: int,
        element_id: str,
    ) -> dict | None:
        return self.load_element(
            project_id,
            element_id,
        )

    def create(
        self,
        project_id: int,
        name: str,
        description: str = "",
    ) -> dict:
        element = {
            "id": uuid4().hex[:8],
            "name": name,
            "description": description,
            "main_reference": None,
            "references": [],
        }

        self.save_element(
            project_id,
            element,
        )

        return element

    def update(
        self,
        project_id: int,
        element: dict,
    ) -> None:
        self.save_element(
            project_id,
            element,
        )

    def save_image(
        self,
        project_id: int,
        upload_file: UploadFile,
    ) -> str:
        extension = Path(
            upload_file.filename or ""
        ).suffix.lower()

        if extension not in ALLOWED_IMAGE_EXTENSIONS:
            raise ValueError(
                f"Unsupported image format: {extension}"
            )

        filename = (
            f"{uuid4().hex}{extension}"
        )

        destination = (
            self.get_images_folder(project_id)
            / filename
        )

        with destination.open("wb") as buffer:
            shutil.copyfileobj(
                upload_file.file,
                buffer,
            )

        return filename

    def delete_image(
        self,
        project_id: int,
        image_name: str | None,
    ) -> None:
        if not image_name:
            return

        image = (
            self.get_images_folder(project_id)
            / image_name
        )

        if image.exists():
            image.unlink()

    def build_image_url(
        self,
        project_id: int,
        filename: str | None,
    ) -> str | None:
        if not filename:
            return None

        return (
            f"{BASE_URL}"
            f"/projects/{project_id}"
            f"/images/{filename}"
        )

    def prepare_response(
        self,
        project_id: int,
        element: dict,
    ) -> dict:
        return {
            "id": element["id"],
            "name": element["name"],
            "description": element["description"],
            "main_reference": self.build_image_url(
                project_id,
                element.get("main_reference"),
            ),
            "references": [
                self.build_image_url(
                    project_id,
                    image,
                )
                for image in element.get(
                    "references",
                    []
                )
            ],
        }

    def delete(
        self,
        project_id: int,
        element_id: str,
    ) -> bool:
        element = self.load_element(
            project_id,
            element_id,
        )

        if element is None:
            return False

        self.delete_image(
            project_id,
            element.get("main_reference"),
        )

        for image_name in element.get(
            "references",
            [],
        ):
            self.delete_image(
                project_id,
                image_name,
            )

        file = self.get_element_file(
            project_id,
            element_id,
        )

        if file.exists():
            file.unlink()

        return True