import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

const serviceItems = [
  { label: 'Weddings', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80' },
  { label: 'Corporate Events', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80' },
  { label: 'Galas & Fundraisers', image: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=500&q=80' },
  { label: 'Destination Events', image: 'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=500&q=80' },
]

export function ServicesStrip() {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <section ref={ref} className="py-20 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="gold-rule mx-auto mb-4" />
          <h2 className="font-cormorant text-[2rem] md:text-[2.5rem] font-light text-charcoal">
            What We Do
          </h2>
          <p className="font-body text-warm-gray text-[0.875rem] mt-3 max-w-md mx-auto">
            From intimate ceremonies to grand celebrations, every detail designed with intention.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {serviceItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to="/services" className="group block relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                  <span className="font-cormorant text-lg text-white font-light">
                    {item.label}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 font-body text-[0.75rem] tracking-[0.15em] uppercase text-charcoal border-b border-charcoal/30 pb-1 hover:border-gold hover:text-gold transition-all duration-300"
          >
            Explore All Services <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
