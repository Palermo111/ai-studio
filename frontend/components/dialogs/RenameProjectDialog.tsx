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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      
      <div className="w-[420px] rounded-2xl border border-border bg-card p-6 shadow-xl">

        <h2 className="mb-5 text-lg font-semibold text-foreground">
          Переименовать проект
        </h2>

        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSave(name);
            if (e.key === "Escape") onCancel();
          }}
          className="
            w-full rounded-lg border border-border
            bg-background px-3 py-2 text-sm text-foreground
            outline-none
            focus:border-primary
          "
        />

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="
              rounded-lg border border-border
              bg-background px-4 py-2 text-sm text-muted-foreground
              hover:bg-muted/50
            "
          >
            Отмена
          </button>

          <button
            onClick={() => onSave(name)}
            className="
              rounded-lg bg-primary
              px-4 py-2 text-sm font-medium text-primary-foreground
              hover:opacity-90 active:scale-[0.97]
              transition
            "
          >
            Сохранить
          </button>

        </div>

      </div>
    </div>
  );
}