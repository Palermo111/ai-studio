import {
  Resolution,
  VideoModel,
} from "@/store/generationStore";

import { UploadedFile } from "@/store/uploadStore";
import { Element } from "@/types/element";

export type ApiProvider =
  | "openrouter"
  | "atlas";

export interface GenerationShot {
  prompt: string;
  duration: number;
}

export interface GenerationData {
  provider: ApiProvider;

  model: VideoModel;

  prompt: string;
  negativePrompt: string;

  cfgScale: number;

  resolution: Resolution;
  aspectRatio: "16:9" | "9:16" | "1:1";
  duration: number;

  mode: "Mini" | "Fast" | "Pro";
  audio: boolean;

  multiShot: boolean;
  instructions: string;
  multiPrompt: GenerationShot[];

  projectId: number | null;

  files: UploadedFile[];

  // Elements selected for generation
  elements: Element[];

  // Keyframes
  startFrameAlias: string | null;
  endFrameAlias: string | null;
}