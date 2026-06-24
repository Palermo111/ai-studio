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
      className={`mb-2 flex items-center rounded-lg transition ${
        active
          ? "bg-violet-600 text-white"
          : "hover:bg-zinc-900"
      }`}
    >
      <button
        onClick={onClick}
        className="flex flex-1 items-center gap-3 px-3 py-3 text-left"
      >
        <Folder size={18} />

        <span className="truncate">
          {project.name}
        </span>
      </button>

      <DropdownMenu>

        <DropdownMenuTrigger asChild>

          <button className="mr-2 rounded p-1 hover:bg-black/20">
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
  );
}