import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import { FavouritesProvider } from './context/FavouritesContext.jsx'
import Home from './pages/Home.jsx'
import Properties from './pages/Properties.jsx'
import PropertyDetail from './pages/PropertyDetail.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Team from './pages/Team.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

/** Start each route at the top, or at the hash target when one is present. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <FavouritesProvider>
      <ScrollToTop />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-navy-950 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:slug" element={<PropertyDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </FavouritesProvider>
  )
}
