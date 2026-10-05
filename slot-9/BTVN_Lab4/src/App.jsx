import Layout from './components/Layout'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import HomeContent from './pages/HomeContent'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout>
          <HomeContent />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
