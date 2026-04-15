import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

const faqs = [
  {
    question: 'How much does an event planner cost in Fort Lauderdale?',
    answer: 'Our pricing depends on the scope of your event and the level of service you need. We offer everything from day-of coordination to full-service planning. Contact us for a free consultation and custom quote tailored to your celebration.',
  },
  {
    question: 'Do you only plan weddings?',
    answer: 'Not at all! We plan birthdays, bridal showers, baby showers, anniversaries, corporate events, and any milestone worth celebrating. If it\'s worth a party, we\'re in.',
  },
  {
    question: 'Can you design my invitations even if I don\'t need event planning?',
    answer: 'Absolutely. Our custom invitation design and printing service is available as a standalone offering. From save-the-dates to thank-you cards, we create paper goods tailored to your style.',
  },
  {
    question: 'What areas do you serve in South Florida?',
    answer: 'We\'re based in Fort Lauderdale and serve all of South Florida including Miami, Boca Raton, Coral Springs, Palm Beach, and surrounding areas. We also travel for destination events.',
  },
  {
    question: 'What\'s the difference between full-service planning and day-of coordination?',
    answer: 'Full-service planning means we handle everything from start to finish — design, vendors, budgeting, timelines, and on-site management. Day-of coordination is for clients who\'ve done the planning themselves but want a professional to manage the final details and run the event day seamlessly.',
  },
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend reaching out 6-12 months before your event for full-service planning, and at least 2-3 months for day-of coordination. For custom invitations, 3-4 months lead time is ideal. That said, we always try to accommodate shorter timelines — just reach out!',
  },
  {
    question: 'Do you offer virtual or hybrid event planning?',
    answer: 'Yes! We can incorporate virtual elements into your celebration, from livestreaming ceremonies to coordinating hybrid guest experiences. Our digital invitation designs also include built-in RSVP tracking.',
  },
  {
    question: 'What makes You\'re Invited different from other event planners?',
    answer: 'We\'re not just planners — we\'re designers with 12+ years of experience spanning personal celebrations, Destination Management Companies, and Fortune 500 corporate events. Every event starts with the invitation, and we carry that design vision through the entire celebration. No cookie-cutter templates, no generic setups. Everything is personalized to your style, your story, and your vibe.',
  },
]

// FAQ structured data for Google rich results
const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-cormorant text-[1.25rem] text-charcoal font-light pr-8 group-hover:text-sage transition-colors">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-sage text-2xl leading-none shrink-0"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="font-body text-[0.9375rem] text-taupe leading-[1.8] pb-6">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    <section ref={ref} className="py-24 bg-white">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
      </Helmet>
      <div className="max-w-[800px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="sage-rule mx-auto mb-4" />
          <h2 className="font-cormorant text-[2rem] md:text-[2.5rem] font-light text-charcoal">
            Frequently Asked Questions
          </h2>
        </motion.div>
        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
