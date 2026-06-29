import { create } from "zustand";

export type WorkspaceSection =
  | "home"
  | "projects"
  | "images"
  | "videos"
  | "audio";

export type GenerationStatus =
  | "idle"
  | "generating"
  | "success"
  | "error";

interface WorkspaceState {
  section: WorkspaceSection;

  status: GenerationStatus;

  videoPath: string | null;

  error: string | null;

  setSection: (section: WorkspaceSection) => void;

  setStatus: (status: GenerationStatus) => void;

  setVideoPath: (videoPath: string | null) => void;

  setError: (error: string | null) => void;

  reset: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  section: "home",

  status: "idle",

  videoPath: null,

  error: null,

  setSection: (section) =>
    set({
      section,
    }),

  setStatus: (status) =>
    set({
      status,
    }),

  setVideoPath: (videoPath) =>
    set({
      videoPath,
    }),

  setError: (error) =>
    set({
      error,
    }),

  reset: () =>
    set({
      status: "idle",
      videoPath: null,
      error: null,
    }),
}));