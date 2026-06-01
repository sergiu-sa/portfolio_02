import { useState } from 'react';
import Lightbox from './Lightbox.jsx';

export default function EvidencePlates({ item, exhibits }) {
  const [open, setOpen] = useState(null);
  const plates = [
    { src: item.plateImg, caption: item.caption },
    ...(exhibits || []),
  ].filter((p) => p.src);
  if (!plates.length) return null;

  return (
    <>
      <figure className="plate-lead">
        <button
          type="button"
          className="plate-lead__btn"
          data-inspect
          onClick={() => setOpen(0)}
          aria-label={`Enlarge primary exhibit${item.caption ? `: ${item.caption}` : ''}`}
        >
          <span className="plate plate--lead" data-develop>
            <span className="plate__scanlabel">SURVEILLANCE · {item.ref}</span>
            <img
              src={plates[0].src}
              alt={`${item.codename} — ${item.project} primary plate`}
            />
            <span className="exhibit__zoom" aria-hidden="true">
              ⊕ ENLARGE
            </span>
          </span>
        </button>
        <figcaption className="plate-caption">
          FIG. 1 — {item.caption}
        </figcaption>
      </figure>

      {plates.length > 1 && (
        <div className="contact" data-develop>
          {plates.slice(1).map((p, i) => (
            <figure key={p.src} className="exhibit">
              <button
                type="button"
                className="exhibit__btn"
                data-inspect
                onClick={() => setOpen(i + 1)}
                aria-label={`Enlarge exhibit ${i + 2}${p.caption ? `: ${p.caption}` : ''}`}
              >
                <span className="exhibit__frame">
                  <img
                    src={p.src}
                    alt={p.caption || `Exhibit ${i + 2}`}
                    loading="lazy"
                  />
                  <span className="exhibit__tag">FIG. {i + 2}</span>
                  <span className="exhibit__zoom" aria-hidden="true">
                    ⊕ ENLARGE
                  </span>
                </span>
              </button>
              {p.caption && (
                <figcaption className="exhibit__cap">{p.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      <Lightbox
        items={plates}
        index={open}
        onClose={() => setOpen(null)}
        onIndex={setOpen}
      />
    </>
  );
}
