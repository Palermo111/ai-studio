"use client";

interface Option {
  value: string;
  label: string;
}

interface OptionGroupProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export default function OptionGroup({
  value,
  options,
  onChange,
}: OptionGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              h-10
              rounded-xl
              border
              px-4
              text-sm
              font-medium
              transition-all
              duration-200
              ${
                selected
                  ? `
                    border-primary
                    bg-primary
                    text-primary-foreground
                    shadow-sm
                  `
                  : `
                    border-border
                    bg-background
                    text-foreground
                    hover:bg-muted
                  `
              }
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}