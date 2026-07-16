"use client";

import { Box } from "lucide-react";

import Section from "./Section";

import { VIDEO_PROVIDERS } from "@/constants/providers";
import { useGenerationStore } from "@/store/generationStore";

export default function ModelSection() {
  const provider = useGenerationStore(
    (state) => state.provider
  );

  const model = useGenerationStore(
    (state) => state.model
  );

  const setModel = useGenerationStore(
    (state) => state.setModel
  );

  const models =
    VIDEO_PROVIDERS.find(
      (item) => item.id === provider
    )?.models ?? [];

  return (
    <Section title="Модель">
      <div className="relative">
        <Box
          size={16}
          className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-muted-foreground
          "
        />

        <select
          value={model}
          onChange={(e) =>
            setModel(e.target.value as any)
          }
          className="
            h-12
            w-full
            appearance-none
            rounded-2xl
            border
            border-border
            bg-background
            pl-11
            pr-10
            text-[15px]
            font-medium
            text-foreground
            outline-none
            transition-all
            duration-200
            hover:border-primary/40
            focus:border-primary
            focus:ring-4
            focus:ring-primary/10
          "
        >
          {models.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </Section>
  );
}