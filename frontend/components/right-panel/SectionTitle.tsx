"use client";

import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
}

export default function SectionTitle({
  children,
}: SectionTitleProps) {
  return (
    <h2 className="text-sm font-semibold tracking-wide text-zinc-100">
      {children}
    </h2>
  );
}