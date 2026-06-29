"use client";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export default function ToggleSwitch({
  checked,
  onChange,
}: ToggleSwitchProps) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      className={`
        relative
        h-7
        w-12
        rounded-full
        border
        transition-all
        duration-200
        ${
          checked
            ? "border-primary bg-primary"
            : "border-border bg-muted"
        }
      `}
    >
      <span
        className={`
          absolute
          top-1/2
          h-5
          w-5
          -translate-y-1/2
          rounded-full
          bg-background
          shadow-md
          transition-all
          duration-200
          ${
            checked
              ? "left-[24px]"
              : "left-1"
          }
        `}
      />
    </button>
  );
}