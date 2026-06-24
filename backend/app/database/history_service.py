import os

from app.database.database import Database


class HistoryService:
    def __init__(self):
        self.db = Database()

    def add(
        self,
        prompt: str,
        model: str,
        duration: int,
        resolution: str,
        aspect_ratio: str,
        video_path: str,
    ) -> None:
        with self.db.connect() as conn:
            conn.execute(
                """
                INSERT INTO generation_history (
                    prompt,
                    model,
                    duration,
                    resolution,
                    aspect_ratio,
                    video_path
                )
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    prompt,
                    model,
                    duration,
                    resolution,
                    aspect_ratio,
                    video_path,
                ),
            )

            conn.commit()

    def get_all(self) -> list[dict]:
        with self.db.connect() as conn:
            conn.row_factory = __import__("sqlite3").Row

            rows = conn.execute(
                """
                SELECT *
                FROM generation_history
                ORDER BY created_at DESC
                """
            ).fetchall()

            return [dict(row) for row in rows]

    def get_by_id(self, generation_id: int) -> dict | None:
        with self.db.connect() as conn:
            conn.row_factory = __import__("sqlite3").Row

            row = conn.execute(
                """
                SELECT *
                FROM generation_history
                WHERE id = ?
                """,
                (generation_id,),
            ).fetchone()

            return dict(row) if row else None

    def delete(self, generation_id: int) -> bool:
        generation = self.get_by_id(generation_id)

        if generation is None:
            return False

        video_path = generation["video_path"]

        if os.path.exists(video_path):
            os.remove(video_path)

        with self.db.connect() as conn:
            conn.execute(
                """
                DELETE FROM generation_history
                WHERE id = ?
                """,
                (generation_id,),
            )

            conn.commit()

        return True

    def clear(self) -> None:
        with self.db.connect() as conn:
            conn.execute(
                """
                DELETE FROM generation_history
                """
            )

            conn.commit()