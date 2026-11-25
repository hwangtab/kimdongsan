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
    <div className="space-y-5">
      {bios.map((bio, index) => (
        <div key={bio.label} className="border border-line bg-paper-deep p-5">
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="mono text-muted">{bio.label}</span>
            <button
              type="button"
              onClick={() => copy(bio.text, index)}
              className="mono border border-line px-2.5 py-1 transition-colors hover:border-ink"
            >
              {copied === index ? copiedLabel : copyLabel}
            </button>
          </div>
          <p className="longform text-[15px]">{bio.text}</p>
        </div>
      ))}
    </div>
  );
}
