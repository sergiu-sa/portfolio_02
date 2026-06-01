import { Link } from 'react-router-dom';
import { Redacted } from './primitives.jsx';

// Black out the phrases listed in item.redact wherever they appear in the summary
function redactSummary(text, phrases) {
  if (!phrases || phrases.length === 0) return text;
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(${escaped.join('|')})`, 'g');
  return text
    .split(re)
    .map((part, i) =>
      phrases.includes(part) ? <Redacted key={i}>{part}</Redacted> : part,
    );
}

export default function EvidenceBand({ item, index, side, featured }) {
  const num = String(index + 1).padStart(2, '0');
  const to = `/file/${item.id}`;
  return (
    <article className={`ev-band ${side === 'right' ? 'ev-band--right' : ''}`}>
      <span className="ev-ghost" aria-hidden="true">
        {num}
      </span>

      <div className="ev-band__media">
        <Link
          to={to}
          className="ev-photo"
          data-inspect
          data-develop
          aria-label={`Open file ${item.ref} — ${item.codename}`}
        >
          <span className="scanlabel">SURVEILLANCE · {item.ref}</span>
          {item.heroImg ? (
            <img
              src={item.heroImg}
              alt={`${item.codename} — ${item.project} screenshot`}
              loading="lazy"
            />
          ) : (
            <span className="stencil">{item.codename}</span>
          )}
        </Link>
      </div>

      <div className="ev-band__body">
        <div className="ev-band__ref">
          <span className="ref">{item.ref}</span>
          <span>{featured ? 'EXHIBIT · ★ FLAGSHIP' : 'EXHIBIT'}</span>
        </div>
        <div className="ev-band__code">{item.codename}</div>
        <div className="ev-band__proj">{item.project}</div>
        <p className="ev-band__sum">
          {redactSummary(item.summary, item.redact)}
        </p>
        <div className="ev-band__tags">
          {item.tags.map((t) => (
            <span className="chip" key={t}>
              {t}
            </span>
          ))}
        </div>
        <Link className="btn" to={to}>
          OPEN FILE <span className="arrow">→</span>
        </Link>
      </div>
    </article>
  );
}
