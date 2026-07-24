import { create } from "zustand";

import { Element } from "@/types/element";
import {
  ElementEditorData,
} from "@/types/element-editor";

import { useProjectStore } from "@/store/projectStore";

import {
  getElements,
  createElement,
  updateElement,
  deleteElement,
} from "@/services/elementsService";

function buildFormData(
  data: ElementEditorData
): FormData {
  const formData = new FormData();

  formData.append(
    "name",
    data.name.trim()
  );

  formData.append(
    "description",
    data.description.trim()
  );

  if (data.removeMainReference) {
    formData.append(
      "remove_main_reference",
      "true"
    );
  }

  if (data.replaceReferences) {
    formData.append(
      "replace_references",
      "true"
    );
  }

  if (data.mainReference?.file) {
    formData.append(
      "main_reference",
      data.mainReference.file
    );
  }

  data.references
    .filter((item) => item.file)
    .forEach((item) => {
      formData.append(
        "references",
        item.file!
      );
    });

  return formData;
}

function revokeIfBlob(
  url: string | null
) {
  if (
    url &&
    url.startsWith("blob:")
  ) {
    URL.revokeObjectURL(url);
  }
}

interface ElementStore {
  elements: Element[];

  selectedElementId: string | null;

  loadElements: () => Promise<void>;

  addElement: (
    data: ElementEditorData
  ) => Promise<void>;

  updateElement: (
    elementId: string,
    data: ElementEditorData
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
      data
    ) {
      const project =
        useProjectStore.getState().activeProject;

      if (!project) {
        const element: Element = {
          id: crypto.randomUUID(),
          name: data.name.trim(),
          description:
            data.description.trim(),
          mainReference:
            data.mainReference
              ? data.mainReference.file
                ? URL.createObjectURL(
                    data.mainReference.file
                  )
                : data.mainReference.preview
              : null,
          references:
            data.references.map(
              (reference) =>
                reference.file
                  ? URL.createObjectURL(
                      reference.file
                    )
                  : reference.preview
            ),
        };

        set((state) => ({
          elements: [
            ...state.elements,
            element,
          ],
        }));

        return;
      }

      const formData =
        buildFormData(data);

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
      data
    ) {
      const project =
        useProjectStore.getState().activeProject;

      if (!project) {
        set((state) => {
          const elements =
            state.elements.map(
              (element) => {
                if (
                  element.id !==
                  elementId
                ) {
                  return element;
                }

                revokeIfBlob(
                  element.mainReference
                );

                element.references.forEach(
                  revokeIfBlob
                );

                return {
                  ...element,
                  name:
                    data.name.trim(),
                  description:
                    data.description.trim(),
                  mainReference:
                    data.mainReference
                      ? data
                          .mainReference
                          .file
                        ? URL.createObjectURL(
                            data
                              .mainReference
                              .file
                          )
                        : data
                            .mainReference
                            .preview
                      : null,
                  references:
                    data.references.map(
                      (
                        reference
                      ) =>
                        reference.file
                          ? URL.createObjectURL(
                              reference.file
                            )
                          : reference.preview
                    ),
                };
              }
            );

          return {
            elements,
          };
        });

        return;
      }

      const formData =
        buildFormData(data);

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
        set((state) => {
          const element =
            state.elements.find(
              (item) =>
                item.id ===
                elementId
            );

          if (element) {
            revokeIfBlob(
              element.mainReference
            );

            element.references.forEach(
              revokeIfBlob
            );
          }

          return {
            elements:
              state.elements.filter(
                (item) =>
                  item.id !==
                  elementId
              ),
          };
        });

        return;
      }

      await deleteElement(
        project.id,
        elementId
      );

      set((state) => ({
        elements:
          state.elements.filter(
            (item) =>
              item.id !==
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