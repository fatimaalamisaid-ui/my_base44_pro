import { createContext, useContext } from 'react'
import { useFavourites } from '../lib/storage.js'

const FavouritesContext = createContext(null)

export function FavouritesProvider({ children }) {
  const value = useFavourites()
  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
}

export function useFavouriteState() {
  const context = useContext(FavouritesContext)
  if (!context) throw new Error('useFavouriteState must be used inside FavouritesProvider')
  return context
}
