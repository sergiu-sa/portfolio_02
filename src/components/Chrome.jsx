export default function Chrome({ status = 'DECLASSIFIED', right = 'CASE 023-001' }) {
  return (
    <div className="chrome">
      <span>FED // FIELD TERMINAL</span>
      <span className="status">
        <span className="dot">●</span>
        {status}
      </span>
      <span>{right}</span>
    </div>
  )
}
