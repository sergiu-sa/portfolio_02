import { Link } from 'react-router-dom';
import { Barcode, Stamp } from './primitives.jsx';
import { Motto } from './Motto.jsx';
import { bureau } from '../data.js';

const META = [
  ['FILE NO', bureau.fileNumber],
  ['RECORD ID', bureau.recordId],
  ['AGENT', bureau.agent],
  ['STATION', 'OSLO, NO'],
];

export default function CustodyFooter({ stamp = 'EXAMINED' }) {
  return (
    <footer className="custody">
      <hr className="rule-double custody__rule" />

      <div className="custody__grid">
        {/* routing — how to reach the subject */}
        <div className="custody__col">
          <span className="kicker">CHAIN OF CUSTODY</span>
          <nav className="custody__links">
            <a href="mailto:sergiudsarbu@gmail.com">
              → EMAIL · sergiudsarbu@gmail.com
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              → GITHUB
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              → LINKEDIN
            </a>
            <Link to="/request">→ FILE A REQUEST</Link>
            <Link to="/ledger">→ CASE LEDGER</Link>
          </nav>
        </div>

        {/* file record — bureau metadata */}
        <div className="custody__col custody__col--div">
          <span className="kicker">FILE RECORD</span>
          <dl className="custody__meta">
            {META.map(([k, v]) => (
              <div className="custody__metarow" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* authentication — stamp + evidence sticker */}
        <div className="custody__col custody__col--div custody__col--auth">
          <span className="kicker">AUTHENTICATION</span>
          <Stamp rotate={-5} className="custody__stamp">
            {stamp}
          </Stamp>
          <div className="custody__sticker">
            <Barcode value={bureau.caseCode} height={34} showText={false} />
            <div className="barcode-label">{bureau.caseCode}</div>
          </div>
        </div>
      </div>

      <hr className="rule-soft custody__rule" />

      <div className="custody__base">
        <Motto />
        <span className="custody__credit">
          © {new Date().getFullYear()} · oltenkS · FED OSLO STATION
        </span>
      </div>
    </footer>
  );
}
