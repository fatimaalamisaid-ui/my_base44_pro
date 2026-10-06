import { useEffect, useState } from 'react'

/** Track whether the window has scrolled past a threshold. */
export function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

/** Lock page scrolling while overlays (menus, galleries) are open. */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined
    const { overflow, paddingRight } = document.body.style
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [locked])
}

/** Call a handler when Escape is pressed, while `active` is true. */
export function useEscape(active, handler) {
  useEffect(() => {
    if (!active) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') handler(event)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active, handler])
}

/** Set the document title for the current page. */
export function useDocumentTitle(title) {
  useEffect(() => {
    if (!title) return undefined
    const previous = document.title
    document.title = title
    return () => {
      document.title = previous
    }
  }, [title])
}

/** Track a CSS media query. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const list = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)
    setMatches(list.matches)
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }, [query])

  return matches
}
