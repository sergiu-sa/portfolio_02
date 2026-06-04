import { photoArray } from '../data.js';
import Scribble from './Scribble.jsx';
import { RedactBar, Stamp } from './primitives.jsx';

// Overlapping cut-out collage; each face's position, tape and mark is data-driven in `photoArray`.
export default function PhotoArray() {
  return (
    <div
      className="board"
      role="group"
      aria-label="Surveillance photo array — subjects on file"
    >
      {photoArray.map((p, i) => (
        <figure
          className="cutout"
          key={i}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.w}%`,
            '--rot': `${p.rot}deg`,
            zIndex: p.z,
          }}
          data-inspect
        >
          {p.tape === 'top' && (
            <span className="cutout__tape" aria-hidden="true" />
          )}
          {p.tape === 'x' && (
            <span className="cutout__xtape" aria-hidden="true" />
          )}
          <img src={p.src} alt="" aria-hidden="true" loading="lazy" />
          {p.mark?.type === 'scribble' && (
            <Scribble variant={p.mark.variant} className="cutout__mark" />
          )}
          {p.mark?.type === 'crown' && (
            <span className="cutout__crown" aria-hidden="true" />
          )}
          {p.mark?.type === 'redact' && (
            <RedactBar
              id={`array-${i}`}
              style={{
                '--rb-left': '12%',
                '--rb-top': '30%',
                '--rb-w': '76%',
                '--rb-h': '16%',
              }}
            />
          )}
        </figure>
      ))}

      <Stamp rotate={-8} className="board__stamp">
        SURVEILLANCE
      </Stamp>
      <span className="board__ref" aria-hidden="true">
        ARRAY · 7 ON FILE · OSL
      </span>
    </div>
  );
}
