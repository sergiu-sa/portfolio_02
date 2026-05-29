// Annotated surveillance plate
// placeholder when no screenshot is on file.
export default function Plate({ item }) {
  return (
    <div className="plate" data-inspect data-develop>
      <span className="plate__scanlabel">SURVEILLANCE · {item.ref}</span>
      {item.plateImg ? (
        <img src={item.plateImg} alt={`${item.codename} — ${item.project} screenshot`} />
      ) : (
        <>
          <span className="plate__stencil">{item.codename}</span>
          <span className="plate__hint">// PLATE PENDING — DROP SCREENSHOT</span>
        </>
      )}
      {item.callouts.map((c) => (
        <span
          className="plate__dot"
          key={c.tag}
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
          aria-hidden="true"
        >
          {c.tag}
        </span>
      ))}
    </div>
  )
}
