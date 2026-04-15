import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { invitationTypes, workshopTypes } from '../lib/data'
import { ContactCta } from '../components/sections/ContactCta'

function InvitationCard({ item, index }: { item: typeof invitationTypes[0]; index: number }) {
  const { ref, isVisible } = useIntersectionObserver()
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center"
    >
      <div className={isEven ? '' : 'lg:order-2'}>
        <div className="overflow-hidden">
          <img
            loading="lazy"
            src={item.image}
            alt={item.title}
            className="w-full aspect-[4/5] object-cover"
          />
        </div>
      </div>
      <div className={isEven ? '' : 'lg:order-1'}>
        <h3 className="font-cormorant text-[2rem] font-light text-charcoal mb-4">{item.title}</h3>
        <div className="sage-rule mb-5" />
        <p className="font-body text-taupe text-[0.9375rem] leading-[1.8] mb-6">{item.description}</p>
        <ul className="space-y-2.5 mb-8">
          {item.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="text-sage mt-1 text-sm">&#9670;</span>
              <span className="font-body text-[0.875rem] text-charcoal/70">{feature}</span>
            </li>
          ))}
        </ul>
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 font-body text-[0.75rem] tracking-[0.15em] uppercase text-charcoal border-b border-charcoal/30 pb-1 hover:border-sage hover:text-sage transition-all duration-300"
        >
          Request a Quote <span>&rarr;</span>
        </Link>
      </div>
    </motion.div>
  )
}

function WorkshopCard({ workshop, index }: { workshop: typeof workshopTypes[0]; index: number }) {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="overflow-hidden mb-5">
        <img
          loading="lazy"
          src={workshop.image}
          alt={workshop.title}
          className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-center gap-3 mb-3">
        <span className={`font-body text-[0.6875rem] tracking-[0.12em] uppercase px-3 py-1 ${
          workshop.format === 'In-Person'
            ? 'bg-sage/10 text-sage-dark'
            : 'bg-charcoal/5 text-charcoal/60'
        }`}>
          {workshop.format}
        </span>
        <span className="font-body text-[0.75rem] text-taupe">{workshop.duration}</span>
      </div>
      <h3 className="font-cormorant text-[1.5rem] font-light text-charcoal mb-2">{workshop.title}</h3>
      <p className="font-body text-[0.875rem] text-taupe leading-relaxed mb-4">{workshop.description}</p>
      <div className="flex items-center gap-4 text-[0.75rem] text-taupe font-body mb-5">
        <span>{workshop.location}</span>
        <span className="text-border">|</span>
        <span>Max {workshop.capacity}</span>
      </div>
    </motion.div>
  )
}

