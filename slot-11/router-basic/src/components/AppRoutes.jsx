import { Navigate, Route, Routes } from 'react-router-dom'
import ContactPage from './ContactPage.jsx'
import CourseDetailPage from './CourseDetailPage.jsx'
import CourseListPage from './CourseListPage.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import ProjectsPage from './ProjectsPage.jsx'
import SkillsPage from './SkillsPage.jsx'
import BookListPage from './BookListPage.jsx'
import FaqPage from './FaqPage.jsx'
import HelpLayout from './HelpLayout.jsx'
import LibraryHomePage from './LibraryHomePage.jsx'
import MainLayout from './MainLayout.jsx'
import RulesPage from './RulesPage.jsx'
import HomePage from './HomePage.jsx'
import EventPage from './EventPage.jsx'
import RegisterPage from './RegisterPage.jsx'
import SuccessPage from './SuccessPage.jsx'
import '../App.css'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<EventPage />} />
        <Route path="library" element={<LibraryHomePage />} />
        <Route path="books" element={<BookListPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="success" element={<SuccessPage />} />
        <Route path="portfolio" element={<HomePage />} />
        <Route path="help" element={<HelpLayout />}>
          <Route index element={<Navigate to="faq" replace />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="rules" element={<RulesPage />} />
        </Route>
        <Route path="skills" element={<SkillsPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="courses" element={<CourseListPage />} />
        <Route path="courses/:code" element={<CourseDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
