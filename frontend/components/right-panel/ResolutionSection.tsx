"use client";

import Section from "./Section";
import OptionGroup from "@/components/ui/OptionGroup";

import { RESOLUTIONS } from "@/constants/resolutions";
import {
  Resolution,
  useGenerationStore,
} from "@/store/generationStore";

export default function ResolutionSection() {
  const resolution = useGenerationStore(
    (state) => state.resolution
  );

  const setResolution = useGenerationStore(
    (state) => state.setResolution
  );

  return (
    <Section title="Разрешение">
      <OptionGroup
        value={resolution}
        options={RESOLUTIONS}
        onChange={(value) =>
          setResolution(value as Resolution)
        }
      />
    </Section>
  );
}