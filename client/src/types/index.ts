export interface Inquiry {
  id: number
  name: string
  email: string
  phone?: string
  eventType?: string
  guestCount?: number
  eventDate?: string
  budgetRange?: string
  message?: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'booked' | 'completed' | 'lost'
  notes?: string
  createdAt: string
}

export interface Deal {
  id: number
  inquiryId?: number
  title: string
  value?: string
  stage: 'proposal' | 'negotiation' | 'contract' | 'won' | 'lost'
  expectedCloseDate?: string
  notes?: string
  contactName?: string
  contactEmail?: string
  createdAt: string
  updatedAt: string
}

export interface InquiryFormData {
  name: string
  email: string
  phone?: string
  eventType?: string
  guestCount?: number
  eventDate?: string
  budgetRange?: string
  message?: string
}

export interface AuthResponse {
  token: string
  username: string
}

export interface GalleryImage {
  id: number
  src: string
  alt: string
  category: 'weddings' | 'corporate' | 'social' | 'galas'
}

export interface Testimonial {
  id: number
  quote: string
  name: string
  eventType: string
  eventDate: string
  rating: number
}

export interface TeamMember {
  name: string
  title: string
  bio: string
  image: string
}

export interface Service {
  id: string
  title: string
  description: string
  tiers: string[]
  image: string
}
