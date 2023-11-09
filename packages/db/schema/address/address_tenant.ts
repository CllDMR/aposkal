import { relations, sql } from "drizzle-orm";
import { index, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

import { mySqlTable } from "../_table";
import { tenant } from "../auth/tenant";
import { tenantsToAddresses } from "../auth/tenants_to_addresses";

export const addressTenant = mySqlTable(
  "addressTenant",
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
    longAddressDescription: varchar("long_address_description", {
      length: 256,
    }),

    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
  },
  ({ tenantId }) => ({
    tenantIdIdx: index("tenant_id_idx").on(tenantId),
  }),
);

export const addressTenantRelations = relations(
  addressTenant,
  ({ one, many }) => ({
    tenant: one(tenant, {
      fields: [addressTenant.tenantId],
      references: [tenant.id],
    }),
    tenantsToAddresses: many(tenantsToAddresses),
  }),
);

export const insertAddressTenantSchema = createInsertSchema(addressTenant);
export const selectAddressTenantSchema = createSelectSchema(addressTenant);
