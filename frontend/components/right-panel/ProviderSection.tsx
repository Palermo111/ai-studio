"use client";

import { Sparkles } from "lucide-react";

import Section from "./Section";

import { AI_PROVIDERS } from "@/constants/ais";
import { useGenerationStore } from "@/store/generationStore";

export default function ProviderSection() {
  const provider = useGenerationStore(
    (state) => state.provider
  );

  const setProvider = useGenerationStore(
    (state) => state.setProvider
  );

  return (
    <Section title="AI Provider">
      <div className="relative">
        <Sparkles
          size={16}
          className="
            pointer-events-none
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-amber-500
          "
        />

        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
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
          {AI_PROVIDERS.map((item) => (
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