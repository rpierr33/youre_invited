import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { SectionHeading } from '../components/ui/SectionHeading'
import { services } from '../lib/data'
import { ContactCta } from '../components/sections/ContactCta'

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const { ref, isVisible } = useIntersectionObserver()
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:direction-rtl' : ''}`}
    >
      <div className={isEven ? '' : 'lg:order-2'}>
        <div className="overflow-hidden rounded-2xl shadow-lg group">
          <img
            src={service.image}
            alt={service.title}
            className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
      <div className={isEven ? '' : 'lg:order-1'}>
        <h3 className="font-playfair text-2xl md:text-3xl font-semibold text-charcoal mb-4">{service.title}</h3>
        <div className="gold-rule !ml-0 !text-left !max-w-[100px]" />
        <p className="font-body text-charcoal/70 leading-relaxed mb-6">{service.description}</p>
        <div className="mb-8">
          <p className="font-body text-sm uppercase tracking-wider text-charcoal/40 mb-3">Planning Tiers</p>
          <div className="flex flex-wrap gap-2">
            {service.tiers.map((tier) => (
              <span
                key={tier}
                className="px-4 py-2 rounded-full border border-gold/30 font-body text-sm text-gold-dark bg-gold/5"
              >
                {tier}
              </span>
            ))}
          </div>
        </div>
        <Link
          to="/contact"
          className="inline-block bg-gold text-white px-6 py-3 rounded-full font-body font-semibold uppercase tracking-wider text-sm hover:bg-gold-dark transition-colors duration-300"
        >
          Request a Quote
        </Link>
      </div>
    </motion.div>
  )
}

export function Services() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center grain-overlay">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy/80" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-xl text-white/80 max-w-2xl mx-auto"
          >
            From intimate gatherings to grand celebrations, we offer comprehensive event planning tailored to your vision
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-linen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      <ContactCta />
    </>
  )
}
