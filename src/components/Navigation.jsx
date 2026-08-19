import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navigation({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const fn = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false) }
    if (open) document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [open])

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isActive = (to) => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        open ? 'shadow-lg shadow-black/5' : scrolled ? 'glass shadow-lg shadow-black/5' : 'bg-transparent'
      }`}
      style={{ background: open ? 'var(--bg)' : undefined }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12" ref={menuRef}>
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src="/images/nailbar_logo.png"
              alt="The Nail Bar UG"
              className="h-9 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <span className="hidden sm:block font-display text-xl tracking-wide" style={{ color: 'var(--text-1)' }}>
              The Nail Bar <em className="not-italic text-gradient">UG</em>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-200 ${
                  isActive(to) ? 'active' : ''
                }`}
                style={{ color: isActive(to) ? 'var(--accent)' : 'var(--text-2)' }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Dark mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-accent/10"
              style={{ color: 'var(--text-2)' }}
            >
              {darkMode ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M6.05 17.95l-1.414 1.414M18.364 18.364l-1.414-1.414M6.05 6.05 4.636 7.464M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998z" />
                </svg>
              )}
            </button>

            {/* Book CTA */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              Book Now
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden relative z-10 w-9 h-9 flex flex-col justify-center items-center gap-1.5 rounded-full"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              aria-expanded={open}
            >
              <span className={`block h-px w-5 bg-current transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[3.5px]' : ''}`} style={{ color: 'var(--text-1)' }} />
              <span className={`block h-px bg-current transition-all duration-300 ${open ? 'w-0 opacity-0' : 'w-4 opacity-100'}`} style={{ color: 'var(--text-1)' }} />
              <span className={`block h-px w-5 bg-current transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[3.5px]' : ''}`} style={{ color: 'var(--text-1)' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <div
        aria-hidden={!open}
        className={`md:hidden fixed inset-x-0 top-20 bottom-0 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'var(--bg)' }}
      >
        <div className="h-full flex flex-col items-center justify-center gap-3 px-6 pb-20">
          {links.map(({ to, label }, i) => (
            <Link
              key={to}
              to={to}
              className={`font-display text-4xl transition-all duration-500 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{
                color: isActive(to) ? 'var(--accent)' : 'var(--text-1)',
                transitionDelay: open ? `${i * 60}ms` : '0ms',
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/contact"
            className={`mt-6 px-8 py-4 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-500 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{
              background: 'var(--accent)',
              color: '#fff',
              transitionDelay: open ? `${links.length * 60}ms` : '0ms',
            }}
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  )
}
