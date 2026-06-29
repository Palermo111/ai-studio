"use client";

import { RefObject, useEffect } from "react";

import { useGenerationStore } from "@/store/generationStore";

const MIN_HEIGHT = 96;
const MAX_HEIGHT = 300;

interface PromptInputProps {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

export default function PromptInput({
  textareaRef,
}: PromptInputProps) {
  const prompt = useGenerationStore((state) => state.prompt);
  const setPrompt = useGenerationStore((state) => state.setPrompt);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "0px";

    const height = Math.max(
      MIN_HEIGHT,
      Math.min(textarea.scrollHeight, MAX_HEIGHT)
    );

    textarea.style.height = `${height}px`;

    textarea.style.overflowY =
      textarea.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
  }, [prompt, textareaRef]);

  return (
    <div className="px-6 pt-6">
      <textarea
        ref={textareaRef}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Опишите видео, которое хотите создать..."
        className="
          block
          w-full
          resize-none
          border-none
          bg-transparent
          p-0
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