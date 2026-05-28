export default function Chrome({ status = 'DECLASSIFIED', right = 'CASE 2026-001' }) {
  return (
    <div className="chrome">
      <span>FBFE // FIELD TERMINAL</span>
      <span className="status">
        <span className="dot">●</span>
        {status}
      </span>
      <span>{right}</span>
    </div>
  )
}
