import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { ContactCta } from '../components/sections/ContactCta'

const values = [
  {
    title: 'Personal Touch',
    description: 'Every event begins with understanding you. We listen to your vision, your story, and your style — then shape a celebration that feels authentically yours.',
  },
  {
    title: 'Design-First Approach',
    description: 'We design the entire experience together, beginning with invitations that get guests excited before they even RSVP.',
  },
  {
    title: 'Seamless Execution',
    description: 'Behind every effortless celebration is a team working through every detail. From timelines to vendor coordination, we keep the moving pieces aligned so you can enjoy the process.',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Connect & Dream',
    description: 'We start with a consultation to get to know you, your vision, your vibe, and what you\'re celebrating. This is where ideas start flowing and we make sure we\'re perfectly aligned from the start.',
  },
  {
    number: '02',
    title: 'Design the Details',
    description: 'Next, we create the look and feel of your event — from the overall aesthetic to your custom invitations and paper goods. Every detail is intentional and tailored to your style.',
  },
  {
    number: '03',
    title: 'Plan with Precision',
    description: 'Once the vision is set, we handle the logistics. Vendors, timelines, budgets, and behind-the-scenes coordination — this is where the magic gets organized.',
  },
  {
    number: '04',
    title: 'Print, Prep & Perfect',
    description: 'Your invitations are professionally printed, your details are finalized, and every element is carefully reviewed by our team before event day.',
  },
  {
    number: '05',
    title: 'Execute & Celebrate',
    description: 'Event day arrives, and our team takes it from here. We manage the timeline, vendors, setup, and flow so you can relax and enjoy every moment.',
  },
]

export function About() {
  const { ref: bioRef, isVisible: bioVisible } = useIntersectionObserver()
  const { ref: valuesRef, isVisible: valuesVisible } = useIntersectionObserver()
  const { ref: missionRef, isVisible: missionVisible } = useIntersectionObserver()
  const { ref: processRef, isVisible: processVisible } = useIntersectionObserver()

  return (
    <>
      <SEO
        title="About Our Event Planning Team | You're Invited Fort Lauderdale"
        description="Meet Noelle, consulting lead of You're Invited, and the collaborative team that carries her creative direction through planning, design, coordination, and event-day execution."
        path="/about"
      />
      {/* Hero Image */}
      <section className="pt-[76px]">
        <div className="w-full h-[50vh] min-h-[350px] max-h-[600px] overflow-hidden">
          <img
            loading="lazy"
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80"
            alt="Elegant event setup"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Team Story */}
      <section ref={bioRef} className="py-28 bg-warm-tan">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={bioVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <img
                loading="lazy"
                src="/images/about-event-team.jpg"
                alt="Event planning team collaborating on invitations, florals, layouts, and event details"
                className="w-full aspect-[4/3] object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={bioVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:py-8"
            >
              <p className="font-body text-[0.6875rem] tracking-[0.18em] uppercase text-sage-dark mb-4">
                The Team Behind the Details
              </p>
              <h1 className="font-cormorant text-[2.25rem] md:text-[2.75rem] leading-[1.15] text-charcoal font-light mb-7">
                Great events come together through collaboration.
              </h1>
              <p className="font-cormorant text-[1.25rem] leading-[1.7] text-charcoal font-light">
                You're Invited is a Fort Lauderdale-based event planning and custom invitation studio serving
                Broward, Miami-Dade, and Palm Beach counties. Noelle serves as the team's consulting and
                creative lead: she listens to the client's vision, defines the direction, and gives the team
                the clear brief and priorities needed to move every detail forward.
              </p>
              <p className="font-cormorant text-[1.25rem] leading-[1.7] text-charcoal font-light mt-6">
                While continuing her full-time career in corporate event planning, Noelle contributes more
                than 12 years of experience spanning Destination Management Companies, Fortune 500 events,
                and personal celebrations. Her role is focused on consultation, strategy, and creative
                oversight, giving the team its marching orders and the client a consistent point of view.
              </p>
              <p className="font-cormorant text-[1.25rem] leading-[1.7] text-charcoal font-light mt-6">
                From there, the planning and production team carries that direction through invitations,
                color palettes, vendor coordination, setup, timelines, and event-day execution. The result is
                one shared vision, thoughtfully directed and brought to life by people working together.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section ref={missionRef} className="py-20 bg-warm">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={missionVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="sage-rule mx-auto mb-6" />
            <h2 className="font-cormorant text-[2rem] md:text-[2.5rem] font-light text-charcoal mb-6">
              Our Mission
            </h2>
            <p className="font-cormorant text-[1.375rem] leading-[1.7] text-charcoal font-light italic">
              "To design invitations that excite, plan events that flow effortlessly, and create
              celebrations that feel personal, polished, and unforgettable — because every detail
              matters, and boring is never invited."
            </p>
          </motion.div>
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
            Our Approach
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
                <p className="font-body text-[0.875rem] text-taupe leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section ref={processRef} className="py-28 bg-warm-tan">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={processVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-cormorant text-[2.5rem] font-light text-charcoal mb-16 text-center"
          >
            The Process
          </motion.h2>
          <div className="space-y-12">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={processVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex gap-8 items-start"
              >
                <span className="font-cormorant text-[2.5rem] font-light text-sage/40 leading-none shrink-0 w-14">
                  {step.number}
                </span>
                <div className="border-t border-border pt-6 flex-1">
                  <h3 className="font-cormorant text-[1.5rem] font-normal text-charcoal mb-3">{step.title}</h3>
                  <p className="font-body text-[0.9375rem] text-taupe leading-[1.8]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
