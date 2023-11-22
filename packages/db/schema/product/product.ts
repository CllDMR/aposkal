import { relations, sql } from "drizzle-orm";
import { index, int, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { nanoid } from "nanoid";
import { z } from "zod";

import { mySqlTable } from "../_table";
import { tenant } from "../auth/tenant";
import { productsToCategories } from "./products_to_categories";
import { productsToSuppliers } from "./products_to_suppliers";
import { productsToTags } from "./products_to_tags";

export const product = mySqlTable(
  "product",
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
    description: varchar("description", { length: 256 }).default(""),
    imageURL: varchar("image_url", { length: 256 }).default(""),
    gtipNo: varchar("gtip_no", { length: 256 }).notNull(),
    currency: varchar("currency", { length: 256 }).notNull(),
    unit: varchar("unit", { length: 256 }).notNull(),
    unitPrice: int("unit_price").notNull(),
    kdv: int("kdv").notNull(),

    tenantId: varchar("tenant_id", { length: 255 }).notNull(),
  },
  ({ tenantId }) => ({
    tenantIdIdx: index("tenant_id_idx").on(tenantId),
  }),
);

export const productRelations = relations(product, ({ one, many }) => ({
  tenant: one(tenant, {
    fields: [product.tenantId],
    references: [tenant.id],
  }),
  productsToCategories: many(productsToCategories),
  productsToSuppliers: many(productsToSuppliers),
  productsToTags: many(productsToTags),
}));

export const insertProductSchema = createInsertSchema(product).extend({
  productCategoryId: z.string(),
  productTagIds: z.object({ id: z.string() }).array(),
  // productSupplierId: z.string(),
});
export const selectProductSchema = createSelectSchema(product);
