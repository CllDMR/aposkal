import { relations, sql } from "drizzle-orm";
import { index, serial, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";
import { z } from "zod";

import { mySqlTable } from "../_table";
import { addressCompany } from "../address/address_company";
import { tenant } from "../auth/tenant";
import { company } from "../company/company";
import { saleOfferNote } from "./sale_offer_note";
import { saleOfferProduct } from "./sale_offer_product";

export const saleOffer = mySqlTable(
  "sale_offer",
  {
    id: varchar("id", { length: 255 })
      .$defaultFn(nanoid)
      .notNull()
      .primaryKey(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    paymentEndDate: timestamp("payment_end_date").notNull(),
    no: serial("no"),
    currency: varchar("currency", { length: 255 }).notNull(),

    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
    addressId: varchar("address_id", { length: 255 }).notNull(),
    companyId: varchar("company_id", { length: 255 }).notNull(),
  },
  ({ tenantId, addressId, companyId }) => ({
    tenantIdX: index("tenant_id_index").on(tenantId),
    addressIdX: index("address_id_index").on(addressId),
    companyIdX: index("company_id_index").on(companyId),
  }),
);

export const saleOfferRelations = relations(saleOffer, ({ one, many }) => ({
  tenant: one(tenant, {
    fields: [saleOffer.tenantId],
    references: [tenant.id],
  }),
  toAddress: one(addressCompany, {
    fields: [saleOffer.addressId],
    references: [addressCompany.id],
  }),
  company: one(company, {
    fields: [saleOffer.companyId],
    references: [company.id],
  }),
  saleOfferProducts: many(saleOfferProduct),
  saleOfferNotes: many(saleOfferNote),
}));

export const insertSaleOfferSchema = z
  .object({
    ...createInsertSchema(saleOffer).shape,
    companyId: z.string(),
    addressId: z.string(),
    saleOfferProducts: z
      .object({
        description: z.string(),
        imageURL: z.string(),
        gtipNo: z.string(),
        productId: z.string(),
        name: z.string(),
        currency: z.string(),
        unit: z.string(),
        unitPrice: z.number(),
        kdv: z.number(),
        amount: z.number(),
        total: z.number(),
      })
      .array(),
    saleOfferNotes: z
      .object({
        text: z.string(),
      })
      .array(),
  })
  .omit({
    no: true,
  });
export const selectSaleOfferSchema = createSelectSchema(saleOffer);
