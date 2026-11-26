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
    <div className="relative aspect-video overflow-hidden border border-ink bg-ink text-paper">
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
          className="group flex h-full w-full flex-col justify-between p-5 text-left md:p-6"
        >
          <span className="mono text-paper/55">YOUTUBE</span>
          <span className="flex items-center gap-4">
            <span
              aria-hidden
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-paper/60 transition-colors group-hover:bg-paper group-hover:text-ink"
            >
              <span className="ml-[3px] block h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-current" />
            </span>
            <span className="serif text-[19px] leading-[1.4] md:text-[21px]">
              {title}
            </span>
          </span>
          <span className="mono text-paper/55">
            {playLabel} · {watchLabel}
          </span>
        </button>
      )}
    </div>
  );
}
