import { sql } from 'drizzle-orm';
import { integer, pgTable, text } from 'drizzle-orm/pg-core';

/*
export const users = pgTable('users', {
  id: integer('id').primaryKey(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  age: integer('age'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
*/
