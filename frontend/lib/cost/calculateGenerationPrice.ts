import { SEEDANCE } from "@/constants/models/seedance";
import type { Resolution } from "@/store/generationStore";

const USD_TO_RUB = 75;

export function calculateGenerationPrice(
  model: string,
  resolution: Resolution,
  duration: number,
  audio: boolean
) {
  const selectedModel = SEEDANCE.models.find(
    (m) => m.id === model
  );

  if (!selectedModel) {
    return 0;
  }

  const pricePerSecond =
    selectedModel.pricePerSecond[resolution] ?? 0;

  const priceUsd = pricePerSecond * duration;

  return Math.round(priceUsd * USD_TO_RUB);
}