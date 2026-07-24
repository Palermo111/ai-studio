"use client";

import Image from "next/image";

import { Element } from "@/types/element";

interface Props {
  open: boolean;

  elements: Element[];

  onSelect: (element: Element) => void;
}

export default function ElementsMentionMenu({
  open,
  elements,
  onSelect,
}: Props) {
  if (!open || elements.length === 0) {
    return null;
  }

  return (
    <div
      className="
        w-[340px]
        rounded-lg
        border
        border-border/60
        bg-background
        p-2
        shadow-[0_12px_32px_rgba(0,0,0,0.08)]
      "
    >
      {elements.map((element) => (
        <button
          key={element.id}
          type="button"
          onClick={() => onSelect(element)}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-2.5
            py-2
            text-left
            transition-colors
            duration-150
            hover:bg-muted/40
          "
        >
          {/* Фото */}

          <div
            className="
              h-11
              w-11
              shrink-0
              overflow-hidden
              rounded-lg
              bg-muted
            "
          >
            {element.mainReference ? (
              <Image
                src={element.mainReference}
                alt={element.name}
                width={44}
                height={44}
                unoptimized
                className="
                  h-full
                  w-full
                  object-cover
                  object-top
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-full
                  w-full
                  items-center
                  justify-center
                  text-xs
                  text-muted-foreground
                "
              >
                —
              </div>
            )}
          </div>

          {/* Название */}

          <div
            className="
              min-w-0
              flex-1
              truncate
              text-[14px]
              font-medium
              text-foreground
            "
          >
            @{element.name}
          </div>
        </button>
      ))}
    </div>
  );
}