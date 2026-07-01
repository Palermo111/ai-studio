"use client";

import Section from "./Section";
import OptionGroup from "@/components/ui/OptionGroup";

import { MODES } from "@/constants/modes";
import { useGenerationStore } from "@/store/generationStore";

export default function ModeSection() {
  const mode = useGenerationStore(
    (state) => state.mode
  );

  const setMode = useGenerationStore(
    (state) => state.setMode
  );

  return (
    <Section title="Режим">
      <OptionGroup
        value={mode}
        onChange={(value) =>
          setMode(value as "Mini" | "Fast" | "Pro")
        }
        options={MODES}
      />
    </Section>
  );
}