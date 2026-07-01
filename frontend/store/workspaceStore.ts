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

export interface GeneratedVideo {
  path: string;

  resolution: string;
  duration: number;
  mode: string;
  audio: boolean;
}

interface WorkspaceState {
  section: WorkspaceSection;

  status: GenerationStatus;

  video: GeneratedVideo | null;

  error: string | null;

  setSection: (section: WorkspaceSection) => void;

  setStatus: (status: GenerationStatus) => void;

  setVideo: (video: GeneratedVideo | null) => void;

  setError: (error: string | null) => void;

  reset: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  section: "home",

  status: "idle",

  video: null,

  error: null,

  setSection: (section) =>
    set({
      section,
    }),

  setStatus: (status) =>
    set({
      status,
    }),

  setVideo: (video) =>
    set({
      video,
    }),

  setError: (error) =>
    set({
      error,
    }),

  reset: () =>
    set({
      status: "idle",
      video: null,
      error: null,
    }),
}));