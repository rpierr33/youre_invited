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

    const [result] = await db.insert(inquiries).values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      eventType: parsed.data.eventType,
      guestCount: parsed.data.guestCount,
      eventDate: parsed.data.eventDate,
      budgetRange: parsed.data.budgetRange,
      message: parsed.data.message,
      createdAt: new Date().toISOString(),
    }).returning()

    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry: result })
  } catch (error) {
    console.error('Submit inquiry error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Admin: List all inquiries
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const allInquiries = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt))
    res.json(allInquiries)
  } catch (error) {
    console.error('List inquiries error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Admin: Update inquiry status/notes
router.patch('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const id = parseInt(req.params.id as string)
    const { status, notes } = req.body

    const updateData: Record<string, unknown> = {}

    if (status !== undefined) {
      const validStatuses = ['new', 'contacted', 'qualified', 'proposal', 'booked', 'completed', 'lost']
      if (!validStatuses.includes(status)) {
        res.status(400).json({ error: 'Invalid status' })
        return
      }
      updateData.status = status
    }

    if (notes !== undefined) {
      updateData.notes = notes
    }

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ error: 'No valid fields to update' })
      return
    }

    const [updated] = await db.update(inquiries).set(updateData).where(eq(inquiries.id, id)).returning()

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
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const id = parseInt(req.params.id as string)
    const [deleted] = await db.delete(inquiries).where(eq(inquiries.id, id)).returning()

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
