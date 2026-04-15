import { useState } from 'react'
import { motion } from 'framer-motion'
import { SEO } from '../components/SEO'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { submitInquiry } from '../lib/api'
import type { InquiryFormData } from '../types'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  eventType: z.string().optional(),
  guestCount: z.coerce.number().optional(),
  eventDate: z.string().optional(),
  budgetRange: z.string().optional(),
  message: z.string().optional(),
})

const eventTypes = ['Wedding', 'Birthday', 'Bridal Shower', 'Baby Shower', 'Anniversary', 'Corporate Event', 'Social Celebration', 'Other']
const budgetRanges = ['Under $10,000', '$10,000 - $25,000', '$25,000 - $50,000', '$50,000 - $75,000', '$75,000 - $100,000', '$100,000+']

export function Contact() {
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const { register, handleSubmit, formState: { errors }, reset } = useForm<InquiryFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: InquiryFormData) => {
    setSubmitState('loading')
    try {
      await submitInquiry(data)
      setSubmitState('success')
      reset()
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <section className="pt-[76px]">
      <SEO
        title="Contact You're Invited | Get a Free Event Planning Quote | Fort Lauderdale FL"
        description="Ready to plan your event? Contact You're Invited for a free consultation. Event planning, custom invitations, and day-of coordination in Fort Lauderdale and South Florida. Weddings, birthdays, bridal showers, and more."
        path="/contact"
      />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-cormorant text-[2.5rem] md:text-[3.5rem] font-light text-charcoal leading-[1.15]">
              Get in Touch
            </h1>
            <p className="font-cormorant text-[1.375rem] leading-[1.7] text-charcoal font-light mt-8">
              I'd love to hear about your vision. Whether you're planning a birthday, bridal shower,
              wedding, or milestone celebration, let's make it unforgettable — and have a little fun along the way.
            </p>

            <div className="mt-12 space-y-6 font-body text-[0.9375rem] text-taupe">
              <div>
                <p className="text-[0.6875rem] tracking-[0.15em] uppercase text-taupe mb-1">Location</p>
                <p className="text-charcoal">Fort Lauderdale, FL 33301</p>
              </div>
              <div>
                <p className="text-[0.6875rem] tracking-[0.15em] uppercase text-taupe mb-1">Phone</p>
                <a href="tel:+19545550100" className="text-charcoal hover:opacity-50 transition-opacity">(954) 555-0100</a>
              </div>
              <div>
                <p className="text-[0.6875rem] tracking-[0.15em] uppercase text-taupe mb-1">Email</p>
                <a href="mailto:hello@youreinvited.com" className="text-charcoal hover:opacity-50 transition-opacity">hello@youreinvited.com</a>
              </div>
              <div className="flex gap-5 pt-4">
                <a href="#" className="text-charcoal hover:opacity-50 transition-opacity" aria-label="Instagram">
                  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="text-charcoal hover:opacity-50 transition-opacity" aria-label="Facebook">
                  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
                <a href="#" className="text-charcoal hover:opacity-50 transition-opacity" aria-label="Pinterest">
                  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {submitState === 'success' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <h3 className="font-cormorant text-[2rem] font-light text-charcoal mb-4">Thank You</h3>
                <p className="font-body text-taupe text-[0.9375rem] mb-8">
                  Your inquiry has been received. We'll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitState('idle')}
                  className="font-body text-[0.75rem] tracking-[0.15em] uppercase text-charcoal border-b border-charcoal pb-1 hover:opacity-50 transition-opacity"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <input {...register('name')} className="form-input" placeholder="Name *" />
                    {errors.name && <p className="mt-2 text-[0.75rem] text-red-500">{errors.name.message}</p>}
                  </div>
                  <div>
                    <input {...register('email')} type="email" className="form-input" placeholder="Email *" />
                    {errors.email && <p className="mt-2 text-[0.75rem] text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <input {...register('phone')} type="tel" className="form-input" placeholder="Phone" />
                  <select {...register('eventType')} className="form-input" defaultValue="">
                    <option value="" disabled>Event Type</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <input {...register('guestCount')} type="number" className="form-input" placeholder="Guest Count" />
                  <input {...register('eventDate')} type="date" className="form-input" />
                  <select {...register('budgetRange')} className="form-input" defaultValue="">
                    <option value="" disabled>Budget Range</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                <textarea
                  {...register('message')}
                  rows={4}
                  className="form-input resize-none"
                  placeholder="Tell us about your vision..."
                />

                {submitState === 'error' && (
                  <p className="text-red-500 font-body text-[0.8125rem]">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitState === 'loading'}
                  className="inline-flex items-center gap-3 font-body text-[0.75rem] tracking-[0.15em] uppercase text-charcoal border-b border-charcoal pb-1 hover:opacity-50 transition-opacity disabled:opacity-30"
                >
                  {submitState === 'loading' ? 'Sending...' : 'Send Inquiry'}
                  <span>&rarr;</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
