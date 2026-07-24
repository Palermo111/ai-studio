"use client";

import { useRef, useState } from "react";
import { useGenerationStore } from "@/store/generationStore";
import { useCurrentModel } from "@/lib/model/useCurrentModel";
import PromptInput from "./PromptInput";
import QuickSettings from "./QuickSettings";
import GenerateButton from "./GenerateButton";
import UploadPreview from "@/components/upload/UploadPreview";

export default function PromptBar() {
  const prompt = useGenerationStore((state) => state.prompt);

  const model = useCurrentModel();

  const maxPromptLength =
    model?.id.startsWith("kling")
      ? 2500
      : 35000;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [inputHeight, setInputHeight] = useState(96);

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();

    const startY = e.clientY;
    const startHeight = inputHeight;

    const onMove = (event: MouseEvent) => {
      const nextHeight =
        startHeight + (startY - event.clientY);

      setInputHeight(
        Math.max(
          96,
          Math.min(nextHeight, 500)
        )
      );
    };

    const onUp = () => {
      window.removeEventListener(
        "mousemove",
        onMove
      );
      window.removeEventListener(
        "mouseup",
        onUp
      );
    };

    window.addEventListener(
      "mousemove",
      onMove
    );

    window.addEventListener(
      "mouseup",
      onUp
    );
  };

  return (
    <div className="px-10 py-6">
      <div className="mx-auto w-full max-w-5xl">

        <div
          className="
            overflow-hidden
            rounded-[28px]
            bg-card
            shadow-[0_10px_35px_rgba(0,0,0,0.06)]
          "
        >

          {/* INPUT */}

          <div
            className="relative"
            style={{
              height: inputHeight + 48,
            }}
          >

            {/* Resize Handle */}

            <button
              type="button"
              onMouseDown={startResize}
              className="
                absolute
                top-2
                right-2
                z-20
                h-6
                w-6
                cursor-ns-resize
                group
              "
            >
              <span
                className="
                  absolute
                  right-0
                  top-0
                  h-[2px]
                  w-4
                  rounded-full
                  rotate-45
                  bg-muted-foreground
                  transition-all
                  group-hover:w-5
                "
              />

              <span
                className="
                  absolute
                  right-1
                  top-2
                  h-[2px]
                  w-3
                  rounded-full
                  rotate-45
                  bg-muted-foreground
                  transition-all
                  group-hover:w-4
                "
              />
            </button>

            <div
              style={{
                height: "100%",
              }}
            >
              <PromptInput textareaRef={textareaRef} />
            </div>

          </div>

          {/* UPLOADS */}

          <div className="px-6">
            <UploadPreview textareaRef={textareaRef} />
          </div>

          {/* COUNTER */}

          <div className="flex px-6 pb-3">
            <span className="ml-auto text-xs text-muted-foreground">
              {prompt.length} / {maxPromptLength}
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