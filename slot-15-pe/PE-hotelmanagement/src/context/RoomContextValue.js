import { createContext, useContext } from 'react'

export const RoomContext = createContext(null)

export function useRoom() {
  return useContext(RoomContext)
}
