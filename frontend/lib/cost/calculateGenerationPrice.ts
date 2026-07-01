import { SEEDANCE } from "@/constants/models/seedance";

const USD_TO_RUB = 75;

export function calculateGenerationPrice(
  model: string,
  resolution: string,
  duration: number,
  audio: boolean
) {
  const selectedModel = SEEDANCE.models.find(
    (m) => m.id === model
  );

  if (!selectedModel) {
    return 0;
  }

  let pricePerSecond = 0;

  // Seedance 1.5 Pro
  if (
    selectedModel.pricePerSecondWithAudio &&
    selectedModel.pricePerSecondWithoutAudio
  ) {
    pricePerSecond = audio
      ? selectedModel.pricePerSecondWithAudio[resolution] ?? 0
      : selectedModel.pricePerSecondWithoutAudio[resolution] ?? 0;
  } else {
    pricePerSecond =
      selectedModel.pricePerSecond[resolution] ?? 0;
  }

  const priceUsd = pricePerSecond * duration;

  return Math.round(priceUsd * USD_TO_RUB);
}