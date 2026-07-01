import { Resolution } from "@/store/generationStore";
import { SEEDANCE } from "@/constants/models/seedance";

export function calculateGenerationPrice(
  model: string,
  resolution: Resolution,
  duration: number,
  audio: boolean,
  usdRate: number
) {
  const selectedModel = SEEDANCE.models.find(
    (m) => m.id === model
  );

  if (!selectedModel) {
    return 0;
  }

  let pricePerSecond = 0;

  // Модели, где стоимость зависит от аудио
  if (
    selectedModel.pricePerSecondWithAudio &&
    selectedModel.pricePerSecondWithoutAudio
  ) {
    pricePerSecond = audio
      ? selectedModel.pricePerSecondWithAudio[resolution] ?? 0
      : selectedModel.pricePerSecondWithoutAudio[resolution] ?? 0;
  }

  // Остальные модели
  else {
    pricePerSecond =
      selectedModel.pricePerSecond[resolution] ?? 0;
  }

  const usd = pricePerSecond * duration;

  return Math.round(usd * usdRate);
}