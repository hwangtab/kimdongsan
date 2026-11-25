"use client";

import { useState } from "react";
import { AudioPlayer } from "@/components/audio-player";
import type { Track } from "@/data/album";
import type { Locale } from "@/lib/i18n";

type Labels = {
  titleTrack: string;
  instrumental: string;
  lyrics: string;
  fullLyrics: string;
  hideLyrics: string;
  credits: string;
  play: string;
  pause: string;
  trackCredits: string;
};

export function TrackList({
  tracks,
  locale,
  labels,
  peaks,
}: {
  tracks: Track[];
  locale: Locale;
  labels: Labels;
  peaks: Record<string, number[]>;
}) {
  const [open, setOpen] = useState<number | null>(4);
  const [full, setFull] = useState<Set<number>>(new Set());

  const toggleFull = (no: number) =>
    setFull((prev) => {
      const next = new Set(prev);
      if (next.has(no)) next.delete(no);
      else next.add(no);
      return next;
    });

  return (
    <div className="border-t border-ink">
      {tracks.map((track) => {
        const isOpen = open === track.no;
        const isFull = full.has(track.no);
        const title = locale === "ko" ? track.title : track.titleEn;
        const note = locale === "ko" ? track.note : track.noteEn;
        const excerpt =
          locale === "ko" ? track.lyricExcerpt : track.lyricExcerptEn;
        const credits =
          locale === "ko" ? track.creditsKo : track.creditsEn;

        return (
          <div key={track.no} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : track.no)}
              aria-expanded={isOpen}
              className="group flex w-full items-center gap-3 py-5 text-left md:gap-6"
            >
              <span className="mono w-7 shrink-0 text-muted">
                {String(track.no).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[17px] font-semibold tracking-[-0.02em] md:text-[19px]">
                    {title}
                  </span>
                  {track.titleTrack && (
                    <span className="mono border border-ink px-1.5 py-0.5 text-[10px]">
                      {labels.titleTrack}
                    </span>
                  )}
                  {track.instrumental && (
                    <span className="mono border border-line px-1.5 py-0.5 text-[10px] text-muted">
                      {labels.instrumental}
                    </span>
                  )}
                </span>
                <span className="mt-1 hidden text-[13px] text-muted md:block">
                  {note.length > 82 ? `${note.slice(0, 82)}…` : note}
                </span>
              </span>
              <span className="mono shrink-0 text-muted">{track.duration}</span>
              <span
                aria-hidden
                className={`mono shrink-0 transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>

            {isOpen && (
              <div className="grid gap-8 pb-10 md:grid-cols-[1.08fr_0.92fr] md:gap-12">
                <div>
                  <p className="text-[15px] leading-[1.9] text-muted">
                    {note}
                  </p>

                  {excerpt.length > 0 && (
                    <div className="mt-7 border-l-2 border-ink pl-5">
                      <p className="mono mb-3 text-muted">{labels.lyrics}</p>
                      <div className="serif text-[17px] leading-[1.85]">
                        {excerpt.map((line, i) =>
                          line === "" ? (
                            <span key={i} className="block h-3" />
                          ) : (
                            <p key={i}>{line}</p>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {excerpt.length > 0 && (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleFull(track.no)}
                        aria-expanded={isFull}
                        className="mono link-underline mt-5 inline-block text-muted"
                      >
                        {isFull ? labels.hideLyrics : labels.fullLyrics}
                      </button>
                      {isFull && (
                        <div className="mt-5 max-h-96 overflow-y-auto border border-line bg-paper-deep p-5">
                          <p className="mono mb-3 text-muted">
                            {locale === "ko" ? "한국어 원문" : "Korean original"}
                          </p>
                          <div className="whitespace-pre-line text-[14px] leading-[1.85] text-muted">
                            {track.lyrics.join("\n")}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="border border-line bg-paper-deep p-5">
                    <AudioPlayer
                      src={track.audio}
                      title={title}
                      peaks={peaks[String(track.no)] ?? []}
                      playLabel={labels.play}
                      pauseLabel={labels.pause}
                      showTitle={false}
                    />
                  </div>
                  <div>
                    <p className="mono mb-2 text-muted">{labels.trackCredits}</p>
                    <ul className="space-y-1.5 text-[13px] leading-[1.7] text-muted">
                      {credits.map((credit) => (
                        <li key={credit}>{credit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
