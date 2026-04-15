const express = require('express')
const cors = require('cors')
const { neon } = require('@neondatabase/serverless')
const { drizzle } = require('drizzle-orm/neon-http')
const { pgTable, text, integer, serial } = require('drizzle-orm/pg-core')
const { eq, desc } = require('drizzle-orm')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { z } = require('zod')

// --- Schema ---
const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  eventType: text('event_type'),
  guestCount: integer('guest_count'),
  eventDate: text('event_date'),
  budgetRange: text('budget_range'),
  message: text('message'),
  status: text('status').default('new').notNull(),
  createdAt: text('created_at').notNull(),
})

const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  username: text('username').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
})

// --- DB ---
const sql = neon(process.env.DATABASE_URL)
const db = drizzle(sql, { schema: { inquiries, admins } })

// --- Auth ---
const JWT_SECRET = process.env.JWT_SECRET || 'youre-invited-dev-secret-key-2025'

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    res.status(401).json({ error: 'Access token required' })
    return
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch {
    res.status(403).json({ error: 'Invalid or expired token' })
  }
}

function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' })
}

// --- App ---
const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required' })
      return
    }
    const [admin] = await db.select().from(admins).where(eq(admins.username, username))
    if (!admin) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }
    const validPassword = await bcrypt.compare(password, admin.passwordHash)
    if (!validPassword) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }
    const token = generateToken(admin.id)
    res.json({ token, username: admin.username })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

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

app.post('/api/inquiries', async (req, res) => {
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

app.get('/api/inquiries', authenticateToken, async (req, res) => {
  try {
    const allInquiries = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt))
    res.json(allInquiries)
  } catch (error) {
    console.error('List inquiries error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.patch('/api/inquiries/:id', authenticateToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { status } = req.body
    const validStatuses = ['new', 'contacted', 'booked', 'declined']
    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: 'Invalid status. Must be: new, contacted, booked, or declined' })
      return
    }
    const [updated] = await db.update(inquiries).set({ status }).where(eq(inquiries.id, id)).returning()
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

app.delete('/api/inquiries/:id', authenticateToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id)
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

module.exports = app
