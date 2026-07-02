const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://162.248.164.246:8000";

let cachedRate = 75;

let lastUpdate = 0;

export async function getUsdRate() {
  const now = Date.now();

  // обновляем максимум раз в 5 минут
  if (now - lastUpdate < 5 * 60 * 1000) {
    return cachedRate;
  }

  try {
    const response = await fetch(`${API_URL}/currency`);

    if (!response.ok) {
      throw new Error("Не удалось получить курс валют");
    }

    const data = await response.json();

    cachedRate = data.usd_to_rub;
    lastUpdate = now;
  } catch {
    // если backend недоступен —
    // используем последний известный курс
  }

  return cachedRate;
}