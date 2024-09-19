
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const Interview = pgTable('Interview',{
    id:serial('id').primaryKey(),
    jsonResponse: text('jsonResponse').notNull(),
    jobPosition: text('jobPosition').notNull(),
    jobDescription: text('jobDescription').notNull(),
    Experience : text('Experience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull(),
    interviewId: varchar('interviewId').notNull(),
})