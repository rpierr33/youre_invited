import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { services } from '../lib/data'
import { FAQ } from '../components/sections/FAQ'
import { ContactCta } from '../components/sections/ContactCta'

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const { ref, isVisible } = useIntersectionObserver()
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}
    >
      <div className={isEven ? '' : 'lg:order-2'}>
        <div className="overflow-hidden">
          <img
            loading="lazy"
            src={service.image}
            alt={service.title}
            className="w-full aspect-[4/5] object-cover"
          />
        </div>
      </div>
      <div className={isEven ? '' : 'lg:order-1'}>
        <h3 className="font-cormorant text-[2rem] font-light text-charcoal mb-6">{service.title}</h3>
        <p className="font-body text-[0.9375rem] text-taupe leading-[1.8] mb-8">{service.description}</p>
        <div className="mb-8">
          <p className="font-body text-[0.6875rem] tracking-[0.15em] uppercase text-taupe mb-3">Planning Tiers</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {service.tiers.map((tier) => (
              <span key={tier} className="font-cormorant text-[1.0625rem] text-charcoal">
                {tier}
              </span>
            ))}
          </div>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 font-body text-[0.75rem] tracking-[0.15em] uppercase text-charcoal border-b border-charcoal pb-1 hover:opacity-50 transition-opacity"
        >
          Request a Quote
          <span>&rarr;</span>
        </Link>
      </div>
    </motion.div>
  )
}

export function Services() {
  return (
    <>
      <SEO
        title="Event Planning Services Fort Lauderdale | Custom Invitations, Day-Of Coordination | You're Invited"
        description="Full-service event planning, custom invitation design, partial planning, day-of coordination, and event styling in South Florida. Weddings, birthdays, bridal showers, baby showers, and milestone celebrations."
        path="/services"
      />
      {/* Hero */}
      <section className="pt-[76px]">
        <div className="w-full h-[50vh] min-h-[350px] max-h-[600px] overflow-hidden">
          <img
            loading="lazy"
            src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80"
            alt="Luxury wedding reception"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Title */}
      <section className="py-20 bg-warm-tan text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h1 className="font-cormorant text-[2.5rem] md:text-[3.5rem] font-light text-charcoal leading-[1.15]">
            Our Services
          </h1>
          <p className="font-body text-taupe text-[0.9375rem] leading-relaxed mt-5">
            At You're Invited, we handle the details so you can enjoy the celebration.
            From big-picture planning to the finishing touches, our services are designed
            to keep your event polished, personal, and stress-free.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="pb-28 bg-warm-tan">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 space-y-28">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      <FAQ />
      <ContactCta />
    </>
  )
}
