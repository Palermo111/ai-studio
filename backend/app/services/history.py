from app.database.history_service import HistoryService


class HistoryManager:
    def __init__(self):
        self.history = HistoryService()

    def get_history(self) -> list[dict]:
        return self.history.get_all()

    def clear_history(self) -> None:
        self.history.clear()

    def delete_generation(self, generation_id: int) -> None:
        self.history.delete(generation_id)