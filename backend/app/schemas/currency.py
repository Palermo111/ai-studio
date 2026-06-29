from pydantic import BaseModel


class CurrencyResponse(BaseModel):
    usd_to_rub: float