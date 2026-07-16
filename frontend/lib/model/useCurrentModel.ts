import { VIDEO_PROVIDERS } from "@/constants/providers";
import { useGenerationStore } from "@/store/generationStore";

export function useCurrentModel() {
  const provider = useGenerationStore(
    (state) => state.provider
  );

  const modelId = useGenerationStore(
    (state) => state.model
  );

  const models =
    VIDEO_PROVIDERS.find(
      (item) => item.id === provider
    )?.models ?? [];

  return (
    models.find(
      (item) => item.id === modelId
    ) ?? null
  );
}