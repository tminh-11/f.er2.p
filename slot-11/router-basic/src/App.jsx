import { Route, Routes } from 'react-router-dom'
import AppNavbar from './components/AppNavbar.jsx'
import ContactPage from './components/ContactPage.jsx'
import HomePage from './components/HomePage.jsx'
import NotFoundPage from './components/NotFoundPage.jsx'
import ProjectsPage from './components/ProjectsPage.jsx'
import SkillsPage from './components/SkillsPage.jsx'
import './App.css'

function App() {
  return (
    <>
      <AppNavbar />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
