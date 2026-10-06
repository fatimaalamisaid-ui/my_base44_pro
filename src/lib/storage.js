import { useCallback, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'horizon:favourites'
const INQUIRY_KEY = 'horizon:inquiries'

function readIds() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Saved-property state, persisted to localStorage so a favourite survives
 * reloads. Swap the read/write helpers for API calls to connect a real backend.
 */
export function useFavourites() {
  const [ids, setIds] = useState(() => (typeof window === 'undefined' ? [] : readIds()))

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      /* storage unavailable — favourites stay in memory for this session */
    }
  }, [ids])

  const toggle = useCallback((id) => {
    setIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }, [])

  const isFavourite = useCallback((id) => ids.includes(id), [ids])

  return useMemo(() => ({ ids, count: ids.length, toggle, isFavourite }), [ids, toggle, isFavourite])
}

/** Persist a lead captured by a contact / viewing form. Stand-in for an API call. */
export function saveInquiry(inquiry) {
  try {
    const raw = window.localStorage.getItem(INQUIRY_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    const list = Array.isArray(parsed) ? parsed : []
    window.localStorage.setItem(INQUIRY_KEY, JSON.stringify([...list, { ...inquiry, createdAt: new Date().toISOString() }]))
  } catch {
    /* non-blocking: the confirmation still shows */
  }
}