export function Invitations() {
  const { ref: introRef, isVisible: introVisible } = useIntersectionObserver()
  const { ref: workshopRef, isVisible: workshopVisible } = useIntersectionObserver()
  const [bookingMode, setBookingMode] = useState<'calendar' | 'message'>('calendar')

  return (
    <>
      <SEO
        title="Custom Invitations Fort Lauderdale | Wedding, Birthday & Event Invitations | You're Invited"
        description="Custom invitation design and printing in South Florida. Wedding suites, birthday invitations, corporate event invitations, and digital designs. Handcrafted paper goods and letterpress workshops in Fort Lauderdale."
        path="/invitations"
      />
      {/* Hero */}
      <section className="pt-[76px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-6 md:py-10">
          <div className="relative overflow-hidden h-[50vh] min-h-[350px] max-h-[500px]">
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=1920&q=85"
              alt="Luxury custom wedding invitations with calligraphy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
            <div className="relative z-10 h-full flex items-end p-8 md:p-12 -mt-full" style={{ marginTop: '-50vh' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="h-[1px] w-14 bg-sage mb-5" />
                <h1 className="font-cormorant text-[2.5rem] md:text-[3.5rem] font-light text-white leading-[1.1] max-w-[600px]">
                  Custom <span className="italic text-sage">Invitations</span>
                </h1>
                <p className="font-body text-white/80 text-[0.9375rem] mt-4 max-w-[450px] leading-relaxed">
                  Handcrafted and digital invitation designs that set the tone
                  for your celebration before the first guest arrives.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section ref={introRef} className="py-20 bg-white">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="sage-rule mx-auto mb-6" />
            <h2 className="font-cormorant text-[2rem] md:text-[2.5rem] font-light text-charcoal leading-[1.2]">
              Your Event Begins with the <span className="italic text-sage">Invitation</span>
            </h2>
            <p className="font-body text-taupe text-[0.9375rem] leading-[1.8] mt-5">
              From save-the-dates to the final thank-you, we design and print custom invitations
              and paper goods that set the tone for your event. Our designs are tailored to your style,
              professionally printed, and thoughtfully curated to feel just as special as the
              celebration itself. Not your average invitation. Not your average event.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Invitation Types */}
      <section className="pb-24 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 space-y-24">
          {invitationTypes.map((item, i) => (
            <InvitationCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Courses & Workshops Section */}
      <section ref={workshopRef} className="py-24 bg-warm">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={workshopVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="sage-rule mx-auto mb-6" />
            <h2 className="font-cormorant text-[2rem] md:text-[2.75rem] font-light text-charcoal leading-[1.2]">
              Workshops & <span className="italic text-sage">Courses</span>
            </h2>
            <p className="font-body text-taupe text-[0.9375rem] leading-[1.8] mt-4 max-w-[600px] mx-auto">
              Learn the art of invitation design from our expert team. In-person workshops
              at our Fort Lauderdale studio for hands-on techniques, and online courses
              for digital design — perfect for creatives, aspiring stationers, and DIY enthusiasts.
            </p>
          </motion.div>

          {/* Workshop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {workshopTypes.map((workshop, i) => (
              <WorkshopCard key={workshop.id} workshop={workshop} index={i} />
            ))}
          </div>

          {/* Booking Section */}
          <div className="max-w-[800px] mx-auto">
            <div className="bg-white p-8 md:p-12">
              <h3 className="font-cormorant text-[1.75rem] font-light text-charcoal text-center mb-2">
                Book a Workshop
              </h3>
              <p className="font-body text-taupe text-[0.875rem] text-center mb-8">
                Choose your preferred booking method
              </p>

              {/* Toggle */}
              <div className="flex justify-center gap-1 mb-10 bg-light-warm p-1">
                <button
                  onClick={() => setBookingMode('calendar')}
                  className={`px-6 py-2.5 font-body text-[0.75rem] tracking-[0.1em] uppercase transition-all duration-300 ${
                    bookingMode === 'calendar'
                      ? 'bg-charcoal text-white'
                      : 'text-taupe hover:text-charcoal'
                  }`}
                >
                  Schedule Online
                </button>
                <button
                  onClick={() => setBookingMode('message')}
                  className={`px-6 py-2.5 font-body text-[0.75rem] tracking-[0.1em] uppercase transition-all duration-300 ${
                    bookingMode === 'message'
                      ? 'bg-charcoal text-white'
                      : 'text-taupe hover:text-charcoal'
                  }`}
                >
                  Send a Message
                </button>
              </div>

              {bookingMode === 'calendar' ? (
                <div className="text-center">
                  {/* Calendly placeholder — replace src with your real Calendly link */}
                  <div className="border border-border rounded overflow-hidden">
                    <div className="bg-light-warm py-20 px-6 text-center">
                      <p className="font-cormorant text-2xl text-charcoal mb-3">Select a Date & Time</p>
                      <p className="font-body text-[0.875rem] text-taupe mb-6">
                        Browse available workshop dates and book your spot instantly.
                      </p>
                      <a
                        href="https://calendly.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block font-body text-[0.75rem] tracking-[0.15em] uppercase bg-sage text-white px-8 py-3 hover:bg-sage-dark transition-colors duration-300"
                      >
                        Open Scheduling Calendar
                      </a>
                      <p className="font-body text-[0.75rem] text-taupe/60 mt-4">
                        Powered by Calendly &middot; Replace this with your embedded calendar
                      </p>
                    </div>
                  </div>
                  <p className="font-body text-[0.8125rem] text-taupe mt-6">
                    Can't find a time that works?{' '}
                    <button
                      onClick={() => setBookingMode('message')}
                      className="text-sage hover:text-sage-dark underline transition-colors"
                    >
                      Send us a message
                    </button>{' '}
                    and we'll find the perfect slot.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-body text-[0.875rem] text-taupe text-center mb-6">
                    Tell us which workshop you're interested in and any scheduling preferences.
                    We'll get back to you within 24 hours.
                  </p>
                  <Link
                    to="/contact"
                    className="block text-center font-body text-[0.75rem] tracking-[0.15em] uppercase bg-sage text-white px-8 py-3 hover:bg-sage-dark transition-colors duration-300 max-w-xs mx-auto"
                  >
                    Contact Us About Workshops
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Private & Group Training CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="sage-rule mb-5" />
              <h2 className="font-cormorant text-[2rem] font-light text-charcoal leading-[1.2] mb-4">
                Private & Group <span className="italic text-sage">Training</span>
              </h2>
              <p className="font-body text-taupe text-[0.9375rem] leading-[1.8] mb-4">
                Looking for a custom experience? We offer private one-on-one training sessions
                and group workshops for bridal parties, corporate team-building, and creative
                groups. Whether you want to design your own wedding invitations or learn
                a new skill with friends, we'll tailor the session to your goals.
              </p>
              <p className="font-body text-taupe text-[0.9375rem] leading-[1.8] mb-8">
                Private sessions are available both in-person at our Fort Lauderdale studio
                and virtually via Zoom.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 font-body text-[0.75rem] tracking-[0.15em] uppercase text-charcoal border-b border-charcoal/30 pb-1 hover:border-sage hover:text-sage transition-all duration-300"
              >
                Inquire About Private Training <span>&rarr;</span>
              </Link>
            </div>
            <div>
              <img
                loading="lazy"
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=80"
                alt="Hands-on invitation crafting workshop"
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
