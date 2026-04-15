import { Router } from 'express'
import { db, deals, inquiries } from '../db/index.js'
import { eq, desc } from 'drizzle-orm'
import { authenticateToken, AuthRequest } from '../middleware/auth.js'
import { z } from 'zod'

const router = Router()

const dealSchema = z.object({
  inquiryId: z.number().optional(),
  title: z.string().min(1, 'Title is required'),
  value: z.string().optional(),
  stage: z.enum(['proposal', 'negotiation', 'contract', 'won', 'lost']).optional(),
  expectedCloseDate: z.string().optional(),
  notes: z.string().optional(),
})

const PATCH_FIELDS = ['title', 'value', 'stage', 'expectedCloseDate', 'notes', 'inquiryId'] as const

// List all deals (with linked inquiry name)
router.get('/', authenticateToken, async (_req: AuthRequest, res) => {
  try {
    const allDeals = await db.select().from(deals).orderBy(desc(deals.createdAt))

    // Fetch linked inquiry names
    const inquiryIds = allDeals.filter(d => d.inquiryId).map(d => d.inquiryId!)
    let inquiryMap: Record<number, { name: string; email: string }> = {}
    if (inquiryIds.length > 0) {
      const linkedInquiries = await db.select({
        id: inquiries.id,
        name: inquiries.name,
        email: inquiries.email,
      }).from(inquiries)
      linkedInquiries.forEach(inq => {
        inquiryMap[inq.id] = { name: inq.name, email: inq.email }
      })
    }

    const dealsWithContact = allDeals.map(deal => ({
      ...deal,
      contactName: deal.inquiryId ? inquiryMap[deal.inquiryId]?.name : null,
      contactEmail: deal.inquiryId ? inquiryMap[deal.inquiryId]?.email : null,
    }))

    res.json(dealsWithContact)
  } catch (error) {
    console.error('List deals error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create deal
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const parsed = dealSchema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({ error: 'Validation failed', details: parsed.error.flatten() })
      return
    }

    const now = new Date().toISOString()
    const [result] = await db.insert(deals).values({
      inquiryId: parsed.data.inquiryId,
      title: parsed.data.title,
      value: parsed.data.value,
      stage: parsed.data.stage || 'proposal',
      expectedCloseDate: parsed.data.expectedCloseDate,
      notes: parsed.data.notes,
      createdAt: now,
      updatedAt: now,
    }).returning()

    res.status(201).json(result)
  } catch (error) {
    console.error('Create deal error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update deal
router.patch('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const id = parseInt(req.params.id as string)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid deal ID' })
      return
    }

    const updateData: Record<string, unknown> = { updatedAt: new Date().toISOString() }
    for (const field of PATCH_FIELDS) {
      if (req.body[field] !== undefined) updateData[field] = req.body[field]
    }

    const [updated] = await db.update(deals).set(updateData).where(eq(deals.id, id)).returning()
    if (!updated) {
      res.status(404).json({ error: 'Deal not found' })
      return
    }

    res.json(updated)
  } catch (error) {
    console.error('Update deal error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete deal
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const id = parseInt(req.params.id as string)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid deal ID' })
      return
    }

    const [deleted] = await db.delete(deals).where(eq(deals.id, id)).returning()
    if (!deleted) {
      res.status(404).json({ error: 'Deal not found' })
      return
    }

    res.json({ message: 'Deal deleted' })
  } catch (error) {
    console.error('Delete deal error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
