"use client";

import { Sparkles } from "lucide-react";

import { VIDEO_PROVIDERS } from "@/constants/providers";
import { useGenerationStore } from "@/store/generationStore";

export default function ModelHome() {
  const provider = useGenerationStore(
    (state) => state.provider
  );

  const home =
    VIDEO_PROVIDERS.find(
      (item) => item.id === provider
    )?.home ?? VIDEO_PROVIDERS[0].home;
  
  console.log("Provider:", provider);
  console.log("Home:", home.title);
  return (
    <div className="flex h-full items-center justify-center px-10">
      <div className="w-full max-w-5xl text-center">

        {/* Logo */}

        <div className="mb-10 flex justify-center">
          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-[28px]
              border
              border-border
              bg-card
              shadow-sm
            "
          >
            <Sparkles
              size={42}
              strokeWidth={2}
              className="text-amber-600"
            />
          </div>
        </div>

        {/* Title */}

        <h1
          className="
            text-5xl
            font-bold
            tracking-tight
            text-foreground
          "
        >
          {home.title}
        </h1>

        {/* Subtitle */}

        <p
          className="
            mx-auto
            mt-5
            max-w-2xl
            text-lg
            leading-8
            text-muted-foreground
          "
        >
          {home.subtitle}
        </p>

        {/* Description */}

        <p
          className="
            mx-auto
            mt-8
            max-w-3xl
            text-[17px]
            leading-8
            text-muted-foreground
          "
        >
          {home.description}
        </p>

        {/* Features */}

        <div className="mt-16">
          <p
            className="
              mb-8
              text-sm
              font-semibold
              uppercase
              tracking-[0.18em]
              text-muted-foreground
            "
          >
            Возможности
          </p>

          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-3
            "
          >
            {home.features.map((feature: string) => (
              <div
                key={feature}
                className="
                  rounded-full
                  border
                  border-border
                  bg-card
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-foreground
                  transition-colors
                  hover:bg-muted
                "
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}