import { useLayoutEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import FilePage from './pages/FilePage.jsx'
import RecordPage from './pages/RecordPage.jsx'
import { initGrain } from './webgl/grain.js'
import { useInspectCursor } from './hooks/useInspectCursor.js'

function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const glRef = useRef(null)
  useInspectCursor()

  useLayoutEffect(() => {
    if (glRef.current) return initGrain(glRef.current)
  }, [])

  return (
    <div className="page">
      <canvas ref={glRef} className="stage-gl" aria-hidden="true" />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/file/:id" element={<FilePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  )
}
