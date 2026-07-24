"use client";

import Image from "next/image";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { Element } from "@/types/element";

import { useElementStore } from "@/store/elementStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  element: Element;

  onEdit: (element: Element) => void;
}

export default function ElementCard({
  element,
  onEdit,
}: Props) {
  const deleteElement =
    useElementStore(
      (state) => state.deleteElement
    );

  return (
    <div className="relative">
      <button
        type="button"
        className="
          group
          w-full
          overflow-hidden
          rounded-[18px]
          border
          border-border
          bg-background
          text-left
          transition-all
          duration-200
          hover:-translate-y-1
          hover:border-primary/30
          hover:shadow-xl
        "
      >
        {/* Фото */}

        <div
          className="
            relative
            h-[150px]
            w-full
            overflow-hidden
            bg-muted
          "
        >
          {element.mainReference ? (
            <Image
              src={element.mainReference}
              alt={element.name}
              fill
              unoptimized
              className="
                object-cover
                object-top
                transition-transform
                duration-300
                group-hover:scale-105
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                items-center
                justify-center
                text-sm
                text-muted-foreground
              "
            >
              Нет изображения
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                onClick={(e) =>
                  e.stopPropagation()
                }
                className="
                  absolute
                  right-3
                  top-3
                  z-20
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-background/95
                  shadow-md
                  backdrop-blur
                  transition
                  hover:scale-105
                  hover:bg-background
                "
              >
                <MoreHorizontal size={16} />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-44"
            >
              <DropdownMenuItem
                onClick={() =>
                  onEdit(element)
                }
              >
                <Pencil className="mr-2 h-4 w-4" />
                Редактировать
              </DropdownMenuItem>

              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  deleteElement(
                    element.id
                  )
                }
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Название */}

        <div className="px-4 py-3">
          <div
            className="
              truncate
              text-[15px]
              font-medium
              text-foreground
            "
          >
            {element.name}
          </div>
        </div>
      </button>
    </div>
  );
}