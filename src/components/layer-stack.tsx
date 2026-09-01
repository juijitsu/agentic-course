import { cn } from "@/lib/utils";

interface StackRow {
  readonly n: string;
  readonly name: string;
  readonly desc: string;
  readonly core?: boolean;
}

/** Renders both the nine architecture layers and the domain flow. */
export function LayerStack({
  rows,
  className,
}: {
  readonly rows: readonly StackRow[];
  readonly className?: string;
}) {
  return (
    <ol
      className={cn(
        "divide-y divide-border overflow-hidden rounded-xl border border-border",
        className,
      )}
    >
      {rows.map((row) => (
        <li
          key={row.name}
          className={cn(
            "grid items-baseline gap-x-4 gap-y-1 px-4 py-3 md:grid-cols-[24px_150px_1fr]",
            row.core ? "bg-brand-soft" : "bg-card",
          )}
        >
          <span
            className={cn(
              "tabular font-mono text-[11px] font-medium",
              row.core ? "text-brand" : "text-muted-foreground",
            )}
          >
            {row.n}
          </span>
          <span
            className={cn(
              "text-sm font-semibold tracking-tight",
              row.core && "text-brand",
            )}
          >
            {row.name}
          </span>
          <span
            className={cn(
              "text-sm leading-relaxed",
              row.core ? "text-brand/90" : "text-muted-foreground",
            )}
          >
            {row.desc}
          </span>
        </li>
      ))}
    </ol>
  );
}
