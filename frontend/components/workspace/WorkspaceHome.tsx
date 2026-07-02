"use client";

import {
  AlertCircle,
  Folder,
  Sparkles,
} from "lucide-react";

import { useProjectStore } from "@/store/projectStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import GeneratedVideoCard from "./video/GeneratedVideoCard";

export default function WorkspaceHome() {
  console.log("WORKSPACE HOME RENDER");
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

  // HERO
  return (
    <div className="flex h-full items-center justify-center px-10">
      <div className="w-full max-w-4xl text-center">

        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-card shadow-[0_10px_35px_rgba(0,0,0,0.06)]">
          <Sparkles
            className="text-orange-500"
            size={32}
          />
        </div>

        <h1 className="text-5xl font-semibold tracking-tight text-foreground">
          Seedance
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          Продвинутая модель генерации видео от ByteDance
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-muted-foreground">
          Seedance 2.0 — продвинутая модель генерации видео для
          динамичного сторителлинга, плавной анимации и быстрой
          работы с визуальными концептами. Поддерживает текст,
          изображения, видео и аудио в одном пайплайне.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            "image-to-video",
            "video-to-video",
            "генерация с аудио",
            "работа с референсами",
            "динамичный сторителлинг",
          ].map((item) => (
            <div
              key={item}
              className="rounded-full bg-card px-4 py-2 text-sm text-muted-foreground"
            >
              {item}
            </div>
          ))}
        </div>

        {activeProject && (
          <div className="mt-14 grid grid-cols-3 gap-4">
            <button
              onClick={() => setSection("images")}
              className="rounded-2xl border border-border bg-card p-6 transition hover:shadow-sm"
            >
              <Folder className="mx-auto mb-3 text-muted-foreground" />
              <div className="font-medium">Images</div>
              <div className="text-sm text-muted-foreground">
                Генерация изображений
              </div>
            </button>

            <button
              onClick={() => setSection("videos")}
              className="rounded-2xl border border-border bg-card p-6 transition hover:shadow-sm"
            >
              <Folder className="mx-auto mb-3 text-muted-foreground" />
              <div className="font-medium">Videos</div>
              <div className="text-sm text-muted-foreground">
                Генерация видео
              </div>
            </button>

            <button
              onClick={() => setSection("audio")}
              className="rounded-2xl border border-border bg-card p-6 transition hover:shadow-sm"
            >
              <Folder className="mx-auto mb-3 text-muted-foreground" />
              <div className="font-medium">Audio</div>
              <div className="text-sm text-muted-foreground">
                Генерация аудио
              </div>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}