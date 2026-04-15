import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2400&q=90',
    alt: 'Luxury gala dining experience with candlelight',
  },
  {
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=2400&q=90',
    alt: 'Stunning wedding ceremony arch with cascading flowers and warm golden light',
  },
  {
    src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=2400&q=90',
    alt: 'Keynote speaker on stage at an elegant corporate event with engaged audience',
  },
]

export function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="pt-[76px] bg-light-warm">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 md:py-6">
      <div className="relative overflow-hidden h-[82vh] min-h-[500px]">
          {/* Background images — crossfade */}
          <AnimatePresence mode="sync">
            <motion.img
              key={current}
              src={heroImages[current].src}
              alt={heroImages[current].alt}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.2 }, scale: { duration: 6, ease: 'linear' } }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Stronger gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/15" />

          {/* Content */}
          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-[1400px] mx-auto w-full px-8 md:px-16 pb-10 md:pb-14">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="h-[1px] w-14 bg-sage mb-5" />
                <h1 className="font-cormorant text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] font-light text-white leading-[1.1] max-w-[600px]">
                  Designed to Impress.{' '}
                  <span className="italic text-sage">Planned to Perfection.</span>
                </h1>
                <p className="font-body text-white/85 text-[0.9375rem] mt-4 max-w-[440px] leading-relaxed">
                  South Florida flair. Thoughtful details. Unforgettable events.
                  Custom invitations and event planning that feel personal, polished, and completely you.
                </p>
                <div className="flex flex-wrap gap-3 mt-7">
                  <Link
                    to="/gallery"
                    className="font-body text-[0.75rem] tracking-[0.12em] uppercase text-white border border-white/50 px-6 py-2.5 hover:bg-white hover:text-charcoal transition-all duration-300"
                  >
                    View Our Work
                  </Link>
                  <Link
                    to="/contact"
                    className="font-body text-[0.75rem] tracking-[0.12em] uppercase bg-sage text-white px-6 py-2.5 hover:bg-sage-dark transition-colors duration-300"
                  >
                    Plan Your Event
                  </Link>
                </div>
              </motion.div>

              {/* Image indicator dots */}
              <div className="flex gap-2 mt-8">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`transition-all duration-500 ${
                      i === current ? 'w-7 h-[2px] bg-sage' : 'w-4 h-[2px] bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
      </div>
      </div>
    </section>
  )
}
