import { useEffect, useRef, useState } from 'react';
import { wiretap } from '../data.js';

const EMBED = 'https://open.spotify.com/embed/playlist';

// A field recorder loaded with the subject's own reels.
// Spotify is a third party, so the embed stays unmounted until the visitor presses play;
// the deck shows a sealed tape until then.
// Once armed, switching reels swaps the player directly.
export default function Wiretap() {
  const { formNo, profile, reels } = wiretap;
  const [index, setIndex] = useState(0);
  const [armed, setArmed] = useState(false);
  const windowRef = useRef(null);
  const active = reels[index];

  // Arming replaces the button that had focus, so send focus to the player rather than letting it fall back to the top of the document.
  useEffect(() => {
    if (armed) windowRef.current?.focus();
  }, [armed]);

  return (
    <div className="wiretap">
      {/* the deck */}
      <div className="tapedeck">
        <div className="tapedeck__window" ref={windowRef} tabIndex={-1}>
          {armed ? (
            <iframe
              key={active.id}
              className="tapedeck__embed"
              title={`Spotify player — ${active.name}`}
              src={`${EMBED}/${active.id}?utm_source=generator&theme=0`}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          ) : (
            <button
              type="button"
              className="tapedeck__arm"
              data-inspect
              onClick={() => setArmed(true)}
            >
              <span className="tapedeck__seal" aria-hidden="true">
                CLASSIFIED AUDIO
              </span>
              <span className="tapedeck__cue">
                <span className="tapedeck__cue-icon" aria-hidden="true" />
                PRESS PLAY TO DECLASSIFY
              </span>
              <span className="sr-only">
                Load the Spotify player for {active.name}
              </span>
            </button>
          )}
        </div>

        <div className="tapedeck__bezel">
          <span className="tapedeck__brand">{formNo}</span>
          <span className="tapedeck__knobs" aria-hidden="true">
            <i />
            <i />
          </span>
          <span className={`tapedeck__rec ${armed ? 'is-live' : ''}`}>
            <span className="tapedeck__rec-dot" aria-hidden="true" />
            {armed ? 'LIVE' : 'STANDBY'}
          </span>
        </div>
      </div>

      {/* the reel index */}
      <div className="reels">
        <div className="kicker reels__head" id="reels-head">
          SELECT A REEL
        </div>
        <span className="sr-only" role="status" aria-live="polite">
          {armed ? `Now playing reel ${active.ref} — ${active.name}` : ''}
        </span>
        <ul className="reels__list" aria-labelledby="reels-head">
          {reels.map((r, i) => (
            <li key={r.id}>
              <button
                type="button"
                className={`reel ${i === index ? 'is-active' : ''}`}
                data-inspect
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
              >
                <span className="reel__ref">{r.ref}</span>
                <span className="reel__name">{r.name}</span>
                <span className="reel__dot" aria-hidden="true" />
              </button>
              {r.note && <span className="reel__note">{r.note}</span>}
            </li>
          ))}
        </ul>
        <a
          className="reels__link"
          href={profile}
          target="_blank"
          rel="noreferrer"
        >
          FULL WIRETAP FILE <span className="arrow">→</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
