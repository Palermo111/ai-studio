"use client";

import { useWorkspaceStore } from "@/store/workspaceStore";

import WorkspaceHome from "./WorkspaceHome";
import ImagesView from "./ImagesView";
import VideosView from "./VideosView";
import AudioView from "./AudioView";
import ProjectsScreen from "./ProjectsScreen";

export default function Workspace() {
  console.log("WORKSPACE RENDER");
  const section = useWorkspaceStore((state) => state.section);
  console.log("SECTION =", section);
  const renderContent = () => {
    switch (section) {
      case "home":
        return <WorkspaceHome />;

      case "projects":
        return <ProjectsScreen />;

      case "images":
        return <ImagesView />;

      case "videos":
        return <VideosView />;

      case "audio":
        return <AudioView />;

      default:
        return <WorkspaceHome />;
    }
  };
  
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden px-10">
      <div className="w-full h-full flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
}