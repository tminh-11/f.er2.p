import { Route, Routes } from 'react-router-dom'
import AppNavbar from './AppNavbar.jsx'
import ContactPage from './ContactPage.jsx'
import CourseDetailPage from './CourseDetailPage.jsx'
import CourseListPage from './CourseListPage.jsx'
import HomePage from './HomePage.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import ProjectsPage from './ProjectsPage.jsx'
import SkillsPage from './SkillsPage.jsx'
import '../App.css'

function AppRoutes() {
  return (
    <>
      <AppNavbar />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/courses" element={<CourseListPage />} />
          <Route path="/courses/:code" element={<CourseDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  )
}

export default AppRoutes
