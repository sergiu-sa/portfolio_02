import { useLayoutEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Chrome from '../components/Chrome.jsx'
import EvidencePlates from '../components/EvidencePlates.jsx'
import Compare from '../components/Compare.jsx'
import CustodyFooter from '../components/CustodyFooter.jsx'
import { Redacted } from '../components/primitives.jsx'
import { evidenceById } from '../data.js'

gsap.registerPlugin(ScrollTrigger)

const REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function Meta({ k, v }) {
  return (
    <div className="metarow">
      <span className="metarow__k">{k}</span>
      <span className="metarow__v">{v}</span>
    </div>
  )
}

export default function FilePage() {
  const { id } = useParams()
  const item = evidenceById[id]
  const rootRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useLayoutEffect(() => {
    if (REDUCED || !item) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-develop]').forEach((el) => {
        gsap.from(el, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        })
      })
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 28,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
      })
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }, rootRef)
    return () => ctx.revert()
  }, [item])

  if (!item) return <Navigate to="/" replace />

  function copyRef() {
    navigator.clipboard
      ?.writeText(window.location.href)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
      })
      .catch(() => {})
  }

  return (
    <div ref={rootRef} className="stage">
      <Chrome status={`FILE ${item.ref} OPEN`} right={`EXHIBIT ${item.ref}`} />
      <main className="deck">
        <section className="sheet" data-reveal>
          <Link to="/" className="backlink">
            ← RETURN HOME
          </Link>
          <div className="file-head__ref">
            <span className="ref">{item.ref}</span>
            <span>
              EXHIBIT{item.featured ? ' · ★ FLAGSHIP' : ''} · {item.year}
            </span>
          </div>
          <h1 className="file-code">{item.codename}</h1>
          <div className="file-proj">
            {item.project} · {item.role}
          </div>

          <div className="file-actions">
            <a className="btn btn--accent" href={item.live} target="_blank" rel="noreferrer">
              VISIT LIVE SITE <span className="arrow">↗</span>
            </a>
            <a className="btn" href={item.repo} target="_blank" rel="noreferrer">
              README <span className="arrow">↗</span>
            </a>
            <button className="btn btn--ghost" onClick={copyRef}>
              {copied ? 'COPIED ✓' : 'COPY CASE REF'} <span className="arrow">⧉</span>
            </button>
          </div>
        </section>

        <section className="sheet" data-reveal>
          <div className="plate-head">
            <span className="section-title">Evidence Plates</span>
            <span className="kicker">
              {item.ref} · {(item.exhibits?.length || 0) + 1} PLATE
              {(item.exhibits?.length || 0) + 1 === 1 ? '' : 'S'} ON FILE
            </span>
          </div>
          <EvidencePlates item={item} exhibits={item.exhibits} />
        </section>

        {item.compare && (
          <section className="sheet" data-reveal>
            <div className="plate-head">
              <span className="section-title">Amendment in Evidence</span>
              <span className="kicker">{item.ref} · BEFORE / AFTER</span>
            </div>
            <Compare {...item.compare} />
          </section>
        )}

        <section className="sheet" data-reveal>
          <div className="report">
            <div className="report__main">
              <span className="section-title">Summary of Findings</span>
              {item.brief.map((p, i) => (
                <p className="report__p" key={i}>
                  {p}
                </p>
              ))}

              <div className="amendment">
                <div className="amendment__tag">AMENDMENTS TO RECORD</div>
                <p className="report__p" style={{ marginTop: 8 }}>
                  {item.amendment}
                </p>
                <a className="doclink" href={item.commit} target="_blank" rel="noreferrer">
                  → VIEW COMMIT (EVIDENCE OF CHANGE)
                </a>
              </div>
            </div>

            <aside className="report__meta">
              <div className="kicker" style={{ marginBottom: 10 }}>
                FILE METADATA
              </div>
              <Meta k="REF" v={item.ref} />
              <Meta k="CODENAME" v={item.codename} />
              <Meta k="PROJECT" v={item.project} />
              <Meta k="YEAR" v={item.year} />
              <Meta k="STATUS" v={item.status} />
              <Meta k="STACK" v={item.tags.join(' · ')} />
              <Meta k="HANDLER" v={<Redacted>AGENT S023</Redacted>} />
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a className="doclink" href={item.live} target="_blank" rel="noreferrer">
                  → LIVE SITE
                </a>
                <a className="doclink" href={item.repo} target="_blank" rel="noreferrer">
                  → README
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section className="sheet" data-reveal>
          <CustodyFooter stamp="ADMITTED" />
        </section>
      </main>
    </div>
  )
}
