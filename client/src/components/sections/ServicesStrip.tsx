import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

const serviceItems = [
  { icon: '💒', label: 'Weddings' },
  { icon: '🏢', label: 'Corporate Events' },
  { icon: '✨', label: 'Galas' },
  { icon: '🌴', label: 'Destination Events' },
  { icon: '👑', label: 'Quinceañeras' },
  { icon: '🥂', label: 'Social Celebrations' },
]

export function ServicesStrip() {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x snap-mandatory">
          {serviceItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="snap-center"
            >
              <Link
                to="/services"
                className="flex flex-col items-center gap-4 min-w-[160px] p-6 rounded-2xl border border-sand/50 hover:border-gold hover:shadow-lg transition-all duration-300 group"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className="font-playfair text-sm font-semibold text-charcoal whitespace-nowrap">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
