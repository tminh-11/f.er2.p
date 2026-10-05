import { useState } from 'react'
import { ThemeContext } from './contexts'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === 'light' ? 'dark' : 'light',
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
