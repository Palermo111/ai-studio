"use client";

import { Folder } from "lucide-react";

import { useProjectStore } from "@/store/projectStore";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function WorkspaceHome() {
  const activeProject = useProjectStore(
    (state) => state.activeProject
  );

  const setSection = useWorkspaceStore(
    (state) => state.setSection
  );

  return (
    <div className="p-8">

      <h1 className="mb-8 text-3xl font-bold">
        {activeProject?.name}
      </h1>

      <div className="space-y-3">

        <button
          onClick={() => setSection("images")}
          className="flex w-full items-center gap-3 rounded-lg border border-zinc-800 p-4 hover:bg-zinc-900"
        >
          <Folder size={20} />
          Изображения
        </button>

        <button
          onClick={() => setSection("videos")}
          className="flex w-full items-center gap-3 rounded-lg border border-zinc-800 p-4 hover:bg-zinc-900"
        >
          <Folder size={20} />
          Видео
        </button>

        <button
          onClick={() => setSection("audio")}
          className="flex w-full items-center gap-3 rounded-lg border border-zinc-800 p-4 hover:bg-zinc-900"
        >
          <Folder size={20} />
          Аудио
        </button>

      </div>

    </div>
  );
}