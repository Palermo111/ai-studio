"use client";

import {
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import ElementsMentionMenu from "./ElementsMentionMenu";

import { Element } from "@/types/element";
import { useElementStore } from "@/store/elementStore";

interface Props {
  value: string;

  onChange: (
    value: string
  ) => void;

  readOnly?: boolean;

  placeholder?: string;

  maxLength?: number;

  textareaRef: RefObject<HTMLTextAreaElement | null>;

  menuClassName?: string;
}

export default function ElementMention({
  value,
  onChange,
  readOnly = false,
  placeholder,
  maxLength,
  textareaRef,
  menuClassName = `
    left-0
    bottom-[34px]
  `,
}: Props) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const wrapperRef =
    useRef<HTMLDivElement>(null);

  const elements =
    useElementStore(
      (state) => state.elements
    );

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [menuOpen]);

  const handleChange = (
    text: string
  ) => {
    onChange(text);

    const hasElements =
      elements.length > 0;

    if (
      hasElements &&
      text.endsWith("@")
    ) {
      setMenuOpen(true);
    } else {
      setMenuOpen(false);
    }
  };

  const handleSelect = (
    element: Element
  ) => {
    const nextValue =
      value.slice(0, -1) +
      "@" +
      element.name +
      " ";

    onChange(nextValue);

    setMenuOpen(false);

    textareaRef.current?.focus();
  };

  return (
    <div
      ref={wrapperRef}
      className="relative h-full"
    >
      <textarea
        ref={textareaRef}
        value={value}
        readOnly={readOnly}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) =>
          handleChange(
            e.target.value
          )
        }
        className={`
          block
          h-full
          w-full
          resize-none
          overflow-y-auto
          border-none
          bg-transparent
          pr-8
          text-[16px]
          leading-8
          text-foreground
          outline-none
          placeholder:text-muted-foreground
          ${
            readOnly
              ? "cursor-default"
              : ""
          }
        `}
      />

      <div
        className={`
          absolute
          z-50
          ${menuClassName}
        `}
      >
        <ElementsMentionMenu
          open={menuOpen}
          elements={elements}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}