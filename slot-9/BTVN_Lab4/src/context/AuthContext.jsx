import { useState } from 'react'
import { AuthContext } from './contexts'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  function login(email) {
    setUser({
      email,
      name: email.split('@')[0],
    })
  }

  function logout() {
    setUser(null)
  }

  const isLoggedIn = user !== null

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
