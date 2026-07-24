"use client";

import {
  LocalReference,
} from "@/types/element-editor";

import AdditionalReferencesSection from "./AdditionalReferencesSection";

interface Props {
  name: string;

  description: string;

 references: LocalReference[];

  onNameChange: (
    value: string
  ) => void;

  onDescriptionChange: (
    value: string
  ) => void;

  onReferencesChange: (
    files: LocalReference[]
  ) => void;
}

const MAX_NAME_LENGTH = 80;
const MAX_DESCRIPTION_LENGTH = 5000;

export default function ElementInfoSection({
  name,
  description,
  references,
  onNameChange,
  onDescriptionChange,
  onReferencesChange,
}: Props) {
  return (
    <div className="flex flex-col">

      {/* Название */}

      <div>

        <label
          className="
            mb-2
            block
            text-xs
            font-medium
            uppercase
            tracking-wide
            text-muted-foreground
          "
        >
          Название элемента
        </label>

        <input
          value={name}
          maxLength={MAX_NAME_LENGTH}
          onChange={(e) =>
            onNameChange(
              e.target.value
            )
          }
          placeholder="Например: Андрей"
          className="
            h-12
            w-full
            rounded-xl
            border
            border-border
            bg-background
            px-4
            text-sm
            outline-none
            transition
            focus:border-primary
          "
        />

        <div
          className="
            mt-1
            text-right
            text-xs
            text-muted-foreground
          "
        >
          {name.length}/{MAX_NAME_LENGTH}
        </div>

      </div>

      {/* Дополнительная информация */}

      <div className="mt-6">

        <label
          className="
            mb-2
            block
            text-xs
            font-medium
            uppercase
            tracking-wide
            text-muted-foreground
          "
        >
          Дополнительная информация
        </label>

        <textarea
          value={description}
          maxLength={MAX_DESCRIPTION_LENGTH}
          onChange={(e) =>
            onDescriptionChange(
              e.target.value
            )
          }
          rows={5}
          placeholder="Опишите элемент, его особенности, характер, внешний вид и другие детали..."
          className="
            w-full
            resize-none
            rounded-2xl
            border
            border-border
            bg-background
            px-4
            py-3
            text-sm
            outline-none
            transition
            focus:border-primary
          "
        />

        <div
          className="
            mt-1
            text-right
            text-xs
            text-muted-foreground
          "
        >
          {description.length}/{MAX_DESCRIPTION_LENGTH}
        </div>

      </div>

      {/* Дополнительные референсы */}

      <div className="mt-8">

        <AdditionalReferencesSection
          references={references}
          onChange={onReferencesChange}
        />

      </div>

    </div>
  );
}