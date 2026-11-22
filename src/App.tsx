import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AmbientBackground } from './components/layout/AmbientBackground'
import { CustomCursor } from './components/layout/CustomCursor'
import { LoadingScreen } from './components/layout/LoadingScreen'
import { SmoothScrollProvider } from './components/layout/SmoothScrollProvider'
import { Navbar } from './components/nav/Navbar'
import { DemosPage } from './pages/DemosPage'
import { HomePage } from './pages/HomePage'
import { scrollToSection } from './utils/scroll'

/** Vite `base` is `/webnixa/` on GitHub Pages — required for client-side routes. */
const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

function HashScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (pathname === '/' && hash) {
      const id = hash.replace('#', '')
      const t = window.setTimeout(() => scrollToSection(id), 100)
      return () => window.clearTimeout(t)
    }
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <SmoothScrollProvider>
        <AmbientBackground />
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        <HashScroll />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/demos" element={<DemosPage />} />
        </Routes>
      </SmoothScrollProvider>
    </BrowserRouter>
  )
}