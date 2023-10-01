import { relations, sql } from "drizzle-orm";
import { index, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

import { mySqlTable } from "./_table";
import { tenant } from "./auth/tenant";

export const address = mySqlTable(
  "address",
  {
    id: varchar("id", { length: 255 })
      .$defaultFn(nanoid)
      .notNull()
      .primaryKey(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    name: varchar("name", { length: 256 }).notNull(),
    city: varchar("city", { length: 256 }).notNull(),
    district: varchar("district", { length: 256 }).notNull(),
    street: varchar("street", { length: 256 }).notNull(),
    country: varchar("country", { length: 256 }).notNull(),
    state: varchar("state", { length: 256 }),
    description: varchar("description", { length: 256 }).notNull(),
    longAddressDescription: varchar("longAddressDescription", { length: 256 }),

    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
  },
  ({ tenantId }) => ({
    tenantIdIdx: index("tenant_id_idx").on(tenantId),
  }),
);

export const addressRelations = relations(address, ({ one }) => ({
  tenant: one(tenant, {
    fields: [address.tenantId],
    references: [tenant.id],
  }),
}));

export const insertAddressSchema = createInsertSchema(address);
export const selectAddressSchema = createSelectSchema(address);
