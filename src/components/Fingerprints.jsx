import { fingerprints } from '../data.js';

// A rolled print; a stable per-seed rotation/flip/scale keeps the ten cells from looking identical.
function Print({ seed = 0 }) {
  const src = fingerprints[seed % fingerprints.length];
  const rnd = (k) => {
    const x = Math.sin((seed + 1) * 12.9898 + k * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  const rot = (rnd(0) - 0.5) * 16;
  const flip = rnd(1) > 0.5 ? -1 : 1;
  const scale = 0.9 + rnd(2) * 0.12;
  return (
    <img
      className="fp-img"
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      style={{
        transform: `rotate(${rot.toFixed(1)}deg) scale(${scale.toFixed(2)}) scaleX(${flip})`,
      }}
    />
  );
}

const RIGHT = [
  ['RT', 'THUMB'],
  ['R1', 'INDEX'],
  ['R2', 'MIDDLE'],
  ['R3', 'RING'],
  ['R4', 'LITTLE'],
];
const LEFT = [
  ['LT', 'THUMB'],
  ['L1', 'INDEX'],
  ['L2', 'MIDDLE'],
  ['L3', 'RING'],
  ['L4', 'LITTLE'],
];

function Hand({ label, cells, seedBase }) {
  return (
    <div className="fpcard__hand">
      <span className="fpcard__handlabel">{label}</span>
      <div className="fprow">
        {cells.map(([code, finger], i) => (
          <figure className="fpcell" key={code}>
            <div className="fpcell__ink" data-inspect>
              <Print seed={seedBase + i} />
            </div>
            <figcaption className="fpcell__l">
              <b>{code}</b> {finger}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function Fingerprints() {
  return (
    <div className="fpcard">
      <div className="fpcard__head">
        <span className="kicker">SUBJECT · TEN-PRINT</span>
        <span className="fpcard__form">FORM FD-258</span>
      </div>
      <div className="fpstrip">
        <Hand label="RIGHT HAND" cells={RIGHT} seedBase={0} />
        <Hand label="LEFT HAND" cells={LEFT} seedBase={5} />
      </div>
    </div>
  );
}
