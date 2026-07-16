"use client";

import { useEffect } from "react";

import Section from "./Section";

import { useCurrentModel } from "@/lib/model/useCurrentModel";
import { useGenerationStore } from "@/store/generationStore";

export default function DurationSection() {
  const model = useCurrentModel();

  const duration = useGenerationStore(
    (state) => state.duration
  );

  const setDuration = useGenerationStore(
    (state) => state.setDuration
  );

  const durations =
    model?.capabilities.durations ?? [4];

  const minDuration = Math.min(...durations);
  const maxDuration = Math.max(...durations);

  useEffect(() => {
    if (!durations.includes(duration)) {
      setDuration(durations[0]);
    }
  }, [
    durations,
    duration,
    setDuration,
  ]);

  return (
    <Section title="Длительность">
      <div className="space-y-3">

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Длительность видео
          </span>

          <div className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
            {duration} сек
          </div>
        </div>

        <input
          type="range"
          min={minDuration}
          max={maxDuration}
          step={1}
          value={duration}
          onChange={(e) =>
            setDuration(Number(e.target.value))
          }
          className="w-full cursor-pointer accent-primary"
        />

        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>{minDuration} сек</span>
          <span>{maxDuration} сек</span>
        </div>

      </div>
    </Section>
  );
}