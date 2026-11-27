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

/**
 * Rendered as native `<details>` rather than a React accordion: every track's
 * notes, lyrics and credits then exist in the server HTML even while collapsed.
 * Search engines and answer engines read this page for the songs, and a
 * client-only accordion left that text inside the RSC payload where they
 * cannot see it. Track 4 opens by default, as before.
 */
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
  return (
    <div className="border border-line bg-panel">
      <div className="win-bar">
        <span className="mono text-signal">TRACKLIST</span>
        <span className="mono text-muted">08 FILES</span>
      </div>
      <div>
        {tracks.map((track) => {
          const title = locale === "ko" ? track.title : track.titleEn;
          const titleAlt = locale === "ko" ? track.titleEn : track.title;
          const note = locale === "ko" ? track.note : track.noteEn;
          const excerpt =
            locale === "ko" ? track.lyricExcerpt : track.lyricExcerptEn;
          const credits = locale === "ko" ? track.creditsKo : track.creditsEn;
          const hasLyrics = track.lyrics.length > 0;
          const hasExcerpt = excerpt.length > 0;

          return (
            <details
              key={track.no}
              open={track.no === 4}
              className="group border-b border-line last:border-b-0"
            >
              <summary className="flex cursor-pointer list-none items-baseline gap-3 px-4 py-3 text-left group-open:bg-panel-deep [&::-webkit-details-marker]:hidden">
                <span aria-hidden className="mono shrink-0 text-signal">
                  <span className="group-open:hidden"> </span>
                  <span className="hidden group-open:inline">&gt;</span>
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
                  {/* The note stays complete in the DOM and is only clamped by
                      CSS: a hard truncation in JS used to leave crawlers with a
                      sentence that read like a full description. */}
                  <span className="mt-1 hidden text-muted md:line-clamp-2">
                    {note}
                  </span>
                </span>
                <span className="mono shrink-0 text-muted">
                  {track.duration}
                </span>
                <span aria-hidden className="mono w-3 shrink-0 text-muted">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>

              <div className="grid gap-8 border-t border-line bg-panel-deep px-4 py-6 md:grid-cols-[1.08fr_0.92fr] md:gap-10">
                <div>
                  <p className="longform">{note}</p>

                  {hasExcerpt && (
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

                  {hasLyrics && (
                    <details className="group/lyrics mt-4">
                      <summary className="mono link-underline inline-block cursor-pointer list-none text-muted [&::-webkit-details-marker]:hidden">
                        <span className="group-open/lyrics:hidden">
                          {labels.fullLyrics}
                        </span>
                        <span className="hidden group-open/lyrics:inline">
                          {labels.hideLyrics}
                        </span>
                      </summary>
                      <div className="mt-4 max-h-96 overflow-y-auto border border-line bg-screen p-4 text-screen-ink">
                        <p className="mono mb-2">
                          {locale === "ko" ? "한국어 원문" : "Korean original"}
                        </p>
                        <div className="longform whitespace-pre-line">
                          {track.lyrics.join("\n")}
                        </div>
                      </div>
                    </details>
                  )}
                </div>

                <div className="space-y-5">
                  <div className="border border-line p-4">
                    <AudioPlayer
                      src={track.audio}
                      title={`${title} — ${titleAlt}`}
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
            </details>
          );
        })}
      </div>
    </div>
  );
}
