import { useEffect, useState } from 'react';
import { priorCase } from '../data.js';

const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// A CRT monitor tuned to a prior case
export default function BroadcastIntercept() {
  const { channel, ref, codename, title, year, blurb, url, frames } = priorCase;
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (REDUCED || frames.length < 2) return;
    const id = setInterval(
      () => setFrame((f) => (f + 1) % frames.length),
      3200,
    );
    return () => clearInterval(id);
  }, [frames.length]);

  return (
    <section
      className="sheet intercept"
      data-reveal
      aria-labelledby="intercept-title"
    >
      <div className="intercept__inner">
        {/* the set - CRT monitor */}
        <div className="crt" data-inspect>
          <div className="crt__screen">
            {frames.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={i === 0 ? `${title} — prior case preview` : ''}
                aria-hidden={i !== 0}
                className={`crt__frame ${i === frame ? 'is-on' : ''}`}
                loading="lazy"
              />
            ))}
            <span className="crt__scanlines" aria-hidden="true" />
            <span className="crt__glass" aria-hidden="true" />
            <span className="crt__osd crt__osd--tl" aria-hidden="true">
              <span className="crt__rec" /> REC
            </span>
            <span className="crt__osd crt__osd--tr" aria-hidden="true">
              {channel}
            </span>
            <span className="crt__osd crt__osd--bl" aria-hidden="true">
              PRIOR · {year}
            </span>
            <span className="crt__osd crt__osd--br" aria-hidden="true">
              ▶ PLAY
            </span>
          </div>
          <div className="crt__bezel-label" aria-hidden="true">
            <span className="crt__brand">FED-VISION</span>
            <span className="crt__knobs">
              <i />
              <i />
            </span>
          </div>
        </div>

        {/* the file note */}
        <div className="intercept__note">
          <div className="kicker intercept__kicker">
            <span className="intercept__dot" aria-hidden="true" /> BROADCAST
            INTERCEPT · {ref}
          </div>
          <h2 className="intercept__title" id="intercept-title">
            {title}
          </h2>
          <div className="intercept__code">CODENAME · {codename}</div>
          <p className="intercept__blurb">{blurb}</p>
          <div className="intercept__actions">
            <a className="btn" href={url} target="_blank" rel="noreferrer">
              TUNE IN <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
