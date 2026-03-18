import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { testimonials } from '../../lib/data'

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const { ref, isVisible } = useIntersectionObserver()
  const displayTestimonials = testimonials.slice(0, 4)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % displayTestimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [paused, displayTestimonials.length])

  return (
    <section
      ref={ref}
      className="py-20 md:py-24 bg-warm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[850px] mx-auto px-6 lg:px-12 text-center">
        {/* Gold quote mark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="font-cormorant text-[5rem] leading-none text-gold/40">&ldquo;</span>
        </motion.div>

        {/* Quote */}
        <div className="relative min-h-[180px] md:min-h-[140px] flex items-center justify-center -mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <p className="font-cormorant text-[1.25rem] md:text-[1.5rem] leading-[1.7] text-charcoal font-light italic max-w-[700px]">
                {displayTestimonials[current].quote}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="h-[1px] w-6 bg-gold" />
                <p className="font-body text-[0.75rem] tracking-[0.12em] uppercase text-warm-gray">
                  {displayTestimonials[current].name}
                </p>
                <div className="h-[1px] w-6 bg-gold" />
              </div>
              <p className="font-body text-[0.6875rem] text-warm-gray/60 mt-1 uppercase tracking-wider">
                {displayTestimonials[current].eventType}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {displayTestimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-400 ${
                i === current ? 'w-7 h-[3px] bg-gold' : 'w-[3px] h-[3px] bg-charcoal/20 hover:bg-charcoal/40'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
