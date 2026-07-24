import { Resolution } from "@/store/generationStore";

import { SEEDANCE } from "@/constants/models/seedance";
import { KLING } from "@/constants/models/kling";

export function calculateGenerationPrice(
  model: string,
  resolution: Resolution,
  duration: number,
  audio: boolean,
  usdRate: number
) {
  const selectedModel =
    SEEDANCE.models.find(
      (m) => m.id === model
    ) ??
    KLING.models.find(
      (m) => m.id === model
    );

  if (!selectedModel) {
    return 0;
  }

  const price =
    selectedModel.pricePerSecond[
      resolution as keyof typeof selectedModel.pricePerSecond
    ];

  if (!price) {
    return 0;
  }

  const pricePerSecond = audio
    ? price.audio
    : price.video;

  const usd = pricePerSecond * duration;

  return Math.round(usd * usdRate);
}