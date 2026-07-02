from datetime import date
from pathlib import Path
import json

import httpx

CURRENCY_PATH = Path("storage/currency.json")

CBR_URL = "https://www.cbr-xml-daily.ru/daily_json.js"


class CurrencyService:
    def _ensure_file(self):
        CURRENCY_PATH.parent.mkdir(
            parents=True,
            exist_ok=True,
        )

        if not CURRENCY_PATH.exists():
            self._save(
                {
                    "usd_to_rub": 80,
                    "last_currency_update": "2000-01-01",
                }
            )

    def _load(self) -> dict:
        self._ensure_file()

        with open(
            CURRENCY_PATH,
            "r",
            encoding="utf-8",
        ) as f:
            return json.load(f)

    def _save(self, data: dict):
        CURRENCY_PATH.parent.mkdir(
            parents=True,
            exist_ok=True,
        )

        with open(
            CURRENCY_PATH,
            "w",
            encoding="utf-8",
        ) as f:
            json.dump(
                data,
                f,
                ensure_ascii=False,
                indent=2,
            )

    def get_usd_to_rub(self) -> float:
        data = self._load()

        today = date.today().isoformat()

        # Курс уже обновляли сегодня
        if data["last_currency_update"] == today:
            return data["usd_to_rub"]

        response = httpx.get(
            CBR_URL,
            timeout=10,
        )

        response.raise_for_status()

        payload = response.json()

        usd_rate = payload["Valute"]["USD"]["Value"]

        data["usd_to_rub"] = usd_rate
        data["last_currency_update"] = today

        self._save(data)

        return usd_rate