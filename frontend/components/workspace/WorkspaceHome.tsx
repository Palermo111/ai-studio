"use client";

import {
  AlertCircle,
  Folder,
} from "lucide-react";

import ModelHome from "./ModelHome";
import GeneratedVideoCard from "./video/GeneratedVideoCard";

import { useProjectStore } from "@/store/projectStore";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function WorkspaceHome() {
  const activeProject = useProjectStore(
    (state) => state.activeProject
  );

  const {
    status,
    video,
    error,
    setSection,
  } = useWorkspaceStore();

  // LOADING
  if (status === "generating") {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-4 border-primary border-t-transparent" />

          <h2 className="text-2xl font-semibold">
            Генерация видео
          </h2>

          <p className="mt-2 text-muted-foreground">
            Обычно это занимает 1–2 минуты
          </p>
        </div>
      </div>
    );
  }

  // ERROR
  if (status === "error") {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <AlertCircle
            className="mx-auto mb-4 text-red-500"
            size={42}
          />

          <h2 className="text-xl font-semibold">
            Ошибка генерации
          </h2>

          <p className="mt-2 text-muted-foreground">
            {error}
          </p>
        </div>
      </div>
    );
  }

  // SUCCESS
  if (status === "success" && video) {
    return (
      <div
        className="
          w-full
          flex
          justify-center
          pt-6
          pb-10
        "
      >
        <GeneratedVideoCard />
      </div>
    );
  }

  // HOME
  return (
    <div className="flex h-full flex-col">

      <div className="flex-1">
        <ModelHome />
      </div>

      {activeProject && (
        <div className="mx-auto mb-10 w-full max-w-4xl px-10">
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setSection("images")}
              className="rounded-2xl border border-border bg-card p-6 transition hover:shadow-sm"
            >
              <Folder className="mx-auto mb-3 text-muted-foreground" />

              <div className="font-medium">
                Images
              </div>

              <div className="text-sm text-muted-foreground">
                Генерация изображений
              </div>
            </button>

            <button
              onClick={() => setSection("videos")}
              className="rounded-2xl border border-border bg-card p-6 transition hover:shadow-sm"
            >
              <Folder className="mx-auto mb-3 text-muted-foreground" />

              <div className="font-medium">
                Videos
              </div>

              <div className="text-sm text-muted-foreground">
                Генерация видео
              </div>
            </button>

            <button
              onClick={() => setSection("audio")}
              className="rounded-2xl border border-border bg-card p-6 transition hover:shadow-sm"
            >
              <Folder className="mx-auto mb-3 text-muted-foreground" />

              <div className="font-medium">
                Audio
              </div>

              <div className="text-sm text-muted-foreground">
                Генерация аудио
              </div>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}