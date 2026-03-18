import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { SectionHeading } from '../components/ui/SectionHeading'
import { BotanicalSvg } from '../components/ui/BotanicalSvg'
import { teamMembers } from '../lib/data'
import { ContactCta } from '../components/sections/ContactCta'

const values = [
  {
    icon: (
      <svg className="w-12 h-12 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: 'Personal Touch',
    description: 'Every event begins with understanding you. We listen deeply to your vision, your story, and your style — then we craft a celebration that feels authentically and unmistakably yours.',
  },
  {
    icon: (
      <svg className="w-12 h-12 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: 'Local Expertise',
    description: 'Fort Lauderdale is our home. We know every rooftop on Las Olas, every hidden garden in Coral Ridge, every sunset view along the Intracoastal. Our local relationships mean the best venues, vendors, and experiences for you.',
  },
  {
    icon: (
      <svg className="w-12 h-12 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: 'Seamless Execution',
    description: 'Behind every effortless celebration is a team that sweats every detail. From timeline management to vendor coordination to day-of logistics, we handle it all so you can be fully present in your moment.',
  },
]

export function About() {
  const { ref: bioRef, isVisible: bioVisible } = useIntersectionObserver()
  const { ref: teamRef, isVisible: teamVisible } = useIntersectionObserver()
  const { ref: valuesRef, isVisible: valuesVisible } = useIntersectionObserver()
  const { ref: locationRef, isVisible: locationVisible } = useIntersectionObserver()

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center grain-overlay">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy/80" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-xl text-white/80"
          >
            The heart and soul behind every celebration
          </motion.p>
        </div>
      </section>

      {/* Founder Bio */}
      <section ref={bioRef} className="py-24 bg-linen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={bioVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="font-script text-2xl text-gold block mb-4">Our Founder</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-8">Viviana Delgado</h2>
            <div className="gold-rule !ml-0 !text-left" />
            <div className="font-body text-lg text-charcoal/70 leading-relaxed space-y-6">
              <p className="drop-cap">
                Growing up on the sun-drenched shores of Fort Lauderdale, Viviana Delgado always understood the magic of gathering people together. From her grandmother's legendary Sunday dinners in Victoria Park to community festivals along the Riverwalk, she learned early that the most meaningful moments in life happen when people come together with intention and joy.
              </p>
              <p>
                After studying hospitality management and working with top event firms in Miami and New York, Viviana returned home to Fort Lauderdale in 2010 to launch You're Invited. Her vision was simple but bold: create an event planning company that combines world-class design with the warmth and personal attention that South Florida is known for.
              </p>
              <p>
                Today, with over 500 events and 15 years of experience, You're Invited has become Fort Lauderdale's most trusted name in luxury event planning. But no matter how the company grows, Viviana's philosophy remains the same: every celebration should feel as unique and beloved as the people at its center.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Our Team"
            title="The People Behind the Magic"
            description="A passionate team of designers, coordinators, and dreamers who bring your vision to life."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={teamVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="text-center"
              >
                <div className="relative inline-block mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full object-cover mx-auto shadow-lg"
                  />
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 text-gold/20">
                    <BotanicalSvg variant="leaf" className="w-full h-full" />
                  </div>
                </div>
                <h3 className="font-playfair text-xl font-semibold text-charcoal mb-1">{member.name}</h3>
                <p className="font-body text-sm text-gold uppercase tracking-wider mb-4">{member.title}</p>
                <p className="font-body text-charcoal/60 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-24 bg-linen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Our Philosophy"
            title="What Guides Us"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="text-center p-8"
              >
                <div className="flex justify-center mb-6">{value.icon}</div>
                <h3 className="font-playfair text-xl font-semibold text-charcoal mb-4">{value.title}</h3>
                <p className="font-body text-charcoal/60 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* South Florida Focus */}
      <section ref={locationRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={locationVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="font-script text-2xl text-gold block mb-4">Our Home</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-charcoal mb-6">
                Proudly South Florida
              </h2>
              <div className="gold-rule !ml-0 !text-left" />
              <div className="font-body text-charcoal/70 leading-relaxed space-y-4">
                <p>
                  Based in Fort Lauderdale, we serve celebrations throughout South Florida — from Palm Beach's elegant estates to Miami's vibrant waterfront venues, and everywhere in between.
                </p>
                <p>
                  Our deep roots in Broward County mean we've built relationships with the region's finest venues, caterers, florists, photographers, and entertainers. When you work with You're Invited, you're tapping into 15 years of trusted local connections.
                </p>
                <p>
                  And for those dreaming beyond Florida? We coordinate destination events worldwide, bringing our signature warmth and expertise wherever your celebration takes you.
                </p>
              </div>
              <div className="mt-8 space-y-2">
                <p className="font-body text-sm text-charcoal/50 uppercase tracking-wider">Areas We Serve</p>
                <p className="font-playfair text-lg text-charcoal">Fort Lauderdale &middot; Miami &middot; Palm Beach &middot; Boca Raton &middot; Coral Gables &middot; Worldwide</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={locationVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800&q=80"
                alt="Fort Lauderdale waterway aerial view"
                className="w-full aspect-[4/3] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
