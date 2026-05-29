import { Link } from 'react-router-dom'
import Chrome from './Chrome.jsx'
import { MottoStrip } from './Motto.jsx'

// TEMPORARY shell scaffold for Phase 02. Renders the stage → deck → sheet
// layout with a placeholder sheet, motto strip, and temporary nav so routing
// and the SPA deploy stay testable. Real page content (Hero, EvidenceBand,
// SubjectRecord, FilePage body…) replaces this in Phases 04–06.
// REMOVE this component and its imports once those land.
export default function ShellSkeleton({ kicker, title, note, status, chromeRight, children }) {
  return (
    <>
      <Chrome status={status} right={chromeRight} />
      <main className="stage">
        <div className="deck">
          <section className="sheet">
            <p className="kicker">{kicker}</p>
            <h1 className="skeleton-title">{title}</h1>
            <hr className="rule" />
            <p className="skeleton-note">{note}</p>

            {/* TEMP — navigation placeholder, removed when content links exist */}
            <nav className="shell-nav" aria-label="Temporary route nav">
              <Link to="/">CASE FILE INDEX</Link>
              <Link to="/record">SUBJECT RECORD</Link>
              <Link to="/file/atlas">EVIDENCE FILE · ATLAS</Link>
            </nav>
          </section>

          {children}

          <MottoStrip />
        </div>
      </main>
    </>
  )
}
