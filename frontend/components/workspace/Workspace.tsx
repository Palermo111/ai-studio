"use client";

import { useProjectStore } from "@/store/projectStore";
import { useWorkspaceStore } from "@/store/workspaceStore";

import WorkspaceHome from "./WorkspaceHome";
import ImagesView from "./ImagesView";
import VideosView from "./VideosView";
import AudioView from "./AudioView";

export default function Workspace() {
  const activeProject = useProjectStore(
    (state) => state.activeProject
  );

  const section = useWorkspaceStore(
    (state) => state.section
  );

  if (!activeProject) {
    return (
      <div className="flex h-full items-center justify-center text-zinc-500">
        Выберите проект
      </div>
    );
  }

  switch (section) {
    case "images":
      return <ImagesView />;

    case "videos":
      return <VideosView />;

    case "audio":
      return <AudioView />;

    default:
      return <WorkspaceHome />;
  }
}