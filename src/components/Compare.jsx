import { useCallback, useRef, useState } from 'react';

/* AFTER is the base layer; BEFORE sits on top, clipped by the divider.
   `ratio` overrides the default 16/10 track for tall shots; both images
   must share the framing since they overlay. Width follows the height
   guard so a tall track never outgrows the viewport. */
export default function Compare({ before, after, caption, ratio }) {
  const [pct, setPct] = useState(50);
  const trackRef = useRef(null);
  const dragging = useRef(false);

  const setFromX = useCallback((clientX) => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next = ((clientX - r.left) / r.width) * 100;
    setPct(Math.max(0, Math.min(100, next)));
  }, []);

  function onPointerDown(e) {
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromX(e.clientX);
  }
  function onPointerMove(e) {
    if (dragging.current) setFromX(e.clientX);
  }
  function onPointerUp(e) {
    dragging.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  }

  function onKeyDown(e) {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPct((p) => Math.max(0, p - step));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPct((p) => Math.min(100, p + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPct(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPct(100);
    }
  }

  return (
    <figure className="compare">
      <div
        className="compare__track"
        ref={trackRef}
        style={
          ratio
            ? {
                aspectRatio: ratio,
                maxWidth: `calc(min(78vh, 820px) * (${ratio}))`,
                marginInline: 'auto',
              }
            : undefined
        }
        data-inspect
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <img
          className="compare__img"
          src={after.src}
          alt={`${after.label} — rebuilt`}
          draggable="false"
          loading="lazy"
          decoding="async"
        />
        <img
          className="compare__img compare__img--before"
          src={before.src}
          alt={`${before.label} — original`}
          draggable="false"
          loading="lazy"
          decoding="async"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        />

        <span className="compare__label compare__label--l" aria-hidden="true">
          {before.label}
        </span>
        <span className="compare__label compare__label--r" aria-hidden="true">
          {after.label}
        </span>

        <div
          className="compare__divider"
          style={{ left: `${pct}%` }}
          aria-hidden="true"
        />
        <button
          type="button"
          className="compare__handle"
          style={{ left: `${pct}%` }}
          role="slider"
          aria-label="Reveal amended version"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          aria-valuetext={`${Math.round(pct)}% amended`}
          onKeyDown={onKeyDown}
        >
          <span className="compare__chev" aria-hidden="true">
            ‹
          </span>
          <span className="compare__chev" aria-hidden="true">
            ›
          </span>
        </button>
      </div>
      {caption && <figcaption className="compare__cap">{caption}</figcaption>}
    </figure>
  );
}
