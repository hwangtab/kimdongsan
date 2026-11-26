"use client";

import { useState } from "react";

export function VideoEmbed({
  id,
  title,
  playLabel,
  watchLabel,
}: {
  id: string;
  title: string;
  playLabel: string;
  watchLabel: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden border border-line bg-panel-deep text-ink">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${playLabel}: ${title}`}
          className="group flex h-full w-full flex-col justify-between p-4 text-left"
        >
          <span className="mono text-muted">YOUTUBE.MP4</span>
          <span className="flex items-center gap-4">
            <span
              aria-hidden
              className="mono flex h-8 w-8 shrink-0 items-center justify-center border border-line text-signal transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-void"
            >
              ▶
            </span>
            <span className="longform text-[16px] leading-[1.5]">{title}</span>
          </span>
          <span className="mono text-muted">
            {playLabel} · {watchLabel}
          </span>
        </button>
      )}
    </div>
  );
}
