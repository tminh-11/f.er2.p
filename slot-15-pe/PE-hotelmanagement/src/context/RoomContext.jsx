import { useReducer, useEffect } from 'react'
import { roomReducer, initialState } from '../reducer/roomReducer'
import { fetchRoomTypes, fetchRooms } from '../api/roomApi'
import { RoomContext } from './RoomContextValue'

export function RoomProvider({ children }) {
  const [state, dispatch] = useReducer(roomReducer, initialState)
  useEffect(() => {
    Promise.allSettled([fetchRoomTypes(), fetchRooms()]).then(([rtResult, roomResult]) => {
      const errors = []
      if (rtResult.status === 'fulfilled') dispatch({ type: 'SET_ROOM_TYPES', payload: rtResult.value })
      else errors.push(rtResult.reason)
      if (roomResult.status === 'fulfilled') dispatch({ type: 'SET_ROOMS', payload: roomResult.value })
      else errors.push(roomResult.reason)
      if (errors.length > 0) {
        dispatch({ type: 'SET_ERROR', payload: errors.map((error) => error?.message || 'Failed to load hotel data.').join(' ') })
      }
      dispatch({ type: 'SET_LOADING', payload: false })
    })
  }, [])
  return <RoomContext.Provider value={{ state, dispatch }}>{children}</RoomContext.Provider>
}
