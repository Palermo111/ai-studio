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

  const pricePerSecond =
    selectedModel.pricePerSecond[resolution] ?? 0;

  const usd = pricePerSecond * duration;

  return Math.round(usd * usdRate);
}