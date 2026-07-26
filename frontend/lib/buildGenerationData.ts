import { useElementStore } from "@/store/elementStore";
import { useGenerationStore } from "@/store/generationStore";
import { useProjectStore } from "@/store/projectStore";
import { useUploadStore } from "@/store/uploadStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { GenerationData } from "@/types/generation";

export function buildGenerationData(): GenerationData {
  const generation = useGenerationStore.getState();
  const uploads = useUploadStore.getState();
  const project = useProjectStore.getState();
  const workspace = useWorkspaceStore.getState();

  const sceneBuilder = workspace.sceneBuilder;

  let prompt = generation.prompt;

  if (sceneBuilder) {
    prompt = sceneBuilder.scenes
      .map(
        (scene, index) => `Shot ${index + 1}

${scene.prompt}`
      )
      .join("\n\n");

    if (sceneBuilder.instructions.trim()) {
      prompt += `

Instructions:

${sceneBuilder.instructions}`;
    }
  }

  // ==========================
  // DEBUG
  // ==========================

  console.log("========== buildGenerationData ==========");

  console.log(
    "Files:",
    uploads.files.map((file) => ({
      alias: file.alias,
      name: file.file.name,
      type: file.type,
    }))
  );

  console.log(
    "Start Frame:",
    uploads.startFrameAlias
  );

  console.log(
    "End Frame:",
    uploads.endFrameAlias
  );

  console.log("=========================================");

  // ==========================

  return {
    // Провайдер API
    provider:
      generation.model === "kling-v3"
        ? "atlas"
        : "openrouter",

    // AI-модель
    model: generation.model,

    // Основной prompt
    prompt,

    negativePrompt: generation.negativePrompt,
    cfgScale: generation.cfgScale,

    resolution: generation.resolution,
    aspectRatio: generation.aspectRatio,
    duration: generation.duration,
    mode: generation.mode,
    audio: generation.audio,

    // Multi Shot
    multiShot: sceneBuilder !== null,

    instructions:
      sceneBuilder?.instructions ?? "",

    multiPrompt:
      sceneBuilder?.scenes.map((scene) => ({
        prompt: scene.prompt,
        duration: scene.duration,
      })) ?? [],

    projectId: project.activeProject?.id ?? null,

    files: uploads.files,

    // Elements
    // Пока пусто. На следующем этапе сюда будут
    // автоматически подставляться элементы,
    // найденные по @mentions в prompt.
    elements: [],

    // Keyframes
    startFrameAlias: uploads.startFrameAlias,
    endFrameAlias: uploads.endFrameAlias,
  };
}