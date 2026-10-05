import Header from './Header'
import { useTheme } from '../context/useTheme'

function Layout({ children }) {
  const { theme } = useTheme()

  return (
    <div
      className="app-layout bg-body text-body min-vh-100"
      data-bs-theme={theme}
    >
      <Header />
      {children}
    </div>
  )
}

export default Layout
