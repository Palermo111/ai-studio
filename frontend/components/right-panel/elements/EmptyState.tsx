"use client";

import { Plus, Users } from "lucide-react";

interface Props {
  onCreate: () => void;
}

export default function EmptyState({
  onCreate,
}: Props) {
  return (
    <div className="flex h-full flex-col items-center pt-12">

      <div
        className="
          flex
          h-24
          w-24
          items-center
          justify-center
          rounded-full
          bg-muted/40
        "
      >
        <Users
          size={34}
          className="text-muted-foreground"
        />
      </div>

      <h2 className="mt-6 text-xl font-semibold text-foreground">
        Пока нет элементов
      </h2>

      <p
        className="
          mt-3
          text-center
          text-sm
          leading-6
          text-muted-foreground
        "
      >
        Создайте персонажей, объекты
        <br />
        или локации для проекта
      </p>

      <button
        type="button"
        onClick={onCreate}
        className="
          mt-6
          flex
          h-11
          items-center
          gap-2
          rounded-xl
          border
          border-primary/25
          px-5
          text-sm
          font-medium
          text-primary
          transition-all
          hover:border-primary/50
          hover:bg-primary/5
        "
      >
        <Plus size={16} />
        Создать элемент
      </button>

    </div>
  );
}