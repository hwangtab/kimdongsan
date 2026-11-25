"use client";

import { useEffect, useRef, useState } from "react";

let activeAudio: HTMLAudioElement | null = null;

function fmt(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayer({
  src,
  title,
  peaks,
  playLabel,
  pauseLabel,
  compact = false,
  showTitle = true,
}: {
  src: string;
  title: string;
  peaks: number[];
  playLabel: string;
  pauseLabel: string;
  compact?: boolean;
  showTitle?: boolean;
}) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(60);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onTime = () => setProgress(el.currentTime);
    const onMeta = () => setDuration(el.duration || 60);
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnd);
    el.addEventListener("pause", onPause);
    el.addEventListener("play", onPlay);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnd);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("play", onPlay);
      if (activeAudio === el) activeAudio = null;
    };
  }, []);

  const toggle = async () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      if (activeAudio && activeAudio !== el) activeAudio.pause();
      activeAudio = el;
      try {
        await el.play();
      } catch {
        setPlaying(false);
      }
    } else {
      el.pause();
    }
  };

  const seek = (ratio: number) => {
    const el = ref.current;
    if (!el || !Number.isFinite(el.duration)) return;
    el.currentTime = Math.max(0, Math.min(el.duration, ratio * el.duration));
  };

  const played = duration > 0 ? progress / duration : 0;
  const bars = peaks.length ? peaks : Array.from({ length: 48 }, () => 40);

  return (
    <div className={`flex items-center gap-3 ${compact ? "" : "w-full"}`}>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? pauseLabel : playLabel}
        className="flex h-11 w-11 shrink-0 items-center justify-center border border-ink bg-ink text-paper transition-colors hover:bg-paper hover:text-ink"
      >
        {playing ? (
          <span className="flex gap-[3px]" aria-hidden>
            <span className="block h-3 w-[3px] bg-current" />
            <span className="block h-3 w-[3px] bg-current" />
          </span>
        ) : (
          <span
            aria-hidden
            className="ml-[2px] block h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-current"
          />
        )}
      </button>

      <div className="min-w-0 flex-1">
        {!compact && (
          <div className="mb-1.5 flex items-baseline justify-between gap-3">
            {showTitle ? (
              <span className="truncate text-[13px] font-medium">{title}</span>
            ) : (
              <span aria-hidden />
            )}
            <span className="mono shrink-0 text-muted">
              {fmt(progress)} / {fmt(duration)}
            </span>
          </div>
        )}
        <div
          role="slider"
          tabIndex={0}
          aria-label={`${title} — ${playLabel}`}
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          aria-valuenow={Math.round(progress)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              seek(Math.min(1, played + 0.02));
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              seek(Math.max(0, played - 0.02));
            }
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              toggle();
            }
          }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            seek((e.clientX - rect.left) / rect.width);
          }}
          className="flex h-9 cursor-pointer items-center gap-[2px] outline-none focus-visible:ring-1 focus-visible:ring-ink"
        >
          {bars.map((peak, i) => {
            const isPlayed = i / bars.length <= played;
            return (
              <span
                key={i}
                className={`wave-bar w-full ${isPlayed ? "is-played" : ""}`}
                style={{ height: `${Math.max(8, peak * 0.34)}px` }}
              />
            );
          })}
        </div>
        {compact && (
          <div className="mt-1 flex items-baseline justify-between">
            <span className="truncate text-[12px] font-medium">{title}</span>
            <span className="mono text-muted">{fmt(progress)}</span>
          </div>
        )}
      </div>

      <audio ref={ref} src={src} preload="none" />
    </div>
  );
}
