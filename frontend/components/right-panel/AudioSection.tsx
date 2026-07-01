"use client";

import { Volume2, VolumeX } from "lucide-react";

import Section from "./Section";

import { useGenerationStore } from "@/store/generationStore";

export default function AudioSection() {
  const audio = useGenerationStore(
    (state) => state.audio
  );

  const setAudio = useGenerationStore(
    (state) => state.setAudio
  );

  return (
    <Section title="Звук">
      <div className="flex items-center justify-center gap-4">

        <span className="text-sm font-medium text-foreground">
          Audio
        </span>

        <button
          type="button"
          onClick={() => setAudio(!audio)}
          className={`
            flex
            h-9
            w-[74px]
            items-center
            justify-center
            gap-1.5
            rounded-full
            border
            text-sm
            font-medium
            transition-all
            duration-200

            ${
              audio
                ? "border-primary bg-primary text-white"
                : "border-border bg-background text-foreground hover:bg-muted"
            }
          `}
        >
          {audio ? (
            <>
              <Volume2 size={14} />
              ON
            </>
          ) : (
            <>
              <VolumeX size={14} />
              OFF
            </>
          )}
        </button>

      </div>
    </Section>
  );
}