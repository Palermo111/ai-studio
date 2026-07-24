"use client";

import { ChangeEvent } from "react";
import { Plus, X } from "lucide-react";

import {
  LocalReference,
} from "@/types/element-editor";

interface Props {
  references: LocalReference[];

  onChange: (
    files: LocalReference[]
  ) => void;
}

const MAX_REFERENCES = 4;

export default function AdditionalReferencesSection({
  references,
  onChange,
}: Props) {
  const handleFileChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const next = [...references];

    const previous =
      next[index];

    if (
      previous?.preview.startsWith(
        "blob:"
      )
    ) {
      URL.revokeObjectURL(
        previous.preview
      );
    }

    next[index] = {
      id: crypto.randomUUID(),
      file,
      preview:
        URL.createObjectURL(file),
    };

    onChange(next);

    event.target.value = "";
  };

  const removeReference = (
    index: number
  ) => {
    const next = [...references];

    const removed =
      next[index];

    if (
      removed?.preview.startsWith(
        "blob:"
      )
    ) {
      URL.revokeObjectURL(
        removed.preview
      );
    }

    next.splice(index, 1);

    onChange(next);
  };

  return (
    <div>

      <label
        className="
          mb-4
          block
          text-xs
          font-medium
          uppercase
          tracking-wide
          text-muted-foreground
        "
      >
        Дополнительные референсы
      </label>

      <div className="flex gap-4">

        {Array.from({
          length: MAX_REFERENCES,
        }).map((_, index) => {

          const reference =
            references[index];

          return (

            <label
              key={index}
              className="
                group
                relative
                flex
                h-[130px]
                w-[80px]
                cursor-pointer
                items-center
                justify-center
                overflow-hidden
                rounded-2xl
                border-2
                border-dashed
                border-border
                bg-muted/20
                transition
                hover:border-primary/40
                hover:bg-primary/5
              "
            >

              {reference ? (

                <>

                  <img
                    src={
                      reference.preview
                    }
                    alt=""
                    className="
                      h-full
                      w-full
                      object-contain
                    "
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeReference(
                        index
                      );
                    }}
                    className="
                      absolute
                      right-1
                      top-1
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                      bg-black/60
                      text-white
                      opacity-0
                      transition
                      group-hover:opacity-100
                    "
                  >
                    <X size={14} />
                  </button>

                </>

              ) : (

                <Plus
                  size={18}
                  className="text-muted-foreground"
                />

              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleFileChange(
                    index,
                    e
                  )
                }
              />

            </label>

          );
        })}

      </div>

    </div>
  );
}