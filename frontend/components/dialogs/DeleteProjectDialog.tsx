"use client";

interface DeleteProjectDialogProps {
  open: boolean;
  projectName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteProjectDialog({
  open,
  projectName,
  onCancel,
  onConfirm,
}: DeleteProjectDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-[420px] rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-xl">

        <h2 className="mb-4 text-xl font-semibold">
          Удалить проект
        </h2>

        <p className="text-zinc-300">
          Вы действительно хотите удалить проект
        </p>

        <p className="mt-2 font-semibold text-white">
          «{projectName}»
        </p>

        <p className="mt-4 text-sm text-red-400">
          Это действие нельзя отменить.
        </p>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-800"
          >
            Отмена
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500"
          >
            Удалить
          </button>

        </div>

      </div>
    </div>
  );
}