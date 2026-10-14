import { NavLink } from 'react-router-dom'

const pages = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'New', path: '/new' },
  { label: 'Contact', path: '/contact' },
]

function Navbar() {
  return (
    <nav className="navbar navbar-expand site-navbar">
      <div className="container">
        <div className="navbar-nav">
          {pages.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
              end={path === '/'}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
