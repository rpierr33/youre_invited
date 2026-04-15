import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/invitations', label: 'Invitations' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 bg-sage backdrop-blur-sm ${
        scrolled ? 'border-b border-sage-dark/30' : ''
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[76px]">
            {/* Logo */}
            <Link to="/">
              <img
                src="/logo/logo-nav.png"
                alt="You're Invited Events"
                className="h-[4.5rem] w-auto mix-blend-screen"
                style={{ filter: 'invert(1) sepia(0.3)' }}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-body text-[0.8125rem] tracking-[0.04em] transition-all duration-300 relative group ${
                    location.pathname === link.to
                      ? 'text-white font-semibold'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.to && (
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white" />
                  )}
                </Link>
              ))}
              <Link
                to="/contact"
                className="ml-2 font-body text-[0.75rem] tracking-[0.1em] uppercase bg-white text-sage px-5 py-2 hover:bg-light-warm transition-colors duration-300"
              >
                Plan Your Event
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-[5px]">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className={`block w-5 h-[1.5px] bg-white origin-center`}
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className={`block w-5 h-[1.5px] bg-white`}
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className={`block w-5 h-[1.5px] bg-white origin-center`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-sage flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-7 right-6 text-white"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <img
              src="/logo/logo-nav.png"
              alt="You're Invited Events"
              className="h-20 w-auto mb-6"
              style={{ filter: 'brightness(0) invert(1) sepia(0.3)' }}
            />

            <div className="flex flex-col items-center gap-7">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.to}
                    className={`font-cormorant text-2xl font-light ${
                      location.pathname === link.to ? 'text-white font-semibold' : 'text-white/80'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-2"
              >
                <Link
                  to="/contact"
                  className="font-body text-[0.75rem] tracking-[0.1em] uppercase bg-white text-sage px-8 py-3 hover:bg-light-warm transition-colors"
                >
                  Plan Your Event
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
