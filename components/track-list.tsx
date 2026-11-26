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
    <div className="border border-line bg-panel">
      <div className="win-bar">
        <span className="mono text-signal">TRACKLIST</span>
        <span className="mono text-muted">08 FILES</span>
      </div>
      <div>
        {tracks.map((track) => {
          const isOpen = open === track.no;
          const isFull = full.has(track.no);
          const title = locale === "ko" ? track.title : track.titleEn;
          const note = locale === "ko" ? track.note : track.noteEn;
          const excerpt =
            locale === "ko" ? track.lyricExcerpt : track.lyricExcerptEn;
          const credits = locale === "ko" ? track.creditsKo : track.creditsEn;

          return (
            <div key={track.no} className="border-b border-line last:border-b-0">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : track.no)}
                aria-expanded={isOpen}
                className={`group flex w-full items-baseline gap-3 px-4 py-3 text-left ${
                  isOpen ? "bg-panel-deep" : ""
                }`}
              >
                <span className="mono shrink-0 text-signal">
                  {isOpen ? ">" : " "}
                </span>
                <span className="mono w-6 shrink-0 text-muted">
                  {String(track.no).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-[16px] leading-tight md:text-mid">
                      {title}
                    </span>
                    {track.titleTrack && (
                      <span className="mono border border-ticket px-1 text-ticket">
                        {labels.titleTrack}
                      </span>
                    )}
                    {track.instrumental && (
                      <span className="mono border border-line px-1 text-muted">
                        {labels.instrumental}
                      </span>
                    )}
                  </span>
                  <span className="mt-1 hidden text-muted md:block">
                    {note.length > 82 ? `${note.slice(0, 82)}…` : note}
                  </span>
                </span>
                <span className="mono shrink-0 text-muted">
                  {track.duration}
                </span>
                <span aria-hidden className="mono w-3 shrink-0 text-muted">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="grid gap-8 border-t border-line bg-panel-deep px-4 py-6 md:grid-cols-[1.08fr_0.92fr] md:gap-10">
                  <div>
                    <p className="longform">{note}</p>

                    {excerpt.length > 0 && (
                      <div className="mt-6 border-l-2 border-signal pl-4">
                        <p className="mono mb-2 text-muted">{labels.lyrics}</p>
                        <div className="longform text-[16px]">
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
                          className="mono link-underline mt-4 inline-block text-muted"
                        >
                          {isFull ? labels.hideLyrics : labels.fullLyrics}
                        </button>
                        {isFull && (
                          <div className="mt-4 max-h-96 overflow-y-auto border border-line bg-screen p-4 text-screen-ink">
                            <p className="mono mb-2">
                              {locale === "ko" ? "한국어 원문" : "Korean original"}
                            </p>
                            <div className="longform whitespace-pre-line">
                              {track.lyrics.join("\n")}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="space-y-5">
                    <div className="border border-line p-4">
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
                      <p className="mono mb-2 text-muted">
                        {labels.trackCredits}
                      </p>
                      <ul className="longform space-y-1 text-muted">
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
    </div>
  );
}
