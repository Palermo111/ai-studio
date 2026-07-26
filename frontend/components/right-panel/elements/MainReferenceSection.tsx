"use client";

import {
  ChangeEvent,
  useRef,
} from "react";

import {
  Plus,
  X,
} from "lucide-react";

import {
  LocalReference,
} from "@/types/element-editor";

interface Props {
  file: LocalReference | null;

  error?: string;

  onFileChange: (
    file: LocalReference | null
  ) => void;
}

export default function MainReferenceSection({
  file,
  error,
  onFileChange,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const handleSelectFile = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    onFileChange({
      id: crypto.randomUUID(),
      file: selectedFile,
      preview:
        URL.createObjectURL(
          selectedFile
        ),
    });

    event.target.value = "";
  };

  const handleRemove = (
    event: React.MouseEvent
  ) => {
    event.stopPropagation();

    if (
      file?.preview.startsWith(
        "blob:"
      )
    ) {
      URL.revokeObjectURL(
        file.preview
      );
    }

    onFileChange(null);
  };

  return (
    <div className="w-[260px]">

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
        Основной референс
      </label>

      <div
        onClick={() =>
          inputRef.current?.click()
        }
        className="
          group
          relative
          flex
          h-[340px]
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
        {file ? (

          <>
            <img
              src={file.preview}
              alt="Preview"
              className="
                h-full
                w-full
                object-contain
              "
            />

            <button
              type="button"
              onClick={handleRemove}
              className="
                absolute
                right-2
                top-2
                flex
                h-8
                w-8
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
              <X size={16} />
            </button>
          </>

        ) : (

          <div
            className="
              flex
              flex-col
              items-center
            "
          >
            <div
              className="
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-background
                shadow-sm
              "
            >
              <Plus
                size={22}
                className="text-muted-foreground"
              />
            </div>

            <p className="text-sm font-medium">
              Загрузить фото
            </p>

            <span
              className="
                mt-1
                text-xs
                text-muted-foreground
              "
            >
              PNG или JPG
            </span>
          </div>

        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleSelectFile}
      />

      <button
        type="button"
        onClick={() =>
          inputRef.current?.click()
        }
        className="
          mt-4
          w-full
          rounded-xl
          border
          border-border
          py-2.5
          text-sm
          transition
          hover:bg-muted
        "
      >
        {file
          ? "Заменить фото"
          : "Выбрать файл"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}

    </div>
  );
}