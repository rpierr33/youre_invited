import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { galleryImages } from '../../lib/data'

export function GalleryPreview() {
  const { ref, isVisible } = useIntersectionObserver()
  const images = galleryImages.slice(0, 6)

  return (
    <section ref={ref} className="py-20 md:py-24 bg-warm">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="sage-rule mb-4" />
            <h2 className="font-cormorant text-[2rem] md:text-[2.5rem] font-light text-charcoal">
              Selected Work
            </h2>
          </motion.div>
          <Link
            to="/gallery"
            className="hidden sm:inline-flex items-center gap-2 font-body text-[0.75rem] tracking-[0.12em] uppercase text-charcoal hover:text-sage transition-colors mb-2"
          >
            View All <span>&rarr;</span>
          </Link>
        </div>

        {/* Image Grid — 2 large + 4 small */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Large left */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-2 row-span-2"
          >
            <Link to="/gallery" className="block group overflow-hidden h-full">
              <img
                loading="lazy"
                src={images[0].src}
                alt={images[0].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </Link>
          </motion.div>
          {/* 4 smaller */}
          {images.slice(1, 5).map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            >
              <Link to="/gallery" className="block group overflow-hidden">
                <img
                  loading="lazy"
                  src={img.src}
                  alt={img.alt}
                  className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile "View All" link */}
        <div className="sm:hidden text-center mt-8">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 font-body text-[0.75rem] tracking-[0.12em] uppercase text-charcoal hover:text-sage transition-colors"
          >
            View Full Gallery <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
