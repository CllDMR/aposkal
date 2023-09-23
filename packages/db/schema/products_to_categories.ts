import { relations } from "drizzle-orm";
import { primaryKey, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { mySqlTable } from "./_table";
import { product } from "./product";
import { productCategory } from "./product_category";

export const productsToCategories = mySqlTable(
  "p_to_p_c",
  {
    productId: varchar("product_id", { length: 255 }).notNull(),
    product_categoryId: varchar("product_category_id", {
      length: 255,
    }).notNull(),
  },
  (t) => ({
    pk: primaryKey(t.productId, t.product_categoryId),
  }),
);

export const productsToCategoriesRelations = relations(
  productsToCategories,
  ({ one }) => ({
    productCategory: one(productCategory, {
      fields: [productsToCategories.product_categoryId],
      references: [productCategory.id],
    }),
    product: one(product, {
      fields: [productsToCategories.productId],
      references: [product.id],
    }),
  }),
);

export const insertProductsToCategoriesSchema =
  createInsertSchema(productsToCategories);
export const selectProductsToCategoriesSchema =
  createSelectSchema(productsToCategories);
