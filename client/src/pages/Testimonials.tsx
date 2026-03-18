import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { testimonials } from '../lib/data'
import { ContactCta } from '../components/sections/ContactCta'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-gold' : 'text-charcoal/20'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const { ref, isVisible } = useIntersectionObserver()
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`max-w-2xl p-8 rounded-2xl bg-white shadow-sm border border-sand/50 ${isLeft ? 'mr-auto' : 'ml-auto'}`}>
        <span className="font-cormorant text-6xl text-gold/30 leading-none block mb-2">&ldquo;</span>
        <p className="font-body text-charcoal/80 leading-relaxed text-lg mb-6 -mt-4">
          {testimonial.quote}
        </p>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-playfair text-lg font-semibold text-charcoal">{testimonial.name}</p>
            <p className="font-body text-sm text-charcoal/50">
              {testimonial.eventType} &middot; {testimonial.eventDate}
            </p>
          </div>
          <StarRating rating={testimonial.rating} />
        </div>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center grain-overlay">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy/80" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Testimonials
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-xl text-white/80"
          >
            Stories from the celebrations we've been honored to create
          </motion.p>
        </div>
      </section>

      {/* Testimonials Wall */}
      <section className="py-24 bg-linen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={i} />
          ))}
        </div>
      </section>

      <ContactCta />
    </>
  )
}
