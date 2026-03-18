import { Hero } from '../components/sections/Hero'
import { PressStrip } from '../components/sections/PressStrip'
import { AboutSnippet } from '../components/sections/AboutSnippet'
import { GalleryPreview } from '../components/sections/GalleryPreview'
import { ServicesStrip } from '../components/sections/ServicesStrip'
import { TestimonialsCarousel } from '../components/sections/TestimonialsCarousel'
import { ContactCta } from '../components/sections/ContactCta'

export function Home() {
  return (
    <>
      <Hero />
      <PressStrip />
      <AboutSnippet />
      <ServicesStrip />
      <GalleryPreview />
      <TestimonialsCarousel />
      <ContactCta />
    </>
  )
}
