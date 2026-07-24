"use client";

import {
  GripVertical,
  Trash2,
} from "lucide-react";

import {
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { useRef } from "react";

import ElementMention from "@/components/prompt-bar/ElementMention";

const MAX_SCENE_PROMPT_LENGTH = 512;

interface Scene {
  id: number;
  shotType: string;
  duration: number;
  prompt: string;
}

interface SceneCardProps {
  scene: Scene;
  sceneNumber: number;

  canDelete: boolean;
  onDelete: () => void;

  onChange: (
    scene: Scene
  ) => void;
}

export default function SceneCard({
  scene,
  sceneNumber,
  canDelete,
  onDelete,
  onChange,
}: SceneCardProps) {

const {
  attributes,
  listeners,
  setNodeRef,
  transform,
  transition,
} = useSortable({
  id: scene.id,
});

const textareaRef =
  useRef<HTMLTextAreaElement>(null);

const style = {
  transform: CSS.Transform.toString(transform),
  transition,
};

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="
        group
        rounded-2xl
        border
        border-border
        bg-background
        p-6
        transition-shadow
        duration-200
        hover:-translate-y-0.5
        hover:border-primary/40
        hover:shadow-lg
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <button
            {...listeners}
            className="
              cursor-grab
              rounded-lg
              p-2
              text-muted-foreground
              transition
              hover:bg-muted
              hover:text-foreground
              active:cursor-grabbing
            "
          >
            <GripVertical
              size={18}
            />
          </button>

          <div>
            <h3 className="text-lg font-semibold">
              🎬 Сцена {sceneNumber}
            </h3>

            <p className="text-sm text-muted-foreground">
              Настройте параметры сцены
            </p>
          </div>

        </div>

        <button
          type="button"
          disabled={!canDelete}
          onClick={onDelete}
          className={`
            rounded-lg
            p-2
            transition
            ${
              canDelete
                ? "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                : "cursor-not-allowed opacity-30"
            }
          `}
        >
          <Trash2 size={18} />
        </button>

      </div>

    {/* Parameters */}

    <div className="mt-6 flex items-center gap-8">

    <div className="flex items-center gap-3">

        <span className="text-sm text-muted-foreground whitespace-nowrap">
        Тип кадра
        </span>

        <select
          value={scene.shotType}
          onChange={(e) =>
            onChange({
              ...scene,
              shotType: e.target.value,
            })
          }
        className="
            h-10
            w-[190px]
            rounded-xl
            border
            border-border
            bg-background
            px-3
            text-sm
            outline-none
            transition
            focus:border-primary
        "
        >
        <option value="wide">
          Общий план
        </option>

        <option value="medium">
          Средний план
        </option>

        <option value="close_up">
          Крупный план
        </option>

        <option value="extreme_close_up">
          Экстремально крупный
        </option>

        <option value="over_the_shoulder">
          Через плечо
        </option>

        <option value="pov">
          От первого лица (POV)
        </option>

        <option value="top_down">
          Вид сверху
        </option>

        <option value="drone">
          Съемка дроном
        </option>

        <option value="low_angle">
          Нижний ракурс
        </option>

        <option value="high_angle">
          Верхний ракурс
        </option>

        <option value="tracking">
          Следящий кадр
        </option>

        <option value="dynamic">
          Динамичный кадр
        </option>
        </select>

    </div>

    <div className="flex items-center gap-3">

        <span className="text-sm text-muted-foreground whitespace-nowrap">
        Длительность
        </span>

       <select
          value={scene.duration}
          onChange={(e) =>
            onChange({
              ...scene,
              duration: Number(
                e.target.value
              ),
            })
          }
        className="
            h-10
            w-[110px]
            rounded-xl
            border
            border-border
            bg-background
            px-3
            text-sm
            outline-none
            transition
            focus:border-primary
        "
        >
        <option value={1}>1 сек</option>
        <option value={2}>2 сек</option>
        <option value={3}>3 сек</option>
        <option value={4}>4 сек</option>
        <option value={5}>5 сек</option>
        <option value={6}>6 сек</option>
        <option value={7}>7 сек</option>
        <option value={8}>8 сек</option>
        <option value={9}>9 сек</option>
        <option value={10}>10 сек</option>
        </select>

    </div>

    </div>

      {/* Prompt */}

      <div className="mt-6">

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
          Промпт сцены
        </label>

        <div className="relative">

            <div
                className="
                  min-h-[220px]
                  rounded-2xl
                  border
                  border-border
                  bg-background
                  px-4
                  py-3
                  pb-8
                "
            >

                <ElementMention
                    value={scene.prompt}
                    onChange={(value) =>
                        onChange({
                            ...scene,
                            prompt: value,
                        })
                    }
                    textareaRef={textareaRef}
                    maxLength={MAX_SCENE_PROMPT_LENGTH}
                    placeholder="Опишите происходящее в этой сцене..."
                    menuClassName="
                        left-0
                        top-0
                    "
                />

            </div>
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
                {scene.prompt.length} / {MAX_SCENE_PROMPT_LENGTH}
            </div>

        </div>

            </div>

            </div>
);
}