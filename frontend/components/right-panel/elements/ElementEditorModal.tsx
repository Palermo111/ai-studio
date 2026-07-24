"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import MainReferenceSection from "./MainReferenceSection";
import ElementInfoSection from "./ElementInfoSection";

import { LocalReference } from "@/types/element-editor";

import { useElementStore } from "@/store/elementStore";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ElementEditorModal({
  open,
  onClose,
}: Props) {
  const [visible, setVisible] =
    useState(false);

  const elements =
    useElementStore(
      (state) => state.elements
    );

  const selectedElementId =
    useElementStore(
      (state) =>
        state.selectedElementId
    );

  const addElement =
    useElementStore(
      (state) => state.addElement
    );

  const updateElement =
    useElementStore(
      (state) => state.updateElement
    );

  const clearSelection =
    useElementStore(
      (state) => state.clearSelection
    );

  const editingElement =
    elements.find(
      (item) =>
        item.id === selectedElementId
    ) ?? null;

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [
    mainReference,
    setMainReference,
  ] =
    useState<LocalReference | null>(
      null
    );

  const [references, setReferences] =
    useState<LocalReference[]>([]);

  const [
    removeMainReference,
    setRemoveMainReference,
  ] = useState(false);

  const [
    replaceReferences,
    setReplaceReferences,
  ] = useState(false);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() =>
        setVisible(true)
      );
    } else {
      setVisible(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    setRemoveMainReference(false);
    setReplaceReferences(false);

    if (editingElement) {
      setName(editingElement.name);

      setDescription(
        editingElement.description
      );

      setMainReference(
        editingElement.mainReference
          ? {
              id: crypto.randomUUID(),
              preview:
                editingElement.mainReference,
            }
          : null
      );

      setReferences(
        editingElement.references.map(
          (url) => ({
            id: crypto.randomUUID(),
            preview: url,
          })
        )
      );
    } else {
      resetForm();
    }
  }, [open, editingElement]);

  const resetForm = () => {
    setName("");

    setDescription("");

    setMainReference(null);

    setReferences([]);

    setRemoveMainReference(false);

    setReplaceReferences(false);
  };

  const closeModal = () => {
    clearSelection();

    resetForm();

    onClose();
  };

  const handleSave = async () => {
    if (!name.trim()) {
      return;
    }

    const formData = new FormData();

    formData.append(
      "name",
      name.trim()
    );

    formData.append(
      "description",
      description.trim()
    );

    if (removeMainReference) {
      formData.append(
        "remove_main_reference",
        "true"
      );
    }

    if (replaceReferences) {
      formData.append(
        "replace_references",
        "true"
      );
    }

    if (mainReference?.file) {
      formData.append(
        "main_reference",
        mainReference.file
      );
    }

    references
      .filter(
        (reference) => reference.file
      )
      .forEach((reference) => {
        formData.append(
          "references",
          reference.file!
        );
      });

    if (editingElement) {
      await updateElement(
        editingElement.id,
        formData
      );
    } else {
      await addElement(formData);
    }

    closeModal();
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className={`
        fixed inset-0 z-[60]
        flex items-center justify-center
        bg-black/25
        backdrop-blur-sm
        transition-opacity duration-200
        ${
          visible
            ? "opacity-100"
            : "opacity-0"
        }
      `}
    >
      <div
        className={`
          relative
          flex
          w-[980px]
          flex-col
          overflow-hidden
          rounded-[28px]
          bg-background
          shadow-2xl
          transition-all
          duration-200
          ${
            visible
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0"
          }
        `}
      >
        <div
          className="
            flex
            items-center
            justify-between
            px-8
            py-6
          "
        >
          <h2 className="text-xl font-semibold">
            {editingElement
              ? "Редактирование элемента"
              : "Создание элемента"}
          </h2>

          <button
            onClick={closeModal}
            className="
              rounded-lg
              p-2
              transition
              hover:bg-muted
            "
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-8 py-8">
          <div className="flex gap-8">
            <MainReferenceSection
              file={mainReference}
              onFileChange={(value) => {
                setMainReference(value);

                if (value === null) {
                  setRemoveMainReference(
                    true
                  );
                } else if (value.file) {
                  setRemoveMainReference(
                    false
                  );
                }
              }}
            />

            <ElementInfoSection
              name={name}
              description={description}
              references={references}
              onNameChange={setName}
              onDescriptionChange={
                setDescription
              }
              onReferencesChange={(
                value
              ) => {
                setReferences(value);
                setReplaceReferences(
                  true
                );
              }}
            />
          </div>
        </div>

        <div
          className="
            flex
            items-center
            justify-end
            gap-3
            px-8
            py-6
          "
        >
          <button
            onClick={closeModal}
            className="
              h-11
              rounded-xl
              px-6
              text-sm
              transition
              hover:bg-muted
            "
          >
            Отмена
          </button>

          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="
              h-11
              rounded-xl
              bg-primary
              px-7
              text-sm
              font-medium
              text-primary-foreground
              transition
              hover:opacity-90
              disabled:pointer-events-none
              disabled:opacity-50
            "
          >
            {editingElement
              ? "Сохранить"
              : "Создать"}
          </button>
        </div>
      </div>
    </div>
  );
}