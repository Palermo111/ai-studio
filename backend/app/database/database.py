from pathlib import Path
import sqlite3


class Database:
    def __init__(self):
        self.db_path = Path("data") / "ai_studio.db"

        self.db_path.parent.mkdir(exist_ok=True)

        self._create_tables()

    def connect(self):
        connection = sqlite3.connect(self.db_path)
        connection.row_factory = sqlite3.Row
        return connection

    def _create_tables(self):
        with self.connect() as conn:

            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS projects (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,

                    name TEXT NOT NULL UNIQUE,

                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """
            )

            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS generation_history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,

                    project_id INTEGER,

                    prompt TEXT NOT NULL,
                    model TEXT NOT NULL,

                    duration INTEGER,
                    resolution TEXT,
                    aspect_ratio TEXT,

                    video_path TEXT,

                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                    FOREIGN KEY (project_id)
                        REFERENCES projects(id)
                        ON DELETE SET NULL
                )
                """
            )

            conn.commit()