import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SEO } from '../components/SEO'
import { Modal } from '../components/ui/Modal'
import { galleryImages } from '../lib/data'
import type { GalleryImage } from '../types'

const categories = [
  { key: 'all', label: 'All' },
  { key: 'weddings', label: 'Weddings' },
  { key: 'corporate', label: 'Corporate' },
  { key: 'social', label: 'Social' },
  { key: 'galas', label: 'Galas' },
] as const

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const filtered = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory)

  return (
    <>
      <SEO
        title="Event Gallery | Weddings, Birthdays & Celebrations in South Florida | You're Invited"
        description="Browse our portfolio of beautifully designed events in South Florida. Weddings, birthday parties, bridal showers, corporate events, and milestone celebrations planned and styled by You're Invited in Fort Lauderdale."
        path="/gallery"
      />
      {/* Header */}
      <section className="pt-[76px]">
        <div className="py-20 bg-warm-tan text-center">
          <div className="max-w-[700px] mx-auto px-6">
            <h1 className="font-cormorant text-[2.5rem] md:text-[3.5rem] font-light text-charcoal leading-[1.15]">
              Gallery
            </h1>
            <p className="font-body text-taupe text-[0.9375rem] leading-relaxed mt-5">
              A visual journey through our celebrations.
            </p>
          </div>
        </div>
      </section>

      {/* Filters + Gallery */}
      <section className="pb-28 bg-warm-tan">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-6 mb-14">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`font-body text-[0.75rem] tracking-[0.12em] uppercase pb-1 transition-all duration-300 ${
                  activeCategory === cat.key
                    ? 'text-charcoal border-b border-charcoal'
                    : 'text-taupe hover:text-charcoal'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="masonry-grid">
            <AnimatePresence>
              {filtered.map((image, i) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="cursor-pointer group overflow-hidden"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    loading="lazy"
                    src={image.src}
                    alt={image.alt}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '4/3' : '1/1' }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
        {selectedImage && (
          <img
            loading="lazy"
            src={selectedImage.src.replace('w=800', 'w=1400')}
            alt={selectedImage.alt}
            className="w-full max-h-[85vh] object-contain"
          />
        )}
      </Modal>
    </>
  )
}
