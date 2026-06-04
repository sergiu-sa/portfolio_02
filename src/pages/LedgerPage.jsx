import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Chrome from '../components/Chrome.jsx';
import CustodyFooter from '../components/CustodyFooter.jsx';
import { MottoStrip } from '../components/Motto.jsx';
import { allEvidence } from '../data.js';

gsap.registerPlugin(ScrollTrigger);

const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const pad = (n) => String(n).padStart(2, '0');

export default function LedgerPage() {
  const rootRef = useRef(null);
  const total = allEvidence.length;

  useLayoutEffect(() => {
    if (REDUCED) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 28,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
      gsap.from('.roll-card, .roll-end', {
        y: 22,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.roll', start: 'top 84%', once: true },
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Chrome status="CASE LEDGER" right={`ALL EXHIBITS · ${pad(total)}`} />
      <main ref={rootRef} className="stage">
        <div className="deck">
          <section className="sheet" data-reveal>
            <Link to="/" className="backlink">
              ← RETURN HOME
            </Link>
            <h1 className="ledger-title">Case Ledger</h1>
            <p className="ledger-hero__sub">
              Every exhibit on file, filed in order. Open any record to read the
              full case.
            </p>
          </section>

          <MottoStrip />

          <section className="sheet">
            <div className="plate-head">
              <h2 className="section-title">Full Roll</h2>
              <span className="kicker">{pad(total)} EXHIBITS ON FILE</span>
            </div>
            <ul className="roll">
              {allEvidence.map((ev) => (
                <li className="roll-item" key={ev.id}>
                  <Link
                    to={`/file/${ev.id}`}
                    className="roll-card"
                    data-inspect
                    aria-label={`Open file ${ev.ref} ${ev.codename}, ${ev.project}, ${ev.status}`}
                  >
                    <span className="roll-card__frame">
                      <img
                        src={ev.plateImg || ev.heroImg}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="roll-card__tag">
                        EXHIBIT {ev.ref}
                        {ev.featured ? ' · ★' : ''}
                      </span>
                      <span
                        className={`roll-card__status ${ev.status === 'LIVE' ? 'is-live' : ''}`}
                      >
                        {ev.status}
                      </span>
                    </span>
                    <span className="roll-card__code">{ev.codename}</span>
                    <span className="roll-card__proj">
                      {ev.project} · {ev.year}
                    </span>
                  </Link>
                </li>
              ))}

              <li className="roll-end" aria-hidden="true">
                <span className="roll-end__frame">
                  <img
                    className="roll-end__art"
                    src="/assets/scribble/duck.svg"
                    alt=""
                    loading="lazy"
                  />
                  <span className="roll-card__tag">UNIDENTIFIED</span>
                </span>
                <span className="roll-end__code">End of File</span>
                <span className="roll-end__sub">
                  No further exhibits on record
                </span>
              </li>
            </ul>
          </section>

          <div className="sheet" data-reveal>
            <CustodyFooter stamp="FILED" />
          </div>
        </div>
      </main>
    </>
  );
}
