"use client";

import ProviderSection from "./ProviderSection";
import ModelSection from "./ModelSection";
import ResolutionSection from "./ResolutionSection";
import ModeSection from "./ModeSection";
import AspectRatioSection from "./AspectRatioSection";
import DurationSection from "./DurationSection";
import AudioSection from "./AudioSection";

export default function AIPanel() {
  return (
    <aside className="flex h-full w-full bg-background">
      
      <div className="flex-1 overflow-y-auto px-6 py-7">
        <div className="space-y-4">

          <ProviderSection />
          <ModelSection />
          <ResolutionSection />
          <ModeSection />
          <AspectRatioSection />
          <DurationSection />
          <AudioSection />

        </div>
      </div>

    </aside>
  );
}