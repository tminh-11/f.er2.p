import about from '../data/about'

export default function AppFooter() {
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container text-center">
        <img
          src={about.logo}
          alt={`${about.appName} logo`}
          width="28"
          height="28"
          className="me-2"
          onError={(event) => { event.currentTarget.style.display = 'none' }}
        />
        <span>{about.copyright}</span>
        <span className="mx-2">|</span>
        <span>{about.version}</span>
        <span className="mx-2">|</span>
        <span>{about.course}</span>
      </div>
    </footer>
  )
}
