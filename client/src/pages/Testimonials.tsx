import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { testimonials } from '../lib/data'
import { ContactCta } from '../components/sections/ContactCta'

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="py-16 border-b border-border last:border-b-0"
    >
      <div className={`max-w-[750px] ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
        <p className="font-cormorant text-[1.375rem] md:text-[1.5rem] leading-[1.7] text-charcoal font-light italic">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="mt-6 flex items-center gap-3">
          <div className="h-[1px] w-8 bg-border" />
          <p className="font-body text-[0.75rem] tracking-[0.12em] uppercase text-warm-gray">
            {testimonial.name}, {testimonial.eventType}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  return (
    <>
      {/* Header */}
      <section className="pt-[76px]">
        <div className="py-20 bg-white text-center">
          <h1 className="font-cormorant text-[2.5rem] md:text-[3.5rem] font-light text-charcoal leading-[1.15]">
            Kind Words
          </h1>
          <p className="font-body text-warm-gray text-[0.9375rem] leading-relaxed mt-5">
            Stories from the celebrations we've been honored to create.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pb-12 bg-white">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={i} />
          ))}
        </div>
      </section>

      <ContactCta />
    </>
  )
}
