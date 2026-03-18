import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { Link } from 'react-router-dom'

interface SectionHeadingProps {
  title: string
  linkText?: string
  linkTo?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionHeading({ title, linkText, linkTo, align = 'left', light = false }: SectionHeadingProps) {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <div ref={ref} className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className={`flex items-end justify-between ${align === 'center' ? 'justify-center' : ''}`}
      >
        <h2 className={`font-cormorant text-[2.5rem] md:text-[3.25rem] font-light leading-[1.1] ${light ? 'text-white' : 'text-charcoal'}`}>
          {title}
        </h2>
        {linkText && linkTo && (
          <Link
            to={linkTo}
            className="hidden sm:inline-flex items-center gap-2 font-body text-[0.75rem] tracking-[0.12em] uppercase text-charcoal hover:opacity-50 transition-opacity ml-8 mb-1"
          >
            {linkText}
            <span>&rarr;</span>
          </Link>
        )}
      </motion.div>
    </div>
  )
}
