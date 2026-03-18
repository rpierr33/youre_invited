import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export function AboutSnippet() {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <section ref={ref} className="py-20 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <img
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=700&q=80"
              alt="Elegant wedding venue with tropical floral arrangements"
              className="w-full aspect-[4/5] object-cover"
            />
          </motion.div>

          {/* Right: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="gold-rule mb-6" />
            <h2 className="font-cormorant text-[2rem] md:text-[2.5rem] font-light text-charcoal leading-[1.2] mb-6">
              Where South Florida's <br className="hidden md:block" />
              <span className="italic text-gold">Most Beautiful</span> Moments Begin
            </h2>
            <p className="font-body text-warm-gray text-[0.9375rem] leading-[1.8] mb-5">
              Renowned as one of the most sought-after event planners in South Florida,
              You're Invited brings to life unexpected, imaginative, and uniquely personal
              celebrations for clients across the globe.
            </p>
            <p className="font-body text-warm-gray text-[0.9375rem] leading-[1.8] mb-8">
              With over 15 years rooted in Fort Lauderdale — from sunset ceremonies along the
              Intracoastal to elegant galas on Las Olas Boulevard — we craft events that feel
              as warm and extraordinary as the people at their center.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 font-body text-[0.75rem] tracking-[0.15em] uppercase text-charcoal border-b border-charcoal/30 pb-1 hover:border-gold hover:text-gold transition-all duration-300"
            >
              Meet Our Team
              <span>&rarr;</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
