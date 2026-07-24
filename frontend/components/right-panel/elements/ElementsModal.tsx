"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import EmptyState from "./EmptyState";
import ElementsList from "./ElementsList";
import ElementEditorModal from "./ElementEditorModal";

import { useElementStore } from "@/store/elementStore";
import { Element } from "@/types/element";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ElementsModal({
  open,
  onClose,
}: Props) {
  const [visible, setVisible] =
    useState(false);

  const [editorOpen, setEditorOpen] =
    useState(false);

  const elements =
    useElementStore(
      (state) => state.elements
    );

  const loadElements =
    useElementStore(
      (state) => state.loadElements
    );

  const selectElement =
    useElementStore(
      (state) => state.selectElement
    );

  useEffect(() => {
    if (open) {
      loadElements();

      requestAnimationFrame(() => {
        setVisible(true);
      });
    } else {
      setVisible(false);
    }
  }, [open, loadElements]);

  if (!open) {
    return null;
  }

  return (
    <>
      <div
        className={`
          fixed inset-0 z-50
          flex items-center justify-center
          bg-black/25
          backdrop-blur-sm
          transition-opacity duration-200
          ${
            visible
              ? "opacity-100"
              : "opacity-0"
          }
        `}
      >
        <div
          className={`
            relative
            flex
            h-[620px]
            w-[700px]
            mx-6
            flex-col
            overflow-hidden
            rounded-[28px]
            bg-background
            shadow-[0_24px_60px_rgba(0,0,0,0.18)]
            transition-all
            duration-200
            ${
              visible
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0"
            }
          `}
        >
          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between
              px-8
              pt-7
              pb-3
            "
          >
            <h2 className="text-lg font-semibold">
              Элементы
            </h2>

            <button
              onClick={onClose}
              className="
                rounded-lg
                p-2
                transition
                hover:bg-muted
              "
            >
              <X size={20} />
            </button>
          </div>

          {/* Subtitle */}

          <div
            className="
              px-8
              pb-5
              text-xs
              text-muted-foreground
            "
          >
            Максимум 6 элементов
          </div>

          {/* Content */}

          <div className="flex-1 overflow-y-auto px-8 pb-8">

            {elements.length === 0 ? (

              <EmptyState
                onCreate={() => {
                  selectElement(null);
                  setEditorOpen(true);
                }}
              />

            ) : (

              <ElementsList
                onCreate={() => {
                  selectElement(null);
                  setEditorOpen(true);
                }}
                onEdit={(element: Element) => {
                  selectElement(
                    element.id
                  );

                  setEditorOpen(true);
                }}
              />

            )}

          </div>

        </div>
      </div>

      <ElementEditorModal
        open={editorOpen}
        onClose={() =>
          setEditorOpen(false)
        }
      />
    </>
  );
}