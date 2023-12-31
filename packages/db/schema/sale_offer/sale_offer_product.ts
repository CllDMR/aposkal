import { relations, sql } from "drizzle-orm";
import { double, index, int, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";

import { mySqlTable } from "../_table";
import { tenant } from "../auth/tenant";
import { product } from "../product/product";
import { saleOffer } from "./sale_offer";

export const saleOfferProduct = mySqlTable(
  "sale_offer_product",
  {
    id: varchar("id", { length: 255 })
      .$defaultFn(nanoid)
      .notNull()
      .primaryKey(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),

    description: varchar("description", { length: 256 }).default(""),
    imageURL: varchar("image_url", { length: 256 }).default(""),
    name: varchar("name", { length: 256 }).notNull(),
    gtipNo: varchar("gtip_no", { length: 256 }).notNull(),
    currency: varchar("currency", { length: 255 }).notNull(),
    amount: double("amount").notNull(),
    unit: varchar("unit", { length: 256 }).notNull(),
    unitPrice: double("unit_price").notNull(),
    kdv: int("kdv").notNull(),
    total: double("total").notNull(),

    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
    saleOfferId: varchar("sale_offer_id", { length: 255 }).notNull(),
    productId: varchar("product_id", { length: 255 }).notNull(),
  },
  ({ tenantId, saleOfferId, productId }) => ({
    tenantIdX: index("tenant_id_index").on(tenantId),
    saleOfferIdX: index("saleOffer_id_index").on(saleOfferId),
    productIdX: index("product_id_index").on(productId),
  }),
);

export const saleOfferProductRelations = relations(
  saleOfferProduct,
  ({ one }) => ({
    tenant: one(tenant, {
      fields: [saleOfferProduct.tenantId],
      references: [tenant.id],
    }),
    saleOffer: one(saleOffer, {
      fields: [saleOfferProduct.saleOfferId],
      references: [saleOffer.id],
    }),
    product: one(product, {
      fields: [saleOfferProduct.productId],
      references: [product.id],
    }),
  }),
);

export const insertSaleOfferProductSchema =
  createInsertSchema(saleOfferProduct);
export const selectSaleOfferProductSchema =
  createSelectSchema(saleOfferProduct);
