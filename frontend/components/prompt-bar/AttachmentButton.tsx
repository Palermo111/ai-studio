"use client";

import { Paperclip } from "lucide-react";
import { useRef } from "react";

import { useUploadStore } from "@/store/uploadStore";

export default function AttachmentButton() {
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useUploadStore((state) => state.addFiles);

  function handleFiles(files: FileList | null) {
    if (!files) return;

    const currentFiles = useUploadStore.getState().files;

    let imageIndex =
      currentFiles.filter((f) => f.type === "image").length + 1;

    let videoIndex =
      currentFiles.filter((f) => f.type === "video").length + 1;

    let audioIndex =
      currentFiles.filter((f) => f.type === "audio").length + 1;

    const uploaded = Array.from(files).map((file) => {
      let type: "image" | "video" | "audio";
      let alias = "";

      if (file.type.startsWith("image/")) {
        type = "image";
        alias = `@image${imageIndex++}`;
      } else if (file.type.startsWith("video/")) {
        type = "video";
        alias = `@video${videoIndex++}`;
      } else {
        type = "audio";
        alias = `@audio${audioIndex++}`;
      }

      return {
        id: crypto.randomUUID(),
        file,
        preview:
          type === "image"
            ? URL.createObjectURL(file)
            : undefined,
        type,
        alias,
      };
    });

    addFiles(uploaded);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-border
          bg-background
          text-foreground
          transition-all
          duration-200
          hover:bg-muted
        "
      >
        <Paperclip size={18} />
      </button>

      <input
        ref={inputRef}
        hidden
        multiple
        type="file"
        accept="image/*,video/*,audio/*"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </>
  );
}