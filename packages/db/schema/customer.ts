import { relations, sql } from "drizzle-orm";
import { index, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

import { mySqlTable } from "./_table";
import { tenant } from "./auth/tenant";

export const customer = mySqlTable(
  "customer",
  {
    id: varchar("id", { length: 255 })
      .$defaultFn(nanoid)
      .notNull()
      .primaryKey(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    firstname: varchar("firstname", { length: 256 }).notNull(),
    lastname: varchar("lastname", { length: 256 }).notNull(),
    middlename: varchar("middlename", { length: 256 }).notNull(),
    gender: varchar("gender", { length: 256 }).notNull(),
    birthdate: timestamp("birthdate").notNull(),
    source: varchar("source", { length: 256 }).notNull(),
    profileImage: varchar("profileImage", { length: 256 }).notNull(),

    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
  },
  ({ tenantId }) => ({
    tenantIdIdx: index("tenant_id_idx").on(tenantId),
  }),
);

export const customerRelations = relations(customer, ({ one }) => ({
  tenant: one(tenant, {
    fields: [customer.tenantId],
    references: [tenant.id],
  }),
}));

export const insertCustomerSchema = createInsertSchema(customer);
export const selectCustomerSchema = createSelectSchema(customer);
