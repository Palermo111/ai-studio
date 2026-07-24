"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { useGenerationStore } from "@/store/generationStore";

export default function AdvancedSection() {
  const [open, setOpen] = useState(false);

  const provider = useGenerationStore(
    (state) => state.provider
  );

  const {
    negativePrompt,
    cfgScale,
    setNegativePrompt,
    setCfgScale,
  } = useGenerationStore();

  // Показываем дополнительные настройки
  // только для Kling
  if (provider !== "kling") {
    return null;
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          flex
          h-12
          w-full
          items-center
          justify-between
          border
          border-border
          bg-background
          px-4
          transition-all
          hover:border-primary/40
          hover:bg-muted/30
          ${
            open
              ? "rounded-t-xl border-b-0"
              : "rounded-xl"
          }
        `}
      >
        <div className="flex items-center gap-2">
          <span className="text-base">
            ⚙
          </span>

          <span className="text-sm font-medium text-foreground">
            Дополнительно
          </span>
        </div>

        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="
            space-y-5
            rounded-b-xl
            border
            border-border
            bg-background
            p-4
          "
        >
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Negative Prompt
            </label>

            <textarea
              value={negativePrompt}
              onChange={(e) =>
                setNegativePrompt(e.target.value)
              }
              placeholder="Опишите, что не должно появляться в видео..."
              rows={4}
              className="
                w-full
                rounded-xl
                border
                border-border
                bg-background
                px-3
                py-2
                text-sm
                outline-none
                transition
                focus:border-primary
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              CFG Scale
            </label>

            <input
              type="range"
              min={0.1}
              max={1}
              step={0.1}
              value={cfgScale}
              onChange={(e) =>
                setCfgScale(Number(e.target.value))
              }
              className="w-full"
            />

            <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
              <span>0.1</span>

              <span className="rounded-md border border-border px-2 py-0.5 font-medium text-foreground">
                {cfgScale.toFixed(1)}
              </span>

              <span>1.0</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}