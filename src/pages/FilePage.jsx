import { useParams } from 'react-router-dom'
import ShellSkeleton from '../components/_ShellSkeleton.jsx'

export default function FilePage() {
  const { id } = useParams()
  return (
    <ShellSkeleton
      kicker="FBFE // EVIDENCE FILE"
      title={`EVIDENCE FILE · ${(id || '').toUpperCase()}`}
      note="Shell skeleton. Header actions (COPY CASE REF / VISIT SITE / SOURCE DOCUMENTS), annotated plate, report, and AMENDMENTS land in Phase 05."
      status="EVIDENCE"
      chromeRight={`EXHIBIT ${(id || '').toUpperCase()}`}
    />
  )
}
