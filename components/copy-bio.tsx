"use client";

import { useState } from "react";

export function CopyBio({
  bios,
  copyLabel,
  copiedLabel,
}: {
  bios: { label: string; text: string }[];
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState<number | null>(null);

  const copy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(index);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="space-y-4">
      {bios.map((bio, index) => (
        <div key={bio.label} className="border border-line">
          <div className="win-bar">
            <span className="mono text-signal">{bio.label}.TXT</span>
            <button
              type="button"
              onClick={() => copy(bio.text, index)}
              className="mono border border-line px-2 text-muted hover:border-signal hover:text-signal"
            >
              {copied === index ? copiedLabel : copyLabel}
            </button>
          </div>
          <p className="longform whitespace-pre-line bg-screen p-4 text-screen-ink">
            {bio.text}
          </p>
          <p aria-live="polite" className="sr-only">
            {copied === index ? copiedLabel : ""}
          </p>
        </div>
      ))}
    </div>
  );
}
