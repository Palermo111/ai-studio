"use client";

import Section from "./Section";
import OptionGroup from "@/components/ui/OptionGroup";

import { RESOLUTIONS } from "@/constants/resolutions";
import { useGenerationStore } from "@/store/generationStore";

export default function ResolutionSection() {
  const resolution = useGenerationStore(
    (state) => state.resolution
  );

  const setResolution = useGenerationStore(
    (state) => state.setResolution
  );

  return (
    <Section title="Resolution">
      <OptionGroup
        value={resolution}
        options={RESOLUTIONS}
        onChange={(value) =>
          setResolution(value as "480p" | "720p" | "1080p")
        }
      />
    </Section>
  );
}