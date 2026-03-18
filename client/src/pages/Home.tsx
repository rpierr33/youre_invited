import { Hero } from '../components/sections/Hero'
import { PressStrip } from '../components/sections/PressStrip'
import { AboutSnippet } from '../components/sections/AboutSnippet'
import { ServicesStrip } from '../components/sections/ServicesStrip'
import { InvitationsPreview } from '../components/sections/InvitationsPreview'
import { GalleryPreview } from '../components/sections/GalleryPreview'
import { TestimonialsCarousel } from '../components/sections/TestimonialsCarousel'
import { ContactCta } from '../components/sections/ContactCta'

export function Home() {
  return (
    <>
      <Hero />
      <PressStrip />
      <AboutSnippet />
      <ServicesStrip />
      <InvitationsPreview />
      <GalleryPreview />
      <TestimonialsCarousel />
      <ContactCta />
    </>
  )
}
