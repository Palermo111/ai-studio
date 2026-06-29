"use client";

interface OptionGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export default function OptionGroup({
  value,
  onChange,
  options,
}: OptionGroupProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((option) => {
        const active = value === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`
              relative
              flex
              h-9
              min-w-[56px]
              items-center
              justify-center
              rounded-lg
              border
              px-3
              text-[13px]
              font-medium
              transition-all
              duration-150
              ${
                active
                  ? `
                    border-primary
                    bg-primary
                    text-primary-foreground
                    shadow-sm
                  `
                  : `
                    border-border
                    bg-background
                    text-muted-foreground
                    hover:border-primary/40
                    hover:text-foreground
                    hover:bg-muted
                  `
              }
            `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}