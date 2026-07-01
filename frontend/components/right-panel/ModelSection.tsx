"use client";

import { Box } from "lucide-react";

import Section from "./Section";

import { SEEDANCE } from "@/constants/models/seedance";

export default function ModelSection() {
  const model = SEEDANCE.models[0];

  return (
    <Section title="Модель">
      <div
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-border
          bg-background
          px-4
          py-3
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-muted
          "
        >
          <Box
            size={18}
            className="text-muted-foreground"
          />
        </div>

        <div className="min-w-0">
          <div className="font-medium text-foreground">
            {model.name}
          </div>

          <div className="text-xs text-muted-foreground">
            {model.description}
          </div>
        </div>
      </div>
    </Section>
  );
}