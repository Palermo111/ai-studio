"use client";

import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function CreateElementCard({
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        h-full
        min-h-[190px]
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-border
        bg-background
        transition-all
        hover:border-primary/40
        hover:bg-primary/5
      "
    >
      <div
        className="
          mb-5
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-background
          shadow-sm
        "
      >
        <Plus
          size={22}
          className="text-primary"
        />
      </div>

      <span
        className="
          text-sm
          font-medium
        "
      >
        Создать
      </span>

      <span
        className="
          mt-1
          text-sm
          font-medium
        "
      >
        элемент
      </span>
    </button>
  );
}