import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85',
    alt: 'Luxury gala dining experience with candlelight',
  },
  {
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=85',
    alt: 'Grand celebration venue with elegant chandeliers',
  },
  {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85',
    alt: 'Sophisticated corporate event with stage lighting',
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
    <section className="pt-[76px] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-6 md:py-10">
        {/* Contained image block */}
        <div className="relative overflow-hidden h-[70vh] min-h-[450px] max-h-[700px]">
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

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/5" />

          {/* Content — bottom-aligned inside the container */}
          <div className="relative z-10 h-full flex items-end p-8 md:p-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="h-[1px] w-14 bg-gold mb-5" />
                <h1 className="font-cormorant text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] font-light text-white leading-[1.1] max-w-[600px]">
                  Fort Lauderdale's Premier{' '}
                  <span className="italic text-gold">Event Planners</span>
                </h1>
                <p className="font-body text-white/75 text-[0.875rem] md:text-[0.9375rem] mt-4 max-w-[440px] leading-relaxed">
                  Every celebration, perfectly yours. Crafting unforgettable moments
                  with warmth, elegance, and South Florida soul.
                </p>
                <div className="flex flex-wrap gap-3 mt-7">
                  <Link
                    to="/gallery"
                    className="font-body text-[0.75rem] tracking-[0.12em] uppercase text-white border border-white/40 px-6 py-2.5 hover:bg-white hover:text-charcoal transition-all duration-300"
                  >
                    View Our Work
                  </Link>
                  <Link
                    to="/contact"
                    className="font-body text-[0.75rem] tracking-[0.12em] uppercase bg-gold text-white px-6 py-2.5 hover:bg-gold-dark transition-colors duration-300"
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
                      i === current ? 'w-7 h-[2px] bg-gold' : 'w-4 h-[2px] bg-white/30 hover:bg-white/50'
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
