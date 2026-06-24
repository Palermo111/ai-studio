"use client";

import { ReactNode } from "react";
import Header from "./Header";

interface AppLayoutProps {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
  bottom: ReactNode;
}

export default function AppLayout({
  left,
  center,
  right,
  bottom,
}: AppLayoutProps) {
  return (
    <div className="h-screen bg-zinc-950 text-zinc-100 flex flex-col">

      <Header />

      <div className="flex flex-1 overflow-hidden">

        {/* Left */}

        <aside className="w-64 border-r border-zinc-800 overflow-auto">
          {left}
        </aside>

        {/* Center */}

        <main className="flex-1 overflow-auto">
          {center}
        </main>

        {/* Right */}

        <aside className="w-80 border-l border-zinc-800 overflow-auto">
          {right}
        </aside>

      </div>

      {/* Bottom */}

      <footer className="border-t border-zinc-800">
        {bottom}
      </footer>

    </div>
  );
}