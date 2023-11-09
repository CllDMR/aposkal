import { relations, sql } from "drizzle-orm";
import { index, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

import { mySqlTable } from "../_table";
import { tenant } from "../auth/tenant";
import { companiesToAddresses } from "../company/companies_to_addresses";

export const addressCompany = mySqlTable(
  "addressCompany",
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
    longAddressDescription: varchar("longAddressDescription", {
      length: 256,
    }),

    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
    companyId: varchar("company_id", { length: 255 }).notNull(),
  },
  ({ tenantId, companyId }) => ({
    tenantIdIdx: index("tenant_id_idx").on(tenantId),
    companyIdIdx: index("company_id_idx").on(companyId),
  }),
);

export const addressCompanyRelations = relations(
  addressCompany,
  ({ one, many }) => ({
    tenant: one(tenant, {
      fields: [addressCompany.tenantId],
      references: [tenant.id],
    }),
    companiesToAddresses: many(companiesToAddresses),
  }),
);

export const insertAddressCompanySchema = createInsertSchema(addressCompany);
export const selectAddressCompanySchema = createSelectSchema(addressCompany);
