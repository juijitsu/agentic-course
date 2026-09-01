"use client";

import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/components/progress-provider";

/** Sits under the nav while the plan is on screen. */
export function ProgressBar() {
  const { count, total, reset } = useProgress();
  const pct = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="sticky top-14 z-40 -mx-5 mb-8 border-y border-border/70 bg-background/85 px-5 py-2.5 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Прогресс
        </span>
        <Progress value={pct} className="h-1.5 flex-1" />
        <span className="tabular font-mono text-xs font-medium">
          {count} / {total}
        </span>
        {count > 0 ? (
          <button
            type="button"
            onClick={reset}
            className="rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            Сбросить
          </button>
        ) : null}
      </div>
    </div>
  );
}
