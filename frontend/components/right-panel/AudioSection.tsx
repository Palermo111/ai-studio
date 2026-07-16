"use client";

import { useEffect } from "react";

import { Volume2, VolumeX } from "lucide-react";

import Section from "./Section";

import { useCurrentModel } from "@/lib/model/useCurrentModel";
import { useGenerationStore } from "@/store/generationStore";

export default function AudioSection() {
  const model = useCurrentModel();

  const audio = useGenerationStore(
    (state) => state.audio
  );

  const setAudio = useGenerationStore(
    (state) => state.setAudio
  );

  const audioSupported =
    model?.capabilities.audio ?? true;

  useEffect(() => {
    if (!audioSupported && audio) {
      setAudio(false);
    }
  }, [
    audioSupported,
    audio,
    setAudio,
  ]);

  return (
    <Section title="Звук">
      <div className="flex items-center justify-center gap-4">

        <span className="text-sm font-medium text-foreground">
          Audio
        </span>

        <button
          type="button"
          disabled={!audioSupported}
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
              !audioSupported
                ? `
                  cursor-not-allowed
                  border-border
                  bg-muted
                  text-muted-foreground
                  opacity-50
                `
                : audio
                ? `
                  border-primary
                  bg-primary
                  text-white
                `
                : `
                  border-border
                  bg-background
                  text-foreground
                  hover:bg-muted
                `
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