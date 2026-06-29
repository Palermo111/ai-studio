"use client";

import { useRef } from "react";
import { useGenerationStore } from "@/store/generationStore";

import PromptInput from "./PromptInput";
import QuickSettings from "./QuickSettings";
import GenerateButton from "./GenerateButton";
import UploadPreview from "@/components/upload/UploadPreview";

export default function PromptBar() {
  const prompt = useGenerationStore((state) => state.prompt);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="px-10 py-6">
      <div className="mx-auto w-full max-w-5xl">

        {/* FLOATING CONTAINER (no hard border look) */}
        <div className="overflow-hidden rounded-[28px] bg-card shadow-[0_10px_35px_rgba(0,0,0,0.06)]">

          {/* INPUT */}
          <div className="px-6 pt-5">
            <PromptInput textareaRef={textareaRef} />
          </div>

          {/* UPLOADS */}
          <div className="px-6">
            <UploadPreview textareaRef={textareaRef} />
          </div>

          {/* COUNTER */}
          <div className="flex px-6 pb-3">
            <span className="ml-auto text-xs text-muted-foreground">
              {prompt.length} / 35000
            </span>
          </div>

          {/* ACTION BAR */}
          <div className="flex items-center justify-between px-6 py-4">

            <QuickSettings />

            <GenerateButton />

          </div>

        </div>

      </div>
    </div>
  );
}