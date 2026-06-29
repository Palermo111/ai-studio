import { SEEDANCE.models } from "@/constants/models/seedance";

const USD_TO_RUB = 75;

export function calculateGenerationPrice(
  model: string,
  duration: number,
  audio: boolean
) {
  const selectedModel = SEEDANCE.models.find(
    (m) => m.id === model
  );

  if (!selectedModel) {
    return 0;
  }

  let pricePerSecond = selectedModel.pricePerSecond;

  if (
    selectedModel.pricePerSecondWithAudio !== undefined &&
    selectedModel.pricePerSecondWithoutAudio !== undefined
  ) {
    pricePerSecond = audio
      ? selectedModel.pricePerSecondWithAudio
      : selectedModel.pricePerSecondWithoutAudio;
  }

  const priceUsd = pricePerSecond * duration;

  return Math.round(priceUsd * USD_TO_RUB);
}