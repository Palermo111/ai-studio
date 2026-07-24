"use client";

import {
  RefObject,
  useMemo,
} from "react";

import ElementMention from "./ElementMention";

import { useCurrentModel } from "@/lib/model/useCurrentModel";
import { useGenerationStore } from "@/store/generationStore";
import { useWorkspaceStore } from "@/store/workspaceStore";

interface PromptInputProps {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

export default function PromptInput({
  textareaRef,
}: PromptInputProps) {
  const prompt = useGenerationStore(
    (state) => state.prompt
  );

  const setPrompt =
    useGenerationStore(
      (state) => state.setPrompt
    );

  const sceneBuilder =
    useWorkspaceStore(
      (state) => state.sceneBuilder
    );

  const model = useCurrentModel();

  const maxPromptLength =
    model?.id.startsWith("kling")
      ? 2500
      : 35000;

  const displayPrompt =
    useMemo(() => {
      if (!sceneBuilder) {
        return prompt;
      }

      let text = sceneBuilder.scenes
        .map(
          (scene, index) => `Shot ${index + 1}:
duration: ${scene.duration}.0sec

Scene:
${scene.prompt}`
        )
        .join("\n\n");

      if (
        sceneBuilder.instructions.trim()
      ) {
        text += `

Instructions:
${sceneBuilder.instructions}`;
      }

      return text;
    }, [sceneBuilder, prompt]);

  const isSceneBuilderMode =
    sceneBuilder !== null;

  return (
    <div className="h-full px-6 pt-6 pb-4">

      {isSceneBuilderMode && (
        <div
          className="
            mb-4
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-primary/20
            bg-primary/5
            px-4
            py-3
          "
        >
          <span className="text-lg">
            ✨
          </span>

          <div>
            <div className="text-sm font-medium">
              Промпт сформирован из Конструктора сцен
            </div>

            <div className="text-xs text-muted-foreground">
              Чтобы изменить его, откройте Конструктор сцен.
            </div>
          </div>
        </div>
      )}

      <ElementMention
        textareaRef={textareaRef}
        value={displayPrompt}
        readOnly={isSceneBuilderMode}
        maxLength={maxPromptLength}
        placeholder="Опишите видео, которое хотите создать..."
        onChange={(value) => {
          if (!isSceneBuilderMode) {
            setPrompt(value);
          }
        }}
      />

    </div>
  );
}