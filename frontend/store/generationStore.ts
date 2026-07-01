import { create } from "zustand";

export type SeedanceModel =
  "bytedance/seedance-2.0";

export type Resolution =
  | "480p"
  | "720p"
  | "1080p"
  | "4K";

interface GenerationStore {
  provider: string;
  model: SeedanceModel;

  resolution: Resolution;
  aspectRatio: "16:9" | "9:16" | "1:1";
  duration: number;
  mode: "Mini" | "Fast" | "Pro";
  audio: boolean;

  prompt: string;

  setProvider: (provider: string) => void;
  setModel: (model: SeedanceModel) => void;

  setResolution: (
    resolution: Resolution
  ) => void;

  setAspectRatio: (
    aspectRatio: "16:9" | "9:16" | "1:1"
  ) => void;

  setDuration: (duration: number) => void;

  setMode: (
    mode: "Mini" | "Fast" | "Pro"
  ) => void;

  setAudio: (audio: boolean) => void;

  setPrompt: (prompt: string) => void;
}

export const useGenerationStore = create<GenerationStore>((set) => ({
  provider: "openrouter",

  model: "bytedance/seedance-2.0",

  resolution: "480p",
  aspectRatio: "9:16",
  duration: 4,
  mode: "Pro",
  audio: true,

  prompt: "",

  setProvider: (provider) =>
    set({
      provider,
    }),

  setModel: (model) =>
    set({
      model,
    }),

  setResolution: (resolution) =>
    set({
      resolution,
    }),

  setAspectRatio: (aspectRatio) =>
    set({
      aspectRatio,
    }),

  setDuration: (duration) =>
    set({
      duration,
    }),

  setMode: (mode) =>
    set({
      mode,
    }),

  setAudio: (audio) =>
    set({
      audio,
    }),

  setPrompt: (prompt) =>
    set({
      prompt,
    }),
}));