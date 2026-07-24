"use client";

import { useGenerationStore } from "@/store/generationStore";
import { useElementEditorStore } from "@/store/elementEditorStore";

import ProviderSection from "./ProviderSection";
import ModelSection from "./ModelSection";
import ResolutionSection from "./ResolutionSection";
import ModeSection from "./ModeSection";
import AspectRatioSection from "./AspectRatioSection";
import DurationSection from "./DurationSection";
import AudioSection from "./AudioSection";
import AdvancedSection from "./AdvancedSection";
import SceneBuilderSection from "./SceneBuilderSection";
import ElementsSection from "./ElementsSection";
import ElementEditorModal from "./elements/ElementEditorModal";

export default function AIPanel() {
  const provider =
    useGenerationStore(
      (state) => state.provider
    );

  const isEditorOpen =
    useElementEditorStore(
      (state) => state.isOpen
    );

  const closeEditor =
    useElementEditorStore(
      (state) => state.close
    );

  return (
    <>
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
            <SceneBuilderSection />

            {provider === "kling" && (
              <ElementsSection />
            )}

            <AdvancedSection />

          </div>

        </div>

      </aside>

      <ElementEditorModal
        open={isEditorOpen}
        onClose={closeEditor}
      />
    </>
  );
}