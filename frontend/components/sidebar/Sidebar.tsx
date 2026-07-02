"use client";

import { Folder, Home, Sparkles } from "lucide-react";

import { useWorkspaceStore } from "@/store/workspaceStore";
import { useProjectStore } from "@/store/projectStore";

export default function Sidebar() {
  const section = useWorkspaceStore((state) => state.section);
  const setSection = useWorkspaceStore((state) => state.setSection);

  const setActiveProject = useProjectStore(
    (state) => state.setActiveProject
  );

  return (
    <div className="flex h-full flex-col">

      {/* LOGO */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Sparkles size={20} className="text-primary" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            AI Studio
          </h2>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="p-4 space-y-1">

        <button
          onClick={() => {
            setActiveProject(null);
            setSection("home");
          }}
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
            section === "home"
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <Home size={20} />
          Главная
        </button>

        <button
          onClick={() => {
            console.log("CLICK PROJECTS");
            setSection("projects");
          }}
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
            section === "projects"
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <Folder size={20} />
          Проекты
        </button>

      </div>

    </div>
  );
}