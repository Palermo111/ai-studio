interface SectionProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

export default function Section({
  title,
  children,
}: SectionProps) {
  return (
    <section className="space-y-3">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </h3>

      <div
        className="
          rounded-xl
          border
          border-border
          bg-background
          px-4
          py-3
        "
      >
        {children}
      </div>
    </section>
  );
}