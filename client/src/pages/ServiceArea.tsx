import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { ContactCta } from '../components/sections/ContactCta'

const counties = [
  {
    name: 'Broward County',
    cities: 'Fort Lauderdale, Hollywood, Coral Springs, Davie, Plantation, and surrounding communities',
    description: 'Our home base and the center of our South Florida service area. We support celebrations ranging from intimate gatherings and milestone parties to weddings and corporate events.',
  },
  {
    name: 'Miami-Dade County',
    cities: 'Miami, Miami Beach, Aventura, Coral Gables, Doral, and surrounding communities',
    description: 'For Miami-Dade events, we bring a clear planning process, cohesive event design, custom invitations, and organized coordination tailored to the occasion and location.',
  },
  {
    name: 'Palm Beach County',
    cities: 'Boca Raton, Delray Beach, West Palm Beach, Palm Beach Gardens, and surrounding communities',
    description: 'From waterfront celebrations to polished social and corporate events, our services can be tailored to the scale, setting, and level of planning support you need.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'South Florida Event Planning and Custom Invitations',
  serviceType: ['Event Planning', 'Event Design', 'Day-Of Coordination', 'Custom Invitation Design'],
  provider: {
    '@type': 'LocalBusiness',
    '@id': 'https://yisfl.com',
    name: "You're Invited",
    url: 'https://yisfl.com',
    telephone: '+19547560681',
    email: 'noelle@yisfl.com',
  },
  areaServed: counties.map(({ name }) => ({ '@type': 'AdministrativeArea', name })),
}

export function ServiceArea() {
  return (
    <>
      <SEO
        title="South Florida Event Planner | Broward, Miami-Dade & Palm Beach | You're Invited"
        description="Event planning, design, day-of coordination, and custom invitations throughout Broward, Miami-Dade, and Palm Beach counties. Based in Fort Lauderdale, Florida."
        path="/south-florida-service-area"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main className="pt-[76px]">
        <section className="bg-forest text-white py-20 md:py-28">
          <div className="max-w-[920px] mx-auto px-6 lg:px-12 text-center">
            <p className="font-body text-[0.6875rem] tracking-[0.18em] uppercase text-sage mb-5">
              South Florida Service Area
            </p>
            <h1 className="font-cormorant text-[2.5rem] md:text-[3.75rem] font-light leading-[1.1]">
              Event Planning Across the Tri-County Area
            </h1>
            <p className="font-body text-[0.9375rem] text-white/70 leading-[1.8] max-w-[720px] mx-auto mt-6">
              You're Invited is a Fort Lauderdale-based event planning and custom invitation studio
              serving Broward, Miami-Dade, and Palm Beach counties.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-warm-tan">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {counties.map((county) => (
                <article key={county.name} className="border-t border-sage pt-7">
                  <h2 className="font-cormorant text-[1.75rem] font-light text-charcoal">{county.name}</h2>
                  <p className="font-body text-[0.75rem] leading-[1.7] text-sage-dark mt-3 min-h-[62px]">
                    {county.cities}
                  </p>
                  <p className="font-body text-[0.875rem] leading-[1.8] text-taupe mt-5">
                    {county.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-light-gray">
          <div className="max-w-[850px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              <div>
                <h2 className="font-cormorant text-[2rem] font-light text-charcoal">Services Available</h2>
                <ul className="font-body text-[0.875rem] leading-[2] text-taupe mt-5">
                  <li>Full-service and partial event planning</li>
                  <li>Day-of coordination</li>
                  <li>Event design and styling</li>
                  <li>Custom invitations and paper goods</li>
                  <li>Social, milestone, wedding, and corporate events</li>
                </ul>
                <Link to="/services" className="inline-block mt-6 font-body text-[0.75rem] tracking-[0.15em] uppercase text-charcoal border-b border-charcoal pb-1">
                  View Services
                </Link>
              </div>
              <div>
                <h2 className="font-cormorant text-[2rem] font-light text-charcoal">Planning Beyond Fort Lauderdale</h2>
                <p className="font-body text-[0.875rem] leading-[1.8] text-taupe mt-5">
                  Every proposal is tailored to the event scope and location. Travel, setup access,
                  venue requirements, vendor coordination, and on-site timing are discussed during
                  the consultation so expectations are clear from the beginning.
                </p>
                <Link to="/contact" className="inline-block mt-6 font-body text-[0.75rem] tracking-[0.15em] uppercase text-charcoal border-b border-charcoal pb-1">
                  Request a Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ContactCta />
    </>
  )
}
