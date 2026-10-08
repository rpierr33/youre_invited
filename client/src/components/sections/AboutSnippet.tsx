import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export function AboutSnippet() {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <section ref={ref} className="py-20 md:py-24 bg-warm-tan">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <img
              loading="lazy"
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
            <div className="sage-rule mb-6" />
            <h2 className="font-cormorant text-[2rem] md:text-[2.5rem] font-light text-charcoal leading-[1.2] mb-6">
              Where Great Events Start with a{' '}
              <span className="italic text-sage">Great First Impression</span>
            </h2>
            <p className="font-body text-taupe text-[0.9375rem] leading-[1.8] mb-5">
              Noelle is the consulting and creative lead behind You're Invited, a Fort Lauderdale-based
              event planning and custom invitation studio serving Broward, Miami-Dade, and Palm Beach
              counties. Drawing on more than 12 years of experience with DMCs and Fortune 500 companies,
              she sets the vision, priorities, and standards that guide every celebration.
            </p>
            <p className="font-body text-taupe text-[0.9375rem] leading-[1.8] mb-8">
              While Noelle continues her full-time career in corporate event planning, the You're Invited
              team carries her direction through design, vendor coordination, production, and event-day
              execution. Every invitation, event, and detail is shaped around your vision and story.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 font-body text-[0.75rem] tracking-[0.15em] uppercase text-charcoal border-b border-charcoal/30 pb-1 hover:border-sage hover:text-sage transition-all duration-300"
            >
              Meet Noelle
              <span>&rarr;</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
