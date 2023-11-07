import { relations } from "drizzle-orm";
import { primaryKey, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { mySqlTable } from "../_table";
import { supplier } from "../supplier";
import { product } from "./product";

export const productsToSuppliers = mySqlTable(
  "p_to_s",
  {
    productId: varchar("product_id", { length: 255 }).notNull(),
    supplierId: varchar("supplier_id", { length: 255 }).notNull(),
  },
  (t) => ({
    pk: primaryKey(t.productId, t.supplierId),
  }),
);

export const productsToSuppliersRelations = relations(
  productsToSuppliers,
  ({ one }) => ({
    supplier: one(supplier, {
      fields: [productsToSuppliers.supplierId],
      references: [supplier.id],
    }),
    product: one(product, {
      fields: [productsToSuppliers.productId],
      references: [product.id],
    }),
  }),
);

export const insertProductsToSuppliersSchema =
  createInsertSchema(productsToSuppliers);
export const selectProductsToSuppliersSchema =
  createSelectSchema(productsToSuppliers);
