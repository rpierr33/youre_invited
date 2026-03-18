import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export function ContactCta() {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <section
      ref={ref}
      className="relative py-24 grain-overlay"
      style={{
        background: 'linear-gradient(135deg, #1B3A4B 0%, #0F2530 50%, #1B3A4B 100%)',
      }}
    >
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="font-script text-3xl text-gold block mb-4">Ready to celebrate?</span>
          <h2 className="font-playfair text-3xl md:text-5xl font-semibold text-white mb-6">
            Let's Create Something Unforgettable
          </h2>
          <p className="font-body text-lg text-white/70 mb-10">
            Whether you're envisioning a sunset ceremony on the beach or a grand gala overlooking
            the Intracoastal, we're here to bring your vision to life.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-gold text-white px-10 py-4 rounded-full font-body font-semibold text-lg uppercase tracking-wider hover:bg-gold-dark transition-colors duration-300"
          >
            Start Planning
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
