import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { SectionHeading } from '../ui/SectionHeading'
import { galleryImages } from '../../lib/data'

export function GalleryPreview() {
  const { ref, isVisible } = useIntersectionObserver()
  const previewImages = galleryImages.slice(0, 9)

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Our Portfolio"
          title="Celebrations We've Crafted"
          description="A glimpse into the unforgettable moments we've had the privilege to create across South Florida and beyond."
        />

        <div className="masonry-grid mt-12">
          {previewImages.map((image, i) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group overflow-hidden rounded-xl"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '4/3' : '1/1' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="font-body text-sm text-white uppercase tracking-wider">
                  {image.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-block bg-gold text-white px-8 py-4 rounded-full font-body font-semibold uppercase tracking-wider hover:bg-gold-dark transition-colors duration-300"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  )
}
