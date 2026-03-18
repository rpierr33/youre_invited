import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

interface SectionHeadingProps {
  subtitle?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionHeading({ subtitle, title, description, align = 'center', light = false }: SectionHeadingProps) {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <div ref={ref} className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {subtitle && (
          <span className="font-script text-2xl text-gold block mb-2">{subtitle}</span>
        )}
        <h2 className={`font-playfair text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 ${light ? 'text-white' : 'text-charcoal'}`}>
          {title}
        </h2>
        <div className="gold-rule" />
        {description && (
          <p className={`font-body text-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${light ? 'text-white/80' : 'text-charcoal/70'}`}>
            {description}
          </p>
        )}
      </motion.div>
    </div>
  )
}
