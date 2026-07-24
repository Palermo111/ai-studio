"use client";

import { Sparkles } from "lucide-react";

import { useGenerationStore } from "@/store/generationStore";

import Section from "./Section";
import { useState } from "react";
import SceneBuilderModal from "./scene-builder/SceneBuilderModal";

export default function SceneBuilderSection() {
  const {
    provider,
    multiShot,
    setMultiShot,
  } = useGenerationStore();

    const [open, setOpen] = useState(false);

  // Пока только для Kling
  if (provider !== "kling") {
    return null;
  }

  return (
    <Section title="Конструктор сцен">
      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">
              Multi Shot
            </div>

            <div className="mt-1 text-xs text-muted-foreground">
              Разделите видео на несколько сцен
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setMultiShot(!multiShot)
            }
            className={`
              relative
              h-6
              w-11
              rounded-full
              transition-colors
              ${
                multiShot
                  ? "bg-primary"
                  : "bg-muted"
              }
            `}
          >
            <span
              className={`
                absolute
                top-0.5
                h-5
                w-5
                rounded-full
                bg-white
                transition-all
                ${
                  multiShot
                    ? "left-5"
                    : "left-0.5"
                }
              `}
            />
          </button>
        </div>

        {multiShot && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-primary
              bg-primary
              px-4
              py-3
              text-sm
              font-medium
              text-primary-foreground
              transition
              hover:opacity-90
            "
          >
            <Sparkles className="h-4 w-4" />
            Настроить сцены
          </button>
        )}

      </div>

      <SceneBuilderModal
        open={open}
        onClose={() => setOpen(false)}
       />
    </Section>
  );
}