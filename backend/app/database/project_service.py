from pathlib import Path
import shutil

from app.database.database import Database


class ProjectService:
    def __init__(self):
        self.db = Database()

        self.projects_path = Path("projects")
        self.projects_path.mkdir(exist_ok=True)

    def add(self, name: str) -> dict:
        with self.db.connect() as conn:
            cursor = conn.execute(
                """
                INSERT INTO projects (name)
                VALUES (?)
                """,
                (name,),
            )

            conn.commit()

            row = conn.execute(
                """
                SELECT *
                FROM projects
                WHERE id = ?
                """,
                (cursor.lastrowid,),
            ).fetchone()

        project = dict(row)

        project_folder = self.projects_path / str(project["id"])

        (project_folder / "images").mkdir(parents=True, exist_ok=True)
        (project_folder / "videos").mkdir(parents=True, exist_ok=True)
        (project_folder / "audio").mkdir(parents=True, exist_ok=True)
        (project_folder / "elements").mkdir(parents=True, exist_ok=True)

        return project

    def get_all(self) -> list[dict]:
        with self.db.connect() as conn:
            rows = conn.execute(
                """
                SELECT *
                FROM projects
                ORDER BY created_at DESC
                """
            ).fetchall()

            return [dict(row) for row in rows]

    def get_by_id(self, project_id: int) -> dict | None:
        with self.db.connect() as conn:
            row = conn.execute(
                """
                SELECT *
                FROM projects
                WHERE id = ?
                """,
                (project_id,),
            ).fetchone()

            if row:
                return dict(row)

            return None

    def rename(
        self,
        project_id: int,
        name: str,
    ) -> None:
        with self.db.connect() as conn:
            conn.execute(
                """
                UPDATE projects
                SET name = ?
                WHERE id = ?
                """,
                (
                    name,
                    project_id,
                ),
            )

            conn.commit()

    def delete(self, project_id: int) -> None:
        project_folder = self.projects_path / str(project_id)

        if project_folder.exists():
            shutil.rmtree(project_folder)

        with self.db.connect() as conn:
            conn.execute(
                """
                DELETE FROM projects
                WHERE id = ?
                """,
                (project_id,),
            )

            conn.commit()