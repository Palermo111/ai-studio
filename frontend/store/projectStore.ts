import { create } from "zustand";
import { Project } from "@/types/project";

interface ProjectStore {
  activeProject: Project | null;

  setActiveProject: (
    project: Project | null
  ) => void;
}

export const useProjectStore =
  create<ProjectStore>((set) => ({
    activeProject: null,

    setActiveProject: (project) =>
      set({
        activeProject: project,
      }),
  }));