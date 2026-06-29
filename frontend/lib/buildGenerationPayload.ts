import { useGenerationStore } from "@/store/generationStore";
import { useProjectStore } from "@/store/projectStore";
import { useUploadStore } from "@/store/uploadStore";

export function buildGenerationPayload() {
  const generation = useGenerationStore.getState();
  const uploads = useUploadStore.getState();
  const project = useProjectStore.getState();

  return {
    provider: generation.provider,
    model: generation.model,

    prompt: generation.prompt,

    resolution: generation.resolution,
    aspectRatio: generation.aspectRatio,
    duration: generation.duration,
    mode: generation.mode,
    audio: generation.audio,

    projectId: project.activeProject?.id ?? null,

    files: uploads.files,

    // Keyframes
    startFrameAlias: uploads.startFrameAlias,
    endFrameAlias: uploads.endFrameAlias,
  };
}