import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden grain-overlay">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')`,
        }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/40 to-navy/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-script text-3xl md:text-4xl text-gold mb-4"
        >
          You're Invited
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
        >
          Fort Lauderdale's Premier
          <br />
          <span className="text-gold">Event Planners</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
        >
          Every celebration, perfectly yours. From intimate beachside ceremonies to grand Intracoastal galas,
          we craft events that capture the warmth and elegance of South Florida.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/gallery"
            className="inline-block bg-gold text-white px-8 py-4 rounded-full font-body font-semibold text-lg uppercase tracking-wider hover:bg-gold-dark transition-colors duration-300"
          >
            View Our Work
          </Link>
          <Link
            to="/contact"
            className="inline-block border-2 border-white text-white px-8 py-4 rounded-full font-body font-semibold text-lg uppercase tracking-wider hover:bg-white hover:text-navy transition-colors duration-300"
          >
            Plan Your Event
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-white/70 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
