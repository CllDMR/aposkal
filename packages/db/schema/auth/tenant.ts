import { relations } from "drizzle-orm";
import { varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

import { mySqlTable } from "../_table";
import { post } from "../post";
import { usersToTenants } from "./usersToTenants";

export const tenant = mySqlTable("tenant", {
  id: varchar("id", { length: 255 }).$defaultFn(nanoid).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export type InsertTenant = typeof tenant.$inferInsert;

export const tenantRelations = relations(tenant, ({ many }) => ({
  usersToTenants: many(usersToTenants),
  posts: many(post),
}));

export const insertTenantSchema = createInsertSchema(tenant);
export const selectTenantSchema = createSelectSchema(tenant);
