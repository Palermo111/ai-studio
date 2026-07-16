"use client";

import { Sparkles } from "lucide-react";

import Section from "./Section";

import { VIDEO_PROVIDERS } from "@/constants/providers";
import {
  useGenerationStore,
  type VideoProvider,
} from "@/store/generationStore";

export default function ProviderSection() {
  const provider = useGenerationStore(
    (state) => state.provider
  );

  const setProvider = useGenerationStore(
    (state) => state.setProvider
  );

  const setModel = useGenerationStore(
    (state) => state.setModel
  );

  return (
    <Section title="Нейросеть">
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
          onChange={(e) => {
            const providerId =
              e.target.value as VideoProvider;

            setProvider(providerId);

            const selectedProvider =
              VIDEO_PROVIDERS.find(
                (item) => item.id === providerId
              );

            if (
              selectedProvider &&
              selectedProvider.models.length > 0
            ) {
              setModel(
                selectedProvider.models[0].id as any
              );
            }
          }}
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
          {VIDEO_PROVIDERS.map((item) => (
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