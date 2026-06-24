"use client";

import { useEffect, useState } from "react";

interface RenameProjectDialogProps {
  open: boolean;
  currentName: string;
  onCancel: () => void;
  onSave: (name: string) => void;
}

export default function RenameProjectDialog({
  open,
  currentName,
  onCancel,
  onSave,
}: RenameProjectDialogProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) {
      setName(currentName);
    }
  }, [open, currentName]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-[420px] rounded-xl bg-zinc-900 border border-zinc-700 p-6 shadow-xl">

        <h2 className="mb-5 text-xl font-semibold">
          Переименовать проект
        </h2>

        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSave(name);
            }

            if (e.key === "Escape") {
              onCancel();
            }
          }}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 outline-none focus:border-violet-500"
        />

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-800"
          >
            Отмена
          </button>

          <button
            onClick={() => onSave(name)}
            className="rounded-lg bg-violet-600 px-4 py-2 hover:bg-violet-500"
          >
            Сохранить
          </button>

        </div>

      </div>
    </div>
  );
}