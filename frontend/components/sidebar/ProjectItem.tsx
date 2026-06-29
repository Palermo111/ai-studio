"use client";

import { Folder, MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Project } from "@/types/project";

interface ProjectItemProps {
  project: Project;
  active: boolean;
  onClick: () => void;
  onRename: () => void;
  onDelete: () => void;
}

export default function ProjectItem({
  project,
  active,
  onClick,
  onRename,
  onDelete,
}: ProjectItemProps) {
  return (
    <div
      className={`
        group
        mb-1
        flex
        items-center
        rounded-xl
        transition-all
        duration-200
        ${
          active
            ? "bg-background border border-border shadow-sm"
            : "hover:bg-muted/40"
        }
      `}
    >
      <button
        onClick={onClick}
        className="flex flex-1 items-center gap-3 px-3 py-2 text-left"
      >
        <Folder
          size={18}
          className={
            active
              ? "text-foreground"
              : "text-muted-foreground group-hover:text-foreground"
          }
        />

        <span
          className={`
            truncate text-sm
            ${active ? "text-foreground font-medium" : "text-muted-foreground"}
          `}
        >
          {project.name}
        </span>
      </button>

      <div className="pr-2 opacity-0 group-hover:opacity-100 transition">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-md p-1 hover:bg-muted">
              <MoreVertical size={18} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onRename}>
              Переименовать
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-red-500"
              onClick={onDelete}
            >
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}