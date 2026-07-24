"use client";

import { useState } from "react";
import { Users, ChevronRight } from "lucide-react";

import ElementsModal from "./elements/ElementsModal";

export default function ElementsSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          flex
          h-12
          w-full
          items-center
          justify-between
          rounded-xl
          border
          border-border
          bg-background
          px-4
          transition-all
          hover:border-primary/40
          hover:bg-muted/30
        "
      >
        <div className="flex items-center gap-2">
          <Users
            size={16}
            className="text-muted-foreground"
          />

          <span className="text-sm font-medium text-foreground">
            Элементы
          </span>
        </div>

        <ChevronRight
          className="h-4 w-4 text-muted-foreground"
        />
      </button>

      <ElementsModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}