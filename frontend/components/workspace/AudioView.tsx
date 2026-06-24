"use client";

import { ArrowLeft, Music } from "lucide-react";

import { useProjectStore } from "@/store/projectStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useFiles } from "@/hooks/useFiles";

export default function AudioView() {
  const activeProject = useProjectStore(
    (state) => state.activeProject
  );

  const setSection = useWorkspaceStore(
    (state) => state.setSection
  );

  const {
    data: files,
    isLoading,
    error,
  } = useFiles(
    activeProject?.id,
    "audio"
  );

  return (
    <div className="p-8">

      <button
        onClick={() => setSection("home")}
        className="mb-6 flex items-center gap-2 text-zinc-400 transition hover:text-white"
      >
        <ArrowLeft size={18} />
        Назад
      </button>

      <h1 className="mb-6 text-3xl font-bold">
        Аудио
      </h1>

      {isLoading && (
        <p className="text-zinc-500">
          Загрузка...
        </p>
      )}

      {error && (
        <p className="text-red-500">
          Не удалось загрузить аудио
        </p>
      )}

      {!isLoading && files?.length === 0 && (
        <p className="text-zinc-500">
          Пока нет аудио.
        </p>
      )}

      <div className="space-y-2">

        {files?.map((file) => (
          <div
            key={file.name}
            className="flex items-center gap-3 rounded-lg border border-zinc-800 p-3"
          >
            <Music size={18} />

            <span>{file.name}</span>
          </div>
        ))}

      </div>

    </div>
  );
}