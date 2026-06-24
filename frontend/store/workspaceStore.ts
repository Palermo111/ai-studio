import { create } from "zustand";

export type WorkspaceSection =
  | "home"
  | "images"
  | "videos"
  | "audio";

interface WorkspaceState {
  section: WorkspaceSection;

  setSection: (section: WorkspaceSection) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  section: "home",

  setSection: (section) =>
    set({
      section,
    }),
}));