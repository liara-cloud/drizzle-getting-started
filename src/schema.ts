import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const todoTable = pgTable('todo_table', {
  id: serial('id').primaryKey(),
  text: text('text').notNull(),
  done: integer('done').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type TodoType = typeof todoTable.$inferSelect;
