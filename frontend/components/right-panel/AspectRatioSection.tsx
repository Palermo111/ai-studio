"use client";

import { useEffect } from "react";

import Section from "./Section";
import OptionGroup from "@/components/ui/OptionGroup";

import { useCurrentModel } from "@/lib/model/useCurrentModel";
import { useGenerationStore } from "@/store/generationStore";

export default function AspectRatioSection() {
  const model = useCurrentModel();

  const aspectRatio = useGenerationStore(
    (state) => state.aspectRatio
  );

  const setAspectRatio = useGenerationStore(
    (state) => state.setAspectRatio
  );

  const aspectRatios =
    model?.capabilities.aspectRatios ?? [
      "9:16",
    ];

  useEffect(() => {
    if (!aspectRatios.includes(aspectRatio)) {
      setAspectRatio(
        aspectRatios[0] as
          | "16:9"
          | "9:16"
          | "1:1"
      );
    }
  }, [
    aspectRatios,
    aspectRatio,
    setAspectRatio,
  ]);

  const options = aspectRatios.map(
    (ratio) => ({
      value: ratio,
      label: ratio,
    })
  );

  return (
    <Section title="Соотношение сторон">
      <OptionGroup
        value={aspectRatio}
        options={options}
        onChange={(value) =>
          setAspectRatio(
            value as
              | "16:9"
              | "9:16"
              | "1:1"
          )
        }
      />
    </Section>
  );
}