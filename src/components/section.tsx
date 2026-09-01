import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly note?: string;
  readonly className?: string;
  readonly children: React.ReactNode;
}

export function Section({
  id,
  eyebrow,
  title,
  note,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-14 md:py-20", className)}>
      <p className="mb-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-primary">
        {eyebrow}
      </p>
      <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-[28px]">
        {title}
      </h2>
      {note ? (
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          {note}
        </p>
      ) : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}
