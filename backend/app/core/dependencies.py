from app.database.history_service import HistoryService
from app.services.seedance import SeedanceService


def get_seedance_service() -> SeedanceService:
    return SeedanceService()


def get_history_service() -> HistoryService:
    return HistoryService()