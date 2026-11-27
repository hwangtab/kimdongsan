import type { ReactNode } from "react";

export function Win({
  label,
  right,
  children,
  className = "",
  bodyClassName = "p-5 md:p-6",
}: {
  label: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={`win ${className}`}>
      <div className="win-bar">
        <span className="mono text-ink">{label}</span>
        <span className="mono text-muted">{right}</span>
      </div>
      <div className={`win-body ${bodyClassName}`}>{children}</div>
    </div>
  );
}

export function Prompt({ path, label }: { path: string; label: string }) {
  // The whole line used to be cyan. A terminal prompt is white text; the
  // colour lives in the caret alone, which is what an ANSI screen did and
  // what keeps a full line of 16px text from vibrating.
  return (
    <p className="mono text-ink">
      C:\BD\{path}
      <span className="text-signal">&gt;</span>{" "}
      <span className="text-muted">{label}</span>
    </p>
  );
}
