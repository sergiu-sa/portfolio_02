import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Chrome from '../components/Chrome.jsx';
import RequestForm from '../components/RequestForm.jsx';
import CustodyFooter from '../components/CustodyFooter.jsx';
import { requestForm } from '../data.js';

gsap.registerPlugin(ScrollTrigger);

const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function RequestPage() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (REDUCED) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 28,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="stage">
      <Chrome status="REQUEST INTAKE" right={requestForm.formNo} />
      <main className="deck">
        <section className="sheet" data-reveal>
          <Link to="/" className="backlink">
            ← RETURN HOME
          </Link>
          <div className="hero-kicker">
            {requestForm.formNo} · CONTACT INTAKE
          </div>
          <h1 className="file-code">
            File a
            <br />
            Request
          </h1>
          <p className="req-intro">
            Open a case with the bureau. Freelance commission, full-time
            position, or a collaboration worth putting on record.
          </p>

          <img
            className="req-skimask"
            src="/assets/scribble/skimask.svg"
            alt=""
            aria-hidden="true"
          />
          <span className="req-skimask__tag" aria-hidden="true">
            UNIDENTIFIED
          </span>

          <div className="direct-lines">
            <div className="direct-lines__head">
              <span className="kicker">DIRECT LINES</span>
              <span className="direct-lines__note">
                BYPASS INTAKE · for routine contact
              </span>
            </div>
            <ul className="direct-lines__list" aria-label="Direct lines">
              {requestForm.channels.map((c) => {
                const external = !c.href.startsWith('mailto:');
                return (
                  <li key={c.code}>
                    <a
                      className="direct-line"
                      href={c.href}
                      data-inspect
                      {...(external
                        ? { target: '_blank', rel: 'noreferrer' }
                        : {})}
                    >
                      <span className="direct-line__code">{c.code}</span>
                      <span className="direct-line__label">{c.label}</span>
                      <span className="direct-line__handle">{c.handle}</span>
                      <span className="direct-line__go" aria-hidden="true">
                        → OPEN
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="sheet" data-reveal>
          <RequestForm />
        </section>

        <section className="sheet" data-reveal>
          <CustodyFooter stamp="LOGGED" />
        </section>
      </main>
    </div>
  );
}
