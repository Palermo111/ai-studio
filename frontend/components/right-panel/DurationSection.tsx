"use client";

import { useEffect } from "react";

import Section from "./Section";

import { useCurrentModel } from "@/lib/model/useCurrentModel";
import { useGenerationStore } from "@/store/generationStore";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function DurationSection() {
  const model = useCurrentModel();

  const duration = useGenerationStore(
    (state) => state.duration
  );

  const setDuration = useGenerationStore(
    (state) => state.setDuration
  );

const sceneBuilder = useWorkspaceStore(
  (state) => state.sceneBuilder
);

const isMultiShot = sceneBuilder !== null;

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
          <div>
            <div className="text-xs text-muted-foreground">
              Длительность видео
            </div>

            {isMultiShot && (
              <div className="mt-1 text-[10px] text-muted-foreground">
                Рассчитывается автоматически по сценам
              </div>
            )}
          </div>

          <div className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
            {duration} сек
          </div>
        </div>

        <input
          disabled={isMultiShot}
          type="range"
          min={minDuration}
          max={maxDuration}
          step={1}
          value={duration}
          onChange={(e) =>
            setDuration(Number(e.target.value))
          }
          className={`
            w-full
            accent-primary
            ${
              isMultiShot
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }
          `}
        />

        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>{minDuration} сек</span>
          <span>{maxDuration} сек</span>
        </div>

      </div>
    </Section>
  );
}