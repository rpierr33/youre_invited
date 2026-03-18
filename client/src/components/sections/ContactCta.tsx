import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export function ContactCta() {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <section ref={ref} className="relative py-24 md:py-28 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/85" />
      </div>

      <div className="relative z-10 max-w-[600px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="gold-rule mx-auto mb-6" />
          <h2 className="font-cormorant text-[2rem] md:text-[2.75rem] font-light text-charcoal leading-[1.2]">
            Ready to create something <span className="italic text-gold">unforgettable</span>?
          </h2>
          <p className="font-body text-warm-gray text-[0.9375rem] leading-relaxed mt-5 mb-9">
            We'd love to hear about your vision. Let's bring it to life together.
          </p>
          <Link
            to="/contact"
            className="inline-block font-body text-[0.75rem] tracking-[0.15em] uppercase bg-gold text-white px-8 py-3.5 hover:bg-gold-dark transition-colors duration-300"
          >
            Start Planning
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
