import express from 'express'
import cors from 'cors'
import path from 'path'
import authRoutes from './routes/auth.js'
import inquiryRoutes from './routes/inquiries.js'
import dealRoutes from './routes/deals.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/deals', dealRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Serve static files and listen only when running locally (not on Vercel)
if (!process.env.VERCEL) {
  const clientDist = path.join(process.cwd(), 'client', 'dist')
  app.use(express.static(clientDist))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'))
  })

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

export default app
