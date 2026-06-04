import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Chrome from '../components/Chrome.jsx';
import SubjectRecord from '../components/SubjectRecord.jsx';
import AgentId from '../components/AgentId.jsx';
import Fingerprints from '../components/Fingerprints.jsx';
import PhotoArray from '../components/PhotoArray.jsx';
import CustodyFooter from '../components/CustodyFooter.jsx';
import {
  Annotation,
  Redacted,
  DeclassifyProvider,
  DeclassifyControl,
  DisclosureStamp,
} from '../components/primitives.jsx';
import { MottoStrip } from '../components/Motto.jsx';
import {
  bureau,
  subjectName,
  subjectStatement,
  favs,
  skills,
  skillsNote,
  likes,
  dislikes,
  dislikesNote,
} from '../data.js';

gsap.registerPlugin(ScrollTrigger);

const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Meter({ n }) {
  return (
    <span className="meter" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < n ? 'on' : ''} />
      ))}
    </span>
  );
}

export default function RecordPage() {
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
      <Chrome status="SUBJECT RECORD" />
      <DeclassifyProvider>
        <main className="deck">
          {/* header */}
          <section className="sheet" data-reveal>
            <Link to="/" className="backlink">
              ← RETURN HOME
            </Link>
            <div className="hero-top">
              <div>
                <div className="hero-kicker">
                  FULL DOSSIER · CASE {bureau.fileNumber}
                </div>
                <h1 className="file-code">
                  Subject
                  <br />
                  Record
                </h1>
                <div className="case-code" style={{ marginTop: 8 }}>
                  <span className="subject-name">{subjectName.full}</span> ·
                  FRONT-END DEVELOPER
                </div>
              </div>
              <div className="hero-id-pin">
                <AgentId />
              </div>
            </div>
            <div
              style={{
                marginTop: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              <DisclosureStamp />
            </div>
            <div style={{ marginTop: 16 }}>
              <DeclassifyControl />
            </div>
          </section>

          {/* particulars + portrait */}
          <section className="sheet" data-reveal>
            <div className="evidence-head" style={{ marginBottom: 4 }}>
              <h2 className="section-title">Particulars</h2>
              <span className="kicker">SUBJECT ON FILE</span>
            </div>
            <SubjectRecord />
          </section>

          {/* capabilities */}
          <section className="sheet" data-reveal>
            <div className="evidence-head" style={{ marginBottom: 18 }}>
              <h2 className="section-title">Capabilities</h2>
              <span className="kicker">PROFICIENCY ON FILE</span>
            </div>
            <p className="section-note">{skillsNote}</p>
            <div className="skill-list">
              {skills.map((s) => (
                <div className="skill-row" key={s.name}>
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-level">{s.level}</span>
                  <Meter n={s.n} />
                </div>
              ))}
            </div>
          </section>

          <MottoStrip />

          {/* off the record — statement, favourites, likes/dislikes */}
          <section className="sheet" data-reveal>
            <div className="evidence-head" style={{ marginBottom: 18 }}>
              <h2 className="section-title">Off the Record</h2>
              <span className="kicker">DISPOSITION · OFF DUTY</span>
            </div>

            <div className="kicker" style={{ marginBottom: 14 }}>
              STANDARD ISSUE
            </div>
            <div className="favs">
              <div className="fav-block">
                <b>Inspiration</b>
                <ul>
                  {favs.sites.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div className="fav-block">
                <b>Editor</b>
                <p>{favs.editor}</p>
              </div>
              <div className="fav-block">
                <b>Off the clock</b>
                <p>{favs.casual}</p>
              </div>
            </div>

            <hr
              className="rule-soft"
              style={{ margin: 'clamp(24px, 4vh, 40px) 0' }}
            />
            <div className="statement">
              {subjectStatement.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <hr
              className="rule-soft"
              style={{ margin: 'clamp(24px, 4vh, 40px) 0' }}
            />
            <div className="lists">
              <div className="list-col">
                <h3>Likes</h3>
                <ul>
                  {likes.map((x, i) => (
                    <li key={x}>{i === 1 ? <Redacted>{x}</Redacted> : x}</li>
                  ))}
                </ul>
              </div>
              <div className="list-col neg">
                <h3 className="neg">Dislikes</h3>
                <ul>
                  {dislikes.map((x, i) => (
                    <li key={x}>
                      {i === 0 ? (
                        <Redacted variant="strike">{x}</Redacted>
                      ) : i === dislikes.length - 1 ? (
                        <Redacted>{x}</Redacted>
                      ) : (
                        x
                      )}
                    </li>
                  ))}
                </ul>
                <Annotation style={{ marginTop: 14, display: 'block' }}>
                  {dislikesNote}
                </Annotation>
              </div>
            </div>
          </section>

          {/* fingertips + surveillance gallery */}
          <section className="sheet" data-reveal>
            <div className="evidence-head" style={{ marginBottom: 18 }}>
              <h2 className="section-title">Fingertips &amp; Surveillance</h2>
              <span className="kicker">TEN-PRINT · PHOTO ARRAY</span>
            </div>
            <Fingerprints />
            <div className="kicker" style={{ margin: '26px 0 10px' }}>
              SURVEILLANCE · PHOTO ARRAY · 7 ON FILE
            </div>
            <PhotoArray />
          </section>

          <div className="sheet" data-reveal>
            <CustodyFooter stamp="CERTIFIED" />
          </div>
        </main>
      </DeclassifyProvider>
    </div>
  );
}
