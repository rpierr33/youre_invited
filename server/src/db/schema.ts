import { pgTable, text, integer, serial } from 'drizzle-orm/pg-core'

export const inquiries = pgTable('inquiries', {
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
  notes: text('notes'),
  createdAt: text('created_at').notNull(),
})

export const deals = pgTable('deals', {
  id: serial('id').primaryKey(),
  inquiryId: integer('inquiry_id').references(() => inquiries.id),
  title: text('title').notNull(),
  value: text('value'),
  stage: text('stage').default('proposal').notNull(),
  expectedCloseDate: text('expected_close_date'),
  notes: text('notes'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  username: text('username').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
})

export type Inquiry = typeof inquiries.$inferSelect
export type NewInquiry = typeof inquiries.$inferInsert
export type Deal = typeof deals.$inferSelect
export type NewDeal = typeof deals.$inferInsert
export type Admin = typeof admins.$inferSelect
