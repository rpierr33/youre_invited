import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { teamMembers } from '../lib/data'
import { ContactCta } from '../components/sections/ContactCta'

const values = [
  {
    title: 'Personal Touch',
    description: 'Every event begins with understanding you. We listen deeply to your vision, your story, and your style — then we craft a celebration that feels authentically yours.',
  },
  {
    title: 'Local Expertise',
    description: 'Fort Lauderdale is our home. We know every rooftop on Las Olas, every hidden garden in Coral Ridge, every sunset view along the Intracoastal.',
  },
  {
    title: 'Seamless Execution',
    description: 'Behind every effortless celebration is a team that sweats every detail. From timeline management to vendor coordination, we handle it all.',
  },
]

export function About() {
  const { ref: bioRef, isVisible: bioVisible } = useIntersectionObserver()
  const { ref: teamRef, isVisible: teamVisible } = useIntersectionObserver()
  const { ref: valuesRef, isVisible: valuesVisible } = useIntersectionObserver()

  return (
    <>
      {/* Hero Image */}
      <section className="pt-[76px]">
        <div className="w-full h-[50vh] min-h-[350px] max-h-[600px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80"
            alt="Elegant event setup"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Founder Bio */}
      <section ref={bioRef} className="py-28 bg-white">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0 }}
              animate={bioVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
                alt="Viviana Delgado, founder"
                className="w-full aspect-[3/4] object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={bioVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:pt-12"
            >
              <p className="font-cormorant text-[1.375rem] leading-[1.7] text-charcoal font-light drop-cap">
                Growing up on the sun-drenched shores of Fort Lauderdale, Viviana Delgado always understood
                the magic of gathering people together. From her grandmother's legendary Sunday dinners in
                Victoria Park to community festivals along the Riverwalk, she learned early that the most
                meaningful moments in life happen when people come together with intention and joy.
              </p>
              <p className="font-cormorant text-[1.375rem] leading-[1.7] text-charcoal font-light mt-6">
                After studying hospitality management and working with top event firms in Miami and New York,
                Viviana returned home in 2010 to launch You're Invited. Today, with over 500 events and 15 years
                of experience, we've become Fort Lauderdale's most trusted name in luxury event planning.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-24 bg-light-gray">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={valuesVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-cormorant text-[2.5rem] font-light text-charcoal mb-16 text-center"
          >
            Our Philosophy
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={valuesVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-center"
              >
                <h3 className="font-cormorant text-xl font-normal text-charcoal mb-4">{value.title}</h3>
                <p className="font-body text-[0.875rem] text-warm-gray leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="py-28 bg-white">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={teamVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-cormorant text-[2.5rem] font-light text-charcoal mb-16"
          >
            The Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={teamVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-[3/4] object-cover mb-5"
                />
                <h3 className="font-cormorant text-xl font-normal text-charcoal">{member.name}</h3>
                <p className="font-body text-[0.75rem] tracking-[0.1em] uppercase text-warm-gray mt-1">{member.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
