import ShellSkeleton from '../components/_ShellSkeleton.jsx'
import PrimitivesGallery from '../components/_PrimitivesGallery.jsx'

export default function HomePage() {
  return (
    <ShellSkeleton
      kicker="FED // CASE FILE INDEX"
      title="CASE FILE INDEX"
      note="Shell skeleton. Hero, subject brief, and the three evidence bands land in Phase 04."
      status="DECLASSIFIED"
      chromeRight="CASE 2026-001"
    >
      {/* TEMP — Phase 03 primitives preview; removed in Phase 04 */}
      <PrimitivesGallery />
    </ShellSkeleton>
  )
}
