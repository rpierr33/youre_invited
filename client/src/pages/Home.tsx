import { Helmet } from 'react-helmet-async'
import { SEO } from '../components/SEO'
import { Hero } from '../components/sections/Hero'
import { PressStrip } from '../components/sections/PressStrip'
import { AboutSnippet } from '../components/sections/AboutSnippet'
import { ServicesStrip } from '../components/sections/ServicesStrip'
import { InvitationsPreview } from '../components/sections/InvitationsPreview'
import { GalleryPreview } from '../components/sections/GalleryPreview'
import { StatsStrip } from '../components/sections/StatsStrip'
import { TestimonialsCarousel } from '../components/sections/TestimonialsCarousel'
import { ContactCta } from '../components/sections/ContactCta'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://youreinvited-three.vercel.app',
  name: "You're Invited",
  description: "South Florida event planning and custom invitation studio. Custom invitations, full-service event planning, day-of coordination, and event design for weddings, birthdays, bridal showers, and milestone celebrations in Fort Lauderdale.",
  url: 'https://youreinvited-three.vercel.app',
  telephone: '+19545550100',
  email: 'hello@youreinvited.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Fort Lauderdale',
    addressRegion: 'FL',
    postalCode: '33301',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 26.1224,
    longitude: -80.1373,
  },
  areaServed: [
    { '@type': 'City', name: 'Fort Lauderdale' },
    { '@type': 'City', name: 'Miami' },
    { '@type': 'City', name: 'Boca Raton' },
    { '@type': 'City', name: 'Coral Springs' },
    { '@type': 'State', name: 'Florida' },
  ],
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  sameAs: [],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Event Planning Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Invitation Design & Printing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Full-Service Event Planning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Partial Event Planning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Day-Of Coordination' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Event Design & Styling' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Planning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Birthday Party Planning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bridal Shower Planning' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Baby Shower Planning' } },
    ],
  },
}

export function Home() {
  return (
    <>
      <SEO
        title="You're Invited | South Florida Event Planner & Custom Invitations | Fort Lauderdale"
        description="South Florida event planning and custom invitation studio in Fort Lauderdale. Wedding planning, birthday parties, bridal showers, custom invitations, and milestone celebrations. Designed to impress. Planned to perfection."
        path="/"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Hero />
      <PressStrip />
      <AboutSnippet />
      <ServicesStrip />
      <InvitationsPreview />
      <GalleryPreview />
      <StatsStrip />
      <TestimonialsCarousel />
      <ContactCta />
    </>
  )
}
