import { create } from "zustand";

import { Element } from "@/types/element";
import { useProjectStore } from "@/store/projectStore";

import {
  getElements,
  createElement,
  updateElement,
  deleteElement,
} from "@/services/elementsService";

interface ElementStore {
  elements: Element[];

  selectedElementId: string | null;

  loadElements: () => Promise<void>;

  addElement: (
    formData: FormData
  ) => Promise<void>;

  updateElement: (
    elementId: string,
    formData: FormData
  ) => Promise<void>;

  deleteElement: (
    elementId: string
  ) => Promise<void>;

  selectElement: (
    id: string | null
  ) => void;

  clearSelection: () => void;
}

export const useElementStore =
  create<ElementStore>((set) => ({
    elements: [],

    selectedElementId: null,

    async loadElements() {
      const project =
        useProjectStore.getState().activeProject;

      if (!project) {
        return;
      }

      const elements =
        await getElements(project.id);

      set({
        elements,
      });
    },

    async addElement(
      formData
    ) {
      const project =
        useProjectStore.getState().activeProject;

      if (!project) {
        return;
      }

      const element =
        await createElement(
          project.id,
          formData
        );

      set((state) => ({
        elements: [
          ...state.elements,
          element,
        ],
      }));
    },

    async updateElement(
      elementId,
      formData
    ) {
      const project =
        useProjectStore.getState().activeProject;

      if (!project) {
        return;
      }

      const updated =
        await updateElement(
          project.id,
          elementId,
          formData
        );

      set((state) => ({
        elements:
          state.elements.map(
            (element) =>
              element.id ===
              elementId
                ? updated
                : element
          ),
      }));
    },

    async deleteElement(
      elementId
    ) {
      const project =
        useProjectStore.getState().activeProject;

      if (!project) {
        return;
      }

      await deleteElement(
        project.id,
        elementId
      );

      set((state) => ({
        elements:
          state.elements.filter(
            (element) =>
              element.id !==
              elementId
          ),
      }));
    },

    selectElement(id) {
      set({
        selectedElementId: id,
      });
    },

    clearSelection() {
      set({
        selectedElementId: null,
      });
    },
  }));