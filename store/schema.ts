import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tasksTable = sqliteTable("tasks", {
    id: int("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    date: text("date").notNull(),
    priority: text("priority", { enum: ["low", "mid", "high"] }).notNull(),
    status: text("status", { enum: ["in progress", "completed"] }).notNull()
});

// Export Task to use as an interface in your app
export type Task = typeof tasksTable.$inferSelect;
