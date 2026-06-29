"use client";

import { Box } from "lucide-react";

import Section from "./Section";

import { useGenerationStore } from "@/store/generationStore";
import { SEEDANCE } from "@/constants/models/seedance";

export default function ModelSection() {
  const model = useGenerationStore((state) => state.model);
  const setModel = useGenerationStore((state) => state.setModel);

  return (
    <Section title="Model">
      <div className="relative">
        <Box
          size={16}
          className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-zinc-500
          "
        />

        <select
          value={model}
          onChange={(e) =>
            setModel(e.target.value as typeof model)
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
          {SEEDANCE.models.map((item) => (
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