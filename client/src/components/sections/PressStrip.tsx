import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { pressLogos } from '../../lib/data'

export function PressStrip() {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <section ref={ref} className="py-16 bg-sand/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          className="text-center font-body text-sm uppercase tracking-[0.2em] text-charcoal/40 mb-8"
        >
          As Seen In
        </motion.p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {pressLogos.map((logo, i) => (
            <motion.span
              key={logo}
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="font-cormorant text-xl md:text-2xl text-charcoal/30 font-semibold italic"
            >
              {logo}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
