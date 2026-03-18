import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { BotanicalSvg } from '../ui/BotanicalSvg'

export function AboutSnippet() {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <section ref={ref} className="py-24 bg-linen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image + Botanical */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
                alt="You're Invited founder planning an event"
                className="rounded-2xl shadow-xl w-full aspect-[3/4] object-cover"
              />
              <div className="absolute -bottom-8 -right-8 w-40 h-40 opacity-20 text-gold">
                <BotanicalSvg variant="hibiscus" className="w-full h-full" />
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 opacity-15 text-gold">
                <BotanicalSvg variant="leaf" className="w-full h-full" />
              </div>
            </div>
          </motion.div>

          {/* Right: Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-script text-2xl text-gold">Our Story</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mt-2 mb-6">
              Rooted in Fort Lauderdale,
              <br />Inspired by You
            </h2>
            <div className="gold-rule !text-left !ml-0" />
            <p className="font-body text-charcoal/70 leading-relaxed mb-6">
              For over 15 years, You're Invited has been the heartbeat of celebration in South Florida.
              Founded on the belief that every event should feel as unique as the people at its center,
              we bring warmth, creativity, and meticulous attention to every detail.
            </p>
            <p className="font-body text-charcoal/70 leading-relaxed mb-8">
              From sunset ceremonies along the Intracoastal Waterway to elegant galas on Las Olas Boulevard,
              we know Fort Lauderdale like no one else. This is our home — and we pour that love into every
              celebration we create.
            </p>
            <Link
              to="/about"
              className="inline-block font-body text-gold font-semibold uppercase tracking-wider underline-grow hover:text-gold-dark transition-colors"
            >
              Learn More About Us &rarr;
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
