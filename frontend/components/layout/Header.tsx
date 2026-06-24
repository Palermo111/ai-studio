"use client";

import { Moon, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">

      <h1 className="text-xl font-bold">
        AI Studio
      </h1>

      <div className="flex items-center gap-3">

        <button
          className="rounded-lg border border-zinc-800 p-2 transition hover:bg-zinc-900"
        >
          <Settings size={18} />
        </button>

        <button
          className="rounded-lg border border-zinc-800 p-2 transition hover:bg-zinc-900"
        >
          <Moon size={18} />
        </button>

      </div>

    </header>
  );
}