from fastapi import APIRouter, Depends

from app.schemas.currency import CurrencyResponse
from app.services.currency import CurrencyService

router = APIRouter(
    prefix="/currency",
    tags=["Currency"],
)


def get_currency_service():
    return CurrencyService()


@router.get(
    "",
    response_model=CurrencyResponse,
)
def get_currency(
    service: CurrencyService = Depends(
        get_currency_service,
    ),
):
    return CurrencyResponse(
        usd_to_rub=service.get_usd_to_rub(),
    )