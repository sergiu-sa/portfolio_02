import { useParams } from 'react-router-dom'
import ShellSkeleton from '../components/_ShellSkeleton.jsx'

export default function FilePage() {
  const { id } = useParams()
  return (
    <ShellSkeleton
      kicker="FED // EVIDENCE FILE"
      title={`EVIDENCE FILE · ${(id || '').toUpperCase()}`}
      note="Header actions (COPY CASE REF / VISIT SITE / SOURCE DOCUMENTS), the annotated plate, report, and AMENDMENTS are in preparation."
      status="EVIDENCE"
      chromeRight={`EXHIBIT ${(id || '').toUpperCase()}`}
    />
  )
}
