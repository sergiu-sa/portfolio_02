import { Link } from 'react-router-dom';
import Chrome from './Chrome.jsx';
import { MottoStrip } from './Motto.jsx';

// Placeholder shell for routes whose real content isn't built yet — renders the
// stage → deck → sheet layout with a temporary route nav so routing and the SPA
// deploy stay testable. Remove this component and its imports once every page lands.
export default function ShellSkeleton({
  kicker,
  title,
  note,
  status,
  chromeRight,
}) {
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

            <nav className="shell-nav" aria-label="Temporary route nav">
              <Link to="/">CASE FILE INDEX</Link>
              <Link to="/record">SUBJECT RECORD</Link>
              <Link to="/file/aucto">EVIDENCE FILE · AUCTO</Link>
            </nav>
          </section>

          <MottoStrip />
        </div>
      </main>
    </>
  );
}
