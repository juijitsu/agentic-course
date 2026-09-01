import { DayCard } from "@/components/day-card";
import type { Phase } from "@/types/course";

export function PhaseGroup({ phase }: { readonly phase: Phase }) {
  return (
    <div className="mt-10 first:mt-0">
      <div className="mb-1.5 flex flex-wrap items-baseline gap-x-3.5 gap-y-2">
        <span className="rounded-md bg-primary px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-primary-foreground">
          Фаза {phase.n}
        </span>
        <h3 className="text-xl font-semibold tracking-tight">{phase.title}</h3>
        <span className="ml-auto font-mono text-xs text-muted-foreground">
          {phase.range}
        </span>
      </div>
      <p className="mb-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
        {phase.goal}
      </p>
      <div className="space-y-3">
        {phase.days.map((day) => (
          <DayCard key={day.id} day={day} />
        ))}
      </div>
    </div>
  );
}
