import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  mysqlEnum,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

import { mySqlTable } from "./_table";
import { address } from "./address";
import { tenant } from "./auth/tenant";

export const company = mySqlTable(
  "company",
  {
    id: varchar("id", { length: 255 })
      .$defaultFn(nanoid)
      .notNull()
      .primaryKey(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    title: varchar("title", { length: 256 }).notNull(),
    type: mysqlEnum("type", [
      "personal",
      "limited",
      "anonim",
      "other",
    ]).notNull(),
    isForeign: boolean("is_foreign").notNull(),
    taxNo: varchar("tax_no", { length: 9 }).notNull(),
    taxOffice: varchar("tax_office", { length: 256 }).notNull(),
    firmPhoneNumber: varchar("firm_phone_number", { length: 256 }).notNull(),
    qualifiedPhoneNumber: varchar("qualified_phone_number", {
      length: 256,
    }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    web: varchar("web", { length: 256 }).notNull(),
    ticaretSicilNo: varchar("ticaretSicilNo", { length: 256 }).notNull(),
    mersisNo: varchar("mersisNo", { length: 256 }).notNull(),

    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
    addressId: varchar("address_id", { length: 255 }).notNull(),
  },
  ({ tenantId, addressId }) => ({
    tenantIdIdx: index("tenant_id_idx").on(tenantId),
    addressIdIdx: index("address_id_idx").on(addressId),
  }),
);

export const companyRelations = relations(company, ({ one }) => ({
  tenant: one(tenant, {
    fields: [company.tenantId],
    references: [tenant.id],
  }),
  address: one(address, {
    fields: [company.addressId],
    references: [address.id],
  }),
}));

export const insertCompanySchema = createInsertSchema(company);
export const selectCompanySchema = createSelectSchema(company);
