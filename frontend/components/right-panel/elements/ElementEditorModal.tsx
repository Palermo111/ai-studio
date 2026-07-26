"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getImageSize } from "@/lib/imageUtils";
import MainReferenceSection from "./MainReferenceSection";
import ElementInfoSection from "./ElementInfoSection";

import {
  LocalReference,
  ElementEditorData,
} from "@/types/element-editor";

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

  const [errors, setErrors] = useState({
    name: "",
    mainReference: "",
    references: "",
  });

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

    setErrors({
      name: "",
      mainReference: "",
      references: "",
    });
  };

  const validateForm = async (): Promise<boolean> => {
    const newErrors = {
      name: "",
      mainReference: "",
      references: "",
    };

    if (!name.trim()) {
      newErrors.name = "Введите имя элемента.";
    }

    if (!mainReference) {
      newErrors.mainReference =
        "Загрузите главный референс.";
    }

    if (references.length === 0) {
      newErrors.references =
        "Добавьте минимум один дополнительный референс.";
    }

    if (
      !newErrors.mainReference &&
      mainReference?.file
    ) {
      try {
        const { width, height } =
          await getImageSize(
            mainReference.file
          );

        if (
          width < 300 ||
          height < 300
        ) {
          newErrors.mainReference =
            "Главный референс должен быть не меньше 300×300 пикселей.";
        }
      } catch {
        newErrors.mainReference =
          "Не удалось прочитать изображение.";
      }
    }

    if (!newErrors.references) {
      for (const reference of references) {
        if (!reference.file) {
          continue;
        }

        try {
          const { width, height } =
            await getImageSize(
              reference.file
            );

          if (
            width < 300 ||
            height < 300
          ) {
            newErrors.references =
              "Все дополнительные референсы должны быть не меньше 300×300 пикселей.";

            break;
          }
        } catch {
          newErrors.references =
            "Не удалось прочитать одно из дополнительных изображений.";

          break;
        }
      }
    }

    setErrors(newErrors);

    return (
      !newErrors.name &&
      !newErrors.mainReference &&
      !newErrors.references
    );
  };

  const closeModal = () => {
    clearSelection();

    resetForm();

    onClose();
  };

  const handleSave = async () => {
    if (!(await validateForm())) {
      return;
    }

    const data: ElementEditorData = {
      name: name.trim(),
      description: description.trim(),
      mainReference,
      references,
      removeMainReference,
      replaceReferences,
    };

    if (editingElement) {
      await updateElement(
        editingElement.id,
        data
      );
    } else {
      await addElement(data);
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
              error={errors.mainReference}
              onFileChange={(value) => {
                setMainReference(value);

                if (errors.mainReference) {
                  setErrors((prev) => ({
                    ...prev,
                    mainReference: "",
                  }));
                }

                if (value === null) {
                  setRemoveMainReference(true);
                } else if (value.file) {
                  setRemoveMainReference(false);
                }
              }}
            />

            <ElementInfoSection
              name={name}
              description={description}
              references={references}
              nameError={errors.name}
              referencesError={errors.references}
              onNameChange={(value) => {
                setName(value);

                if (errors.name) {
                  setErrors((prev) => ({
                    ...prev,
                    name: "",
                  }));
                }
              }}
              onDescriptionChange={
                setDescription
              }
              onReferencesChange={(value) => {
                setReferences(value);

                if (errors.references) {
                  setErrors((prev) => ({
                    ...prev,
                    references: "",
                  }));
                }

                setReplaceReferences(true);
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