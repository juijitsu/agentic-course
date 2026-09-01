"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useProgress } from "@/components/progress-provider";
import type { Day } from "@/types/course";
import { cn } from "@/lib/utils";

const ROWS = [
  { key: "order", label: "Заказ" },
  { key: "check", label: "Проверить" },
  { key: "got", label: "Понял" },
] as const;

export function DayCard({ day }: { readonly day: Day }) {
  const { done, toggle } = useProgress();
  const isDone = Boolean(done[day.id]);

  return (
    <article
      className={cn(
        "edge-lit rounded-xl border border-border bg-card p-5 transition-opacity md:p-6",
        day.key && "border-l-2 border-l-primary",
        isDone && "opacity-55",
      )}
    >
      <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          {day.label} · {day.block}
        </span>
        <h4 className="text-balance text-[17px] font-semibold tracking-tight">
          {day.title}
        </h4>
        {day.tag ? (
          <Badge
            variant="secondary"
            className="bg-brand-soft font-mono text-[9.5px] uppercase tracking-[0.1em] text-brand"
          >
            {day.tag}
          </Badge>
        ) : null}
      </div>

      <dl className="space-y-3">
        {ROWS.map((row) => (
          <div
            key={row.key}
            className="grid gap-1.5 md:grid-cols-[84px_1fr] md:gap-4"
          >
            <dt
              className={cn(
                "pt-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.1em]",
                row.key === "order" ? "text-primary" : "text-muted-foreground",
              )}
            >
              {row.label}
            </dt>
            <dd
              className={cn(
                "text-[14.5px] leading-relaxed text-muted-foreground",
                row.key === "order" &&
                  "rounded-lg border border-border bg-secondary/60 px-3.5 py-2.5 font-mono text-[12.5px] leading-relaxed",
                row.key === "got" && "border-l-2 border-border pl-3.5",
              )}
            >
              {day[row.key]}
            </dd>
          </div>
        ))}
      </dl>

      <label className="mt-5 flex cursor-pointer select-none items-center gap-2.5 border-t border-border pt-4">
        <Checkbox
          checked={isDone}
          onCheckedChange={() => toggle(day.id)}
          aria-label={`Отметить: ${day.title}`}
        />
        <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          День пройден
        </span>
      </label>
    </article>
  );
}
