"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HeroVideo — a background video that never costs the page anything it doesn't
 * have to.
 *
 * Behaviour:
 *  - The poster paints immediately as a plain <img> (no JS, no layout shift).
 *  - The <video> is only MOUNTED — and therefore only downloaded — on a
 *    desktop-width viewport with motion allowed. On mobile or under
 *    prefers-reduced-motion the poster is all that ever loads.
 *  - preload="metadata" keeps the initial request tiny; the video fades in only
 *    once it is actually playable (loadeddata / canplaythrough).
 *  - Every listener is removed on cleanup, and the media-query listeners are
 *    live, so rotating a tablet or toggling reduced-motion re-evaluates.
 *
 * It is purely decorative, so the whole thing is aria-hidden and not focusable.
 */

export interface HeroVideoProps {
  /** Poster image shown immediately and as the video's own poster attribute. */
  poster: string;
  /** MP4 source (H.264) — the universal fallback. */
  mp4: string;
  /** Optional WebM source (VP9) — preferred when the browser supports it. */
  webm?: string;
  /**
   * CSS object-position for both poster and video, e.g. "center" or
   * "right center". Lets a subject be kept in frame when cover crops.
   */
  position?: string;
}

const DESKTOP_QUERY = "(min-width: 768px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function HeroVideo({
  poster,
  mp4,
  webm,
  position = "center",
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Whether the video should be loaded at all (desktop + motion allowed).
  const [enabled, setEnabled] = useState(false);
  // Whether the video has become playable, and should fade in.
  const [loaded, setLoaded] = useState(false);

  // Decide whether to load the video, and keep the decision live.
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY);

    const evaluate = () => setEnabled(desktop.matches && !reduced.matches);
    evaluate();

    desktop.addEventListener("change", evaluate);
    reduced.addEventListener("change", evaluate);
    return () => {
      desktop.removeEventListener("change", evaluate);
      reduced.removeEventListener("change", evaluate);
    };
  }, []);

  // Wire up load/playback once the video is actually mounted.
  useEffect(() => {
    if (!enabled) {
      setLoaded(false);
      return;
    }
    const video = videoRef.current;
    if (!video) return;

    // Guarantee muted before any play attempt. React does not reliably render
    // the `muted` attribute, and un-muted autoplay is blocked everywhere.
    video.muted = true;
    video.defaultMuted = true;

    // Fade in only once frames are genuinely advancing. `timeupdate` is the
    // reliable signal for that — unlike `playing`, it cannot be missed by a
    // late-attached listener, and unlike `canplaythrough` it never fades in a
    // paused, frozen frame. If autoplay is blocked, the poster simply stays,
    // which is the correct fallback.
    const reveal = () => setLoaded(true);
    const onTimeUpdate = () => {
      if (video.currentTime > 0) {
        reveal();
        video.removeEventListener("timeupdate", onTimeUpdate);
      }
    };

    const attemptPlay = () => {
      const result = video.play();
      if (result) result.catch(() => undefined);
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("playing", reveal);
    video.addEventListener("loadeddata", attemptPlay);
    video.addEventListener("canplay", attemptPlay);
    attemptPlay();
    // If playback was already running before listeners attached, reflect it now.
    if (!video.paused && video.currentTime > 0) reveal();

    // Last resort: if autoplay was refused, the first user interaction is a
    // valid gesture to start playback. One-shot, and cleaned up either way.
    const onFirstGesture = () => attemptPlay();
    const gestureOpts: AddEventListenerOptions = { once: true, passive: true };
    window.addEventListener("pointerdown", onFirstGesture, gestureOpts);
    window.addEventListener("touchstart", onFirstGesture, gestureOpts);
    window.addEventListener("keydown", onFirstGesture, { once: true });

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("playing", reveal);
      video.removeEventListener("loadeddata", attemptPlay);
      video.removeEventListener("canplay", attemptPlay);
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("touchstart", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
    };
  }, [enabled]);

  return (
    <div className="hero-video" aria-hidden="true">
      {/* Poster: painted immediately, high priority, zero JS dependency. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-video__poster"
        src={poster}
        alt=""
        decoding="async"
        fetchPriority="high"
        style={{ objectPosition: position }}
      />

      {enabled && (
        <video
          ref={videoRef}
          className={`hero-video__el${loaded ? " is-loaded" : ""}`}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          style={{ objectPosition: position }}
        >
          {webm ? <source src={webm} type="video/webm" /> : null}
          <source src={mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
