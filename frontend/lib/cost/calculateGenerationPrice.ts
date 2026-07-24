import { Resolution } from "@/store/generationStore";

import { SEEDANCE } from "@/constants/models/seedance";
import { KLING } from "@/constants/models/kling";

const USD_TO_RUB = 75;

export function calculateGenerationPrice(
  model: string,
  resolution: Resolution,
  duration: number,
  audio: boolean
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

  const priceUsd = pricePerSecond * duration;

  return Math.round(priceUsd * USD_TO_RUB);
}