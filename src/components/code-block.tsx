import { cn } from "@/lib/utils";

interface CodeBlockProps {
  readonly code: string;
  readonly label?: string;
  readonly className?: string;
}

/** Monospace panel for the agent loop, the order template and the worksheet. */
export function CodeBlock({ code, label, className }: CodeBlockProps) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-[#0b0c0e]",
        className,
      )}
    >
      {label ? (
        <figcaption className="border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </figcaption>
      ) : null}
      <div className="overflow-x-auto">
        <pre className="p-4 font-mono text-[12.5px] leading-relaxed text-foreground/90">
          <code>{code}</code>
        </pre>
      </div>
    </figure>
  );
}
