"use client";

import { ReactNode } from "react";

import Sidebar from "@/components/sidebar/Sidebar";
import Workspace from "@/components/workspace/Workspace";
import AIPanel from "@/components/right-panel/AIPanel";
import PromptBar from "@/components/prompt-bar/PromptBar";

interface AppShellProps {
  children?: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">

      {/* LEFT */}
      <aside className="w-[260px] shrink-0">
        <Sidebar />
      </aside>

      {/* CENTER */}
      <main className="relative flex flex-1 flex-col overflow-hidden">

        {/* Для страниц роутинга показываем children,
            для главной рабочей области — Workspace */}
        <div className="flex-1 overflow-hidden">
          <Workspace />
        </div>

        {/* PROMPT */}
        <div className="shrink-0 border-t border-transparent">
          <PromptBar />
        </div>

      </main>

      {/* RIGHT */}
      <aside className="w-[320px] shrink-0">
        <AIPanel />
      </aside>

    </div>
  );
}