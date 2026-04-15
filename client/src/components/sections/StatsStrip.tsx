import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

const stats = [
  { number: '12+', label: 'Years of Experience' },
  { number: '500+', label: 'Events Planned' },
  { number: 'Fortune 500', label: 'Companies Served' },
  { number: '100%', label: 'Personalized Service' },
]

export function StatsStrip() {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <section ref={ref} className="py-14 bg-forest">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-cormorant text-[2.5rem] md:text-[3rem] font-light text-sage leading-none">
                {stat.number}
              </p>
              <p className="font-body text-[0.6875rem] tracking-[0.15em] uppercase text-white/50 mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
