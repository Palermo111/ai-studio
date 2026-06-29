"use client";

import Sidebar from "@/components/sidebar/Sidebar";
import Workspace from "@/components/workspace/Workspace";
import AIPanel from "@/components/right-panel/AIPanel";
import PromptBar from "@/components/prompt-bar/PromptBar";

export default function HomePage() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground">

      {/* LEFT */}
      <aside className="w-[260px] border-r border-border bg-card">
        <Sidebar />
      </aside>

      {/* CENTER */}
      <main className="flex flex-1 flex-col overflow-hidden">

        {/* HEADER LAYER (стабилизирует UX) */}
        <div className="h-12 border-b border-border flex items-center px-4 text-sm text-muted-foreground">
          AI Studio
        </div>

        {/* WORKSPACE */}
        <div className="flex-1 overflow-hidden">
          <Workspace />
        </div>

      </main>

      {/* RIGHT */}
      <aside className="w-[320px] border-l border-border bg-card">
        <AIPanel />
      </aside>

      {/* BOTTOM PROMPT */}
      <div className="fixed bottom-0 left-[260px] right-[320px]">
        <PromptBar />
      </div>

    </div>
  );
}