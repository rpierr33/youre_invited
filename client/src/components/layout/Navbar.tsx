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

  const textClass = 'text-charcoal'

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 bg-white/95 backdrop-blur-sm ${
        scrolled ? 'border-b border-border' : ''
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[76px]">
            {/* Logo */}
            <Link to="/">
              <span className={`font-cormorant text-[1.625rem] font-medium tracking-[0.04em] transition-colors duration-300 ${textClass}`}>
                You're Invited
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-body text-[0.8125rem] tracking-[0.04em] transition-all duration-300 relative group ${
                    location.pathname === link.to
                      ? 'text-gold'
                      : `${textClass} hover:opacity-70`
                  }`}
                >
                  {link.label}
                  {location.pathname === link.to && (
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gold" />
                  )}
                </Link>
              ))}
              <Link
                to="/contact"
                className="ml-2 font-body text-[0.75rem] tracking-[0.1em] uppercase bg-gold text-white px-5 py-2 hover:bg-gold-dark transition-colors duration-300"
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
                  className={`block w-5 h-[1.5px] bg-charcoal origin-center`}
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className={`block w-5 h-[1.5px] bg-charcoal`}
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className={`block w-5 h-[1.5px] bg-charcoal origin-center`}
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
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-7 right-6 text-charcoal"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

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
                      location.pathname === link.to ? 'text-gold' : 'text-charcoal'
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
                  className="font-body text-[0.75rem] tracking-[0.1em] uppercase bg-gold text-white px-8 py-3 hover:bg-gold-dark transition-colors"
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
