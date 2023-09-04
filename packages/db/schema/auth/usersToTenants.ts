import { relations } from "drizzle-orm";
import { primaryKey, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { mySqlTable } from "../_table";
import { tenant } from "./tenant";
import { user } from "./user";

export const usersToTenants = mySqlTable(
  "users_to_tenants",
  {
    userId: varchar("user_id", { length: 255 }).notNull(),
    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.tenantId),
  }),
);

export const usersToTenantsRelations = relations(usersToTenants, ({ one }) => ({
  tenant: one(tenant, {
    fields: [usersToTenants.tenantId],
    references: [tenant.id],
  }),
  user: one(user, {
    fields: [usersToTenants.userId],
    references: [user.id],
  }),
}));

export const insertUsersToTenantsSchema = createInsertSchema(usersToTenants);
export const selectUsersToTenantsSchema = createSelectSchema(usersToTenants);
