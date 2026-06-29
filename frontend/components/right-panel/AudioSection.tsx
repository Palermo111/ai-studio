"use client";

import Section from "./Section";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

import { useGenerationStore } from "@/store/generationStore";

export default function AudioSection() {
  const audio = useGenerationStore(
    (state) => state.audio
  );

  const setAudio = useGenerationStore(
    (state) => state.setAudio
  );

  return (
    <Section title="Generate Audio">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">
            Generate audio
          </p>

          <p className="mt-0.5 text-xs text-muted-foreground">
            Add synchronized sound to the video
          </p>
        </div>

        <ToggleSwitch
          checked={audio}
          onChange={setAudio}
        />
      </div>
    </Section>
  );
}