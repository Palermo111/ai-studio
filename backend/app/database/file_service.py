from pathlib import Path


class FileService:
    def __init__(self):
        self.projects_path = Path("projects")

    def get_files(
        self,
        project_id: int,
        section: str,
    ) -> list[dict]:
        folder = (
            self.projects_path
            / str(project_id)
            / section
        )

        if not folder.exists():
            return []

        files = []

        for file in sorted(folder.iterdir()):
            if file.is_file():
                files.append(
                    {
                        "name": file.name,
                    }
                )

        return files