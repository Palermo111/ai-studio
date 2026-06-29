"use client";

import AttachmentButton from "./AttachmentButton";
import { useGenerationStore } from "@/store/generationStore";

const chip = `
flex
h-10
items-center
rounded-full
border
border-border
bg-background
px-4
text-sm
font-medium
text-foreground
transition-all
duration-200
hover:bg-muted
hover:border-border
`;

export default function QuickSettings() {
  const aspectRatio = useGenerationStore(
    (state) => state.aspectRatio
  );

  const resolution = useGenerationStore(
    (state) => state.resolution
  );

  const duration = useGenerationStore(
    (state) => state.duration
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <AttachmentButton />

      <button className={chip}>
        {aspectRatio}
      </button>

      <button className={chip}>
        {resolution}
      </button>

      <button className={chip}>
        {duration} сек
      </button>
    </div>
  );
}