"use client";

import Section from "./Section";
import OptionGroup from "@/components/ui/OptionGroup";

import { ASPECT_RATIOS } from "@/constants/aspectRatios";
import { useGenerationStore } from "@/store/generationStore";

export default function AspectRatioSection() {
  const aspectRatio = useGenerationStore(
    (state) => state.aspectRatio
  );

  const setAspectRatio = useGenerationStore(
    (state) => state.setAspectRatio
  );

  return (
    <Section title="Aspect Ratio">
      <OptionGroup
        value={aspectRatio}
        options={ASPECT_RATIOS}
        onChange={(value) =>
          setAspectRatio(value as "16:9" | "9:16" | "1:1")
        }
      />
    </Section>
  );
}