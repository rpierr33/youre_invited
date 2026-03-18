import { Hero } from '../components/sections/Hero'
import { ServicesStrip } from '../components/sections/ServicesStrip'
import { AboutSnippet } from '../components/sections/AboutSnippet'
import { GalleryPreview } from '../components/sections/GalleryPreview'
import { TestimonialsCarousel } from '../components/sections/TestimonialsCarousel'
import { PressStrip } from '../components/sections/PressStrip'
import { ContactCta } from '../components/sections/ContactCta'

export function Home() {
  return (
    <>
      <Hero />
      <ServicesStrip />
      <AboutSnippet />
      <GalleryPreview />
      <TestimonialsCarousel />
      <PressStrip />
      <ContactCta />
    </>
  )
}
