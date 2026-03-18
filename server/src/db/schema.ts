import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const inquiries = sqliteTable('inquiries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
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

export const admins = sqliteTable('admins', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  username: text('username').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
})

export type Inquiry = typeof inquiries.$inferSelect
export type NewInquiry = typeof inquiries.$inferInsert
export type Admin = typeof admins.$inferSelect
