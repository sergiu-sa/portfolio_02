const LEAD = 'IN CODE WE TRUST';
const TAIL = 'EVERYTHING ELSE WE INSPECT';

export function Motto({ short = false, className = '' }) {
  if (short) return <span className={`motto ${className}`}>{LEAD}</span>;
  return (
    <span className={`motto ${className}`}>
      {LEAD}
      <span className="motto__dash">—</span>
      {TAIL}
    </span>
  );
}

export function MottoStrip({ short = false }) {
  return (
    <div className="motto-strip">
      <Motto short={short} />
    </div>
  );
}
