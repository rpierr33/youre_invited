import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

const previewItems = [
  {
    label: 'Custom Invitations',
    description: 'Handcrafted & digital designs for every celebration',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80',
  },
  {
    label: 'Workshops & Courses',
    description: 'Learn the art of invitation design, in-person & online',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
  },
]

export function InvitationsPreview() {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <section ref={ref} className="py-20 md:py-24 bg-warm-tan">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="sage-rule mb-5" />
            <h2 className="font-cormorant text-[2rem] md:text-[2.5rem] font-light text-charcoal leading-[1.2] mb-5">
              The Art of the <span className="italic text-sage">Invitation</span>
            </h2>
            <p className="font-body text-taupe text-[0.9375rem] leading-[1.8] mb-4">
              From save-the-dates to the final thank-you, we design and print custom invitations
              and paper goods that set the tone for your event. Our designs are tailored to your
              style, professionally printed, and thoughtfully curated to feel just as special
              as the celebration itself.
            </p>
            <p className="font-body text-taupe text-[0.9375rem] leading-[1.8] mb-8">
              Want to learn the craft yourself? Join our hands-on workshops in Fort Lauderdale
              or take an online course in digital invitation design.
            </p>
            <Link
              to="/invitations"
              className="inline-flex items-center gap-3 font-body text-[0.75rem] tracking-[0.15em] uppercase text-charcoal border-b border-charcoal/30 pb-1 hover:border-sage hover:text-sage transition-all duration-300"
            >
              Explore Invitations & Courses <span>&rarr;</span>
            </Link>
          </motion.div>

          {/* Right images */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-3">
            {previewItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              >
                <Link to="/invitations" className="group block">
                  <div className="overflow-hidden mb-4">
                    <img
                      loading="lazy"
                      src={item.image}
                      alt={item.label}
                      className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="font-cormorant text-lg font-light text-charcoal group-hover:text-sage transition-colors">
                    {item.label}
                  </h3>
                  <p className="font-body text-[0.8125rem] text-taupe mt-1">{item.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
