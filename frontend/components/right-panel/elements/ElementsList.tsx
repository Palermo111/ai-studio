"use client";

import { Element } from "@/types/element";
import { useElementStore } from "@/store/elementStore";

import ElementCard from "./ElementCard";
import CreateElementCard from "./CreateElementCard";

interface Props {
  onCreate: () => void;

  onEdit: (
    element: Element
  ) => void;
}

export default function ElementsList({
  onCreate,
  onEdit,
}: Props) {
  const elements =
    useElementStore(
      (state) => state.elements
    );

  return (
    <div
      className="
        grid
        grid-cols-3
        gap-4
      "
    >
      {/* Создание элемента */}

      {elements.length < 6 && (
        <CreateElementCard
          onClick={onCreate}
        />
      )}

      {/* Элементы */}

      {elements.map((element) => (
        <ElementCard
          key={element.id}
          element={element}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}