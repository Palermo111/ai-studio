class AIStudioError(Exception):
    """Базовое исключение AI Studio."""


class OpenRouterError(AIStudioError):
    """Общая ошибка OpenRouter."""


class InsufficientCreditsError(OpenRouterError):
    """Недостаточно средств на балансе OpenRouter."""


class GenerationFailedError(OpenRouterError):
    """Ошибка генерации видео."""


class OpenRouterConnectionError(OpenRouterError):
    """Не удалось подключиться к OpenRouter."""


class DownloadError(OpenRouterError):
    """Не удалось скачать готовое видео."""


class InvalidResponseError(OpenRouterError):
    """OpenRouter вернул неожиданный ответ API."""