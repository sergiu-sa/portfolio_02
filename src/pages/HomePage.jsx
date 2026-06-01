import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Chrome from '../components/Chrome.jsx';
import Hero from '../components/Hero.jsx';
import SubjectBrief from '../components/SubjectBrief.jsx';
import EvidenceBand from '../components/EvidenceBand.jsx';
import BroadcastIntercept from '../components/BroadcastIntercept.jsx';
import CustodyFooter from '../components/CustodyFooter.jsx';
import { MottoStrip } from '../components/Motto.jsx';
import { evidence } from '../data.js';
import { useParallax } from '../hooks/useParallax.js';

gsap.registerPlugin(ScrollTrigger);

const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function HomePage() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const [scanning, setScanning] = useState(!REDUCED);
  const [status, setStatus] = useState(REDUCED ? 'DECLASSIFIED' : 'SCANNING');

  useParallax(heroRef);

  useLayoutEffect(() => {
    if (REDUCED) return;
    const hero = heroRef.current;
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            setScanning(false);
            setStatus('DECLASSIFIED');
          },
        })
        .set(hero, { '--scan': 0, '--beam': 0 })
        .to(hero, { '--beam': 1, duration: 0.25, ease: 'power1.out' })
        .to(hero, { '--scan': 1, duration: 1.9, ease: 'power2.inOut' }, '<')
        .to(hero, { '--beam': 0, duration: 0.35, ease: 'power1.in' }, '-=0.35');

      gsap.utils.toArray('[data-develop]').forEach((el) => {
        gsap.from(el, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        });
      });

      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 30,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Chrome status={status} />
      <main ref={rootRef} className="stage">
        <div className="deck">
          <div
            ref={heroRef}
            className="folder sheet--hero"
            style={{ '--scan': scanning ? 0 : 1 }}
          >
            <div className="folder__tab">
              <div className="folder__tab-face">
                <span className="folder__tab-dot" aria-hidden="true" />
                CASE FILE · 023-001
              </div>
            </div>
            <section className="sheet">
              <Hero />
            </section>
            {scanning && <div className="develop-veil" aria-hidden="true" />}
            {scanning && <div className="scan-beam" aria-hidden="true" />}
          </div>

          <section className="sheet" data-reveal>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <span className="kicker kicker--lead">RECORD</span>
              <SubjectBrief />
            </div>
          </section>

          <MottoStrip />

          <section className="sheet" data-reveal>
            <div
              className="evidence-head"
              style={{ marginBottom: 'clamp(14px,3vh,28px)' }}
            >
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
              >
                <span className="kicker kicker--lead">PROJECTS</span>
                <h2 className="section-title">Evidence on File</h2>
              </div>
              <Link to="/ledger" className="btn btn--ghost">
                OPEN FULL LEDGER <span className="arrow">→</span>
              </Link>
            </div>
            {evidence.map((item, i) => (
              <EvidenceBand
                key={item.ref}
                item={item}
                index={i}
                side={i % 2 === 1 ? 'right' : 'left'}
                featured={!!item.featured}
              />
            ))}
          </section>

          <BroadcastIntercept />

          <section className="sheet req-teaser" data-reveal>
            <div>
              <div className="kicker kicker--lead">CONTACT</div>
              <h2 className="req-teaser__title">File a Request</h2>
              <p className="req-teaser__sub">
                Freelance Full Time Collaboration
              </p>
            </div>
            <Link className="btn btn--ghost" to="/request">
              FILE A REQUEST <span className="arrow">→</span>
            </Link>
          </section>

          <section className="sheet" data-reveal>
            <CustodyFooter stamp="EXAMINED" />
          </section>
        </div>
      </main>
    </>
  );
}
