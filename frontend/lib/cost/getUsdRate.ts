let cachedRate = 75;

let lastUpdate = 0;

export async function getUsdRate() {
  const now = Date.now();

  // обновляем максимум раз в 5 минут
  if (now - lastUpdate < 5 * 60 * 1000) {
    return cachedRate;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/currency");

    const data = await response.json();

    cachedRate = data.usd_to_rub;
    lastUpdate = now;
  } catch {
    // если backend недоступен —
    // используем последний известный курс
  }

  return cachedRate;
}