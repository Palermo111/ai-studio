import { create } from "zustand";

interface ElementEditorStore {
  isOpen: boolean;

  open: () => void;

  close: () => void;
}

export const useElementEditorStore =
  create<ElementEditorStore>((set) => ({
    isOpen: false,

    open: () =>
      set({
        isOpen: true,
      }),

    close: () =>
      set({
        isOpen: false,
      }),
  }));