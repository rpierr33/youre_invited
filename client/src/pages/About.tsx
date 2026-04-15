import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { ContactCta } from '../components/sections/ContactCta'

const values = [
  {
    title: 'Personal Touch',
    description: 'Every event begins with understanding you. I listen to your vision, your story, and your style — then I craft a celebration that feels authentically yours.',
  },
  {
    title: 'Design-First Approach',
    description: 'I don\'t just plan events — I design the entire experience, beginning with invitations that get guests excited before they even RSVP.',
  },
  {
    title: 'Seamless Execution',
    description: 'Behind every effortless celebration is someone who sweats every detail. From timeline management to vendor coordination, I handle it all so you can actually enjoy the process.',
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
    description: 'Your invitations are professionally printed, your details are finalized, and every element is reviewed with a fine-tooth comb. Nothing slips through the cracks on my watch.',
  },
  {
    number: '05',
    title: 'Execute & Celebrate',
    description: 'Event day arrives, and I take it from here. I manage the timeline, vendors, and flow so you can relax, celebrate, and enjoy every moment.',
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
        title="About Noelle | You're Invited Event Planner Fort Lauderdale FL"
        description="Meet Noelle — 12+ years of event planning experience working with DMCs and Fortune 500 companies. You're Invited is a South Florida event planning and custom invitation studio where celebrations come to life with personality, precision, and just the right amount of sparkle."
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

      {/* Founder Bio */}
      <section ref={bioRef} className="py-28 bg-warm-tan">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0 }}
              animate={bioVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <img
                loading="lazy"
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
                alt="Noelle, founder of You're Invited"
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
                Hi! I'm Noelle, the planner, designer, and detail-lover behind You're Invited — a South
                Florida-based event planning and custom invitation studio where celebrations come to life
                (and yes, the paper goods matter just as much as the party).
              </p>
              <p className="font-cormorant text-[1.375rem] leading-[1.7] text-charcoal font-light mt-6">
                With over 12 years of experience — from planning personal celebrations to working in and
                with Destination Management Companies and producing events for Fortune 500 clients — I bring
                a rare mix of corporate precision and creative heart to every project. That depth of experience
                means I've seen it all, planned it all, and know exactly how to make your vision come to life.
              </p>
              <p className="font-cormorant text-[1.375rem] leading-[1.7] text-charcoal font-light mt-6">
                I believe great events start with a great first impression. That's why I don't just plan
                events — I design the entire experience, beginning with invitations that get guests excited
                before they even RSVP. I'm known for my love of details, color palettes, timelines, and
                those "wow, this feels so me" moments. Whether you're celebrating a birthday, bridal shower,
                wedding, or milestone moment, my goal is to make the process feel fun, stress-free, and
                completely personalized.
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
            My Approach
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
