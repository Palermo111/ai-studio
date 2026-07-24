"use client";

import {
  useEffect,
  useState,
} from "react";

import { X } from "lucide-react";
import { useGenerationStore } from "@/store/generationStore";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import {
  Plus,
} from "lucide-react";

import SceneCard from "./SceneCard";

import { useWorkspaceStore } from "@/store/workspaceStore";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface Scene {
  id: number;
  shotType: string;
  duration: number;
  prompt: string;
}

const MAX_SCENES = 6;
const MAX_SCENE_PROMPT_LENGTH = 512;
const MAX_INSTRUCTIONS_LENGTH = 2500;

export default function SceneBuilderModal({
  open,
  onClose,
}: Props) {
  const [visible, setVisible] =
    useState(false);

  const [scenes, setScenes] =
    useState<Scene[]>([
      {
        id: 1,
        shotType: "wide",
        duration: 3,
        prompt: "",
      },
    ]);

  const [instructions, setInstructions] =
    useState("");

  const [showExitDialog, setShowExitDialog] =
    useState(false);

  const setSceneBuilder =
    useWorkspaceStore(
      (state) => state.setSceneBuilder
    );

  const sceneBuilder =
    useWorkspaceStore(
      (state) => state.sceneBuilder
    );

  const setDuration =
    useGenerationStore(
      (state) => state.setDuration
    );

  useEffect(() => {
    if (open) {
      setVisible(true);
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKey = (
      e: KeyboardEvent
    ) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 180);

      return () =>
        clearTimeout(timer);
    }
  }, [open]);

  const hasPrompts = scenes.every(
    (scene) =>
      scene.prompt.trim().length >= 10
  );

  const totalDuration = scenes.reduce(
    (sum, scene) => sum + scene.duration,
    0
  );

  useEffect(() => {
    setDuration(totalDuration);
  }, [totalDuration, setDuration]);

  const maxDuration = 15;

  const isDurationValid =
    totalDuration <= maxDuration;

  const isValid =
    hasPrompts &&
    isDurationValid;

  function handleDragEnd(
    event: DragEndEvent
  ) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setScenes((items) => {
      const oldIndex = items.findIndex(
        (scene) => scene.id === active.id
      );

      const newIndex = items.findIndex(
        (scene) => scene.id === over.id
      );

      return arrayMove(
        items,
        oldIndex,
        newIndex
      );
    });
  }

  const hasTooLongPrompt = scenes.some(
    (scene) =>
      scene.prompt.length > MAX_SCENE_PROMPT_LENGTH
  );

  const canSave =
    instructions.length <=
      MAX_INSTRUCTIONS_LENGTH &&
    !hasTooLongPrompt;

  function handleSave() {
    if (!canSave) {
      return;
    }

    setSceneBuilder({
      instructions,
      scenes,
    });

    onClose();
  }

  function handleClose() {
    if (sceneBuilder) {
      setShowExitDialog(true);
      return;
    }

    onClose();
  }

  function handleContinue() {
    setShowExitDialog(false);
    onClose();
  }

  function handleDeleteScenario() {
    setSceneBuilder(null);

    useGenerationStore
      .getState()
      .setPrompt("");

    useGenerationStore
      .getState()
      .setMultiShot(false);

    setShowExitDialog(false);

    onClose();
  }

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  if (!visible && !open) {
    return null;
  }

  return (
    <div
      onClick={handleClose}
      className={`
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/25
        backdrop-blur-md
        transition-opacity
        duration-200
        ${
          open
            ? "opacity-100"
            : "opacity-0"
        }
      `}
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className={`
          relative
          flex
          h-[82vh]
          w-[1280px]
          max-w-[95vw]
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-border
          bg-background
          shadow-2xl
          transition-all
          duration-200
          ${
            open
              ? "scale-100"
              : "scale-95"
          }
        `}
      >
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-border
            px-8
            py-6
          "
        >
          <div className="flex items-start gap-10">

            <div>
              <h2 className="text-2xl font-semibold">
                Конструктор сцен
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Разделите видео на несколько сцен и настройте каждую отдельно.
              </p>
            </div>

            <div className="pt-1">

              <div className="text-xs text-muted-foreground">
                Общая длительность
              </div>

              <div
                className={`text-sm font-semibold ${
                  isDurationValid
                    ? "text-foreground"
                    : "text-destructive"
                }`}
              >
                {totalDuration} / {maxDuration} сек
              </div>

              {!isDurationValid && (
                <div className="mt-1 text-xs text-destructive">
                  Превышен лимит длительности видео
                </div>
              )}

            </div>

          </div>

          <button
            onClick={handleClose}
            className="
              rounded-xl
              p-2
              transition
              hover:bg-muted
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className="
            flex-1
            overflow-y-auto
            px-8
            py-8
          "
        >

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >

            <SortableContext
              items={scenes.map((scene) => scene.id)}
              strategy={verticalListSortingStrategy}
            >

              <div className="space-y-6">

                {scenes.map((scene, index) => (
              <SceneCard
                key={scene.id}
                scene={scene}
                sceneNumber={index + 1}
                canDelete={scenes.length > 1}
                onDelete={() =>
                  setScenes((prev) =>
                    prev.filter(
                      (item) => item.id !== scene.id
                    )
                  )
                }
                onChange={(updatedScene) =>
                  setScenes((prev) =>
                    prev.map((item) =>
                      item.id === updatedScene.id
                        ? updatedScene
                        : item
                    )
                  )
                }
              />
            ))}

            <button
              type="button"
              onClick={() => {
                if (scenes.length >= MAX_SCENES) {
                  return;
                }

                setScenes((prev) => [
                  ...prev,
                  {
                    id: Date.now(),
                    shotType: "wide",
                    duration: 3,
                    prompt: "",
                  },
                ]);
              }}
              className={`
                flex
                h-20
                w-full
                items-center
                justify-center
                gap-3
                rounded-2xl
                border-2
                border-dashed
                transition-all

                ${
                  scenes.length >= MAX_SCENES
                    ? "cursor-not-allowed border-border bg-muted/30 text-muted-foreground opacity-50"
                    : "border-border bg-background text-muted-foreground hover:border-primary hover:bg-muted/40 hover:text-foreground"
                }
              `}
            >
            <Plus size={20} />

            <span className="font-medium">
                Добавить сцену
            </span>
            </button>

            <div className="mt-8">

              <label
                className="
                  mb-2
                  block
                  text-xs
                  font-medium
                  uppercase
                  tracking-wide
                  text-muted-foreground
                "
              >
                Общие инструкции
              </label>

              <div className="relative">

                <textarea
                  value={instructions}
                  onChange={(e) =>
                    setInstructions(
                      e.target.value
                    )
                  }
                  rows={6}
                  maxLength={MAX_INSTRUCTIONS_LENGTH}
                  placeholder="Опишите стиль, атмосферу, персонажей и другие параметры, которые должны применяться ко всему видео..."
                  className="
                    w-full
                    resize-none
                    rounded-2xl
                    border
                    border-border
                    bg-background
                    px-4
                    py-3
                    pb-8
                    text-sm
                    outline-none
                    transition
                    focus:border-primary
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    bottom-3
                    right-4
                    text-xs
                    text-muted-foreground
                  "
                >
                  {instructions.length} / {MAX_INSTRUCTIONS_LENGTH}
                </div>

              </div>

            </div>           

              </div>

            </SortableContext>

          </DndContext>

        </div>

        <div
        className="
            flex
            items-center
            justify-end
            gap-3
            border-t
            border-border
            px-8
            py-5
        "
        >
        <button
            onClick={handleClose}
            className="
            rounded-xl
            border
            border-border
            px-5
            py-2.5
            text-sm
            font-medium
            transition
            hover:bg-muted
            "
        >
            Отмена
        </button>

        <button
          type="button"
          disabled={!isValid}
          onClick={handleSave}
          className={`
            rounded-xl
            px-5
            py-2.5
            text-sm
            font-medium
            transition
            ${
              isValid
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "cursor-not-allowed bg-muted text-muted-foreground opacity-60"
            }
          `}
        >
          Сохранить сценарий
        </button>
      </div>


      {showExitDialog && (
        <div
          className="
            absolute
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            backdrop-blur-sm
          "
        >
          <div
            className="
              w-[500px]
              rounded-3xl
              border
              border-border
              bg-background
              p-8
              shadow-2xl
            "
          >
            <h3 className="text-xl font-semibold">
              Использовать сохранённый сценарий?
            </h3>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Вы уже сохранили сценарий.

              <br />
              <br />

              <strong>Продолжить</strong> —
              оставить сценарий и закрыть окно.

              <br />

              <strong>Удалить</strong> —
              отключить сценарий и
              вернуться к обычному вводу
              промпта.
            </p>

            <div className="mt-8 flex justify-end gap-3">

              <button
                onClick={handleDeleteScenario}
                className="
                  rounded-xl
                  border
                  border-border
                  px-5
                  py-2.5
                  text-sm
                  transition
                  hover:bg-muted
                "
              >
                Удалить
              </button>

              <button
                onClick={handleContinue}
                className="
                  rounded-xl
                  bg-primary
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-primary-foreground
                  transition
                  hover:opacity-90
                "
              >
                Продолжить
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  </div>
);
}