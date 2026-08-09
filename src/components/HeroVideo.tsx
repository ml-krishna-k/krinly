"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HeroVideo — a background video that never costs the page more than it should.
 *
 * Behaviour:
 *  - The poster paints immediately as a plain <img> (no JS, no layout shift).
 *  - The <video> mounts on every screen, but chooses a source by viewport: a
 *    light, small mobile encode below the tablet breakpoint, the full-quality
 *    source above it. Mobile therefore gets motion without the desktop payload.
 *  - preload="metadata" keeps the initial request tiny; the video fades in only
 *    once frames are genuinely advancing (timeupdate), so a blocked autoplay
 *    never leaves a frozen frame — the poster stays instead.
 *  - Every listener is cleaned up; the media-query listener is live, so rotating
 *    or resizing across the breakpoint re-picks the right source.
 *
 * It is purely decorative, so the whole thing is aria-hidden and not focusable.
 */

export interface HeroVideoProps {
  /** Poster image shown immediately and as the video's own poster attribute. */
  poster: string;
  /** Full-quality MP4 source (H.264) — the universal desktop fallback. */
  mp4: string;
  /** Optional full-quality WebM source (VP9) — preferred on desktop. */
  webm?: string;
  /** Optional light MP4 for mobile (< 768px). Falls back to `mp4` if absent. */
  mobileMp4?: string;
  /** Optional light WebM for mobile (< 768px). Falls back to `webm` if absent. */
  mobileWebm?: string;
  /**
   * CSS object-position for both poster and video, e.g. "center" or
   * "right center". Lets a subject be kept in frame when cover crops.
   */
  position?: string;
}

const DESKTOP_QUERY = "(min-width: 768px)";

export function HeroVideo({
  poster,
  mp4,
  webm,
  mobileMp4,
  mobileWebm,
  position = "center",
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // The video only renders once the viewport has been measured client-side, so
  // the correct (light mobile vs full desktop) source is chosen before load.
  const [ready, setReady] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  // Whether frames are advancing, and the video should fade in over the poster.
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const evaluate = () => {
      setIsDesktop(mq.matches);
      setReady(true);
    };
    evaluate();
    mq.addEventListener("change", evaluate);
    return () => mq.removeEventListener("change", evaluate);
  }, []);

  // Pick sources by viewport. On mobile, WebM is only used if a light mobile
  // WebM was supplied — it must never fall back to the heavy desktop WebM. The
  // MP4 (small mobile encode) is the universal mobile path.
  const webmSrc = isDesktop ? webm : mobileWebm;
  const mp4Src = isDesktop ? mp4 : (mobileMp4 ?? mp4);

  // Wire up playback. Re-runs when the source set changes (the <video> is keyed
  // on viewport, so it remounts and this effect re-attaches to the new element).
  useEffect(() => {
    if (!ready) return;
    setLoaded(false); // new source: wait until it actually plays to fade in
    const video = videoRef.current;
    if (!video) return;

    // Guarantee muted before any play attempt — un-muted autoplay is blocked
    // everywhere, and React does not reliably render the `muted` attribute.
    video.muted = true;
    video.defaultMuted = true;

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
    if (!video.paused && video.currentTime > 0) reveal();

    // Last resort: if autoplay was refused, the first user interaction is a
    // valid gesture to start playback. One-shot, cleaned up either way.
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
  }, [ready, isDesktop]);

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

      {ready && (
        <video
          key={isDesktop ? "desktop" : "mobile"}
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
          {webmSrc ? <source src={webmSrc} type="video/webm" /> : null}
          <source src={mp4Src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
