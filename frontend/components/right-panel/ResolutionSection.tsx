"use client";

import { useEffect } from "react";

import Section from "./Section";
import OptionGroup from "@/components/ui/OptionGroup";

import { useCurrentModel } from "@/lib/model/useCurrentModel";
import {
  Resolution,
  useGenerationStore,
} from "@/store/generationStore";

export default function ResolutionSection() {
  const model = useCurrentModel();

  const resolution = useGenerationStore(
    (state) => state.resolution
  );

  const setResolution = useGenerationStore(
    (state) => state.setResolution
  );

  const resolutions =
    model?.capabilities.resolutions ?? [
      "480p",
    ];

  useEffect(() => {
    if (!resolutions.includes(resolution)) {
      setResolution(
        resolutions[0] as Resolution
      );
    }
  }, [
    resolutions,
    resolution,
    setResolution,
  ]);

  const options = resolutions.map(
    (resolution) => ({
      value: resolution,
      label: resolution,
    })
  );

  return (
    <Section title="Разрешение">
      <OptionGroup
        value={resolution}
        options={options}
        onChange={(value) =>
          setResolution(value as Resolution)
        }
      />
    </Section>
  );
}