import { Router } from 'express'
import { db, inquiries } from '../db/index.js'
import { eq, desc } from 'drizzle-orm'
import { authenticateToken, AuthRequest } from '../middleware/auth.js'
import { z } from 'zod'

const router = Router()

const inquirySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  eventType: z.string().optional(),
  guestCount: z.number().optional(),
  eventDate: z.string().optional(),
  budgetRange: z.string().optional(),
  message: z.string().optional(),
})

// Public: Submit inquiry
router.post('/', async (req, res) => {
  try {
    const parsed = inquirySchema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({ error: 'Validation failed', details: parsed.error.flatten() })
      return
    }

    const result = db.insert(inquiries).values({
      ...parsed.data,
      status: 'new',
      createdAt: new Date().toISOString(),
    }).returning().get()

    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry: result })
  } catch (error) {
    console.error('Submit inquiry error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Admin: List all inquiries
router.get('/', authenticateToken, (req: AuthRequest, res) => {
  try {
    const allInquiries = db.select().from(inquiries).orderBy(desc(inquiries.createdAt)).all()
    res.json(allInquiries)
  } catch (error) {
    console.error('List inquiries error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Admin: Update inquiry status
router.patch('/:id', authenticateToken, (req: AuthRequest, res) => {
  try {
    const id = parseInt(req.params.id as string)
    const { status } = req.body

    const validStatuses = ['new', 'contacted', 'booked', 'declined']
    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: 'Invalid status. Must be: new, contacted, booked, or declined' })
      return
    }

    const updated = db.update(inquiries).set({ status }).where(eq(inquiries.id, id)).returning().get()

    if (!updated) {
      res.status(404).json({ error: 'Inquiry not found' })
      return
    }

    res.json(updated)
  } catch (error) {
    console.error('Update inquiry error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Admin: Delete inquiry
router.delete('/:id', authenticateToken, (req: AuthRequest, res) => {
  try {
    const id = parseInt(req.params.id as string)
    const deleted = db.delete(inquiries).where(eq(inquiries.id, id)).returning().get()

    if (!deleted) {
      res.status(404).json({ error: 'Inquiry not found' })
      return
    }

    res.json({ message: 'Inquiry deleted' })
  } catch (error) {
    console.error('Delete inquiry error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
