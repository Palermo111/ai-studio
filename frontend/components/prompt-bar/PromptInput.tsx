"use client";

import { RefObject } from "react";

import { useGenerationStore } from "@/store/generationStore";

interface PromptInputProps {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

export default function PromptInput({
  textareaRef,
}: PromptInputProps) {
  const prompt = useGenerationStore((state) => state.prompt);
  const setPrompt = useGenerationStore((state) => state.setPrompt);

  return (
    <div className="h-full px-6 pt-6 pb-4">
      <textarea
        ref={textareaRef}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Опишите видео, которое хотите создать..."
        className="
          block
          h-full
          w-full
          resize-none
          overflow-y-auto
          border-none
          bg-transparent
          pr-8
          text-[16px]
          leading-8
          text-foreground
          outline-none
          placeholder:text-muted-foreground
        "
      />
    </div>
  );
}