import { relations, sql } from "drizzle-orm";
import { index, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";
import { z } from "zod";

import { mySqlTable } from "./_table";
import { address } from "./address";
import { tenant } from "./auth/tenant";
import { customer } from "./customer";
import { insertSaleOfferNoteSchema, saleOfferNote } from "./sale_offer_note";
import {
  insertSaleOfferProductSchema,
  saleOfferProduct,
} from "./sale_offer_product";

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
    no: varchar("tenant_id", { length: 255 }).notNull(),
    currency: varchar("tenant_id", { length: 255 }).notNull(),

    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
    addressId: varchar("address_id", { length: 255 }).notNull(),
    customerId: varchar("customer_id", { length: 255 }).notNull(),
  },
  ({ tenantId }) => ({
    tenantIdX: index("tenant_id_index").on(tenantId),
  }),
);

export const saleOfferRelations = relations(saleOffer, ({ one, many }) => ({
  tenant: one(tenant, {
    fields: [saleOffer.tenantId],
    references: [tenant.id],
  }),
  toAddress: one(address, {
    fields: [saleOffer.addressId],
    references: [address.id],
  }),
  customer: one(customer, {
    fields: [saleOffer.customerId],
    references: [customer.id],
  }),
  saleOfferProducts: many(saleOfferProduct),
  saleOfferNotes: many(saleOfferNote),
}));

export const insertSaleOfferSchema = createInsertSchema(saleOffer).extend({
  customerId: z.string(),
  addressId: z.string(),
  saleOfferProducts: insertSaleOfferProductSchema
    .omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      tenantId: true,
    })
    .array(),
  saleOfferNotes: insertSaleOfferNoteSchema
    .omit({
      id: true,
      createdAt: true,
      updatedAt: true,
      tenantId: true,
    })
    .array(),
});
export const selectSaleOfferSchema = createSelectSchema(saleOffer);
