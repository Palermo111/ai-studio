import { create } from "zustand";

export interface UploadedFile {
  id: string;

  file: File;

  preview?: string;

  type: "image" | "video" | "audio";

  // @image1 / @video1 / @audio1
  alias: string;
}

interface UploadStore {
  files: UploadedFile[];

  // Первый и последний кадр
  startFrameAlias: string | null;
  endFrameAlias: string | null;

  addFiles: (files: UploadedFile[]) => void;

  removeFile: (id: string) => void;

  clearFiles: () => void;

  setStartFrame: (alias: string | null) => void;
  setEndFrame: (alias: string | null) => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  files: [],

  startFrameAlias: null,
  endFrameAlias: null,

  addFiles: (newFiles) =>
    set((state) => ({
      files: [...state.files, ...newFiles],
    })),

  removeFile: (id) =>
    set((state) => {
      const removed = state.files.find(
        (file) => file.id === id
      );

      return {
        files: state.files.filter(
          (file) => file.id !== id
        ),

        startFrameAlias:
          removed &&
          state.startFrameAlias === removed.alias
            ? null
            : state.startFrameAlias,

        endFrameAlias:
          removed &&
          state.endFrameAlias === removed.alias
            ? null
            : state.endFrameAlias,
      };
    }),

  clearFiles: () =>
    set({
      files: [],
      startFrameAlias: null,
      endFrameAlias: null,
    }),

  setStartFrame: (alias) =>
    set((state) => ({
      startFrameAlias:
        state.startFrameAlias === alias
          ? null
          : alias,

      // Один и тот же alias не может быть и первым, и последним
      endFrameAlias:
        state.endFrameAlias === alias
          ? null
          : state.endFrameAlias,
    })),

  setEndFrame: (alias) =>
    set((state) => ({
      endFrameAlias:
        state.endFrameAlias === alias
          ? null
          : alias,

      // Один и тот же alias не может быть и первым, и последним
      startFrameAlias:
        state.startFrameAlias === alias
          ? null
          : state.startFrameAlias,
    })),
}));