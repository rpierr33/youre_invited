import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { submitInquiry } from '../lib/api'
import { BotanicalSvg } from '../components/ui/BotanicalSvg'
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

const eventTypes = ['Wedding', 'Corporate Event', 'Gala & Fundraiser', 'Destination Event', 'Quinceañera / Mitzvah', 'Social Celebration', 'Other']
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

  const inputClass = 'w-full px-4 py-3 rounded-lg border border-sand bg-white font-body text-charcoal placeholder:text-charcoal/30 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300'

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center grain-overlay">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy/80" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-playfair text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-xl text-white/80"
          >
            Let's start planning your perfect celebration
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-linen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Left: Contact Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="font-script text-2xl text-gold block mb-4">We'd love to hear from you</span>
                <h2 className="font-playfair text-3xl font-semibold text-charcoal mb-6">
                  Let's Create Something Beautiful Together
                </h2>
                <div className="gold-rule !ml-0 !text-left" />

                <div className="space-y-6 mt-8">
                  <div>
                    <h3 className="font-playfair text-lg font-semibold text-charcoal mb-1">Location</h3>
                    <p className="font-body text-charcoal/60">Fort Lauderdale, FL 33301</p>
                  </div>
                  <div>
                    <h3 className="font-playfair text-lg font-semibold text-charcoal mb-1">Phone</h3>
                    <a href="tel:+19545550100" className="font-body text-charcoal/60 hover:text-gold transition-colors">(954) 555-0100</a>
                  </div>
                  <div>
                    <h3 className="font-playfair text-lg font-semibold text-charcoal mb-1">Email</h3>
                    <a href="mailto:hello@youreinvited.com" className="font-body text-charcoal/60 hover:text-gold transition-colors">hello@youreinvited.com</a>
                  </div>
                  <div>
                    <h3 className="font-playfair text-lg font-semibold text-charcoal mb-1">Follow Us</h3>
                    <div className="flex gap-4 mt-2">
                      <a href="#" className="text-charcoal/40 hover:text-gold transition-colors" aria-label="Instagram">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      </a>
                      <a href="#" className="text-charcoal/40 hover:text-gold transition-colors" aria-label="Pinterest">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                      </a>
                      <a href="#" className="text-charcoal/40 hover:text-gold transition-colors" aria-label="Facebook">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-12 text-gold/20 w-32">
                  <BotanicalSvg variant="palm" className="w-full h-full" />
                </div>
              </motion.div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
              >
                {submitState === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="text-6xl mb-4">&#10024;</div>
                    <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-3">Thank You!</h3>
                    <p className="font-body text-charcoal/60 mb-6">
                      Your inquiry has been received. We'll be in touch within 24 hours to start planning your celebration.
                    </p>
                    <button
                      onClick={() => setSubmitState('idle')}
                      className="font-body text-gold font-semibold hover:text-gold-dark transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-body text-sm font-semibold text-charcoal mb-2">Name *</label>
                        <input {...register('name')} className={inputClass} placeholder="Your full name" />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block font-body text-sm font-semibold text-charcoal mb-2">Email *</label>
                        <input {...register('email')} type="email" className={inputClass} placeholder="your@email.com" />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-body text-sm font-semibold text-charcoal mb-2">Phone</label>
                        <input {...register('phone')} type="tel" className={inputClass} placeholder="(954) 555-0000" />
                      </div>
                      <div>
                        <label className="block font-body text-sm font-semibold text-charcoal mb-2">Event Type</label>
                        <select {...register('eventType')} className={inputClass}>
                          <option value="">Select event type</option>
                          {eventTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block font-body text-sm font-semibold text-charcoal mb-2">Estimated Guests</label>
                        <input {...register('guestCount')} type="number" className={inputClass} placeholder="150" />
                      </div>
                      <div>
                        <label className="block font-body text-sm font-semibold text-charcoal mb-2">Event Date</label>
                        <input {...register('eventDate')} type="date" className={inputClass} />
                      </div>
                      <div>
                        <label className="block font-body text-sm font-semibold text-charcoal mb-2">Budget Range</label>
                        <select {...register('budgetRange')} className={inputClass}>
                          <option value="">Select budget</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-body text-sm font-semibold text-charcoal mb-2">Tell Us About Your Vision</label>
                      <textarea
                        {...register('message')}
                        rows={5}
                        className={inputClass}
                        placeholder="Share your dream event — we'd love to hear every detail..."
                      />
                    </div>

                    {submitState === 'error' && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 font-body text-sm"
                      >
                        Something went wrong. Please try again or contact us directly.
                      </motion.p>
                    )}

                    <button
                      type="submit"
                      disabled={submitState === 'loading'}
                      className="w-full bg-gold text-white py-4 rounded-full font-body font-semibold text-lg uppercase tracking-wider hover:bg-gold-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitState === 'loading' ? 'Sending...' : 'Send Inquiry'}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
