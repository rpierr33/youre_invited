import { db, inquiries, admins } from './index.js'
import bcrypt from 'bcryptjs'

async function seed() {
  console.log('Seeding database...')

  // Clear existing data
  db.delete(inquiries).run()
  db.delete(admins).run()

  // Seed admin user
  const passwordHash = await bcrypt.hash('admin123', 10)
  db.insert(admins).values({
    username: 'admin',
    passwordHash,
  }).run()
  console.log('Created admin user (admin / admin123)')

  // Seed sample inquiries
  const sampleInquiries = [
    {
      name: 'Sofia Martinez',
      email: 'sofia@example.com',
      phone: '(954) 555-0201',
      eventType: 'Wedding',
      guestCount: 150,
      eventDate: '2025-11-15',
      budgetRange: '$50,000 - $75,000',
      message: 'My fiancé and I are dreaming of a beachside ceremony at Bahia Mar followed by a reception on the Intracoastal. We want tropical elegance with lots of orchids and warm lighting.',
      status: 'new',
      createdAt: '2025-01-15T10:30:00Z',
    },
    {
      name: 'James Richardson',
      email: 'james.r@techcorp.com',
      phone: '(305) 555-0142',
      eventType: 'Corporate Event',
      guestCount: 200,
      eventDate: '2025-06-20',
      budgetRange: '$25,000 - $50,000',
      message: 'Annual company gala for TechCorp South Florida. Need a sophisticated venue, AV setup, and catering for 200. Theme: Innovation Under the Stars.',
      status: 'contacted',
      createdAt: '2025-01-10T14:00:00Z',
    },
    {
      name: 'Carolina Reyes',
      email: 'carolina.r@gmail.com',
      phone: '(954) 555-0377',
      eventType: 'Quinceañera',
      guestCount: 120,
      eventDate: '2025-09-28',
      budgetRange: '$15,000 - $25,000',
      message: 'Planning my daughter Isabella\'s quinceañera. She loves a garden party theme with butterflies and blush pink. Looking for venues in Fort Lauderdale or Coral Springs.',
      status: 'booked',
      createdAt: '2025-01-05T09:15:00Z',
    },
    {
      name: 'David & Rachel Goldstein',
      email: 'dgoldstein@email.com',
      phone: '(561) 555-0490',
      eventType: 'Social Celebration',
      guestCount: 80,
      eventDate: '2025-12-31',
      budgetRange: '$25,000 - $50,000',
      message: 'New Year\'s Eve celebration at our home in Boca Raton. Want a Great Gatsby-inspired party with a live jazz band, champagne bar, and fireworks if possible.',
      status: 'contacted',
      createdAt: '2024-12-20T16:45:00Z',
    },
    {
      name: 'Priya Patel',
      email: 'priya.p@email.com',
      phone: '(954) 555-0588',
      eventType: 'Destination Event',
      guestCount: 300,
      eventDate: '2026-02-14',
      budgetRange: '$75,000+',
      message: 'Multi-day destination wedding celebration. Ceremony in Fort Lauderdale, welcome dinner on Las Olas, and farewell brunch. Guests flying in from India, UK, and across the US.',
      status: 'declined',
      createdAt: '2024-12-15T11:20:00Z',
    },
  ]

  for (const inquiry of sampleInquiries) {
    db.insert(inquiries).values(inquiry).run()
  }
  console.log(`Seeded ${sampleInquiries.length} sample inquiries`)

  console.log('Database seeded successfully!')
}

seed().catch(console.error)
