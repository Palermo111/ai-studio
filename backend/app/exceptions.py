class AIStudioError(Exception):
    """Базовое исключение AI Studio."""


# ======================================================
# Provider Errors
# ======================================================

class ProviderError(AIStudioError):
    """Базовая ошибка AI-провайдера."""


class ProviderConnectionError(ProviderError):
    """Не удалось подключиться к AI-провайдеру."""


class InvalidResponseError(ProviderError):
    """Провайдер вернул неожиданный ответ API."""


class InsufficientCreditsError(ProviderError):
    """Недостаточно средств на балансе."""


class DownloadError(ProviderError):
    """Не удалось скачать готовое видео."""


class GenerationFailedError(ProviderError):
    """Ошибка генерации видео."""


class SensitiveImageError(ProviderError):
    """Запрос отклонен, потому что изображение содержит реального человека."""


# ======================================================
# Совместимость со старым кодом
# ======================================================

OpenRouterError = ProviderError
OpenRouterConnectionError = ProviderConnectionError