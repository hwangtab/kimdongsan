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
        <span className="mono text-signal">{label}</span>
        <span className="mono text-muted">{right}</span>
      </div>
      <div className={`win-body ${bodyClassName}`}>{children}</div>
    </div>
  );
}

export function Prompt({ path, label }: { path: string; label: string }) {
  return (
    <p className="mono text-muted">
      <span className="text-signal">C:\BD\{path}&gt;</span> {label}
    </p>
  );
}
