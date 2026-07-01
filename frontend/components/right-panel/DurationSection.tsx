"use client";

import Section from "./Section";
import { useGenerationStore } from "@/store/generationStore";

const MIN_DURATION = 4;
const MAX_DURATION = 15;

export default function DurationSection() {
  const duration = useGenerationStore(
    (state) => state.duration
  );

  const setDuration = useGenerationStore(
    (state) => state.setDuration
  );

  return (
    <Section title="Длительность">
      <div className="space-y-3">

        {/* top row */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Длительность видео
          </span>

          <div className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
            {duration} сек
          </div>
        </div>

        {/* slider */}
        <input
          type="range"
          min={MIN_DURATION}
          max={MAX_DURATION}
          step={1}
          value={duration}
          onChange={(e) =>
            setDuration(Number(e.target.value))
          }
          className="w-full cursor-pointer accent-primary"
        />

        {/* min/max labels */}
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>{MIN_DURATION} сек</span>
          <span>{MAX_DURATION} сек</span>
        </div>

      </div>
    </Section>
  );
}