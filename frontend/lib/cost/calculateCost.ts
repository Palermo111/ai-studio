import { useGenerationStore } from "@/store/generationStore";
import { SEEDANCE } from "@/constants/models/seedance";

export function calculateGenerationPrice(usdRate: number) {
  const {
    model,
    duration,
    audio,
  } = useGenerationStore.getState();

  const selectedModel = SEEDANCE.models.find(
    (m) => m.id === model
  );

  if (!selectedModel) {
    return 0;
  }

  let pricePerSecond = selectedModel.pricePerSecond;

  // Seedance 1.5 Pro
  if (
    selectedModel.pricePerSecondWithAudio !== undefined &&
    selectedModel.pricePerSecondWithoutAudio !== undefined
  ) {
    pricePerSecond = audio
      ? selectedModel.pricePerSecondWithAudio
      : selectedModel.pricePerSecondWithoutAudio;
  }

  const usd = pricePerSecond * duration;

  return Math.round(usd * usdRate);
}