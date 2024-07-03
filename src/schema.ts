import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const todoTable = pgTable('todo_table', {
  id: serial('id').primaryKey(),
  text: text('text').notNull(),
  done: boolean('done').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type TodoType = typeof todoTable.$inferSelect;
