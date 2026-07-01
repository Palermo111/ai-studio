"use client";

interface DeleteProjectDialogProps {
  open: boolean;
  title: string;
  itemName: string;
  itemType: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteProjectDialog({
  open,
  title,
  itemName,
  itemType,
  onCancel,
  onConfirm,
}: DeleteProjectDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="w-[420px] rounded-2xl border border-border bg-card p-6 shadow-xl">

        <h2 className="text-lg font-semibold text-foreground">
          {title}
        </h2>

        <p className="mt-4 text-sm text-muted-foreground">
          Вы действительно хотите удалить {itemType}
        </p>

        <p className="mt-2 text-sm font-semibold text-foreground">
          «{itemName}»
        </p>

        <p className="mt-4 text-xs text-red-500">
          Это действие нельзя отменить.
        </p>

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
            onClick={onConfirm}
            className="
              rounded-lg bg-red-500
              px-4 py-2 text-sm font-medium text-white
              hover:opacity-90 active:scale-[0.97]
              transition
            "
          >
            Удалить
          </button>

        </div>

      </div>
    </div>
  );
}