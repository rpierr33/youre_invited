import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { SectionHeading } from '../ui/SectionHeading'
import { testimonials } from '../../lib/data'

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const { ref, isVisible } = useIntersectionObserver()
  const displayTestimonials = testimonials.slice(0, 3)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % displayTestimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [paused, displayTestimonials.length])

  return (
    <section
      ref={ref}
      className="py-24 bg-navy relative grain-overlay"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Kind Words"
          title="What Our Clients Say"
          light
        />

        <div className="relative h-[320px] md:h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center text-center"
            >
              {/* Decorative quote mark */}
              <span className="font-cormorant text-8xl text-gold/30 leading-none mb-4">&ldquo;</span>

              <p className="font-body text-lg md:text-xl text-white/90 leading-relaxed mb-8 -mt-8">
                {displayTestimonials[current].quote}
              </p>

              <div>
                <p className="font-playfair text-lg text-gold font-semibold">
                  {displayTestimonials[current].name}
                </p>
                <p className="font-body text-sm text-white/60">
                  {displayTestimonials[current].eventType} &middot; {displayTestimonials[current].eventDate}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {displayTestimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? 'bg-gold w-8' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
